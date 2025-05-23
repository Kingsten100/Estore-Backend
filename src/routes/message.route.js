import express from 'express'
import { createMessage, getAllMessages } from '../controllers/message.controller.js'

const router = express.Router()

router.post('/', createMessage)

router.get('/', getAllMessages)

export default router