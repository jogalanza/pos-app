<template>
  <q-avatar
    class="profile-avatar items-center bg-green"
    :size="listmode ? '48px !important' : '130px'"
    @click="listmode ? emitClick() : upload ? file.click() : null"
  >
    <!-- style="display: block; margin: auto" -->
    <img
      v-if="!selected && src"
      :src="`${$http.defaults.baseURL}images/Profile/${src}`"
    />
    <div
      v-else-if="!selected"
      class="text-white text-h4"
      :style="{
        'font-size': listmode ? '1.3em !important' : '1.1em !important', 'line-height': 'inherit'
      }"
    >
      {{
        `${text1 ? text1.toUpperCase().charAt(0) : ""}${
          text2 ? text2.toUpperCase().charAt(0) : ""
        }`
      }}
    </div>
    <q-icon v-else name="r_done" size="md" color="white" />
    <q-tooltip v-if="!listmode && upload">Click to Update</q-tooltip>
    <input
      type="file"
      multiple
      name="fields[assetsFieldHandle][]"
      id="assetsFieldHandle"
      class="w-px h-px opacity-0 overflow-hidden absolute"
      @change="FileUpload"
      ref="file"
      accept="image/png, image/jpeg"
      style="display: none"
    />
  </q-avatar>
</template>

<style lang="scss">
.profile-avatar{
    box-shadow: 0px 0px 2px #222;
}
</style>

<script>
import { ref } from "vue";
import userApi from "../../api/user";

export default {
  name: "ProfileAvatar",
  props: {
    src: {
      type: String,
      default: null,
    },
    text1: {
      type: String,
      default: null,
    },
    text2: {
      type: String,
      default: null,
    },
    empid: {
      type: Number,
      default: 0,
    },
    listmode: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    upload: {
      type: Boolean,
      default: false
    }
  },
  emits: ["refresh", "click"],
  setup(props, context) {
    const file = ref(null);
    const filelist = ref([]);

    const FileUpload = () => {
      filelist.value = [...file.value.files];
      let formData = new FormData();
      formData.append("file", filelist.value[0]);

      userApi.UploadProfilePhoto(formData, props.empid).then((response) => {
        if (response.data.result.success) {
          context.emit("refresh");
        }
      });
    };

    const emitClick = () => {
      context.emit("click");
    };

    return {
      file,
      filelist,
      FileUpload,
      emitClick,
    };
  },
};
</script>