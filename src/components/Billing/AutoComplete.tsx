import { initAugoSuggestions } from "../../initSttates/billingState";
import { AutoCompleteProps, AutoCompletionOptionsProps, Row, } from "../../types";
import { textEditor as TextEditor } from "react-data-grid";
import "../../styles/auto_complete.css";
import { useEffect, useRef, useState } from "react";
import { isFuzzyMatch } from "../../utils/Billing/billing";

export const AutoCompletionEditor = (props: AutoCompleteProps) => {
  const { rowIndex, row, column, onClose, onRowChange, setSuggestions, setCurrentRow } = props;

  useEffect(() => {
    console.log(row);
    setCurrentRow(row);
  }, [row]);


  return (
    <>
      <TextEditor column={column} row={row} onRowChange={(params: Row) => {
        setSuggestions((_) => initAugoSuggestions.filter((suggestion) =>
          isFuzzyMatch(params.name.toLowerCase(), suggestion.text.toLowerCase(),),
        ),); onRowChange(params);
      }}
        onClose={onClose} rowIdx={rowIndex}
        i18nIsDynamicList={true} key={rowIndex}
      />
    </>
  );
};

export const AutoCompletionOptions: React.FC<AutoCompletionOptionsProps> = ({ suggestions, currentRow, setRows }) => {

  const inputField = document.querySelector("input.rdg-text-editor") as HTMLInputElement | null;
  const endPos = inputField?.selectionEnd ?? 0;
  const inputFieldRect = inputField?.getBoundingClientRect();

  const [selected, setSelected] = useState<number>(0);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hide, setHide] = useState(false);

  const handleClick = () => {
    setHide((_) => true);
    suggestions[selected].onClick();
    console.log(currentRow);
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    setHide((_) => false);
    if (event.key === "ArrowDown")
      setSelected((prev) => (prev + 1) % suggestions.length);
    else if (event.key === "ArrowUp")
      setSelected((prev) => (prev - 1 + suggestions.length) % suggestions.length,);
    else if (event.key === "Enter")
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

  if (!inputFieldRect || hide) return null;

  return (
    <div className="auto-suggestions"
      style={{
        top: inputFieldRect.y + window.scrollY + 15,
        left: inputFieldRect.left + inputFieldRect.x + 60 + endPos * 6,
      }}
    >
      {suggestions.map((suggestion, index) => (
        <div ref={(el) => (suggestionRefs.current[index] = el)}
          className={`${selected === index ? "selected" : ""}`}
          key={index} onClick={() => handleClick()}
        >
          {suggestion.text}
        </div>
      ))}
    </div>
  );
};
