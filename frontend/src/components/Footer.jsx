
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">DigitalGoods</h3>
            <p className="text-sm text-gray-300">
              A decentralized marketplace for digital goods with secure blockchain transactions.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2">
              <li><Link to="/marketplace" className="text-sm text-gray-300 hover:text-white">Browse Items</Link></li>
              <li><Link to="/marketplace/popular" className="text-sm text-gray-300 hover:text-white">Popular Items</Link></li>
              <li><Link to="/marketplace/new" className="text-sm text-gray-300 hover:text-white">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Suppliers</h4>
            <ul className="space-y-2">
              <li><Link to="/suppliers" className="text-sm text-gray-300 hover:text-white">Top Suppliers</Link></li>
              <li><Link to="/suppliers/register" className="text-sm text-gray-300 hover:text-white">Become a Supplier</Link></li>
              <li><Link to="/suppliers/dashboard" className="text-sm text-gray-300 hover:text-white">Supplier Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-sm text-gray-300 hover:text-white">Help Center</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-300 hover:text-white">Contact Us</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-300 hover:text-white">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} DigitalGoods Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
