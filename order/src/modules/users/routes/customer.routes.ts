import { asyncHandler } from "@src/core/utils/asyncHandler";
import { Router } from "express";
import { approveCustomerAddress, getCustomerAddresses, getCustomersAddresses, rejectCustomerAddress } from "../controllers/customer.controllers";


/**
 * @swagger
 * components:
 *   parameters:
 *     customerId:      
 *       in: path
 *       name: customerId
 *       required: true
 *       schema:
 *         type: integer
 *       description: Customer ID
*/
export const customerRouter = Router()

/**
 * @swagger
 * /customers/addresses:
 *   get:
 *     summary: Retrieve a list of customers addresses.
 *     description: Retrieve a list of customers addresses. Can be used only by moderators.
 *     tags:
 *       - "customers"
 *     parameters:
 *       - $ref: '#/components/parameters/approvalStatus'
 *     responses:
 *       200:
 *         description: A list of orders.
 *       403:
 *         description: Error connected with authorization.
*/
customerRouter.get("/addresses", asyncHandler(getCustomersAddresses))

/**
 * @swagger
 * /customers/{customerId}/addresses:
 *   get:
 *     summary: Retrieve a list of customer addresses.
 *     description: Retrieve a list of customer addresses. Can be used only by moderators.
 *     tags:
 *       - "customers"
 *     parameters:
 *       - $ref: '#/components/parameters/customerId'
 *     responses:
 *       200:
 *         description: A list of orders.
 *       403:
 *         description: Error connected with authorization.
*/
customerRouter.get("/:customerId/addresses", asyncHandler(getCustomerAddresses))

/**
 * @swagger
 * /customers/addresses/{customerAddressId}/approve:
 *   patch:
 *     summary: Approves a customer address.
 *     description: Approves a customer address. Can be used only by moderators.
 *     tags:
 *       - "customers"
 *     parameters:
 *       - $ref: '#/components/parameters/customerAddressId'
 *     responses:
 *       200:
 *         description: Empty response.
 *       403:
 *         description: Error connected with authorization.
 *       404:
 *         description: Customer address not found.
*/
customerRouter.patch("/addresses/:customerAddressId/approve", asyncHandler(approveCustomerAddress))

/**
 * @swagger
 * /customers/addresses/{customerAddressId}/reject:
 *   patch:
 *     summary: Rejects a customer address.
 *     description: Rejects a customer address. Can be used only by moderators.
 *     tags:
 *       - "customers"
 *     parameters:
 *       - $ref: '#/components/parameters/customerAddressId'
 *     responses:
 *       200:
 *         description: Empty response.
 *       403:
 *         description: Error connected with authorization.
 *       404:
 *         description: Customer address not found.
*/
customerRouter.patch("/addresses/:customerAddressId/reject", asyncHandler(rejectCustomerAddress))