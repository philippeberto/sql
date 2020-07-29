const up = async(connection) => {
    console.log('subiu versão 2')
}
const down = async(connection) => {
    console.log('baixou versão 2')
}
module.exports = {
    up,
    down
}