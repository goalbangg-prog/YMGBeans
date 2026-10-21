import { configureStore, createSlice } from '@reduxjs/toolkit';

// 교안 13-end: createSlice → reducers → cart.actions → configureStore
let cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem(state, action) {
      let num = state.findIndex((a) => a.id === action.payload.id);
      let count = Math.max(1, Math.min(99, Math.floor(Number(action.payload.count) || 1)));
      if (num !== -1) state[num].count = Math.min(99, state[num].count + count);
      else state.push({ ...action.payload, count });
    },
    addCount(state, action) {
      let num = state.findIndex((a) => a.id === action.payload);
      if (num !== -1 && state[num].count < 99) state[num].count++;
    },
    decreaseCount(state, action) {
      let num = state.findIndex((a) => a.id === action.payload);
      if (num !== -1 && state[num].count > 1) state[num].count--;
    },
    deleteItem(state, action) {
      let num = state.findIndex((a) => a.id === action.payload);
      if (num !== -1) state.splice(num, 1);
    },
    sortName(state) { state.sort((a, b) => a.name.localeCompare(b.name, 'ko')); },
    clearCart() { return []; }
  }
});

let favorites = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    toggleFavorite(state, action) {
      let num = state.indexOf(action.payload);
      if (num !== -1) state.splice(num, 1);
      else state.push(action.payload);
    }
  }
});

export let { addItem, addCount, decreaseCount, deleteItem, sortName, clearCart } = cart.actions;
export let { toggleFavorite } = favorites.actions;
export const cartReducer = cart.reducer;
export default configureStore({ reducer: { cart: cart.reducer, favorites: favorites.reducer } });
