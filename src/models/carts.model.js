import mongoose from "mongoose";

const collectionName = 'carts'

const cartsSchema = new mongoose.Schema({
    products: {
        type: [],
    }
})

const cartsModel = mongoose.model(collectionName, cartsSchema)

export default cartsModel