import  { Wallet, keccak256, toUtf8Bytes, recoverAddress } from 'ethers';
// const { arrayify } = require("ethers/utils");
import { ethers }  from 'ethers'

async function main() {
  const wallet = Wallet.createRandom();
  console.log("Wallet address:", wallet.address);

  const data = {
    name: "Alice",
    email: "alice@example.com",
    serviceType: "Consulting",
  };

  // const message = JSON.stringify(data);
  const message =canonicalize(data);
  const hash = keccak256(toUtf8Bytes(message));
  const signature = await wallet.signMessage(hash);
  console.log("\nSignature:", signature);
  ////

  const data2 = {
    email: "alice@example.com",
    name: "Alice",
    serviceType: "Consulting"
    
    
  };

  // const message2 = JSON.stringify(data2);
  const message2=canonicalize(data2);
  const hash2 = keccak256(toUtf8Bytes(message2));
  ////

  const recoveredAddress = ethers.verifyMessage(hash2, signature);
  console.log("\nRecovered signer:", recoveredAddress);
  console.log("\nSignature valid?", recoveredAddress === wallet.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Test script failed:", err);
    process.exit(1);
  });



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