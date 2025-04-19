// components/ConnectWallet.jsx
import '../styles/ConnectWallet.css';

import { useState, useEffect } from 'react';

import { ethers } from 'ethers';

function ConnectWallet({ onConnected }) {
  const [account, setAccount] = useState(null);

  const connect = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to continue.');
      return;
    }

    try {
      const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(address);
      if (onConnected) onConnected(address);
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };

  useEffect(() => {
    if (window.ethereum?.selectedAddress) {
      setAccount(window.ethereum.selectedAddress);
      if (onConnected) onConnected(window.ethereum.selectedAddress);
    }

    // Optional: react to account change
    window.ethereum?.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        if (onConnected) onConnected(accounts[0]);
      } else {
        setAccount(null);
        if (onConnected) onConnected(null);
      }
    });
  }, [onConnected]);

  return (
    <div className="connect-wallet">
      {!account ? (
        <button onClick={connect} className="connect-btn">🔗 Connect Wallet</button>
      ) : (
        <p><strong>Connected:</strong> {account.slice(0, 6)}...{account.slice(-4)}</p>
      )}
    </div>
  );
}

export default ConnectWallet;
