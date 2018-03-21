const path = require('path')
const nunjucks = require('nunjucks')
const express = require('express')
const rq = require('request-promise')
const app = express()
const port = 3000

// const { Client } = require('pg')
// const connectionString = 'postgres://dangvanthanh@localhost/learning_objectives'
// const client = new Client({
//   connectionString: connectionString
// })

nunjucks.configure('views', {
  express: app,
  autoescape: true
})

app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))
app.use('/static', express.static('public'))

app.get('/:city', (req, res) => {
  rq({
    uri: 'http://apidev.accuweather.com/locations/v1/search',
    qs: {
      q: req.params.city,
      apiKey: 'hoArfRosT1215'
    },
    json: true
  })
    .then(data => {
      const city = {
        name: data[0].EnglishName,
        geo: {
          lat: data[0].GeoPosition.Latitude,
          long: data[0].GeoPosition.Longitude
        }
      }

      res.render('index.html', { city: city } )
    })
    .catch(err => {
      console.log(err)
      res.render('error.html')
    })
})

// app.post('/users', (req, res, next) => {
//   // const user = req.body
//   // Sample
//   let user = {}

//   user.name = 'Your Name' + new Date().getTime()
//   user.age = 25

//   client.connect()

//   client.query(
//     'INSERT INTO users (name, age) VALUES ($1, $2);',
//     [user.name, user.age],
//     (err, result) => {
//       if (err) {
//         console.log(err)
//       }

//       res.send(200)
//     }
//   )
// })

// app.get('/users', (req, res, next) => {
//   client.connect()

//   client.query('SELECT name, age FROM users;', [], (err, result) => {
//     if (err) {
//       console.log(err)
//     }

//     res.json(result.rows)
//   })
// })

app.listen(port, err => {
  if (err) {
    return console.log('Something bad happened', err)
  }

  console.log(`Server is listening on ${port}`)
})
