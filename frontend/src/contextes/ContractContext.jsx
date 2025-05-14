
import React, { createContext, useContext } from "react";

import {abi  as BuyerRegistryABI } from '../../../artifacts/contracts/BuyerRegistry.sol/BuyerRegistry.json';
import {abi  as SupplierRegistryABI } from '../../../artifacts/contracts/SupplierRegistry.sol/SupplierRegistry.json';








const ContractContext = createContext(null);

export const useContractData = () => {
  const ctx = useContext(ContractContext);
  if (!ctx) {
    throw new Error("useContractData must be used within a ContractProvider");
  }
  return ctx;
};


export const ContractProvider = ({ children }) => {
  const contractData = {
    supplierRegistryData: {
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      abi: SupplierRegistryABI,
    },
    buyerRegistryData: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: BuyerRegistryABI,
    },
  };

  return (
    <ContractContext.Provider value={contractData}>
      {children}
    </ContractContext.Provider>
  );
};
