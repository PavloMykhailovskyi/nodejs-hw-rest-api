const Contact = require("../../models/contact");
const { NotFound } = require("http-errors");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
    throw new NotFound("Contact not found");
  }

  return res.json(result);
};

module.exports = updateById;
