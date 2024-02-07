import { idValidator } from "@src/core/validators/idValidator";
import { z } from "zod";
import { orderItemCreateValidator } from "./orderItem";

export const orderCreateValidator = z.object({
    restaurantId: idValidator,
    promotionId: idValidator.optional(),
    promocode: z.string().optional(),
    items: orderItemCreateValidator.array().min(1, {
        message: "Must be at least one order item in order"
    })
}).refine((order) => new Set(order.items.map((item) => item.menuItemId)).size === order.items.length, {
    message: "Menu items mustn't repeat"
})