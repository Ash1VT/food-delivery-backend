import { addressRouter } from "@src/modules/addresses/routes/address.routes";
import { orderRouter } from "@src/modules/orders/routes/order.routes";
import { promocodeRouter } from "@src/modules/promotions/routes/promocode.routes";
import { restaurantRouter } from "@src/modules/restaurants/routes/restaurant.routes";
import { customerRouter } from "@src/modules/users/routes/customer.routes";
import { Router } from "express";

export const apiRouter = Router()

apiRouter.use("/orders", orderRouter)

apiRouter.use("/promocodes", promocodeRouter)

apiRouter.use("/restaurants", restaurantRouter)

apiRouter.use("/customers", customerRouter)

apiRouter.use("/addresses", addressRouter)