import { useState } from 'react';
import '../styles/SupplierForm.css'

function SupplierForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: ''
  });

  const handleChange = (e) => { setFormData(prev => ({...prev,[e.target.name]: e.target.value})); };

  const handleSubmit = (e) => {
    e.preventDefault();
    
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

