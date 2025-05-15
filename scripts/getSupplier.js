const {ethers }  = require('hardhat');

async function main() {
const contractAddress ='0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

const SupplierRegistry = await  ethers.getContractAt('SupplierRegistry',contractAddress);
const Supplier = await SupplierRegistry.getSupplier("0x2546BcD3c84621e976D8185a91A922aE77ECEc30")
console.log(Supplier);




    
}



main();
