import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            state.items.push({ name, image, cost, quantity: 1 });
        }
        state.totalQuantity += 1;
    },
    removeItem(state, action) {
        const nameOfItemToRemove = action.payload;
        const existingItem = state.items.find(item => item.name === nameOfItemToRemove);
      
        if (existingItem) {
          state.totalQuantity -= existingItem.quantity; // Substract all these items
          state.items = state.items.filter(item => item.name !== nameOfItemToRemove);
        }
      },
    updateQuantity: (state, action) => {
        const { name, delta } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
            itemToUpdate.quantity += delta;
            state.totalQuantity += delta;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
