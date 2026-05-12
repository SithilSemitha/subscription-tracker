import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req,res) => {
    res.send({message: "GET ALL SUBSCRIPTIONS"});
})

subscriptionRouter.get('/:id', (req,res) => {
    res.send({message: "GET ALL SUBSCRIPTIONS BY ID"});
})

subscriptionRouter.post('/', (req,res) => {
    res.send({message: "CREATE SUBSCRIPTIONS"});
})

subscriptionRouter.put('/:id', (req,res) => {
    res.send({message: "UPDDATE SUBSCRIPTIONS"});
})

subscriptionRouter.delete('/:id', (req,res) => {
    res.send({message: "DELETE SUBSCRIPTIONS"});
})

subscriptionRouter.get('/user/:id', (req,res) => {
    res.send({message: "GET ALL SUBSCRIPTIONS FOR USER"});
})

subscriptionRouter.put('/:id/cancel', (req,res) => {
    res.send({message: "CANCVEL SUBSCRIPTION"});
})

subscriptionRouter.get('/upcoming-renewals', (req,res) => {
    res.send({message: "GET UPCOMING RENEWALS"});
})

export default subscriptionRouter;  