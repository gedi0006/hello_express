const cars = require('../data/cars.json')

const validateCarId = (req, res, next) => {
  const carId = parseInt(req.params.carId)
  const index = cars.findIndex(car => car.id === carId)
  if (index < 0) {
    res.status(404).send({
      errors: [
        {
          status: 'Not Found',
          code: '404',
          title: 'Resource does not exist',
          description: `We could not find a car with id: ${carId}`
        }
      ]
    })
  } else {
    req.carIndex = index
    next()
  }
}

module.exports = validateCarId