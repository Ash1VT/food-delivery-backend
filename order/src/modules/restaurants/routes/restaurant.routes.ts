import { asyncHandler } from "@src/core/utils/asyncHandler";
import { Router } from "express";
import { getRestaurantOrders, getRestaurantPromocodes } from "../controllers/restaurant.controllers";


/**
 * @swagger
 * components:
 *   parameters:
 *     restaurantId:      
 *       in: path
 *       name: restaurantId
 *       required: true
 *       schema:
 *         type: integer
 *       description: Restaurant ID
*/

export const restaurantRouter = Router()

/**
 * @swagger
 * /restaurants/{restaurantId}/orders:
 *   get:
 *     summary: Retrieve a list of orders of provided restaurant.
 *     description: Retrieve a list of orders of provided restaurant. Can be used only by restaurant managers.
 *     tags:
 *       - "restaurants"
 *     parameters:
 *       - $ref: '#/components/parameters/restaurantId'
 *       - $ref: '#/components/parameters/orderStatus'
 *     responses:
 *       200:
 *         description: A list of orders.
 *       403:
 *         description: Error connected with authorization.
 *       404:
 *         description: Restaurant not found.
*/
restaurantRouter.get("/:restaurantId/orders", asyncHandler(getRestaurantOrders))

/**
 * @swagger
 * /restaurants/{restaurantId}/promocodes:
 *   get:
 *     summary: Retrieve a list of promocodes of provided restaurant.
 *     description: Retrieve a list of promocodes of provided restaurant. Can be used only by restaurant managers.
 *     tags:
 *       - "restaurants"
 *     parameters:
 *       - $ref: '#/components/parameters/restaurantId'
 *     responses:
 *       200:
 *         description: A list of promocodes.
 *       403:
 *         description: Error connected with authorization.
 *       404:
 *         description: Restaurant not found.
*/
restaurantRouter.get("/:restaurantId/promocodes", asyncHandler(getRestaurantPromocodes))
