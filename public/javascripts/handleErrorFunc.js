module.exports = {
    handleErrorFunc: (req, res) => {
        const { id, name, category, image, location, phone, google_map, rating, description } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).render('user', {
                errorMessages: errors.array(),
                user: { id, name, category, image, location, phone, google_map, rating, description }
            })
        }
    }
}
