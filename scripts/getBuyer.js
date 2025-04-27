
const { ethers } = require("hardhat");

async function getBuyerContract() {
    const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'; // Replace this

    try {
        console.log("Fetching BuyerRegistry contract...");
        const buyerRegistry = await ethers.getContractAt(
            "BuyerRegistry",
            contractAddress
        );
        console.log("Contract instance created");
        return buyerRegistry;
    } catch (error) {
        console.error("Error in getBuyerContract():", error);
        throw error;
    }
}

async function verifyBuyer() {
    try {
        console.log("Starting buyer verification...");

        const buyerRegistry = await getBuyerContract();
        console.log("Contract address:", buyerRegistry.target);

        const code = await ethers.provider.getCode(buyerRegistry.target);
        console.log("Contract code:", code !== '0x' ? "Exists" : "MISSING");

        if (code === '0x') {
            throw new Error('Contract not deployed at this address');
        }

        // Replace this address with the buyer you want to query
        const buyerAddress = '0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec';

        const buyer = await buyerRegistry.getBuyer(buyerAddress);

        console.log("Buyer Address:", buyer.buyerAddress);
        console.log("Buyer Public Key:", buyer.publicKey);

        console.log("Verification successful!");
    } catch (error) {
        console.error("Verification failed:", error);
        process.exit(1);
    }
}

verifyBuyer();














