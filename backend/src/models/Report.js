const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')

const ReportSchema = new mongoose.Schema({
    title: String,
    name: String,
    description: String,
    date: String,
    createdAt: Date,
    reportImage: String,
    imageURL: String,
});


ReportSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Report', ReportSchema);