// controllers/frontend/category.js

import postDb from "../../models/post.js"

class Category{
    async getPosts(req, res){
        req.settings.pageTitle = "ទំព័រ​ជំពូក"
        req.settings.route = "/category"
        req.settings.type = req.params.category
        req.settings.category = req.params.category
        const query = { where: { categories: { has: req.params.category } } }

        req.settings.totalItems = await postDb.count(req, query) 
        req.settings.itemsPerPage = req.settings.categoryPostLimit
        req.settings.pageNumber = Math.ceil(req.settings.totalItems/req.settings.itemsPerPage)
        req.settings.currentPage = 1
        if(req.query.page){
            req.settings.currentPage = req.query.page
            req.settings.items = await postDb.paginatePostsByCategory(req, req.settings.categoryPostLimit)
        }else{
            req.settings.items = await postDb.getPostsByCategory(req, req.settings.categoryPostLimit)
        }

        res.render("base", { data: req.settings })
    }
}

export default new Category()