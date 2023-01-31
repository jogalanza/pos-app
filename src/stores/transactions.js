import { defineStore } from "pinia";

export const useTransaction = defineStore("transaction", {
  state: () => ({
   saved: [],
   charged: []
  }),

  getters: {
   
  },

  actions: {
    Save(payload){
      this.saved.push(payload);
    }
  },
}, { persist: true});
