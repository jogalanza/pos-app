<template></template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "EditSalesPricing",
  setup() {
    const item = ref({});

    const SaveChanges = () => {};

    return {
      item,
      SaveChanges,
    };
  },
});
</script>