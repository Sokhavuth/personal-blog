// public/scripts/paginate.js

let  page = 0

function paginate(){
    $('.pagination img').attr('src', '/images/loading.gif')
    page = page + 1

    $.post(`/paginate`,{ page },function(data, status){
        let items = data.items
        if(items.length !== 0 ){
            appendItem(data.items)
        }else{
            setTimeout(() => {
                $('.pagination img').attr('src', '/images/load-more.png')
            }, "1000")
        }
    })
}

function appendItem(items){
    let html = ''
    
    if(items){
        for(let item of items){
            html += `<div class="post">`
                    html += `<a class="thumb" href="/post/${item.id}">`
                        html += `<img src="${item.thumb}" />`
                        if(item.videos){
                            if((item.videos !== "") && (item.videos !== "[]")){
                                html += `<img class="play-icon" src="/images/play.png"/>`
                            }
                        }
                    html += `</a>`

                    html += `<div class="text">`
                        html += `<a href="/post/${item.id}" class="title">`
                            html += `${item.title}`
                        html += `</a>`
                        html += `<div class="date">`
                            html += `${(new Date(item.date)).toLocaleDateString("it-IT")}`
                        html += `</div>`
                        html += `<div class="except">${item.content}</div>`
                    html += `</div>`
                html += `</div>`
        }
    }
    
    $('.paginate').append(html)
    $('.pagination img').attr('src', '/images/load-more.png')
}