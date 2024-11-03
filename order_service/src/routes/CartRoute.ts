import express, { NextFunction, Request, Response } from "express";
import * as service from '../services/cartService';
import * as repository from '../repository/cartRepository';
import { ValidateRequest } from "../utils/validator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest";
import {RequestAuthorizer} from "../middleware/middleware";

const router = express.Router();
const repo = repository.CartRepository;

router.post(
    "/cart",
    RequestAuthorizer,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const err= ValidateRequest<CartRequestInput> (req.body, CartRequestSchema);
            if (err) {
                return next(res.status(404).json(err));
            }

            const resposne = await service.CreateCart(req.body as CartRequestInput, repo);
            
            return next(res.status(200).json(resposne));
        } catch(error) {
            return next(res.status(404).json(error));
        }
        
    }
);

router.get(
    "/cart",
    async (req: Request, res: Response, next: NextFunction) => {
        const resposne = await service.GetCart(req.body.customerId, repo);
        return next(res.status(200).json(resposne));
    }
);

router.patch(
    "/cart/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        const lintItemId =  req.params.id;
        const resposne = await service.EditCart(req.body.customerId, repo);
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