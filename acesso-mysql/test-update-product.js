const mysql = require('mysql2/promise')

const run = async() => {
    try{
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'cat-products'
        })
        try{
        const [results, fields] = await connection.query('update products set product = ? where id = ?', ['roda updated', 3])
        console.log(results, fields)
        }catch(err){
            console.log(err)
        }
    }catch{
        console.log(err)
    }
}
run()