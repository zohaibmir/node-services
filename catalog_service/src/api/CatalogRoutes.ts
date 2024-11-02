import express, { NextFunction, Request, Response } from 'express';
import { CatalogService } from '../services/catalogService';
import { CatalogRepository } from '../repository/catalogRepository';

const router = express.Router();

const catalogService = new CatalogService(new CatalogRepository());

router.post(
    "/products", 
    async (req: Request, res: Response, next: NextFunction) => {
        const data = await catalogService.createProduct(req.body);
       return next( res.status(201).json(data));
    }
);

export default router;