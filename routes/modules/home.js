// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Bistro = require('../../models/bistro')
const sortItem = require('../../public/javascripts/sortItem')

router.get('/', (req, res) => {
    Bistro.find()
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.log(error))
})

router.get('/restaurants/searches', (req, res) => {
    const keyword = req.query.keyword
    Bistro.find({
        "$or": [
            { "name": { $regex: `${keyword}`, $options: '$i' } },
            { "category": { $regex: `${keyword}`, $options: '$i' } }
        ]
    })
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.log(error))
})

router.post('/restaurants/sort', (req, res) => {
    const sortOption = req.body.sort
    const sortTerm = sortItem(req.body.sort)
    Bistro.find()
        .lean()
        .sort(sortTerm)
        .then(restaurants => res.render('index', { restaurants, sortOption }))
        .catch(error => console.error(error))
})

// 匯出路由器
module.exports = router