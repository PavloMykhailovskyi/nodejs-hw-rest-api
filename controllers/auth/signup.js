const { Conflict } = require('http-errors');
const bcrypt = require('bcrypt');
const { User } = require('../../models/user');
const gravatar = require('gravatar');

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict('Email in use');
  }

  const avatarURL = gravatar.url(email);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({ email, password: hashedPassword, subscription, avatarURL });
  res.status(201).json({
    user: {
      email,
      subscription,
      avatarURL
    },
  });
};

module.exports = {
  signup,
};
