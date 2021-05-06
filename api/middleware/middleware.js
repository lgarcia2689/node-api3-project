const Users = require('../users/users-model')
const yup = require('yup');

const messageSchema = yup.object({
  name: yup.string()
    .trim()
    .required('name required')
    .min(3, 'name must be 3 chars')
    .max(40, 'name must be under 40 chars'),
  text: yup.string()
    .trim()
    .required('text required')
    .min(3, 'text must be 3 chars')
    .max(40, 'text must be under 40 chars'),
  postedBy: yup.string()
    .trim()
    .required('text required')
    .min(3, 'text must be 3 chars')
    .max(40, 'text must be under 40 chars'),
})

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`
    ${req.method} request to ${req.baseUrl} endpoint!
    req.body ${JSON.stringify(req.body)}
    req.params.id ${req.params.id}
  `)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const users = await Users.getById(req.params.id)
    if (!users) {
      next({ status: 404, message: `users with id ${req.params.id} not found!` })
    } else {
      req.users = users
      next()
    }
  } catch (err) {
    next(err)
  }
}

async function validateUser(req, res, next) {
  // DO YOUR MAGIC
  try {
    const validated = await messageSchema.validate(req.body, {
      stripUnknown: true,
    })
    req.body = validated
    next()
  } catch (err) {
    // here validation failed
    next({ status: 400, message: err.message })
  }
}

async function validatePost(req, res, next) {
  // DO YOUR MAGIC
  // try {
  //   const validated = await messageSchema.validate(req.body, {
  //     stripUnknown: true,
  //   })
  //   req.body = validated
  //   next()
  // } catch (err) {
  //   // here validation failed
  //   next({ status: 400, message: err.message })
  // }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};