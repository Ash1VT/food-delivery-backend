import { idValidator } from "@src/core/validators/idValidator";
import { z } from "zod";

export const customerCreateValidator = z.object({
    id: idValidator
})