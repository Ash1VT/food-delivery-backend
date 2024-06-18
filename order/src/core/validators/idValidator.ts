import { z } from "zod";

export const idValidator = z.any().transform( value => {
    try { return BigInt( value ) }
    catch ( error ) { return value }
} ).pipe( z.bigint().nonnegative({
    message: "Id must be nonnegative"
}))