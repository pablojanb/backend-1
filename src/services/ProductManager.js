import productsModel from "../models/products.model.js"

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

    editProduct(id, modifiedProduct) {

        return productsModel.updateOne({_id: id}, modifiedProduct)
    }


    deleteProduct(id) {
        return productsModel.deleteOne({_id: id})
    }
}