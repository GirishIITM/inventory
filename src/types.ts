import { Dispatch, SetStateAction } from "react";
import { CalculatedColumn } from "react-data-grid";

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
} | null

export interface Row {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

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

export type setSuggestionsType = Dispatch<SetStateAction<suggestionsType>>

export type AutoCompleteProps = {
  onRowChange: (row: Row) => void,
  onClose: () => void,
  column: CalculatedColumn<any, unknown>,
  row: Row,
  rowIndex: number,
  setSuggestions: setSuggestionsType
  suggestions: suggestionsType
}

export type suggestionsType = { text: string, onClick: Function }[]
export type AutoCompletionOptionsProps = { suggestions: suggestionsType }
