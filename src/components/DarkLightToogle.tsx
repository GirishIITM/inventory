import "../styles/switch.css";
export default function DarkLightToogle({ toogleTheme }: { toogleTheme: Function }) {
    return (
        <>
            <input
                onChange={() => { toogleTheme() }}
                placeholder="Toggle"
                id="toggle" className="checkbox toggle" type="checkbox" />
        </>
    )
}