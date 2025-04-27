import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { ethers, ZeroAddress } from 'ethers';

export default function ConnectWalletButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [message, setMessage] = useState(null);
  const [showPassphraseInput, setShowPassphraseInput] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [publicKey, setPublicKey] = useState('');

  const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'; // your deployed BuyerRegistry address

  const abi = [
    'function getBuyer(address) public view returns (tuple(address buyerAddress, string publicKey))',
    'function registerBuyer(string memory _publicKey) public',
    'function updatePublicKey(string memory _newPublicKey) public'
  ];

  const connectWallet = async () => {
    console.log('[DEBUG] connectWallet triggered');
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not detected.');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      console.log('[DEBUG] Wallet Address:', address);

      setWalletAddress(address);
      setIsConnected(true);

      await checkRegistration(address);

    } catch (error) {
      console.error('[DEBUG] Error connecting wallet:', error);
      setMessage({ type: 'error', text: 'Could not connect to wallet.' });
    }
  };

  const checkRegistration = async (address) => {
    console.log('[DEBUG] checkRegistration triggered');
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const registryContract = new ethers.Contract(contractAddress, abi, provider);

      const buyer = await registryContract.getBuyer(address);
      console.log('[DEBUG] Buyer info:', buyer);

      if (buyer.buyerAddress !== ZeroAddress) {
        setIsRegistered(true);
        setPublicKey(buyer.publicKey);
        setMessage({ type: 'success', text: 'Already registered!' });
      } else {
        setIsRegistered(false);
        setShowPassphraseInput(true);  // <--- SHOW input if not registered
      }
    } catch (error) {
      console.error('[DEBUG] Error checking registration:', error);
    }
  };

  const handlePassphraseSubmit = async () => {
    console.log('[DEBUG] handlePassphraseSubmit triggered');
    try {
      if (!passphrase) {
        throw new Error('Passphrase is empty.');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const signature = await signer.signMessage(passphrase);
      const derivedPrivateKey = ethers.keccak256(ethers.toUtf8Bytes(signature));

      console.log('[DEBUG] Signature:', signature);
      console.log('[DEBUG] Derived Private Key:', derivedPrivateKey);

      // Simulating a "public key" (you can improve later!)
      const simulatedPublicKey = `PUBKEY_${derivedPrivateKey.slice(2, 10)}`;

      const registryContract = new ethers.Contract(contractAddress, abi, signer);

      if (isRegistered) {
        console.log('[DEBUG] Updating public key...');
        await registryContract.updatePublicKey(simulatedPublicKey);
        setMessage({ type: 'success', text: 'Public key updated successfully!' });
      } else {
        console.log('[DEBUG] Registering new public key...');
        await registryContract.registerBuyer(simulatedPublicKey);
        setMessage({ type: 'success', text: 'Wallet registered successfully!' });
      }

      setIsRegistered(true);
      setPublicKey(simulatedPublicKey);
      setShowPassphraseInput(false);
      setPassphrase('');
    } catch (error) {
      console.error('[DEBUG] Error during registration:', error);
      setMessage({ type: 'error', text: 'Registration failed.' });
    }
  };

  const disconnectWallet = () => {
    console.log('[DEBUG] disconnectWallet triggered');
    setIsConnected(false);
    setWalletAddress('');
    setPassphrase('');
    setShowPassphraseInput(false);
    setMessage({ type: 'success', text: 'Wallet disconnected.' });
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
      <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
      <span className="text-sm text-green-600">{walletAddress}</span>
      <button
      onClick={disconnectWallet}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
      >
      Disconnect
      </button>
      </div>

      {showPassphraseInput && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
        <h2 className="text-md mb-2 font-semibold">Enter Passphrase</h2>
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
      )}
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
}
