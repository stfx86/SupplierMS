const { ethers } = require('ethers');
const { supplierRegistryData, buyerRegistryData, getFirstSigner } = require('../config/contracts');

const getSupplierContract = async () => {
    const signer = await getFirstSigner();
    return new ethers.Contract(
        supplierRegistryData.address,
        supplierRegistryData.abi,
        signer
    );
};

const getBuyerContract = async () => {
    const signer = await getFirstSigner();
    return new ethers.Contract(
        buyerRegistryData.address,
        buyerRegistryData.abi,
        signer
    );
};

const registerSupplier = async (supplierData) => {
    try {
        const contract = await getSupplierContract();
        const tx = await contract.registerSupplier(
            supplierData.address,
            supplierData.name,
            supplierData.serviceType,
            supplierData.email,
            supplierData.website,
            supplierData.logoCID,
            supplierData.profileCID,
            supplierData.platforms,
            supplierData.links
        );
        await tx.wait();
        return tx;
    } catch (error) {
        console.error('Error registering supplier:', error);
        throw error;
    }
};

// ✅ New function
const supplierExists = async (address) => {
    try {
        const contract = await getSupplierContract();
        const supplierData = await contract.getSupplier(address);
        return supplierData[0]; // supplierData[0] is the `exists` boolean
    } catch (error) {
        console.error('Error checking supplier existence:', error);
        throw error;
    }
};

module.exports = {
    getSupplierContract,
    getBuyerContract,
    registerSupplier,
    supplierExists, // Export the new function
};
