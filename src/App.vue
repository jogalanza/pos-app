<template>
  <router-view :class="{ 'dark-mode': darkMode }"></router-view>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: "App",

  components: {},

  setup() {
    const store = useStore()
    const darkMode = computed(() => store.getters["DarkMode"])

    onMounted(() => {      
      var x = window.localStorage.getItem('darkMode');
      store.dispatch("UpdateDarkMode", x)
    });

    return {
      darkMode,
    };
  },
};
</script>
