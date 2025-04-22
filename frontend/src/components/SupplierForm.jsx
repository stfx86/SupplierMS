import { useState } from 'react';
import '../styles/SupplierForm.css'

import { useWallet } from '../contexts/WalletContext';
import { ethers } from 'ethers';
import { abi as SupplierRegistryABI  } from '../abis/SupplierRegistry.json';

const SupplierRegistryAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; //

function SupplierForm() {
  const { signer } = useWallet();


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: ''
  });

  const handleChange = (e) => { 
    setFormData(prev => 
      ({...prev,
        [e.target.name]: e.target.value
      })
  
  );};


// storing infos to  SupplierRegistry smartc
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!signer) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const contract = new ethers.Contract(SupplierRegistryAddress, SupplierRegistryABI, signer);
      const tx = await contract.registerSupplier(formData.name, formData.email,formData.serviceType);
      await tx.wait(); // wait for confirmation

      alert("Supplier registered successfully!");
      console.log('Transaction Hash:', tx.hash);
    } catch (err) {
      console.error("Error registering supplier:", err);
      alert("Failed to register supplier.");
    }





    
    // You would handle form submission here, maybe send to a smart contract or API
    console.log('Supplier Registered:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="supplier-form"  >
      <h2>Register as a Supplier</h2>

      <div  className="form-group" >
        <label htmlFor="name" >Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
     
          required
        />
      </div>

      <div  className="form-group" >
        <label htmlFor="email" >Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div  className="form-group" > 
        <label htmlFor="serviceType" >Service Type</label>
        <input
          type="text"
          name="serviceType"
          id="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
       
      >
        Register
      </button>
    </form>
  );
}

export default SupplierForm;

