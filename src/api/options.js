import server from '../server'

export default {
    GetChartMaster(){
        return server.post('accounts/lookup/charts')
    }, 
    GetStockCategory(){
        return server.get('lookup/stock/category')
    },  
    GetTaxTypes(){
        return server.get('lookup/tax/types')
    }, 
    GetItemUnits(){
        return server.get('lookup/item/units')
    }, 
    GetSalesTypes(){
        return server.get('lookup/sales/type')
    }, 
    GetCurrencies(){
        return server.get('lookup/currencies')
    },
    GetSuppliers(){
        return server.get('lookup/suppliers')
    },

}