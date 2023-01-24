const Contact = require('../../models/contact');

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: _id }, '', {
    skip,
    limit: Number(limit),
    favorite
  }).populate('owner', '_id email');
  const favoriteContacts = contacts.filter((contact) => contact.favorite);
  const result = favorite ? favoriteContacts : contacts;
  res.json(result);
};

module.exports = getAll;
