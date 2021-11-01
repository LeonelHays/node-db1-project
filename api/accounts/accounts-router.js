const router = require('express').Router()
const Account = require('./accounts-model')
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Account.getAll()
    .then(accounts => {
      res.json(accounts)
    })
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res) => {
  // DO YOUR MAGIC
  res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique,(req, res, next) => {
  // DO YOUR MAGIC
  Account.create({ name: req.name, budget: req.budget })
    .then(newAcount => {
      res.status(201).json(newAcount)
    })
    .catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  Account.updateById(req.params.id, {name: req.name, budget: req.budget})
    .then(data => {
      res.json(data)
    })
    .catch(next)
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const removed = await Account.deleteById(req.params.id)
    console.log(removed)
    res.json(req.account)
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    customMessage: 'somthing bad inside the router happend',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
