const express = require('express')
const routes = express.Router()

routes.get('/', function (req, res) {
    return res.send('ok')
})

// Rotas dos Instrutores //


module.exports = routes