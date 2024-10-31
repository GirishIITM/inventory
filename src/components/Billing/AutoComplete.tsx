import { AutoCompleteProps, AutoCompletionOptionsProps, Row, Stock } from "../../types";
import { textEditor as TextEditor } from "react-data-grid";


export const AutoCompletionEditor = (props: AutoCompleteProps) => {

    const { rowIndex, row, column, onClose, onRowChange, setSuggestions } = props;

    return (
        <TextEditor
            column={column}
            row={row}
            onRowChange={(params: Row) => {
                setSuggestions(prev => {
                    return prev.map((suggestion, index) => {
                        if (index === rowIndex) {
                            return { ...suggestion, text: params.name };
                        }
                        return suggestion;
                    });
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


    return (
        <div className="auto-suggestions">
            {suggestions.map((suggestion, index) => (
                <div key={index} onClick={() => suggestion.onClick()}>{suggestion.text}</div>
            ))}
        </div>
    );
}