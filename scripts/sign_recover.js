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

  const message = JSON.stringify(data);
  const hash = keccak256(toUtf8Bytes(message));
  const signature = await wallet.signMessage(hash);
  console.log("\nSignature:", signature);

  const recoveredAddress = ethers.verifyMessage(hash, signature);
  console.log("\nRecovered signer:", recoveredAddress);
  console.log("\nSignature valid?", recoveredAddress === wallet.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Test script failed:", err);
    process.exit(1);
  });
