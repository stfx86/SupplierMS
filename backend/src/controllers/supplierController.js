const fs = require("fs");
const verifySignature = require("../utils/verifySignature");

exports.registerSupplier = (req, res) => {
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
    } = req.body;

    const logoFile = req.files?.logoFile?.[0];
    const bioFile = req.files?.bioFile?.[0];


    ////


    if (!req.files) {
      return res.status(400).json({ error: "No files uploaded." });
    }
  
   
  
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
    };

    const signer = verifySignature(structuredData, signature);

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


