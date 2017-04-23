<template>
  <div class="row">
    <cell v-for="(state,columnIndex) in rowState" v-bind:column-index="columnIndex" v-bind:row-index="rowIndex"></cell>
  </div>
</template>
<script>
import Cell from './Cell.vue'
export default{
  components:{
    Cell
  },
  props: ['rowIndex'],
  computed:{
    rowState(){
      var i = this.rowIndex;
      return this.$store.state.initialState[i];
    }
  }
}
</script>
