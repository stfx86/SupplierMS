const hre = require("hardhat");

async function main() {
    // 1. grab a signer (first account from your local node)
    const [buyer] = await hre.ethers.getSigners();
    console.log("👤 Buyer address:", buyer.address);

    // 2. point at your deployed contract
    const registry = await hre.ethers.getContractAt(
        "BuyerRegistry",
        "0x5FbDB2315678afecb367f032d93F642f64180aa3", // your local address
        buyer
    );

    // 3. read initial state
    let info = await registry.getBuyer(buyer.address);
    console.log("🔍 Before register:", info);

    // 4. register a dummy public key
    const firstKey = "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef";
    console.log("➡️  Registering publicKey =", firstKey);
    let tx = await registry.registerBuyer(firstKey);
    await tx.wait();

    // 5. verify it stuck
    info = await registry.getBuyer(buyer.address);
    console.log("✅ After register:", info);

    // 6. update the key
    const newKey = "0x1234512345123451234512345123451234512345";
    console.log("➡️  Updating publicKey to =", newKey);
    tx = await registry.updatePublicKey(newKey);
    await tx.wait();

    // 7. verify update
    info = await registry.getBuyer(buyer.address);
    console.log("✅ After update:", info);
}

main()
.then(() => process.exit(0))
.catch((err) => {
    console.error("❌ Test script failed:", err);
    process.exit(1);
});
