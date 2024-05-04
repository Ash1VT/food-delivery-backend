import { asyncHandler } from "@src/core/utils/asyncHandler";
import { Request, Response, Router } from "express";
import { finishOrderDelivery, getAllOrders, getAvailableForDeliveryOrders, getCurrentCourierOrders, getCurrentCustomerOrders, makeOrder, takeOrder } from "../controllers/order.controllers";
import { addOrderItem, getOrderItems } from "../controllers/orderItem.controllers";


/**
 * @swagger
 * components:
 *   parameters:
 *     orderStatus:
 *       name: status
 *       in: query
 *       required: false
 *       schema:
 *         type: string
 *         enum: [pending, confirmed, preparing, ready, delivering, delivered, cancelled]
 *       description: Order Status
 *       example: ready
 *     orderId:      
 *       in: path
 *       name: orderId
 *       required: true
 *       schema:
 *         type: integer
 *       description: Order ID
 *   schemas:
 *     OrderItemCreate:
 *       type: object
 *       properties:
 *         menuItemId:
 *           type: integer
 *           description: The menu item ID.
 *           example: 0
 *         quantity:
 *           type: integer
 *           description: Quantity of menu items.
 *           example: 4
 *     OrderCreate:
 *       type: object
 *       properties:
 *         restaurantId:
 *           type: integer
 *           description: The restaurant ID.
 *           example: 0
 *         promotionId:
 *           type: integer
 *           description: The promotion ID.
 *           required: false
 *           example: 0
 *         promocode:
 *           type: string
 *           description: The promocode.
 *           example: SUMMER20
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItemCreate'
*/

export const orderRouter = Router()

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve a list of all orders
 *     description: Retrieve a list of all orders. Can be used only by moderators.
 *     tags:
 *       - "orders"
 *     parameters:
 *       - $ref: '#/components/parameters/orderStatus'
 *     responses:
 *       200:
 *         description: A list of orders.
 *       403:
 *         description: Error connected with authorization.
*/
orderRouter.get("/", asyncHandler(getAllOrders))

/**
 * @swagger
 * /orders/customer:
 *   get:
 *     summary: Retrieve a list of orders of current authenticated customer.
 *     description: Retrieve a list of orders of current authenticated customer. Can be used only by customers.
 *     tags:
 *       - "orders"
 *     parameters:
 *       - $ref: '#/components/parameters/orderStatus'
 *     responses:
 *       200:
 *         description: A list of orders.
 *       403:
 *         description: Error connected with authorization.
*/
orderRouter.get("/customer", asyncHandler(getCurrentCustomerOrders))

/**
 * @swagger
 * /orders/courier:
 *   get:
 *     summary: Retrieve a list of orders of current authenticated courier.
 *     tags:
 *       - "orders"
 *     description: Retrieve a list of orders of current authenticated courier. Can be used only by couriers.
 *     parameters:
 *       - $ref: '#/components/parameters/orderStatus'
 *     responses:
 *       200:
 *         description: A list of orders.
 *       403:
 *         description: Error connected with authorization.
*/
orderRouter.get("/courier", asyncHandler(getCurrentCourierOrders))

/**
 * @swagger
 * /orders/available:
 *   get:
 *     summary: Retrieve a list of orders that are available for delivery.
 *     tags:
 *       - "orders"
 *     description: Retrieve a list of orders that are available for delivery. Can be used only by couriers.
 *     responses:
 *       200:
 *         description: A list of orders.
 *       403:
 *         description: Error connected with authorization.
*/
orderRouter.get("/available", asyncHandler(getAvailableForDeliveryOrders))

/**
 * @swagger
 * /orders/{orderId}/items:
 *   get:
 *     summary: Retrieve a list of order items of an order.
 *     description: Retrieve a list of order items of an order. Can be used only by customers and couriers.
 *     tags:
 *       - "orders"
 *     parameters:
 *       - $ref: '#/components/parameters/orderId'
 *     responses:
 *       200:
 *         description: A list of order items.
 *       403:
 *         description: Error connected with authorization.
 *       404:
 *         description: Order not found.
*/
orderRouter.get("/:orderId/items", asyncHandler(getOrderItems))


/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Creates an order.
 *     description: Creates an order. Can be used only by customers.
 *     tags:
 *       - "orders"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderCreate'
 *     responses:
 *       201:
 *         description: A created order.
 *       403:
 *         description: Error connected with authorization.
*/
orderRouter.post("/", asyncHandler(makeOrder))

/**
 * @swagger
 * /orders/{orderId}/items:
 *   post:
 *     summary: Adds an order item to an existing order.
 *     description: Adds an order item to an existing order. Can be used only by customers.
 *     tags:
 *       - "orders"
 *     parameters:
 *       - $ref: '#/components/parameters/orderId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItemCreate'
 *     responses:
 *       201:
 *         description: A created order item.
 *       403:
 *         description: Error connected with authorization.
*/
orderRouter.post("/:orderId/items", asyncHandler(addOrderItem))

/**
 * @swagger
 * /orders/{orderId}/take:
 *   patch:
 *     summary: Takes an order for starting delivery.
 *     description: Takes an order for starting delivery. Can be used only by couriers.
 *     tags:
 *       - "orders"
 *     parameters:
 *       - $ref: '#/components/parameters/orderId'
 *     responses:
 *       200:
 *         description: Empty response.
 *       403:
 *         description: Error connected with authorization.
 *       404:
 *         description: Order not found.
*/
orderRouter.patch("/:orderId/take", asyncHandler(takeOrder))


/**
 * @swagger
 * /orders/{orderId}/finish:
 *   patch:
 *     summary: Finishes an order delivery.
 *     description: Finishes an order delivery. Can be used only by couriers.
 *     tags:
 *       - "orders"
 *     parameters:
 *       - $ref: '#/components/parameters/orderId'
 *     responses:
 *       200:
 *         description: Empty response.
 *       403:
 *         description: Error connected with authorization.
 *       404:
 *         description: Order not found.
*/
orderRouter.patch("/:orderId/finish", asyncHandler(finishOrderDelivery))
