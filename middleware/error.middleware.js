const errorMiddleware = (err, req, res, next) => {
    try{
        let error = { ...err }; 
        error.message = err.message;
        console.error("Error: ", error);

        //Mongoose bad ObjectId error
        if(err.name === 'CastError'){
            const message = "Resource not found ";
            error = new Error ( message );
            error.statusCode = 400;
        }

        //Mongoose Duplicate Key 
        if(err.code === 11000){
            const message = "Dupplicate Value Inserted";
            error = new Error (message);
            error.statusCode = 400;
        }

        // Validation Error 
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message);
            error = new Error (message.join(', '));
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({ sucess: false, error: error.message || "Server Error" });

    }
    catch(error){
        next(error);
    }
};


export default errorMiddleware; 