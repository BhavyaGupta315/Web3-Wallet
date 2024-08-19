import { useState } from "react";
import ShowWalletInformation from "./ShowWalletInformation";
import WalletBar from "./WalletBar";

export default function WalletDisplay({ mode, coin, publicKeys, privateKeys, createWallet, setPrivateKeys, setPublicKeys }) {
  const [showWalletInfo, setShowWalletInfo] = useState(false);
  const [walletPublicKey, setWalletPublicKey] = useState("");
  const [walletPrivateKey, setWalletPrivateKey] = useState("");

  if(showWalletInfo){
      return (
        <ShowWalletInformation mode={mode} coin={coin} publicKey={walletPublicKey} privateKey={walletPrivateKey} setShowWalletInfo={setShowWalletInfo}/>
      )
  }

  return (
    <div className="m-3 transition-all duration-300  rounded-lg">
      <div className="flex justify-between">
        <div className={`${mode}-mode-text text-2xl m-6`}>{coin}</div>
        <div className="mr-2">
          <button className={`${mode}-mode-button m-4`} onClick={()=>createWallet(coin)}>Add Wallet</button>
        </div>
        
       </div> 
        {(publicKeys.length > 0) ? publicKeys.map((value, index) => (
          <div key={index} className="h-[21rem]">
            <WalletBar 
            privateKeys={privateKeys} 
            publicKeys={publicKeys}
            mode={mode} 
            index={index} 
            setPrivateKeys={setPrivateKeys} 
            setPublicKeys={setPublicKeys} 
            setShowWalletInfo={setShowWalletInfo} 
            setWalletPublicKey={setWalletPublicKey} 
            setWalletPrivateKey={setWalletPrivateKey}
            />
          </div>
        )) : null}
    </div>
  );
}
