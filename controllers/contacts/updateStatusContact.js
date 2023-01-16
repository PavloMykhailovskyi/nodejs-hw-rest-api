const Contact = require("../../models/contact");

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {
    new: true,
  });
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json(result);
};

module.exports = updateStatusContact;
