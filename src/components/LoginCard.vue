<template>
  <q-card class="login-card">

    <!-- <q-img
      :src="`${require('@/assets/images/horizon.jpg')}`"
      class="login-img row justify-center"
    >
      <div
        v-html="appName"
        style="background: transparent; margin-top: 64px"
      ></div>
    </q-img> -->

    <q-card-section class="row justify-center q-pt-lg">
      <ProfileAvatar color="primary" text1="M"/>
    </q-card-section>

    <q-card-section
      v-if="entryMode === 1"
      class="q-gutter-sm"
      style="margin-top: 16px"
    >
      <q-input
        v-model="creds.email"
        label="Email"
        filled
        dense
        dark
        :disable="loading"
      />
      <q-input
        v-model="creds.phrase"
        label="Password"
        type="password"
        filled
        dense
        dark
        :disable="loading"
        @keyup.enter="InvokeLogin"
      >
      </q-input>
      <q-checkbox
        v-model="rememberMe"
        dense
        dark
        label="Remember Me"
        color="green"
        :true-value="1"
        :false-value="0"
        :disable="loading"
      />
      <div style="font-size: 12px; color: red; padding-left: 8px">
        {{ msg }}
      </div>
      <q-btn
        color="green"
        label="Login"
        style="width: calc(100% - 8px); margin-top: 24px"
        :loading="loading"
        @click="InvokeLogin"
      />
      <q-item-label class="text-center q-pa-xs extra-links">
        Forgot Password? <span @click="entryMode = 3">Click here</span>
      </q-item-label>
      <q-item-label class="text-center q-pa-xs extra-links">
        Don't have an account? <span @click="entryMode = 2">Sign up here</span>
      </q-item-label>
    </q-card-section>

    <q-card-section v-else-if="entryMode === 2" class="q-gutter-sm">
      <q-input label="Full Name" filled dense dark/>
      <q-input label="Mobile Number" filled dense dark/>
      <q-input label="Email" filled dense dark/>
      <q-input label="Password" type="password" filled dense dark/>
      <q-input label="Confirm Password" type="password" filled dense dark/>
      <q-btn
        color="purple"
        label="Register"
        style="width: calc(100% - 8px); margin-top: 24px"
      />

      <q-item-label class="text-center q-pa-sm extra-links">
        You have an account? <span @click="entryMode = 1">Login</span>
      </q-item-label>
    </q-card-section>

    <q-card-section v-else class="q-gutter-sm">
      <q-input label="Email" filled dense dark/>
      <q-btn
        color="purple"
        label="Submit"
        style="width: calc(100% - 8px); margin-top: 24px"
      />

      <q-item-label class="text-center q-pa-sm extra-links">
        You have an account? <span @click="entryMode = 1">Login</span>
      </q-item-label>
    </q-card-section>

    <q-card-section class="q-gutter-sm">
      <q-separator />
      <q-item-label caption class="text-center q-pa-xs">
        &copy;2021 Privacy Policy
      </q-item-label>
    </q-card-section>
  </q-card>
</template>

<style scope lang="scss">
.q-img.login-img {
  .q-img__content {
    display: flex;
    justify-content: center;
  }
}
.login-card {
  .app-name {
    font-size: 3.5em !important;
  }
}
</style>

<script>
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
//import api from "../api/user";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import general from "../mixins/general";
import secure from "../mixins/secure";

export default {
  name: "LoginCard",
  components:{
    ProfileAvatar: defineAsyncComponent(() => import('./General/ProfileAvatar.vue')),
  },
  setup() {
    const store = useStore();
    const q = useQuasar();
    const { navigateTo } = general();
    const { decrypt } = secure();

    const rememberMe = ref(0);

    const appName = computed(() => store.getters["getAppName"]);
    const CompanyName = ref("POS");
    const entryMode = ref(1);
    const creds = ref({
      email: null,
      phrase: null,
    });
    const msg = ref("");
    const loading = ref(false);

    //const SetUser = () => store.dispatch('user/SetUser')

    const InvokeLogin = () => {

      navigateTo({ name: "POS" });

      // msg.value = "";
      // loading.value = true;
      // api
      //   .UserAuth(creds.value.email, creds.value.phrase)
      //   .then((response) => {
      //     loading.value = false;
      //     console.log(response, q);
      //     if (response.data.result.success) {
      //       store.dispatch("user/SetUser", response.data.result.payload);
      //       q.cookies.set(
      //         "pau",
      //         encrypt(JSON.stringify(response.data.result.payload)),
      //         { expires: "1d" }
      //       );
      //       q.cookies.set("_t", "a", {
      //         expires:
      //           window.invapp.to !== undefined && window.invapp.to !== null
      //             ? window.invapp.to
      //             : "5m",
      //       });

      //       if (rememberMe.value) {
      //         window.localStorage.setItem(
      //           "loginuser",
      //           encrypt(
      //             JSON.stringify({
      //               u: creds.value.email,
      //               p: creds.value.phrase,
      //             })
      //           )
      //         );
      //       }

      //       window.localStorage.setItem("logme", rememberMe.value);

      //       if (response.data.result.payload.AccessRoleID === 1) {
      //         navigateTo({ name: "Dashboard" });
      //       } else {
      //         navigateTo({ name: "Dashboard" });
      //       }
      //     } else {
      //       msg.value = response.data.result.message;
      //     }
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     loading.value = false;
      //   });
    };

    const InvokeReset = () => {};

    onMounted(() => {
      var x = window.localStorage.getItem("loginuser");
      var y = parseInt(window.localStorage.getItem("logme")) | 0;

      console.log(y);

      rememberMe.value = y;

      if (x && y === 1) {
        var z = decrypt(x);
        creds.value.email = z.u;
        creds.value.phrase = z.p;
      }
    });

    return {
      q,
      appName,
      CompanyName,
      entryMode,
      creds,
      msg,
      loading,
      rememberMe,
      InvokeLogin,
      InvokeReset,
    };
  },
};
</script>
