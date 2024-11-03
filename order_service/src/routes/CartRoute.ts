import express, { NextFunction, Request, Response } from "express";
import * as service from '../services/cartService';
import * as repository from '../repository/cartRepository';

const router = express.Router();
const repo = repository.CartRepository;

router.post(
    "/cart",
    async (req: Request, res: Response, next: NextFunction) => {

        const resposne = await service.CreateCart(req.body, repo);
        return next(res.status(200).json(resposne));
    }
);

router.get(
    "/cart",
    async (req: Request, res: Response, next: NextFunction) => {
        const resposne = await service.GetCart(req.body, repo);
        return next(res.status(200).json(resposne));
    }
);

router.patch(
    "/cart/:lineItemId",
    async (req: Request, res: Response, next: NextFunction) => {
        const resposne = await service.EditCart(req.body, repo);
        return next(res.status(200).json(resposne));
    }
);

router.delete(
    "/cart/:lineItemId",
    async (req: Request, res: Response, next: NextFunction) => {
        const resposne = await service.DeleteCart(req.body, repo);
        return next(res.status(200).json(resposne));
    }
);

export default router;