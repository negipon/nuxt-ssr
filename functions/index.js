const functions = require('firebase-functions');
const { Nuxt } = require('nuxt')
const app = require('express')()
const nuxt = new Nuxt({
  dev: false,
  buildDir: '.nuxt',
  build: {
    publicPath: '/'
  }
})

function handler(req, res) {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
  nuxt.renderRoute('/', { req }).then(result => {
    res.send(result.html)
  }).catch(e => {
    res.send(e)
  })
}

app.use(handler)
exports.app = functions.https.onRequest(app)