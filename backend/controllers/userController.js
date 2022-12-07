// @desc Register a new user
// @route /api/users
// @access Public
const registerUser = asynchHandler(async (req, res) => {
  const { name, email, password } = req.body

  //validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please incluse all fields!')
  }

  res.send('Register Route')
})

// @desc Login user
// @route /api/users/login
// @access Public
const loginUser =asynchHandler(async (req, res) => {
  res.send('Login Route')
}
module.exports = { registerUser, loginUser })
