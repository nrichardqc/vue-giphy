let express = require('express')
let request = require('request')
let querystring = require('querystring')

let router = express.Router()

/**
 * Generates an URL for GIPHY api using parameters provided
 * @param target Target page
 * @param parameters GET parameters to send
 * @returns URL for GIPHY api
 */
function generateUrl (target, parameters) {
  let generalOptions = {
    api_key: process.env.GIPHY_API_KEY,
    limit: 5,
    fmt: 'json'
  }
  Object.assign(parameters, generalOptions)

  return 'http://api.giphy.com/v1/gifs/' + target + '?' + querystring.stringify(parameters)
}

// Note : it would have been easier to use node-http-proxy or something similar,
// but I wanted to test some simple Node.js functions.

router.get('/', function (req, res) {
  request(generateUrl('trending', {})).pipe(res)
})

router.get('/search', function (req, res) {
  let parameters = {
    q: req.query.q
  }

  request(generateUrl('search', parameters)).pipe(res)
})

module.exports = router
