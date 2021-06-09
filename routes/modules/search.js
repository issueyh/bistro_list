// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Bistro = require('../../models/bistro')

router.get('/', (req, res) => {
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

// 匯出路由器
module.exports = router