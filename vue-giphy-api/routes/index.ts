// import { Router, Request, Response } from "express"
import { Request, Response, Router } from "express"
import querystring from "querystring"
import RequestHelper = require("request")

const router = Router()

/**
 * Generates an URL for GIPHY api using parameters provided
 * @param target Target page
 * @param parameters GET parameters to send
 * @returns URL for GIPHY api
 */
function generateUrl(target: string, parameters: object) {
  const generalOptions = {
    api_key: process.env.GIPHY_API_KEY,
    fmt: "json",
    limit: 5,
  }
  Object.assign(parameters, generalOptions)

  return "http://api.giphy.com/v1/gifs/" + target + "?" + querystring.stringify(parameters)
}

// Note : it would have been easier to use node-http-proxy or something similar,
// but I wanted to test some simple Node.js functions.

router.get("/",  (req: Request, res: Response) => {
  RequestHelper(generateUrl("trending", {})).pipe(res)
})

router.get("/search",  (req: Request, res: Response) => {
  const parameters = {
    q: req.query.q,
  }

  RequestHelper(generateUrl("search", parameters)).pipe(res)
})

export  const IndexRouter: Router = router
