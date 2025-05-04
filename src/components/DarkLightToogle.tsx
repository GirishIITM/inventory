import { useEffect, useState } from "react";
import "../styles/switch.css";

export default function DarkLightToogle({ toogleTheme }: { toogleTheme: Function }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    useEffect(() => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        setIsDarkMode(currentTheme.includes('dark'));
    }, []);
    
    const handleToggle = () => {
        toogleTheme();
        setIsDarkMode(!isDarkMode);
    };
    
    return (
        <>
            <input
                onChange={handleToggle}
                checked={isDarkMode}
                placeholder="Toggle"
                id="toggle" 
                className="checkbox toggle" 
                type="checkbox" 
            />
        </>
    )
}