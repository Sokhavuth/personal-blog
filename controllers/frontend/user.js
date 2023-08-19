// controllers/frontend/user.js 

import userDb from "../../models/user.js"

class User {
    async getPage(req, res){
        req.settings.pageTitle = "ទំព័រ​អ្នកប្រើប្រាស់"
        req.settings.route = `/user`

        req.settings.item = await userDb.getUser(req)
        
        res.render("base", { data: req.settings })
    }
}

export default new User()