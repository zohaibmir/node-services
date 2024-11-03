import express, { NextFunction, Request, Response } from "express";
import { MessageBroker } from "../utils";
import { OrderEvent } from "../types";

const router = express.Router();

router.post(
    "/order",
    async (req: Request, res: Response, next: NextFunction) => {
        // Create Order Logic

        //3rd Step: publish the message
        await MessageBroker.publish({
            topic: "OrderEvents",
            headers: { token: req.headers.authorization },
            event: OrderEvent.CREATE_ORDER,
            message: {
                orderId: 1,
                items: [
                    {
                        productId: 1,
                        quantity: 1
                    }, {
                        productId: 2,
                        quantity: 2
                    },
                ],
            },
        });
        return next(res.status(200).json({ message: "create the order" }));
    }
);

router.get(
    "/order",
    async (req: Request, res: Response, next: NextFunction) => {
        return next(res.status(200).json({ message: "get the orders" }));
    }
);

router.get(
    "/order/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        return next(res.status(200).json({ message: "get the order" }));
    }
);

router.delete(
    "/order/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        return next(res.status(200).json({ message: "delete the order item" }));
    }
);

export default router;