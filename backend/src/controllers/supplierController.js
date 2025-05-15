const fs = require("fs");
const verifySignature = require("../utils/verifySignature");
const { getFirstSigner  } = require('../config/contracts');
const { supplierExists ,registerSupplier } = require("./../utils/contractUtils");
const {uploadSupplierProfile ,uploadJSONToIPFS, uploadFileToIPFS} = require("./../utils/ipfs");
require('dotenv').config();


exports.registerSupplier = async  (req, res) => {
  try {
    const {
      name,
      email,
      serviceType,
      companyName,
      country,
      categories,
      website,
      socials,
      
      signature,
      walletAddress,
      timestamp, 
    } = req.body;
    console.log("recived signatur  : ",signature);

    const logoFile = req.files?.logoFile?.[0];
    const bioFile = req.files?.bioFile?.[0];


    const now = Date.now();
const maxDelay = 5 * 60 * 1000; // 5 minutes

if (now - timestamp > maxDelay) {
  return res.status(400).json({ error: "Signature expired." });
}




    ////


    // if (!req.files) {
    //   return res.status(400).json({ error: "No files uploaded." });
    // }
  
   
  
    // Check if files exist
    // if (!logoFile || !bioFile) {
    //   return res.status(400).json({ error: "Missing required files." });
    // }
  
    // Access file paths safely
    // const logoPath = logoFile[0].path; // Array because of `maxCount: 1`
    // const bioPath = bioFile[0].path;
  
    // console.log("Logo Path:", logoPath);
    // console.log("Bio Path:", bioPath);
    ////

    // console.log(req.files);
    // console.log(req.body);



    const logoBase64 = logoFile ?(fs.readFileSync(logoFile.path, "base64")):(null);
    const bioBase64 = logoFile ? (fs.readFileSync(bioFile.path, "base64")):(null);


    const structuredData = {
      name,
      email,
      serviceType,
      companyName,
      country,
      categories,
      website,
      socials: JSON.parse(socials),
      logoFile: logoBase64,
      bioFile: bioBase64,
      walletAddress: walletAddress.toLowerCase(),
      timestamp, 
    };

    const signer = verifySignature(structuredData, signature);
console.log("(signer.toLowerCase(): ",signer.toLowerCase() );
console.log("walletAddress.toLowerCase(): ",walletAddress.toLowerCase());


    

    if (signer.toLowerCase() !== walletAddress.toLowerCase()) { 

      return res.status(401).json({ error: "Signature does not match wallet address." });
    }

    // console.log(" supplierCotrolloer :", supplierRegistryData.abi,supplierRegistryData.address);

    //getting hardhat first singer , 
    console.log("hardhat firstSinger: ",(await getFirstSigner()).address);

    // console.log("supplier exist :",await supplierExists("0x0000000000000000000000000000000000000098"));

    const exists = await supplierExists(signer.toLowerCase());
    console.log("exists: ",exists);
    if (exists) {

      return   res.status(409).json({
        success: false,
        error: "Supplier already exists.",


      });

    }


    ///registering the Supplier to the block chain

   try  {



//
var fsp = require('fs/promises');

const rawData = await fsp.readFile(
  bioFile.path, // Added .json
  'utf8'
);

const jsonData = JSON.parse(rawData);
console.log(jsonData);
const bioCID = await  uploadJSONToIPFS(jsonData);

console.log("bioCID:", bioCID);

//

//
const logoCID =await uploadFileToIPFS(logoFile.path);
console.log("logoCID:", logoCID);
//






     console.log(socials);
     const platforms = JSON.parse(socials).map(s => s.platform);
     const links = JSON.parse(socials).map(s => s.url);
     console.log("Platforms:", platforms);
     console.log("Links:", links);



     const tx = await registerSupplier(

       {


          name:name,
          email:email,
          serviceType:serviceType|| "",
          companyName:companyName|| "",
          country:country|| "",
          categories:categories|| "",
          website:website|| "",
          platforms:platforms||[],
          links:links||[],
          logoCID: logoCID || "",
          profileCID: bioCID ||"",
          address: walletAddress.toLowerCase(),

      }




    );

     console.log("registerSupplie TX : ",tx);






   } catch(e){

   console.error(e);
   }



    













    res.json({
      success: true,
      signer,
      message: "Signature verified and supplier registered.",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to verify signature." });
  }
};


