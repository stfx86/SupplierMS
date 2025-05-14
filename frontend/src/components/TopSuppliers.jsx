import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

// Mock data for suppliers
const mockSuppliers = [
  {
    id: 1,
    name: "Digital Arts Co.",
    transactions: 128,
    rating: 4.9,
    category: "Graphics & Design"
  },
  {
    id: 2,
    name: "CodeMasters",
    transactions: 95,
    rating: 4.8,
    category: "Programming & Tech"
  },
  {
    id: 3,
    name: "AudioWave",
    transactions: 87,
    rating: 4.7,
    category: "Music & Audio"
  },
  {
    id: 4,
    name: "VideoExpress",
    transactions: 76,
    rating: 4.6,
    category: "Video & Animation"
  }
];

const TopSuppliers = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Suppliers</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our marketplace features the most trusted suppliers with proven track records.
            Ranked by number of successful transactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{supplier.name}</CardTitle>
                <CardDescription>{supplier.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Transactions</p>
                    <p className="font-bold text-lg">{supplier.transactions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <p className="font-bold text-lg">{supplier.rating}/5.0</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <a href={`/suppliers/${supplier.id}`} className="text-blue-600 hover:underline text-sm">
                  View Supplier
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white">
            <a href="/suppliers">View All Suppliers</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopSuppliers;