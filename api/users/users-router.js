const express = require('express');
const Middleware = require('../middleware/middleware')
const Users = require('./users-model')
const Posts = require('../posts/posts-model')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();
const {logger,validateUserId, validateUser, validatePost} = Middleware

router.get('/', logger,(req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
  .then(users=>{
    res.status(200).json(users)
  })
  .catch(err =>{
    next(err)
  })
});

router.get('/:id', logger, validateUserId,(req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.users)
});

router.post('/', logger, validateUser,(req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  
  Users.insert(req.body)
    .then(users => {
      res.status(201).json(users)
    })
    .catch(next)
});

// router.put('/:id', (req, res) => {
//   // RETURN THE FRESHLY UPDATED USER OBJECT
//   // this needs a middleware to verify user id
//   // and another middleware to check that the request body is valid
// });

router.delete('/:id',logger, validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
  .then(() => {
    res.status(200).json({message:'the user has been removed'});
  })
  .catch(next)
});

router.get('/:id/posts', logger, validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(next)
});

router.post('/:id/posts', logger, validateUserId, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  

    Posts.insert(req.body)
      .then(posts => {
        res.status(201).json(posts);
      })
      .catch(next);
});


// do not forget to export the router
module.exports = router;
