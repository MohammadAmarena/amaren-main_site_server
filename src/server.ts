import mongoose from 'mongoose'
import express from 'express'
import mainRouter from './routes/mainRoute.js'
import * as config from './config.js'
import * as model from './model.js'

mongoose.set('strictQuery', false)
model.connection()

const app = express()

app.use('/', mainRouter)

app.listen(config.PORT, () => console.log(`Listening on port http://localhost:${config.PORT}`));