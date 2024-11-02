import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.post(
    "/product", 
    async (req: Request, res: Response, next: NextFunction) => {
       return next( res.status(201).json({}));
    }
);

export default router;