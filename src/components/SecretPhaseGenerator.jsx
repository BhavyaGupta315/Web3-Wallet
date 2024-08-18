import { useState } from "react";

export default function SecretPhaseGenerator({ generateRandom, mode }) {
  const [inputValue, setInputValue] = useState("");
  const changingInput = (e) => {
      setInputValue(e.target.value);
  }
    return (
      <div className="h-96 ">
        <div className="p-10 pt-14 pb-0 leading-[60px] ">
            <h1 className={`font-bold text-5xl ${mode}-mode-text`}>Secret Recovery Phrase</h1>
            <h2 className={`text-md ${mode}-mode-text opacity-65 ml-6`}>Save this words in a safe place.</h2>
        </div>
        <div className=" pl-8 grid sm:grid-cols-5 gap-2 grid-cols-1 mr-20 ml-1 justify-center content-center">
            <input 
            type="password" 
            className={`${mode}-mode-input m-1 h-9 sm:col-span-4 p-2`} 
            placeholder="Enter Your Secret Recovery Phase (or leave it blank)"
            onChange={changingInput}
            />
            <button 
              className={`${mode}-mode-button h-10 col-span-1 `}
              onClick={()=>generateRandom(inputValue)}
            >
              {(inputValue == "") ? "Generate Wallet" : "Add Wallet"}</button>
        </div>
      </div>
    );
  }
  