import { useEffect, useRef } from 'react';
import autocomplete, { AutocompleteItem } from 'autocompleter';
import '../../styles/auto_complete.css';

// Sample product data for suggestions
const sampleProducts = [
  { id: 1, name: 'Cadbury Dairy Milk Chocolate Bar', price: 40 },
  { id: 2, name: 'Amul Chocomini Chocolate', price: 25 },
  { id: 3, name: 'KIT KAT Minis', price: 30 },
  { id: 4, name: 'Nestlé Munch Chocolate', price: 15 },
  { id: 5, name: 'Ferrero Rocher Moments', price: 120 },
  { id: 6, name: 'Sunfeast Dark Fantasy Choco Fills', price: 45 },
  { id: 7, name: 'Britannia Good Day Cashew Cookies', price: 30 },
  { id: 8, name: 'Parle G Gold', price: 25 },
  { id: 9, name: 'Fortune Sunlite Refined Sunflower Oil', price: 150 },
  { id: 10, name: 'Patanjali Pure Mustard Oil', price: 180 }
];

interface Product {
  id: number;
  name: string;
  price: number;
}

// Extend the Product interface with the AutocompleteItem to prevent TypeScript warnings
type ProductItem = Product & AutocompleteItem;

interface AutoCompletionEditorProps {
  value: string;
  onChange: (value: string, price?: number) => void;
  onBlur?: () => void;
  onClick?: (e: React.MouseEvent) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AutoCompletionEditor = ({
  value,
  onChange,
  onBlur,
  onClick,
  placeholder = "Type product name...",
  className = "",
  style = {}
}: AutoCompletionEditorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const autoCompleteInstance = autocomplete<ProductItem>({
      input: inputRef.current,
      emptyMsg: 'No products found',
      minLength: 1,
      fetch: (text: string, update: (items: ProductItem[]) => void) => {
        // Filter products based on input text
        const filteredProducts = sampleProducts.filter(product => 
          product.name.toLowerCase().includes(text.toLowerCase())
        ) as ProductItem[];
        
        update(filteredProducts);
      },
      onSelect: (item: ProductItem) => {
        onChange(item.name, item.price);
      },
      render: function(item: ProductItem, _currentValue: string): HTMLDivElement {
        const itemElement = document.createElement('div');
        itemElement.className = 'autocomplete-item';
        
        const nameElement = document.createElement('div');
        nameElement.textContent = item.name;
        
        const priceElement = document.createElement('div');
        priceElement.textContent = `₹${item.price}`;
        priceElement.style.marginLeft = 'auto';
        
        itemElement.appendChild(nameElement);
        itemElement.appendChild(priceElement);
        
        return itemElement;
      }
    });
    
    // Clean up the autocomplete instance on component unmount
    return () => {
      autoCompleteInstance.destroy();
    };
  }, [onChange]);

  // Handle changes to the input value
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={className}
        style={{ width: '100%', padding: '8px', ...style }}
        onClick={onClick}
      />
    </div>
  );
};
