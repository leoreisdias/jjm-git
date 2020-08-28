const Sports = require('../models/Sports');
//const parseStringAsArray = require('../utils/parseStringAsArray');
const axios = require('axios');

module.exports = {

    async store(req, res) {
        const { key, location: url = "" } = req.file;
        const { title, description, summary, source, author, editorial, date, subjects, video_url, webImageOne, webImageTwo, facebook_url } = req.body;

        const subjectArray = subjects.split(',').map(sub => sub.trim());

        const subjectToUpperCase = subjectArray.map(sub => sub.toUpperCase());

        //if (!user_cpf && !user_email) {
        const sports = await Sports.create({
            title,
            description,
            date,
            createdAt: Date.now(),
            image: key,
            imageURL: url,
            subjects: subjectToUpperCase,
            video_url,
            facebook_url,
            webImageOne,
            webImageTwo,
            editorial,
            author,
            source,
            summary
        });
        // } else {
        //     return res.status(400).json({ error: "CPF já cadastrado" });
        // }

        return res.json(sports);
    },

    async show(req, res) {
        const { page = 1 } = req.query;

        const sports = await Sports.paginate({}, {
            page, limit: 6, sort: {
                createdAt: -1
            }
        });

        return res.json(sports);
    },

    async update() {

    },

    async destroy() {

    }
};