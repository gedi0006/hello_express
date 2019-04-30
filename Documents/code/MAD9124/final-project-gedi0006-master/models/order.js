const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    customer:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    type:{enum:['pickup','delivery']},
    status:{enum:['draft','ordered','paid','delivered'],default:'draft'},
    pizzas:{type:mongoose.Schema.Types.ObjectId, ref:'pizza'},
    address:{type:string,required:'delivery'},
    price:{type:number,default:0},
    deliveryCharge:{type:number,default:'delivery'},
    tax:{type:number,default:0},
    total:{type:number,default:0},
    createdAt:{type:Date,default:Date.now()},
    updatedAt:{type:Date,default:Date.now()}
     
    
})

const Model  = mongoose.model('order',schema)

module.exports = Model