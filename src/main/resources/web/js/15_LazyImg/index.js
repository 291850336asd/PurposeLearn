 
let waterfallModule = (function () {
    // 获取需要操作的DOM元素 -- 一开始全部获取完，读写分离
    let container = document.querySelector('.container')
    let columns = container.querySelectorAll('.column') // 读取的是NodeList
    let loadMore = document.querySelector('.loadMore')
    let observe = null
    columns = Array.from(columns)  // NodeList-> Array 类数组转换数组
    // columns = [...columns] 


    // 基于Promise管理AJAX从服务器端获取数据
    const queryData = () => {
        return new Promise((resolve) => {
            let xhr = new XMLHttpRequest
            xhr.open('get', '../15_LazyImg/lazydata.json')
            xhr.onreadystatechange = () => { 
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    let data = JSON.parse(xhr.responseText)
                    resolve(data)
                } 
            }
            xhr.send(null)
        })
    }
    
    // 页面中的数据绑定
    const bindHTML = data => {  
        data = data.map(item => {
            let AW = 230,
                BW = item.width,
                BH = item.height,
                AH = AW*BH/BW
            item.width = AW
            item.height = AH
            return item
        }) 
        for (let i = 0; i < data.length; i += 3){
            let group = data.slice(i, i + 3)  
            //数据的高 升序排列
            group.sort((a, b) => { 
               return a.height-b.height
            }) 
            //每一列的高 降序排列
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight
            })

            group.forEach((item, index) => {
                let {link,height,pic,title} = item
                let card = document.createElement('div')
                card.className = 'card'
                card.innerHTML = `<a href="${link}">
                    <div class="lazyImageBox" style="height: ${height}px;">
                        <img src="" alt="" lazy-image="${pic}">
                    </div>
                    <p>${title}</p>
                </a>`
                columns[index].appendChild(card)
            }) 
            // 保证看起来差距不是很大
        } 
    }
  

    // 加载更多数据
    const loadMoreFunc = () => {
        // let loadMore
        let oboptions = {
            threshold: [0],
        } 
        let ob = new IntersectionObserver(async changes => {
            let item = changes[0]
            if (item.isIntersecting) {
                // 加载更多数据
                let data = await queryData()
                bindHTML(data) 
                observe.refresh()
            }
        }, oboptions)
         
        ob.observe(loadMore)

    }

    return {
        async init() { 
            let data = await queryData()  // 命令设计模式 先干这个，再干别的
            bindHTML(data) 
            observe = LazyImage()
            loadMoreFunc()
        }
    }
})()

waterfallModule.init()