//routes/frontend/home.js

import express from 'express'
const frontRouter = express.Router()
import index from '../../controllers/frontend/index.js'

frontRouter.get('/', async (req, res)=>{
    await index.getPage(req,res)
})

frontRouter.post('/paginate', async (req, res) =>{
    await index.paginatePosts(req, res)
})

export default frontRouter