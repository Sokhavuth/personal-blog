//controllers/frontend/index.js

import postDb from "../../models/post.js"

class Index{
    async getPage(req, res){
        req.settings.pageTitle = 'ទំព័រ​ដើម'
        req.settings.message = ''
        req.settings.route = '/'
        req.settings.type = ''

        req.settings.totalItems = await postDb.count(req) 
        req.settings.itemsPerPage = req.settings.indexPostLimit
        req.settings.pageNumber = Math.ceil(req.settings.totalItems/req.settings.itemsPerPage)
        req.settings.currentPage = 1

        if(req.query.page){
            req.settings.currentPage = req.query.page
            req.settings.items = await postDb.paginatePosts(req, req.settings.indexPostLimit)
        }else{
            req.settings.items = await postDb.getPosts(req, req.settings.indexPostLimit)
        }
        
        res.render('base', { data:req.settings })
    }
}

export default new Index()