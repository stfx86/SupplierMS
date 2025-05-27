
import { useState } from "react";
import { Button } from './../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from  "./../components/ui/card";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./../components/ui/tabs";
import { Badge } from "./../components/ui/badge";
// import Layout from "@/components/Layout";
import { FileText, DollarSign, Download, Eye, Edit, Trash2 } from "lucide-react";

const Dashboard = () => {

  const [activeTab, setActiveTab] = useState("overview");

  const stats = {

    totalEarnings: "2.45",
    totalSales: 47,
    totalDocuments: 8,
    totalViews: 3420,

  };

  const myDocuments = [
    {
      id: 1,
      title: "Complete Web3 Development Guide",
      price: "0.05",
      sales: 24,
      earnings: "1.08",
      views: 1200,
      status: "active",
    },
    {
      id: 2,
      title: "Smart Contract Security Best Practices",
      price: "0.03",
      sales: 18,
      earnings: "0.486",
      views: 850,
      status: "active",
    },
    {
      id: 3,
      title: "DeFi Protocol Analysis Framework",
      price: "0.08",
      sales: 5,
      earnings: "0.36",
      views: 320,
      status: "active",
    },
  ];

  const recentSales = [
    {
      id: 1,
      document: "Complete Web3 Development Guide",
      buyer: "0x1234...5678",
      amount: "0.05",
      date: "2024-03-15",
    },
    {
      id: 2,
      document: "Smart Contract Security Best Practices",
      buyer: "0x8765...4321",
      amount: "0.03",
      date: "2024-03-14",
    },
    {
      id: 3,
      document: "Complete Web3 Development Guide",
      buyer: "0xabcd...efgh",
      amount: "0.05",
      date: "2024-03-14",
    },
  ];

  const purchasedDocuments = [
    {
      id: 1,
      title: "Advanced Solidity Patterns",
      author: "Jane Doe",
      price: "0.04",
      purchaseDate: "2024-03-10",
      downloaded: true,
    },
    {
      id: 2,
      title: "NFT Marketplace Development",
      author: "John Smith",
      price: "0.06",
      purchaseDate: "2024-03-08",
      downloaded: false,
    },
  ];

  return (
    <>
      <div className=" mx-auto px-4 sm:px-6 lg:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-lg text-gray-600">Manage your documents and track your performance</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">My Documents</TabsTrigger>
            <TabsTrigger value="sales">Sales History</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.totalEarnings} ETH</div>
                  <p className="text-xs text-muted-foreground">~$6,127.50 USD</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalSales}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Documents</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalDocuments}</div>
                  <p className="text-xs text-muted-foreground">3 active listings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+8% from last week</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>Your latest document sales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSales.map((sale) => (
                      <div key={sale.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{sale.document}</p>
                          <p className="text-xs text-gray-600">Sold to {sale.buyer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">{sale.amount} ETH</p>
                          <p className="text-xs text-gray-600">{sale.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Documents</CardTitle>
                  <CardDescription>Your best-selling documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myDocuments.slice(0, 3).map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{doc.title}</p>
                          <p className="text-xs text-gray-600">{doc.sales} sales • {doc.views} views</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-blue-600">{doc.earnings} ETH</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Documents</h2>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Upload New Document
              </Button>
            </div>

            <div className="grid gap-6">
              {myDocuments.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{doc.title}</h3>
                          <Badge variant="outline" className="capitalize">
                            {doc.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Price:</span> {doc.price} ETH
                          </div>
                          <div>
                            <span className="font-medium">Sales:</span> {doc.sales}
                          </div>
                          <div>
                            <span className="font-medium">Earnings:</span> {doc.earnings} ETH
                          </div>
                          <div>
                            <span className="font-medium">Views:</span> {doc.views}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <h2 className="text-xl font-semibold">Sales History</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>All Sales</CardTitle>
                <CardDescription>Complete history of your document sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{sale.document}</h4>
                        <p className="text-sm text-gray-600">Buyer: {sale.buyer}</p>
                        <p className="text-sm text-gray-600">Date: {sale.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{sale.amount} ETH</p>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="purchases" className="space-y-6">
            <h2 className="text-xl font-semibold">My Purchases</h2>
            
            <div className="grid gap-6">
              {purchasedDocuments.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{doc.title}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><span className="font-medium">Author:</span> {doc.author}</p>
                          <p><span className="font-medium">Purchased:</span> {doc.purchaseDate}</p>
                          <p><span className="font-medium">Price:</span> {doc.price} ETH</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.downloaded ? (
                          <Badge variant="secondary">Downloaded</Badge>
                        ) : (
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Dashboard;
