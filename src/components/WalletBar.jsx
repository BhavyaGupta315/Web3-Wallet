import { useState } from "react";
import eye_open_dark from "../assets/eye_open_dark.svg"
import eye_open_light from "../assets/eye_open_light.svg"
import eye_close_dark from "../assets/eye_close_dark.svg"
import eye_close_light from "../assets/eye_close_light.svg"

export default function WalletBar({ publicKeys, privateKeys, mode, index, setPrivateKeys, setPublicKeys, setShowWalletInfo, setWalletPublicKey, setWalletPrivateKey }) {
    const [seen, setSeen] = useState(false);
    const dummyPrivateKey = "*".repeat(privateKeys[index].length);
    const showIcon = (mode == "dark") ? eye_open_dark : eye_open_light;
    const notShowIcon = (mode == "dark") ? eye_close_dark : eye_close_light;
    const nowIcon = (seen) ? showIcon : notShowIcon;
    const handleCopy = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy)
        .then(() => {
          alert('Copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    }

    const deleteWallet=  (indexToDelete)=>{
        if(indexToDelete == 0 && publicKeys.length == 1){
            setPublicKeys([]);
            setPrivateKeys([]);    
            return;
        }
    
        const newSetOfPublicKeys = publicKeys.filter((_,  i) => i != indexToDelete);
        const newSetOfPrivateKeys = privateKeys.filter((_,  i) => i != indexToDelete);
        setPublicKeys(newSetOfPublicKeys);
        setPrivateKeys(newSetOfPrivateKeys);
    }

    const showWalletInfoOnClick = () => {
        setWalletPublicKey(publicKeys[index]);
        setWalletPrivateKey(privateKeys[index]);
        setShowWalletInfo(true);
    }

    return (
        <div 
        className={`h-[20rem] rounded-lg p-2 ${mode}-mode-wallet-bar mx-2`}
        >
            <div className={`text-xl font-bold flex justify-between`}>
                <div className="m-3" onClick={showWalletInfoOnClick}>
                Wallet - {index+1} (Click here)
                </div>
                <button className={`danger-mode-button text-xs mt-2`} onClick={()=>deleteWallet(index)}>Delete Wallet</button>
            </div>
            <div className={`${mode}-wallet-css`}>
                <div className="my-2" >
                    <p className="text-2xl font-extrabold my-1">Public Key</p>
                    <p className="break-words text-sm my-1 cursor-copy text-glow-hover" onClick={()=>handleCopy(publicKeys[index])}>{publicKeys[index]}</p>
                </div>
                <div className="my-2">
                    <p className="text-2xl font-extrabold my-1">Private Key</p>
                    <p className="break-words text-sm my-1 cursor-copy" onClick={()=>handleCopy(privateKeys[index])}>{seen ? privateKeys[index] : dummyPrivateKey}</p>
                </div>
                <img src={nowIcon} onClick={()=>{
                    setSeen(!seen);
                }}
                className="hover:bg-[#F0EAAC] rounded-lg"
                />
            </div>
        </div>
    );
}
