import React from 'react';
import { Wallet as WalletIcon } from 'lucide-react';
import { useWallet } from '../contextes/WalletContext.jsx';  // Use the custom hook to access the context
import { ethers, ZeroAddress } from 'ethers';

export default function ConnectWalletButton() {



  const {
    isConnected,
    walletAddress,
    message,
    showPassphraseInput,
    passphrase,
    isRegistered,
    connectWallet,
    disconnectWallet,
    checkRegistration,
    handlePassphraseSubmit,
    signer, // Access signer from context
    setMessage,
    setPassphrase,
    setShowPassphraseInput,
    setIsRegistered,
    contractAddress




  } = useWallet();  // Destructure everything you need from the context

  const truncateAddress = (addr) =>
  addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : '';

  return (
    <div className="p-4 relative flex flex-col items-center">
    {message && (
      <div className="absolute top-16 w-fit bg-white border rounded shadow-md px-4 py-2 text-sm z-20 animate-fade">
      <div className={`${
        message.type === 'success' ? 'text-green-700' : 'text-red-700'
      }`}>
      {message.text}
      </div>
      </div>
    )}

    {isConnected ? (
      <div className="flex flex-col gap-2 items-center">
      <div className="flex items-center gap-2">
      <span className="text-sm text-green-600">
      {truncateAddress(walletAddress)}
      </span>
      <button
      onClick={disconnectWallet}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
      >
      Disconnect
      </button>
      </div>

      {showPassphraseInput && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
        <div className="p-4 border rounded bg-gray-100 w-96">
        <h2 className="text-md mb-2 font-semibold">
        {isRegistered ? 'Update Your Public Key' : 'Enter Passphrase to Register'}
        </h2>
        <input
        type="password"
        className="w-full p-2 mb-2 border rounded text-sm"
        placeholder="Your secure passphrase"
        value={passphrase}
        onChange={(e) => setPassphrase(e.target.value)}
        />
        <button
        onClick={handlePassphraseSubmit}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm w-full"
        >
        Submit
        </button>
        </div>
        </div>
      )}
      </div>
    ) : (
      <button
      onClick={connectWallet}
      className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm"
      >
      <WalletIcon className="mr-2 h-4 w-4" />
      Connect Wallet
      </button>
    )}
    </div>
  );
}

