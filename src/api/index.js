import server from '../server'


//board api assets

export default {
    //Employees Data
    EmployeeSave(data) {
        return server.post('users/saveinfo', { info: data })
    },
    EmployeeGetAll(data) {
        return server.post('users/getall', { filterOptions: data })
    },
    EmployeeGetInfo(id) {
        return server.post('users/getinfo', { id: id })
    },
    EmployeeDelete(data) {
        return server.post('users/delete', { info: data })
    }, 
    //Inventory
    InventorySave(data) {
        return server.post('inventory/saveinfo', { info: data })
    },
    InventoryGetAll(data) {
        return server.post('inventory/getall', { filterOptions: data })
    },
    InventoryGetInfo(id) {
        return server.post('inventory/getinfo', { id: id })
    },
    InventoryDelete(data) {
        return server.post('inventory/delete', { info: data })
    },  
    //Sales Pricing
    SalesPricingGetAll(data) {
        return server.post('inventory/sales/pricing/getall', { id: data })
    }, 
    SalesPricingGetInfo(data) {
        return server.post('inventory/sales/pricing/getinfo', { id: data })
    }, 
    SalesPricingSave(data) {
        return server.post('inventory/sales/pricing/save', { info: data })
    },  
    SalesPricingDelete(data) {
        return server.post('inventory/sales/pricing/delete', { id: data })
    },   
    //Purchasing Pricing
    PurchPricingGetAll(data) {
        return server.post('inventory/purchasing/pricing/getall', { id: data })
    }, 
    PurchPricingGetInfo(data) {
        return server.post('inventory/purchasing/pricing/getinfo', { id: data })
    }, 
    PurchPricingSave(data) {
        return server.post('inventory/purchasing/pricing/save', { info: data })
    },  
    PurchPricingDelete(data) {
        return server.post('inventory/purchasing/pricing/delete', { id: data })
    },  
    //ItemCategory
    ItemCategoryGetAll(data) {
        return server.post('inventory/item/category/getall', { info: data })
    }, 
}