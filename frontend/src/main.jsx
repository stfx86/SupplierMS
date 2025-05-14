import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WalletProvider } from './contextes/WalletContext';
import { ContractProvider } from './contextes/ContractContext';



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ContractProvider>
    <WalletProvider>


        <App />


    </WalletProvider>
      </ContractProvider>
  </StrictMode>
)

