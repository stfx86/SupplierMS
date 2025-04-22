//metamask password
//       l 

import '../styles/ConnectWallet.css';

import { ethers } from 'ethers';
import { useWallet } from '../contexts/WalletContext';

function ConnectWallet() {

  // const [signer, setSigner] = useState(null);
  const { signer, setSigner} = useWallet();



  const connect = async () => {
    if (window.ethereum) {
      try {
      //  const [account]= await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = await  new  ethers.BrowserProvider(window.ethereum);
        const signer   = await  provider.getSigner();
        const address  = await  signer.getAddress(); // ⬅️ get actual address this way

        setSigner(signer);

        // onConnected(signer);
        // setSigner(signer);
        // setAccount(account);

        // console.log("Account:", account);
        console.log("Signer:", signer);
        console.log("Signer:", address);
        const signature = await signer.signMessage("Login to Supplier DApp");
        console.log("Signature>>>>>:", signature);


      } catch (err) {
        console.error("Wallet connection failed", err);
      }
    } else {
      alert("Please install MetaMask.");
    }
  };



  return (
    <div className="connect-wallet">
      {!signer ? (
        <button onClick={connect} className="connect-btn">🔗 Connect Wallet</button>
      ) : (
        <p><strong>Connected:</strong> {signer.address.slice(0, 6)}...{signer.address.slice(-4)}</p>
      )}
    </div>
  );
}

export default ConnectWallet;






  