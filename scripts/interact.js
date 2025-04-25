const { ethers } = require("hardhat");

async function getSupp() {
  const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
  
  try {
    console.log("Fetching contract...");
    const supplierRegistry = await ethers.getContractAt(
      "SupplierRegistry",
      contractAddress
    );
    
    console.log("Contract instance created");
    return supplierRegistry;
  } catch (error) {
    console.error("Error in getSupp():", error);
    throw error; // Re-throw for verify() to catch
  }
}

async function verify() {
  try {
    console.log("Starting verification...");
    
    const supplierRegistry = await getSupp();
    console.log("Contract address:", supplierRegistry.target);
    
    // Verify contract exists at address
    const code = await ethers.provider.getCode(supplierRegistry.target);
    console.log("Contract code:", code !== '0x' ? "Exists" : "MISSING");
    
    if (code === '0x') {
      throw new Error('Contract not deployed at this address');
    }
    
    
    const infos  = await supplierRegistry.getSupplier("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
console.log(infos);



    
    console.log("Verification successful!");
  } catch (error) {
    console.error("Verification failed:", error);
    process.exit(1);
  }
}

verify();


