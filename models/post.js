//models/post.js

class Post{
    async count(req, query={}){
        return await req.prisma.post.count(query)
    }

    async createPost(req){
        let categories = []

        if(req.body.categories.includes(',')){
            let str = req.body.categories.replace(/\s+/g, "")
            categories = str.split(',')
        }else{
            categories = [req.body.categories]
        }
        
        const new_post = {
            title: req.body.title,
            content: req.body.content,
            categories: categories,
            thumb: req.body.thumb,
            date: req.body.datetime,
            videos: req.body.videos,
            userid: req.user.userId,
        }
        
        await req.prisma.post.create({ data: new_post })
    }

    async getPosts(req, amount){
        return await req.prisma.post.findMany({ 
            take: amount, 
            orderBy: [{ date: "desc" }, { id: "desc" }]
        })
    }

    async searchPosts(req, amount){
        const query = [
            { title: { contains: req.body.q } },
            { content: { contains: req.body.q } },
            { categories: { has: req.body.q } },
        ]
        return await req.prisma.post.findMany({ 
            where: { OR: query },
            take: amount,
            orderBy: [{ date: "desc" }, { id: "desc" }]
        })
    }

    async getPostsByCategory(req, amount){
        return await req.prisma.post.findMany({ 
            where: { categories: { has: req.params.category } },
            take: amount, 
            orderBy: [{ date: "desc" }, { id: "desc" }]
        })
    }

    async getPost(req){
        return await req.prisma.post.findUnique({ where: {id: req.params.id }})
    }

    async updatePost(req){
        let categories = []

        if(req.body.categories.includes(',')){
            let str = req.body.categories.replace(/\s+/g, "")
            categories = str.split(',')
        }else{
            categories = [req.body.categories]
        }

        let newvalue = {
            title: req.body.title,
            content: req.body.content,
            categories: categories,
            thumb: req.body.thumb,
            date: req.body.datetime,
            videos: req.body.videos
        }
     
        await req.prisma.post.update({ where: {id: req.params.id }, data: newvalue })
    }

    async deletePost(req){
        await req.prisma.post.delete({ where: {id: req.params.id } })
    }

    async paginatePosts(req, amount){
        if(req.body.page){
            var page = parseInt(req.body.page)
        }else if(req.query.page){
            var page = parseInt(req.query.page)-1
        }
        
        const posts = await req.prisma.post.findMany({ 
            orderBy: [{ date: "desc" }, { id: "desc" }],
            skip: amount * page,
            take: amount
        })

        return posts
    }

    async paginatePostsByCategory(req, amount){
        const posts = await req.prisma.post.findMany({ 
            where: { categories: { has: req.params.category } },
            orderBy: [{ date: "desc" }, { id: "desc" }],
            skip: amount * (parseInt(req.query.page)-1),
            take: amount
        })

        return posts
    }
}

export default new Post()