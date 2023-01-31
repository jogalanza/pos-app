<template>
  <q-card flat class="row justify-center main-board">
    <q-card class="col-12 inner-board">
      <q-card-section v-if="loading" class="q-pa-none" style="height:4px">
        <q-linear-progress  indeterminate />
      </q-card-section>
      <slot></slot>
    </q-card>
  </q-card>
</template>

<style scoped>
</style>

<script>
import { watch } from "vue"
import { useMainStore } from "../../stores/index"
import { useQuasar } from "quasar";

export default {
  name: "Board",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    }
  },
  setup(props) {  
    const store = useMainStore();
    const q = useQuasar();

    watch(props, () => {
      store.UpdateBoardTitle(props.title);
    }, { deep: true, immediate: true })
    return {
      q
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>
