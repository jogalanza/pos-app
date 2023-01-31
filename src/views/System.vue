<template>
  <q-card class="main-board" flat>
    <q-card-section>
      <template v-for="(menu, index) in menu" :key="index">
        <div class="row menu-header" >
          {{ menu.label }}
        </div>
        <div class="row" v-if="menu.items" :key="`${index}-menu`">
          <div class="col-12 col-sm-3 col-md-2 menu-item" v-for="(m, i) in menu.items" :key="i">
            <q-btn no-caps dense @click="navigateTo({...m.route})">
              <q-img src="https://placeimg.com/500/300/nature" contain></q-img>
              <div class="menu-item-label">{{ m.label }}</div>
            </q-btn>
          </div>
        </div>
      </template>
      
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from 'vue'
import general from '../mixins/general'
export default {
  name: 'System',
  setup() {
    const { navigateTo } = general()
    const menu = ref([
      {label: 'Employees', items:[
        {label: 'Maintenance', route: {name: 'Employee', query: {type: "1"}}},
        {label: 'Previous Employer', route: {name: 'SalaryReport', query: {type: "2"}}}
      ]},
      {label: 'Time Entries', items:[
        {label: 'Days Worked | Abs | Overtime', route: {name: 'test'}},
        {label: 'Allowances | Fixed Earnings', route: {name: 'test'}},
        {label: 'Adjustments', route: {name: 'test'}}
      ]},
      {label: 'Deductions', items:[
        {label: 'Loans', route: {name: 'test'}},
        {label: 'Fixed Deductions', route: {name: 'test'}},
        {label: 'One-time Deductions', route: {name: 'test'}}
      ]},
      {label: 'Remittance', items:[
        {label: 'GSIS', route: {name: 'test'}},
        {label: 'Phil Health', route: {name: 'test'}},
        {label: 'PAGIBIG', route: {name: 'test'}},
        {label: 'Loan Balances', route: {name: 'test'}}
      ]}
    ])

    return {
      menu,
      navigateTo
    }
  },
  mounted(){
    console.log(this.$route, this.$store)
    if (this.$route.meta.roles !== undefined){
      if (this.$route.meta.roles.indexOf(this.$store.getters['user/getUserRole']) === -1) this.navigateTo({name: 'Unauthorized'})
    }
  }
}
</script>
