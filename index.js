const path = require('path')
const nunjucks = require('nunjucks')
const express = require('express')
const app = express()
const port = 3000
const passport = require('postport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

nunjucks.configure('views', {
  express: app,
  autoescape: true
})

app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))
app.use('/static', express.static('public'))

app.use(
  session({
    store: new RedisStore({
      url: config.redisStore.url
    }),
    secret: config.redisStore.secret,
    resave: false,
    saveUninitialized: false
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.listen(port, err => {
  if (err) {
    return console.log('Something bad happened', err)
  }

  console.log(`Server is listening on ${port}`)
})
