const express = require('express')
const app = express()
const fs = require('fs')
const puerto = 8080
const productos = fs.readFileSync('./productos.txt', 'utf-8')
const objProd = JSON.parse(productos)
let cant = objProd.length
let Itemvisitas = 0
let itemRandomVisitas = 0
const productoRandom = () => {
    let arrID = objProd.map(item => item.id)
    let randomID = Math.floor(Math.random() * arrID.length + 1)
    let productoRandom = objProd.filter(producto => producto.id == randomID)
    return productoRandom
}

app.get('/items', (req, res) => {
    Itemvisitas += 1
    res.send({items: objProd, cantidad: (cant)})    
})

app.get('/item-random', (req, res) => {
    itemRandomVisitas += 1
    res.send({item: productoRandom()})
})

app.get('/visitas', (req, res) => {    
    res.send({visitas: {items: Itemvisitas, item: itemRandomVisitas}})    
})

app.listen(puerto , ()=> {
    console.log('El servidor esta funcionando')
})
app.on('error', error => console.log(`Error en el puerto ${puerto}`))

