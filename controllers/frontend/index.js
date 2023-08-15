//controllers/frontend/index.js

import postDb from "../../models/post.js"

class Index{
    async getPage(req, res){
        req.settings.pageTitle = 'ទំព័រ​ដើម'
        req.settings.message = ''
        req.settings.route = '/'
        req.settings.type = ''

        req.settings.items = await postDb.getPosts(req, req.settings.indexPostLimit)
        
        res.render('base', {data:req.settings})
    }
}

export default new Index()