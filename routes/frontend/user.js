// routes/frontend/user.js

import express from "express"
const userRouter = express.Router()

import user from "../../controllers/frontend/user.js"


userRouter.get("/:id", async (req, res) => {
    user.getPage(req, res)
})

export default userRouter