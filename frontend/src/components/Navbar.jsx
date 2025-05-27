// import { Link } from "react-router-dom";
// import ConnectWalletButton from './ConnectWalletButton'

// function Navbar() {

//     return (
// ///  backdrop-blur-md 
//         <nav className=" backdrop-blur-sm   bg-marketplace-bg-dark border-b border-gray-800  px-6 sticky top-0 z-50 ">
//             <div className="flex justify-between items-center mx-auto max-w-7xl">
//                 {/* Logo */}
//                 <Link to="/" className="flex items-center">
//                     <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">DIGITAL NEXUS </span>
//                 </Link>

//                 {/* Desktop Navigation */}
//                 <div className="hidden md:flex items-center space-x-6">
//                     <Link to="/" className="text-white hover:text-blue-400 px-3 py-2 transition">
//                         Home
//                     </Link>
//                     <Link to="/browse-suppliers" className="text-white hover:text-blue-400 px-3 py-2 transition">
//                         Browse Suppliers
//                     </Link>
//                     <Link to="/buyer-transactions" className="text-white hover:text-blue-400 px-3 py-2 transition">
//                         My Transactions
//                     </Link>
//                     <Link to="/supplier-dashboard" className="text-white hover:text-blue-400 px-3 py-2 transition">
//                         Supplier Dashboard
//                     </Link>
//                     <Link to="/register" className="text-white hover:text-blue-400 px-3 py-2 transition">
//                         Register as Supplier
//                     </Link>
//                 </div>

//                 {/* Wallet Connection */}
//                 <div className="hidden md:block">
//                     <ConnectWalletButton />
//                 </div>


//             </div>

//         </nav>



//     )

// }
// export default Navbar;




















import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ConnectWalletButton from './ConnectWalletButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-brand-navy text-white shadow-md backdrop-blur-sm   top-0 z-50">
      <div className="container-custom py-4 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              DIGITAL NEXUS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-400 transition px-3 py-2">
              Home
            </Link>
            <Link to="/marketplace" className="hover:text-blue-400 transition px-3 py-2">
              Marketplace
            </Link>
            <Link to="/buyer-transactions" className="hover:text-blue-400 transition px-3 py-2">
              My Transactions
            </Link>
            <Link to="/dashboard" className="hover:text-blue-400 transition px-3 py-2">
              Dashboard
            </Link>
            <Link to="/register" className="hover:text-blue-400 transition px-3 py-2">
              Register as Supplier
            </Link>
          </div>

          {/* Wallet Button */}
          <div className=" md:block">
            <ConnectWalletButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link to="/" className="block hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link to="/browse-suppliers" className="block hover:text-blue-400 transition-colors">
              Browse Suppliers
            </Link>
            <Link to="/buyer-transactions" className="block hover:text-blue-400 transition-colors">
              My Transactions
            </Link>
            <Link to="/supplier-dashboard" className="block hover:text-blue-400 transition-colors">
              Supplier Dashboard
            </Link>
            <Link to="/register" className="block hover:text-blue-400 transition-colors">
              Register as Supplier
            </Link>
            <div className="pt-2">
              <ConnectWalletButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;







