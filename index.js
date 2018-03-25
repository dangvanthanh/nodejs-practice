const path = require('path')
const nunjucks = require('nunjucks')
const express = require('express')
const app = express()
const port = 3000
const passport = require('passport')

nunjucks.configure('views', {
  express: app,
  autoescape: true
})

app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.render('index.html')
})

app.listen(port, err => {
  if (err) {
    return console.log('Something bad happened', err)
  }

  console.log(`Server is listening on ${port}`)
})
