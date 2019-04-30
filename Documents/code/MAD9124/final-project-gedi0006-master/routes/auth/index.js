const authorize = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const sanitizeBody = require("../../middleware/sanitizeBody")
const User = require('../../models/User')

const bcrypt = require('bcrypt')
const saltRounds = 14


// router.post('/users', async (req, res) => {
//   res.status(201).send({data: 'new user created.'})
// })
// Register a new user


router.post('/users', sanitizeBody, async (req, res) => {
 
  try {
    let newUser = new User(req.sanitizedBody)
    const itExists = !!(await User.countDocuments({email: newUser.email}))
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

  // return error
}
    newUser.password = await bcrypt.hash(newUser.password, saltRounds)
    console.log(newUser)
    await newUser.save()
    res.status(201).send({data: newUser})
  } catch (err) {
    console.log(err.message);
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

router.post('/tokens', sanitizeBody, async (req, res) => {
  // check if the payload.username is valid
  // retrieve the stored password hash
  // compare the payload.password with the hashed password
  // if all is good, return a token
  // if any condition failed, return an error message

  const {email, password} = req.sanitizedBody
  const user = await User.findOne({email: email})
  if (!user) {
    return res.status(401).send({errors: ['we will build this later']})
  }
  const passwordDidMatch = await bcrypt.compare(password, user.password)
  if (!passwordDidMatch) {
    return res.status(401).send({errors: ['we will build this later']})
  }
  const token = jwt.sign({_id: user._id}, 'superSecureSecret')
res.status(201).send({data: {token}})
  // if all is good, return a token
  // compare the payload.password with the hashed
})

router.get('/users/me', authorize, async (req, res) => {
  const user = await User.findById(req.user._id)
  res.send({data: user})
})
module.exports = router