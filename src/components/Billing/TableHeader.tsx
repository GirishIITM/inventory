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
        <th>{t(trans.sl)}</th>
        <th onClick={() => requestSort('product')} className="sortable-header">
          {t(trans.product)} {getSortIcon('product')}
        </th>
        <th onClick={() => requestSort('price')} className="sortable-header">
          {t(trans.price)} {getSortIcon('price')}
        </th>
        <th onClick={() => requestSort('quantity')} className="sortable-header">
          {t(trans.quantity)} {getSortIcon('quantity')}
        </th>
        <th onClick={() => requestSort('totalPrice')} className="sortable-header">
          {t(trans.totalPrice)} {getSortIcon('totalPrice')}
        </th>
        <th>{t(trans.actions)}</th>
      </tr>
    </thead>
  );
};

export default TableHeader;