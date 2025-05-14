const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RegistryModule", (m) => {
  // Deploy the SupplierRegistry contract
  const supplierRegistry = m.contract("SupplierRegistry");

  // Supplier data
  const suppliers = [
    {
      id: "alpha",
      addr: "0x0000000000000000000000000000000000000001",
      name: "Alpha Logistics",
      companyName: "Alpha Logistics Inc.", // Added field
      country: "USA",                     // Added field
      categories: "Freight, Warehousing", // Added field
      serviceType: "Logistics",
      email: "alpha@logistics.com",
      website: "https://alphalogistics.com",
      logoCID: "QmLogoAlpha",
      profileCID: "QmProfileAlpha",
      platforms: ["Twitter", "LinkedIn"],
      links: ["https://twitter.com/alpha", "https://linkedin.com/company/alpha"],
    },
    {
      id: "beta",
      addr: "0x0000000000000000000000000000000000000002",
      name: "Beta Tech",
      companyName: "Beta Technologies LLC", // Added field
      country: "Canada",                   // Added field
      categories: "Software, Consulting",  // Added field
      serviceType: "IT Consulting",
      email: "beta@tech.com",
      website: "https://betatech.com",
      logoCID: "QmLogoBeta",
      profileCID: "QmProfileBeta",
      platforms: ["GitHub"],
      links: ["https://github.com/betatech"],
    },
  ];

  // Register each supplier
  for (const s of suppliers) {
    m.call(
      supplierRegistry,
      "registerSupplier",
      [
        s.addr,
        s.name,
        s.companyName,    // Added argument
        s.country,        // Added argument
        s.categories,     // Added argument
        s.serviceType,
        s.email,
        s.website,
        s.logoCID,
        s.profileCID,
        s.platforms,
        s.links,
      ],
      { id: `registerSupplier${s.id}` } // Unique ID per call
    );
  }

  // Deploy the BuyerRegistry contract
  const buyerRegistry = m.contract("BuyerRegistry" /*, constructorArgs */);

  return { supplierRegistry, buyerRegistry };
});