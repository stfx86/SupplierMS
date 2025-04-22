import { createContext, useState, useContext } from "react";



export const WalletContext = createContext();

export function WalletProvider({children}){


    const [signer ,setSigner]=useState(null);


    return (


        <WalletContext.Provider value={{signer ,setSigner}}>
            
            {children}


        </WalletContext.Provider>
    )




}
export function useWallet() {
    return useContext(WalletContext);
  }

