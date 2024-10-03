import { Row } from "../types";

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