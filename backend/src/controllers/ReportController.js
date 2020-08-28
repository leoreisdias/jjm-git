const axios = require('axios');
const Report = require('../models/Report');

module.exports = {

    async store(req, res) {
        const { key, location: url = '' } = req.file;
        const { title, name, description, date } = req.body;

        //if (!user_cpf && !user_email) {
        const reports = await Report.create({
            title,
            description,
            name,
            date,
            createdAt: Date.now(),
            reportImage: key,
            imageURL: url
        });
        // } else {
        //     return res.status(400).json({ error: "CPF já cadastrado" });
        // }

        return res.json(reports);
    },

    async show(req, res) {
        const { page = 1 } = req.query;

        const reports = await Report.paginate({}, {
            page, limit: 6, sort: {
                createdAt: -1
            }
        });

        return res.json(reports);
    },

    async update() {

    },

    async destroy() {

    }
};