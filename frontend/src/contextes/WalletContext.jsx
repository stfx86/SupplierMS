import React, { createContext, useContext, useState } from 'react';
import { ethers, ZeroAddress } from 'ethers';
import toast from "react-hot-toast";
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'; // Heroicons (install if needed)
import { useContractData } from './ContractContext';

// import {abi  as BuyerRegistryABI } from '../../../artifacts/contracts/BuyerRegistry.sol/BuyerRegistry.json';
//artifacts/contracts/BuyerRegistry.sol/BuyerRegistry.json

// Create context
const WalletContext = createContext();

// Create a provider for the context
export const WalletProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    // const [BuyerRegistryAddress] = useState('0x5FbDB2315678afecb367f032d93F642f64180aa3'); 
    const [message, setMessage] = useState(null);
    const [showPassphraseInput, setShowPassphraseInput] = useState(false);
    const [passphrase, setPassphrase] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [signer, setSigner] = useState(null);  // Add signer state
    const [provider, setProvider] = useState(null);  // Add signer state
    const { buyerRegistryData } = useContractData();

    
     
    // const [contract] =useState(new ethers.Contract(BuyerRegistryAddress, BuyerRegistryABI, provider));


    const connectWallet = async () => {
        try {
            if (!window.ethereum) throw new Error('MetaMask not detected.');
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signerObj = await provider.getSigner();
            const address = await signerObj.getAddress();
            console.log('[DEBUG] Connected Wallet Address:', address);
            setWalletAddress(address);
            setSigner(signerObj);  // Store the signer
            setProvider(provider);
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


      // console.log("BuyerRegistryData.address:",buyerRegistryData.address,"\n");
      // console.log("BuyerRegistryData.abi:",buyerRegistryData.abi,"\n");
       


        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            // const registryContract = new ethers.Contract(BuyerRegistryAddress, BuyerRegistryABI, provider);
            //
            
            const registryContract = new ethers.Contract(buyerRegistryData.address, buyerRegistryData.abi, provider);
           

            //
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

            if (!passphrase) {
                toast.error("Passphrase is empty.");
                throw new Error('Passphrase is empty.');
            }
            // Assuming signer exists here, and using it to update the contract
            const derivedPrivKey = ethers.keccak256(ethers.toUtf8Bytes(passphrase));
            const derivedWallet = new ethers.Wallet(derivedPrivKey);
            const derivedPubKey = derivedWallet.signingKey.publicKey;

            const registryContract = new ethers.Contract(buyerRegistryData.address, buyerRegistryData.abi, signer);
            let tx;
            if (isRegistered) {
                tx = await registryContract.updatePublicKey(derivedPubKey);
                showTxHashToast("updatePublicKey ",tx.hash);

                console.log('[DEBUG] updatePublicKey TX Hash:', tx.hash);
               
            } else {
                tx = await registryContract.registerBuyer(derivedPubKey);
                console.log('[DEBUG] registerBuyer TX Hash:', tx.hash);
                showTxHashToast(tx.hash);

            }

            
            await tx.wait();
            console.log('[DEBUG] Transaction confirmed.');
           
            setIsRegistered(true);
            setShowPassphraseInput(false);
            setPassphrase('');
            setMessage({ type: 'success', text: isRegistered ? 'Public key updated successfully!' : 'Wallet registered successfully!' });
            setTimeout(() => setMessage(null), 3000);
            console.log("THE DERIVED PUBLIC KEY : "+ derivedPubKey);
            console.log("THE DERIVED PRIVATE  KEY : "+derivedPrivKey);
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






const showTxHashToast = (txHash) => {
    toast.custom(
      (t) => (
        <div className={`flex items-center gap-3 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-xl max-w-md border border-gray-700 ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
          <div className="flex-1 min-w-0"> {/* min-w-0 prevents flex overflow */}
            <p className="font-medium text-sm">Transaction sent!</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-gray-300 truncate"> {/* truncate cuts long text */}
                {txHash.substring(0, 6)}...{txHash.substring(txHash.length - 4)}
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(txHash);
                  toast.success('Copied to clipboard!', { 
                    duration: 1000,
                    style: {
                      background: '#4CAF50',
                      color: 'white',
                    },
                  });
                }}
                className="group p-1.5 rounded-md hover:bg-gray-700 transition-all active:scale-95 flex items-center"
                title="Copy full hash"
              >
                <DocumentDuplicateIcon className="h-4 w-4 text-gray-400 group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };
  