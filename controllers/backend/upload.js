//controllers/backend/upload.js

import crypto from 'crypto'

class Upload{
    async getPage(req, res){
        req.settings.pageTitle = "ទំព័រ Upload"
        req.settings.route = "/admin/upload"
        req.settings.userName = req.user.userName

        if(('items' in req.settings)&&('count' in req.settings)){
            delete req.settings.items
            delete req.settings.count
        }
        
        res.render("base", {data: req.settings})
    }

    async insertFile(req, res){
        req.settings.pageTitle = "ទំព័រ Upload"
        req.settings.route = "/admin/upload"
        req.settings.userName = req.user.userName
        
        let sampleFile = req.files.file
        req.settings.name = crypto.randomUUID() + "-" + req.files.file.name
        const contents = req.files.file.data
        let uploadPath = process.cwd() + '/public/upload/' + req.settings.name
        if(req.user.userRole !== "Guest"){
            /*
            sampleFile.mv(uploadPath, function(err) {
                if (err)
                  return res.status(500).send(err)

                req.settings.img = "/upload/" + req.settings.name
                res.render("base", {data: req.settings})
            })
            */
        }

        res.render("base", {data: req.settings})
    }

    async getFile(req, res){
        req.settings.pageTitle = "ទំព័រ Upload"
        req.settings.route = "/admin/upload"

        const name = req.params.fileName
        const img = await req.mydb.upload.get(name)
        const buffer = await img.arrayBuffer()
        res.send(Buffer.from(buffer))
    }
}

export default new Upload()