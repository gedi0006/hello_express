const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    firstName : {type:String, maxlength:64,required:true},
    lastName : {type:String, maxlength:true},
    email:{type:String,maxlength:512,required,unique:true},
    password:{type:String,maxlength:70,required:true},
    isStaff:{type:boolean,default:false}
})

const model = mongoose.model('User',schema)

// schema.methods.toJSON = function(){
//     const obj = this.object()

//     delete obj.password
//     delete obj._v
//     return obj

// }

model.exports = model