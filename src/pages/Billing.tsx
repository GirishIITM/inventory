import { t } from "i18next";
import "../styles/billing.css";
import React from "react";
import { trans } from "../utils/translations";
import { useBillingTable } from "../hooks/useBillingTable";
import TableHeader from "../components/Billing/TableHeader";
import TableRow from "../components/Billing/TableRow";
import ContextMenu from "../components/Billing/ContextMenu";
import { toast } from "react-hot-toast";

const BillingComponent: React.FC = () => {
  const {
    sortedItems,
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
  } = useBillingTable();

  const allSelected = sortedItems.length > 0 && selectedRows.length === sortedItems.length;

  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) {
      toast.error(t("No rows selected"));
      return;
    }
    removeSelectedRows();
    toast.success(t(`${selectedRows.length} row(s) deleted`));
  };

  return (
    <div className="billing-container">
      <div className="action-buttons">
        <button
          onClick={() => addRow()}
          className="add-btn"
        >
          {t(trans.addRow)}
        </button>
        {selectedRows.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="add-btn"
            style={{ backgroundColor: "var(--color-danger)", color: "white" }}
          >
            {t(trans.deleteSelected)} ({selectedRows.length})
          </button>
        )}
      </div>

      <div className="table-wrapper">
        <table className="billing-table">
          <TableHeader
            sortConfig={sortConfig}
            requestSort={requestSort}
            selectAllRows={selectAllRows}
            allSelected={allSelected}
          />
          <tbody>
            {sortedItems.map((item, idx) => (
              <TableRow
                key={item.id}
                item={item}
                index={idx}
                handleChange={handleChange}
                removeRow={removeRow}
                calculateRowTotal={calculateRowTotal}
                isSelected={selectedRows.includes(item.id)}
                toggleRowSelection={toggleRowSelection}
                i18nIsDynamicList={true}
                handleContextMenu={handleContextMenu}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="right-align">
                {t(trans.totalAmount)}
              </td>
              <td className="right-align">₹ {calculateGrandTotal()}</td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <ContextMenu
        contextMenu={contextMenu}
        addRow={addRow}
        duplicateRow={duplicateRow}
        removeRow={removeRow}
        removeSelectedRows={removeSelectedRows}
        closeContextMenu={closeContextMenu}
        selectedRows={selectedRows}
      />

      <div className="footer">
        <span>{sortedItems.length} item{sortedItems.length !== 1 && "s"}</span>
      </div>
    </div>
  );
};

export default BillingComponent;
