const Bistro = require('../bistro')
const restaurantList = require('../../restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
    restaurantList.results.forEach(item => {
        Bistro.create({
            name: `${item.name}`,
            name_en: `${item.name_en}`,
            category: `${item.category}`,
            image: `${item.image}`,
            location: `${item.location}`,
            phone: `${item.phone}`,
            google_map: `${item.google_map}`,
            rating: `${item.rating}`,
            description: `${item.description}`
        })
    })
    console.log('seeder done!')
})