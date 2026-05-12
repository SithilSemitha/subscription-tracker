import express, { json } from 'express';
import { PORT } from './config/env.js';
import authRouter  from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import  subscriptionRouter  from './routes/subscription.routes.js';

const app = express();
app.use(express(json));

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/users', userRouter);

app.use('/api/v1/subscriptions',subscriptionRouter);

app.listen(PORT, ()=>{
    console.log(`Subscription API is Sucessfully running on http://localhost:${PORT}`)
})

export default app;