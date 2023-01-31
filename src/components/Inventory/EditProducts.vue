<template>
  <DialogWindow ref="dialog" title="Edit" persistent>
    <template v-slot:titlebar>
      <q-btn
        v-if="mode === 0"
        color="green"
        icon="r_done"
        round
        class="q-pl-sm q-pr-sm"
        @click="SaveChanges"
        ><q-tooltip>Save Changes</q-tooltip></q-btn
      >
    </template>

    <template v-slot:default>
      <q-card-section v-if="item.EmployeeId > 0" class="column items-center">
        <ProfileAvatar
          :src="item.Picture"
          :text1="item.FullName"
          :empid="item.EmployeeId"
          @refresh="UpdatePhoto()"
        />
        <q-item-label header>
          {{ displayName }}
        </q-item-label>
        <q-item-label caption>
          {{ `${item.ContactNo ? item.ContactNo : ``}` }}
        </q-item-label>
      </q-card-section>
      <q-card-section v-if="mode === 1">
        <SalesPricing ref="salesPricing" flat />
      </q-card-section>

      <q-card-section v-if="mode === 2">
        <PurchasingPricing ref="purchasingPricing" flat />
      </q-card-section>

      <q-card-section v-if="mode === 0">
        <div class="row justify-center">
          <div class="col-12">
            <q-card>
              <q-card-section class="q-pa-none">
                <q-list>
                  <q-expansion-item
                    label="General Information"
                    header-class="board-expansion-header bg-white"
                    expand-separator
                    group="group"
                    default-opened
                  >
                    <q-card>
                      <q-card-section>
                        <div class="row q-mb-sm">
                          <div class="col-12">
                            <div class="column">
                              <div class="col">
                                <q-input
                                  v-model="item.SKU"
                                  class="q-mr-sm q-mb-sm"
                                  label="SKU"
                                  filled
                                  dense
                                ></q-input>
                              </div>
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="column">
                              <div class="col">
                                <q-input
                                  v-model="item.Name"
                                  class="q-mr-sm q-mb-sm"
                                  label="Name"
                                  filled
                                  dense
                                ></q-input>
                              </div>
                              <div class="col">
                                <q-input
                                  v-model="item.Description"
                                  class="q-mr-sm q-mb-sm"
                                  label="Description"
                                  filled
                                  dense
                                ></q-input>
                              </div>
                              <div class="col">
                                <q-select
                                  v-model="item.CategoryId"
                                  :options="stockCategory"
                                  option-label="label"
                                  option-value="value"
                                  map-options
                                  emit-value
                                  class="q-mr-sm q-mb-sm"
                                  label="Category"
                                  filled
                                  dense
                                ></q-select>
                              </div>
                              <div class="col">
                                <q-select
                                  v-model="item.TaxTypeId"
                                  :options="taxTypes"
                                  map-options
                                  emit-value
                                  class="q-mr-sm q-mb-sm"
                                  label="Item Tax Type"
                                  filled
                                  dense
                                ></q-select>
                              </div>
                              <div class="col">
                                <q-select
                                  v-model="item.MBFlag"
                                  :options="itemTypes"
                                  map-options
                                  emit-value
                                  class="q-mr-sm q-mb-sm"
                                  label="Item Type"
                                  filled
                                  dense
                                ></q-select>
                              </div>
                              <div class="col">
                                <q-select
                                  v-model="item.Units"
                                  :options="itemUnits"
                                  map-options
                                  emit-value
                                  class="q-mr-sm q-mb-sm"
                                  label="Unit of Measure"
                                  filled
                                  dense
                                ></q-select>
                              </div>
                              <div class="col">
                                <q-checkbox
                                  v-model="item.Editable"
                                  class="q-mr-sm q-mb-sm"
                                  label="Editable Description"
                                  :true-value="1"
                                  :false-value="0"
                                  filled
                                  dense
                                ></q-checkbox>
                              </div>
                              <div class="col">
                                <q-checkbox
                                  v-model="item.NoSale"
                                  class="q-mr-sm q-mb-sm"
                                  label="Exclude from Sales"
                                  :true-value="1"
                                  :false-value="0"
                                  filled
                                  dense
                                ></q-checkbox>
                              </div>
                              <div class="col">
                                <q-checkbox
                                  v-model="item.NoPurchase"
                                  class="q-mr-sm q-mb-sm"
                                  label="Exclude from Purchases"
                                  :true-value="1"
                                  :false-value="0"
                                  filled
                                  dense
                                ></q-checkbox>
                              </div>
                              <div class="col">
                                <q-checkbox
                                  v-model="item.Inactive"
                                  class="q-mr-sm q-mb-sm"
                                  label="Inactive"
                                  color="red"
                                  :true-value="1"
                                  :false-value="0"
                                  filled
                                  dense
                                ></q-checkbox>
                              </div>
                            </div>
                          </div>
                          <!-- <div class="col-12">
                            <div class="column">
                              <div class="col">
                                <q-input
                                  v-model="item.DateOfBirth"
                                  class="q-mr-sm q-mb-sm"
                                  label="Date Of Birth"
                                  filled
                                  dense
                                  type="date"
                                ></q-input>
                              </div>
                            </div>
                          </div> -->
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>

                  <q-expansion-item
                    label="GL Accounts"
                    header-class="board-expansion-header bg-white"
                    expand-separator
                    group="group"
                  >
                    <q-card>
                      <q-card-section>
                        <div class="row q-mb-sm">
                          <div class="col-12">
                            <div class="column">
                              <div class="col">
                                <SelectAccount
                                  label="Sales Account"
                                  v-model="item.SalesAcct"
                                  :options="chartMaster"
                                  map-options
                                  emit-value
                                />
                              </div>
                              <div class="col">
                                <SelectAccount
                                  label="Inventory Account"
                                  v-model="item.InventoryAcct"
                                  :options="chartMaster"
                                  map-options
                                  emit-value
                                />
                              </div>
                              <div class="col">
                                <SelectAccount
                                  label="C.O.G.S. Account"
                                  v-model="item.COGSAcct"
                                  :options="chartMaster"
                                  map-options
                                  emit-value
                                />
                              </div>
                              <div class="col">
                                <SelectAccount
                                  label="Inventory Adjustment Account"
                                  v-model="item.AdjustmentAcct"
                                  :options="chartMaster"
                                  map-options
                                  emit-value
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>

                  <q-expansion-item
                    v-if="item.ProductId > 0"
                    label="Sales Pricing"
                    header-class="board-expansion-header bg-white"
                    expand-separator
                    group="group"
                    @show="GetSalesPricing(item.ProductId)"
                  >
                    <SalesPricing ref="salesPricing" />
                  </q-expansion-item>

                  <q-expansion-item
                    v-if="item.ProductId > 0"
                    label="Purchasing Pricing"
                    header-class="board-expansion-header bg-white"
                    expand-separator
                    group="group"
                    @show="GetPurchPricing(item.ProductId)"
                  >
                    <PurchasingPricing ref="purchasingPricing" />
                  </q-expansion-item>

                  <q-expansion-item
                    v-if="item.ProductId > 0"
                    label="Standard Costs"
                    header-class="board-expansion-header bg-white"
                    expand-separator
                    group="group"
                  >
                    <q-card>
                      <q-card-section>
                        <div class="row q-mb-sm">
                          <div class="col-12">
                            <q-input
                              v-model="item.MaterialCost"
                              prefix="Php"
                              class="q-mr-sm q-mb-sm"
                              label="Unit Cost"
                              filled
                              dense
                              type="number"
                            ></q-input>
                          </div>
                          <div v-if="item.MBFlag === 'M'" class="col-12">
                            <q-input
                              v-model="item.LaborCost"
                              prefix="Php"
                              class="q-mr-sm q-mb-sm"
                              label="Standard Labor Cost Per Unit"
                              filled
                              dense
                              type="number"
                            ></q-input>
                          </div>
                          <div v-if="item.MBFlag === 'M'" class="col-12">
                            <q-input
                              v-model="item.OverheadCost"
                              prefix="Php"
                              class="q-mr-sm q-mb-sm"
                              label="Standard Overhead Cost Per Unit"
                              filled
                              dense
                              type="number"
                            ></q-input>
                          </div>
                          <div class="col-12">
                            <q-input
                              v-model="item.Memo"
                              class="q-mr-sm q-mb-sm"
                              label="Memo"
                              filled
                              dense
                              type="textarea"
                            ></q-input>
                          </div>
                          <div class="col-12">
                            <q-btn
                              class="q-mr-sm q-mb-sm"
                              label="Update"
                              color="green"
                              filled
                              dense
                              style="width: calc(100% - 8px)"
                            ></q-btn>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>

                  <q-expansion-item
                    v-if="item.ProductId > 0"
                    label="Reorder Levels"
                    header-class="board-expansion-header bg-white"
                    expand-separator
                    group="group"
                  >
                    <q-card>
                      <q-card-section>
                        <div class="row q-mb-sm">
                          <div class="col-12">
                            <div class="column">
                              <div class="col">
                                <q-input
                                  v-model="item.FullName"
                                  class="q-mr-sm q-mb-sm"
                                  label="Full Name"
                                  filled
                                  dense
                                ></q-input>
                              </div>
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="column">
                              <div class="col">
                                <q-input
                                  v-model="item.Address"
                                  class="q-mr-sm q-mb-sm"
                                  label="Address"
                                  filled
                                  dense
                                ></q-input>
                              </div>
                              <div class="col">
                                <q-input
                                  v-model="item.ContactNo"
                                  class="q-mr-sm q-mb-sm"
                                  label="Contact Number"
                                  filled
                                  dense
                                ></q-input>
                              </div>
                            </div>
                          </div>
                          <!-- <div class="col-12">
                            <div class="column">
                              <div class="col">
                                <q-input
                                  v-model="item.DateOfBirth"
                                  class="q-mr-sm q-mb-sm"
                                  label="Date Of Birth"
                                  filled
                                  dense
                                  type="date"
                                ></q-input>
                              </div>
                            </div>
                          </div> -->
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </template>
  </DialogWindow>
