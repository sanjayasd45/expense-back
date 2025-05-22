//  crypto from 'crypto';
const crypto = require('crypto');
const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier');

module.exports.cloudinarySignature = async (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key:  process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    let rawData = Buffer.alloc(0);
    req.on('data', (chunk) => {
        rawData = Buffer.concat([rawData, chunk]);
    });
    req.on('end', () => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'Expense Tracker' }, // Optional: customize folder
            (error, result) => {
                if (error) return res.status(500).json({ error: error.message });
                res.json({ url: result.secure_url });
            }
        );
        streamifier.createReadStream(rawData).pipe(uploadStream);
    });
}