<template>
  <Board>
    <q-card-section class="column items-center">
      <ProfileAvatar :src="item.Picture" :text1="item.Firstname" :text2="item.Lastname" :empid="item.ID" />
      
      <div class="text-h5 q-mt-md">
        {{ displayName }}
      </div>
      <div v-if="item.Email" class="text-h7">
        {{ item.Email }}
      </div>
      <div v-if="item.ContactNo" class="text-h7">
        {{ item.ContactNo }}
      </div>
      <q-separator class="q-my-sm" />
    </q-card-section>
  </Board>
</template>

<script>
import { ref, computed, defineAsyncComponent, onMounted } from "vue";
import { useStore } from "vuex";
import api from "../api/index";

export default {
  name: "MyProfile",
  components: {
    ProfileAvatar: defineAsyncComponent(() => import('./General/ProfileAvatar.vue')),
    Board: defineAsyncComponent(() => import("./General/Board.vue")),
  },
  setup() {
    const store = useStore();

    const item = ref({});

    const user = computed(() => store.getters["user/getUser"]);

    const displayName = computed(() => {
      return `${(item.value.Prefix ? `${item.value.Prefix}.` : '')} ${(item.value.Lastname ? `${item.value.Lastname},` : '')} ${(item.value.Firstname ? item.value.Firstname : '')} ${(item.value.Middlename ? item.value.Middlename : '')}`
    })

    const GetInfo = () => {
      api.EmployeeGetInfo(user.value.ID).then((response) => {
        item.value = { ...response.data.result };
      });
    };

    onMounted(() => {
      GetInfo();
    });

    return {
      user,
      item,
      store,
      displayName
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
    console.log(this.user);
    this.store.dispatch("UpdateBoardTitle", "My Profile");
  },
};
</script>
