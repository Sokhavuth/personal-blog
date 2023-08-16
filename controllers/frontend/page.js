// controllers/frontend/page.js 

import pageDb from "../../models/page.js"

class Page {
    async getPage(req, res){
        req.settings.pageTitle = "ទំព័រ​ព័ត៌មាន"
        req.settings.route = `/page/${ req.params.id }`

        req.settings.item = await pageDb.getPage(req)
        
        res.render("base", { data: req.settings })
    }
}

export default new Page()