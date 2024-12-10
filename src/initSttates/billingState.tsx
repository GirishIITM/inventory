import { useMemo } from "react";
import { Column, RenderEditCellProps, SelectColumn, textEditor, } from "react-data-grid";
import { Row, billingStateType } from "../types";
import { AutoCompletionEditor } from "../components/Billing/AutoComplete";

export const initAugoSuggestions = [
  { text: "Namkeen Moong Daal", price: 45.99, onClick: () => console.log("Namkeen Moong Daal"), },
  { text: "Spicy Masala Chips", price: 25.50, onClick: () => console.log("Spicy Masala Chips"), },
  { text: "Organic Brown Basmati Rice", price: 60.00, onClick: () => console.log("Organic Brown Basmati Rice"), },
  { text: "Almond Honey Granola Bars", price: 35.75, onClick: () => console.log("Almond Honey Granola Bars"), },
  { text: "Whole Wheat Flour", price: 20.00, onClick: () => console.log("Whole Wheat Flour"), },
  { text: "Roasted Salted Cashews", price: 50.00, onClick: () => console.log("Roasted Salted Cashews"), },
  { text: "Garlic Herb Seasoning Mix", price: 15.25, onClick: () => console.log("Garlic Herb Seasoning Mix"), },
  { text: "Unsweetened Almond Milk", price: 30.00, onClick: () => console.log("Unsweetened Almond Milk"), },
  { text: "Dark Chocolate with Sea Salt", price: 40.00, onClick: () => console.log("Dark Chocolate with Sea Salt"), },
  { text: "Cinnamon Vanilla Protein Powder", price: 55.00, onClick: () => console.log("Cinnamon Vanilla Protein Powder"), },
];

export const initRow = [{ id: 0, name: "Unnamed", price: 0, quantity: 1, total: 0, },];

export const useBillingColumns = ({ setCurrentRow, suggestions, setSuggestions, setCurrentColumn }: billingStateType): Column<Row>[] => {
  return useMemo(
    () => [
      SelectColumn,
      { key: "id", name: "S.N.", editable: false, width: 50 },
      {
        key: "name", name: "Name", editable: true,
        renderEditCell: (params: RenderEditCellProps<Row, unknown>) => (
          <AutoCompletionEditor setCurrentColumn={setCurrentColumn} setCurrentRow={setCurrentRow} suggestions={suggestions} setSuggestions={setSuggestions}
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
