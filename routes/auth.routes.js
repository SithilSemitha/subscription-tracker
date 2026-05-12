import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-up', (req,res)=> {
    res.send({title : "Sucesfuully Signed Up "});
})


authRouter.post('/sign-in', (req,res)=> {
    res.send({title : "Sucesfuully Signed In "});
})


authRouter.post('/sign-out', (req,res)=> {
    res.send({title : "Sucesfuully Signed Out "});
})


export default authRouter;