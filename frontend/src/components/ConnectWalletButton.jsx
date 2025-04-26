import React, { useState } from 'react';
import { Wallet } from 'lucide-react';

export default function ConnectWalletButton(){
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [message, setMessage] = useState(null);

  const connectWallet = async () => {
    try {
      // Simulate wallet connection
      setIsConnected(true);
      setWalletAddress('0x123...abc');
      setMessage({ type: 'success', text: 'Successfully connected to wallet.' });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setMessage({ type: 'error', text: 'Could not connect to wallet.' });
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setMessage({ type: 'success', text: 'Wallet has been disconnected.' });
  };

  return (
    <div className="p-4">
      {message && (
        <div
          className={`mb-4 p-2 rounded text-sm ${
            message.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {isConnected ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-green-600">{walletAddress}</span>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </button>
      )}
    </div>
  );
};
