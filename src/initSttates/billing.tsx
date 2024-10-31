import { useMemo } from "react";
import { Column, RenderEditCellProps, SelectColumn, textEditor } from "react-data-grid";
import { setSuggestionsType, Row } from "../types";
import { AutoCompletionEditor } from "../components/Billing/AutoComplete";


export const initAugoSuggestions = [
    { text: "Product 1", onClick: () => console.log("Product 1") },
    { text: "Product 2", onClick: () => console.log("Product 2") },
    { text: "Product 3", onClick: () => console.log("Product 3") },
    { text: "Product 4", onClick: () => console.log("Product 4") },
]

export const initRow = [
    {
        id: 0,
        name: "Unnamed",
        price: 0,
        quantity: 1,
        total: 0,
    },
];


export const useBillingColumns = ( setSuggestions : setSuggestionsType): Column<Row>[] => {
    return useMemo(
        () => [
            SelectColumn,
            { key: "id", name: "S.N.", editable: false, width: 50 },
            {
                key: "name",
                name: "Name",
                editable: true,
                renderEditCell: (params: RenderEditCellProps<Row, unknown>) => (
                    <AutoCompletionEditor setSuggestions={setSuggestions} rowIndex={params.rowIdx} {...params} />
                ),
            },
            {
                key: "price",
                name: "Price",
                editable: true,
                type: "number",
                renderEditCell: textEditor,
            },
            {
                key: "quantity",
                name: "Quantity",
                editable: true,
                type: "number",
                renderEditCell: textEditor,
            },
            { key: "total", name: "Total", editable: false },
        ],
        [SelectColumn, setSuggestions]
    );
};