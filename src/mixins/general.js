import router from '../router/index'
import { Notify, Dialog } from 'quasar'

const currentFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP'})
const numberFormatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2});

export default function () {

    function navigateTo(item) {
        console.log(item)
        if (item.name) {
            router.push(item)
        }
    }

    function NotifyUser(data) {
        Notify.create({
            type: data.success ? "positive" : "negative",
            message: data.message,
            html: true
        })
    }

    function ConfirmAction(data, okCallback, opts){
        Dialog.create({
            title: "Confirm",
            message: opts && opts.message ? opts.message : `Would you like to delete ${(data.length > 1 ? 'these' : 'this')} record${(data.length > 1 ? 's' : '')}?`,
            cancel: true,
            ok: {
                label: "Yes"
            },
            persistent: true,
        }).onOk(() => {
            okCallback();
        });
    }

    function getObjValue(arr, key, value) {
        var x = null
        var b = false
        console.log('getObjValue', arr, key, value)
        if (value !== undefined && value !== null) {
            arr.forEach(element => {
                //console.log('getObjValue', element)
                if (element[key] !== undefined) {
                    if (element[key] === value && !b) {
                        x = element
                        b = true
                    }
                }
            })
        }

        return x
    }

    function getObjLabel(arr, key, value, label) {
        var x = ""
        var b = false
        if (value !== undefined && value !== null) {
            arr.forEach(element => {
                if (element[key] !== undefined) {
                    if (element[key] === value && !b) {
                        if (element[label] !== undefined) x = element[label]
                        b = true
                    }
                }
            })
        }

        return x
    }

    function hasSelectedItem(arr) {
        var x = false;
        arr.every(element => {
            if (element.isSelected) {
                x = true;
                return false;
            }
            return true;
        });

        return x;
    }

    function formatCurrency(data) {
        return currentFormatter.format(parseFloat(data));
    }

    function formatNumber(data, decimal = 0) {
        return numberFormatter.format(parseFloat(data | "0").toFixed(decimal));
      }

    return {
        navigateTo,
        getObjValue,
        getObjLabel,
        NotifyUser,
        ConfirmAction,
        hasSelectedItem,
        formatCurrency,
        formatNumber
    }
}