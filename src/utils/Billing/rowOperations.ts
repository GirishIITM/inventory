import toast from "react-hot-toast";
import { Row, UseRowOperationsProps } from "../../types";
import { CellKeyboardEvent } from "react-data-grid";

const RowOperations = ({
  rows,
  setRows,
  setCurrentRow,
  setDeleteSingleRow,
  setDeleteSelectedRows,
  setContextMenu,
  setSelectedRows,
  selectedRows,
}: UseRowOperationsProps) => {
  const getNewId = () =>
    rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 0;

  const addNewRowToLast = () =>
    setRows([
      ...rows,
      { id: getNewId(), name: "Unnamed" + rows.length, price: 0, quantity: 1, total: 0 },
    ]);

  const addNewRowToNext = (row: Row) => {
    const index = rows.findIndex((r) => r.id === row.id);
    setRows([
      ...rows.slice(0, index + 1),
      { id: getNewId(), name: "Unnamed" + rows.length, price: 0, quantity: 1, total: 0 },
      ...rows.slice(index + 1),
    ]);
  };

  const addNewRowToPrev = (row: Row) => {
    const index = rows.findIndex((r) => r.id === row.id);
    setRows([
      ...rows.slice(0, index),
      { id: getNewId(), name: "Unnamed" + rows.length, price: 0, quantity: 1, total: 0 },
      ...rows.slice(index),
    ]);
  };

  const duplicateRowAddNext = (row: Row) => {
    const index = rows.findIndex((r) => r.id === row.id);
    setRows([
      ...rows.slice(0, index + 1),
      { ...row, id: getNewId() },
      ...rows.slice(index + 1),
    ]);
  };

  const deleteSingleRow = async (row: Row) => {
    setRows(rows.filter((r) => r.id !== row.id));
    toast.success(`Deleted ${row.name}`, { duration: 2000 });
    setDeleteSingleRow(false);
  };

  const deleteSelectedRows = async () => {
    if (selectedRows.size > 0) {
      const updatedRows = rows.filter(
        (row) => !selectedRows.has(row.id.toString())
      );
      setRows(updatedRows);
      setSelectedRows(new Set());
      toast.success(`Deleted selected rows, { duration: 2000 }`);
      setDeleteSelectedRows(false);
    } else {
      toast.error("No row selected", { duration: 2000 });
    }
  };

  const handleRightClick = (
    cellInfo: { row: Row },
    eventInfo: React.MouseEvent
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
    cellInfo: { row: Row },
    eventInfo: CellKeyboardEvent
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
      setCurrentRow((_) => cellInfo.row);
      setDeleteSingleRow((_) => true);
    }
  };

  return {
    addNewRowToLast,
    addNewRowToNext,
    addNewRowToPrev,
    duplicateRowAddNext,
    deleteSingleRow,
    deleteSelectedRows,
    handleRightClick,
    handleCellKeyDown,
  };
};

export default RowOperations;
