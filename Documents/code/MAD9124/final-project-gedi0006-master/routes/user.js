//register a new user
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  firstName: {type: String, trim: true, maxlength: 64, required: true},
  lastName: {type: String, trim: true, maxlength: 64},
  email: {type: String, trim: true, maxlength: 512, required: true},
  password: {type: String, trim: true, maxlength: 70, required: true}
})

const Model = mongoose.model('User', schema)

module.exports = Model
//create a new user
router.post('/users', sanitizeBody, async (req, res) => {
    try {
      let newUser = new User(req.sanitizedBody)
      await newUser.save()
      res.status(201).send({data: newUser})
    } catch (err) {
      res.status(500).send({
        errors: [
          {
            status: 'Internal Server Error',
            code: '500',
            title: 'Problem saving document to the database.'
          }
        ]
      })
    }
  })

  //bcrypt
  const bcrypt = require('bcrypt')
const saltRounds = 14
// ...
let newUser = new User(req.sanitizedBody)
newUser.password = await bcrypt.hash(newUser.password, saltRounds)
await newUser.save()
// ...
//unique mail
let newUser = new User(req.sanitizedBody)
const itExists = !!(await User.countDocuments({email: newUser.email}))
if (itExists) {
  // return error
}
newUser.password = await bcrypt.hash(newUser.password, saltRounds)
//...
if (itExists) {
    return res.status(400).send({
      errors: [
        {
          status: 'Bad Request',
          code: '400',
          title: 'Validation Error',
          detail: `Email address '${newUser.email}' is already registered.`,
          source: {pointer: '/data/attributes/email'}
        }
      ]
    })
  }
//login a user
router.post('/tokens', sanitizeBody, async (req, res) => {
    const {email, password} = req.sanitizedBody
    const user = await User.findOne({email: email})
    if (!user) {
      return res.status(401).send({errors: ['we will build this later']})
    }
  
    const passwordDidMatch = await bcrypt.compare(password, user.password)
    if (!passwordDidMatch) {
      return res.status(401).send({errors: ['we will build this later']})
    }
    // if all is good, return a token
    // if any condition failed, return an error message
  })
