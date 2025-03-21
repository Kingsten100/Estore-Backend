import mongoose from 'mongoose'
import Message from '../models/message.model.js'
import asyncHandler from 'express-async-handler'

export const createMessage = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body

    if(!name || !email || !message){
        return res.status(400).json({ message: 'Please enter all fields'})
    }

    const newMessage = await Message.create({ name, email, message})

    res.status(200).json(newMessage)
})

export const getAllMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find().exec()

    res.status(200).json(messages)
})
