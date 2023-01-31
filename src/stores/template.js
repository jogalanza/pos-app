// import { createStore } from "vuex";
// import user from "./module/user";
// import options from "./module/options";
// import locale from "./module/locale";
import api from "../api/index";
import { defineStore } from "pinia";

export const useUser = defineStore("user", {
  state: () => ({
    ActiveUser: null,
    adminMenu: [
      // { label: "separator", icon: "", route: {name: 'Dashboard'} },
      {
        label: "Process",
        icon: "r_account_tree",
        route: { name: "PayrollCutoff" },
        link: "main/process",
        items: [
          {
            label: "Compute Payroll",
            icon: "r_tune",
            route: { name: "PayrollCutoff" },
            link: "payrollcutoff",
          },
          {
            label: "Payroll Register",
            icon: "r_tune",
            route: { name: "PayrollRegister" },
            link: "payrollregister",
          },
          { label: "Transaction Entries", isHeader: true },
          {
            label: "Attendance Summary",
            icon: "r_tune",
            route: { name: "TimeEntries" },
            link: "timentries",
          },
          {
            label: "Fixed Earnings",
            route: { name: "Earnings", query: { type: "E", onetime: 0 } },
            link: "earnings?type=E&onetime=0",
          },
          {
            label: "Fixed Deductions",
            route: { name: "Earnings", query: { type: "D", onetime: 0 } },
            link: "earnings?type=D&onetime=0",
          },
          {
            label: "Loans",
            route: { name: "Earnings", query: { type: "L", onetime: 0 } },
            link: "earnings?type=L&onetime=0",
          },
          {
            label: "Adjustments",
            route: { name: "Earnings", query: { type: "E", onetime: 1 } },
            link: "earnings?type=E&onetime=1",
          },
          {
            label: "One-time Deductions",
            route: { name: "Earnings", query: { type: "D", onetime: 1 } },
            link: "earnings?type=D&onetime=1",
          },
        ],
      },
      {
        label: "Masterfiles",
        icon: "r_admin_panel_settings",
        route: { name: "System" },
        items: [
          {
            label: "Employee Data",
            route: { name: "Employee", query: { type: "1" } },
            link: "masterfiles/employees",
          },
          {
            label: "Previous Employer",
            route: { name: "PrevEmployer" },
            link: "masterfiles/prevemployer",
          },
          {
            label: "Alphalist Adjustments",
            route: { name: "SalaryReport", query: { type: "2" } },
          },
          { label: "Remittances", isHeader: true },
          {
            label: "GSIS",
            route: { name: "Remittance", query: { type: "1" } },
          },
          {
            label: "Phil Health",
            route: { name: "Remittance", query: { type: "2" } },
          },
          {
            label: "PAGIBIG",
            route: { name: "Remittance", query: { type: "3" } },
          },
          { label: "Loan Balances", route: { name: "test" } },
        ],
      },
      {
        label: "Parameters",
        icon: "r_settings_suggest",
        route: { name: "Dashboard" },
        items: [
          {
            label: "Earnings | Deduction Code",
            icon: "r_tune",
            route: { name: "EarningsDeductionCode" },
            link: "deductioncodes",
          },
          {
            label: "Payroll Classification",
            icon: "r_tune",
            route: { name: "PayrollClass" },
            link: "payrollclass",
          },
          {
            label: "Special Run Setup",
            icon: "r_tune",
            route: { name: "Dashboard" },
          },
          { label: "Government Tables", isHeader: true },
          { label: "Tax", icon: "r_tune", route: { name: "Dashboard" } },
          { label: "GSIS", icon: "r_tune", route: { name: "Dashboard" } },
          { label: "PhilHealth", icon: "r_tune", route: { name: "Dashboard" } },
          { label: "PAGIBIG", icon: "r_tune", route: { name: "Dashboard" } },
          { label: "Organization Tables", isHeader: true },
          {
            label: "Organization",
            icon: "r_tune",
            route: { name: "Organization" },
            link: "parameters/organization",
          },
          {
            label: "Position",
            icon: "r_tune",
            route: { name: "Positions" },
            link: "parameters/positions",
          },
          { label: "Job Title", icon: "r_tune", route: { name: "Dashboard" } },
        ],
      },
      {
        label: "Reports",
        icon: "r_summarize",
        route: { name: "Dashboard" },
        items: [
          { label: "Salaries", isHeader: true },
          {
            label: "Payroll Register",
            icon: "r_summarize",
            route: { name: "SalaryReport", query: { type: "1" } },
            link: "salary?type=1",
          },
          {
            label: "Payroll Summary",
            icon: "r_summarize",
            route: { name: "SalaryReport", query: { type: "2" } },
            link: "salary?type=2",
          },
          {
            label: "Journal Voucher",
            icon: "r_summarize",
            route: { name: "SalaryReport", query: { type: "3" } },
            link: "salary?type=3",
          },
          { label: "Payslip", icon: "r_receipt", route: { name: "test" } },
          { label: "Net Pay", route: { name: "test" } },
          { label: "List of Employees", route: { name: "test" } },
          { label: "Pay Advice Slip", route: { name: "test" } },
          { label: "Basic and Amount Earned", route: { name: "test" } },

          { label: "Tax", isHeader: true },
          { label: "With Tax Monthly Report", route: { name: "test" } },
          { label: "Year-To-Date Taxes", route: { name: "test" } },

          { label: "Loans", isHeader: true },
          { label: "GSIS", route: { name: "test" } },
          { label: "HDMF", route: { name: "test" } },
          { label: "BMEMPC", route: { name: "test" } },
          { label: "LBP", route: { name: "test" } },

          { label: "Monthly Premiums", isHeader: true },
          { label: "GSIS", route: { name: "test" } },
          { label: "Phil Health", route: { name: "test" } },
          { label: "PAGIBIG", route: { name: "test" } },
          { label: "Certifications", route: { name: "test" } },

          { label: "File Transactions", isHeader: true },
          { label: "GSIS", route: { name: "test" } },
          { label: "Phil Health", route: { name: "test" } },
          { label: "PAGIBIG", route: { name: "test" } },

          { label: "Professional Allowances", isHeader: true },
          { label: "RATA", route: { name: "test" } },
          { label: "Honoraria", route: { name: "test" } },
          { label: "Honorarium Allowance", route: { name: "test" } },
          { label: "Prosecutor Report", route: { name: "test" } },
          { label: "MTC-Prosecutor Honorarium", route: { name: "test" } },
          { label: "MTC-Prosecutor Allowance", route: { name: "test" } },
          { label: "Other Professional Services", route: { name: "test" } },

          { label: "Others", isHeader: true },
          { label: "Loan Balance", route: { name: "test" } },
          { label: "Audit Trail", route: { name: "test" } },
          { label: "Define Reports", route: { name: "test" } },
          { label: "Masterfile", route: { name: "test" } },
        ],
      },

      // { label: "Options", icon: "r_tune",route: {name: 'Dashboard'}, items: [
      //   { label: "Date | Time Format", icon: "r_dashboard", route: {name: 'Dashboard'} },
      //   { label: "Computation", icon: "r_dashboard", route: {name: 'Dashboard'} },
      //   { label: "Deduction Schedule", icon: "r_dashboard", route: {name: 'Dashboard'} },
      //   { label: "Minimum Wage", icon: "r_dashboard", route: {name: 'Dashboard'} },
      //   { label: "Tax Exemption [OLD]", icon: "r_dashboard", route: {name: 'Dashboard'} }
      // ]},
      // { label: "Alphalist", icon: "r_list_alt",route: {name: 'Dashboard'} },
    ],
    viewerMenu: [
      { label: "separator", icon: "", route: { name: "Dashboard" } },
      {
        label: "My Payroll",
        icon: "r_credit_card",
        userItem: true,
        route: { name: "Dashboard" },
        items: [
          {
            label: "My Profile",
            icon: "r_account_circle",
            route: { name: "Profile" },
          },
          {
            label: "Update Password",
            icon: "r_lock",
            route: { name: "Profile" },
          },
          {
            label: "Logout",
            icon: "r_logout",
            route: { name: "Login" },
            action: { name: "Logout" },
          },
        ],
      },
      { label: "Point Of Sales", icon: "", route: { name: "POS" } },
      { label: "Dashboard", icon: "", route: { name: "Dashboard" } },
      // {
      //   label: "Sales",
      //   icon: "r_credit_card",
      //   opened: true,
      //   items: [
      //     {
      //       label: "Quotation",
      //       icon: "r_dashboard",
      //       route: { name: "Dashboard" },
      //     },
      //     {
      //       label: "Order",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Direct Delivery",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Direct Invoice",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Delivery on Sales Orders",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Invoice on Sales Delivery",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Invoice Prepaid Orders",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Customer Payments",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Customer Credit Note",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     { label: "Reports", isHeader: true },
      //     {
      //       label: "Customer Transactions",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Customer Allocation",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     { label: "Maintenance", isHeader: true },
      //     {
      //       label: "Manage Customers",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Customer Branches",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Sales Type",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Credit Status",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //   ],
      // },
      // {
      //   label: "Purchases",
      //   icon: "r_credit_card",
      //   items: [
      //     {
      //       label: "Purchase Orders",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Direct Delivery",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Direct Invoice",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Outstanding PO",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Direct GRN",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     { label: "Reports", isHeader: true },
      //     {
      //       label: "Supplier Transaction",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Supplier Allocation",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     { label: "Reports", isHeader: true },
      //     {
      //       label: "Suppliers",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //   ],
      // },
      // {
      //   label: "Inventory",
      //   icon: "r_credit_card",
      //   items: [
      //     {
      //       label: "Location Transfers",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Adjustments",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     { label: "Reports", isHeader: true },
      //     {
      //       label: "Item Movements",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Item Status",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     { label: "Maintenance", isHeader: true },
      //     {
      //       label: "Stock Master",
      //       icon: "r_dashboard",
      //       route: { name: "Products", query: { mode: 0 } },
      //     },
      //     {
      //       label: "Item Categories",
      //       icon: "r_receipt_long",
      //       route: { name: "ItemCategory" },
      //     },
      //     {
      //       label: "Inventory Locations",
      //       icon: "r_receipt_long",
      //       route: { name: "InventoryLocation" },
      //     },
      //     {
      //       label: "Units of Measure",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Reorder Levels",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     { label: "Pricing and Cost", isHeader: true },
      //     {
      //       label: "Sales Pricing",
      //       icon: "r_dashboard",
      //       route: { name: "Products", query: { mode: 1 } },
      //     },
      //     {
      //       label: "Purchasing Pricing",
      //       icon: "r_dashboard",
      //       route: { name: "Products", query: { mode: 2 } },
      //     },
      //     {
      //       label: "Standard Cost",
      //       icon: "r_dashboard",
      //       route: { name: "Products", query: { mode: 3 } },
      //     },
      //   ],
      // },
      // {
      //   label: "Banking and GL",
      //   icon: "r_credit_card",
      //   items: [
      //     {
      //       label: "Payments",
      //       icon: "r_dashboard",
      //       route: { name: "Dashboard" },
      //     },
      //     {
      //       label: "Deposits",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Bank Account Transfer",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Journal Entry",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Budget Entry",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Reconcile Bank Acct",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     { label: "Reports", isHeader: true },
      //     {
      //       label: "Direct Invoice",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Direct Invoice",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Direct Invoice",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Direct Invoice",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //   ],
      // },
      // {
      //   label: "Setup",
      //   icon: "r_credit_card",
      //   items: [
      //     {
      //       label: "Company",
      //       icon: "r_dashboard",
      //       route: { name: "Dashboard" },
      //     },
      //     {
      //       label: "User Accounts",
      //       icon: "r_receipt_long",
      //       route: { name: "Employee" },
      //     },
      //     {
      //       label: "Access Roles",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Display Settings",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Tax Types",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Fiscal Years",
      //       icon: "r_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //   ],
      // },
    ],
    genMenu: [
      // { label: "separator", icon: "", route: {name: 'Dashboard'} },
      { label: "Preferences", icon: "r_style", route: { name: "Preferences" } },
      { label: "About", icon: "r_info", route: { name: "Preferences" } },
    ],
  }),

  getters: {
    getMenu(state) {
      var x = [...state.viewerMenu];
      if (state.ActiveUser != null && state.ActiveUser.AccessRoleID === 1) {
        x.push(...state.adminMenu);
      }
      x.push(...state.genMenu);
      return x;
    },
    getUser(state) {
      if (state.ActiveUser === null) return { Name: "Loading user ..." };
      return state.ActiveUser;
    },
    isAdmin(state) {
      if (state.ActiveUser !== null && state.ActiveUser.AccessRoleID === 1)
        return true;
      return false;
    },
    getUserRole(state) {
      if (state.ActiveUser !== null) return state.ActiveUser.AccessRoleID;
      return -1;
    },
  },

  actions: {
    SetUser(payload) {
      if (payload === null) this.ActiveUser = null
    else this.ActiveUser = { ...payload }
    }
  },
});
