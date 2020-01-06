const express = require('express')
const cors = require('cors')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const PORT = config.get('port') || 5000

app.use(cors())
app.use(express.json({ extended: true }))

mongoose.connect(config.get('mongoURI'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

mongoose.connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/links', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () =>
  console.log(`Server has been started on port ${PORT}...`)
)
