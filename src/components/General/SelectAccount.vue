<template>
  <q-select
    class="q-mr-sm q-mb-sm"
    filled
    dense
    virtual-scroll-item-size="48"
  >
    <template v-slot:option="scope">
      <q-item-label v-if="scope.opt.isHeader !== undefined" class="q-pa-sm text-bold" style="font-size: 0.9em !important;">{{ scope.opt.label }}</q-item-label>  
      <q-item v-else v-bind="scope.itemProps" class="q-pl-md" dense>
        <q-item-section class="row">
          <q-item-label><div class="float-left" style="width:50px">{{ scope.opt.value }}</div><div class="float-left">{{ scope.opt.label }}</div></q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:selected-item="scope">
        <q-item dense class="q-px-none">
            <q-item-section class="row">
            <q-item-label style="font-size: 1.2em"><div class="float-left" style="width:50px">{{ scope.opt.value }}</div><div class="float-left">{{ scope.opt.label }}</div></q-item-label>
            </q-item-section>
        </q-item>
    </template>
  </q-select>
</template>

<script>
export default {
  name: "SelectAccounts",
};
</script>