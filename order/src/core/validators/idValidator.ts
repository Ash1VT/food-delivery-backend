import { z } from "zod";

export const idValidator = z.coerce.bigint().nonnegative({
    message: "Id must be nonnegative"
})