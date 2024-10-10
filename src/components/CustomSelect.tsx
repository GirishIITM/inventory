import React from 'react';
import { Checkbox } from '@mui/material'; // Change this import based on your UI library
import { useRowSelection } from 'react-data-grid'; // Ensure this is imported from react-data-grid

interface SelectFormatterProps {
    row: {
        id: number;
        name: string;
        price: number;
        quantity: number;
        total: number;
    };
}

const SelectFormatter: React.FC<SelectFormatterProps> = ({ row }) => {
    const { isRowSelected, onRowSelectionChange } = useRowSelection();

    const isDisabled = row.price === 0;

    return (
        <Checkbox
            checked={isRowSelected}
            onChange={(event) => {
                onRowSelectionChange({ checked: event.target.checked, row, isShiftClick: false });
            }}
            disabled={isDisabled}
        />
    );
};

export default SelectFormatter;
