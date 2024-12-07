import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ sortOrder }: { sortOrder: string }, { rejectWithValue }) => {
    try {
      const sortParam =
        sortOrder === "minmax" ? "price" : sortOrder === "maxmin" ? "-price" : "";
      const response = await axios.get(
        `https://eddaddba2babc833.mokky.dev/products${sortParam ? `?sortBy=${sortParam}` : ""}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Ошибка загрузки товаров.");
    }
  }
);
