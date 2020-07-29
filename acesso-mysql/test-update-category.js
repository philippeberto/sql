const mysql = require('mysql2/promise')

const run = async() => {
    try{
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'cat-products'
        })
        try{
        const [results, fields] = await connection.query('update categories set category = ? where id = ?', ['cat-test updated', 2])
        console.log(results, fields)
        }catch(err){
            console.log(err)
        }
    }catch{
        console.log(err)
    }
}
run()