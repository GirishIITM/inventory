import { useMemo } from "react";
import {
  Column,
  RenderEditCellProps,
  SelectColumn,
  textEditor,
} from "react-data-grid";
import { setSuggestionsType, Row, suggestionsType } from "../types";
import { AutoCompletionEditor } from "../components/Billing/AutoComplete";

export const initAugoSuggestions = [
  { text: "Namkeen Moong Daal", onClick: () => console.log("Namkeen Moong Daal"), },
  { text: "Spicy Masala Chips", onClick: () => console.log("Spicy Masala Chips"), },
  { text: "Organic Brown Basmati Rice", onClick: () => console.log("Organic Brown Basmati Rice"), },
  { text: "Almond Honey Granola Bars", onClick: () => console.log("Almond Honey Granola Bars"), },
  { text: "Whole Wheat Flour", onClick: () => console.log("Whole Wheat Flour"), },
  { text: "Roasted Salted Cashews", onClick: () => console.log("Roasted Salted Cashews"), },
  { text: "Garlic Herb Seasoning Mix", onClick: () => console.log("Garlic Herb Seasoning Mix"), },
  { text: "Unsweetened Almond Milk", onClick: () => console.log("Unsweetened Almond Milk"), },
  { text: "Dark Chocolate with Sea Salt", onClick: () => console.log("Dark Chocolate with Sea Salt"), },
  { text: "Cinnamon Vanilla Protein Powder", onClick: () => console.log("Cinnamon Vanilla Protein Powder"), },
];

export const initRow = [
  {
    id: 0,
    name: "Unnamed",
    price: 0,
    quantity: 1,
    total: 0,
  },
];

export const useBillingColumns = (
  setSuggestions: setSuggestionsType,
  suggestions: suggestionsType,
): Column<Row>[] => {
  console.log("useBillingColumns");
  return useMemo(
    () => [
      SelectColumn,
      { key: "id", name: "S.N.", editable: false, width: 50 },
      {
        key: "name", name: "Name", editable: true,
        renderEditCell: (params: RenderEditCellProps<Row, unknown>) => (
          <AutoCompletionEditor suggestions={suggestions} setSuggestions={setSuggestions}
            rowIndex={params.rowIdx} {...params}
          />
        ),
      },
      { key: "price", name: "Price", editable: true, type: "number", renderEditCell: textEditor, },
      { key: "quantity", name: "Quantity", editable: true, type: "number", renderEditCell: textEditor, },
      { key: "total", name: "Total", editable: false },
    ],
    [SelectColumn, setSuggestions],
  );
};
