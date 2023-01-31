<template>
  <BoardLayout>
    <template v-slot:header>
      <q-toolbar class="q-py-sm" style="padding-left: 32px">
        <!-- <q-btn
          icon="o_find_in_page"
          text-color="black"
          stack
          label="Search"
          dense
          class="q-mr-sm"
          padding="xs sm"
        /> -->
        <q-btn
          icon="o_switch_access_shortcut_add"
          :text-color="calcOptions.mergeDuplicate ? 'white' : 'black'"
          :color="calcOptions.mergeDuplicate ? 'green' : ''"
          stack
          label="Merge"
          dense
          class="q-mr-sm"
          padding="xs sm"
          @click="calcOptions.mergeDuplicate = !calcOptions.mergeDuplicate"
        >
          <q-tooltip>Merge quantities of the same product</q-tooltip>
      </q-btn>
        <q-space />
        <q-btn icon="o_settings" text-color="black" round flat />
      </q-toolbar>
    </template>

    <q-dialog v-model="dlgQty">
      <q-card>
        <q-toolbar>
          <q-toolbar-title>Confirm Quantity</q-toolbar-title>
          <q-space />
          <q-btn icon="o_close" round flat @click="dlgQty = false" />
        </q-toolbar>
        <q-card-section>
          <q-input
            v-model="qty"
            filled
            hint="Enter the quantity of the selected item"
            type="number"
            autofocus
            @keydown.enter="ConfirmSelection"
          ></q-input>
        </q-card-section>
        <q-card-actions class="row">
          <q-btn
            label="OK"
            @click="ConfirmSelection"
            style="width: 100%"
            color="green"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dlgCheckout">
      <q-card>
        <q-toolbar>
          <q-toolbar-title><span class="q-mr-lg">Checkout: </span><span class="text-bold text-primary">{{ totals.net }}</span></q-toolbar-title>
          <q-space />
          <q-btn icon="o_close" round flat @click="dlgCheckout = false" />
        </q-toolbar>
        <q-card-section>
          <q-input
            v-model="payment"
            filled
            hint="Enter the amount of payment received"
            type="number"
            autofocus
            prefix="Php"
            input-style="font-size: 1.4em;padding-left: 8px"
            @keydown.enter="ProceeedCheckout"
          ></q-input>
        </q-card-section>
        <q-card-section class="text-h5">
          <span class="q-mr-md">Change:</span>
          <span>{{ formatCurrency(CalcChange) }}</span>
        </q-card-section>
        <q-card-actions class="row">
          <q-btn
            label="OK"
            @click="ProceeedCheckout"
            style="width: 100%"
            color="green"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-card flat class="pos-main">
      <q-card-section class="section-1 row">
        <div class="col-12 col-sm-8">
          <q-list style="height: 100%">
            <q-item>
              <q-item-section>
                <q-input
                  ref="codeScanner"
                  v-model="entryValue"
                  dense
                  filled
                  placeholder="Scan product code"
                  autofocus
                  @keydown.enter="EvalScanner"
                ></q-input>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <div class="row justify-between cursor-pointer">
                  <div
                    v-for="(p, i) in product.Products"
                    :key="i"
                    class="col-6 col-sm-4 q-pa-sm"
                  >
                    <!-- <q-card class="product-item" @click="SelectItem(p)">
                      <q-card-section class="q-pb-none">{{
                        p.name
                      }}</q-card-section>
                      <q-card-section>{{
                        formatCurrency(p.price, 2)
                      }}</q-card-section>
                    </q-card> -->

                    <q-item
                      class="q-card product-item q-pa-none"
                      @click.stop="SelectItem(p)"
                      clickable
                      style="height: 100px"
                    >
                      <q-item-section class="q-pa-md">
                        <q-item-label class="text-h6">{{ p.name }}</q-item-label>
                        <q-item-label>{{ formatCurrency(p.price, 2) }}</q-item-label>
                      </q-item-section>
                      <q-item-section side style="width: 40%">
                        <q-img class="item-image" :src="p.imgUrl" width="100%" height="100%">
                          <template v-slot:error>
                            <q-img :src="require('@/assets/na.jpg')" width="100%" />
                            
                          </template>
                        </q-img>
                      </q-item-section>
                    </q-item>
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-12 col-sm-4">
          <q-table
            class="cart-list"
            :rows="items"
            virtual-scroll
            :rows-per-page-options="[0]"
            row-key="key"
            :columns="columns"
            :hide-no-data="true"
            :hide-bottom="true"
            table-header-class="item-list-table-header"
            table-style="table-layout: fixed"
            @row-click="RowClicked"
          >
            <template v-slot:body-cell-index="props">
              <q-td
                :props="props"
                :class="`${props.row.key === activeItem.key ? 'selected' : ''}`"
              >
              </q-td>
            </template>
            <template v-slot:body-cell-qty="props">
              <q-td :props="props" style="padding: 0px">
                <q-input
                  v-if="props.row.key === activeItem.key"
                  v-model="items[props.rowIndex].qty"
                  type="number"
                  dense
                  filled
                  class="text-right"
                  @click.stop=""
                  @blur="ReCalcLine(props.rowIndex)"
                  input-style="text-align: right"
                >
                  <template v-slot:before>
                    <q-btn
                      class="col"
                      icon="o_remove"
                      round
                      flat
                      dense
                      size="md"
                      @click="AdjustLineQty(props.rowIndex, -1)"
                    />
                  </template>
                  <template v-slot:after>
                    <q-btn
                      class="col"
                      icon="o_add"
                      round
                      flat
                      dense
                      size="md"
                      @click="AdjustLineQty(props.rowIndex, 1)"
                    />
                  </template>
                </q-input>
                <!-- <div v-if="props.row.key === activeItem.key" class="row">
                  <q-btn class="col" icon="o_remove" round flat dense/>
                  <div class="col">{{ props.value }}</div>
                  <q-btn class="col" icon="o_add" round flat dense/>
                </div> -->
                <div v-else style="padding: 7px 16px">
                  {{ props.value }}
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-price="props">
              <q-td :props="props">
                <div>
                  {{ formatCurrency(props.value, 2) }}
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-total="props">
              <q-td :props="props">
                <div>
                  {{ formatCurrency(props.value, 2) }}
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-action="props">
              <q-td :props="props" style="padding: 0px">
                <div v-if="props.row.key === activeItem.key">
                  <q-btn
                    class="col"
                    icon="o_cancel"
                    text-color="red"
                    round
                    flat
                    dense
                    @click.stop="RemoveItem(props.rowIndex)"
                  >
                  <q-tooltip>Remove</q-tooltip>
                  </q-btn>
                </div>
              </q-td>
            </template>
          </q-table>

          <q-card style="width: 100%; height: 220px" class="q-mt-md">
            <q-card-section class="q-py-sm row justify-between">
              <div class="col text-bold text-h5">Net Total</div>
              <div class="col text-bold text-right text-h5">
                {{ totals.net }}
              </div>
            </q-card-section>
            <q-card-section class="row justify-between q-py-sm">
              <div class="col">VAT @ 12%</div>
              <div class="col text-right">{{ totals.tax }}</div>
            </q-card-section>
            <q-card-section class="row justify-between q-py-sm">
              <div class="col">Gross Total</div>
              <div class="col text-right">{{ totals.gross }}</div>
            </q-card-section>
            <q-separator />
            <q-card-actions class="row justify-end">
              <q-btn
                class="col-3"
                icon="o_do_not_disturb_alt"
                label="Discard"
                stack
                padding="md"
                color="red"
                @click="DiscardTransaction"
              />
              <q-btn
                class="col-3"
                icon="o_save"
                label="Save"
                color="green"
                stack
                padding="md"
                @click="SaveTransaction"
              />
              <q-btn
                class="col-3"
                icon="o_shopping_cart"
                label="Checkout"
                color="primary"
                stack
                padding="md"
                @click="Checkout"
              />
            </q-card-actions>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
  </BoardLayout>
