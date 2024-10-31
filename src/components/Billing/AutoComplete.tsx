import { initAugoSuggestions } from "../../initSttates/billing";
import { AutoCompleteProps, AutoCompletionOptionsProps, Row, Stock } from "../../types";
import { textEditor as TextEditor } from "react-data-grid";
import "../../styles/auto_complete.css"


export const AutoCompletionEditor = (props: AutoCompleteProps) => {

    const { rowIndex, row, column, onClose, onRowChange, setSuggestions } = props;

    return (
        <TextEditor
            column={column}
            row={row}
            onRowChange={(params: Row) => {
                setSuggestions(() => {
                    return initAugoSuggestions.filter((suggestion) => suggestion.text.toLowerCase().includes(params.name.toLowerCase()));
                });
                onRowChange(params);
            }}
            onClose={onClose}
            rowIdx={rowIndex}
            i18nIsDynamicList={true}
            key={rowIndex}
        />
    );
}

export const AutoCompletionOptions = ({ suggestions }: AutoCompletionOptionsProps) => {

    const inputField = document.querySelector("input.rdg-text-editor") as HTMLInputElement | null;
    const endPos = inputField?.selectionEnd;

    const inputFieldRect = inputField?.getBoundingClientRect();

    if (!inputFieldRect) return <></>;

    return (
        <div className="auto-suggestions"
            style={{
                top: (inputFieldRect ? inputFieldRect.y + window.scrollY : 0) + 15,
                left: (inputFieldRect?.left || 0) + (inputFieldRect?.x || 0) + 60 + (endPos ? endPos * 6 : 0)
            }}>
            {suggestions.map((suggestion, index) => (
                <div
                    className={`${index === 0 ? "first" : ""} selected`}
                    key={index} onClick={() => suggestion.onClick()}>{suggestion.text}
                </div>
            ))}
        </div>
    );
};
