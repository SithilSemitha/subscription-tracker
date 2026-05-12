import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: 3,
        maxLengh:255,
    },
    price:{
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Subscription price cannot be negative"],
    },
    currency:{
        type: String,
        required: [true, "Subscription currency is required"],
        enum: ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD"],
        default: "USD",
    },
    frequency:{
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category:{
        type: String,
        enum: ["entertainment", "utilities", "software", "education", "health", "other"],
        required: [true, "Subscription category is required"],
    },
    paymentMethod:{
        type: String,
        required: [true, "Payment method is required"],
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "canceled"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: true,
        validate :{
            validator: (value) => value <= new Date(),
            message: "Start date cannot be in the future",
        }
    },
    renewalDate: {
        type: Date,
        validate :{
            validator: function(value){
                return value >= this.startDate;
            },
            message: "Renewal date must be after the start date",
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    }
}, {timestamps: true});

//Auto Caluclating renewal date 
subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate)
        {
            const renewalPeriods = {  
                daily: 1,
                weekly: 7,
                monthly: 30,
                yearly: 365,
              };

            this.renewalDate = new Date(this.startDate);
            this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
        }

    //Auto Update status based on renewal date
    if(this.renewalDate <= new Date()){
        this.status = "inactive";
    }
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;