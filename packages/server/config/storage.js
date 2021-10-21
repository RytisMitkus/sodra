require('dotenv').config()
const { Storage } = require("@google-cloud/storage");
const path = require("path");

const storage = new Storage({
    credentials: {
        client_email: process.env.GCP_STORAGE_CLIENT_EMAIL,
        private_key: process.env.GCP_STORAGE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
});


const bucket = storage.bucket(process.env.GCP_STORAGE_BUCKET);

module.exports = { bucket }