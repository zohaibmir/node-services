import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import cartRoute from './routes/CartRoute';
import orderRoute from './routes/OrderRoute';



const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', (req: Request, res: Response, _: NextFunction) => {
    return _(res.status(200).json({message: "Feeling good"}));
});

app.use(cartRoute);
app.use(orderRoute);

export default app;