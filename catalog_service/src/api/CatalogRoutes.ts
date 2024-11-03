import express, { NextFunction, Request, Response } from 'express';
import { CatalogService } from '../services/catalogService';
import { CatalogRepository } from '../repository/catalogRepository';
import { RequestValidator } from '../utils/requestValidator';
import { ProductRequest } from '../dto/ProductRequest';
import { json } from 'stream/consumers';

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

router.post(
    "/products", 
    async (req: Request, res: Response, next: NextFunction) => {
        const { errors, input } = await RequestValidator(ProductRequest, req.body);
        if (errors) {
            
            return  next(res.status(400).json(errors));
        }
        const data = await catalogService.createProduct(req.body);
        
        return next( res.status(201).json(data));
    }
);

export default router;