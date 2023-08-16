//routes/frontend.js

import express from 'express'
const frontendRouter = express.Router()

import homeRouter from './frontend/home.js'
frontendRouter.use('/', homeRouter)

import postRouter from './frontend/post.js'
frontendRouter.use('/post', postRouter)

import categoryRouter from './frontend/category.js'
frontendRouter.use('/category', categoryRouter)

import pageRouter from './frontend/page.js'
frontendRouter.use('/page', pageRouter)

export default frontendRouter