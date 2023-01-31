<template>
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
</template>

<script>
import {
  defineComponent,
  ref,
  defineAsyncComponent,
  onBeforeUnmount,
  watch,
} from "vue";
import api from "../../api/index";
import general from "../../mixins/general";
//import { useQuasar } from 'quasar'

export default defineComponent({
  name: "StandardCost",
  components: {
    ProfileAvatar: defineAsyncComponent(() =>
      import("../General/ProfileAvatar.vue")
    ),
  },
  setup() {
    const { formatCurrency, ConfirmAction, NotifyUser, hasSelectedItem } =
      general();
    const editSalesPricing = ref(null);
    const items = ref([]);
    const itemId = ref(null);
    const hasMultiSelect = ref(false);

    watch(
      items,
      () => {
        hasMultiSelect.value = hasSelectedItem(items.value);
      },
      { deep: true }
    );

    const GetPricing = (id) => {
      itemId.value = id;
      GetMaster();
    };

    const GetMaster = () => {
      api.SalesPricingGetAll(itemId.value).then((response) => {
        items.value = [...response.data.data];
      });
    };

    const DeleteItem = () => {
      var x = [];
      items.value.forEach((element) => {
        if (element.isSelected) x.push(element.Id);
      });

      ConfirmAction(x, function () {
        console.log(x);
        api.SalesPricingDelete(x).then((response) => {
          NotifyUser(response.data);
          GetMaster();
        });
      });
    };

    const AddNew = (itemId) => {
      if (editSalesPricing.value) {
        editSalesPricing.value.AddNew(itemId);
      }
    };

    onBeforeUnmount(() => {
      console.warn("Sales PRcing unmount");
    });

    return {
      items,
      itemId,
      hasMultiSelect,
      formatCurrency,
      editSalesPricing,
      GetMaster,
      GetPricing,
      DeleteItem,
      AddNew,
    };
  },
});
</script>