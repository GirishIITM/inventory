import { initAugoSuggestions } from "../../initSttates/billing";
import { AutoCompleteProps, AutoCompletionOptionsProps, Row } from "../../types";
import { textEditor as TextEditor } from "react-data-grid";
import "../../styles/auto_complete.css"
import { useEffect, useRef, useState } from "react";
import { isFuzzyMatch } from "../../utils/Billing/billing";


export const AutoCompletionEditor = (props: AutoCompleteProps) => {

    const { rowIndex, row, column, onClose, onRowChange, setSuggestions } = props;

    return (
        <TextEditor
            column={column}
            row={row}
            onRowChange={(params: Row) => {
                setSuggestions(_ => initAugoSuggestions.filter((suggestion) =>
                    isFuzzyMatch(params.name.toLowerCase(), suggestion.text.toLowerCase())
                ));
                onRowChange(params);
            }}
            onClose={onClose}
            rowIdx={rowIndex}
            i18nIsDynamicList={true}
            key={rowIndex}
        />
    );
}

export const AutoCompletionOptions: React.FC<AutoCompletionOptionsProps> = ({ suggestions }) => {
    const inputField = document.querySelector("input.rdg-text-editor") as HTMLInputElement | null;
    const endPos = inputField?.selectionEnd ?? 0;
    const inputFieldRect = inputField?.getBoundingClientRect();

    const [selected, setSelected] = useState<number>(0);
    const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowDown") {
            setSelected((prev) => (prev + 1) % suggestions.length);
        } else if (event.key === "ArrowUp") {
            setSelected((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        } else if (event.key === "Enter") {
            suggestions[selected].onClick();
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        suggestionRefs.current[selected]?.scrollIntoView({ block: "nearest" });
    }, [selected]);

    if (!inputFieldRect) return null;

    return (
        <div className="auto-suggestions"
            style={{
                top: inputFieldRect.y + window.scrollY + 15,
                left: inputFieldRect.left + inputFieldRect.x + 60 + endPos * 6,
            }}>
            {suggestions.map((suggestion, index) => (
                <div
                    ref={(el) => suggestionRefs.current[index] = el}
                    className={`${selected === index ? "selected" : ""}`}
                    key={index}
                    onClick={() => suggestion.onClick()}>
                    {suggestion.text}
                </div>
            ))}
        </div>
    );
};