import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import cartRoute from './routes/CartRoute';
import orderRoute from './routes/OrderRoute';
import { httpLogger, HandleErrorWithLogger } from './utils';



const app = express();

app.use(cors());
app.use(express.json());
app.use(httpLogger);

// Routes
app.use('/api/health', (req: Request, res: Response, _: NextFunction) => {
    return _(res.status(200).json({message: "Feeling good"}));
});

//app.use(HandleErrorWithLogger);
app.use(cartRoute);
app.use(orderRoute);


export default app;