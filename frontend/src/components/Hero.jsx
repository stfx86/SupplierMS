
import { Button } from './ui/Button'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-brand-dark text-white py-24">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Digital Goods Emporium
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300">
            Securely buy and sell digital products with blockchain-powered transactions
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-brand-blue hover:bg-blue-600 text-white text-lg py-6 px-8">
              <Link to="/marketplace">Browse Marketplace</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 text-lg py-6 px-8">
              <Link to="/suppliers/register">Become a Supplier</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
