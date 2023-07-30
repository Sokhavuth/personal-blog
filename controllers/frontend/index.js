//controllers/frontend/index.js

class Index{
    async getPage(req, res){
        req.settings.pageTitle = 'ទំព័រ​ដើម'
        req.settings.message = ''
        req.settings.route = '/'
        req.settings.type = ''
        
        res.render('base', {data:req.settings})
    }
}

export default new Index()