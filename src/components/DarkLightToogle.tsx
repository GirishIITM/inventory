import "../styles/switch.css";
export default function DarkLightToogle({ toogleTheme }: { toogleTheme: Function }) {
    return (
        <>
            <input
                onChange={() => { toogleTheme() }}
                id="toggle" className="toggle" type="checkbox" />
            <div className="background"></div>
            <label htmlFor="toggle" className="title">Toggle dark mode</label>
        </>
    )
}
