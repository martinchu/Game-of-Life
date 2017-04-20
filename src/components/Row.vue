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
    // when clicked, emit back to parent with extra information
    // let the parent handle the change of state
    // the props is binded dynamically so it will update the state
    toggleState(columnIndex){
      this.$emit('toggle-state',columnIndex,this.rowIndex)
    }
  }
}
</script>
