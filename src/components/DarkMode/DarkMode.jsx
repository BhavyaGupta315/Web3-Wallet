import React from "react";
import SunIcon from "./Sun.svg";
import MoonIcon from "./Moon.svg";
import "./DarkMode.css";

const DarkMode = ({mode, setMode}) => {
    const setDarkMode = () => {
        document.querySelector("body").setAttribute("data-theme", "dark");
        setMode("dark");
    }
    const setLightMode = () => {
        document.querySelector("body").setAttribute("data-theme", "light");
        setMode("light");
    }
    const toggleFunction = (e) => {
        if(e.target.checked) setDarkMode();
        else setLightMode();
    }

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                defaultChecked={mode=="dark"}
                onChange={toggleFunction}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <img src={SunIcon} alt="Sun Icon" className="sun"/>
                <img src={MoonIcon} alt="Moon Icon" className="moon"/>
            </label>
        </div>
    );
};

export default DarkMode;
