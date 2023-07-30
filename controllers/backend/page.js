//controllers/backend/page.js

import pageDb from "../../models/page.js"

class Page{
    async getPage(req,res){
        req.settings.pageTitle = 'ទំព័រ​រឹង'
        req.settings.message = ''
        req.settings.route = '/admin/page'
        req.settings.type = 'page'
        req.settings.userName = req.user.userName

        const pages = await pageDb.getPages(req, req.settings.dItemLimit)
        req.settings.items = pages
        req.settings.count = await pageDb.count(req)

        if(req.params.id){
            req.settings.pageTitle = 'ទំព័រ​កែប្រែ​ទំព័រ​រឹង'
            req.settings.item = await pageDb.getPage(req)
        }

        res.render('base', {data:req.settings})
    }

    async createPage(req, res){
        await pageDb.createPage(req)
        res.redirect("/admin/page")
    }

    async updatePage(req, res){
        await pageDb.updatePage(req)
        res.redirect("/admin/page")
    }

    async deletePage(req, res){
        await pageDb.deletePage(req)
        res.redirect("/admin/page")
    }

    async paginatePages(req, res){
        const pages = await pageDb.paginatePages(req, req.settings.dItemLimit)
        req.settings.items = pages
        req.settings.type = "page"
        res.json(req.settings)
    }

}

export default new Page()