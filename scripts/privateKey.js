import { ethers } from 'ethers';

// Configuration
const testPrivateKey = "0x0123456789012345678901234567890123456789012345678901234567890123"; // TEST ONLY

async function testWallet() {
    const wallet = new ethers.Wallet(testPrivateKey);

    // Method 3 (Confirmed working in your environment)
    const publicKey = wallet.signingKey.publicKey;

    console.log("=== Wallet Information ===");
    console.log(`Ethers Version: ${ethers.version}`);
    console.log(`Private Key:    ${wallet.privateKey}`);
    console.log(`Public Key:     ${publicKey}`);
    console.log(`Address:        ${wallet.address}`);
    console.log("\nKey Details:");
    console.log(`Public Key Length: ${publicKey.length} chars`);
    console.log(`Starts with 0x04:  ${publicKey.startsWith('0x04')}`);
    console.log(`Valid Format:      ${publicKey.length === 130 ? '✅' : '❌'}`);
}

await testWallet();
