const db = require('../../data/db-config')
const Acount = require('./accounts-model')

const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {name, budget} = req.body
  if(name === undefined || budget === undefined){
    res.status(400).json({ message: "name and budget are required" })
  } else if(typeof name !== 'string'){
    res.status(400).json({ message: "name of account must be a string" })
  } else if(name.trim().length < 3 || name.trim().length > 100){
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  } else if(typeof budget !== 'number'){
    res.status(400).json({ message: "budget of account must be a number" })
  } else if(budget < 0 || budget > 1000000){
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else {
    req.name = name.trim()
    req.budget = budget
    next()
  }
}

const checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
  const existing = await db('accounts')
    .where('name', req.body.name.trim())
    .first()
  
  if(existing) {
    res.status(400).json({ message: "that name is taken" })
  } else {
    next()
  }
}catch(err) {
  next(err)
}
}

const checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const possible = await Acount.getById(req.params.id)
    if(possible) {
      req.account = possible
      next()
    }else{
      next({status: 404, message: "account not found"})
    }
  }catch(err){
    next(err)
  }
}

module.exports = {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique
}