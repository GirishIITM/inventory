import { Dispatch, SetStateAction } from "react";
import { CalculatedColumn } from "react-data-grid";

export interface ProductType {
  productName: string;
  company: string;
  mrpPrice: number;
  originalPrice: number;
  stocksLeft: number;
  originalStock: number;
  imageUrl: string;
  description?: string;
}

export type productType = ProductType;

export interface productJsonType {
  name: string;
  price: string;
  img: string;
}

// Billing related types
export interface BillingItem {
  id: number;
  product: string;
  price: number;
  quantity: number;
}

export type SortDirection = 'asc' | 'desc' | 'none';

export interface SortConfig {
  key: keyof BillingItem | null;
  direction: SortDirection;
}

// Context menu related types
export interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  selectedRow: BillingItem | null;
}

// Type for keyboard shortcuts
export type KeyboardShortcut = {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
};

export type contexStateType = {
  mouseX: number;
  mouseY: number;
} | null

export interface Stock {
  id: number;
  name: string;
  price: number;
}

export type suggestionsType = Stock[] | null;

export type setSuggestionsType = Dispatch<SetStateAction<suggestionsType>>

export type AutoCompleteProps = {
  onClose: () => void,
  column: CalculatedColumn<any, unknown>,
  rowIndex: number,
  setSuggestions: setSuggestionsType
}
