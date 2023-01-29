const { User } = require('../../models/user');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;
    const avatarName = `${_id}_${originalname}`;
    try {
        const resultUpload = path.join(avatarsDir, avatarName);
        await Jimp.read(tempUpload).then(image => {
            return image.resize(256, 256).quality(60).write(resultUpload)
        }).catch(err => {
            console.error(err);
        })
        const avatarURL = path.join('public', 'avatars', avatarName);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({ avatarURL });

    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
}

module.exports = updateAvatar;