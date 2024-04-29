from db.sqlalchemy.models import Review, Restaurant, MenuItem, Customer, Courier
from models.courier import CourierModel
from models.customer import CustomerModel
from models.menu_item import MenuItemModel
from models.restaurant import RestaurantModel
from models.review import ReviewModel


def to_courier_model(courier: Courier) -> CourierModel:
    """
    Convert database model to courier model.

    Args:
        courier (Courier): Database model.

    Returns:
        CourierModel: Courier model.
    """

    return CourierModel(
        id=courier.id
    )


def to_customer_model(customer: Customer) -> CustomerModel:
    """
    Convert database model to customer model.

    Args:
        customer (Customer): Database model.

    Returns:
        CourierModel: Customer model.
    """

    return CustomerModel(
        id=customer.id,
        full_name=customer.full_name,
        image_url=customer.image_url
    )


def to_menu_item_model(menu_item: MenuItem) -> MenuItemModel:
    """
    Convert database model to menu item model.

    Args:
        menu_item (MenuItem): Database model.

    Returns:
        MenuItemModel: Menu item model.
    """

    return MenuItemModel(
        id=menu_item.id
    )


def to_restaurant_model(restaurant: Restaurant) -> RestaurantModel:
    """
    Convert database model to restaurant model.

    Args:
        restaurant (Restaurant): Database model.

    Returns:
        RestaurantModel: Restaurant model.
    """

    return RestaurantModel(
        id=restaurant.id
    )


def to_review_model(review: Review) -> ReviewModel:
    """
    Convert database model to review model.

    Args:
        review (Review): Database model.

    Returns:
        ReviewModel: Review model.
    """

    return ReviewModel(
        id=review.id,
        rating=review.rating,
        comment=review.comment,
        customer_id=review.customer_id,
        courier_id=review.courier_id,
        menu_item_id=review.menu_item_id,
        restaurant_id=review.restaurant_id,
        created_at=review.created_at,
    )
