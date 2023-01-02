const stripe = require("stripe")(process.env.STRIPE_SECRET);
import { NextFunction, Request, Response } from "express";

export const createPaymentIntent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        let customer = await stripe.customers.create({
            shipping: {
              name: "Jenny Rosen",
              address: {
                line1: "510 Townsend St",
                postal_code: "98140",
                city: "San Francisco",
                state: "CA",
                country: "US"
              }
            }
          });

        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: "2020-08-27" }
          );

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
          amount: req.body.price,
          currency: "eur",
          automatic_payment_methods: {
            enabled: true,
          },
        });
      
        res.send({
        publishableKey: process.env.publishable_key, // https://stripe.com/docs/keys#obtain-api-keys
        paymentIntent: paymentIntent.client_secret,
        customer: customer.id,
        ephemeralKey: ephemeralKey.secret
        });
    } catch (err: any) {
        next(err);
    }
};

