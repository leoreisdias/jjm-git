const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwd: String,
})

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.passwd, 10);
    this.passwd = hash;

    next();
})

module.exports = mongoose.model('User', UserSchema);