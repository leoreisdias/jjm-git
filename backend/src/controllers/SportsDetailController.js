const Sports = require('../models/Sports');

module.exports = {
    async index(req, res) {

        const { id } = req.query;

        const sports = await Sports.findById(id);
        return res.json({ sports })
    }
}