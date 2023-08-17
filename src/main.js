import express from 'express'
import multer from 'multer'
import routerProd from './routes/products.routes.js'
import routerCart from './routes/cart.routes.js';
import {__dirname} from '.path.js'
import path from 'path'

const PORT = 4000
const app= express()

/*Config Multer
const storage = multer.diskStorage({
    destination: (requ, file, cb) =>{ //cb es callback
        cb(null,'src/public/img') // el null hace referencia a que no envie errores
    },
    filename: (req, file, cb)=>{
        cb(null,`${Date.now()}${file.originalname}`)  // me devuelve el numero en milisegundos un timestamp que me sirve al concatenarlo con el nombre del archivo y de esta manera puedo subir varias imagenes

    }
})
*/

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true})) // URL extensas
const upload = multer ({ storage: storage})

//Routes
app.use ('/static', express.static(path.join (__dirname, '/public')))
app.use('/api/product', routerProd)
app.use('/api/carts', routerCart);

app.post ('/upload', upload.single ('product'), (req,res) => {
    console.log (req.file)
    console.log (req.body)
} )

//Server
app.listen(PORT,() =>{
    console.log(`Server on port ${PORT}`)
})