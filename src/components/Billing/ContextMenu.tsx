import "../../styles/components/contextMenu.css";
import { ContextMenuState, BillingItem } from '../../types';
import { t } from 'i18next';
import { trans } from '../../utils/translations';

interface ContextMenuProps {
  contextMenu: ContextMenuState;
  addRow: (position: 'end' | 'after' | 'before', referenceRow?: BillingItem) => void;
  duplicateRow: (row: BillingItem) => void;
  removeRow: (id: number) => void;
  removeSelectedRows: () => void;
  closeContextMenu: () => void;
  selectedRows: number[];
}

export default function ContextMenu({
  contextMenu,
  addRow,
  duplicateRow,
  removeRow,
  removeSelectedRows,
  closeContextMenu,
  selectedRows
}: ContextMenuProps) {
  if (!contextMenu.visible || !contextMenu.selectedRow) return null;
  
  const handleContextMenuAction = (action: string) => {
    if (!contextMenu.selectedRow) return;
    
    switch (action) {
      case "addAfter":
        addRow('after', contextMenu.selectedRow);
        break;
      case "addBefore":
        addRow('before', contextMenu.selectedRow);
        break;
      case "duplicate":
        duplicateRow(contextMenu.selectedRow);
        break;
      case "delete":
        removeRow(contextMenu.selectedRow.id);
        break;
      case "deleteSelected":
        removeSelectedRows();
        break;
      default:
        break;
    }
    
    closeContextMenu();
  };

  const hasMultipleSelected = selectedRows.length > 1;

  return (
    <div 
      className="context-menu"
      style={{ 
        top: contextMenu.y, 
        left: contextMenu.x,
        display: contextMenu.visible ? 'block' : 'none'
      }}
      onClick={(e) => e.stopPropagation()} // Prevent clicking from closing the menu
    >
      <ul>
        <li
          className="context-menu-item"
          onClick={() => handleContextMenuAction("addBefore")}
        >
          {t(trans.addRowBefore)}
        </li>
        <li
          className="context-menu-item"
          onClick={() => handleContextMenuAction("addAfter")}
        >
          {t(trans.addRowAfter)}
        </li>
        <li
          className="context-menu-item"
          onClick={() => handleContextMenuAction("duplicate")}
        >
          {t(trans.duplicateRow)}
        </li>
        <li className="context-menu-divider"></li>
        <li
          className="context-menu-item"
          onClick={() => handleContextMenuAction("delete")}
        >
          {t(trans.deleteRow)}
        </li>
        {hasMultipleSelected && (
          <li
            className="context-menu-item"
            onClick={() => handleContextMenuAction("deleteSelected")}
          >
            {t(trans.deleteSelectedRows)} ({selectedRows.length})
          </li>
        )}
      </ul>
    </div>
  );
}
