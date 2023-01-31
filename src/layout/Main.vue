<template>
  <q-layout view="lHh lpR lFf" :style="{'background' : `url(${require('@/assets/images/blocks.png')})`}">
    <!-- lHh lpR lFf  hHh lpR fFf -->
    <q-header class="main-header">      <q-toolbar>
        <q-btn
          v-if="scrWidth <= 1012"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          size="20px"
        />

        <q-toolbar-title
          class="app-title"
          style="text-transform: uppercase; padding-left: 16px"
        >
          {{ store.BoardTitle }}
        </q-toolbar-title>

        <q-space />
      </q-toolbar>
      <!-- <q-toolbar class="extended-header"> </q-toolbar> -->
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      :mini-width="76"
      :width="320"      
      class="app-drawer"
    >
      <div class="absolute" style="top: 66px; right: -14px; z-index: 301">
        <q-btn
          v-if="scrWidth > 1012"
          dense
          round
          unelevated
          color="primary"
          icon="chevron_left"
          @click="miniState = !miniState"
        />
      </div>

      <div style="display: flex; height: 80px">
        <q-avatar v-if="miniState" size="60px" style="margin-left: 8px; margin-top: 10px" color="blue">
          <div>M</div>
        </q-avatar>

        <div v-else class="drawer-title">MOSAIC</div>
      </div>

      <!-- <div>
      <q-input placeholder="Filter menu" dense filled/>      
      </div> -->

      <q-list
        style="
          margin-left: 6px;
          margin-right: 6px;
          height: calc(100vh - 144px);
          overflow-y: auto;
          overflow-x: hidden;
        "
      >
        <q-item>
          <q-item-section>
            <q-input v-model="searchMenu" dark filled dense placeholder="Filter Menu ..." clearable style="font-size: 1em" debounce="1000" />
          </q-item-section>
        </q-item>
        <template v-for="(m, i) in menu" :key="i">
          <q-expansion-item
            v-if="
              m.label !== 'separator' &&
              (m.userItem !== undefined ||
                (m.hasHeader === undefined && m.items !== undefined))
            "
            expand-separator
            group="menu"
            :default-opened="m.opened !== undefined ? m.opened : false"
            :icon="m.icon !== '' ? m.icon : 'r_settings'"
            :label="m.label"
            header-class="sticky-menu-header"
          >
            <template v-if="m.userItem !== undefined" v-slot:header>
              <q-item-section avatar>
                <ProfileAvatar listmode :src="userInfo.Picture" :text1="userInfo.Name" size="32px" style="margin-left: -3px" />
                <!-- <q-avatar size="32px" style="margin-left: -3px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar> -->
              </q-item-section>

              <q-item-section> {{ userInfo.Name }} </q-item-section>
            </template>

            <q-card style="background-color: transparent">
              <q-card-section style="padding: 0px">
                <template v-for="(n, o) in m.items" :key="o">
                  <q-item-label v-if="n.isHeader !== undefined" header
                    style="padding-left: 68px; line-height: 2px !important">{{ n.label }}</q-item-label>
                  <q-item
                    v-else
                    clickable
                    style="padding-left: 64px;border-radius: 32px"
                    :active="n.link ? path.indexOf(n.link) > -1 : false"
                    @click="
                      n.action !== undefined
                        ? handleAction(n.action)
                        : navigateTo({ ...n.route })
                    "
                  >
                    <q-item-section avatar style="width: 32px; min-width: 32px">
                      <q-icon
                        size="16px"
                        :name="
                          n.icon !== '' && n.icon !== undefined
                            ? n.icon
                            : 'r_settings'
                        "
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ n.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-item
            v-else-if="m.label !== 'separator' && m.items === undefined"
            clickable
            @click="navigateTo({ ...m.route })"
            class="sticky-menu-header"
          >
            <q-item-section avatar>
              <q-icon :name="m.icon !== '' ? m.icon : 'r_settings'" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ m.label }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator v-else />
        </template>
      </q-list>

      <q-separator />
      <div
        v-if="!miniState || scrWidth < 1012"
        class="text-center"
        style="
          font-size: 0.8em;
          padding: 16px 8px;
          background: rgba(0, 0, 0, 0.1);
        "
      >
        <div>&copy; {{ new Date().getFullYear() }} All Rights Reserved</div>
        <div>Terms & Conditions | Privacy Policy</div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.drawer-title {
  height: 49px;
  font-size: 1.5em;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 16px;
  text-align: center;
  width: 100%;
  padding-top: 8px;
}
</style>

<style>
.q-drawer {
  z-index: 3000;
}
</style>

<script>
import { ref, computed, nextTick, onMounted, onUnmounted, defineAsyncComponent } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from 'vue-router'
import general from "../mixins/general";
import secure from "../mixins/secure";
import { useUser } from "@/stores/user"
import { useMainStore } from "../stores";

export default {
  name: "Main",

  components: {
    ProfileAvatar: defineAsyncComponent(() => import('../components/General/ProfileAvatar.vue'))
  },

  setup() {
    const store = useMainStore();
    const q = useQuasar();
    const route = useRoute();
    const { decrypt } = secure();
    const { navigateTo } = general();
    const searchMenu = ref(null);
    const miniState = ref(false);
    const user  = useUser();

    const userInfo = computed(() => {
      var x = user.ActiveUser;
      if (x && x.Name !== undefined) return x;
      else return { Name: "Loading user ..." };
    });
    const appName = computed(() => store.getAppName);
    const boardTitle = computed(() => store.BoardTitle);
    const menu = computed(() => user.getMenu);
    const scrWidth = computed(() => q.screen.width);

    const path = computed(() => route.fullPath )

    const ChangePW = () => {};

    const Logout = async () => {
      user.SetUser(null);
      q.cookies.remove("pau");
      q.cookies.remove("_t");
      await nextTick(() => {
        navigateTo({ name: "Login" });
      });
    };

    var interval = ref(null);

    const checkTimeout = () => {
      interval = setInterval(() => {
        if (!q.cookies.has("_t")) {
          clearInterval(interval);
          q.dialog({
            title: "Session Timeout",
            message:
              "Due to inactivity, you will be logged out in your session.",
            persistent: true,
          }).onOk(() => {
            Logout();
          });
        }
      }, 5000);
    };

    onMounted(() => {
      //store.GetAllOptions();
    });

    onUnmounted(() => {
      clearInterval(interval);
    });

    return {
      q,
      store,
      decrypt,
      scrWidth,
      leftDrawerOpen: ref(false),
      userInfo,
      appName,
      boardTitle,
      miniState,
      menu,
      path,
      searchMenu,
      //darkMode,
      Logout,
      ChangePW,
      navigateTo,
      checkTimeout,
    };
  },
  methods: {
    handleAction(data) {
      console.log("handleAction", data, this["Logout"]);
      if (this[data.name]) {
        var x = this[data.name];
        x();
      }
    },
  },
};
</script>