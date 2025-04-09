import mongoose from 'mongoose'
import Order from '../models/order.model.js'
import asyncHandler from 'express-async-handler'
import Product from '../models/product.model.js'


export const createOrder = asyncHandler(async (req, res) => {
    const user = req.user._id
    const { product } = req.body

    let totalPrice = 0
    const orderProductIds = []

    
    for (const { productId, quantity } of product) {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: `Invalid product ID: ${productId}` })
        }

        
        const productData = await Product.findById(productId).exec()
        if (!productData) {
            return res.status(404).json({ message: `Product with ID ${productId} not found` })
        }

        
        totalPrice += productData.price * quantity

        
        const orderProduct = {
            productId: productData._id,
            quantity
        }

        
        orderProductIds.push(orderProduct)
    }

    
    const newOrder = await Order.create({
        user,
        product: orderProductIds,  
        totalPrice  
    })
    
    res.status(201).json(newOrder)

    

})

export const getOrders = asyncHandler(async (req, res) => {
    const user = req.user._id
    
    const orders = await Order.find({ user: user })
        .populate('product.productId')
        

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' })
        }
    
        res.status(200).json(orders)
})