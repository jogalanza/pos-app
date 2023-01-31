<template>
  <div class="about text-center">
    <h4>Sample POS App</h4>
    <h7>Built with VueJS, Quasar UI Components</h7>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { useMainStore } from '../stores';
export default {
  setup() {
    const store = useMainStore();
    onMounted(() => {
      store.UpdateBoardTitle("About");
    });
  },
}
</script>
