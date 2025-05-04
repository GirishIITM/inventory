import React from 'react';
import { BillingItem, SortConfig } from '../../types';
import { t } from 'i18next';
import { trans } from '../../utils/translations';

interface TableHeaderProps {
  sortConfig: SortConfig;
  requestSort: (key: keyof BillingItem | 'totalPrice') => void;
  selectAllRows: () => void;
  allSelected: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  sortConfig,
  requestSort,
  selectAllRows,
  allSelected
}) => {

  const getSortIcon = (columnKey: keyof BillingItem | 'totalPrice' | null) => {
    if (sortConfig.key === columnKey) {
      if (sortConfig.direction === 'asc') {
        return '↑';
      } else if (sortConfig.direction === 'desc') {
        return '↓';
      }
    }
    return '⇅';
  };

  return (
    <thead>
      <tr>
        <th className="select-all">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={selectAllRows}
            title="Select all rows"
          />
        </th>
        {[
          { key: null, label: trans.sl },
          { key: 'product', label: trans.product },
          { key: 'price', label: trans.price },
          { key: 'quantity', label: trans.quantity },
          { key: 'totalPrice', label: trans.totalPrice },
          { key: null, label: trans.actions }
        ].map((column, index) => (
          <th
            key={index}
            onClick={() => column.key ? requestSort(column.key as any) : undefined}
            className={column.key ? "sortable-header" : ""}
          >
            {t(column.label)} {column.key ? getSortIcon(column.key as any) : ''}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;