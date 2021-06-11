// 引用 Express 與 Express 路由器
const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const Bistro = require('../../models/bistro')

router.get('/create', (req, res) => {
    return res.render('create')
})
router.post('/', [
    check('name').isLength({ min: 1, max: 20 }).isEmpty(),
    check('category').contains().isEmpty(),
    check('image').isMimeType().isEmpty(),
    check('location').isLength({ min: 3 }).isEmpty(),
    check('phone').isIMEI('## #### ####').isEmpty(),
    check('google_map').isURL().isEmpty(),
    check('rating').isFloat({ min: 0, max: 5.0 }).isEmpty(),
    check('description').isLength({ max: 500 }).isEmpty()
], (req, res) => {
    const { name, category, image, location, phone, google_map, rating, description } = req.body
    const restaurant = new Bistro({
        name: name,
        category: category,
        image: image,
        location: location,
        phone: phone,
        google_map: google_map,
        rating: rating,
        description: description
    })
    return restaurant.save()
        .then(() => res.redirect('/'))
        .catch(error => {
            console.log(error)
            res.redirect('/error', errorMsg)
            res.status(500).json({ error: error.message })
        })
})

router.get('/:id', [
    check('id').isUUID()
], (req, res) => {
    const id = req.params.id
    return Bistro.findById(id)
        .lean()
        .then(restaurant => res.render('show', { restaurant }))
        .catch(error => {
            console.log(error)
            res.redirect('/error', errorMsg)
            res.status(500).json({ error: error.message })
        })
})

router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Bistro.findById(id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(error => {
            console.log(error)
            res.redirect('/error', errorMsg)
            res.status(500).json({ error: error.message })
        })
})
router.put('/:id', (req, res) => {
    const id = req.params.id
    const { name, category, image, location, phone, google_map, rating, description } = req.body
    return Bistro.findById(id)
        .then(restaurant => {
            restaurant.name = name
            restaurant.category = category
            restaurant.image = image
            restaurant.location = location
            restaurant.phone = phone
            restaurant.google_map = google_map
            restaurant.rating = rating
            restaurant.description = description
            return restaurant.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => {
            console.log(error)
            res.redirect('/error', errorMsg)
            res.status(500).json({ error: error.message })
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Bistro.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => {
            console.log(error)
            res.redirect('/error', errorMsg)
            res.status(500).json({ error: error.message })
        })
})

// 匯出路由器
module.exports = router