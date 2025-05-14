
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

const SmartContractInfo = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Secured by Blockchain</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our platform uses smart contracts to ensure secure transactions between buyers and suppliers.
            All digital goods are delivered through a secure encryption process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-24">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Transaction Creation</CardTitle>
              <CardDescription>Step 1: Buyer creates transaction</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                When a buyer purchases a digital item, a new secure transaction is created on the blockchain.
                The payment is locked in the smart contract until delivery is confirmed.
              </p>
              <Separator className="my-4" />
              <div className="text-xs text-gray-500">
                <code className="block bg-gray-100 p-2 rounded">
                  function createTransaction(address payable _supplier, uint _itemId)
                </code>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Encrypted Delivery</CardTitle>
              <CardDescription>Step 2: Supplier delivers encrypted asset</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                The supplier delivers the digital asset encrypted with the buyer's public key.
                This ensures that only the buyer can access the content once payment is released.
              </p>
              <Separator className="my-4" />
              <div className="text-xs text-gray-500">
                <code className="block bg-gray-100 p-2 rounded">
                  function setEncryptedCID(uint transactionId, bytes memory _encryptedCID)
                </code>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Payment Release</CardTitle>
              <CardDescription>Step 3: Buyer confirms and payment is released</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                After confirming receipt, the smart contract releases payment to the supplier
                and the decryption key to the buyer, completing the secure transaction.
              </p>
              <Separator className="my-4" />
              <div className="text-xs text-gray-500">
                <code className="block bg-gray-100 p-2 rounded">
                  function releaseKeyAndPayment(uint transactionId, bytes memory _encryptedKey)
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SmartContractInfo;