import { Router } from "express";

const userRouter = Router();

//GET All users 
userRouter.get('/', (req,res)=> {
    res.send({meesage: "GET All THE USERS"});
})

//GET Users by id
userRouter.get('/:id',(req,res)=>{
    res.send({message: "GET USERS BY ID"});
})

//Creating a new user
userRouter.post('/',(req,res)=>{
    res.send({message: "USER CREATED"})
})

// Updating a new user
userRouter.put('/:id',(req,res)=>{
    res.send({message: "UPDATING A USER"})
})

// Deleting a new user
userRouter.delete('/:id',(req,res)=>{
    res.send({message: "DELETING A USER"})
})

export default userRouter;