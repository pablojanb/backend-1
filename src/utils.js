import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname;


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/public/img`)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

export const uploader = multer({
    storage,
    onError: function (err) {
        console.log(`Error: ${err}`)
    }
})




export const getProducts = async () => {
    const products = await fs.promises.readFile(`${__dirname}/products.json`, 'utf8')
    const productsObj = JSON.parse(products)
    return productsObj
}

export const generateId = (arr) => {
    let id
    if (arr.length > 0) {
        id = arr[arr.length - 1].id + 1
    } else {
        id = 1
    }
    return id
}