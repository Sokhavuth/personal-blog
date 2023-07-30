//controllers/backend/setting.js

import settingDb from '../../models/setting.js'

class Setting{
    async getPage(req, res){
        req.settings.pageTitle = "ទំព័រ Settings"
        req.settings.route = "/admin/setting"
        req.settings.userName = req.user.userName
        let items = await settingDb.getSetting(req)
        if(items.length > 0){
            req.settings.item = items[0]
        }

        if('items' in req.settings){
            delete req.settings.items
        }

        res.render("base", { data: req.settings })
    }

    async createSetting(req, res){
        await settingDb.createSetting(req)
        res.redirect("/admin/post")
    }

    async updateSetting(req, res){
        await settingDb.updateSetting(req)
        res.redirect("/admin/post")
    }
}

export default new Setting()