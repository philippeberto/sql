const mysql = require('mysql2/promise')

const run = async() => {
    try{
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'cat-products'
        })
        try{
        const [results, fields] = await connection.query('delete from categories where id = ? limit 1',[1])
        console.log('Category removed')
        }catch(err){
            console.log(err)
        }
    }catch{
        console.log(err)
    }
}
run()