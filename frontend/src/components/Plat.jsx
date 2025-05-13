
import { 
    ShieldCheck, 
    TrendingUp, 
    Zap, 
    FileText 
  } from "lucide-react";
  
  const features = [
    {
      icon: <ShieldCheck className="h-10 w-10 text-brand-blue" />,
      title: "Secure Transactions",
      description: "All transactions are secured by blockchain technology, ensuring safety and transparency."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-brand-blue" />,
      title: "Verified Suppliers",
      description: "Every supplier on our platform is verified and rated based on transaction history."
    },
    {
      icon: <Zap className="h-10 w-10 text-brand-blue" />,
      title: "Instant Delivery",
      description: "Digital goods are delivered instantly after the blockchain transaction is completed."
    },
    {
      icon: <FileText className="h-10 w-10 text-brand-blue" />,
      title: "Smart Contracts",
      description: "Transparent terms of service defined in smart contracts for each transaction."
    }
  ];
  
  const PlatformOverview = () => {
    return (
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Overview</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our decentralized marketplace streamlines how digital goods are bought and sold,
              ensuring security, trust, and efficiency at every step.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-gray-100 rounded-lg p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Platform Statistics</h3>
              <p className="text-gray-600">Our growing marketplace ecosystem</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold text-brand-blue">2,500+</p>
                <p className="text-gray-600">Digital Items</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-brand-blue">350+</p>
                <p className="text-gray-600">Verified Suppliers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-brand-blue">12,000+</p>
                <p className="text-gray-600">Completed Transactions</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-brand-blue">99%</p>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default PlatformOverview;
  