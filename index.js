const express = require('express')
const pg = require('pg')
const app = express()
const port = 3000

const conString = 'postgres://username:password@localhost/learning_objectives'

// pg.connect(conString, (err, client, done) => {
//   if (err) {
//     return console.error('Error fetching client from pool', err)
//   }

//   client.query(
//     'SELECT $1::varchar AS my_first_query',
//     ['learning_objectives'],
//     (err, result) => {
//       done()

//       if (err) {
//         return console.error('Error happened during query', err)
//       }

//       console.log(result.rows[0])
//       process.exit()
//     }
//   )
// })

app.post('/users', (req, res, next) => {
  const user = req.body

  pg.connect(conString, (err, client, done) => {
    if (err) {
      return next(err)
    }

    client.query(
      'INSERT INTO users (name, age) VALUES ($1, $2);',
      [user.name, user.age],
      (err, result) => {
        done()

        if (err) {
          return next(err)
        }

        res.send(200)
      }
    )
  })
})

app.get('/users', (req, res, next) => {
  pg.connect(conString, (err, client, done) => {
    if (err) {
      return next(err)
    }

    client.query('SELECT name, age FROM users;', [], (err, result) => {
      done()

      if (err) {
        return next(err)
      }

      res.json(result.rows)
    })
  })
})
