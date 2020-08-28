const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')

const PopNewsSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    createdAt: Date,
    image: String,
    imageURL: String,
    subjects: [String],
    video_url: String,
    facebook_url: String,
    altImageOne: String,
    altImageTwo: String,
    editorial: String,
    author: String,
    source: String,
    summary: String,
});


PopNewsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('PopNews', PopNewsSchema);