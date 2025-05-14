const {registerSupplier } = require("./../src/utils/contractUtils");




  const s =
    {
      address: "0x0000000000000000000000000000000000000098",
      name: "ssss",
      companyName: "ssss.", // Added field
      country: "ss",                     // Added field
      categories: "sssssssg", // Added field
      serviceType: "ssscs",
      email: "alssssscs.com",
      website: "httpsssss.com",
      logoCID: "Qmssssssssssss",
      profileCID: "QmProfileAlpha",
      platforms: ["Twitter", "LinkedIn"],
      links: ["https://twitter.com/alpha", "https://linkedin.com/company/alpha"],
    };
    






async function m() {
    console.log(s);
const tx= await registerSupplier(



  s


  

);
// console.log(tx);

    
}
m();