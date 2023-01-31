import { defineStore } from "pinia";

export const useUser = defineStore("user", {
  state: () => ({
    ActiveUser: null,
    adminMenu: [
      // { label: "separator", icon: "", route: {name: 'Dashboard'} },
      {
        label: "Process",
        icon: "o_account_tree",
        route: { name: "PayrollCutoff" },
        link: "main/process",
        items: [
          {
            label: "Compute Payroll",
            icon: "o_tune",
            route: { name: "PayrollCutoff" },
            link: "payrollcutoff",
          },
          {
            label: "Payroll Register",
            icon: "o_tune",
            route: { name: "PayrollRegister" },
            link: "payrollregister",
          },
          { label: "Transaction Entries", isHeader: true },
          {
            label: "Attendance Summary",
            icon: "o_tune",
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
        icon: "o_admin_panel_settings",
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
        icon: "o_settings_suggest",
        route: { name: "Dashboard" },
        items: [
          {
            label: "Earnings | Deduction Code",
            icon: "o_tune",
            route: { name: "EarningsDeductionCode" },
            link: "deductioncodes",
          },
          {
            label: "Payroll Classification",
            icon: "o_tune",
            route: { name: "PayrollClass" },
            link: "payrollclass",
          },
          {
            label: "Special Run Setup",
            icon: "o_tune",
            route: { name: "Dashboard" },
          },
          { label: "Government Tables", isHeader: true },
          { label: "Tax", icon: "o_tune", route: { name: "Dashboard" } },
          { label: "GSIS", icon: "o_tune", route: { name: "Dashboard" } },
          { label: "PhilHealth", icon: "o_tune", route: { name: "Dashboard" } },
          { label: "PAGIBIG", icon: "o_tune", route: { name: "Dashboard" } },
          { label: "Organization Tables", isHeader: true },
          {
            label: "Organization",
            icon: "o_tune",
            route: { name: "Organization" },
            link: "parameters/organization",
          },
          {
            label: "Position",
            icon: "o_tune",
            route: { name: "Positions" },
            link: "parameters/positions",
          },
          { label: "Job Title", icon: "o_tune", route: { name: "Dashboard" } },
        ],
      },
      {
        label: "Reports",
        icon: "o_summarize",
        route: { name: "Dashboard" },
        items: [
          { label: "Salaries", isHeader: true },
          {
            label: "Payroll Register",
            icon: "o_summarize",
            route: { name: "SalaryReport", query: { type: "1" } },
            link: "salary?type=1",
          },
          {
            label: "Payroll Summary",
            icon: "o_summarize",
            route: { name: "SalaryReport", query: { type: "2" } },
            link: "salary?type=2",
          },
          {
            label: "Journal Voucher",
            icon: "o_summarize",
            route: { name: "SalaryReport", query: { type: "3" } },
            link: "salary?type=3",
          },
          { label: "Payslip", icon: "o_receipt", route: { name: "test" } },
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

      // { label: "Options", icon: "o_tune",route: {name: 'Dashboard'}, items: [
      //   { label: "Date | Time Format", icon: "o_dashboard", route: {name: 'Dashboard'} },
      //   { label: "Computation", icon: "o_dashboard", route: {name: 'Dashboard'} },
      //   { label: "Deduction Schedule", icon: "o_dashboard", route: {name: 'Dashboard'} },
      //   { label: "Minimum Wage", icon: "o_dashboard", route: {name: 'Dashboard'} },
      //   { label: "Tax Exemption [OLD]", icon: "o_dashboard", route: {name: 'Dashboard'} }
      // ]},
      // { label: "Alphalist", icon: "o_list_alt",route: {name: 'Dashboard'} },
    ],
    viewerMenu: [
      { label: "separator", icon: "", route: { name: "Dashboard" } },
      {
        label: "My Payroll",
        icon: "o_credit_card",
        userItem: true,
        route: { name: "Dashboard" },
        items: [
          {
            label: "My Profile",
            icon: "o_account_circle",
            route: { name: "Profile" },
          },
          {
            label: "Update Password",
            icon: "o_lock",
            route: { name: "Profile" },
          },
          {
            label: "Logout",
            icon: "o_logout",
            route: { name: "Login" },
            action: { name: "Logout" },
          },
        ],
      },
      { label: "Point Of Sale", icon: "o_point_of_sale", route: { name: "POS" } },
      { label: "Dashboard", icon: "o_dashboard", route: { name: "Dashboard" } },
      // {
      //   label: "Sales",
      //   icon: "o_credit_card",
      //   opened: true,
      //   items: [
      //     {
      //       label: "Quotation",
      //       icon: "o_dashboard",
      //       route: { name: "Dashboard" },
      //     },
      //     {
      //       label: "Order",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Direct Delivery",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Direct Invoice",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Delivery on Sales Orders",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Invoice on Sales Delivery",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Invoice Prepaid Orders",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Customer Payments",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Customer Credit Note",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     { label: "Reports", isHeader: true },
      //     {
      //       label: "Customer Transactions",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Customer Allocation",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     { label: "Maintenance", isHeader: true },
      //     {
      //       label: "Manage Customers",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Customer Branches",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Sales Type",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Credit Status",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //   ],
      // },
      // {
      //   label: "Purchases",
      //   icon: "o_credit_card",
      //   items: [
      //     {
      //       label: "Purchase Orders",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Direct Delivery",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Direct Invoice",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Outstanding PO",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Direct GRN",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     { label: "Reports", isHeader: true },
      //     {
      //       label: "Supplier Transaction",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Supplier Allocation",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     { label: "Reports", isHeader: true },
      //     {
      //       label: "Suppliers",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //   ],
      // },
      // {
      //   label: "Inventory",
      //   icon: "o_credit_card",
      //   items: [
      //     {
      //       label: "Location Transfers",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Adjustments",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     { label: "Reports", isHeader: true },
      //     {
      //       label: "Item Movements",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Item Status",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     { label: "Maintenance", isHeader: true },
      //     {
      //       label: "Stock Master",
      //       icon: "o_dashboard",
      //       route: { name: "Products", query: { mode: 0 } },
      //     },
      //     {
      //       label: "Item Categories",
      //       icon: "o_receipt_long",
      //       route: { name: "ItemCategory" },
      //     },
      //     {
      //       label: "Inventory Locations",
      //       icon: "o_receipt_long",
      //       route: { name: "InventoryLocation" },
      //     },
      //     {
      //       label: "Units of Measure",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Reorder Levels",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     { label: "Pricing and Cost", isHeader: true },
      //     {
      //       label: "Sales Pricing",
      //       icon: "o_dashboard",
      //       route: { name: "Products", query: { mode: 1 } },
      //     },
      //     {
      //       label: "Purchasing Pricing",
      //       icon: "o_dashboard",
      //       route: { name: "Products", query: { mode: 2 } },
      //     },
      //     {
      //       label: "Standard Cost",
      //       icon: "o_dashboard",
      //       route: { name: "Products", query: { mode: 3 } },
      //     },
      //   ],
      // },
      // {
      //   label: "Banking and GL",
      //   icon: "o_credit_card",
      //   items: [
      //     {
      //       label: "Payments",
      //       icon: "o_dashboard",
      //       route: { name: "Dashboard" },
      //     },
      //     {
      //       label: "Deposits",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Bank Account Transfer",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Journal Entry",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Budget Entry",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Reconcile Bank Acct",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     { label: "Reports", isHeader: true },
      //     {
      //       label: "Direct Invoice",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Direct Invoice",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Direct Invoice",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Direct Invoice",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //   ],
      // },
      // {
      //   label: "Setup",
      //   icon: "o_credit_card",
      //   items: [
      //     {
      //       label: "Company",
      //       icon: "o_dashboard",
      //       route: { name: "Dashboard" },
      //     },
      //     {
      //       label: "User Accounts",
      //       icon: "o_receipt_long",
      //       route: { name: "Employee" },
      //     },
      //     {
      //       label: "Access Roles",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Display Settings",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Tax Types",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //     {
      //       label: "Fiscal Years",
      //       icon: "o_receipt_long",
      //       route: { name: "Payslip" },
      //     },
      //   ],
      // },
    ],
    genMenu: [
      // { label: "separator", icon: "", route: {name: 'Dashboard'} },
      // { label: "Preferences", icon: "o_style", route: { name: "Preferences" } },
      { label: "About", icon: "o_info", route: { name: "About" } },
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
}, { persist: true});
