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
  methods:{
    // when clicked, emit back to parent with extra information
    // let the parent handle the change of state
    // the props is binded dynamically so it will update the state
    // toggleState(columnIndex){
    //   this.$emit('toggle-state',columnIndex,this.rowIndex)
    // }
  },
  computed:{
    rowState(){
      var i = this.rowIndex;
      return this.$store.state.initialState[i];
    }
  }
}
</script>
