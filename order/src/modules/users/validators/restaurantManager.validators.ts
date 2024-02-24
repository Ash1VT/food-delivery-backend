import { idValidator } from "@src/core/validators/idValidator";
import { z } from "zod";


export const restaurantManagerCreateValidator = z.object({
    id: idValidator
})