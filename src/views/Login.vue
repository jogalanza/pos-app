<template>
  <div class="login" :style="{'background' : `url(${require('@/assets/images/blocks.png')})`}">
    <LoginCard />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { useQuasar } from 'quasar'
import general from "../mixins/general";
import secure from "../mixins/secure";

export default {
  components: {
    LoginCard: defineAsyncComponent(() => import('../components/LoginCard.vue'))
  },
  setup() {
    const $q = useQuasar()
    const { decrypt } = secure()
    const { navigateTo } = general()

    return { 
      $q,
      decrypt,
      navigateTo
    }
  },
  mounted(){
    if (this.$q.cookies.has("pau") && this.$q.cookies.has("_t")) {
      var u = this.decrypt(this.$q.cookies.get("pau"));
      if (u && u.AccessRoleID === 1) this.navigateTo({name: 'Dashboard'})
      else this.navigateTo({name: 'Dashboard'})
    }
  }
}
</script>
