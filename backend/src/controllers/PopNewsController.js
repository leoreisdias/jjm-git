const PopNews = require('../models/PopNews');
//const parseStringAsArray = require('../utils/parseStringAsArray');
const axios = require('axios');

module.exports = {

    async store(req, res) {
        const { key, location: url = "" } = req.file;
        const { title, description, summary, source, author, editorial, date, subjects, video_url, altImageOne, altImageTwo, facebook_url } = req.body;

        const subjectArray = subjects.split(',').map(sub => sub.trim());

        const subjectToUpperCase = subjectArray.map(sub => sub.toUpperCase());

        //if (!user_cpf && !user_email) {
        const popnews = await PopNews.create({
            title,
            description,
            date,
            createdAt: Date.now(),
            image: key,
            imageURL: url,
            subjects: subjectToUpperCase,
            video_url,
            facebook_url,
            altImageOne,
            altImageTwo,
            editorial,
            author,
            source,
            summary
        });
        // } else {
        //     return res.status(400).json({ error: "CPF já cadastrado" });
        // }

        return res.json(popnews);
    },

    async show(req, res) {
        const { page = 1 } = req.query;

        const popnews = await PopNews.paginate({}, {
            page, limit: 6, sort: {
                createdAt: -1
            }
        });

        return res.json(popnews);
    },

    async update() {

    },

    async destroy() {

    }
};