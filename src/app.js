import express from 'express'
import { errorHandler, notFound } from './middleware/error.middleware.js'
import productRoutes from './routes/product.route.js'
import messageRoutes from './routes/message.route.js'
import userRoutes from './routes/user.route.js'
import orderRoutes from './routes/order.route.js'

const app = express()

app.use(express.json())

app.use('/api/product', productRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/order', orderRoutes)



app.use(notFound)
app.use(errorHandler)

export default app