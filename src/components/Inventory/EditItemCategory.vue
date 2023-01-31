<template>
  <DialogWindow ref="dialog" title="Edit">
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
            <q-input
              v-model="item.Description"
              class="q-mr-sm q-mb-sm"
              label="Name"
              filled
              dense
            ></q-input>
          </div>
          <q-item-label class="q-my-md text-grey" style="font-size: 0.9em">Default values for new items</q-item-label>
          <div class="col-12">
            <q-select
              v-model="item.CurrAbrev"
              :options="currencies"
              map-options
              emit-value
              class="q-mr-sm q-mb-sm"
              label="Tax Type"
              filled
              dense
            ></q-select>
          </div>
          <div class="col-12">
            <q-select
              v-model="item.SalesTypeId"
              :options="salesTypes"
              class="q-mr-sm q-mb-sm"
              label="Item Type"
              map-options
              emit-value
              filled
              dense
            ></q-select>
          </div>
          <div class="col-12">
            <q-select
              v-model="item.SalesTypeId"
              :options="salesTypes"
              class="q-mr-sm q-mb-sm"
              label="Unit of Measure"
              map-options
              emit-value
              filled
              dense
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
          <div v-if="errmsg !== ''" class="col-12 err-msg">
            <div>{{ errmsg }}</div>
          </div>
        </div>
      </q-card-section>
    </template>
  </DialogWindow>
</template>

<script>
import { defineComponent, ref, defineAsyncComponent, computed, onMounted } from "vue";
import api from "../../api/index";
import { useStore } from "vuex";
import general from "../../mixins/general";

export default defineComponent({
  name: "EditItemCategory",
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
    const salesTypes = computed(() => store.getters["options/SalesTypes"]);
    const currencies = computed(() => store.getters["options/Currencies"]);

    const SaveChanges = () => {
      errmsg.value = "";
      api.SalesPricingSave(item.value).then((response) => {
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
      api.SalesPricingGetInfo(-1).then((response) => {
        item.value = { ...response.data.data };
        item.value.ProductId = productId;
      });
    };

    const EditItem = (id) => {
      if (dialog.value !== null) dialog.value.Show();
      errmsg.value = "";
      api.SalesPricingGetInfo(id).then((response) => {
        item.value = { ...response.data.data };
      });
    };

    onMounted(() => {
        errmsg.value = "";
    });

    return {
      item,
      dialog,
      salesTypes,
      currencies,
      errmsg,
      SaveChanges,
      AddNew,
      EditItem,
    };
  },
});
</script>