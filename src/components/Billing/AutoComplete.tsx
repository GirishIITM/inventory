import { Autocomplete, AutocompleteRenderInputParams, TextField } from "@mui/material";
import { Row, Stock } from "../../types";
import { Dispatch, SetStateAction, useState } from "react";



const AutoCompletionOptions = ({ rowIndex, rows, setRows }: {
    rowIndex: number,
    setRows: Dispatch<SetStateAction<readonly Row[]>>,
    rows: readonly Row[],
}) => {
    const initStock = [
        { id: 1, name: "Product A", price: 100 },
        { id: 2, name: "Pros da B", price: 200 },
        { id: 3, name: "Proddsfdsk uct C", price: 300 },
        { id: 4, name: "dsa  D", price: 400 },
        { id: 5, name: "uct E", price: 500 },
    ]
    const [stocks] = useState<Stock[]>(initStock);
    const [suggestions, setSuggestions] = useState<Stock[]>(initStock);



    const handleNameChange = (rowIndex: number, value: string) => {
        const updatedRows = rows.map((row, index) =>
            index === rowIndex ? { ...row, name: value } : row
        );
        setRows(updatedRows);
        setSuggestions(
            stocks.filter((stock) =>
                stock.name.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    return (
        <Autocomplete options={suggestions}
            clearIcon={null}
            value={rows[rowIndex]} getOptionLabel={(option) => option.name}
            onChange={(_, value) => {
                if (value) handleNameChange(rowIndex, value.name);
            }} renderInput={(params: AutocompleteRenderInputParams) => (<>
                <TextField {...params} label="Product Name" />
            </>)
            } />
    );
}

export default AutoCompletionOptions;