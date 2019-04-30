const debug = require('debug')('pizza:db')
const mongoose = require('mongoose')

module .exports = () =>{
    mongoose
    .connect(
        `mongodb://localhost:27017/mad9124`,
        {
            useNewUrlParser : true
        }
    )
        .then(()=>{
            debug(`connected to mongoDB.....`)
        })
        .catch(err => {
            debug(`error connecting to mongoDB...`,err)
            process.exit(1)
        })
    
}