</template>

<style scoped>
</style>

<script>
import {
  ref,
  computed,
  defineAsyncComponent,
  onMounted,
  onBeforeMount,
} from "vue";
import { useStore } from "vuex";
import api from "../../api/index";
//import optionsApi from "../../api/options";
import general from "../../mixins/general";
import { useQuasar } from "quasar";

export default {
  name: "EditProducts",
  components: {
    SelectAccount: defineAsyncComponent(() =>
      import("../General/SelectAccount.vue")
    ),
    SalesPricing: defineAsyncComponent(() => import("./SalesPricing.vue")),
    PurchasingPricing: defineAsyncComponent(() =>
      import("./PurchasingPricing.vue")
    ),
    ProfileAvatar: defineAsyncComponent(() =>
      import("../General/ProfileAvatar.vue")
    ),
    DialogWindow: defineAsyncComponent(() =>
      import("../General/DialogWindow.vue")
    ),
  },
  props: {
    mode: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    console.log("Context", props, context);
    const store = useStore();
    const q = useQuasar();
    const { formatCurrency } = general();
    const dialog = ref(null);
    const salesPricing = ref(null);
    const purchasingPricing = ref(null);

    const dataOptions = ref({
      search: null,
      productStatus: 1,
      site: null,
      currentPage: 1,
      rowsPerPage: 10,
    });

    const displayName = computed(() => {
      if (item.value === null) return "";
      var x = `${
        item.value.FullName !== null ? `${item.value.FullName}` : ``
      } `;
      return x;
    });

    const editItem = ref(-1);
    const item = ref({});
    const activeRowIndex = ref(1);

    const stockCategory = computed(
      () => store.getters["options/StockCategory"]
    );
    const taxTypes = computed(() => store.getters["options/TaxTypes"]);
    const itemTypes = computed(() => store.getters["options/ItemTypes"]);
    const itemUnits = computed(() => store.getters["options/ItemUnits"]);
    const chartMaster = computed(() => store.getters["options/ChartMaster"]);

    onBeforeMount(() => {
      store.dispatch("options/GetChartMaster");
    });

    onMounted(() => {
      console.log(".");
    });

    const FillData = (data) => {
      //adhoc fills here...

      return { ...data };
    };

    const GetInfo = (show) => {
      api.InventoryGetInfo(editItem.value).then((response) => {
        item.value = { ...response.data.data };
        if (dialog.value !== null && show) dialog.value.Show();
      });
    };

    const GetSalesPricing = (id) => {
      if (salesPricing.value)
        salesPricing.value.GetPricing(
          id !== undefined ? id : item.value.ProductId
        );
    };

    const GetPurchPricing = (id) => {
      if (purchasingPricing.value)
        purchasingPricing.value.GetPricing(
          id !== undefined ? id : item.value.ProductId
        );
    };

    const EditItem = (data) => {
      editItem.value = data;
      if (props.mode === 0) {
        GetInfo(true);
      } else if (props.mode === 1) {
        console.log(purchasingPricing.value);
        if (dialog.value !== null) dialog.value.Show();
        setTimeout(() => {
          GetSalesPricing(data);
        }, 1000);
      } else if (props.mode === 2) {
        if (dialog.value !== null) dialog.value.Show();
        setTimeout(() => {
          GetPurchPricing(data);
        }, 1000);
      }
    };

    const SaveChanges = () => {
      api.InventorySave(item.value).then((response) => {
        q.notify({
          type: response.data.success ? "positive" : "negative",
          message: response.data.message === null ? "" : response.data.message,
          html: true,
        });
        context.emit("refresh");
        if (response.data.success) dialog.value.Hide();
      });
    };

    const AddNew = () => {
      api.InventoryGetInfo(-1).then((response) => {
        item.value = FillData(response.data.data);
        dialog.value.Show();
      });
    };

    const UpdatePhoto = () => {
      GetInfo();
      context.emit("refresh");
    };

    return {
      item,
      displayName,
      dataOptions,
      activeRowIndex,
      stockCategory,
      taxTypes,
      itemTypes,
      itemUnits,
      chartMaster,
      store,
      formatCurrency,
      dialog,
      EditItem,
      SaveChanges,
      AddNew,
      GetInfo,
      UpdatePhoto,
      salesPricing,
      purchasingPricing,
      GetSalesPricing,
      GetPurchPricing,
    };
  },
  emits: ["refresh"],
  mounted() {},
};
</script>
