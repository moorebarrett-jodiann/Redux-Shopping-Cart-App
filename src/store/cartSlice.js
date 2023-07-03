import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false,
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            // check if the item is already added to cart
            const existingItem = state.itemsList.find((item) => item.id === newItem.id);
            if(existingItem){
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            } else {
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name
                });
            }
            // increment total quantity of items
            state.totalQuantity++;
        },
        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.itemsList.find((item) => item.id === id);
            if(existingItem.quantity === 1){
                // filter the array and grab all items that do not equal to the id
                state.itemsList = state.itemsList.filter((item) => item.id !== id);
                state.totalQuantity--;
            }
            else if(existingItem.quantity > 1) {
                // decrement quantity count
                // decrement running total
                existingItem.quantity--;
                state.totalQuantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        },
        setShowCart(state, action) {
            state.showCart = !state.showCart;
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;