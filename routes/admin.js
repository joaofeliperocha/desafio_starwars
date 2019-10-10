const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    //res.send("Página principal")
    res.render('admin/index')
})

router.get('/planetas', (req, res) => {
    res.render("admin/planetas")
})
router.get('/planetas/add', (req, res) => {
    res.render("admin/addplanetas")
})

module.exports = router