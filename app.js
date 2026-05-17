import express, { json } from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';
import authRouter  from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import  subscriptionRouter  from './routes/subscription.routes.js';
import connectToTheDatabase  from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import arjectMiddleware from './middleware/arcjet.middleware.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arjectMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`Subscription API is Sucessfully running on http://localhost:${PORT}`)
    await connectToTheDatabase();
})

export default app;