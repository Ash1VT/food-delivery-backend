import { idValidator } from "@src/core/validators/idValidator";
import { z } from "zod";

export const customerCreatedValidator = z.object({
    id: idValidator
})