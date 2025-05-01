const { ethers } = require("ethers");

function verifySupplierSignature(data, signature) {
  console.log("Verifying signature for data: ", data);
  const message = canonicalize(data);
  console.log("Canonicalized data : ", message);
  
  try {
    const messageHash = ethers.keccak256(ethers.toUtf8Bytes(message));
    console.log("hash of the data: ",messageHash);
    
    const signer = ethers.verifyMessage(messageHash, signature);
    console.log("Recovered signer:", signer);
    return signer;
  } catch (error) {
    console.error("Signature verification failed:", error);
    throw error;
  }
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
