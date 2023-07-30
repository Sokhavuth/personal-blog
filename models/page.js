//models/page.js

class Page{
    async count(req){
        return await req.prisma.page.count()
    }

    async getPages(req, amount){
        return await req.prisma.page.findMany({ 
            take: amount, 
            orderBy: [{ date: "desc" }, { id: "desc" }]
        })
    }

    async createPage(req){
        const new_page = {
            title: req.body.title,
            content: req.body.content,
            thumb: req.body.thumb,
            date: req.body.datetime,
        }
        
        await req.prisma.page.create({ data: new_page })
    }

    async getPage(req){
        return await req.prisma.page.findUnique({ where: {id: req.params.id }})
    }

    async updatePage(req){
        let newvalue = {
            title: req.body.title,
            content: req.body.content,
            thumb: req.body.thumb,
            date: req.body.datetime,
        }
     
        await req.prisma.page.update({ where: {id: req.params.id }, data: newvalue })
    }

    async deletePage(req){
        await req.prisma.page.delete({ where: {id: req.params.id } })
    }

    async paginatePages(req, amount){
        const pages = await req.prisma.page.findMany({ 
            orderBy: [{ date: "desc" }, { id: "desc" }],
            skip: amount * parseInt(req.body.page),
            take: amount
        })

        return pages
    }
}

export default new Page()