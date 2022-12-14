const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get Token fromHeader
      token = req.headers.authorization.split(' ')[1]

      // Verify token from header
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // process.env.JWT_SECRET

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password')

      // NOTE: We need to check if a user was found
      // https://www.udemy.com/course/react-front-to-back-2022/learn/lecture/30591026#questions/17843570
      if (!req.user) {
        res.status(401)
        throw new Error('Not authorized')
      }

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized(Token Error)')
  }
})

module.exports = { protect }
