// controllers/frontend/category.js

import postDb from "../../models/post.js"

class Category{
    async getPosts(req, res){
        req.settings.pageTitle = "ទំព័រ​ជំពូក"
        req.settings.route = "/category"
        req.settings.type = req.params.category
        req.settings.category = req.params.category

        req.settings.items = await postDb.getPostsByCategory(req, req.settings.categoryPostLimit)

        res.render("base", { data: req.settings })
    }

    async paginate(req, res){
        const amount = req.settings.categoryPostLimit
        req.settings.items = await postDb.paginatePostsByCategory(req, amount)

        res.json(req.settings)
    }
}


export default new Category()