import { Row } from "../types";

export const getComparator = (sortColumn: string) => {
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