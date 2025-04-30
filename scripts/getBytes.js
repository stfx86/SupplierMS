import { ethers } from "ethers";

async function main(){


const message="0x152332a2"
console.log(ethers.getBytes(message));
ethers.get


}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Test script failed:", err);
    process.exit(1);
  });
