const mongoose = require("mongoose")

const PaymentSchema = new mongoose.Schema({

studentId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Student"
},

amount:Number,

paymentId:String,

date:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Payment",PaymentSchema)