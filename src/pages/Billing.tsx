import { useState, useMemo, } from 'react';
import DataGrid, { CellKeyboardEvent, CellKeyDownArgs, Column, renderCheckbox, SelectColumn, SortColumn, textEditor } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import "../styles/billing.css"
import { Modal } from '@mui/material';
import toast from 'react-hot-toast';
import { Row } from '../types';
import { getComparator } from '../utils/billing';

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
  const [deleteModal, setDeleteModal] = useState(false);

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
    SelectColumn,
    { key: 'id', name: 'S.N.', editable: false, width: 50 },
    { key: 'name', name: 'Name', editable: true, renderEditCell: textEditor },
    { key: 'price', name: 'Price', editable: true, type: 'number', renderEditCell: textEditor },
    { key: 'quantity', name: 'Quantity', editable: true, type: 'number', renderEditCell: textEditor },
    { key: 'total', name: 'Total', editable: false },
  ], []);

  const getNewId = () => rows.length > 0 ? Math.max(...rows.map(row => row.id)) + 1 : 0;

  const addNewRowToLast = () => setRows([...rows, { id: getNewId(), name: '', price: 0, quantity: 1, total: 0 }]);

  const addNewRowToNext = (row: Row) => {
    const index = rows.findIndex(r => r.id === row.id);
    setRows([
      ...rows.slice(0, index + 1),
      { id: getNewId(), name: '', price: 0, quantity: 1, total: 0 },
      ...rows.slice(index + 1),
    ]);
  };

  const addNewRowToPrev = (row: Row) => {
    const index = rows.findIndex(r => r.id === row.id);
    setRows([
      ...rows.slice(0, index),
      { id: getNewId(), name: '', price: 0, quantity: 1, total: 0 },
      ...rows.slice(index),
    ]);
  };

  const handleDelete = () => {
    if (selectedRows.size > 0) {
      const updatedRows = rows.filter(row => !selectedRows.has(row.id.toString()));
      setRows(updatedRows);
      setSelectedRows(new Set());
      toast.success(`Deleted selected rows`, { duration: 2000 });
    } else {
      toast.error('No row selected', { duration: 2000 });
    }
    setDeleteModal(false);
  };


  const handleKeyDown = (cellInfo: CellKeyDownArgs<NoInfer<Row>, unknown>, eventInfo: CellKeyboardEvent) => {
    if (eventInfo.ctrlKey && eventInfo.key === 'Enter') addNewRowToNext(cellInfo.row);
    if (eventInfo.ctrlKey && eventInfo.shiftKey && eventInfo.key === 'Enter') addNewRowToPrev(cellInfo.row);
    if (!eventInfo.ctrlKey && eventInfo.shiftKey && eventInfo.key === 'Enter') addNewRowToLast();
    if (eventInfo.key === 'Delete') {
      setCurrentRow(cellInfo.row);
    }
  };

  console.log(selectedRows)

  return (
    <div className='billing-grid'>
      <Modal open={deleteModal} onClose={() => setCurrentRow(null)}
      ><div className='delete-confirm-modal'>
          <div> are you sure you want to delete {currentRow?.name}?  </div>
          <button className='delete-button' autoFocus onClick={() => handleDelete()} onKeyDown={e => e.key === "Enter" && handleDelete()}>sure delete</button>
        </div></Modal>
      <DataGrid
        rowKeyGetter={(row: Row) => row.id.toString()}
        columns={columns} rows={sortedRows}
        defaultColumnOptions={{ sortable: true, resizable: true, }}
        onCellKeyDown={handleKeyDown} onSelectedRowsChange={setSelectedRows}
        selectedRows={selectedRows} onRowsChange={handleRowsChange}
        sortColumns={sortColumns} onSortColumnsChange={setSortColumns}
        className="fill-grid"
      />
      <button onClick={addNewRowToLast}> New Item </button>
      <button onClick={() => setDeleteModal(true)}>Delete</button>
      <div className='grand-total'> Grand Total: {grandTotal} </div>
    </div>
  );
};

export default BillingComponent;
