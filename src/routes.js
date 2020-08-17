const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')
const ProductController = require('./app/controllers/productController')
const HomeController = require('./app/controllers/homeController')
const SearchController = require('./app/controllers/searchController')

// HOME //

routes.get('/', HomeController.index)

// SEARCH //

routes.get('/products/search', SearchController.index)

// PRODUCTS //

routes.get('/products/create', ProductController.create)
routes.get('/products/:id', ProductController.show)
routes.get('/products/:id/edit', ProductController.edit)

routes.post('/products', multer.array('photos', 6), ProductController.post)
routes.put('/products', multer.array('photos', 6), ProductController.put)
routes.delete('/products', ProductController.delete)

// ALIAS //
routes.get('/ads/create', function (req, res) {
    return res.redirect('/products/create')
})

module.exports = routes