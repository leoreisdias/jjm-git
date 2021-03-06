const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')

const NewsSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    createdAt: Date,
    image: String,
    imageURL: String,
    subjects: [String],
    video_url: String,
    facebook_url: String,
    webImageOne: String,
    webImageTwo: String,
    editorial: String,
    author: String,
    source: String,
    summary: String,
});

NewsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('News', NewsSchema);