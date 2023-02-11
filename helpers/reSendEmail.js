const sendEmail  = require('./sendEmail');
const { User } = require('../models/user');
const { Unauthorized, BadRequest } = require('http-errors');

const reSendEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw Unauthorized('Wrong email');
    }

    if (!user.verificationToken) {
        throw BadRequest('Verification has already been passed');
    }

    const message = {
        to: email,
        subject: 'Email confirmation',
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm your email</a>`
    }

    await sendEmail(message);
    res.status(200).json({
        message: 'Verification email sent',
    })
}

module.exports = reSendEmail;