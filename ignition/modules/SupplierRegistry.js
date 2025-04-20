const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LockModule", (m) => {
  // Get the first configured account as owner
  const owner = m.getAccount(0);

  // Deploy the contract (add constructor args if needed)
  const supplierRegistry = m.contract("SupplierRegistry" /*, constructorArgs */);

  // Register supplier (as a separate transaction)
  m.call(supplierRegistry, "registerSupplier", ["hhsh", "oo@oo", "99992289"]);

  return { supplierRegistry };
});
