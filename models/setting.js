//models/setting.js

class Setting{
    async createSetting(req){
        const setting = {
            siteTitle: req.body.siteTitle,
            description: req.body.description,
            ditemLimit: parseInt(req.body.ditemLimit),
            fitemLimit: parseInt(req.body.fitemLimit),
            categoryItemLimit: parseInt(req.body.categoryItemLimit),
        }

        await req.prisma.setting.create({ data: setting })
    }

    async getSetting(req){
        const setting = await req.prisma.setting.findMany({ 
            take: 1
        })
        return setting
    }

    async updateSetting(req){
        const setting = {
            siteTitle: req.body.siteTitle,
            description: req.body.description,
            ditemLimit: parseInt(req.body.ditemLimit),
            fitemLimit: parseInt(req.body.fitemLimit),
            categoryItemLimit: parseInt(req.body.categoryItemLimit),
        }

        await req.prisma.setting.update({ where: {id: req.params.id }, data: setting })
    }
}

export default new Setting()