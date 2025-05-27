
// import { useState } from 'react';
// // import Layout from '@/components/layout/Layout';
// import { Button } from './../components/ui/Button';
// import { Input } from './../components/ui/input';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./../components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './../components/ui/select';
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { mockDigitalItems } from './../components/data/mockData';

// const Marketplace = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [sortOption, setSortOption] = useState("newest");
  
//   // Get unique categories
//   const categories = Array.from(new Set(mockDigitalItems.map(item => item.category)));
  
//   // Sort and filter items
//   const filteredItems = mockDigitalItems
//     .filter(item => {
//       const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
//       const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
//       return matchesSearch && matchesCategory;
//     })
//     .sort((a, b) => {
//       if (sortOption === "newest") {
//         return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//       } else if (sortOption === "oldest")  {
//         return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
//       } else if (sortOption === "price-asc") {
//         return a.price - b.price;
//       } else if (sortOption === "price-desc") {
//         return b.price - a.price;
//       }
//       return 0;
//     });
  
//   const handleBuyNow = (itemId) => {
//     // TODO: Implement smart contract interaction
//     console.log(`Buying item ${itemId}`);
//     alert("Smart contract functionality will be implemented here. This would initiate the purchase process.");
//   };
  
//   return (
//     <>
//       <section className="py-12 mx-25">
//         <div className="container-custom">
//           <div className="text-center mb-10">
//             <h1 className="text-4xl font-bold mb-4">Digital Goods Marketplace</h1>
//             <p className="text-gray-600 max-w-3xl mx-auto">
//               Browse our collection of high-quality digital items. All purchases are secured through blockchain transactions.
//             </p>
//           </div>
          
//           {/* Featured Items Section */}
//           <div className="mb-12">
//             <h2 className="text-2xl font-bold mb-6">Featured Items</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {mockDigitalItems
//                 .filter(item => item.featured)
//                 .map(item => (
//                   <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
//                     <div className="aspect-video w-full overflow-hidden">
//                       <img 
//                         // src={item.previewImage} 
                        
//                         src="https://gateway.pinata.cloud/ipfs/QmdNhfTjibecxDnXPrepXpiVna9tnpKPj3B8mFzKg9xESF" 

//                         alt={item.title} 
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <CardHeader>
//                       <div className="flex justify-between items-center">
//                         <CardTitle className="text-xl">{item.title}</CardTitle>
//                         <div className="bg-brand-blue text-white px-3 py-1 rounded-full text-sm font-medium">
//                           {item.price} ETH
//                         </div>
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <p className="text-gray-600 line-clamp-2">{item.description}</p>
//                       <p className="text-sm text-gray-500 mt-2">Supplier: {item.supplier.name}</p>
//                       <div className="flex flex-wrap gap-1 mt-2">
//                         {item.tags.map(tag => (
//                           <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </CardContent>
//                     <CardFooter>
//                       <Button 
//                         className="w-full bg-brand-blue hover:bg-blue-600 text-white"
//                         onClick={() => handleBuyNow(item.id)}
//                       >
//                         Buy Now
//                       </Button>
//                     </CardFooter>
//                   </Card>
//                 ))}
//             </div>
//           </div>
          
//           {/* Browse All Items */}
//           <div>
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold">All Digital Items</h2>
//             </div>
            
//             {/* Filters */}
//             <div className="bg-gray-50 p-4 rounded-lg mb-8">
//               <div className="flex flex-col md:flex-row gap-4 mb-4">
//                 <div className="flex-grow">
//                   <Input
//                     placeholder="Search items..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full"
//                   />
//                 </div>
//                 <div className="w-full md:w-48">
//                   <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Filter by category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Categories</SelectItem>
//                       {categories.map((category) => (
//                         <SelectItem key={category} value={category}>
//                           {category}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="w-full md:w-48">
//                   <Select value={sortOption} onValueChange={setSortOption}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Sort by" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="newest">Newest First</SelectItem>
//                       <SelectItem value="oldest">Oldest First</SelectItem>
//                       <SelectItem value="price-asc">Price: Low to High</SelectItem>
//                       <SelectItem value="price-desc">Price: High to Low</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>
            
