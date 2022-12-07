const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMidleware')
const PORT = process.env.PORT || 8000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support API' })
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)
console.log(process.env.NODE_ENV)

app.listen(PORT, () => console.log(`Server started on port ${PORT} `))
