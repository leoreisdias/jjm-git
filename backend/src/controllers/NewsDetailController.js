const News = require('../models/News');

module.exports = {
    async index(req, res) {

        const { id } = req.query;

        const news = await News.findById(id);
        return res.json({ news })
    }
}