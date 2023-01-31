<template>
  <q-card flat class="row justify-center main-board">
    <q-card class="col-11 col-md-10 inner-board" style="background:transparent;box-shadow:none">
      <q-card-section class="card-stats q-pa-none q-mb-md">
        <q-card class="row">
          <div class="col-12 col-sm-3">
            <div class="dashboard-card">
              <q-avatar size="42px">
                <q-icon name="o_shopping_basket" color="green" size="42px" />
              </q-avatar>
              <div class="val">{{ transaction.Saved.length }}</div>
              <q-item-label caption>Transactions</q-item-label>
            </div>
          </div>
          <div class="col-12 col-sm-3">
            <div class="dashboard-card">
              <q-avatar size="42px">
                <q-icon name="o_qr_code" color="red" size="42px" />
              </q-avatar>
              <div class="val">{{ product.Products.length }}</div>
              <q-item-label caption>Products</q-item-label>
            </div>
          </div>
          <div class="col-12 col-sm-3">
            <div class="dashboard-card">
              <q-avatar size="42px">
                <q-icon name="o_email" color="green" size="42px" />
              </q-avatar>
              <div class="val">0</div>
              <q-item-label caption>Messages</q-item-label>
            </div>
          </div>
          <div class="col-12 col-sm-3">
            <div class="dashboard-card">
              <q-avatar size="42px">
                <q-icon name="o_pending_actions" color="green" size="42px" />
              </q-avatar>
              <div class="val">0</div>
              <q-item-label caption>Pending</q-item-label>
            </div>
          </div>
        </q-card>
      </q-card-section>      
    </q-card>
  </q-card>

</template>

<script>
import { ref, onMounted } from "vue";
import { useTransaction } from "@/stores/transactions";
import { useProduct } from "@/stores/product"
import { useMainStore } from "../stores";

export default {
  name: "Dashboard",
  // components: {
  //   EditEmployee: defineAsyncComponent(() => import("./EditEmployee.vue")),
  // },
  setup() {
    const store = useMainStore();
    const transaction = useTransaction();
    const product = useProduct();
    const editor = ref(null);

    onMounted(() => {
      console.log(editor);
    });


    const items = ref([
      { RowNum: 1, Customer: "Jared" },
      { RowNum: 2, Customer: "Omni" },
    ]);

    const columns = ref([
      {
        field: "Customer",
        label: "Name",
        align: "left",
        width: "100%",
        minWidth: "200px",
        sortable: true,
      },
      {
        field: "EmployeeNo",
        label: "Employee No",
        minWidth: "150px",
        datatype: "datetime2",
        status: [1],
        sortable: true,
      },
      {
        field: "Class",
        label: "Class",
        minWidth: "150px",
        datatype: "datetime2",
        status: [1],
      },
      {
        field: "Action",
        label: "",
        style: { width: "60px" },
        datatype: "datetime2",
        status: [1],
      },
    ]);

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

    onMounted(() => {
      store.UpdateBoardTitle("Dashboard");
    });

    return {
      items,
      product,
      columns,
      dataOptions,
      activeRowIndex,
      transaction,
      editor,
      togglePeriod,
    };
  },
};
</script>
