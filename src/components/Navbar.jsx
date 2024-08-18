import stack from "../assets/stack.svg"
import stack_black from "../assets/stack_black.svg"
import DarkMode from "./DarkMode/DarkMode"
export const Navbar = ({mode, setMode}) => {
    return <div className=" h-20 flex justify-between">
        <div className="m-10 pl-2 flex">
            <div>
                {mode == "dark" ? <img src={stack} className="w-14"/> : <img src={stack_black} className="w-14"/>}
            </div>
            <div className={`m-3 ml-3 ${mode}-mode-text font-bold text-3xl`}>
                Wallet           
            </div>
            
        </div>
        <div className="m-14 mr-24 pr-4">
            <DarkMode mode={mode} setMode={setMode}/>
        </div>
    </div>
}