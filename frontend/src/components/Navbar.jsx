import { Link } from "react-router-dom";
import ConnectWalletButton from './ConnectWalletButton'

function Navbar() {

    return (
///  backdrop-blur-md 
        <nav className=" backdrop-blur-sm   bg-marketplace-bg-dark border-b border-gray-800  px-6 sticky top-0 z-50 ">
            <div className="flex justify-between items-center mx-auto max-w-7xl">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">DIGITAL NEXUS </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="text-white hover:text-blue-400 px-3 py-2 transition">
                        Home
                    </Link>
                    <Link to="/browse-suppliers" className="text-white hover:text-blue-400 px-3 py-2 transition">
                        Browse Suppliers
                    </Link>
                    <Link to="/buyer-transactions" className="text-white hover:text-blue-400 px-3 py-2 transition">
                        My Transactions
                    </Link>
                    <Link to="/supplier-dashboard" className="text-white hover:text-blue-400 px-3 py-2 transition">
                        Supplier Dashboard
                    </Link>
                    <Link to="/register" className="text-white hover:text-blue-400 px-3 py-2 transition">
                        Register as Supplier
                    </Link>
                </div>

                {/* Wallet Connection */}
                <div className="hidden md:block">
                    <ConnectWalletButton />
                </div>


            </div>

        </nav>



    )

    c
}
export default Navbar;