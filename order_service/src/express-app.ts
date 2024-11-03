import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import cartRoute from './routes/CartRoute';
import orderRoute from './routes/OrderRoute';
import { httpLogger, HandleErrorWithLogger } from './utils';
import { MessageBroker } from './utils/broker';
import { Consumer, Producer } from 'kafkajs';

export const ExpressApp = async() => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(httpLogger);

    //Step 1: Connect to producer and consumer
    const producer = await MessageBroker.connectProducer<Producer>();
    producer.on("producer.connect", () => {
        console.log("Producer connected");
    });
    
    const consumer = await MessageBroker.connectConsumer<Consumer>();
    consumer.on("consumer.connect", () => {
        console.log("Consumer connected");
    });

    //2nd Step: Subscribe to the topic or publish the message
    //consumer is just for testing will move this to catalog service
    await MessageBroker.subscribe((message) => {
        console.log("Consumer received the message");
        console.log("Message Received", message);
    }, "OrderEvents");

     // Routes
    app.use(cartRoute);
    app.use(orderRoute);
     app.use('/api/health', (req: Request, res: Response, _: NextFunction) => {
        return _(res.status(200).json({message: "Feeling good"}));
    });
    
    app.use(HandleErrorWithLogger);

    return app;
}
