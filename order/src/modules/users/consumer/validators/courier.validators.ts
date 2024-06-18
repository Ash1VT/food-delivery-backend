import { idValidator } from "@src/core/validators/idValidator";
import { z } from "zod";

export const courierCreatedValidator = z.object({
    id: idValidator
})