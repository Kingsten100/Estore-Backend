import mongoose from 'mongoose'
import Product from '../models/product.model.js'
import asyncHandler from 'express-async-handler'

export const createNewProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category, images } = req.body

    if(!name || !price || !description || !category || !images){
        return res.status(400).json('All fields are required')
    }

    const newProduct = await Product.create({ name, price, description, category, images })
    res.status(201).json({newProduct})
})

export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().exec()

    res.status(200).json(products)
})

export const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: 'invalid id'})
    }

    const product = await Product.findById(id).exec()

    if(!product){
        res.status(404).json({ message: 'Can not find that product'})
    }

    res.status(200).json(product)
})

export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { name, price, description, category, images } = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ message: 'Invalid Id'})
    }

    const toUpdate = {}

    if(name) toUpdate.name = name
    if(price) toUpdate.price = price
    if(description) toUpdate.description = description
    if(category) toUpdate.category = category
    if(images) toUpdate.images = images

    if(Object.keys(toUpdate).length === 0){
        res.status(400).json({ message: 'No changes provided'})
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, toUpdate, {new: true}).exec()

    if(!updateProduct){
        return res.status(404).json({ message: 'Can not find that product'})
    }

    res.status(200).json(updatedProduct)
})


export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: 'invalid id'})
    }

    const product = await Product.findByIdAndDelete(id).exec()

    if(!product){
        res.status(404).json({ message: 'Can not find that product'})
    }

    res.sendStatus(204)
})