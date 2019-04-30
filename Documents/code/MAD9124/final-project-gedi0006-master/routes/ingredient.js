
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

  let newIngredient = new Ingredient(attributes)
  await newIngredient.save()

  res.status(201).send({data: newIngredient})
})
//patch

router.patch('/:id', async (req, res) => {
  try {
    const {_id, ...otherAttributes} = req.body
    const ingredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      {_id: req.params.id, ...otherAttributes},
      {
        new: true,
        runValidators: true
      }
    )
    if (!ingredient) throw new Error('Resource not found')
    res.send({data: ingredient})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})
//put
router.put('/:id', async (req, res) => {
  try {
    const {_id, ...otherAttributes} = req.body
    const ingredient = await ingredient.findByIdAndUpdate(
      req.params.id,
      {_id: req.params.id, ...otherAttributes},
      {
        new: true,
        overwrite: true,
        runValidators: true
      }
    )
    if (!ingredient) throw new Error('Resource not found')
    res.send({data: ingredient})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})
//delete
router.delete('/:id', async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndRemove(req.params.id)
    if (!ingredient) throw new Error('Resource not found')
    res.send({data: ingredient})
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})


module.exports = router
