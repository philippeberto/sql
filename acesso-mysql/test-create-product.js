const mysql = require('mysql2/promise')

const run = async() => {
    try{
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'cat-products'
        })
        try{
        const [results, fields] = await connection.query('insert into products (product, price) values (?, ?)', ['roda', 120])
        await connection.query('insert into categories_products (product_id, category_id) values (? ,?)', [results.insertId, 1])
        console.log(results, fields)
        }catch(err){
            console.log(err)
        }
    }catch{
        console.log(err)
    }
}
run()