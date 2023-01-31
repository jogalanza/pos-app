import api from '../../api/options'

const state = () => ({
  ChartMaster: null,
  StockCategory: null,
  TaxTypes: null,
  ItemTypes: [
    { label: "Manufactured", value: "M" },
    { label: "Purchased", value: "B" },
    { label: "Service", value: "D" }
  ],
  ItemUnits: null,
  SalesTypes: null,
  Currencies: null,
  Suppliers: null,
})

const getters = {
  ChartMaster(state) {
    if (state.ChartMaster === null) return [{ value: "", label: "Loading..." }]
    return [...state.ChartMaster]
  },
  StockCategory(state) {
    if (state.StockCategory === null) return [{ value: "", label: "Loading..." }]
    return [...state.StockCategory]
  },
  TaxTypes(state) {
    if (state.TaxTypes === null) return [{ value: "", label: "Loading..." }]
    return [...state.TaxTypes]
  },
  ItemTypes(state){
    return [...state.ItemTypes]
  },
  ItemUnits(state) {
    if (state.ItemUnits === null) return [{ value: "", label: "Loading..." }]
    return [...state.ItemUnits]
  },
  SalesTypes(state) {
    if (state.SalesTypes === null) return [{ value: "", label: "Loading..." }]
    return [...state.SalesTypes]
  },
  Currencies(state) {
    if (state.Currencies === null) return [{ value: "", label: "Loading..." }]
    return [...state.Currencies]
  },
  Suppliers(state) {
    if (state.Suppliers === null) return [{ value: "", label: "Loading..." }]
    return [...state.Suppliers]
  },
}

const actions = {
  GetAllOptions(context) {
    context.dispatch('GetChartMaster')
    context.dispatch('GetStockCategory')
    context.dispatch('GetTaxTypes')
    context.dispatch('GetItemUnits')
    context.dispatch('GetSalesTypes')
    context.dispatch('GetCurrencies')
    //context.dispatch('GetSuppliers')
  },
  GetChartMaster(context) {
    api.GetChartMaster()
      .then(response => {
        context.state.ChartMaster = [...response.data.data]
      })
  },
  GetStockCategory(context) {
    api.GetStockCategory()
      .then(response => {
        if (response.data.success) {
          context.state.StockCategory = [...response.data.data]
        }
      })
  },
  GetTaxTypes(context) {
    api.GetTaxTypes()
      .then(response => {
        if (response.data.success) {
          context.state.TaxTypes = [...response.data.data]
        }
      })
  },
  GetItemUnits(context) {
    api.GetItemUnits()
      .then(response => {
        if (response.data.success) {
          context.state.ItemUnits = [...response.data.data]
        }
      })
  },
  GetSalesTypes(context) {
    api.GetSalesTypes()
      .then(response => {
        if (response.data.success) {
          context.state.SalesTypes = [...response.data.data]
        }
      })
  },
  GetCurrencies(context) {
    api.GetCurrencies()
      .then(response => {
        if (response.data.success) {
          context.state.Currencies = [...response.data.data]
        }
      })
  },
  GetSuppliers(context) {
    api.GetSuppliers()
      .then(response => {
        if (response.data.success) {
          context.state.Suppliers = [...response.data.data]
        }
      })
  },
}

const mutations = {
  updateUser(state, payload) {
    if (payload === null) state.ActiveUser = null
    else state.ActiveUser = { ...payload }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}