// require('dotenv').config();
// const { uploadJSONToIPFS, uploadFileToIPFS , uploadSupplierProfile } = require('../src/utils/ipfs');

// const data = {
//     name: "John Doe",
//     email: "john.doe@example.com"
// };

// async function main() {
//     const cid = await uploadJSONToIPFS(data);
//     console.log(cid);
// }



// main();


const { supplierRegistryData  } = require('../src/config/contracts');


// Example usage:
const supplierAddress = supplierRegistryData.address;
const supplierABI = supplierRegistryData.abi;



console.log(supplierAddress, supplierABI);

