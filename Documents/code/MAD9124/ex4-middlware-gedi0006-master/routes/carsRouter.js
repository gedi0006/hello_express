
const cars  = require('../data/cars.js')

const ValidateCarId = require('../middleware/validateId.js')

const express = require('express')

const router = express.Router()


router.use('/:carId',ValidateCarId)


router.get('/',(req,res) => res.send({data:cars}))

router.get('/:carId', (req, res) => {
    const carId = parseInt(req.params.carId)
    const car = cars.find(car => car.id === carId)
    res.send({data: car})
  })


  router.post('/',(req,res)=>{
      const { make,model,colour} = req.body
       
      const newCar = {
          id:Date.now(),
          make:make,
          model:model,
            colour:colour
      }
      cars.push(newCar)
      res.status(201).send({data:newCar})
  })




  router.put('/:carId', (req, res) => {
    const {make, model, colour} = req.body
    const updatedCar = {id: parseInt(req.params.carId), make, model, colour}
    cars[req.carIndex] = updatedCar
    res.send({data: updatedCar})
  })
  



  router.patch('/:carId', (req, res) => {
    const {id, ...theRest} = req.body
    const updatedCar = Object.assign({}, cars[req.carIndex], theRest)
    cars[req.carIndex] = updatedCar
    res.send({data: updatedCar})
  })
  



  router.delete('/:carId', (req, res) => {
    const deletedCar = cars[req.carIndex]
    cars.splice(req.carIndex, 1)
    res.send({data: deletedCar})
  })


  module.exports = router
  
