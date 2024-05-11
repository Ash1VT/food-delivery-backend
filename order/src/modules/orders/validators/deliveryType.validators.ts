import { z } from "zod";
import { DeliveryType } from "../models/deliveryType.models";


export const deliveryTypeValidator = z.enum([
    "walking",
    "driving",
]).transform((status) => status.toUpperCase() as DeliveryType)