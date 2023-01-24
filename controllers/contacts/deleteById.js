const { NotFound } = require('http-errors');
const Contact = require('../../models/contact');

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new NotFound('Not found');
  }

  res.status(200).json({
    message: 'Contact deleted',
  });
};

module.exports = deleteById;
