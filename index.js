let items = [
    {id: 1, title: 'Wolf', price: 20, img: 'https://bipbap.ru/wp-content/uploads/2017/05/VOLKI-krasivye-i-ochen-umnye-zhivotnye.jpg'},
    {id: 2, title: 'Black Sun', price: 30, img: 'https://bipbap.ru/wp-content/uploads/2018/06/The-catalyst-single-cover-500x500.png'},
    {id: 3, title: 'Colorful', price: 40, img: 'https://www.anrfactory.com/wp-content/uploads/2020/07/500x500-1.jpg'}
]

const toHTML = item => `
    <div class="col">
        <div class="card">
            <img style="height: 200px; width: 200px;" src="${item.img}" alt="${item.title}">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id=${item.id}>Посмотреть цену</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id=${item.id}>Удалить</a>
            </div>
        </div>
    </div>
`
function render() {
    const html = items.map(toHTML).join('')
    document.querySelector('#items').innerHTML = html
}
render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
            priceModal.close()
        }}
    ]
})




document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id =+ event.target.dataset.id
    const item = items.find(f => f.id === id)
    

    if (btnType === 'price') {
        priceModal.setContent(`
        <p>Цена на ${item.title}: <strong>${item.price}$</strong></p>
        `)
        priceModal.open()

        console.log(item)
    }else if (btnType === 'remove' ) {
        $.confirm({
            title: 'Вы уверены?',
            content:`<p>Вы удаляете товар: <strong>${item.price}</strong></p>` 
        }).then(() => {
            items = items.filter( f => f.id !== id)
            render()
        }).catch(() => {
            console.log('Cancel')
        })
    }
})