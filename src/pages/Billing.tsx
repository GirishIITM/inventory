import { useState, useMemo, useEffect, } from 'react';
import type { KeyboardEvent } from 'react';
import DataGrid, { Column, SortColumn, textEditor } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import "../styles/billing.css"

interface Row {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

const getComparator = (sortColumn: string) => {
  switch (sortColumn) {
    case 'name':
      return (a: Row, b: Row) => a.name.localeCompare(b.name);
    case 'price':
    case 'quantity':
    case 'total':
      return (a: Row, b: Row) => a[sortColumn] - b[sortColumn];
    default:
      throw new Error(`unsupported sortColumn: "${sortColumn}"`);
  }
};

const BillingComponent = () => {
  const [rows, setRows] = useState<readonly Row[]>([{
    id: 0,
    name: 'Unnamed',
    price: 0,
    quantity: 1,
    total: 0,
  }]);
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const [selectedRows, setSelectedRows] = useState((): ReadonlySet<string> => new Set());
  const [grandTotal, setGrandTotal] = useState(0);
  const [currentRow, setCurrentRow] = useState<Row | null>(null);

  const handleRowsChange = (updatedRows: readonly Row[]) => {
    updatedRows.forEach(row => row.total = row.price * row.quantity);
    setRows([...updatedRows]);
    setGrandTotal(updatedRows.reduce((acc, row) => acc + row.total, 0));
  };

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortColumns.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === 'ASC' ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, sortColumns]);

  const columns: Column<Row>[] = useMemo(() => [
    { key: 'name', name: 'Name', editable: true, renderEditCell: textEditor },
    { key: 'price', name: 'Price', editable: true, renderEditCell: textEditor },
    { key: 'quantity', name: 'Quantity', editable: true, renderEditCell: textEditor },
    { key: 'total', name: 'Total', editable: false },
  ], []);

  const addNewRow = () => setRows([...rows, { id: rows.length, name: '', price: 0, quantity: 1, total: 0, }]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') addNewRow();
  };

  return (
    <div className='billing-grid' onKeyDown={handleKeyDown}>
      <DataGrid
        rowKeyGetter={(row: Row) => row.id.toString()}
        columns={columns}
        rows={sortedRows}
        defaultColumnOptions={{
          sortable: true,
          resizable: true,
        }}
        onCellKeyDown={e=>{
          console.log(e.rowIdx)
        }}
        onSelectedRowsChange={setSelectedRows}
        selectedRows={selectedRows}
        onRowsChange={handleRowsChange}
        sortColumns={sortColumns}
        onSortColumnsChange={setSortColumns}
        className="fill-grid"
      />
      <button onClick={addNewRow}>
        New Item
      </button>
      <div className='grand-total'>
        Grand Total: {grandTotal}
      </div>
    </div>
  );
};

export default BillingComponent;
