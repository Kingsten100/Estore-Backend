import express from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'
import { createOrder, getOrders } from '../controllers/order.controller.js'

const router = express.Router()

router.post('/', verifyToken, createOrder)

router.get('/', verifyToken, getOrders)

export default router