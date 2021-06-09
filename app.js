const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const Bistro = require('./models/bistro')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/bistro-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    Bistro.find()
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.log(error))
})
app.get('/restaurants/create', (req, res) => {
    return res.render('create')
})
app.post('/restaurants', (req, res) => {
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

app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id
    return Bistro.findById(id)
        .lean()
        .then(restaurant => res.render('show', { restaurant }))
        .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    return Bistro.findById(id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(error => console.log(error))
})
app.put('/restaurants/:id', (req, res) => {
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

app.delete('/restaurants/:id', (req, res) => {
    const id = req.params.id
    return Bistro.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
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

app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})