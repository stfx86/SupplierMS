const {ethers }  = require('hardhat');

async function main() {
const contractAddress ='0x5fbdb2315678afecb367f032d93f642f64180aa3';

const SupplierRegistry = await  ethers.getContractAt('SupplierRegistry',contractAddress);
const Supplier = await SupplierRegistry.getSupplier("0x0000000000000000000000000000000000000009")
console.log(Supplier);





    
}



main();