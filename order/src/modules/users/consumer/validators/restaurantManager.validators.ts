import { idValidator } from "@src/core/validators/idValidator";
import { z } from "zod";


export const restaurantManagerCreatedValidator = z.object({
    id: idValidator
})