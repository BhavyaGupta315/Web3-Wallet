import copy_light from "../assets/copy_light.svg"
import copy_dark from "../assets/copy_dark.svg"

export default function SecretPhaseDisplay({ mode, mnemonic }) {

  const handleCopy = () => {
      const copyMnemonic = mnemonic.join(" ");
      navigator.clipboard.writeText(copyMnemonic)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  }

  return (
    <div className="h-60 mt-20">
      <div className={`ml-20 ${mode}-mode-text font-bold text-2xl`}>
        Secret Phrase Key
      </div>
      <div className="flex items-center justify-center h-60 mt-10">
        <div className=" w-[60%] h-full grid md:grid-cols-4 grid-cols-3 group">
          {mnemonic.map((val, index) => (
            <div
              key={index}
              className={`filter blur-sm transition duration-300 ease-in-out group-hover:blur-none cursor-pointer ${mode}-mode-text flex items-center justify-center phrase-bg m-1 rounded-lg`}
            >
              {val}
            </div>
          ))}
        </div>
      </div>
      <div className={`mt-10 flex justify-end mr-40 ${mode}-mode-text cursor-pointer`} onClick={handleCopy}>
        {mode == "dark" ? <img src={copy_dark} className="w-6 mr-1"/> : <img src={copy_light} className="w-6 mr-1"/>}
        Copy to Clipboard
      </div>
    </div>
  );
}


/**
 promise.then(function)
 */