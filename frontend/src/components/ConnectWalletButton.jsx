import React, { useState } from 'react';
import { Wallet as WalletIcon } from 'lucide-react';
import { ethers, ZeroAddress } from 'ethers';


export default function ConnectWalletButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [message, setMessage] = useState(null);
  const [showPassphraseInput, setShowPassphraseInput] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
  const abi = [
    'function getBuyer(address) public view returns (tuple(address buyerAddress, string publicKey))',
    'function registerBuyer(string memory _publicKey) public',
    'function updatePublicKey(string memory _newPublicKey) public'
  ];

  const truncateAddress = (addr) =>
  addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : '';

  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error('MetaMask not detected.');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log('[DEBUG] Connected Wallet Address:', address);
      setWalletAddress(address);
      setIsConnected(true);
      await checkRegistration(address);
    } catch (err) {
      console.error('[ERROR] connectWallet:', err.message);
      setMessage({ type: 'error', text: 'Could not connect to wallet.' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const checkRegistration = async (address) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const registryContract = new ethers.Contract(contractAddress, abi, provider);
      const buyer = await registryContract.getBuyer(address);
      console.log('[DEBUG] Buyer Data:', buyer);
      console.log('[DEBUG] Buyer Address in Contract:', buyer.buyerAddress);

      if (buyer.buyerAddress !== ZeroAddress) {
        setIsRegistered(true);
        setMessage({ type: 'success', text: 'Already registered!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setIsRegistered(false);
        setShowPassphraseInput(true);
      }
    } catch (err) {
      console.error('[ERROR] checkRegistration:', err.message);
    }
  };

  const handlePassphraseSubmit = async () => {
    try {
      if (!passphrase) throw new Error('Passphrase is empty.');

      // Derive private key
      const derivedPrivKey = ethers.keccak256(ethers.toUtf8Bytes(passphrase));
      const derivedWallet = new ethers.Wallet(derivedPrivKey);
//       const derivedPubKey = computePublicKey(derivedPrivKey, true); // ⬅️ Correct public keyderivation
      const derivedPubKey = derivedWallet.signingKey.publicKey;


      console.log('[DEBUG] Derived Private Key:', derivedPrivKey);
      console.log('[DEBUG] Derived Public Key:', derivedPubKey);
      console.log('[DEBUG] Derived Address:', derivedWallet.address);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const registryContract = new ethers.Contract(contractAddress, abi, signer);

      let tx;
      if (isRegistered) {
        tx = await registryContract.updatePublicKey(derivedPubKey);
        console.log('[DEBUG] updatePublicKey TX Hash:', tx.hash);
      } else {
        tx = await registryContract.registerBuyer(derivedPubKey);
        console.log('[DEBUG] registerBuyer TX Hash:', tx.hash);
      }

      await tx.wait();
      console.log('[DEBUG] Transaction confirmed.');

      setIsRegistered(true);
      setShowPassphraseInput(false);
      setPassphrase('');
      setMessage({ type: 'success', text: isRegistered ? 'Public key updated successfully!' : 'Wallet registered successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error('[ERROR] handlePassphraseSubmit:', err.message);
      setMessage({ type: 'error', text: 'Registration failed.' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setPassphrase('');
    setShowPassphraseInput(false);
    setIsRegistered(false);
    setMessage({ type: 'success', text: 'Wallet disconnected.' });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="p-4 relative flex flex-col items-center">
    {message && (
      <div className="absolute top-16 w-fit bg-white border rounded shadow-md px-4 py-2 text-sm z-20 animate-fade">
      <div
      className={`${
        message.type === 'success'
        ? 'text-green-700'
        : 'text-red-700'
      }`}
      >
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
        {isRegistered
          ? 'Update Your Public Key'
      : 'Enter Passphrase to Register'}
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
