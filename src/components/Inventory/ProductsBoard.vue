<template>
  <Board>
    <q-card-section class="sticky-board-toolbar q-pa-sm">
      <q-toolbar>
        <q-input
          v-model="dataOptions.search"
          dense
          filled
          type="search"
          clearable
          placeholder="Search ..."
          debounce="300"
        />
        <q-space />
        <q-btn
          v-if="hasMultiSelect"
          icon="r_delete_forever"
          size="md"
          flat
          round
          color="red"
          @click="ConfirmAction"
          ><q-tooltip>Delete Selected</q-tooltip></q-btn
        >
        <q-btn color="green" flat dense icon="r_more_vert">
          <q-menu :offset="[60, 10]">
            <q-list style="min-width: 100px">
              <q-item v-if="mode === 0" clickable v-close-popup @click="AddNew">
                <q-item-section>Add New</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="GetMaster">
                <q-item-section>Refresh</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-card-section>

    <q-card-section>
      <!--  -->
      <q-table
        :grid="true"
        class="inline-grid-edit sticky-header"
        virtual-scroll
        :rows="items"
        :columns="columns"
        row-key="ProductId"
        hide-bottom
        table-header-class="grid-edit-header"
        :pagination="{ rowsPerPage: 0 }"
      >
        <template v-slot:item="props">
          <q-card
            flat
            class="q-mb-md"
            style="width: 100%"
            @dblclick="ShowEditor(props)"
          >
            <q-card-section class="grid-item q-pa-none" style="cursor: pointer">
              <div :class="{ 'q-item row q-pa-md': true, 'no-wrap': true }">
                <q-item-section
                  avatar
                  @click="props.row.isSelected = !props.row.isSelected"
                >
                  <ProfileAvatar
                    listmode
                    :selected="props.row.isSelected"
                    :src="props.row.Picture"
                    :text1="props.row.Name"
                    class="q-mb-auto q-mt-sm"
                  />
                </q-item-section>

                <q-item-section>
                  <div class="row">
                    <div class="col-12 col-sm-6 q-mt-sm">
                      <div class="col">
                        <strong>{{ `${props.row.Name}` }}</strong>
                      </div>
                      <div class="col">{{ props.row.Description }}</div>
                      <!-- <div class="col">
                        <q-chip
                          text-color="white"
                          color="primary"
                          dense
                          style="margin-left: -4px"
                          >{{ props.row.Position }}</q-chip
                        >
                      </div> -->
                    </div>
                    <div class="col-12 col-sm-6 q-mt-sm">
                      <div v-if="props.row.Email" class="col">
                        {{ `${props.row.Email}` }}
                      </div>
                    </div>
                  </div>
                </q-item-section>

                <q-item-section side>
                  <q-btn
                    class="q-mb-auto"
                    dense
                    flat
                    color="green"
                    dark
                    icon="r_edit"
                    size="sm"
                    round
                    @click.stop="ShowEditor(props)"
                  ></q-btn>
                </q-item-section>
              </div>
            </q-card-section>
          </q-card>
        </template>
        <template v-slot:body-cell="props">
          <q-td v-if="props.col.field === 'Action'" :props="props">
            <q-btn dense flat color="green" dark @click.stop="ShowEditor(props)"
              >Edit</q-btn
            >
            <q-btn
              dense
              flat
              color="green"
              dark
              @click.stop="ConfirmAction(props.row)"
              >Delete</q-btn
            >
          </q-td>
          <q-td v-else-if="props.col.field === 'Firstname'" :props="props">
            {{
              `${props.row.Lastname}, ${props.row.Firstname} ${props.row.Middlename}`
            }}
          </q-td>
          <q-td v-else-if="props.col.field === 'PayrollClassID'" :props="props">
            <q-chip
              dense
              text-color="white"
              :color="
                props.row.PayrollClassID === 1 ? 'deep-orange' : 'primary'
              "
              >{{
                `${getObjLabel(
                  payrollClass,
                  "value",
                  props.row.PayrollClassID,
                  "label"
                )}`
              }}</q-chip
            >
          </q-td>
          <q-td v-else :props="props">
            {{ props.value }}
          </q-td>
        </template>
      </q-table>

      <div class="flex flex-left" style="margin-top: 16px">
        <q-select
          bg-color="white"
          v-model="dataOptions.rowsPerPage"
          :options="[10, 20, 50]"
          emit-value
          dense
          hide-bottom-space
          hide-hint
          borderless
          style="margin-right: 16px; font-size: 12px; margin-left: 8px"
          popup-content-class="select-content"
        />

        <q-pagination
          v-model="dataOptions.currentPage"
          :max="maxPage"
          :max-pages="5"
          ellipses
        >
        </q-pagination>
      </div>
    </q-card-section>

    <EditProducts ref="editor" @refresh="GetMaster" position="right" :mode="mode" />
  </Board>
