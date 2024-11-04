import productsModel from "../models/products.model.js"
import __dirname from '../utils.js'

export default class ProductManager {


    getProducts(limit, page, price, category) {
        if (!limit) limit = 10
        if (!page) page = 1

        if (price) {
            //TO DO sort by price
        }
        
        if (category) {
            return productsModel.paginate({category: category}, {limit: limit, page: page})
        } else {
            return productsModel.paginate({}, {limit: limit, page: page})
        }
    }

    getProduct(id) {
        return productsModel.findOne({_id: id})
    }

    setProduct(product, img) {


        const newProduct = {
            ...product,
            status: true,
        }

        if (img) {
            newProduct.thumbnails = [`${__dirname}/public/img/${img.filename}`]
        } else {
            newProduct.thumbnails = []
        }
        
        productsModel.create(newProduct)
        return newProduct

    }

    async editProduct(productId, modifiedProduct, img) {
        try {
            let {title,description,code,price,stock,category,status,thumbnails} = await productsModel.findOne({_id: productId})


        let newProduct = {
                title,
                description,
                code,
                price,
                stock,
                category,
                status,
                thumbnails,
                ...modifiedProduct
            }

            if (img) {
                newProduct.thumbnails.push(`${__dirname}/public/img/${img.filename}`)
            }
            await productsModel.updateOne({_id: productId}, { $set: newProduct})

        return newProduct
        } catch (error) {
            console.log(error)
        }
    }


    deleteProduct(id) {
        return productsModel.deleteOne({_id: id})
    }
}