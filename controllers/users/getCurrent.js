const { User } = require('../../models/user');

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    user: {
      email: email,
      subscription: subscription,
    },
  });
};

module.exports = getCurrent;
