import express from 'express'
import { createNewProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/product.controller.js'

const router = express.Router()

router.post('/', createNewProduct)

router.get('/', getAllProducts)
router.get('/:id', getProduct)

router.put('/:id', updateProduct)
router.patch('/:id', updateProduct)

router.delete('/:id', deleteProduct)



export default router