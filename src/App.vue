<template>
  <router-view :class="{ 'dark-mode': darkMode }"></router-view>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: "App",

  components: {},

  setup() {

    onMounted(() => {      
      //
    });

    return {
    };
  },
};
</script>
