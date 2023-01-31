<template>
   <q-table
      class="inline-grid-edit sticky-header"
      virtual-scroll 
      :row-key="rowKey"
      :data="items"
      :columns="fields"    
    >
    <!-- :rows-per-page-options="[0]" :virtual-scroll-sticky-size-start="48" :pagination="pagination" :hide-bottom="items.length > 0"   -->
      <!-- 
        ":table-style="{tableLayout: 'fixed'}" 
       -->
        <!-- <template v-slot:loading>
          <div class="text-center text-danger my-2">
            <strong>Loading...</strong>
          </div>
        </template> -->

        <!-- <template v-slot:no-data="{ icon, message, filter }">
          <div class="loading-bar full-width row flex-center text-accent q-gutter-sm" >
            <span>
              {{ noDataMessage }}
            </span>
          </div>
        </template> -->

        <!-- <template v-slot:pagination="scope">
          <div class="flex flex-center">
            <q-pagination
              :max="5"
              :input="true"
            >
            </q-pagination>
          </div>
        </template> -->

        <!-- Custom Grid components based on DATATYPE property of fields -->
        <!-- <template v-slot:header>
          <tr>
              <q-th v-if="isDraggable" style="width:24px;max-width:48px">
                <div></div>
              </q-th>
              <th :style="fieldWidthCalc('RowNum')" v-if="showRowNum">
                <template>
                  <div style="white-space:normal;padding-left:6px;padding-right:10px">#</div>
                </template>                          
              </th>
              <th v-for="(col, colIndex) in fields" :key="!col.field ? `1--${GenUID()}` : `1--${colIndex}`" :style="fieldWidthCalc(col.field, col)">
                <div style="white-space:normal;padding-left:0px;text-align:left;font-weight:bold">{{ col.label }}</div>                          
              </th>
            </tr>
        </template> -->

        <template v-slot:body-cell="props">
        <!-- <q-td v-if="props.col.datatype === 'Currency'" :props="props">
          <q-badge color="blue" :label="props.col.field" />
        </q-td> -->
        <q-td :props="props">
          <!-- <q-badge color="blue" :label="props.row[props.col.field]" /> -->
          <!-- <slot name="CustomField" v-bind:data="{props}">
            
          </slot>  -->

          <q-btn small color="green" dark @click.stop="$emit('custom-field-cliked')">test</q-btn>
        </q-td>
      </template>

      

                <!-- <td v-if="showAction">
            <div style="padding-left:6px;text-align:right;padding-right:10px">
                Actions
            </div> 
          </td> -->
    </q-table>
</template>

<style scoped>
.sticky-header .q-table thead > tr > *{
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 2;
  background: #fff;
}

