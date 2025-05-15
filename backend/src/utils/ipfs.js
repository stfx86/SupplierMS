// const pinataSDK = require('@pinata/sdk');
// const fs = require('fs');
// const path = require('path');
// require('dotenv').config();
//
// // Check for required environment variables
// if (!process.env.PINATA_JWT) {
//     throw new Error('PINATA_JWT environment variable is required');
// }
//
// // Initialize Pinata with JWT
// const pinata = new pinataSDK({
//     pinataJWTKey: process.env.PINATA_JWT
// });
//
// /**
//  * Upload JSON data to IPFS
//  * @param {Object} data - The JSON data to upload
//  * @returns {Promise<string>} - The IPFS CID
//  */
// const uploadJSONToIPFS = async (data) => {
//     try {
//         const result = await pinata.pinJSONToIPFS(data);
//         return result.IpfsHash;
//     } catch (error) {
//         console.error('Error uploading JSON to IPFS:', error);
//         throw new Error('Failed to upload JSON to IPFS');
//     }
// };
//
// /**
//  * Upload file to IPFS
//  * @param {string} filePath - Path to the file
//  * @returns {Promise<string>} - The IPFS CID
//  */
// const uploadFileToIPFS = async (filePath) => {
//     try {
//         const readableStreamForFile = fs.createReadStream(filePath);
//         const result = await pinata.pinFileToIPFS(readableStreamForFile);
//         return result.IpfsHash;
//     } catch (error) {
//         console.error('Error uploading file to IPFS:', error);
//         throw new Error('Failed to upload file to IPFS');
//     }
// };
//
// /**
//  * Upload supplier profile to IPFS
//  * @param {Object} supplierData - Supplier profile data
//  * @param {string} logoPath - Path to supplier logo file (optional)
//  * @returns {Promise<{profileCID: string, logoCID: string}>} - IPFS CIDs for profile and logo
//  */
// const uploadSupplierProfile = async (supplierData, logoPath = null) => {
//     try {
//         // Upload profile data
//          let profileCID = null;
//          if(supplierData){
//         const profileCID = await uploadJSONToIPFS(supplierData);
//          }
//         // Upload logo if provided
//         let logoCID = null;
//         if (logoPath) {
//             logoCID = await uploadFileToIPFS(logoPath);
//         }
//
//         return {
//             profileCID,
//             logoCID
//         };
//     } catch (error) {
//         console.error('Error uploading supplier profile:', error);
//         throw new Error('Failed to upload supplier profile to IPFS');
//     }
// };
//
// module.exports = {
//     uploadJSONToIPFS,
//     uploadFileToIPFS,
//     uploadSupplierProfile
// };




























const pinataSDK = require('@pinata/sdk');
const { Readable } = require('stream');
const fs = require('fs');
require('dotenv').config();

// Check for required environment variables
if (!process.env.PINATA_JWT) {
    throw new Error('PINATA_JWT environment variable is required');
}

// Initialize Pinata with JWT
const pinata = new pinataSDK({
    pinataJWTKey: process.env.PINATA_JWT,
});

/**
 * Upload JSON data to IPFS
 * @param {Object} data - The JSON data to upload
 * @param {string} [filename] - Optional filename for metadata
 * @returns {Promise<string>} - The IPFS CID
 */
const uploadJSONToIPFS = async (data, filename = null) => {
    try {
        const options = filename ? { pinataMetadata: { name: filename } } : {};
        const result = await pinata.pinJSONToIPFS(data, options);
        return result.IpfsHash;
    } catch (error) {
        console.error('Error uploading JSON to IPFS:', error);
        throw new Error('Failed to upload JSON to IPFS');
    }
};

/**
 * Upload file to IPFS
 * @param {string | Buffer} input - File path (string) or Buffer
 * @param {string} [filename] - Optional filename for the file
 * @returns {Promise<string>} - The IPFS CID
 */
const uploadFileToIPFS = async (input, filename = null) => {
    try {
        let readableStream;
        if (typeof input === 'string') {
            // Input is a file path
            readableStream = fs.createReadStream(input);
        } else if (Buffer.isBuffer(input)) {
            // Input is a Buffer
            readableStream = new Readable();
            readableStream.push(input);
            readableStream.push(null);
        } else {
            throw new Error('Input must be a file path (string) or Buffer');
        }

        // Ensure filename is provided; fallback to a default if null
        const metadataName = filename || `file-${Date.now()}`;
        const options = { pinataMetadata: { name: metadataName } };
        const result = await pinata.pinFileToIPFS(readableStream, options);
        return result.IpfsHash;
    } catch (error) {
        console.error('Error uploading file to IPFS:', error);
        throw new Error('Failed to upload file to IPFS');
    }
};

/**
 * Upload supplier profile to IPFS
 * @param {Buffer | string} bioInput - Buffer or file path of JSON bio data
 * @param {Buffer | string} logoInput - Buffer or file path of logo image (optional)
 * @param {string} [bioFilename] - Optional filename for bio JSON
 * @param {string} [logoFilename] - Optional filename for logo image
 * @returns {Promise<{bioCID: string, logoCID: string}>} - IPFS CIDs for bio and logo
 */
const uploadSupplierProfile = async (bioInput, logoInput = null, bioFilename = null, logoFilename = null) => {
    try {
        // Upload bio JSON data
        let bioCID = null;
        if (bioInput) {
            // Read and parse JSON data
            let bioData;
            if (typeof bioInput === 'string') {
                // Input is a file path
                bioData = JSON.parse(fs.readFileSync(bioInput, 'utf8'));
            } else if (Buffer.isBuffer(bioInput)) {
                // Input is a Buffer
                bioData = JSON.parse(bioInput.toString('utf8'));
            } else {
                throw new Error('bioInput must be a file path (string) or Buffer');
            }
            // Use provided bioFilename or fallback to a default
            const bioMetadataName = bioFilename || `bio-${Date.now()}.json`;
            bioCID = await uploadJSONToIPFS(bioData, bioMetadataName);
        }

        // Upload logo if provided
        let logoCID = null;
        if (logoInput) {
            // Use provided logoFilename or fallback to a default
            const logoMetadataName = logoFilename || `logo-${Date.now()}`;
            logoCID = await uploadFileToIPFS(logoInput, logoMetadataName);
        }

        return {
            bioCID,
            logoCID,
        };
    } catch (error) {
        console.error('Error uploading supplier profile:', error);
        throw new Error('Failed to upload supplier profile to IPFS');
    }
};

module.exports = {
    uploadJSONToIPFS,
    uploadFileToIPFS,
    uploadSupplierProfile,
};
