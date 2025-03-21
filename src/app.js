import express from 'express'
import { errorHandler, notFound } from './middleware/error.middleware.js'
import productRoutes from './routes/product.route.js'
import messageRoutes from './routes/message.route.js'

const app = express()

app.use(express.json())

app.use('/api/product', productRoutes)
app.use('/api/message', messageRoutes)



app.use(notFound)
app.use(errorHandler)

export default app