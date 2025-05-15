const { ethers } = require('ethers');
const { supplierRegistryData, buyerRegistryData, getFirstSigner } = require('../config/contracts');
///

const getSupplierContract = async () => {
    try {
 
        const signer = await getFirstSigner();
     
      
       

        console.log('Creating ethers Contract instance...');
        const contract = new ethers.Contract(
            supplierRegistryData.address,
            supplierRegistryData.abi,
            signer
        );
        console.log('Contract instance created:', contract.target);

        return contract;
    } catch (error) {
        console.error('Error in getSupplierContract:', error.message);
        console.error('Full error details:', error);
        throw error;
    }
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
        console.log('Starting registerSupplier...');
        console.log('Supplier data:', JSON.stringify(supplierData, null, 2));

        console.log('Fetching contract instance...');
        const contract = await getSupplierContract();
        console.log('Contract fetched, address:', contract.address || 'Undefined');

        console.log('Preparing to call registerSupplier on contract...');
        console.log('Arguments:', {
            address: supplierData.address,
            name: supplierData.name,
            companyName: supplierData.companyName,
            country: supplierData.country,
            categories: supplierData.categories,
            serviceType: supplierData.serviceType,
            email: supplierData.email,
            website: supplierData.website,
            logoCID: supplierData.logoCID,
            profileCID: supplierData.profileCID,
            platforms: supplierData.platforms,
            links: supplierData.links,
        });

        console.log('Calling registerSupplier...');
        const tx = await contract.registerSupplier(
            supplierData.address,
            supplierData.name,
            supplierData.companyName,
            supplierData.country,
            supplierData.categories,
            supplierData.serviceType,
            supplierData.email,
            supplierData.website,
            supplierData.logoCID,
            supplierData.profileCID,
            supplierData.platforms,
            supplierData.links
        );
        console.log('Transaction sent, tx hash:', tx.hash);

        console.log('Waiting for transaction confirmation...');
        await tx.wait();
        console.log('Transaction confirmed');

        return tx;
    } catch (error) {
        console.error('Error registering supplier:', error.message);
        console.error('Full error details:', error);
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
