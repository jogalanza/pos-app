import { defineStore } from "pinia";

export const useProduct = defineStore("product", {
  state: () => ({
    products: [
      { id: 1, name: "Apples", price: 29.99, imgUrl: "https://www.seekpng.com/png/detail/217-2178049_green-apple-png-free-commercial-use-image-manzana.png",  code: "00001" },
      { id: 2, name: "Oranges", price: 35.00, imgUrl: "d", code: "00002" },
      { id: 3, name: "Lemons", price: 40.00, imgUrl: "d", code: "00003" }
    ]
  }),

  getters: {
    Products(state) {
      return [...state.products]
    },
  },

  actions: {
    
  },
});
