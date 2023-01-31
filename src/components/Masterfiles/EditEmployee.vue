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
      <q-card-section>
        <div class="row justify-center">
          <div class="col-12">
            <q-card>
              <q-card-section class="q-pa-none">
                <q-list>
                  <q-expansion-item
                    label="Basic Information"
                    header-class="board-expansion-header bg-white"
                    expand-separator
                    default-opened
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

                  <q-expansion-item
                    label="System Access"
                    expand-separator
                    header-class="board-expansion-header bg-white"
                  >
                    <q-card>
                      <q-card-section>
                        <div class="row q-mb-sm">
                          <div class="col-12">
                            <div class="column">
                              <div class="col">
                                <q-checkbox
                                  v-model="item.AllowAccess"
                                  class="q-mr-sm q-mb-sm"
                                  label="Active"
                                  filled
                                  dense
                                  type="email"
                                ></q-checkbox>
                              </div>
                              <div class="col">
                                <q-input
                                  v-model="item.Email"
                                  class="q-mr-sm q-mb-sm"
                                  label="Email Address"
                                  filled
                                  dense
                                  type="email"
                                ></q-input>
                              </div>
                              <div class="col">
                                <q-btn
                                  class="q-mr-sm q-mb-sm"
                                  label="Reset Password"
                                  color="negative"
                                  filled
                                  style="width: calc(100% - 8px)"
                                ></q-btn>
                              </div>
                            </div>
                          </div>
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

      <EditEarnings ref="editEarning" @refresh="GetInfo" :initMax="false" />
    </template>
  </DialogWindow>
</template>

<style scoped>
</style>

<script>
import { ref, computed, defineAsyncComponent, onMounted, watch } from "vue";
import { useStore } from "vuex";
import api from "../../api/index";
import optionsApi from "../../api/options";
//import general from "../../mixins/general";
import { useQuasar } from "quasar";
import router from "../../router/index";

export default {
  name: "EditEmployees",
  components: {
    ProfileAvatar: defineAsyncComponent(() =>
      import("../General/ProfileAvatar.vue")
    ),
    DialogWindow: defineAsyncComponent(() =>
      import("../General/DialogWindow.vue")
    ),
  },
  setup(props, context) {
    console.log("Context", props, context);
    const store = useStore();
    const q = useQuasar();
    //const { getObjValue } = general();
    const dialog = ref(null);

    const dataOptions = ref({
      search: null,
      productStatus: 1,
      site: null,
      currentPage: 1,
      rowsPerPage: 10,
    });

    const genders = computed(() => store.getters["options/Gender"]);
    const payrollClass = computed(() => store.getters["options/PayrollClass"]);
    //const branch = computed(() => store.getters["options/Branch"]);
    //const division = computed(() => store.getters["options/Division"]);
    const department = computed(() => store.getters["options/Department"]);
    const section = computed(() => store.getters["options/Section"]);
    const lineTeam = computed(() => store.getters["options/LineTeam"]);
    //const position = computed(() => store.getters["options/Position"]);
    const civilStatus = computed(() => store.getters["options/CivilStatus"]);

    const displayName = computed(() => {
      if (item.value === null) return "";
      var x = `${
        item.value.FullName !== null ? `${item.value.FullName}` : ``
      } `;
      return x;
    });
    const editEarning = ref(null);
    const editItem = ref(-1);
    const item = ref({});
    const activeRowIndex = ref(1);

    //organization
    const branch = ref([]);
    const division = ref([]);

    const position = ref([]);

    watch(
      () => item.value.Branch,
      () => {
        console.log("watch Branch");
        GetDivision();
      },
      { deep: true }
    );

    // const GetBranch = () => {
    //   optionsApi.GetOrganization(-1).then((response) => {
    //     branch.value = [...response.data.result];
    //   });
    // };

    const GetDivision = () => {
      if (item.value.Branch) {
        optionsApi.GetOrganization(item.value.Branch).then((response) => {
          division.value = [...response.data.result];
        });
      }
    };

    // const GetPositions = () => {
    //   optionsApi.GetPositions().then((response) => {
    //     position.value = [...response.data.result];
    //   });
    // };

    onMounted(() => {
      // GetBranch();
      // GetPositions();
    });

    const ShowEditor = (data) => {
      console.log(data, editEarning);
      if (editEarning.value) {
        data.NewItem = false;
        editEarning.value.EditItem(data);
      }
    };

    const AddNewEDL = (data, _type) => {
      if (editEarning.value) {
        data.EmployeeID = item.value.ID;
        data.NewItem = true;
        data.ReportType = _type;
        data.EmployeeEDL = _type;
        editEarning.value.AddNew(data);
      }
    };

    const FillData = (data) => {
      //adhoc fills here...
      
      return { ...data };
    };

    const GetInfo = (show) => {
      api.EmployeeGetInfo(editItem.value).then((response) => {
        item.value = { ...response.data.data }; //FillData(response.data.result)
        if (dialog.value !== null && show !== undefined) dialog.value.Show();
      });
    };

    const EditItem = (data) => {
      editItem.value = data;
      GetInfo(true);
    };

    const SaveChanges = () => {

      api.EmployeeSave(item.value).then((response) => {
        q.notify({
          type: response.data.success ? "positive" : "negative",
          message:
            response.data.message === null
              ? ""
              : response.data.message,
          html: true,
        });
        context.emit("refresh");
        if (response.data.success) dialog.value.Hide();
      });
    };

    const AddNew = () => {
      api.EmployeeGetInfo(-1).then((response) => {
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
      editEarning,
      genders,
      civilStatus,
      payrollClass,
      branch,
      division,
      department,
      section,
      lineTeam,
      position,
      dataOptions,
      activeRowIndex,
      store,
      dialog,
      EditItem,
      SaveChanges,
      AddNew,
      ShowEditor,
      AddNewEDL,
      GetInfo,
      UpdatePhoto,
    };
  },
  emits: ["refresh"],
  mounted() {
    console.log("mounted Edit Employee", this.$route, router);
  },
};
</script>
