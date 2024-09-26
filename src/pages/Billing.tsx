import { useState, useMemo } from 'react';
import DataGrid, { Column, SortColumn, textEditor } from 'react-data-grid';
import { faker } from '@faker-js/faker';
import 'react-data-grid/lib/styles.css';

interface Row {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

const fakeRows = (): readonly Row[] => {
  const rows: Row[] = [];

  for (let i = 0; i < 10; i++) {
    const quantity = Math.floor(Math.random() * 10) + 1;
    const price = parseFloat((Math.random() * 100).toFixed(2));
    rows.push({
      id: i,
      name: faker.commerce.productName(),
      price,
      quantity,
      total: parseFloat((price * quantity).toFixed(2)),
    });
  }

  return rows;
};

const getComparator = (sortColumn: string) => {
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

const BillingComponent = () => {
  const [rows, setRows] = useState(fakeRows());
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const [selectedRows, setSelectedRows] = useState((): ReadonlySet<string> => new Set());

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortColumns.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === 'ASC' ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, sortColumns]);

  const columns: Column<Row>[] = useMemo(() => [
    { key: 'name', name: 'Name', editable: true, renderEditCell: textEditor },
    { key: 'price', name: 'Price', editable: true, renderEditCell: textEditor },
    { key: 'quantity', name: 'Quantity', editable: true, renderEditCell: textEditor },
    { key: 'total', name: 'Total', editable: false },
  ], []);

  return (
    <DataGrid
      rowKeyGetter={(row: Row) => row.id.toString()}
      columns={columns}
      rows={sortedRows}
      defaultColumnOptions={{
        sortable: true,
        resizable: true,
      }}
      onSelectedRowsChange={setSelectedRows}
      selectedRows={selectedRows}
      onRowsChange={setRows}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
      className="fill-grid"
    />
  );
};

export default BillingComponent;
