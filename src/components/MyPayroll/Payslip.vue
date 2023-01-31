<template>
  <q-card flat class="row justify-center main-board">
    <q-card class="col-11 col-md-10 inner-board">
      <q-card-section class="row no-wrap">
        <q-space />
        <q-btn color="green" flat dense icon="r_more_vert">
          <q-menu :offset="[60, 10]">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Refresh</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-card-section>

      <q-card-section>
        <q-select
          label="Payroll Cutoff"
          v-model="payrollCutoffId"
          :options="cutoffOptions"
          emit-value
          map-options
          option-label="label"
          option-value="value"
          filled
          dense
          use-input
          clearable
          input-debounce="400"
          @filter="filterFn"
        />
      </q-card-section>

      <q-card-section class="q-pl-lg">
        <div class="text-h5">{{ user.Name }}</div>
        <div class="text-h7">Position</div>
        <q-separator class="q-my-sm" />
      </q-card-section>
      <q-card-section>
        <q-card-section class="row q-pa-none">
          <div class="col-12 col-md-12 col-lg-4 q-pa-sm">
            <div class="q-card q-pa-md" style="height: 100%">
              <div class="text-h5">Summary</div>
              <q-list>
                <q-item v-for="(m, i) in summary" :key="i">
                  <q-item-section>{{ m.label }}</q-item-section>
                  <q-item-section side>
                    <q-item-label>{{ formatCurrency(m.value) }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                  <q-item-section class="text-weight-bold">{{
                    item.Summary.NetPay.label
                  }}</q-item-section>
                  <q-item-section side>
                    <q-item-label>{{
                      formatCurrency(item.Summary.NetPay.value)
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <div
                v-if="item.LoanBalances && item.LoanBalances.length > 0"
                class="text-h5 q-mt-xl"
              >
                Loan Balances
              </div>
              <q-list v-if="item.LoanBalances && item.LoanBalances.length > 0">
                <q-item v-for="(m, i) in item.LoanBalances" :key="i">
                  <q-item-section>{{ m.label }}</q-item-section>
                  <q-item-section side>
                    <q-item-label>{{ formatCurrency(m.value) }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator
                  v-if="item.LoanBalances && item.LoanBalances.length > 0"
                />
                <q-item
                  v-if="item.LoanBalances && item.LoanBalances.length > 0"
                >
                  <q-item-section class="text-weight-bold"
                    >Total</q-item-section
                  >
                  <q-item-section side>
                    <q-item-label>2312312</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4 q-pa-sm">
            <div class="q-card q-pa-md" style="height: 100%">
              <div class="text-h5">Earnings</div>
              <q-list>
                <q-item v-for="(m, i) in item.Earnings" :key="i">
                  <q-item-section>{{ m.label }}</q-item-section>
                  <q-item-section side>
                    <q-item-label>{{ formatCurrency(m.value) }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                  <q-item-section class="text-weight-bold"
                    >Total</q-item-section
                  >
                  <q-item-section side>
                    <q-item-label>1283124</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4 q-pa-sm">
            <div class="q-card q-pa-md" style="height: 100%">
              <div class="text-h5">Deductions</div>
              <q-list>
                <q-item v-for="(m, i) in item.Deductions" :key="i">
                  <q-item-section>{{ m.label }}</q-item-section>
                  <q-item-section side>
                    <q-item-label>{{ formatCurrency(m.value) }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                  <q-item-section class="text-weight-bold"
                    >Total</q-item-section
                  >
                  <q-item-section side>
                    <q-item-label>1283124</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
          
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-card>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import general from "../../mixins/general";
import optionsApi from "../../api/options";

export default {
  name: "Payslip",
  // components: {
  //   EditEmployee: defineAsyncComponent(() => import("./EditEmployee.vue")),
  // },
  setup() {
    const store = useStore();
    const { formatCurrency } = general();

    const editor = ref(null);

    const payrollCutoffs = ref([]);
    const payrollCutoffId = ref(-1);
    const cutoffOptions = ref([]);

    const GetMaster = () => {};

    const GetPayrollCutoffs = () => {
      optionsApi.GetPayrollCutoffs().then((response) => {
        payrollCutoffs.value = [...response.data.result];
        cutoffOptions.value = [...payrollCutoffs.value];
        if (payrollCutoffId.value === -1 && payrollCutoffs.value.length > 0) {
          payrollCutoffId.value = payrollCutoffs.value[0].value;
          GetMaster();
        }
      });
    };

    const filterFn = (val, update) => {
      update(() => {
        if (val === null) {
          cutoffOptions.value = [...payrollCutoffs.value];
        } else {
          const needle = val.toLowerCase();
          cutoffOptions.value = payrollCutoffs.value.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    };

    watch(
      () => payrollCutoffId,
      () => {
        if (payrollCutoffId.value !== null) GetMaster();
      },
      { immediate: true, deep: true }
    );

    onMounted(() => {
      GetPayrollCutoffs();
    });

    const item = ref({
      Earnings: [
        { label: "Basic Pay", value: 12345.67 },
        { label: "PERA I", value: 8910.11 },
      ],
      Deductions: [
        { label: "W/ Tax", value: 0 },
        { label: "GSIS PS", value: 1221.48 },
        { label: "PhilHealth", value: 87.5 },
        { label: "HDMF PS", value: 100.0 },
      ],
      LoanBalances: [
        { label: "Loan 1", value: 1221.48 },
        { label: "Loan 2", value: 1221.48 },
      ],
      Summary: {
        GrossPay: { label: "Gross Pay", value: 12345.67 },
        TotalDeductions: { label: "Total Deductions", value: 12345.67 },
        NetPay: { label: "Net Pay", value: 12345.67 },
      },
    });

    const summary = computed(() => {
      var result = [];
      if (item.value.Summary) {
        for (let [key, value] of Object.entries(item.value.Summary)) {
          if (key !== "NetPay") result.push(value);
        }
      }
      return result;
    });

    const user = computed(() => store.getters["user/getUser"]);

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

    return {
      user,
      item,
      summary,
      dataOptions,
      activeRowIndex,
      store,
      editor,
      payrollCutoffId,
      cutoffOptions,
      togglePeriod,
      formatCurrency,
      filterFn
    };
  },
  methods: {
    ShowEditor() {
      if (this.editor != null) {
        this.editor.EditItem();
      }
    },
  },
  mounted() {
    console.log("mounted", this.store);
    this.store.dispatch("UpdateBoardTitle", "E-Payslip");
  },
};
</script>
