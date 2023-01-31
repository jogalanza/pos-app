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
  setup() {
    const { navigateTo } = general()
    const menu = ref([
      {label: 'Salaries', items:[
        {label: 'Payroll Register', route: {name: 'SalaryReport', query: {type: "1"}}},
        {label: 'Payroll Summary', route: {name: 'SalaryReport', query: {type: "2"}}},
        {label: 'Journal Voucher', route: {name: 'SalaryReport', query: {type: "3"}}},
        {label: 'Payslip', route: {name: 'test'}},
        {label: 'Net Pay', route: {name: 'test'}},
        {label: 'List of Employees', route: {name: 'test'}},
        {label: 'Pay Advice Slip', route: {name: 'test'}},
        {label: 'Basic and Amount Earned', route: {name: 'test'}}
      ]},
      {label: 'Tax', items:[
        {label: 'With Tax Monthly Report', route: {name: 'test'}},
        {label: 'Year-To-Date Taxes', route: {name: 'test'}}
      ]},
      {label: 'Loans', items:[
        {label: 'GSIS', route: {name: 'test'}},
        {label: 'HDMF', route: {name: 'test'}},
        {label: 'BMEMPC', route: {name: 'test'}},
        {label: 'LBP', route: {name: 'test'}}
      ]},
      {label: 'Monthly Premiums', items:[
        {label: 'GSIS', route: {name: 'test'}},
        {label: 'Phil Health', route: {name: 'test'}},
        {label: 'PAGIBIG', route: {name: 'test'}},
        {label: 'Certifications', route: {name: 'test'}}
      ]},
      {label: 'File Transactions', items:[
        {label: 'GSIS', route: {name: 'test'}},
        {label: 'Phil Health', route: {name: 'test'}},
        {label: 'PAGIBIG', route: {name: 'test'}}
      ]},
      {label: 'Professional Allowances', items:[
        {label: 'RATA', route: {name: 'test'}},
        {label: 'Honoraria', route: {name: 'test'}},
        {label: 'Honorarium Allowance', route: {name: 'test'}},
        {label: 'Prosecutor Report', route: {name: 'test'}},
        {label: 'MTC-Prosecutor Honorarium', route: {name: 'test'}},
        {label: 'MTC-Prosecutor Allowance', route: {name: 'test'}},
        {label: 'Other Professional Services', route: {name: 'test'}}
      ]},
      {label: 'Others', items:[
        {label: 'Loan Balance', route: {name: 'test'}},
        {label: 'Audit Trail', route: {name: 'test'}},
        {label: 'Define Reports', route: {name: 'test'}},
        {label: 'Masterfile', route: {name: 'test'}}
      ]}
    ])

    return {
      menu,
      navigateTo
    }
  },
  mounted(){
    // console.log(this.$route, this.$store)
    // if (this.$route.meta.roles !== undefined){
    //   if (this.$route.meta.roles.indexOf(this.$store.getters['user/getUserRole']) === -1) this.navigateTo({name: 'Unauthorized'})
    // }
  }
}
</script>
