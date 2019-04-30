const ingredient = require('./ingredient')
const mongoose  = require('mongoose')

const schema = new mongoose.Schema({

    name : {type:String, minlength:4,maxlength:64,required:true},
    price : {type:number,minlength:1000 ,maxlength:10000,default:1000},
    size: {enum:['small','medium','large','extra large']},
    isGlutenFree:{type:Boolean,default:false},
    imageURL:{type:String,maxlength:1024},
    ingredient:{type:mongoose.Schema.Types.ObjectId, ref:'ingredient'}

})

const model = mongoose.model('Pizza',schema)

module.exports = model