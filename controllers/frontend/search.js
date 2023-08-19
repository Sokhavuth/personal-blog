//controllers/frontend/search.js

import postDb from "../../models/post.js"

class Search{
    async getPage(req, res){
        req.settings.pageTitle = 'ទំព័រ​ស្វែង​រក'
        req.settings.message = ''
        req.settings.route = '/search'
        req.settings.type = ''

        req.settings.items = await postDb.searchPosts(req, 10)
        
        res.render('base', { data:req.settings })
    }
}

export default new Search()