import { useState, useMemo, useEffect, useRef } from "react";
import DataGrid, {
  Column,
  RenderEditCellProps,
  SelectColumn,
  SortColumn,
  textEditor,
} from "react-data-grid";
import "react-data-grid/lib/styles.css";
import "../styles/billing.css";
import toast from "react-hot-toast";
import { Row } from "../types";
import { getComparator } from "../utils/Billing/billing";
import CustomModal from "../components/CustomModal";
import AutoCompletionOptions from "../components/Billing/AutoComplete";
import ContextMenu from "../components/Billing/ContextMenu";
import RowOperations from "../utils/Billing/rowOperations";

const BillingComponent = () => {
  const [rows, setRows] = useState<readonly Row[]>([
    {
      id: 0,
      name: "Unnamed",
      price: 0,
      quantity: 1,
      total: 0,
    },
  ]);
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const [selectedRows, setSelectedRows] = useState(
    (): ReadonlySet<string> => new Set(),
  );
  const [grandTotal, setGrandTotal] = useState(0);
  const [currentRow, setCurrentRow] = useState<Row | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    row: Row;
  } | null>(null);
  const [isdeleteSingleRow, setDeleteSingleRow] = useState(false);
  const [isdeleteSelectedRows, setDeleteSelectedRows] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleRowsChange = (updatedRows: readonly Row[]) => {
    updatedRows.forEach((row) => (row.total = row.price * row.quantity));
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
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, sortColumns]);

  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu) setContextMenu(null);
    };

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


  const columns: Column<Row>[] = useMemo(
    () => [
      SelectColumn,
      { key: "id", name: "S.N.", editable: false, width: 50 },
      {
        key: "name", name: "Name", editable: true, renderEditCell: (params: RenderEditCellProps<Row, unknown>) => (
          <AutoCompletionOptions rows={rows} setRows={setRows} rowIndex={params.rowIdx} {...params} />
        )
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
    [],
  );

  const getNewId = () =>
    rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 0;

  const { addNewRowToLast, addNewRowToPrev, duplicateRowAddNext, deleteSelectedRows,
    handleCellKeyDown, handleRightClick } = RowOperations({
      getNewId, rows, setRows,
      setCurrentRow, setDeleteSingleRow,
      setDeleteSelectedRows, setContextMenu,
      setSelectedRows, selectedRows,
    })

  const deleteSingleRow = async (row: Row) => {
    const updatedRows = rows.filter((r) => r.id !== row.id);
    setRows(updatedRows);
    toast.success(`Deleted ${row.name}, { duration: 2000 }`);
    setDeleteSingleRow(false);
  };

  const handleDelete = () => {
    if (isdeleteSelectedRows) deleteSelectedRows();
    if (isdeleteSingleRow) deleteSingleRow(currentRow as Row);
  };

  return (
    <div className="billing-grid">
      <CustomModal
        elementRef={modalRef}
        isOpen={isdeleteSingleRow || isdeleteSelectedRows}
        onClose={() => {
          setDeleteSingleRow(false);
          setDeleteSelectedRows(false);
        }}
      >
        <div className="delete-confirm-modal">
          <div>Are you sure you want to delete?</div>
          <button className="delete-button" onClick={() => handleDelete()}>
            Sure, delete
          </button>
        </div>
      </CustomModal>

      <DataGrid
        rowKeyGetter={(row) => row.id.toString()}
        columns={columns}
        rows={sortedRows}
        defaultColumnOptions={{ sortable: true, resizable: true }}
        onCellKeyDown={handleCellKeyDown}
        onSelectedRowsChange={setSelectedRows}
        selectedRows={selectedRows}
        onRowsChange={handleRowsChange}
        sortColumns={sortColumns}
        onSortColumnsChange={setSortColumns}
        className="fill-grid"
        onCellContextMenu={handleRightClick}
      />

      <div className='summary-section'>
        <button className='add-product-button' onClick={addNewRowToLast}>New Item</button>
        <div className='total-details'>
          <div className='grand-total'>Grand Total: {grandTotal}</div>
          <div className='item-count'>Total Items: {sortedRows.length}</div>
        </div>
      </div>

      {contextMenu && <ContextMenu addNewRowToNext={addNewRowToLast} addNewRowToPrev={addNewRowToPrev}
        contextMenu={contextMenu} duplicateRowAddNext={duplicateRowAddNext}
        setDeleteSelectedRows={setDeleteSelectedRows} setDeleteSingleRow={setDeleteSingleRow} />
      }
    </div>
  );
};

export default BillingComponent;