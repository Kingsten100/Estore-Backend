
export const notFound = (req, res, next) => {
    const error = new Error('Not found - ' + req.originalUrl)
    res.status(404)
    next(error)
}

export const errorHandler = (req, res, next) => {
    console.log('Error: ' + err.message)

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
}