//routes/frontend.js

import express from 'express'
const frontendRouter = express.Router()

import homeRouter from './frontend/home.js'
frontendRouter.use('/', homeRouter)

import postRouter from './frontend/post.js'
frontendRouter.use('/post', postRouter)

export default frontendRouter