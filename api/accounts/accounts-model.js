const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).first()
}

const create = async (account) => {
  // DO YOUR MAGIC
  const [ids] = await db('accounts').insert(account)
  const newAccount = await getById(ids)
  return newAccount
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  const result = await db('accounts')
    .update(account)
    .where('id', id)
  console.log(result)
  return getById(id)
}

const deleteById = async (id) => {
  // DO YOUR MAGIC
  const account = getById(id)
  const result = await db('accounts').del().where('id', id)
  console.log(account)
  console.log(result)
  return account
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
