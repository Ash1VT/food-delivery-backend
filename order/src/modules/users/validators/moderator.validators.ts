import { idValidator } from "@src/core/validators/idValidator";
import { z } from "zod";


export const moderatorCreateValidator = z.object({
    id: idValidator
})