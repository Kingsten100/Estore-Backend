import mongoose from 'mongoose'
import Order from '../models/order.model.js'
import asyncHandler from 'express-async-handler'
import Product from '../models/product.model.js'


export const createOrder = asyncHandler(async (req, res) => {
    // const { orderProducts, productId, quantity, totalPrice } = req.body
    const user = req.user._id
    const { product } = req.body

    // if(!productId){
    //     return res.status(400).json({ message: 'You need a product to place an order'})
    // }


    // console.log(req.body)
    // const newOrder = await Order.create({ user, orderProducts, productId, quantity, totalPrice})

    let totalPrice = 0;  // Initiera variabel för att hålla det totala priset för ordern
    const orderProductIds = [];  // Array för att hålla alla orderprodukter (productId + quantity)

    // Gå igenom varje produkt som skickas med och hämta produktdata från databasen
    for (const { productId, quantity } of product) {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: `Invalid product ID: ${productId}` });
        }

        // Hämta produktens data från databasen
        const productData = await Product.findById(productId).exec();
        if (!productData) {
            return res.status(404).json({ message: `Product with ID ${productId} not found` });
        }

        // Beräkna totalpriset (produktens pris * kvantitet)
        totalPrice += productData.price * quantity;

        // Skapa en orderprodukt med produktens ID och kvantitet
        const orderProduct = {
            productId: productData._id,
            quantity
        };

        // Lägg till denna orderprodukt i arrayen
        orderProductIds.push(orderProduct);
    }

    // Skapa en ny order med produkterna och totalpriset
    const newOrder = await Order.create({
        user,
        product: orderProductIds,  // Här sparar vi orderprodukterna som en array med objekt (productId + quantity)
        totalPrice  // Det totala priset beräknas innan vi sparar ordern
    });
    
    res.status(201).json(newOrder)

    

})

export const getOrders = asyncHandler(async (req, res) => {
    const user = req.user._id
    console.log(req.user._id)
    const orders = await Order.find({ user: user })
        // .populate('name', 'price', 'product.productId') // Populera produktinformation för varje orderprodukt (bara namn och pris)
        // .exec();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }
    
        res.status(200).json(orders)
})