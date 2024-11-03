import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.post(
    "/order",
    async (req: Request, res: Response, next: NextFunction) => {

        return next(res.status(200).json({message: "create the order"}));
    }
);

router.get(
    "/order",
    async (req: Request, res: Response, next: NextFunction) => {
        return next(res.status(200).json({message: "get the orders"}));
    }
);

router.get(
    "/order/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        return next(res.status(200).json({message: "get the order"}));
    }
);

router.delete(
    "/order/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        return next(res.status(200).json({message: "delete the order item"}));
    }
);

export default router;