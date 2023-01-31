import { defineStore } from "pinia";

export const useTransaction = defineStore("transaction", {
  state: () => ({
   saved: [],
   charged: []
  }),

  getters: {
   Saved(state){
    return state.saved;
   }
  },

  actions: {
    Save(payload){
      this.saved.push(payload);
    }
  },
}, { persist: true});