//             {/* Items Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredItems.length > 0 ? (
//                 filteredItems.map(item => (
//                   <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
//                     <div className="aspect-video w-full overflow-hidden">
//                       <img 
//                         src={item.previewImage} 
//                         alt={item.title} 
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <CardHeader>
//                       <div className="flex justify-between items-center">
//                         <CardTitle className="text-xl">{item.title}</CardTitle>
//                         <div className="bg-brand-blue text-white px-3 py-1 rounded-full text-sm font-medium">
//                           {item.price} ETH
//                         </div>
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <p className="text-gray-600 line-clamp-2">{item.description}</p>
//                       <p className="text-sm text-gray-500 mt-2">Supplier: {item.supplier.name}</p>
//                       <div className="flex flex-wrap gap-1 mt-2">
//                         {item.tags.map(tag => (
//                           <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </CardContent>
//                     <CardFooter>
//                       <Button 
//                         className="w-full bg-brand-blue hover:bg-blue-600 text-white"
//                         onClick={() => handleBuyNow(item.id)}
//                       >
//                         Buy Now
//                       </Button>
//                     </CardFooter>
//                   </Card>
//                 ))
//               ) : (
//                 <div className="col-span-3 text-center py-12">
//                   <p className="text-gray-500">No items found matching your criteria.</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Marketplace;



















import { useState } from 'react';
// import Layout from '@/components/layout/Layout';
import { Button } from './../components/ui/Button';
import { Input } from './../components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './../components/ui/select';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockDigitalItems } from './../components/data/mockData';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  
  // Get unique categories
  const categories = Array.from(new Set(mockDigitalItems.map(item => item.category)));
  
  // Sort and filter items
  const filteredItems = mockDigitalItems
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortOption === "oldest")  {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortOption === "price-asc") {
        return a.price - b.price;
      } else if (sortOption === "price-desc") {
        return b.price - a.price;
      }
      return 0;
    });
  
  const handleBuyNow = (itemId) => {
    // TODO: Implement smart contract interaction
    console.log(`Buying item ${itemId}`);
    alert("Smart contract functionality will be implemented here. This would initiate the purchase process.");
  };
  
  return (
    <>
      <section  className="py-12 mx-25">
        <div    className="container-custom">
          <div  className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Document Marketplace</h1>
            <p  className="text-gray-600 max-w-3xl mx-auto">
              Browse our collection of high-quality digital documents. All purchases are secured through blockchain transactions.
            </p>
          </div>
          
          {/* Featured Items Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockDigitalItems
                .filter(item => item.featured)
                .map(item => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src="https://gateway.pinata.cloud/ipfs/QmdNhfTjibecxDnXPrepXpiVna9tnpKPj3B8mFzKg9xESF" 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <div className="bg-brand-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                          {item.price} ETH
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 line-clamp-2">{item.description}</p>
                      <p className="text-sm text-gray-500 mt-2">Supplier: {item.supplier.name}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-brand-blue hover:bg-blue-600 text-white"
                        onClick={() => handleBuyNow(item.id)}
                      >
                        Buy Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
          
          {/* Browse All Items */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">All Documents</h2>
            </div>
            
            {/* Filters */}
            <div className="bg-gray-50 p-4 rounded-lg mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-grow">
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-48">
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={item.previewImage} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <div className="bg-brand-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                          {item.price} ETH
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 line-clamp-2">{item.description}</p>
                      <p className="text-sm text-gray-500 mt-2">Supplier: {item.supplier.name}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-brand-blue hover:bg-blue-600 text-white"
                        onClick={() => handleBuyNow(item.id)}
                      >
                        Buy Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500">No documents found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Marketplace;
