const express = require('express')
const router = express.Router()




router.get('/:id', async (req, res) => {})

router.patch('/:id', async (req, res) => {})

router.put('/:id', async (req, res) => {})

router.delete('/:id', async (req, res) => {})


const Order = require('../models/Order')
router.get('/:id', async (req, res) => {
    try {
      const order = await Car.findById(req.params.id)
      if (!order) throw new Error('Resource not found')
      res.send({data: order})
    } catch (err) {
      res.status(404).send({
        errors: [
          {
            status: 'Not Found',
            code: '404',
            title: 'Resource does not exist',
            description: `We could not find a car with id: ${req.params.id}`
          }
        ]
      })
    }
  })
  //patch
  router.patch('/:id', async (req, res) => {
    try {
      const {_id, ...otherAttributes} = req.body
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        {_id: req.params.id, ...otherAttributes},
        {
          new: true,
          runValidators: true
        }
      )
      if (!order) throw new Error('Resource not found')
      res.send({data: order})
    } catch (err) {
      sendResourceNotFound(req, res)
    }
  })
  //put
  router.put('/:id', async (req, res) => {
    try {
      const {_id, ...otherAttributes} = req.body
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        {_id: req.params.id, ...otherAttributes},
        {
          new: true,
          overwrite: true,
          runValidators: true
        }
      )
      if (!order) throw new Error('Resource not found')
      res.send({data: order})
    } catch (err) {
      sendResourceNotFound(req, res)
    }
  })
  //delete
  router.delete('/:id', async (req, res) => {
    try {
      const order = await Order.findByIdAndRemove(req.params.id)
      if (!order) throw new Error('Resource not found')
      res.send({data: order})
    } catch (err) {
      sendResourceNotFound(req, res)
    }
  })
  module.exports = router