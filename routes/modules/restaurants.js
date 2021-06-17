// 引用 Express 與 Express 路由器
const express = require('express')
const { check, buildCheckFunction } = require('express-validator')
const checkParams = buildCheckFunction(['body', 'query', 'params'])
const mongoObjectID = require('mongoose').Types.ObjectId
const router = express.Router()
const Bistro = require('../../models/bistro')
const { handleErrorFunc } = require('../../public/javascripts/handleErrorFunc')

router.get('/create', (req, res) => {
    return res.render('create')
})
router.post('/', [
    checkParams('name').isLength({ min: 1, max: 20 }),
    checkParams('category').contains(),
    checkParams('image').isMimeType(),
    checkParams('location').isLength({ min: 3 }),
    checkParams('phone').isIMEI('## #### ####'),
    checkParams('google_map').isURL(),
    checkParams('rating').isFloat({ min: 0, max: 5.0 }),
    checkParams('description').isLength({ max: 500 }),
    handleErrorFunc
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
            res.status(422).render('error', { errMsg: error.msg })
        })
})

router.get('/:id', [
    check('id')
        .custom((val) => mongoObjectID.isValid(val))
        .withMessage('Not a valid id'),
    handleErrorFunc
], (req, res) => {
    const id = req.params.id
    return Bistro.findById(id)
        .lean()
        .then(restaurant => res.render('show', { restaurant }))
        .catch(error => {
            res.status(422).render('error', { errMsg: error.msg })
        })
})

router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Bistro.findById(id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(error => {
            res.status(422).render('error', { errMsg: error.msg })
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
            res.status(422).render('error', { errMsg: error.msg })
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Bistro.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => {
            res.status(422).render('error', { errMsg: error.msg })
        })
})

// 匯出路由器
module.exports = router