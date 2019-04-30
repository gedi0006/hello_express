
const router = express.Router()


router.post('/', async (req, res) => {})

router.get('/:id', async (req, res) => {})

router.patch('/:id', async (req, res) => {})

router.put('/:id', async (req, res) => {})

router.delete('/:id', async (req, res) => {})

//post

router.post('/', async (req, res) => {
  let attributes = req.body
  delete attributes._id

  let newPizza = new Pizza(attributes)
  await newPizza.save()

  res.status(201).send({data: newPizza})
})
//pztch

router.patch('/:id', async (req, res) => {
  try {
    const {_id, ...otherAttributes} = req.body
    const pizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      {_id: req.params.id, ...otherAttributes},
      {
        new: true,
        runValidators: true
      }
    )
    if (!pizza) throw new Error('Resource not found')
    res.send({data: pizza})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})
//put
router.put('/:id', async (req, res) => {
  try {
    const {_id, ...otherAttributes} = req.body
    const pizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      {_id: req.params.id, ...otherAttributes},
      {
        new: true,
        overwrite: true,
        runValidators: true
      }
    )
    if (!pizza) throw new Error('Resource not found')
    res.send({data: pizza})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})
//delete
router.delete('/:id', async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndRemove(req.params.id)
    if (!pizza) throw new Error('Resource not found')
    res.send({data: pizza})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})


module.exports = router
