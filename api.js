const db = require('./db')

const categories = require('./categories')(db)
const products = require('./products')(db)

const test = async() => {
    //await categories.create([' fuzis'])
    //await categories.remove(4)
    //await categories.update(5, ['terceira category api updated'])
    //const cats = await categories.findAll()
    //console.log(cats)

    //await products.create('ak-47')
    //await products.remove(3)
    //await products.update(4, ['update from api'])
    //const prods = await products.findAll()
    //console.log(prods)
    //console.log(prods)

    //await products.addImage(2, ['ak-47 img', 'url'])

    //const pro_cat = await products.findAllPaginated()
    //console.log(pro_cat)

    await products.updateCategories(2,[2, 1])
    // for (let i=0; i<1000; i++){
    //      products.findAllPaginated().then(prods => console.log(prods))
    // }
}

test()