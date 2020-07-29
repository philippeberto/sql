//migration é uma técnica para migrar entre as versões do banco de dados
const db = require('../db')
const fs = require('fs')

const initMigration = async(connection) => {
    const [results] = await connection.query(`show tables like 'migration_version'`)
    if (results.length === 0){
        await connection.query('START TRANSACTION;')
        await connection.query(`
            CREATE TABLE migration_version (
                id INT NOT NULL AUTO_INCREMENT,
                version INT NOT NULL,
                PRIMARY KEY (id)
            );
        `)
        await connection.query('COMMIT;')
        await connection.query('INSERT INTO migration_version (id, version) values (1, 0)')
    }
}

const getCurrentVersion = async(connection) => {
    const [results] = await connection.query('select * from migration_version where id = 1')
    return (results[0].version)
}

const migration = async() => {
    const connection = await db
    await initMigration(connection)

    const currentVerion = await getCurrentVersion(connection)
    //para definir a targerVersion podemos usar variável de ambiente: process.env.TARGET_VERSION ou definir no console:
    let targetVersion = 1000
    if (process.argv[2] === '--target-version' && process.argv[3]){
        targetVersion = parseInt(process.argv[3])
    }
    console.log(targetVersion)

    const migrations = fs.readdirSync('./migrations')
    console.log(migrations)
    const migrationSorted = migrations
        .map(version => {
            return version.split('.',[1])
        })
        .map(version => parseInt(version))
        .sort((a, b) => {
            if(a>b){
                return 1
            }
            return -1
        })
    
    const migrationSorted2 = migrations
        .map(version => {
            return version.split('.',[1])
        })
        .map(version => parseInt(version))
        .sort((a, b) => {
            if(a>b){
                return -1
            }
            return 1
        })

    //up
    for await(const migration of migrationSorted) {
        if (migration > currentVerion && targetVersion >= migration){
            const m = require('./migrations/'+migration+'.js')
            console.log(migration)
            await connection.query('START TRANSACTION;')
            if(m.up){
                await m.up(connection)
            }
            await connection.query('UPDATE migration_version SET version = ? WHERE id = ?',[migration, 1])
            await connection.query('COMMIT;')
        }
    }

    //down
    for await(const migration of migrationSorted2) {
        if (migration <= currentVerion && targetVersion < migration){
            const m = require('./migrations/'+migration+'.js')
            console.log(migration)
            await connection.query('START TRANSACTION;')
            if(m.down){
                await m.down(connection)
            }
            const currentMigration = migrationSorted2[migrationSorted2.indexOf(migration) + 1] || 0
            await connection.query('UPDATE migration_version SET version = ? WHERE id = ?',[currentMigration, 1])
            await connection.query('COMMIT;')
        }
    }

}

migration()