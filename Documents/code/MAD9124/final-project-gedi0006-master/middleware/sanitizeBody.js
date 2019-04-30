const debug = require('debug')('sanitize:body')

const xss = require('xss')

const sanitize = sourceString => {
    return xss(sourceString,{
        WhiteList :[],
        stripIgnoreTag:true,
        stripIgnoreTagBody:['script']

    })
}

const stripTags = payload =>{
    let attributes = { ...payload}
    for(let key in attributes){
        if(attributes[key] instanceof Array){
            debug('recurse array',attributes[key])
            attributes[key] = attributes[key].map(element =>{
                return typeof element === 'string'
                ? sanitize(element)
                :stripTags(element)
                 
            })
        }else if(attributes[key] instanceof Object){
            debug('recurse object',attributes[key])
            attributes[key] = stripTags(attributes[key])
        }else{
            attributes[key] = sanitize(attributes[key])
        }
    }
    return attributes
}


module.exports = (req,res,next) => {
    debug({ body:req.body})
    const {id,_id,...attributes} = req.body
    debug({attributes})
    const sanitizeBody = stripTags(attributes)
    debug({sanitizeBody})
    req.sanitizeBody = sanitizeBody
    next()
}