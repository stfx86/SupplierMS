const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SupplierRegistryModule", (m) => {
  const supplierRegistry = m.contract("SupplierRegistry");

  const suppliers = [
    {
      id: "alpha", // Unique ID for Ignition
      addr: "0x0000000000000000000000000000000000000001",
      name: "Alpha Logistics",
      serviceType: "Logistics",
      email: "alpha@logistics.com",
      website: "https://alphalogistics.com",
      logoCID: "QmLogoAlpha",
      profileCID: "QmProfileAlpha",
      platforms: ["Twitter", "LinkedIn"],
      links: ["https://twitter.com/alpha", "https://linkedin.com/company/alpha"]
    },
    {
      id: "beta", // Unique ID
      addr: "0x0000000000000000000000000000000000000002",
      name: "Beta Tech",
      serviceType: "IT Consulting",
      email: "beta@tech.com",
      website: "https://betatech.com",
      logoCID: "QmLogoBeta",
      profileCID: "QmProfileBeta",
      platforms: ["GitHub"],
      links: ["https://github.com/betatech"]
    }
  ];

  for (const s of suppliers) {
    m.call(supplierRegistry, "registerSupplier", [
      s.addr,
      s.name,
      s.serviceType,
      s.email,
      s.website,
      s.logoCID,
      s.profileCID,
      s.platforms,
      s.links
    ], { id: `register${s.id}` }); // <- Unique ID per call
  }

  return { supplierRegistry };
});
