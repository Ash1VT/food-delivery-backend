import appSettings from "./settings/appSettings";
import Stripe from "stripe"


const stripe = new Stripe(appSettings.variables.stripeSecretKey, {
    apiVersion: "2024-04-10",
})

export default stripe