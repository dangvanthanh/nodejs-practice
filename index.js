// The http module for Node.js server
// http module is very low-level
// const http = require('http')
// const port = 3000

// const requestHandler = (request, response) => {
//   console.log(request.url)
//   response.end('Hello Node.js Server')
// }

// const server = http.createServer(requestHandler)

// server.listen(port, err => {
//   if (err) {
//     return console.log('Something bad happened', err)
//   }

//   console.log(`Server is listening on ${port}`)
// })

// Express
// $ npm install express --save-dev
// $ npm install pug --save-dev
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  // response.send('Hello from express')
  res.render('index', {
    title: 'Template',
    message: 'Express and Pug Template'
  })
})

app.get('/hello', (req, res) => {
  res.render('hello', {
    title: 'Hello',
    name: 'Dang Van Thanh'
  })
})

app.listen(port, err => {
  if (err) {
    return console.log('Something bad happened', err)
  }

  console.log(`Server is listening on ${port}`)
})
