export interface Cart {
    userId:   number;
    date:     Date;
    products: CartProduct[];
}

export interface ReturnedCart extends Cart {
    id: number;
}

export interface CartProduct {
    productId: number;
    quantity:  number;
}