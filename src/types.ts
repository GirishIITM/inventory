
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

export interface Row {
    id: number;
    name: string;
    price: number;
    quantity: number;
    total: number;
}