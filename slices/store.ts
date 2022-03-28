import { ProductResponse, Product, Material } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Store {
  products: Record<string, Product>;
  shop: Record<string, Material>;
}

export const initialState: Store = {
  products: {},
  shop: {},
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addProducts: (
      state: Store,
      { payload }: PayloadAction<{ products: ProductResponse[] }>
    ) => {
      let products = payload.products.reduce((prev, next) => {
        return {
          ...prev,
          [next.id]: {
            ...next,
            amount: 1,
            craftable: Boolean(next.materials.length),
            owned: false,
          },
        };
      }, {});

      state.products = products;
    },

    updateProduct: (
      state: Store,
      { payload }: PayloadAction<{ product: Product }>
    ) => {
      state.products = {
        ...state.products,
        [payload.product.id]: payload.product,
      };
    },

    craftProduct: (
      state: Store,
      { payload }: PayloadAction<{ id: string }>
    ) => {
      const product = state.products[payload.id];

      let materials = product.materials.reduce((prev, next) => {
        let product = state.products[next.productID];

        return {
          ...prev,
          [next.productID]: { ...product, amount: product.amount - next.count }, //decrease count of materials used
        };
      }, {});

      state.products = {
        ...state.products,
        ...materials,
        [product.id]: { ...product, amount: product.amount + 1 }, //increase count of crafted product
      };
    },

    addItemsToStore: (
      state: Store,
      { payload }: PayloadAction<{ items: Material[] }>
    ) => {
      let items = payload.items.reduce((prev, next) => {
        if (state.products[next.productID].craftable) {
          //Skip craftable materials
          return prev;
        }

        let count = (state.shop[next.productID]?.count || 0) + next.count; //Add count if it already exist in the store

        return { ...prev, [next.productID]: { ...next, count } };
      }, {});

      state.shop = { ...state.shop, ...items };
    },

    removeStoreItem: (
      state: Store,
      { payload }: PayloadAction<{ id: string }>
    ) => {
      const { [payload.id]: removedItem, ...rest } = state.shop;
      state.shop = rest;
    },

    clearStore: (state: Store) => {
      state.shop = {};
    },
  },
});

export const {
  addProducts,
  updateProduct,
  craftProduct,
  addItemsToStore,
  removeStoreItem,
  clearStore,
} = storeSlice.actions;

export default storeSlice.reducer;
