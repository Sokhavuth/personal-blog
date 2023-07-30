//models/post.js

class Post{
    async count(req){
        return await req.prisma.post.count()
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
        const posts = await req.prisma.post.findMany({ 
            orderBy: [{ date: "desc" }, { id: "desc" }],
            skip: amount * parseInt(req.body.page),
            take: amount
        })

        return posts
    }
}

export default new Post()