import express, { NextFunction, Request, Response } from 'express';
import { CatalogService } from '../services/catalogService';
import { CatalogRepository } from '../repository/catalogRepository';
import { RequestValidator } from '../utils/requestValidator';
import { ProductRequest } from '../dto/ProductRequest';

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

router.post(
    "/products",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { errors, input } = await RequestValidator(ProductRequest, req.body);
            console.log(errors);
            if (errors) {

                return next(res.status(400).json(errors));
            }
            const data = await catalogService.createProduct(req.body);

            return next(res.status(201).json(data));
        } catch (error) {
            const err = error as Error;

            return next(res.status(500).json(err.message));
        }
    }
);

export default router;