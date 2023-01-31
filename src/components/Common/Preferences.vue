<template>
  <Board>
    <q-toolbar>

    </q-toolbar>
    <q-card-section>
      <div class="board-toggle-filter">
          <span class="fine-print-1 col-12 col-sm-4" style="min-width: 50px">Theme</span>
          <q-space />
          <q-btn-toggle
            class="col-12 col-sm-8"
            v-model="theme"
            toggle-color="green"
            :options="themes"
            dense
            padding="2px 12px"
          />
        </div>
    </q-card-section>

  </Board>
</template>

<style scoped>
</style>

<script>
import { ref, watch, defineAsyncComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import general from "../../mixins/general";
import api from "../../api/index";

export default {
  name: "ErrorList",
  components: {
    Board: defineAsyncComponent(() => import("../General/Board.vue")),
  },
  setup() {
    const store = useStore();
    const q = useQuasar();
    const { getObjLabel } = general();

    const theme = ref(0);
    const themes = ref([
      { label: "Light", value: 0 },
      { label: "Dark", value: 1 },
    ]);

    

    watch(
      () => theme.value,
      () => {
        store.dispatch("UpdateDarkMode", theme.value)
      }
    )
    
    const items = ref([]);

    const maxPage = ref(1);
    const dataOptions = ref({
      search: null,
      productStatus: 1,
      site: null,
      currentPage: 1,
      rowsPerPage: 10,
    });

    const activeRowIndex = ref(1);

    const togglePeriod = (event) => {
      console.log(event);
    };

    const GetMaster = () => {
      api.PayrollClassGetAll(dataOptions.value).then((response) => {
        items.value = [...response.data.result.payload.data];
        maxPage.value = Math.ceil(
          response.data.result.payload.total / dataOptions.value.rowsPerPage
        );
      });
    };

    const ConfirmAction = (data) => {
      console.log({...data})
      q.dialog({
        title: 'Confirm',
        message: 'Would you like to delete this record?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        api.PayrollClassDelete([data.ID])
        .then((response) => {
          q.notify({
            type: response.data.result.success ? 'positive' : 'negative',
            message: response.data.result.message === null ? '' : response.data.result.message
          })
          GetMaster()
        })
      })
    }

    watch(
      () => dataOptions,
      () => {
        //console.log('dataOptions', dataOptions, prevDataOptions)
        GetMaster();
      },
      { deep: true }
    );

    onMounted(() => {
      console.log(store.state.darkMode)
      theme.value = store.state.darkMode;
    });

    return {
      theme,
      themes,
      dataOptions,
      maxPage,
      activeRowIndex,
      store,
      togglePeriod,
      GetMaster,
      ConfirmAction,
      getObjLabel,
    };
  },
  methods: {
    ShowEditor(data) {
      if (this.editor != null) {
        this.editor.EditItem(data.row);
      }
    },
    AddNew(){
      if (this.editor != null) {
        this.editor.AddNew();
      }
    },
    Test() {
      console.log("Test");
    },
  },
  mounted() {
    this.store.dispatch("UpdateBoardTitle", "Preferences");
  },
};
</script>
