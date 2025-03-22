import mongoose from 'mongoose'
import orderProductsSchema from './orderProducts.model.js'


const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: [orderProductsSchema],
    // product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'orderProducts', required: true }],
    totalPrice: { type: Number }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)
export default Order