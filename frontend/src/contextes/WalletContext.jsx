import React, { createContext, useContext, useState } from 'react';
import { ethers, ZeroAddress } from 'ethers';
import {abi  as BuyerRegistryABI } from '../../../artifacts/contracts/BuyerRegistry.sol/BuyerRegistry.json';
//artifacts/contracts/BuyerRegistry.sol/BuyerRegistry.json
// Create context
const WalletContext = createContext();

// Create a provider for the context
export const WalletProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [BuyerRegistryAddress] = useState('0x5FbDB2315678afecb367f032d93F642f64180aa3');//i added this manuly
    const [message, setMessage] = useState(null);
    const [showPassphraseInput, setShowPassphraseInput] = useState(false);
    const [passphrase, setPassphrase] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [signer, setSigner] = useState(null);  // Add signer state
1
    const connectWallet = async () => {
        try {
            if (!window.ethereum) throw new Error('MetaMask not detected.');
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signerObj = await provider.getSigner();
            const address = await signerObj.getAddress();
            console.log('[DEBUG] Connected Wallet Address:', address);
            setWalletAddress(address);
            setSigner(signerObj);  // Store the signer
            setIsConnected(true);
            await checkRegistration(address);
        } catch (err) {
            console.error('[ERROR] connectWallet:', err.message);
            setMessage({ type: 'error', text: 'Could not connect to wallet.' });
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const disconnectWallet = () => {
        setIsConnected(false);
        setWalletAddress('');
        setSigner(null);  // Clear signer
        setPassphrase('');
        setShowPassphraseInput(false);
        setIsRegistered(false);
        setMessage({ type: 'success', text: 'Wallet disconnected.' });
        setTimeout(() => setMessage(null), 3000);
    };

    const checkRegistration = async (address) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const registryContract = new ethers.Contract(BuyerRegistryAddress, BuyerRegistryABI, provider);
            const buyer = await registryContract.getBuyer(address);
            console.log('[DEBUG] Buyer Data:', buyer);
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
            // Assuming signer exists here, and using it to update the contract
            const derivedPrivKey = ethers.keccak256(ethers.toUtf8Bytes(passphrase));
            const derivedWallet = new ethers.Wallet(derivedPrivKey);
            const derivedPubKey = derivedWallet.signingKey.publicKey;

            const registryContract = new ethers.Contract(BuyerRegistryAddress, BuyerRegistryABI, signer);
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

    return (
        <WalletContext.Provider
        value={{
            isConnected,
            walletAddress,
            message,
            showPassphraseInput,
            passphrase,
            isRegistered,
            signer,  // Provide the signer
            connectWallet,
            disconnectWallet,
            checkRegistration,
            handlePassphraseSubmit,
            setMessage,
            setPassphrase,
            setShowPassphraseInput,
            setIsRegistered,
        }}
        >
        {children}
        </WalletContext.Provider>
    );
};

// Custom hook to use the wallet context
export const useWallet = () => useContext(WalletContext);