</template>

<style scoped>
</style>

<script>
import { ref, defineAsyncComponent, watch, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import general from "../../mixins/general";
import api from "../../api/index";
import { useRoute } from 'vue-router'

export default {
  name: "Products",
  components: {
    ProfileAvatar: defineAsyncComponent(() =>
      import("../General/ProfileAvatar.vue")
    ),
    Board: defineAsyncComponent(() => import("../General/Board.vue")),
    EditProducts: defineAsyncComponent(() => import("./EditProducts.vue")),
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const q = useQuasar();
    const { getObjLabel, hasSelectedItem } = general();
    const editor = ref(null);
    const mode = ref(0);

    const payrollClass = computed(() => store.getters["options/PayrollClass"]);
    const gridMode = computed(() => {
      if (q.screen.width < 550) return true;
      return false;
    });

    const hasMultiSelect = ref(false);

    const items = ref([]);

    watch(
      () => route.query.mode,
      () => {
        //console.warn(route.query.mode)
        mode.value = route.query.mode === undefined ? 0 : parseInt(route.query.mode);
      },{deep: true, immediate: true}
    )

    watch(
      () => mode.value,
      () => {
        
        if (mode.value === 1) store.dispatch("UpdateBoardTitle", "Sales Pricing");
        else if (mode.value === 2) store.dispatch("UpdateBoardTitle", "Purchasing Pricing");
        else if (mode.value === 3) store.dispatch("UpdateBoardTitle", "Standard Cost");
        else store.dispatch("UpdateBoardTitle", "Stock Master");

      }, {immediate: true, deep: true}
    )

    watch(
      items,
      () => {
        hasMultiSelect.value = hasSelectedItem(items.value);
      },
      { deep: true }
    );

    const columns = ref([
      {
        field: "Firstname",
        label: "Name",
        align: "left",
        width: "100%",
        minWidth: "200px",
      },
      {
        field: "EmployeeNo",
        label: "Employee No",
        minWidth: "150px",
        status: [1],
      },
      {
        field: "PayrollClassID",
        label: "Class",
        minWidth: "150px",
        status: [1],
      },
      {
        field: "Action",
        label: "",
        style: { width: "60px" },
        status: [1],
      },
    ]);

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
      api.InventoryGetAll(dataOptions.value).then((response) => {
        console.log(response.data);
        items.value = [...response.data.data];
        maxPage.value = Math.ceil(
          response.data.total.count / dataOptions.value.rowsPerPage
        );
      });
    };

    const ConfirmAction = () => {
      //version 2
      var x = [];
      items.value.forEach((element) => {
        if (element.isSelected) x.push(element.ID);
      });

      q.dialog({
        title: "Confirm",
        message: "Would you like to delete this record?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        api.EmployeeDelete(x).then((response) => {
          q.notify({
            type: response.data.result.success ? "positive" : "negative",
            message:
              response.data.result.message === null
                ? ""
                : response.data.result.message,
          });
          GetMaster();
        });
      });
    };

    watch(
      () => dataOptions,
      () => {
        //console.log('dataOptions', dataOptions, prevDataOptions)
        GetMaster();
      },
      { deep: true }
    );

    return {
      items,
      columns,
      dataOptions,
      maxPage,
      activeRowIndex,
      store,
      editor,
      gridMode,
      payrollClass,
      hasMultiSelect,
      mode,
      togglePeriod,
      GetMaster,
      ConfirmAction,
      getObjLabel,
    };
  },
  methods: {
    ShowEditor(data) {
      if (this.editor != null) {
        this.editor.EditItem(data.row.ProductId);
      }
    },
    AddNew() {
      if (this.editor != null) {
        this.editor.AddNew();
      }
    },
    Test() {
      console.log("Test");
    },
  },
  mounted() {
    this.store.dispatch("UpdateBoardTitle", "Stock Master");
    this.GetMaster();
  },
};
</script>
