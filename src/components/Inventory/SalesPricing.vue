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
        @click="AddNew(itemId)"
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
              :text1="m.SalesType"
              size="lg"
              @click="m.isSelected = !m.isSelected"
              :selected="m.isSelected"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ m.SalesType }}</q-item-label>
            <q-item-label caption>{{ m.CurrAbrev }}</q-item-label>
          </q-item-section>
          <q-item-section side> {{ formatCurrency(m.Price) }}</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <EditSalesPricing ref="editSalesPricing" @refresh="GetMaster" />
  </q-card>
</template>

<script>
import { defineComponent, ref, defineAsyncComponent, onBeforeUnmount, watch } from "vue";
import api from "../../api/index";
import general from "../../mixins/general";
//import { useQuasar } from 'quasar'

export default defineComponent({
  name: "SalesPricing",
  components: {
    EditSalesPricing: defineAsyncComponent(() =>
      import("./EditSalesPricing.vue")
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
      api.SalesPricingGetAll(itemId.value).then((response) => {
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
        api.SalesPricingDelete(x).then(response => {
          NotifyUser(response.data)
          GetMaster();
        })
      })
    }

    const AddNew = (itemId) => {
      if (editSalesPricing.value){
        editSalesPricing.value.AddNew(itemId);
      }
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
      DeleteItem,
      AddNew
    };
  },
});
</script>