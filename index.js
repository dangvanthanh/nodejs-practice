const nunjucks = require('nunjucks')
const express = require('express')
const { Client } = require('pg')
const connectionString = 'postgres://dangvanthanh@localhost/learning_objectives'
const client = new Client({
  connectionString: connectionString
})
const app = express()
const port = 3000

nunjucks.configure('views', {
  express: app,
  autoescape: true
})

app.set('view engine', 'html')
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.render('index.html')
})

app.post('/users', (req, res, next) => {
  //const user = req.body
  // Sample
  let user = {}

  user.name = 'Your Name' + new Date().getTime()
  user.age = 25

  client.connect()

  client.query(
    'INSERT INTO users (name, age) VALUES ($1, $2);',
    [user.name, user.age],
    (err, result) => {
      if (err) {
        console.log(err)
      }

      res.send(200)
    }
  )
})

app.get('/users', (req, res, next) => {
  client.connect()

  client.query('SELECT name, age FROM users;', [], (err, result) => {
    if (err) {
      console.log(err)
    }

    res.json(result.rows)
  })
})

app.listen(port, err => {
  if (err) {
    return console.log('Something bad happened', err)
  }

  console.log(`Server is listening on ${port}`)
})
