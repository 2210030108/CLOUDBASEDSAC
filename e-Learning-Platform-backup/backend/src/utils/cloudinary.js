import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
import path from "path"
import cloudinaryConfig from '../config/cloudinaryConfig.js';

// Configure Cloudinary
cloudinary.config(cloudinaryConfig);

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Validate input
        if (!localFilePath) {
            throw new Error('No file path provided');
        }

        // Check if file exists
        if (!fs.existsSync(localFilePath)) {
            throw new Error(`File not found at path: ${localFilePath}`);
        }

        // Upload to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            timeout: 60000 // 1 minute timeout
        });

        // Verify upload was successful
        if (!response?.public_id) {
            throw new Error('Cloudinary upload failed - no public_id returned');
        }

        // Clean up local file
        fs.unlinkSync(localFilePath);
        
        return response;
    } catch (err) {
        // Clean up local file if it exists
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        console.error('Cloudinary upload error:', {
            error: err.message,
            filePath: localFilePath,
            timestamp: new Date().toISOString()
        });

        throw err; // Re-throw to allow calling code to handle
    }
}

export { uploadOnCloudinary }
