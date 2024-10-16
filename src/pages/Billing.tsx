import { useState, useMemo, useEffect, useRef } from "react";
import DataGrid, {
  CellClickArgs,
  CellKeyboardEvent,
  CellKeyDownArgs,
  CellMouseEvent,
  Column,
  SelectColumn,
  SortColumn,
  textEditor,
} from "react-data-grid";
import "react-data-grid/lib/styles.css";
import "../styles/billing.css";
import toast from "react-hot-toast";
import { Row } from "../types";
import { getComparator } from "../utils/billing";
import CustomModal from "../components/CustomModal";

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
      { key: "name", name: "Name", editable: true, renderEditCell: textEditor },
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

  const addNewRowToLast = () =>
    setRows([
      ...rows,
      { id: getNewId(), name: "", price: 0, quantity: 1, total: 0 },
    ]);

  const addNewRowToNext = (row: Row) => {
    const index = rows.findIndex((r) => r.id === row.id);
    setRows([
      ...rows.slice(0, index + 1),
      { id: getNewId(), name: "", price: 0, quantity: 1, total: 0 },
      ...rows.slice(index + 1),
    ]);
  };

  const addNewRowToPrev = (row: Row) => {
    const index = rows.findIndex((r) => r.id === row.id);
    setRows([
      ...rows.slice(0, index),
      { id: getNewId(), name: "", price: 0, quantity: 1, total: 0 },
      ...rows.slice(index),
    ]);
  };

  const duplicateRowAddNext = (row: Row) => {
    const index = rows.findIndex((r) => r.id === row.id);
    setRows([
      ...rows.slice(0, index + 1),
      {
        id: getNewId(),
        name: row.name,
        price: row.price,
        quantity: row.quantity,
        total: row.total,
      },
      ...rows.slice(index + 1),
    ]);
  };

  const deleteSingleRow = async (row: Row) => {
    const updatedRows = rows.filter((r) => r.id !== row.id);
    setRows(updatedRows);
    toast.success(`Deleted ${row.name}`, { duration: 2000 });
    setDeleteSingleRow(false);
  };

  const deleteSelectedRows = async () => {
    if (selectedRows.size > 0) {
      const updatedRows = rows.filter(
        (row) => !selectedRows.has(row.id.toString()),
      );
      setRows(updatedRows);
      setSelectedRows(new Set());
      toast.success(`Deleted selected rows`, { duration: 2000 });
      setDeleteSelectedRows(false);
    } else {
      toast.error("No row selected", { duration: 2000 });
    }
  };

  const handleRightClick = (
    cellInfo: CellClickArgs<NoInfer<Row>, unknown>,
    eventInfo: CellMouseEvent,
  ) => {
    eventInfo.preventDefault();
    setCurrentRow(cellInfo.row);
    setContextMenu({
      mouseX: eventInfo.clientX - 2,
      mouseY: eventInfo.clientY - 4,
      row: cellInfo.row,
    });
  };

  const handleCellKeyDown = (
    cellInfo: CellKeyDownArgs<NoInfer<Row>, unknown>,
    eventInfo: CellKeyboardEvent,
  ) => {
    if (eventInfo.ctrlKey && eventInfo.key === "Enter")
      addNewRowToNext(cellInfo.row);
    if (eventInfo.ctrlKey && eventInfo.shiftKey && eventInfo.key === "Enter")
      addNewRowToPrev(cellInfo.row);
    if (!eventInfo.ctrlKey && eventInfo.shiftKey && eventInfo.key === "Enter")
      addNewRowToLast();
    if (eventInfo.altKey && eventInfo.key === "Enter")
      duplicateRowAddNext(cellInfo.row);
    if (eventInfo.key === "Delete") {
      setCurrentRow(cellInfo.row);
      setDeleteSingleRow(true);
    }
  };

  const handleDelete = () => {
    if (isdeleteSelectedRows) deleteSelectedRows();
    if (isdeleteSingleRow) deleteSingleRow(currentRow as Row);
  };

  const handleContextMenuAction = async (action: string) => {
    if (!contextMenu?.row) return;
    switch (action) {
      case "addNext":
        addNewRowToNext(contextMenu.row);
        break;
      case "addPrev":
        addNewRowToPrev(contextMenu.row);
        break;
      case "duplicate":
        duplicateRowAddNext(contextMenu.row);
        break;
      case "delete":
        setDeleteSingleRow(() => true);
        break;
      case "deleteRows":
        setDeleteSelectedRows(true);
        break;
      default:
        break;
    }
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

      {contextMenu && (
        <ul
          className="context-menu"
          style={{ top: contextMenu.mouseY, left: contextMenu.mouseX }}
        >
          <li
            className="context-menu-item"
            onClick={() => handleContextMenuAction("addPrev")}
          >
            Add Row Before
          </li>
          <li
            className="context-menu-item"
            onClick={() => handleContextMenuAction("addNext")}
          >
            Add Row After
          </li>
          <li
            className="context-menu-item"
            onClick={() => handleContextMenuAction("duplicate")}
          >
            Duplicate Row
          </li>
          <li
            className="context-menu-item"
            onClick={() => handleContextMenuAction("delete")}
          >
            Delete Row
          </li>
          <li
            className="context-menu-item"
            onClick={() => handleContextMenuAction("deleteRows")}
          >
            Delete Selected Rows
          </li>
        </ul>
      )}
    </div>
  );
};

export default BillingComponent;
