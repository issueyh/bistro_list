const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
// const restaurantList = require('./restaurant.json')
const Bistro = require('./models/bistro')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
mongoose.connect('mongodb://localhost/bistro-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

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
    const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
    res.render('show', { restaurant: restaurant })
})
app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurants = restaurantList.results.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})