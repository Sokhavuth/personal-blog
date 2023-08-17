// routes/frontend/category.js

import express from "express"
const categoryRouter = express.Router()

import category from "../../controllers/frontend/category.js"

categoryRouter.get("/:category", async (req, res) => {
    category.getPosts(req, res)
})

export default categoryRouter