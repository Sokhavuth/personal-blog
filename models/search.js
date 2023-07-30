//models/search.js

class Search{
    async searchItems(req, amount){
        const q = req.body.q
        const type = req.body.search_type

        const itemType = {
            "ការផ្សាយ": "post",
            "ទំព័រស្តាទិក": "page",
            "ជំពូក": "category",
            "អ្នក​ប្រើប្រាស់": "user",
        }

        const collection = itemType[type]
        let query = []

        switch(collection) {
            case "post":
                query = [
                    { title: { contains: q } },
                    { content: { contains: q } },
                    { categories: { has: q } },
                ]
              break
            case "page":
                query = [
                    { title: { contains: q } },
                    { content: { contains: q } },
                ]
              break
            case "category":
                query = [
                    { title: { contains: q } },
                ]
                break
            default:
                query = [
                    { title: { contains: q } },
                    { content: { contains: q } },
                    { role: { contains: q } }
                ]
          }

        const items = await req.prisma[collection].findMany({ 
            where: { OR: query },
            orderBy: [{ date: "desc" }, { id: "desc" }]
        })
    
        return items.slice(0, amount)
    }
}

export default new Search()