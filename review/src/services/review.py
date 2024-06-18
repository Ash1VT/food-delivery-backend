from dataclasses import asdict
from typing import List, Optional

from loguru import logger

from exceptions.base import PermissionDeniedError
from exceptions.courier import CourierOwnershipError, CourierNotFoundError
from exceptions.customer import CustomerOwnershipError
from exceptions.menu_item import MenuItemNotFoundError
from exceptions.order import OrderNotFoundError
from exceptions.restaurant import RestaurantNotFoundError, RestaurantNotActiveError
from exceptions.review import ReviewAlreadyExistsError, ReviewNotFoundError
from kafka_files.producer.events import MenuItemRatingUpdatedEvent, RestaurantRatingUpdatedEvent
from models.courier import CourierModel
from models.customer import CustomerModel
from models.review import ReviewCreateModel, ReviewUpdateModel
from roles import CourierRole, CustomerRole
from schemas.rating import RatingRetrieveOutSchema
from schemas.review import ReviewUpdateInSchema, ReviewUpdateOutSchema, ReviewCreateInSchema, ReviewCreateOutSchema, \
    ReviewRetrieveOutSchema
from services.interfaces.review import IReviewService
from setup.kafka.producer.publisher import publisher
from uow.generic import GenericUnitOfWork


class ReviewService(IReviewService):

    def __init__(self,
                 customer: Optional[CustomerModel] = None,
                 courier: Optional[CourierModel] = None):
        self._customer = customer
        self._courier = courier

    async def get_courier_reviews(self, courier_id: int, uow: GenericUnitOfWork) -> List[ReviewRetrieveOutSchema]:
        # Permission checks
        if not self._courier:
            logger.warning(f"User is not a courier.")
            raise PermissionDeniedError(CourierRole)

        if self._courier.id != courier_id:
            logger.warning(f"User is not the courier with id={courier_id} and cannot get reviews.")
            raise CourierOwnershipError()

        courier_review_models = await uow.reviews.list_courier_reviews(courier_id)

        logger.info(f"Retrieved list of courier reviews with courier_id={courier_id}.")

        return [ReviewRetrieveOutSchema.model_validate(review) for review in courier_review_models]

    async def get_order_review(self, order_id: int, uow: GenericUnitOfWork) -> Optional[ReviewRetrieveOutSchema]:

        order = await uow.orders.retrieve(order_id)

        if not order:
            logger.warning(f"Order with id={order_id} does not exist.")
            raise OrderNotFoundError(order_id)

        order_review = await uow.reviews.retrieve_by_order(order_id)

        if not order_review:
            return None

        logger.info(f"Retrieved order review with order_id={order_id}.")

        return ReviewRetrieveOutSchema.model_validate(order_review)

    async def get_courier_rating(self, courier_id: int, uow: GenericUnitOfWork) -> RatingRetrieveOutSchema:

        courier = await uow.couriers.retrieve(courier_id)

        if not courier:
            logger.warning(f"Courier with id={courier_id} does not exist.")
            raise CourierNotFoundError(courier_id)

        courier_rating = await uow.couriers.retrieve_courier_rating(courier_id)

        logger.info(f"Retrieved courier rating for courier_id={courier_id}.")

        return RatingRetrieveOutSchema.model_validate(asdict(courier_rating))

    async def get_customer_restaurant_review(self, restaurant_id: int,
                                             uow: GenericUnitOfWork) -> Optional[ReviewRetrieveOutSchema]:

        if not self._customer:
            logger.warning(f"User is not a customer.")
            raise PermissionDeniedError(CustomerRole)

        # Check if restaurant exists
        restaurant = await uow.restaurants.retrieve(restaurant_id)

        if not restaurant:
            logger.warning(f"Restaurant with id={restaurant_id} does not exist.")
            raise RestaurantNotFoundError(restaurant_id)

        customer_review = await uow.reviews.retrieve_by_customer_and_restaurant(self._customer.id, restaurant_id)

        if not customer_review:
            return None

        logger.info(f"Retrieved customer review with customer_id={self._customer.id}.")

        return ReviewRetrieveOutSchema.model_validate(customer_review)

    async def get_restaurant_reviews(self, restaurant_id: int, uow: GenericUnitOfWork) -> List[ReviewRetrieveOutSchema]:

        restaurant = await uow.restaurants.retrieve(restaurant_id)

        if not restaurant:
            logger.warning(f"Restaurant with id={restaurant_id} does not exist.")
            raise RestaurantNotFoundError(restaurant_id)

        # Check if restaurant is active
        if not restaurant.is_active:
            logger.warning(f"Restaurant with id={restaurant_id} is not active.")
            raise RestaurantNotActiveError(restaurant_id)

        restaurant_review_models = await uow.reviews.list_restaurant_reviews(restaurant_id)

        logger.info(f"Retrieved list of restaurant reviews with restaurant_id={restaurant_id}.")

        return [ReviewRetrieveOutSchema.model_validate(review) for review in restaurant_review_models]

    async def get_customer_menu_item_review(self, menu_item_id: int,
                                            uow: GenericUnitOfWork) -> Optional[ReviewRetrieveOutSchema]:

        if not self._customer:
            logger.warning(f"User is not a customer.")
            raise PermissionDeniedError(CustomerRole)

        menu_item = await uow.menu_items.retrieve(menu_item_id)

        if not menu_item:
            logger.warning(f"Menu item with id={menu_item_id} does not exist.")
            raise MenuItemNotFoundError(menu_item_id)

        customer_review = await uow.reviews.retrieve_by_customer_and_menu_item(self._customer.id, menu_item_id)

        if not customer_review:
            return None

        logger.info(f"Retrieved customer review with customer_id={self._customer.id}.")

        return ReviewRetrieveOutSchema.model_validate(customer_review)

    async def get_menu_item_reviews(self, menu_item_id: int, uow: GenericUnitOfWork) -> List[ReviewRetrieveOutSchema]:

        menu_item = await uow.menu_items.retrieve(menu_item_id)

        if not menu_item:
            logger.warning(f"Menu item with id={menu_item_id} does not exist.")
            raise MenuItemNotFoundError(menu_item_id)

        menu_item_review_models = await uow.reviews.list_menu_item_reviews(menu_item_id)

        logger.info(f"Retrieved list of menu item reviews with menu_item_id={menu_item_id}.")

        return [ReviewRetrieveOutSchema.model_validate(review) for review in menu_item_review_models]

    async def add_order_review(self, order_id: int, review: ReviewCreateInSchema,
                               uow: GenericUnitOfWork) -> ReviewCreateOutSchema:
        # Permission checks
        if not self._customer:
            logger.warning(f"User is not a customer.")
            raise PermissionDeniedError(CustomerRole)

        retrieved_review = await uow.reviews.retrieve_by_order(order_id)

        # Check if review already exists
        if retrieved_review:
            logger.warning(f"Review with id={review.id} already exists.")
            raise ReviewAlreadyExistsError()

        order = await uow.orders.retrieve(order_id)

        # Check if order exists
        if not order:
            logger.warning(f"Order with id={order_id} does not exist.")
            raise OrderNotFoundError(order_id)

        # Check if customer can leave review
        if order.customer_id != self._customer.id:
            logger.warning(f"User is not the customer with id={order.customer_id} and cannot leave review.")
            raise CustomerOwnershipError()

        # Create review

        review_create_model = ReviewCreateModel(
            order_id=order_id,
            customer_id=self._customer.id,
            **review.model_dump()
        )

        created_review = await uow.reviews.create(review_create_model)

        logger.info(f"Created review with id={created_review.id}.")

        return ReviewCreateOutSchema.model_validate(created_review)

    async def add_restaurant_review(self, restaurant_id: int, review: ReviewCreateInSchema,
                                    uow: GenericUnitOfWork) -> ReviewCreateOutSchema:
        # Permission checks
        if not self._customer:
            logger.warning(f"User is not a customer.")
            raise PermissionDeniedError(CustomerRole)

        # Check if restaurant exists
        restaurant = await uow.restaurants.retrieve(restaurant_id)

        if not restaurant:
            logger.warning(f"Restaurant with id={restaurant_id} does not exist.")
            raise RestaurantNotFoundError(restaurant_id)

        # Check if restaurant is active
        if not restaurant.is_active:
            logger.warning(f"Restaurant with id={restaurant_id} is not active.")
            raise RestaurantNotActiveError(restaurant_id)

        # Check if review already exists
        retrieved_review = await uow.reviews.retrieve_by_customer_and_restaurant(self._customer.id, restaurant_id)

        if retrieved_review:
            logger.warning(f"Review with id={review.id} already exists.")
            raise ReviewAlreadyExistsError()

        # Create review
        review_create_model = ReviewCreateModel(
            restaurant_id=restaurant_id,
            customer_id=self._customer.id,
            **review.model_dump()
        )

        created_review = await uow.reviews.create(review_create_model)

        logger.info(f"Created review with id={created_review.id}.")

        restaurant_rating = await uow.restaurants.retrieve_restaurant_rating(restaurant_id)

        publisher.publish(
            RestaurantRatingUpdatedEvent(
                id=restaurant_id,
                rating=restaurant_rating.rating,
                reviews_count=restaurant_rating.reviews_count
            )
        )

        return ReviewCreateOutSchema.model_validate(created_review)

    async def add_menu_item_review(self, menu_item_id: int, review: ReviewCreateInSchema,
                                   uow: GenericUnitOfWork) -> ReviewCreateOutSchema:
        # Permission checks
        if not self._customer:
            logger.warning(f"User is not a customer.")
            raise PermissionDeniedError(CustomerRole)

        # Check if menu item exists
        menu_item = await uow.menu_items.retrieve(menu_item_id)

        if not menu_item:
            logger.warning(f"Menu item with id={menu_item_id} does not exist.")
            raise MenuItemNotFoundError(menu_item_id)

        # Check if review already exists
        retrieved_review = await uow.reviews.retrieve_by_customer_and_menu_item(self._customer.id, menu_item_id)

        if retrieved_review:
            logger.warning(f"Review with id={review.id} already exists.")
            raise ReviewAlreadyExistsError()

        # Create review

        review_create_model = ReviewCreateModel(
            menu_item_id=menu_item_id,
            customer_id=self._customer.id,
            **review.model_dump()
        )

        created_review = await uow.reviews.create(review_create_model)

        logger.info(f"Created review with id={created_review.id}.")

        menu_item_rating = await uow.menu_items.retrieve_menu_item_rating(menu_item_id)

        publisher.publish(
            MenuItemRatingUpdatedEvent(
                id=menu_item_id,
                rating=menu_item_rating.rating,
                reviews_count=menu_item_rating.reviews_count
            )
        )

        return ReviewCreateOutSchema.model_validate(created_review)

    async def update_review(self, review_id: int, review: ReviewUpdateInSchema,
                            uow: GenericUnitOfWork) -> ReviewUpdateOutSchema:
        # Permission checks
        if not self._customer:
            logger.warning(f"User is not a customer.")
            raise PermissionDeniedError(CustomerRole)

        retrieved_review = await uow.reviews.retrieve(review_id)

        # Check if review exists
        if not retrieved_review:
            logger.warning(f"Review with id={review_id} does not exist.")
            raise ReviewNotFoundError(review_id)

        # Check if customer can update review
        if retrieved_review.customer_id != self._customer.id:
            logger.warning(f"User is not the customer with id={retrieved_review.customer_id} and cannot update review.")
            raise CustomerOwnershipError()

        # Update review

        review_update_model = ReviewUpdateModel(
            **review.model_dump()
        )

        updated_review = await uow.reviews.update(review_id, review_update_model)

        logger.info(f"Updated review with id={updated_review.id}.")

        if updated_review.menu_item_id:
            menu_item_rating = await uow.menu_items.retrieve_menu_item_rating(updated_review.menu_item_id)

            publisher.publish(
                MenuItemRatingUpdatedEvent(
                    id=updated_review.menu_item_id,
                    rating=menu_item_rating.rating,
                    reviews_count=menu_item_rating.reviews_count
                )
            )
        elif updated_review.restaurant_id:
            restaurant_rating = await uow.restaurants.retrieve_restaurant_rating(updated_review.restaurant_id)

            publisher.publish(
                RestaurantRatingUpdatedEvent(
                    id=updated_review.restaurant_id,
                    rating=restaurant_rating.rating,
                    reviews_count=restaurant_rating.reviews_count
                )
            )

        return ReviewUpdateOutSchema.model_validate(updated_review)

    async def delete_review(self, review_id: int, uow: GenericUnitOfWork) -> None:
        # Permission checks
        if not self._customer:
            logger.warning(f"User is not a customer.")
            raise PermissionDeniedError(CustomerRole)

        retrieved_review = await uow.reviews.retrieve(review_id)

        # Check if review exists
        if not retrieved_review:
            logger.warning(f"Review with id={review_id} does not exist.")
            raise ReviewNotFoundError(review_id)

        # Check if customer can delete review
        if retrieved_review.customer_id != self._customer.id:
            logger.warning(f"User is not the customer with id={retrieved_review.customer_id} and cannot delete review.")
            raise CustomerOwnershipError()

        # Delete review
        await uow.reviews.delete(review_id)

        logger.info(f"Deleted review with id={review_id}.")

        if retrieved_review.menu_item_id:
            menu_item_rating = await uow.menu_items.retrieve_menu_item_rating(retrieved_review.menu_item_id)

            publisher.publish(
                MenuItemRatingUpdatedEvent(
                    id=retrieved_review.menu_item_id,
                    rating=menu_item_rating.rating,
                    reviews_count=menu_item_rating.reviews_count
                )
            )
        elif retrieved_review.restaurant_id:
            restaurant_rating = await uow.restaurants.retrieve_restaurant_rating(retrieved_review.restaurant_id)

            publisher.publish(
                RestaurantRatingUpdatedEvent(
                    id=retrieved_review.restaurant_id,
                    rating=restaurant_rating.rating,
                    reviews_count=restaurant_rating.reviews_count
                )
            )
