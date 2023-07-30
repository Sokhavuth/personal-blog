//routes/frontend.js

import express from 'express'
const frontendRouter = express.Router()

import frontRouter from './frontend/index.js'
frontendRouter.use('/', frontRouter)

export default frontendRouter