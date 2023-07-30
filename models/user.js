//models/user.js
//npm install bcryptjs

import bcrypt from "bcryptjs"

class User{
    async count(req){
        return await req.prisma.user.count()
    }
    async createRootUser(req){
        const hashPassword = bcrypt.hashSync("xxxxxx", 8)

        await req.prisma.user.create({
            data: {
                email: "guest@khmerweb.app",
                title: "Guest",
                password: hashPassword,
                role: "Guest",
                thumb: "",
                content: "",
                date: ""
            }
        })
        
    }

    async checkUser(req){
        return await req.prisma.user.findUnique({ where: {email: req.body.email }})
    }

    async getUsers(req, amount){
        return await req.prisma.user.findMany({ 
            take: amount, 
            orderBy: [{ date: "desc" }, { id: "desc" }]
        })
    }

    async createUser(req){
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)

        const user = {
            title: req.body.title,
            password: hashedPassword,
            email: req.body.email,
            role: req.body.role,
            thumb: req.body.thumb,
            content: req.body.content,
            date: req.body.datetime,
        }

        await req.prisma.user.create({ data: user })
        
    }

    async getUser(req){
        return await req.prisma.user.findUnique({ where: {id: req.params.id }})
    }

    async updateUser(req){
        const user = await this.getUser(req)
        if(req.body.password !== user.password){
            var hashedPassword = bcrypt.hashSync(req.body.password, 10)
        }else{
            var hashedPassword = req.body.password
        }

        const newUser = {
            title: req.body.title,
            password: hashedPassword,
            email: req.body.email,
            thumb: req.body.thumb,
            content: req.body.content,
            date: req.body.datetime,
        }
     
        await req.prisma.user.update({ where: {id: req.params.id }, data: newUser })
    }

    async deleteUser(req){
        await req.prisma.user.delete({ where: {id: req.params.id } })
    }

    async paginateUsers(req, amount){
        const users = await req.prisma.user.findMany({ 
            orderBy: [{ date: "desc" }, { id: "desc" }],
            skip: amount * parseInt(req.body.page),
            take: amount
        })

        return users
    }
}

export default new User()