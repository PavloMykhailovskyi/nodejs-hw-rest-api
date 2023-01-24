const { User } = require('../../models/user');

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.status(200).json(result);
};

module.exports = updateSubscription;
