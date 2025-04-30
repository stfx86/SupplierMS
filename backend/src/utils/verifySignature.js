const { ethers } = require("ethers");

function verifySupplierSignature(data, signature) {
  const message = JSON.stringify(data);
  const hash = ethers.keccak256(ethers.toUtf8Bytes(message));
  // console.log(hash);
  
  const signer = ethers.verifyMessage(hash, signature); // Not verifyMessage
  return signer;
}

module.exports = verifySupplierSignature;
