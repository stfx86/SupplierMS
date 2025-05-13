import React from 'react';
import { Wallet as WalletIcon } from 'lucide-react';
import { useWallet } from '../contextes/WalletContext.jsx';

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
    handlePassphraseSubmit,
    setMessage,
    setPassphrase,
    setShowPassphraseInput,
    derivedKeys,
  } = useWallet();

  const truncateAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : '';

  const closePassphraseModal = () => {
    setPassphrase('');
    setShowPassphraseInput(false);
  };

  const exportKeyToFile = (key, filename) => {
    const blob = new Blob([key], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const exportBothKeys = () => {
    if (!derivedKeys) return;
    const content = `Public Key:\n${derivedKeys.publicKey}\n\nPrivate Key:\n${derivedKeys.privateKey}`;
    exportKeyToFile(content, 'keys.txt');
  };

  return (
    <div className="p-4 relative flex flex-col items-start space-y-4">
      {message && (
        <div className="absolute top-16 bg-gray-800 border border-gray-700 rounded shadow px-4 py-2 text-sm z-20 text-white animate-fade">
          {message.text}
        </div>
      )}

      {isConnected ? (
        <>
          <div className="flex items-center gap-2">
            <span className="text-green-400 text-sm">{truncateAddress(walletAddress)}</span>
            <button
              onClick={disconnectWallet}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
            >
              Disconnect
            </button>
          </div>

          {derivedKeys && (
            <div className="bg-gray-800 p-4 rounded-lg shadow w-80 text-sm space-y-3 text-gray-200">
              <h3 className="font-medium text-center mb-2">🔐 Derived Keys</h3>

              <div>
                <strong className="text-purple-400">Public Key:</strong>
                <div className="flex justify-between items-center mt-1">
                  <code className="truncate">{derivedKeys.publicKey}</code>
                  <button
                    onClick={() => exportKeyToFile(derivedKeys.publicKey, 'public_key.txt')}
                    className="text-blue-400 hover:underline text-xs"
                  >
                    Export
                  </button>
                </div>
              </div>

              <div>
                <strong className="text-red-400">Private Key:</strong>
                <div className="flex justify-between items-center mt-1">
                  <code className="truncate">{derivedKeys.privateKey}</code>
                  <button
                    onClick={() => exportKeyToFile(derivedKeys.privateKey, 'private_key.txt')}
                    className="text-blue-400 hover:underline text-xs"
                  >
                    Export
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-600">
                <button
                  onClick={exportBothKeys}
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs"
                >
                  Export Both Keys
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={connectWallet}
          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm"
        >
          <WalletIcon className="mr-2 h-4 w-4" />
          Connect Wallet
        </button>
      )}

      {/* Modal for passphrase input */}
      {showPassphraseInput && (
  <div className="mt-2 w-full flex justify-start absolute ">
    <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl w-96 space-y-4 shadow-xl animate-fade-in text-white">
      <h2 className="text-lg font-semibold text-center">
        {isRegistered ? '🔄 Update Your Public Key' : '📝 Register Passphrase'}
      </h2>
      <input
        type="password"
        className="w-full p-2 bg-zinc-800 border border-zinc-600 rounded text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
        placeholder="Enter your secure passphrase"
        value={passphrase}
        onChange={(e) => setPassphrase(e.target.value)}
      />
      <div className="flex justify-between gap-3 pt-2">
        <button
          onClick={closePassphraseModal}
          className="w-1/2 py-2 bg-zinc-700 hover:bg-zinc-600 text-sm rounded transition"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handlePassphraseSubmit();
            closePassphraseModal();
          }}
          className="w-1/2 py-2 bg-green-600 hover:bg-green-700 text-sm rounded transition"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}



    </div>
  );
}

