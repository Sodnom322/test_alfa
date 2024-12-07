import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from './ProductsThunk';
import { IProduct, ProductsState } from '../../types';


const initialState: ProductsState = {
  items: [],
  favorites: [],
  isLoading: false,
  error: null,
  currentPage: 1, 
  itemsPerPage: 6, 
    sortOrder: "default"
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.favorites.includes(productId)) {
        state.favorites = state.favorites.filter((id) => id !== productId);
      } else {
        state.favorites.push(productId);
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter((product) => product.id !== productId);
    },
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.items.push(action.payload);
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setSortOrder(state, action: PayloadAction<"default" | "minmax" | "maxmin">) {
      state.sortOrder = action.payload;
    },
    updateProduct: (state, action: PayloadAction<IProduct>) => {
      const updatedProduct = action.payload;
      const index = state.items.findIndex((item) => item.id === updatedProduct.id);
      if (index !== -1) {
        state.items[index] = updatedProduct;
      }}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleFavorite, deleteProduct, addProduct,setPage ,setSortOrder,updateProduct} = productsSlice.actions;
export default productsSlice.reducer;
