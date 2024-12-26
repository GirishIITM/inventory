import { initAugoSuggestions } from "../../initSttates/billingState";
import { AutoCompleteProps, Row, suggestionsType } from "../../types";
import { textEditor as TextEditor } from "react-data-grid";
import "../../styles/auto_complete.css";
import { useEffect, useRef, useState } from "react";
import { isFuzzyMatch } from "../../utils/Billing/billing";
import toast from "react-hot-toast";

export const AutoCompletionEditor = (props: AutoCompleteProps) => {
  const { rowIndex, row, column, onClose, onRowChange, setCurrentRow, setCurrentColumn, setRows, rows, currentRow } = props;
  const [suggestions, setSuggestions] = useState<suggestionsType>(initAugoSuggestions);

  useEffect(() => {
    setCurrentRow(_ => row);
    setCurrentColumn(_ => column);
  }, [row.id, column.key]);

  const inputField = document.querySelector("input.rdg-text-editor") as HTMLInputElement | null;
  const endPos = inputField?.selectionEnd ?? 0;
  const inputFieldRect = inputField?.getBoundingClientRect();

  const [selected, setSelected] = useState<number>(0);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hide, setHide] = useState(false);

  const handleClick = (index?: number) => {
    setHide((_) => true);
    if (!currentRow) return toast.error("No row selected");
    currentRow.name = suggestions[index || selected].text;
    currentRow.price = suggestions[index || selected].price;
    currentRow.quantity = 1;
    currentRow.total = currentRow.price * currentRow.quantity;
    rows.forEach((row) => (row.id === currentRow.id ? currentRow : row));
    console.log(rows);
    setRows((prev) => [...prev]);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    setHide((_) => false);
    if (event.key === "ArrowDown")
      setSelected((prev) => (prev + 1) % suggestions.length);
    else if (event.key === "ArrowUp")
      setSelected((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    else if (event.key == "Enter")
      handleClick();
    else if (event.key == "Escape")
      setHide((_) => true);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    suggestionRefs.current[selected]?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const handleRowChange = (params: Row) => {
    const filteredSuggestions = initAugoSuggestions.filter((suggestion) =>
      isFuzzyMatch(params.name.toLowerCase(), suggestion.text.toLowerCase()),
    );
    setSuggestions((_) => filteredSuggestions);
    onRowChange(params);
  };

  return (
    <>
      {!!suggestions && !hide && inputFieldRect && (
        <div
          className="auto-suggestions"
          style={{
            top: inputFieldRect.y + window.scrollY + 15,
            left: inputFieldRect.left + inputFieldRect.x + 60 + endPos * 6,
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              ref={(el) => (suggestionRefs.current[index] = el)}
              className={`${selected === index ? "selected" : ""}`}
              key={index}
              onClick={() => handleClick(index)}
            >
              {suggestion.text}
            </div>
          ))}
        </div>
      )}
      <TextEditor
        column={column}
        row={row}
        onRowChange={handleRowChange}
        onClose={onClose}
        rowIdx={rowIndex}
        i18nIsDynamicList={true}
        key={rowIndex}
      />
    </>
  );
};
