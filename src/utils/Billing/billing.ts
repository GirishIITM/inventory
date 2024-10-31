import { useMemo } from "react";
import { Row } from "../../types";
import { SortColumn } from "react-data-grid";

export const getComparator = (sortColumn: string) => {
    const comparators = {
        id: (a: Row, b: Row) => a.id - b.id,
        name: (a: Row, b: Row) => a.name.localeCompare(b.name),
        price: (a: Row, b: Row) => a.price - b.price,
        quantity: (a: Row, b: Row) => a.quantity - b.quantity,
        total: (a: Row, b: Row) => a.total - b.total,
    };
    type SortColumn = keyof typeof comparators;
    if (!(sortColumn in comparators))
        throw new Error(`unsupported sortColumn: "${sortColumn}"`);
    return comparators[sortColumn as SortColumn];
};

export const sortedRowsHanlder = (rows: readonly Row[], sortColumns: readonly SortColumn[]) => useMemo((): readonly Row[] => {

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
}, [rows, sortColumns])
