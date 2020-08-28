const Report = require('../models/Report');

module.exports = {
    async index(req, res) {

        const { id } = req.query;

        const reports = await Report.findById(id);
        return res.json({ reports })
    }
}