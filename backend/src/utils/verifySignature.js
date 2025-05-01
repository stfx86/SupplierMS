const { ethers } = require("ethers");

function verifySupplierSignature(data, signature) {


  console.log("canonicalize(data); ");
  const message = canonicalize(data);
  console.log(message);
  
  
  const hash = ethers.keccak256(ethers.toUtf8Bytes(message));
  console.log( "back_hash: "+ hash);
  
  const signer = ethers.verifyMessage(hash, signature); // Not verifyMessage
  // const signer = ethers.verifyMessage(message, signature); // Not verifyMessage
  console.log("singer from verifySignature  :",signer);
  

  return signer;
}

module.exports = verifySupplierSignature;




function canonicalize(obj) {
  return JSON.stringify(
    Object.keys(obj)
      .sort()
      .reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {})
  );
}
