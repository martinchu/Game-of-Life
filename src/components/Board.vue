<template>
  <div id="board">
    <row v-for='(rowState,rowIndex) in initialState' v-bind:size="size" v-bind:row-index="rowIndex" v-bind:row-state="rowState" v-on:toggle-state="toggleState"></row>
  </div>
</template>
<script>
import Row from "./Row.vue"
export default{
  props:["size","initialState"],
  components:{
    Row
  },
  methods:{
    // when clicked, emit back to parent with extra information
    // let the parent handle the change of state
    // the props is binded dynamically so it will update the state
    toggleState(columnIndex,rowIndex){
      this.$emit('toggle-state',columnIndex,rowIndex)
    }
  }
}
</script>
