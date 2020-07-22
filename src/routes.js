const express = require('express')
const routes = express.Router()

routes.get('/', function (req, res) {
    return res.render('layout.njk')
})

// Rotas dos Instrutores //


module.exports = routes