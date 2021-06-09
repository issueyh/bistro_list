// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Bistro = require('../../models/bistro')

router.get('/create', (req, res) => {
    return res.render('create')
})
router.post('/', (req, res) => {
    const newBistro = req.body
    const restaurant = new Bistro({
        name: newBistro.name,
        category: newBistro.category,
        image: newBistro.image,
        location: newBistro.location,
        phone: newBistro.phone,
        google_map: newBistro.google_map,
        rating: newBistro.rating,
        description: newBistro.description
    })
    return restaurant.save()
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    return Bistro.findById(id)
        .lean()
        .then(restaurant => res.render('show', { restaurant }))
        .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Bistro.findById(id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
    const id = req.params.id
    const newBistro = req.body
    return Bistro.findById(id)
        .then(restaurant => {
            restaurant.name = newBistro.name
            restaurant.category = newBistro.category
            restaurant.image = newBistro.image
            restaurant.location = newBistro.location
            restaurant.phone = newBistro.phone
            restaurant.google_map = newBistro.google_map
            restaurant.rating = newBistro.rating
            restaurant.description = newBistro.description
            return restaurant.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Bistro.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router