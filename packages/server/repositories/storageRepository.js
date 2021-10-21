const { bucket } = require('../config/storage')
const createError = require('http-errors');

async function uploadFileToGoogleCloudStorage(image) {

    const file = bucket.file(image.originalname);

    const fileStream = file.createWriteStream({
        resumable: false,
    });

    fileStream.on("error", (err) => {
        return createError(500, 'File cannot be uploaded');
    });

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`

    fileStream.end(image.buffer);

    return publicUrl;

}


module.exports = { uploadFileToGoogleCloudStorage }