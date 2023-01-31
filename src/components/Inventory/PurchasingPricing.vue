<template>
  <q-card>
    <q-card-section class="row no-wrap q-py-none">
      <q-space />
      <q-btn v-if="hasMultiSelect" icon="r_delete_forever" round flat size="md" color="red" @click="DeleteItem" />
      <q-btn
        icon="r_playlist_add"
        round
        flat
        size="md"
        color="green"
        @click="editSalesPricing.AddNew(itemId)"
      />
    </q-card-section>
    <q-card-section v-if="items.length === 0" class="info-msg">
      No pricing info yet.
    </q-card-section>
    <q-card-section v-else class="q-px-none">
      <q-list class="q-px-sm">
        <q-item class="q-card q-mb-sm" clickable v-for="(m, i) in items" :key="i" @dblclick="editSalesPricing.EditItem(m.Id)">
          <q-item-section avatar>
            <ProfileAvatar
              listmode
              :text1="m.SuppName"
              size="lg"
              @click="m.isSelected = !m.isSelected"
              :selected="m.isSelected"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ m.SuppName }}</q-item-label>
            <q-item-label caption v-if="m.SupplierDescription !== 'null'">{{ m.SupplierDescription }}</q-item-label>
            <q-item-label caption>{{ m.SupplierUOM }}</q-item-label>
          </q-item-section>
          <q-item-section side> {{ formatCurrency(m.Price) }}</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <EditPurchasingPricing ref="editSalesPricing" @refresh="GetMaster" />
  </q-card>
</template>

<script>
import { defineComponent, ref, defineAsyncComponent, onBeforeUnmount, watch } from "vue";
import api from "../../api/index";
import general from "../../mixins/general";
//import { useQuasar } from 'quasar'

export default defineComponent({
  name: "PurchasingPricing",
  components: {
    EditPurchasingPricing: defineAsyncComponent(() =>
      import("./EditPurchasingPricing.vue")
    ),
    ProfileAvatar: defineAsyncComponent(() =>
      import("../General/ProfileAvatar.vue")
    ),
  },
  setup() {
    const { formatCurrency, ConfirmAction, NotifyUser, hasSelectedItem } = general();
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
    }

    const GetMaster = () => {      
      api.PurchPricingGetAll(itemId.value).then((response) => {
        items.value = [...response.data.data];
      });
    };

    const DeleteItem = () => {
      var x = [];
      items.value.forEach((element) => {
        if (element.isSelected) x.push(element.Id);
      });

      ConfirmAction(x, function(){
        console.log(x)
        api.PurchPricingDelete(x).then(response => {
          NotifyUser(response.data)
          GetMaster();
        })
      })
    }

    onBeforeUnmount(() => {
       console.warn("Sales PRcing unmount");
    })

    return {
      items,
      itemId,
      hasMultiSelect,
      formatCurrency,
      editSalesPricing,
      GetMaster,
      GetPricing,
      DeleteItem
    };
  },
});
</script>