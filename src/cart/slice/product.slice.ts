import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, ICart, Product } from "../../types/type";
import toast from 'react-hot-toast'
import { RootState } from "../../app/store";
import { stat } from "fs";

export interface ProductState {
    products: Product[],
    cart: ICart[],
    category: string[],
    // filter: {
    //     categories: string[],
    //     rating: {
    //         min: number,
    //         max: number
    //     }
    // }
    // filterProducts: Product[]
}

const initialState: ProductState = {
    category: [],
    products: [],
    cart: []
}

// export const fetchProduct= createAsyncThunk(
//     'get/products',
//     async () => await getProducts()
// )

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products  = action.payload
            const product = action.payload
            const uniq = Object();
            product.forEach(e => uniq[e.category] = 1);
            state.category = Object.keys(uniq);
            toast('Product fetched')
        },
        addCartItem :(state, action: PayloadAction<number>) => {
            const id = action.payload;
            const item = state.products.find(e => e.id === id);
            if(!item) {
                toast.error('Item does not exist');
                return
            }
            let _cartItemIndex = state.cart.findIndex(item => item.id === id);
            if(_cartItemIndex === -1) {
                const _cartItem : ICart = {
                    id: id,
                    quantity: 1
                } 
                state.cart.push(_cartItem)
            } else {
                state.cart[_cartItemIndex].quantity += 1                
            }
            toast.success('Item added to the cart')
        },
        removeCartItem: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const idx = state.products.findIndex(e => e.id === idx)
            if(idx != null) {
                state.cart.splice(idx,1)
                toast.success('Item remoed from the cart')
            } else {
                toast.error('Item does not esixt in the cart')
            }
        }
    }
    // ,extraReducers: (builder) => {
    //     builder
    //     .addCase(fetchProduct.pending, (state) => {
    //         state.productState = 'loading';
    //       })
    //       .addCase(fetchProduct.fulfilled, (state, action) => {
    //         state.productState = 'idle'
    //         state.products = action.payload;
    //         const uniq = Object()
    //         const product = action.payload
    //         product.forEach(e => uniq[e.category] = 1);
    //         state.category = Object.keys(uniq);
    //         toast('product fetching successed', {
    //             duration: 1000,
    //             position: "top-center"
    //         })
    //       })
    //       .addCase(fetchProduct.rejected, (state) => {
    //         state.productState = 'failed';
    //         state.products = [];
    //       })
    // }
})


export const {setProducts, addCartItem,removeCartItem} = productSlice.actions;

export const productCategiesSelector = (state: RootState) => state.products.category;
export const productSelector = (state: RootState) => state.products.products;
export const cartItems = (state: RootState) => {
    // item list - cart;
    // original items - products;
    const cartIds = state.products.cart, products = state.products.products;
    const cartItem: CartItem[] = [];
    
    cartIds.forEach(item => {
        cartItem.push({
            ...products.find(product => product.id === item.id) as Product,
            quantity: item.quantity
        })
    })

    // const val = cartIds.map(item => (
    //     {
    //         ...products.find(el => el.id === item.id) as Product,
    //         quantity: item.quantity
    //     }
    // ))
    return cartItem;
}
export default productSlice.reducer;