const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name : {type:String, maxlength:64,required:true},
    price : {type:number, maxlength:10000,default:100},
    quantity:{type:String,maxlength:10000,default:10},
    isGlutenFree:{type:Boolean,default:false},
    imageURL:{type:String,maxlength:1024},
    categories:{enum:['meat','spicy','vegitarian','vegan','halal','kosher','cheeze','seasonings']}
})

const Model  = mongoose.model('ingredient',schema)

module.exports = Model