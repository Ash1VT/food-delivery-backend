import { idValidator } from "@src/core/validators/idValidator";
import { z } from "zod";


export const moderatorCreatedValidator = z.object({
    id: idValidator
})