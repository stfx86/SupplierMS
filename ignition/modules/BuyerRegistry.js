const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BuyerRegistryModule", (m) => {


    // Deploy the contract (add constructor args if needed)
    const buyerRegistry = m.contract("BuyerRegistry" /*, constructorArgs */);

    // Register a buyer (using example values)
    // m.call(buyerRegistry, "registerBuyer", [
    //     "0x1234567890abcdef1234567890abcdef12345678", // Public key of the buyer (this can be a derived key)
    // "Buyer1", // Name of the buyer (or a unique identifier)
    // "buyer1@example.com" // Email or other identifying information
    // ]);
/*
    // Optionally, check if registration was successful
    const buyerData = m.call(buyerRegistry, "getBuyer", ["0x1234567890abcdef1234567890abcdef12345678"]);
    console.log('Buyer data:', buyerData);*/

    return { buyerRegistry };
});
