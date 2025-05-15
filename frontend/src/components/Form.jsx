import { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from '../contextes/WalletContext.jsx'; 
import toast from "react-hot-toast";

export default function SupplierForm() {
  
  const [formData, setFormData] = useState({
    name: "",
    serviceType: "",
    email: "",
    companyName: "",
    country: "",
    categories: "",
    website: "",
    logoFile: null,
    bioFile: null,
    socials: [],
  });

  const [socialInput, setSocialInput] = useState({ platform: "Twitter", url: "" });
  const {signer ,  isConnected, walletAddress }= useWallet(); 

  const socialOptions = ["Twitter", "LinkedIn", "GitHub", "Discord", "Telegram"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSocial = () => {
    if (socialInput.url.trim()) {
      setFormData((prev) => ({
        ...prev,
        socials: [...prev.socials, { ...socialInput }],
      }));
      setSocialInput({ platform: "Twitter", url: "" });
    }
  };
/////////////


// const fileToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// };


const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      // Strip the prefix: "data:*;base64,"
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};





/////////////

  // handline submit 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isConnected) {
      toast.error(" ! Please connect your wallet first.");
      
      return;
    }


    
    




  // Prepare signature
  const logoBase64 = formData.logoFile ? await fileToBase64(formData.logoFile) : null;
const bioBase64 = formData.bioFile ? await fileToBase64(formData.bioFile) : null;

const timestamp = String(Date.now());   
  const payloadToSign = {
    ...formData,
    logoFile: logoBase64,
    bioFile: bioBase64,
    walletAddress: walletAddress.toLowerCase(),
    timestamp,
  };
  
  // console.log("111=",walletAddress.toLowerCase());



function canonicalize(obj) {
  return JSON.stringify(
    Object.keys(obj)
      .sort()
      .reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {})
  );
}



    const message = canonicalize(payloadToSign);
    console.log("F_canonicalize(data);",message);
    const messageHash = ethers.keccak256(ethers.toUtf8Bytes(message));
    console.log("messageHash: ",messageHash);
    
    // Sign message (will prompt MetaMask)
    const signature = await signer.signMessage(messageHash);
    console.log("signature: ",signature);
   





  // Build FormData
  const form = new FormData();
  form.append("signature", signature);
  form.append("name", formData.name);
  form.append("email", formData.email);
  form.append("serviceType", formData.serviceType);
  form.append("companyName", formData.companyName);
  form.append("country", formData.country);
  form.append("categories", formData.categories);
  form.append("website", formData.website);
  form.append("logoFile", formData.logoFile);
  form.append("bioFile", formData.bioFile);
  form.append("socials", JSON.stringify(formData.socials)); // serialize array
  form.append("walletAddress", walletAddress.toLowerCase());
  form.append("timestamp", timestamp);


try {
  console.log("beore Fetch");
    const response = await fetch("http://localhost:3000/api/suppliers/register", {
      method: "POST",
      body: form,
    });
    console.log("response",response);


    const result = await response.json();
console.log("response.status :",response.status );
    if (response.ok) {
      toast.success("Signature Verified! Supplier Request Submitted for Processing");
      console.log("Submitted successfully:", result);
    } else {
      if (response.status === 409) {
        toast.success("Supplier already exists.");
      } else {
        toast.error(result?.error || "Failed to submit supplier registration.");
      }
      console.error("Error response:", result);
    }
  } catch (err) {
    console.error("Submission error:", err);
    toast.error("Unexpected error occurred during submission.");
  }

  };

  return (
    <>
<div className="w-full bg-[#0a0a23] py-16 px-6 text-center text-white">
  <h1 className="text-5xl font-extrabold mb-6">
    Register as a Supplier
  </h1>
  <p className="text-xl max-w-3xl mx-auto text-gray-300">
    Join our decentralized marketplace and share your digital services with a global audience. By registering, you'll gain access to a secure environment powered by blockchain for managing your profile, transactions, and reputation.
  </p>
  <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-400">
    Fill out the form below with accurate details including your service categories, portfolio links, and optional digital credentials. All information is stored securely on-chain.
  </p>
  <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-400">
    Make sure your wallet is connected before submitting the form.
  </p>
</div>


<br/><br/><br/><br/>
<form
  onSubmit={handleSubmit}
  className="max-w-4xl mx-auto p-6 rounded-lg shadow-sm space-y-6 bg-white"
>
  <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
    
  </h2>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Supplier/Business Name</label>
    <input
      type="text"
      name="name"
      placeholder="John Doe"
      value={formData.name}
      onChange={handleChange}
      className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
    <input
      type="text"
      name="serviceType"
      placeholder="e.g., Logistics, IT Consulting"
      value={formData.serviceType}
      onChange={handleChange}
      className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
    <input
      type="email"
      name="email"
      placeholder="you@example.com"
      value={formData.email}
      onChange={handleChange}
      className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
    <input
      type="text"
      name="companyName"
      placeholder="Your Company Inc."
      value={formData.companyName}
      onChange={handleChange}
      className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
    <input
      type="text"
      name="country"
      placeholder="e.g., France"
      value={formData.country}
      onChange={handleChange}
      className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
    <input
      type="text"
      name="categories"
      placeholder="e.g., shipping, software, cloud"
      value={formData.categories}
      onChange={handleChange}
      className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
    />
    <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
    <input
      type="url"
      name="website"
      placeholder="https://yourcompany.com"
      value={formData.website}
      onChange={handleChange}
      className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Links</label>
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <select
        value={socialInput.platform}
        onChange={(e) => setSocialInput({ ...socialInput, platform: e.target.value })}
        className="bg-white px-4 py-2 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {socialOptions.map((platform) => (
          <option key={platform}>{platform}</option>
        ))}
      </select>
      <input
        type="url"
        placeholder="https://yourprofile.com"
        value={socialInput.url}
        onChange={(e) => setSocialInput({ ...socialInput, url: e.target.value })}
        className="flex-1 bg-white px-4 py-2 rounded-md border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={handleAddSocial}
        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md font-semibold transition duration-300 text-white"
      >
        Add
      </button>
    </div>
    <ul className="list-disc ml-6 text-sm text-gray-600 space-y-1">
      {formData.socials.map((social, idx) => (
        <li key={idx}>
          <strong>{social.platform}:</strong> {social.url}
        </li>
      ))}
    </ul>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Logo (Image)</label>
    <input
      type="file"
      name="logoFile"
      accept="image/*"
      onChange={handleChange}
      className="w-full bg-white text-gray-900 px-4 py-2 rounded-md border border-gray-300"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Profile Bio (JSON)</label>
    <input
      type="file"
      name="bioFile"
      accept=".json"
      onChange={handleChange}
      className="w-full bg-white text-gray-900 px-4 py-2 rounded-md border border-gray-300"
    />
  </div>

  <div className="pt-6">
    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-md transition duration-300"
    >
      Sign & Register
    </button>
  </div>
</form>

          </>
  );
}
