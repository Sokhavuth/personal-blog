// models/category.js

class Category{
    async count(req){
        return await req.prisma.category.count()
    }

    async createCategory(req){
        await req.prisma.category.create({
            data: {
                title: req.body.label,
                thumb: req.body.thumb,
                date: req.body.datetime,
            }
        })
    }

    async getCategories(req, amount){
        const categories = await req.prisma.category.findMany({ 
            take: amount, 
            orderBy: [{ date: "desc" }, { id: "desc" }]
        })

        return categories
    }

    async getAllItems(req){
        const categories = await req.prisma.category.findMany({  
            orderBy: [{ date: "desc" }, { id: "desc" }]
        })

        return categories
    }

    async getCategory(req){
        return await req.prisma.category.findUnique({ where: {id: req.params.id }})
    }

    async updateCategory(req){
        const updatedCategory = {
            title: req.body.label,
            thumb: req.body.thumb,
            date: req.body.datetime,
        }
        
        await req.prisma.category.update({ where: {id: req.params.id }, data: updatedCategory })
    }

    async deleteCategory(req){
        await req.prisma.category.delete({ where: {id: req.params.id } })
    }

    async paginate(req, amount){
        const categories = await req.prisma.category.findMany({ 
            orderBy: [{ date: "desc" }, { id: "desc" }],
            skip: amount*parseInt(req.body.page),
            take: amount
        })

        return categories
    }
}


export default new Category()