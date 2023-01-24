const { Conflict } = require('http-errors');
const bcrypt = require('bcrypt');
const { User } = require('../../models/user');

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict('Email in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({ email, password: hashedPassword, subscription });
  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

module.exports = {
  signup,
};
