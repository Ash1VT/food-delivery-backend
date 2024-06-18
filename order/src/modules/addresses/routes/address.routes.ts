import { asyncHandler } from "@src/core/utils/asyncHandler";
import { Router } from "express";
import { createCustomerAddress, deleteCustomerAddress, getCurrentCustomerAddresses } from "../controllers/address.controllers";

/**
 * @swagger
 * components:
 *   parameters:
 *     customerAddressId:      
 *       in: path
 *       name: customerAddressId
 *       required: true
 *       schema:
 *         type: integer
 *       description: Customer Address ID
 *     approvalStatus:
 *       name: approvalStatus
 *       in: query
 *       required: false
 *       schema:
 *         type: string
 *         enum: [approved, rejected, pending]
 *       description: Customer Address approval status
 *       example: pending
 *   schemas:
 *     CustomerAddressCreate:
 *       type: object
 *       properties:
 *         country:
 *           type: string
 *           description: The country.
 *           example: Беларусь
 *         region:
 *           type: string
 *           description: The region.
 *           example: Гродненская область
 *         details:
 *           type: string
 *           description: The details about the address.
 *           example: ул. Антонова, 10
*/
export const addressRouter = Router()

/**
 * @swagger
 * /addresses/customer:
 *   get:
 *     summary: Retrieve a list of addresses for the current customer.
 *     description: Retrieve a list of addresses for the current customer. Can be used only by customers.
 *     tags:
 *       - "addresses"
 *     responses:
 *       200:
 *         description: A list of addresses.
 *       403:
 *         description: Error connected with authorization.
*/
addressRouter.get('/customer', asyncHandler(getCurrentCustomerAddresses))

/**
 * @swagger
 * /addresses/customer:
 *   post:
 *     summary: Creates an address for the current customer.
 *     description: Creates an address for the current customer. Can be used only by customers.
 *     tags:
 *       - "addresses"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerAddressCreate'
 *     responses:
 *       201:
 *         description: A created сustomer address.
 *       403:
 *         description: Error connected with authorization.
*/
addressRouter.post('/customer', asyncHandler(createCustomerAddress))

/**
 * @swagger
 * /addresses/{customerAddressId}/customer:
 *   delete:
 *     summary: Deletes an address for the current customer.
 *     description: Deletes an address for the current customer. Can be used only by customers.
 *     tags:
 *       - "addresses"
 *     parameters:
 *       - $ref: '#/components/parameters/customerAddressId'
 *     responses:
 *       200:
 *         description: Customer address was deleted.
 *       403:
 *         description: Error connected with authorization.
*/
addressRouter.delete('/:customerAddressId/customer', asyncHandler(deleteCustomerAddress))