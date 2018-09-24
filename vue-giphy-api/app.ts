import dotenv from "dotenv"
import express from "express"
import logger from "morgan"

dotenv.load()

import {IndexRouter} from "./routes/index"

const app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/", IndexRouter)

export = app
