<template>
  <div class="row">
    <cell v-for="(state,columnIndex) in rowState" v-bind:state="state" v-bind:column-index="columnIndex" v-on:toggle-state="toggleState"></cell>
  </div>
</template>
<script>
import Cell from './Cell.vue'
export default{
  components:{
    Cell
  },
  props: ['size','rowIndex', 'rowState'],
  methods:{
    toggleState(columnIndex){
      this.$emit('toggle-state',columnIndex,this.rowIndex)
    }
  }
}
</script>
