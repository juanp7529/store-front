import React, {createContext, useReducer, useContext, useEffect} from 'react';
import {Product} from "../interfaces/product-interface";

type WishlistState = {
    wishlist: Product[];
};

type WishlistAction =
    | { type: 'ADD_TO_WISHLIST'; product: Product }
    | { type: 'REMOVE_FROM_WISHLIST'; productId: number };

const WishlistContext = createContext<{
    state: WishlistState;
    dispatch: React.Dispatch<WishlistAction>;
} | undefined>(undefined);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            const productWithDate = action.product.dateAdded ? action.product : {
                ...action.product,
                dateAdded: new Date()
            };
            return {wishlist: [...state.wishlist, productWithDate]};
        case 'REMOVE_FROM_WISHLIST':
            return {wishlist: state.wishlist.filter(product => product.id !== action.productId)};
        default:
            return {
                wishlist: state.wishlist,
            };
    }
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [state, dispatch] = useReducer(wishlistReducer, {wishlist: []});

    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            const parsedWishlist: Product[] = (JSON.parse(savedWishlist)).map((product: Product) => {
                return {
                    ...product,
                    dateAdded: product.dateAdded ? new Date(product.dateAdded) : new Date()
                }
            });

            parsedWishlist.forEach(product => {
                dispatch({type: 'ADD_TO_WISHLIST', product});
            });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    }, [state.wishlist]);

    return (
        <WishlistContext.Provider value={{state, dispatch}}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('Hubo un error al guardar el producto en la lista de deseos');
    }
    return context;
};