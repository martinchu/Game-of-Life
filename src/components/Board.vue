<template>
  <div id="board">
    <row v-for='(rowState,rowIndex) in initialState' v-bind:row-index="rowIndex"></row>
  </div>
</template>
<script>
import Row from "./Row.vue"
export default{
  components:{
    Row
  },
  methods:{
    // when clicked, emit back to parent with extra information
    // let the parent handle the change of state
    // the props is binded dynamically so it will update the state
    // toggleState(columnIndex,rowIndex){
    //   this.$emit('toggle-state',columnIndex,rowIndex)
    // }
  },
  computed:{
    size(){
      return this.$store.state.size;
    },
    initialState(){
      return this.$store.state.initialState;
    }
  }
}
</script>
