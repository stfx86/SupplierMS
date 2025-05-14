const { ethers } = require('ethers');
const { abi: SupplierRegistryABI } = require('./../../../artifacts/contracts/SupplierRegistry.sol/SupplierRegistry.json');
const { abi: BuyerRegistryABI } = require('./../../../artifacts/contracts/BuyerRegistry.sol/BuyerRegistry.json');

const supplierRegistryData = {
    address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    abi: SupplierRegistryABI,
};

const buyerRegistryData = {
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: BuyerRegistryABI,
};

const getFirstSigner = async () => {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

    // Get the first signer properly
    const signer = provider.getSigner(0); // Index 0
    return signer;
};



module.exports = {
    supplierRegistryData,
    buyerRegistryData,
    getFirstSigner,
}; 



