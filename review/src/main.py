from models.courier import CourierCreateModel
from models.customer import CustomerCreateModel
from models.order import OrderCreateModel
from schemas.review import ReviewCreateInSchema
from services.review import ReviewService
from setup.app import app
from setup.sqlalchemy.session import async_session_maker
from setup.utils import start_app
from uow.sqlalchemy import SqlAlchemyUnitOfWork


@app.post("/")
async def root(review_schema: ReviewCreateInSchema):
    uow = SqlAlchemyUnitOfWork(async_session_maker)
    async with uow as session:
        courier_create_model = CourierCreateModel(
            id=1,
        )

        customer_create_model = CustomerCreateModel(
            id=5,
            full_name="John Doe",
            image_url="https://example.com/image.jpg",
        )

        order_create_model = OrderCreateModel(
            id=1,
            customer_id=customer_create_model.id,
            courier_id=courier_create_model.id,
        )

        courier = await uow.couriers.create(courier_create_model)
        customer = await uow.customers.create(customer_create_model)
        order = await uow.orders.create(order_create_model)

        review_service = ReviewService(customer=customer)

        review = await review_service.add_order_review(order.id, review_schema, session)
        # courier_reviews_list = await review_service.get_courier_reviews(courier.id, session)
        return {"added_review": review}


if __name__ == "__main__":
    start_app()
