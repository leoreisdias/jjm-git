const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')

module.exports = {
    async store(req, res) {
        const { email, passwd } = req.body;

        const user = await (await User.findOne({ email }));

        if (!user) {
            return res.status(400).send({ error: 'User not found' })
        }

        if (!await bcrypt.compare(passwd, user.passwd))
            return res.status(400).send({ error: 'Invalid password' })

        user.passwd = undefined;

        const token = jwt.sign({
            id: user.id
        }, authConfig.secret, {
            expiresIn: 86400,
        })


        res.send({ user, token })
    }
}
