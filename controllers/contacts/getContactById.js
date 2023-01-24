const Contact = require('../../models/contact');
const { NotFound } = require('http-errors');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw new NotFound(`Not found`);
  }

  res.json(result);
};

module.exports = getContactById;
