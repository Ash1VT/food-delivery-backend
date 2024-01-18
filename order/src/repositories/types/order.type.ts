import { Order, Prisma } from "@prisma/client";

export type OrderDelegate = Prisma.OrderDelegate
export type OrderModel = Order
export type OrderCreateInput = Prisma.OrderUncheckedCreateInput
export type OrderUpdateInput = Prisma.OrderUncheckedCreateInput