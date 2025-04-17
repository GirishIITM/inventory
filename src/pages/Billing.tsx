import { useState, useEffect, useRef } from "react";
import DataGrid, { Column, SortColumn } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import "../styles/billing.css";
import { contexStateType, Row, } from "../types";
import { sortedRowsHanlder } from "../utils/Billing/billing";
import CustomModal from "../components/CustomModal";
import ContextMenu from "../components/Billing/ContextMenu";
import RowOperations from "../utils/Billing/rowOperations";
import { initRow, useBillingColumns, } from "../initSttates/billingState";

const BillingComponent = () => {
  const [rows, setRows] = useState<readonly Row[]>(initRow);
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const [selectedRows, setSelectedRows] = useState((): ReadonlySet<string> => new Set(),);
  const [grandTotal, setGrandTotal] = useState(0);
  const [currentRow, setCurrentRow] = useState<Row | null>(rows[0]);
  const [currentColumn, setCurrentColumn] = useState<Column<Row> | null>(null);
  const [contextMenu, setContextMenu] = useState<contexStateType>(null);
  const [isdeleteSingleRow, setDeleteSingleRow] = useState(false);
  const [isdeleteSelectedRows, setDeleteSelectedRows] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const sortedRows = sortedRowsHanlder(rows, sortColumns);
  const columns = useBillingColumns({ setCurrentRow, setCurrentColumn, rows, setRows, currentRow, currentColumn, rowIndex: 0 });

  // console.log("rows", rows, currentRow);

  const handleRowsChange = (updatedRows: readonly Row[]) => {
    updatedRows.forEach((row) => (row.total = row.price * row.quantity));
    setRows([...updatedRows]);
    setGrandTotal(updatedRows.reduce((acc, row) => acc + row.total, 0));
  };

  useEffect(() => {
    const handleClickOutside = () => { if (contextMenu) setContextMenu(null); };

    const handleKeyDown = (eventInfo: globalThis.KeyboardEvent) => {
      if (eventInfo.key === "Escape") {
        setContextMenu(null);
        setDeleteSelectedRows(false);
        setDeleteSingleRow(false);
      }
    };

    document.body.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [contextMenu]);

  const { addNewRowToLast, addNewRowToPrev, duplicateRowAddNext,
    deleteSelectedRows, handleCellKeyDown, handleRightClick, deleteSingleRow,
  } = RowOperations({
    rows, setRows, setCurrentRow, setDeleteSingleRow, setDeleteSelectedRows,
    setContextMenu, setSelectedRows, selectedRows,
    setCurrentColumn
  });

  const handleDelete = () => {
    if (isdeleteSelectedRows) deleteSelectedRows();
    if (isdeleteSingleRow) deleteSingleRow(currentRow as Row);
  };

  return (
    <div className="billing-grid">
      <CustomModal
        elementRef={modalRef} isOpen={isdeleteSingleRow || isdeleteSelectedRows}
        onClose={() => { setDeleteSingleRow(false); setDeleteSelectedRows(false); }}
      >
        <div className="delete-confirm-modal">
          <div>Are you sure you want to delete?</div>
          <button className="delete-button" onClick={() => handleDelete()}>
            Sure, delete
          </button>
        </div>
      </CustomModal>

      <DataGrid rowKeyGetter={(row) => row.id.toString()}
        columns={columns} rows={sortedRows}
        onSelectedCellChange={({ row }) => setCurrentRow(row)}
        defaultColumnOptions={{ sortable: true, resizable: true }}
        onCellKeyDown={handleCellKeyDown} onSelectedRowsChange={setSelectedRows}
        selectedRows={selectedRows} onRowsChange={handleRowsChange}
        sortColumns={sortColumns} onSortColumnsChange={setSortColumns}
        className="fill-grid" onCellContextMenu={handleRightClick}
      />

      <div className="summary-section">
        <button className="add-product-button" onClick={addNewRowToLast}>
          New Item
        </button>
        <div className="total-details">
          <div className="grand-total">Grand Total: {grandTotal}</div>
          <div className="item-count">Total Items: {sortedRows.length}</div>
        </div>
      </div>


      {contextMenu && (
        <ContextMenu addNewRowToNext={addNewRowToLast}
          addNewRowToPrev={addNewRowToPrev} contextMenu={contextMenu}
          setDeleteSelectedRows={setDeleteSelectedRows} duplicateRowAddNext={duplicateRowAddNext}
          setDeleteSingleRow={setDeleteSingleRow}
        />
      )}
    </div>
  );
};

export default BillingComponent;
