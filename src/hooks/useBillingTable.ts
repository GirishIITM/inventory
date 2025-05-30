import { useState, useCallback, useEffect, KeyboardEvent } from "react";
import { BillingItem, SortConfig } from "../types";

export const useBillingTable = () => {
  // Core state
  const [items, setItems] = useState<BillingItem[]>([
    { id: 1, product: "", price: 0, quantity: 1 },
  ]);
  
  // Selection state
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [lastSelectedRow, setLastSelectedRow] = useState<number | null>(null);
  
  // Context menu state 
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    selectedRow: BillingItem | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    selectedRow: null,
  });

  // Sorting state
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'none'
  });

  // Handle sort
  const requestSort = (key: keyof BillingItem) => {
    let direction: 'asc' | 'desc' | 'none' = 'asc';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = 'none';
      } else {
        direction = 'asc';
      }
    }
    
    setSortConfig({ key, direction });
  };

  // Sort items
  const sortedItems = useCallback(() => {
    const itemsCopy = [...items];
    if (sortConfig.key && sortConfig.direction !== 'none') {
      itemsCopy.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return itemsCopy;
  }, [items, sortConfig]);

  // Handle row changes
  const handleChange = (
    id: number,
    field: keyof Omit<BillingItem, "id">,
    value: string
  ) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
          ...item,
          [field]: field === "product" ? value : parseFloat(value) || 0,
        }
        : item
    );
    setItems(updatedItems);
  };

  // Row operations
  const addRow = (position: 'end' | 'after' | 'before' = 'end', referenceRow?: BillingItem) => {
    const newId = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const newRow = { id: newId, product: "", price: 0, quantity: 1 };
    
    if (position === 'end' || !referenceRow) {
      setItems([...items, newRow]);
    } else if (position === 'after') {
      const index = items.findIndex(item => item.id === referenceRow.id);
      if (index !== -1) {
        const newItems = [...items];
        newItems.splice(index + 1, 0, newRow);
        setItems(newItems);
      }
    } else if (position === 'before') {
      const index = items.findIndex(item => item.id === referenceRow.id);
      if (index !== -1) {
        const newItems = [...items];
        newItems.splice(index, 0, newRow);
        setItems(newItems);
      }
    }
    
    return newId;
  };

  const duplicateRow = (row: BillingItem) => {
    const newId = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const newRow = { ...row, id: newId };
    
    const index = items.findIndex(item => item.id === row.id);
    if (index !== -1) {
      const newItems = [...items];
      newItems.splice(index + 1, 0, newRow);
      setItems(newItems);
    }
  };

  const removeRow = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
    setSelectedRows(selectedRows.filter(rowId => rowId !== id));
  };

  const removeSelectedRows = () => {
    if (selectedRows.length > 0) {
      setItems(items.filter(item => !selectedRows.includes(item.id)));
      setSelectedRows([]);
    }
  };

  // Selection operations
  const toggleRowSelection = (id: number, isMultiSelect: boolean, isShiftSelect: boolean) => {
    if (isShiftSelect && lastSelectedRow !== null) {
      // Handle shift+click for range selection
      const allIds = items.map(item => item.id);
      const currentIndex = allIds.indexOf(id);
      const lastIndex = allIds.indexOf(lastSelectedRow);
      
      if (currentIndex !== -1 && lastIndex !== -1) {
        // Get all ids between lastSelectedRow and current id (inclusive)
        const startIndex = Math.min(currentIndex, lastIndex);
        const endIndex = Math.max(currentIndex, lastIndex);
        const idsToSelect = allIds.slice(startIndex, endIndex + 1);
        
        // Create a new selection including the existing selected rows
        const newSelection = isMultiSelect 
          ? Array.from(new Set([...selectedRows, ...idsToSelect])) // Add to existing selection
          : idsToSelect; // Replace existing selection
          
        setSelectedRows(newSelection);
      }
    } else if (isMultiSelect) {
      // Handle ctrl+click for individual toggle
      setSelectedRows(prevSelected => 
        prevSelected.includes(id)
          ? prevSelected.filter(rowId => rowId !== id)
          : [...prevSelected, id]
      );
      setLastSelectedRow(id);
    } else {
      // Handle regular click for single selection
      setSelectedRows(prevSelected => 
        prevSelected.includes(id) && prevSelected.length === 1
          ? []
          : [id]
      );
      setLastSelectedRow(id);
    }
  };

  const selectAllRows = () => {
    if (selectedRows.length === items.length) {
      setSelectedRows([]);
      setLastSelectedRow(null);
    } else {
      setSelectedRows(items.map(item => item.id));
      setLastSelectedRow(items.length > 0 ? items[0].id : null);
    }
  };

  // Context menu operations
  const handleContextMenu = (e: React.MouseEvent, row: BillingItem) => {
    e.preventDefault();
    
    // If the row is not already selected, select only this row
    if (!selectedRows.includes(row.id)) {
      setSelectedRows([row.id]);
      setLastSelectedRow(row.id);
    }
    
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      selectedRow: row
    });
  };

  const closeContextMenu = () => {
    setContextMenu({
      visible: false,
      x: 0,
      y: 0,
      selectedRow: null
    });
  };

  // Calculations
  const calculateRowTotal = (price: number, quantity: number) => {
    return (price * quantity).toFixed(2);
  };

  const calculateGrandTotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  }, [items]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      // Ctrl+Enter: Add new row at the end
      if (e.key === 'Enter' && e.ctrlKey && !e.shiftKey) {
        addRow();
      }
      
      // Ctrl+Shift+Enter: Add new row before first selected
      if (e.key === 'Enter' && e.ctrlKey && e.shiftKey && selectedRows.length > 0) {
        const firstSelectedId = selectedRows[0];
        const firstSelectedRow = items.find(item => item.id === firstSelectedId);
        if (firstSelectedRow) {
          addRow('before', firstSelectedRow);
        }
      }
      
      // Delete: Remove selected rows
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedRows.length > 0) {
        removeSelectedRows();
      }
    };

    window.addEventListener('keydown', handleKeyDown as unknown as EventListener);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown as unknown as EventListener);
    };
  }, [items, selectedRows]);

  // Click outside to close context menu
  useEffect(() => {
    const handleClickOutside = () => {
      closeContextMenu();
    };

    if (contextMenu.visible) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenu.visible]);

  return {
    items,
    sortedItems: sortedItems(),
    selectedRows,
    contextMenu,
    sortConfig,
    handleChange,
    addRow,
    duplicateRow,
    removeRow,
    removeSelectedRows,
    toggleRowSelection,
    selectAllRows,
    handleContextMenu,
    closeContextMenu,
    requestSort,
    calculateRowTotal,
    calculateGrandTotal
  };
};