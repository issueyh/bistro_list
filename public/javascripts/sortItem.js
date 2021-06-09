function sortItem(value) {
    if (value === 'desc') {
        sortItem = { _id: 'desc' }
    } else if (value === 'categoryAsc') {
        sortItem = { category: 'asc' }
    } else if (value === 'ratingDesc') {
        sortItem = { rating: -1 }
    } else {
        sortItem = { _id: 'asc' }
    }
    return sortItem
}

module.exports = sortItem