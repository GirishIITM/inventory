import React from 'react';
import { BillingItem } from '../../types';
import { AutoCompletionEditor } from './AutoComplete';
import '../../styles/auto_complete.css';

interface TableRowProps {
  item: BillingItem;
  index: number;
  handleChange: (id: number, field: keyof Omit<BillingItem, "id">, value: string) => void;
  removeRow: (id: number) => void;
  calculateRowTotal: (price: number, quantity: number) => string;
  isSelected: boolean;
  toggleRowSelection: (id: number, isMultiSelect: boolean, isShiftSelect: boolean) => void;
  handleContextMenu: (e: React.MouseEvent, row: BillingItem) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  item,
  index,
  handleChange,
  removeRow,
  calculateRowTotal,
  isSelected,
  toggleRowSelection,
  handleContextMenu
}) => {
  // Handle product name and price update from autocomplete
  const handleProductChange = (value: string, price?: number) => {
    handleChange(item.id, "product", value);
    if (price !== undefined) {
      handleChange(item.id, "price", price.toString());
    }
  };

  return (
    <tr 
      key={item.id} 
      className={isSelected ? 'selected-row' : ''} 
      onClick={(e) => toggleRowSelection(item.id, e.ctrlKey || e.metaKey, e.shiftKey)}
      onContextMenu={(e) => handleContextMenu(e, item)}
    >
      <td className="checkbox-cell">
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={() => toggleRowSelection(item.id, false, false)}
          onClick={(e) => {
            e.stopPropagation(); // Prevent row click from triggering
            toggleRowSelection(item.id, e.ctrlKey || e.metaKey, e.shiftKey);
          }}
        />
      </td>
      <td>{index + 1}</td>
      <td className="product-cell">
        <AutoCompletionEditor
          value={item.product}
          onChange={handleProductChange}
          onClick={(e) => e.stopPropagation()} // Prevent row click from triggering
          style={{ padding: '4px' }} // Match the styling of other inputs
        />
      </td>
      <td>
        <input
          type="number"
          value={item.price}
          onChange={(e) => handleChange(item.id, "price", e.target.value)}
          step="0.01"
          onClick={(e) => e.stopPropagation()} // Prevent row click from triggering
        />
      </td>
      <td>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => handleChange(item.id, "quantity", e.target.value)}
          onClick={(e) => e.stopPropagation()} // Prevent row click from triggering
        />
      </td>
      <td className="right-align">₹ {calculateRowTotal(item.price, item.quantity)}</td>
      <td>
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent row click from triggering
            removeRow(item.id);
          }} 
          className="remove-btn"
        >
          ✕
        </button>
      </td>
    </tr>
  );
};

export default TableRow;