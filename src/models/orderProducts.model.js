import mongoose from 'mongoose'

const orderProductsSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: {type: Number, required: true}
})



export default orderProductsSchema