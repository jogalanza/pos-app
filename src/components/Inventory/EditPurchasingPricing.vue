<template>
  <DialogWindow ref="dialog" title="Purchasing Pricing">
    <template v-slot:titlebar>
      <q-btn
        color="green"
        icon="r_done"
        round
        class="q-pl-sm q-pr-sm"
        @click="SaveChanges"
        ><q-tooltip>Save Changes</q-tooltip></q-btn
      >
    </template>

    <template v-slot:default>
      <q-card-section>
        <div class="row">
          <div class="col-12">
            <q-select
              v-model="item.SupplierId"
              :options="suppliers"
              map-options
              emit-value
              class="q-mr-sm q-mb-sm"
              label="Supplier"
              filled
              dense
              type="number"
            ></q-select>
          </div>
          <div class="col-12">
            <q-input
              v-model="item.Price"
              prefix="Php"
              class="q-mr-sm q-mb-sm"
              label="Price"
              filled
              dense
              type="number"
            ></q-input>
          </div>
          <div class="col-12">
            <q-select
              v-model="item.SupplierUOM"
              :options="itemUnits"
              map-options
              emit-value
              class="q-mr-sm q-mb-sm"
              label="Supplier Unit of Measure"
              filled
              dense
            ></q-select>
          </div>
          <div class="col-12">
            <q-input
              v-model="item.ConversionFactor"
              class="q-mr-sm q-mb-sm"
              label="Conversion Factor"
              filled
              dense
              type="number"
            ></q-input>
          </div>
          <div class="col-12">
            <q-input
              v-model="item.SupplierDescription"
              class="q-mr-sm q-mb-sm"
              label="Supplier's Code or Description"
              filled
              dense
              clearable
            ></q-input>
          </div>
          <div v-if="errmsg !== ''" class="col-12 err-msg">
            <div>{{ errmsg }}</div>
          </div>
        </div>
      </q-card-section>
    </template>
  </DialogWindow>
</template>

<script>
import {
  defineComponent,
  ref,
  defineAsyncComponent,
  computed,
  onMounted,
} from "vue";
import api from "../../api/index";
import { useStore } from "vuex";
import general from "../../mixins/general";

export default defineComponent({
  name: "EditPurchasingPricing",
  components: {
    DialogWindow: defineAsyncComponent(() =>
      import("../General/DialogWindow.vue")
    ),
  },
  emits: ["refresh"],
  setup(props, context) {
    console.log(props);
    const item = ref({});
    const dialog = ref(null);
    const store = useStore();
    const { NotifyUser } = general();

    const errmsg = ref("");
    const suppliers = computed(() => store.getters["options/Suppliers"]);
    const itemUnits = computed(() => store.getters["options/ItemUnits"]);

    onMounted(() => {
      store.dispatch("options/GetSuppliers");
    });

    const SaveChanges = () => {
      errmsg.value = "";
      api.PurchPricingSave(item.value).then((response) => {
        NotifyUser(response.data);
        if (response.data.success) {
          context.emit("refresh");
          dialog.value.Hide();
        } else {
          errmsg.value = `ERROR: ${response.data.message}`;
        }
      });
    };

    const AddNew = (productId) => {
      if (dialog.value !== null) dialog.value.Show();
      errmsg.value = "";
      api.PurchPricingGetInfo(-1).then((response) => {
        item.value = { ...response.data.data };
        item.value.ProductId = productId;
      });
    };

    const EditItem = (id) => {
      if (dialog.value !== null) dialog.value.Show();
      errmsg.value = "";
      api.PurchPricingGetInfo(id).then((response) => {
        item.value = { ...response.data.data };
      });
    };

    return {
      item,
      dialog,
      suppliers,
      itemUnits,
      errmsg,
      SaveChanges,
      AddNew,
      EditItem,
    };
  },
});
</script>