import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeed, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react"
import nacl from "tweetnacl";
import { Navbar } from "./components/Navbar";
import './App.css'
import SecretPhaseGenerator from "./components/SecretPhaseGenerator";
import SecretPhaseDisplay from "./components/SecretPhaseDisplay";
import Footer from "./components/Footer";
import WalletDisplay from "./components/WalletDisplay";
import { HDNodeWallet } from "ethers";
import { Wallet } from "ethers";
import bs58 from 'bs58'; 

export default function App() {
  const [mnemonic, setMnemonic] = useState([]);
  const [mnemonicSeed, setMnemonicSeed] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeysSol, setPublicKeysSol] = useState([])
  const [privateKeysSol, setPrivateKeysSol] = useState([])
  const [publicKeysETH, setPublicKeysETH] = useState([])
  const [privateKeysETH, setPrivateKeysETH] = useState([])
  const [mode, setMode] = useState("dark");
  const [secretPhaseGenerated, setSecretPhaseGenerated] = useState(false);
  const generateRandom = async (state = "") => {
    if(state != ""){
      const isValid = validateMnemonic(state);
      console.log(isValid);
      if(isValid) setMnemonic(state.split(" "));
      else alert("Invalid Recovery Phrase");
    }else{
      const words = await generateMnemonic(128);
      setMnemonicSeed(words);
      setMnemonic(words.split(" "));
    }
    setSecretPhaseGenerated(true);
  }
  const createWallet = async (coin)=>{
      // console.log(mnemonic);
      const seed = await mnemonicToSeed(mnemonicSeed);
      // console.log(seed);
      if(coin == "Solana"){
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const { key } = await derivePath(path, seed.toString("hex")); 
        const derivedSeed = await Buffer.from(key, "hex");
        const secretKey = await nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keyPair = await Keypair.fromSecretKey(secretKey);
        const publicKeyReal = keyPair.publicKey.toBase58();
        const secretKeyReal = bs58.encode(secretKey); 
        setCurrentIndex(currentIndex+1);
        setPublicKeysSol([...publicKeysSol, publicKeyReal]);
        setPrivateKeysSol([...privateKeysSol, secretKeyReal]);
        // console.log("Public Key ", publicKeyReal, " Private Key ", secretKeyReal);
        return;
      }
      if(coin == "Etherium"){
          const path = `m/44'/60'/${currentIndex}'/0'`;
          const hdNode = HDNodeWallet.fromSeed(seed);
          const child = hdNode.derivePath(path);
          const pvtKey = child.privateKey;
          const wallet = new Wallet(pvtKey);
          setCurrentIndex(currentIndex+1);
          setPublicKeysETH([...publicKeysETH, wallet.address]);
          setPrivateKeysETH([...privateKeysETH, pvtKey]);
          return;
      }
      
  }

  return (
    <>
      <Navbar mode={mode} setMode={setMode}/>
      {(!secretPhaseGenerated) ? <SecretPhaseGenerator generateRandom={generateRandom} mode={mode} /> : <SecretPhaseDisplay mode={mode} mnemonic={mnemonic}/>}
      {(secretPhaseGenerated) ? 
      <div className="grid md:grid-cols-2 grid-cols-1 mt-[13rem]">
          <WalletDisplay mode={mode} coin="Solana" publicKeys={publicKeysSol} privateKeys={privateKeysSol} setPrivateKeys={setPrivateKeysSol} setPublicKeys={setPublicKeysSol} createWallet={createWallet}/>
          <WalletDisplay mode={mode} coin="Etherium" publicKeys={publicKeysETH} privateKeys={privateKeysETH} setPrivateKeys={setPrivateKeysETH} setPublicKeys={setPublicKeysETH} createWallet={createWallet}/>
      </div>
       : null}
      <Footer/>
    </>
  )
}