</style>
<style>
.q-table__control{
  width: 100%;
  justify-content: center;
}
.q-table tr{
  height: 52px;
}
.inline-grid-edit .q-table {
    table-layout: auto;
}
.cell-display{
  /* background-color: yellow; */
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  width: calc(100% - 0px);
  display: block;
  padding-top: 14px;
  padding-left:12px;
  padding-right: 12px;
  /* margin-right: 2px; */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.input-text{
  background-color: pink;
    display: block;
    top: 0px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding-left:12px;    
    padding-right: 12px;    
}
.inline-input {
    height: 38px;
    border-radius: 4px;
    border-width: 1px;
    padding-left: 8px;
    padding-right: 8px;
    border-color: #ddd;
    margin-left: -8px;
    font-size: 14px;
    width: 100%;
    min-width: 0px;
}
</style>

<script>
/* eslint-disable */
import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

export default {
  name: 'InlineGridEdit',
  setup(){
    const pagination = ref({
      page: 1,
      itemsPerPage: 32,
      maxPage: 10,
      rowsPerPage: 0
    })

    const targetObj = ref({
        element: null,
        text: '',
        rowItem: null,
        key: null,
        siteName: null
      })

    const qtable = ref(null)

    onMounted(() => {
      console.log(qtable.value)
    })

    const onDrop = (e, item) => {
      //console.log('test', e, item)
      this.$emit('on-drop', e, item)
    }

    const startDrag = (e, item) => {
      //console.log('startDrag', e, item)
      this.$emit('start-drag', e, item)
    }

    const formatDate = (date_time, type) => {
      if (date_time === null) return ''
      if (type && type === 'datetime4') return moment(date_time).format('YYYY-MMM-DD') 
      if (type && type === 'datetime3') return moment(date_time).format('MMM YYYY') 
      if (type && type === 'datetime2') return moment(date_time).format('YYYY-MM-DD') 
      return moment(date_time).format('YYYY-MM-DD hh:mm:ss')
    }

    const CalcRowAmount = (row) => {
      var qty = row.Qty || 0
      var price = row.UnitPrice || 0
      return qty * price
    }

    const GenUID = () => {
      return uuidv4()
    }

    const SelectAllChange = (event, row) =>{
      console.log('SelectAllChange', event, row)
      var _this = this
      this.items.forEach(element => {
        _this.$set(element, 'selected', event)
      })
    }

    const SelectChange = (event, row) => {
      console.log(event, row)
      //this.$set(row, 'selected', event)
      row['selected'] = event
    }

    const SelectEditor = (event, row, key, rowFlag, tempKey, ref) => {     
      this.$set(targetObj, tempKey, row[key])
      this.$set(row, rowFlag, true)
      
  
      this.$nextTick(() => {
        console.log(event.target.firstElementChild, this.$refs, this.$refs[ref][0])
        this.$refs[ref][0].focus()
      })
    }

    const BlurObject = (e, row, key, targetKey, valueKey) => {
      console.log('Blur Object', e, row, key)
      var x = row[targetKey]
      this.$set(row, targetKey, this.targetObj[valueKey])
      this.$set(row, key, false)

      if (x !== this.targetObj[valueKey]){
        row.dirty = true
        this.$emit('row-dirty', this.targetObj.rowItem)
      } 
    }

    const RemoveItem = (e) => {      
      var val = e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value //e.target.value
      //console.log('RemoveItem', e.target.value, 'val', val)

       if (this.targetObj.rowItem && this.targetObj.key){
          //console.log('assign value', val, this.targetObj.rowItem[this.targetObj.key])
          var x = this.targetObj.rowItem[this.targetObj.key]
          

          this.$set(this.targetObj.rowItem, this.targetObj.key, val)

          if (val !== x) {
            //console.log('RemoveItem', val, x, this.targetObj.key, this.targetObj.rowItem[this.targetObj.key])
            this.targetObj.rowItem.dirty = true
            this.$emit('row-dirty', this.targetObj.rowItem)
          }
        } 
      e.target.removeEventListener('blur', this.RemoveItem)
      e.target.remove()
    }

    const SelectItem = (event, row, key, type='text') => {
      //console.log('SelectItem', event, row, row.DeferredBacklog, row[key])
      this.targetObj.text = ''
      this.targetObj.rowItem = row
      this.targetObj.key = key
      var input = document.createElement("input");
      input.type = type;
      input.className = 'input-text'
      input.value = type === 'text' ? row[key] : parseFloat(row[key]) || 0
      if (type === 'number') input.style.textAlign = 'right'
      input.addEventListener('blur', this.RemoveItem)
      event.target.appendChild(input)
      input.focus()
    }

    const ScrollTo = (index) => {
      if (this.$refs.qtable){
        this.$refs.qtable.scrollTo(index)
      }
    }

    return {
      pagination,
      targetObj,
      onDrop,
      startDrag,
      formatDate,
      CalcRowAmount,
      GenUID,
      SelectAllChange,
      SelectChange,
      SelectEditor,
      BlurObject,
      RemoveItem,
      SelectItem,
      ScrollTo
    }
  },
  props: {
    items: Array,
    fields: Array,
    rowKey: {
      type: String,
      default: 'index'
    },
    showSelectBox: {
      type: Boolean,
      default: true
    },
    showRowNum: {
      type: Boolean,
      default: false
    },
    showAction: {
      type: Boolean,
      default: true
    },
    isDraggable: {
      type: Boolean,
      default: false
    },
    activeRowIndex: {
      type: Number,
      default: -1
    },
    fieldWidthCalc: {
      type: Function,
      default: function(key, field) {
          //console.log('fieldWidthCalc', this, this._self)
          //=== '100%' ? this._self.$vuetify.breakpoint.mdAndDown ? '100px' : field.width : field.width

          var x = {}
          
          if (field && field.width) {
            x['width'] = field.width
          }
          if (field && field.minWidth){
            x['min-width'] = field.minWidth
          }
          if (field && field.maxWidth){
            x['max-width'] = field.maxWidth
          }
          if (field && field.style){
            var temp = {...x, ...field.style}
            x = temp
          }

          return x
      }
    },
    calcRowAmount: {
      type: Function,
      default: function(row){
        var qty = row.Qty || 0
        var price = row.UnitPrice || 0
        return qty * price
      }
    },
    noDataMessage: {
      type: String,
      default: 'There are no records to show'
    }
  },
  computed: {
    getSelectedCount(){
      var x = 0
      this.items.forEach((element) => {
          if (element.selected) x++      
        });
        return x
    }
  },  
  methods: {
    
  }
}
</script>
