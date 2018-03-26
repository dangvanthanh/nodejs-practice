require('dotenv').config()
const path = require('path')
const nunjucks = require('nunjucks')
const express = require('express')
const passport = require('passport')
const app = express()
const port = 3000

app.use(passport.initialize())
app.use(passport.session())

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

app.get('/success', (req, res) => {
  res.send('You have successfully logged in')
})

app.get('/error', (req, res) => {
  res.send('Error logging in')
})

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})

// Github Auth
const GithubStrategy = require('passport-github').Strategy
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile)
    }
  )
)

app.get('/auth/github', passport.authenticate('github'))
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/error' }),
  (req, res) => {
    res.redirect('/success')
  }
)

app.listen(port, err => {
  if (err) {
    return console.log('Something bad happened', err)
  }

  console.log(`Server is listening on ${port}`)
})
