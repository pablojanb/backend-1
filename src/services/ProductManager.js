import productsModel from "../models/products.model.js"
import __dirname from '../utils.js'

export default class ProductManager {

    async getProducts(limit, page, category, sort) {
        try {
            if (!limit) limit = 10
            if (!page) page = 1
            if (category) {
                if (sort === 1 || sort === -1) {
                    const products = await productsModel.paginate({category: category}, {limit: limit, page: page, lean:true, sort: {price: sort}})
                    return products
                } else {
                    const products = await productsModel.paginate({category: category}, {limit: limit, page: page, lean:true})
                    return products
                }
            } else {
                if (sort === 1 || sort === -1) {
                    const products = await productsModel.paginate({}, {limit: limit, page: page, lean:true, sort: {price: sort}})
                    return products
                } else {
                    const products = await productsModel.paginate({}, {limit: limit, page: page, lean:true})
                    return products
                }
            }
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    async getProduct(id) {
        try {
            const product = await productsModel.findOne({_id: id})
            return product
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    async setProduct(product, img) {
        try {
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
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    async editProduct(productId, modifiedProduct, img) {
        try {
            const product = await productsModel.findOne({_id: productId})
            let {title,description,code,price,stock,category,status,thumbnails} = product
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
            console.log(`Error: ${error}`)
        }
    }

    async deleteProduct(id) {
        try {
            const deleteProduct = await productsModel.deleteOne({_id: id})
            return deleteProduct
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }
}