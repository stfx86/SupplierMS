const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
const path = require('path');

// Check for required environment variables
if (!process.env.PINATA_JWT) {
    throw new Error('PINATA_JWT environment variable is required');
}

// Initialize Pinata with JWT
const pinata = new pinataSDK({
    pinataJWTKey: process.env.PINATA_JWT
});

/**
 * Upload JSON data to IPFS
 * @param {Object} data - The JSON data to upload
 * @returns {Promise<string>} - The IPFS CID
 */
const uploadJSONToIPFS = async (data) => {
    try {
        const result = await pinata.pinJSONToIPFS(data);
        return result.IpfsHash;
    } catch (error) {
        console.error('Error uploading JSON to IPFS:', error);
        throw new Error('Failed to upload JSON to IPFS');
    }
};

/**
 * Upload file to IPFS
 * @param {string} filePath - Path to the file
 * @returns {Promise<string>} - The IPFS CID
 */
const uploadFileToIPFS = async (filePath) => {
    try {
        const readableStreamForFile = fs.createReadStream(filePath);
        const result = await pinata.pinFileToIPFS(readableStreamForFile);
        return result.IpfsHash;
    } catch (error) {
        console.error('Error uploading file to IPFS:', error);
        throw new Error('Failed to upload file to IPFS');
    }
};

/**
 * Upload supplier profile to IPFS
 * @param {Object} supplierData - Supplier profile data
 * @param {string} logoPath - Path to supplier logo file (optional)
 * @returns {Promise<{profileCID: string, logoCID: string}>} - IPFS CIDs for profile and logo
 */
const uploadSupplierProfile = async (supplierData, logoPath = null) => {
    try {
        // Upload profile data
        const profileCID = await uploadJSONToIPFS(supplierData);
        
        // Upload logo if provided
        let logoCID = null;
        if (logoPath) {
            logoCID = await uploadFileToIPFS(logoPath);
        }

        return {
            profileCID,
            logoCID
        };
    } catch (error) {
        console.error('Error uploading supplier profile:', error);
        throw new Error('Failed to upload supplier profile to IPFS');
    }
};

module.exports = {
    uploadJSONToIPFS,
    uploadFileToIPFS,
    uploadSupplierProfile
}; 