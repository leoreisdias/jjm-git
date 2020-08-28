const PopNews = require('../models/PopNews');

module.exports = {
    async index(req, res) {

        const { id } = req.query;

        const popnews = await PopNews.findById(id);
        return res.json({ popnews })
    }
}