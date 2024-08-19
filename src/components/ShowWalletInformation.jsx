import { useState, useEffect } from "react";
import arrow_back_dark from "../assets/arrow_back_dark.svg"
import arrow_back_light from "../assets/arrow_back_light.svg"
import eye_open_dark from "../assets/eye_open_dark.svg"
import eye_open_light from "../assets/eye_open_light.svg"
import eye_close_dark from "../assets/eye_close_dark.svg"
import eye_close_light from "../assets/eye_close_light.svg"
import getBalance from "../helpers/getBalanceFromAPI";

export default function ShowWalletInformation({publicKey, privateKey, setShowWalletInfo, coin, mode}){
    const [seen, setSeen] = useState(false);
    const showIcon = (mode == "dark") ? eye_open_dark : eye_open_light;
    const notShowIcon = (mode == "dark") ? eye_close_dark : eye_close_light;
    const nowIcon = (seen) ? showIcon : notShowIcon;
    const dummyPrivateKey = "*".repeat(privateKey.length);
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const result = await getBalance(publicKey, coin);
                setBalance(result);
            } catch (err) {
                console.error("Failed to fetch balance:", err);
            }
        };

        fetchBalance();
    }, [publicKey, coin]);

    const goBack = () => {
        setShowWalletInfo(false);
    }
    const handleCopy = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy)
        .then(() => {
          alert('Copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    }
    // console.log(getBalanceOfCoin);   
    return <div className={`${mode}-mode-text m-3 transition-all duration-300  rounded-lg` }>
        <div className={`${mode}-back-button flex justify-start cursor-pointer`} onClick={goBack}>
            {mode == "dark" ? <img src={arrow_back_dark} /> : <img src={arrow_back_light}/>}          
            <p>Back</p>
        </div>
        <div 
        className={`h-[40rem] rounded-lg p-2 ${mode}-mode-wallet-bar mx-2`}
        >
            <div className={`${mode}-wallet-css`}>
                <div className="my-2" >
                    <p className="text-2xl font-extrabold my-1">Public Key</p>
                    <p className="break-words text-sm my-1 cursor-copy text-glow-hover" onClick={()=>handleCopy(publicKey)}>{publicKey}</p>
                </div>
                <div className="my-2">
                    <p className="text-2xl font-extrabold my-1">Private Key</p>
                    <p className="break-words text-sm my-1 cursor-copy" onClick={()=>handleCopy(privateKey)}>{seen ? privateKey : dummyPrivateKey}</p>
                </div>
                <img src={nowIcon} onClick={()=>{
                    setSeen(!seen);
                }}
                className="hover:bg-[#F0EAAC] rounded-lg"
                />
            </div>
            <div className={`${mode}-wallet-css`}>
                <div className="my-2" >
                    <p className="text-2xl font-extrabold my-1">Balance</p>
                    <p className="break-words text-xl my-2 flex">{balance !== null ? balance : 'Loading...'} <p className="text-sm mx-1">{(coin == "Solana" )? "SOL" : "ETH"}</p></p>
                </div>
            </div>
        </div>
    </div>
}