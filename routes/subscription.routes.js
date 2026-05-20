import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { createSubscription, getUserSubcriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req,res) => {
    res.send({message: "GET ALL SUBSCRIPTIONS"});
})

subscriptionRouter.get('/:id', (req,res) => {
    res.send({message: "GET ALL SUBSCRIPTIONS BY ID"});
})

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req,res) => {
    res.send({message: "UPDDATE SUBSCRIPTIONS"});
})

subscriptionRouter.delete('/:id', (req,res) => {
    res.send({message: "DELETE SUBSCRIPTIONS"});
})

subscriptionRouter.get('/user/:id', authorize, getUserSubcriptions);

subscriptionRouter.put('/:id/cancel', (req,res) => {
    res.send({message: "CANCVEL SUBSCRIPTION"});
})

subscriptionRouter.get('/upcoming-renewals', (req,res) => {
    res.send({message: "GET UPCOMING RENEWALS"});
})

export default subscriptionRouter;  