import { asyncHandler } from "@src/core/utils/asyncHandler";
import { Router } from "express";
import { activatePromocode, createPromocode, deactivatePromocode, updatePromocode } from "../controllers/promocode.controllers";


/**
 * @swagger
 * components:
 *   parameters:
 *     promocodeId:      
 *       in: path
 *       name: promocodeId
 *       required: true
 *       schema:
 *         type: integer
 *       description: Promocode ID
 *   schemas:
 *     nameIdentifier:
 *       type: string
 *       description: The name of promocode.
 *       example: SUMMER20
 *     restaurantId:
 *       type: integer
 *       description: The restaurant ID.
 *       example: 0
 *     discountPercentage:
 *       type: integer
 *       description: The discount percentage.
 *       example: 20
 *     validFrom:
 *       type: string
 *       format: date
 *       description: The date from which the promocode can be used.
 *       example: '2024-07-21T17:32:28Z'
 *     validUntil:
 *       type: string
 *       format: date
 *       description: The date until which the promocode can be used.
 *       example: '2024-09-21T17:32:28Z'
 *     maxUsageCount:
 *       type: integer
 *       description: The maximum value of promocode usages.
 *       example: 1000
 *     PromocodeCreate:
 *       type: object
 *       properties:
 *         nameIdentifier:
 *           $ref: '#/components/schemas/nameIdentifier'
 *         restaurantId:
 *           $ref: '#/components/schemas/restaurantId'
 *         discountPercentage:
 *           $ref: '#/components/schemas/discountPercentage'
 *         validFrom:
 *           $ref: '#/components/schemas/validFrom'
 *         validUntil:
 *           $ref: '#/components/schemas/validUntil'
 *         maxUsageCount:
 *           $ref: '#/components/schemas/maxUsageCount'
 *     PromocodeUpdate:
 *       type: object
 *       properties:
 *         discountPercentage:
 *           $ref: '#/components/schemas/discountPercentage'
 *         validFrom:
 *           $ref: '#/components/schemas/validFrom'
 *         validUntil:
 *           $ref: '#/components/schemas/validUntil'
 *         maxUsageCount:
 *           $ref: '#/components/schemas/maxUsageCount'
*/

export const promocodeRouter = Router()

/**
 * @swagger
 * /promocodes:
 *   post:
 *     summary: Creates a promocode.
 *     description: Creates a promocode. Can be used only by restaurant managers.
 *     tags:
 *       - "promocodes"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PromocodeCreate'
 *     responses:
 *       201:
 *         description: A created promocode.
 *       400:
 *         description: Error connected with bad data.
 *       403:
 *         description: Error connected with authorization.
*/
promocodeRouter.post("/", asyncHandler(createPromocode))

/**
 * @swagger
 * /promocodes/{promocodeId}:
 *   put:
 *     summary: Updates a promocode.
 *     description: Updates a promocode. Can be used only by restaurant managers.
 *     tags:
 *       - "promocodes"
 *     parameters:
 *       - $ref: '#/components/parameters/promocodeId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PromocodeUpdate'
 *     responses:
 *       200:
 *         description: An updated promocode.
 *       400:
 *         description: Error connected with bad data.
 *       403:
 *         description: Error connected with authorization.
 *       404:
 *         description: Promocode not found.
*/
promocodeRouter.put("/:promocodeId", asyncHandler(updatePromocode))

/**
 * @swagger
 * /promocodes/{promocodeId}/activate:
 *   patch:
 *     summary: Activates promocode.
 *     description: Activates promocode. Can be used only by restaurant managers.
 *     tags:
 *       - "promocodes"
 *     parameters:
 *       - $ref: '#/components/parameters/promocodeId'
 *     responses:
 *       200:
 *         description: Empty response body.
 *       403:
 *         description: Error connected with authorization.
 *       404:
 *         description: Promocode not found.
*/
promocodeRouter.patch("/:promocodeId/activate", asyncHandler(activatePromocode))


/**
 * @swagger
 * /promocodes/{promocodeId}/deactivate:
 *   patch:
 *     summary: Deactivates promocode.
 *     description: Deactivates promocode. Can be used only by restaurant managers.
 *     tags:
 *       - "promocodes"
 *     parameters:
 *       - $ref: '#/components/parameters/promocodeId'
 *     responses:
 *       200:
 *         description: Empty response body.
 *       403:
 *         description: Error connected with authorization.
 *       404:
 *         description: Promocode not found.
*/
promocodeRouter.patch("/:promocodeId/deactivate", asyncHandler(deactivatePromocode))
