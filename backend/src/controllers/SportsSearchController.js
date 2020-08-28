const Sports = require('../models/Sports');

module.exports = {
    async index(req, res) {

        const { subjects, title } = req.query;

        const subjectsArray = subjects.split(',').map(sub => sub.trim());

        const subjectsToUpperCase = subjectsArray.map(sub => sub.toUpperCase());

        const sports = await Sports.find({
            $or: [{
                subjects: {
                    $in: subjectsToUpperCase,
                }

            }, {
                title: {
                    $in: title
                }
            }]

        })

        return res.json({ sports })
    }
}