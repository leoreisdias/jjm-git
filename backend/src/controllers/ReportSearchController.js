const Report = require('../models/Report');

module.exports = {
    async index(req, res) {

        const { title } = req.query;

        const subjectsArray = subjects.split(',').map(sub => sub.trim());

        const subjectsToUpperCase = subjectsArray.map(sub => sub.toUpperCase());

        const report = await News.find({
            $in: {
                title: {
                    title
                }
            }

        })


        return res.json({ news })
    }
}