</template>

<style lang="scss">
.pos-main {
  height: calc(100vh - 110px);

  .section-1 {
    height: 100%;
  }

  .cart-list {
    height: calc(100% - 270px);
  }

  .q-td {
    &.selected {
      border-left: 4px solid red;
    }
  }

  .item-image{
    .q-img{
      height: 100%;
    }
  }
}
.item-list-table-header {
  th {
    font-weight: bold;
  }
}
</style>

<script>
import { ref, watch, defineAsyncComponent, onMounted, nextTick, computed } from "vue";
import { useMainStore } from "@/stores/index";
import general from "../mixins/general";
import { useProduct } from "@/stores/product";
import { useTransaction } from "@/stores/transactions"

export default {
  name: "POS",
  components: {
    BoardLayout: defineAsyncComponent(() =>
      import("../components/General/BoardLayout.vue")
    ),
  },
  setup() {
    const store = useMainStore();
    const transaction = useTransaction();
    const product = useProduct();
    const { getObjLabel, formatNumber, NotifyUser, formatCurrency, ConfirmAction } = general();

    const theme = ref(0);
    const themes = ref([
      { label: "Light", value: 0 },
      { label: "Dark", value: 1 },
    ]);
    const codeScanner = ref(null);
    const calcOptions = ref({
      mergeDuplicate: false,
    });
    const totals = ref({
      gross: `0.00`,
      tax: `0.00`,
      net: `0.00`,
      rawNet: 0,
    });
    const selectedItem = ref({});
    const activeItem = ref({});
    const qty = ref(1);
    const dlgCheckout = ref(false);
    const payment = ref(0);
    const items = ref([]);
    const selection = ref([]);
    const entryValue = ref(null);
    const columns = ref([
      {
        name: "index",
        label: "",
        field: "key",
        style: "width: 4px; max-width: 4px;padding: 0px",
        headerStyle: "width: 4px; max-width: 4px;padding: 0px",
      },
      {
        name: "name",
        required: true,
        label: "Item",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        style: "width: 25%; max-width: 25%",
        headerStyle: "width: 25%; max-width: 25%",
      },
      {
        name: "qty",
        align: "right",
        label: "Qty",
        field: "qty",
        style: "width: 25%; max-width: 25%",
        headerStyle: "width: 25%; max-width: 25%",
      },
      {
        name: "price",
        align: "right",
        label: "Price",
        field: "price",
        style: "width: 15%; max-width: 15%",
        headerStyle: "width: 15%; max-width: 15%",
      },
      {
        name: "total",
        align: "right",
        label: "Sub-Total",
        field: "total",
        style: "width: 25%; max-width: 25%",
        headerStyle: "width: 25%; max-width: 25%",
      },
      {
        name: "action",
        label: "",
        field: "action",
        style: "width: 5%; max-width: 5%",
        headerStyle: "width: 5%; max-width: 5%",
      },
    ]);

    watch(
      () => theme.value,
      () => {
        store.dispatch("UpdateDarkMode", theme.value);
      }
    );

    watch(
      () => items.value,
      () => {
        ComputeTotals();
      },
      { deep: true }
    );

    const maxPage = ref(1);
    const dlgQty = ref(false);

    const activeRowIndex = ref(1);

    // const getQty = () => {
    //   var x = !entryValue.value ? 1 : entryValue.value.split("@")[0];
    //   return x;
    // };

    const RemoveItem = (index) => {
      items.value.splice(index, 1);
      ComputeTotals();
    };

    const AdjustLineQty = (index, val) => {
      items.value[index].qty = parseFloat(items.value[index].qty) + val;
      ReCalcLine(index);
    };

    const ReCalcLine = (index) => {
      items.value[index].total =
        parseFloat(items.value[index].qty) *
        parseFloat(items.value[index].price);
      ComputeTotals();
      activeItem.value = {};
    };

    const ComputeTotals = () => {
      var x = 0;
      items.value.map((e) => {
        x += parseFloat(e.total);
      });
      var t = x * 0.12;

      totals.value.gross = formatCurrency(x.toFixed(2));
      totals.value.tax = formatCurrency(t.toFixed(2));
      totals.value.net = formatCurrency((x + t).toFixed(2));
      totals.value.rawNet = x + t;
    };

    const SelectItem = (data) => {
      console.warn("SelectItem", data);
      qty.value = 1;
      selectedItem.value = { ...data };
      dlgQty.value = true;
    };

    const ConfirmSelection = () => {
      var x = {};
      x.id = selectedItem.value.id;
      x.qty = qty.value;
      x.price = selectedItem.value.price;
      x.total = x.qty * x.price;
      x.name = selectedItem.value.name;
      x.key = new Date().getTime();

      if (calcOptions.value.mergeDuplicate) {
        var i = items.value.findIndex((e) => e.id === selectedItem.value.id);
        console.warn("check merge", items.value, i, selectedItem.value.id);
        if (i > -1) {
          items.value[i].qty =
            parseFloat(items.value[i].qty) + parseFloat(x.qty);
          items.value[i].total =
            parseFloat(items.value[i].qty) * parseFloat(items.value[i].price);
        } else {
          items.value.push(x);
        }
      } else {
        items.value.push(x);
      }

      qty.value = 1;
      
      activeItem.value = {};
      setTimeout(() => {
        dlgQty.value = false;
        nextTick(() => {
          if (codeScanner.value) codeScanner.value.focus();
        });
        
      }, 200);
    };

    const RowClicked = (e, data) => {
      console.warn("RowClicked", e, data);
      activeItem.value = { ...data };
    };

    const EvalScanner = () => {
      qty.value = 1;
      var x = entryValue.value.split("@");
      var p = entryValue.value;
      if (x.length > 1) {
        qty.value = parseFloat(x[0] || "1");
        p = x[1];
      }

      //get production based on code
      var pp = GetProductByCode(p);
      if (pp) {
        selectedItem.value = { ...pp };
        ConfirmSelection();
      } else {
        NotifyUser({
          success: false,
          message: "Product not found. Please check product code and try again",
        });
      }

      entryValue.value = null;
      if (codeScanner.value) codeScanner.value.focus();
    };

    const GetProductByCode = (_code) => {
      var x = product.Products.filter((e) => e.code === _code)[0];
      console.warn("GetProductByCode", _code, x);
      return x;
    };

    const DiscardTransaction = () => {
      ConfirmAction([], () => {
        items.value = [];
        activeItem.value = {};
        selectedItem.value = {};
      }, {message: "Are you sure you want to discard this transaction?"});
    }

    const SaveTransaction = () => {
      transaction.Save({
        id: new Date().getTime(),
        items: [...items.value],
        checkout: false
      });

      NotifyUser({success: true, message: "Transaction saved"});

      Reset();

      nextTick(() => {
          if (codeScanner.value) codeScanner.value.focus();
        });
    }

    const Checkout = () => {
      if (items.value.length === 0){
        NotifyUser({success: false, message: "Shopping basket is empty"});
        return;
      }

      dlgCheckout.value = true;
    }

    const CalcChange = computed(() => {
      return payment.value - totals.value.rawNet;
    });

    const Reset = () => {
      //reset
      items.value = [];
        activeItem.value = {};
        selectedItem.value = {};

        nextTick(() => {
          if (codeScanner.value) codeScanner.value.focus();
        });
    }

    const ProceeedCheckout = () => {
      transaction.Save({
        id: new Date().getTime(),
        items: [...items.value],
        checkout: true
      });

      NotifyUser({success: true, message: "Transaction saved"});

      Reset();

      nextTick(() => {
          if (codeScanner.value) codeScanner.value.focus();
        });
    }

    const test = (data) => {
      console.warn("test", data);
    };

    onMounted(() => {
      store.UpdateBoardTitle("Point Of Sale")
    });

    return {
      entryValue,
      items,
      columns,
      product,
      theme,
      themes,
      dlgQty,
      maxPage,
      activeRowIndex,
      store,
      getObjLabel,
      SelectItem,
      totals,
      selection,
      qty,
      ConfirmSelection,
      formatNumber,
      RowClicked,
      activeItem,
      calcOptions,
      codeScanner,
      EvalScanner,
      formatCurrency,
      ComputeTotals,
      test,
      ReCalcLine,
      AdjustLineQty,
      RemoveItem,
      DiscardTransaction,
      SaveTransaction,
      transaction,
      dlgCheckout,
      Checkout,
      payment,
      CalcChange,
      ProceeedCheckout
    };
  },
};
</script>
