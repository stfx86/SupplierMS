// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import SupplierForm from './components/SupplierForm';
import ConnectWallet from './components/ConnectWallet';
import Navbar from "./components/Navbar";
import Navbar2 from './components/Navbar2';
import { useWallet } from './contexts/WalletContext';

import { useState ,React } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import  About  from './components/About';

function App() {
 
  // const [signer, setSigner] = useState(null);
  const { signer } = useWallet();


  return (
    <Router>

      <Navbar className="navbar" />
      <div >
      <ConnectWallet />
      {signer && <p>You can now register as a supplier ✅</p>}
    </div>

      <main >
        <Routes>
          <Route path="/" element={<h2>Home Page</h2>} />
          <Route path="/suppliers" element={<h2>Suppliers Page</h2>} />
          <Route path="/about" element={<About/>} />
          <Route path="/RegisterSupplier" element={<SupplierForm/>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
//metamask password
//       wertfghsdfg345678iop 
