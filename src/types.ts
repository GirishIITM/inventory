import { Dispatch, SetStateAction } from "react";
import { CalculatedColumn, Column } from "react-data-grid";

export interface productType {
  productName: string;
  company: string;
  mrpPrice: number;
  originalPrice: number;
  stocksLeft: number;
  originalStock: number;
  imageUrl: string;
}

export interface productJsonType {
  name: string;
  price: string;
  img: string;
}

export type contexStateType = {
  mouseX: number;
  mouseY: number;
  row: Row;
} | null;

export interface Row {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export type UseRowOperationsProps = {
  rows: readonly Row[];
  setRows: React.Dispatch<SetStateAction<readonly Row[]>>;
  setCurrentRow: React.Dispatch<React.SetStateAction<Row | null>>;
  setDeleteSingleRow: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteSelectedRows: React.Dispatch<React.SetStateAction<boolean>>;
  setContextMenu: React.Dispatch<
    SetStateAction<{ mouseX: number; mouseY: number; row: Row } | null>
  >;
  setSelectedRows: React.Dispatch<SetStateAction<ReadonlySet<string>>>;
  selectedRows: ReadonlySet<string>;
  setCurrentColumn: Dispatch<SetStateAction<Column<any, unknown> | null>>;
};

export interface Stock {
  id: number;
  name: string;
  price: number;
}

export interface ContextMenuState {
  mouseX: number;
  mouseY: number;
  row: Row;
}

export type setSuggestionsType = Dispatch<SetStateAction<suggestionsType>>;

export type AutoCompleteProps = {
  onRowChange: (row: Row) => void;
  onClose: () => void;
  column: CalculatedColumn<any, unknown>;
  row: Row;
  rowIndex: number;
  setCurrentRow: Dispatch<SetStateAction<Row | null>>;
  setCurrentColumn: Dispatch<SetStateAction<Column<any, unknown> | null>>;
  rows: readonly Row[];
  setRows: Dispatch<SetStateAction<readonly Row[]>>;
  currentRow: Row | null;
  currentColumn: Column<any, unknown> | null;
};

export type suggestionsType = {
  text: string;
  price: number;
  onClick: Function;
}[];

export type AutoCompletionOptionsProps = {
  suggestions: suggestionsType;
  currentRow: Row | null;
  setRows: Dispatch<SetStateAction<readonly Row[]>>;
  rows: readonly Row[];
};

export type billingStateType = {
  setCurrentRow: Dispatch<SetStateAction<Row | null>>;
  setCurrentColumn: Dispatch<SetStateAction<Column<Row> | null>>;
  rows: readonly Row[];
  setRows: Dispatch<SetStateAction<readonly Row[]>>;
  currentRow: Row | null;
  currentColumn: Column<any, unknown> | null;
  rowIndex: number;
};
