//public/scripts/backend/paginate.js

let  page = 0

function paginate(route, lastKey){
    $('.paginate img').attr('src', '/images/loading.gif')
    page = page + 1

    $.post(`${route}/paginate`,{ page },function(data, status){
        let items = data.items
        if(items.length !== 0 ){
            appendItem(data.items,route,data)
        }else{
            setTimeout(() => {
                $('.paginate img').attr('src', '/images/load-more.png')
            }, "1000")
        }
    })
}

function appendItem(items, route,data){
    let html = ''
    
    if(items){
        for(let item of items){
            html += `<li>`
                html += `<div class='thumb'>`
                    html += `<a href="/${data.type}/${item.id}"><img src="${item.thumb}"/></a>`
                    if((item.videos)&&(item.videos !== '[]')&&(item.videos !== '')){
                        html += `<a href="/${data.type}/${item.id}"><img class="play-icon" src="/images/play.png"/></a>`
                    }
                html += `</div>`
                html += `<div class="title">`
                    html += `<a href="/${data.type}/${item.id}">${item.title}</a>`
                    html += `<div>${new Date(item.date).toLocaleDateString('it-IT')}</div>`
                html += `</div>`
                html += `<div class="edit">`
                    html += `<a href="${route}/edit/${item.id}"><img src="/images/edit.png"/></a>`
                    html += `<a href="${route}/delete/${item.id}"><img src="/images/delete.png"/></a>`
                html += `</div>` 
            html += `</li>`
        }
    }
    
    $('.list').append(html)

    if(route === '/admin/user'){
        $('.Footer ul li').css({'grid-template-columns':'13% auto 25%'})
        $('.Footer ul li .thumb').css({'padding-top':'100%'})
        $('.Footer ul li .thumb img').css({'border-radius':'50%'})
    }

    $('.paginate img').attr('src', '/images/load-more.png')
}