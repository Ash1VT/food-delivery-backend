import { idValidator } from "@src/core/validators/idValidator";
import { z } from "zod";

export const courierCreateValidator = z.object({
    id: idValidator
})