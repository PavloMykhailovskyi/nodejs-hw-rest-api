const { Conflict } = require('http-errors');
const bcrypt = require('bcrypt');
const { User } = require('../../models/user');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../../helpers');

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict('Email in use');
  }

  const avatarURL = gravatar.url(email);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const verificationToken = uuidv4();

  await User.create({ email, password: hashedPassword, subscription, avatarURL, verificationToken });

  const mail = {
    to: email,
    subject: 'Email confirmation',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    user: {
      email,
      subscription,
      avatarURL,
      verificationToken
    },
  });
};

module.exports = {
  signup,
};
