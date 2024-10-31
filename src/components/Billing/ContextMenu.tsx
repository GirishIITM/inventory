import React from 'react'
import { ContextMenuState, Row } from '../../types';

export default function ContextMenu({
    contextMenu,
    setDeleteSingleRow,
    setDeleteSelectedRows,
    addNewRowToNext,
    addNewRowToPrev,
    duplicateRowAddNext
}: {
    contextMenu: ContextMenuState;
    setDeleteSingleRow: React.Dispatch<React.SetStateAction<boolean>>;
    setDeleteSelectedRows: React.Dispatch<React.SetStateAction<boolean>>;
    addNewRowToNext: (row: Row) => void;
    addNewRowToPrev: (row: Row) => void;
    duplicateRowAddNext: (row: Row) => void;
}) {


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
    )
}
