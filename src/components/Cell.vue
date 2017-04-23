<template>
  <span v-bind:class = "{'cell':true, 'state':cellState}" v-on:click="toggleStateV2"></span>
</template>
<script>

export default{
  props:['columnIndex','rowIndex'],
  methods:{
    // when clicked, emit back to parent with extra information
    // let the parent handle the change of state
    // the props is binded dynamically so it will update the state
    // toggleState(){
    //   this.$emit('toggle-state',this.columnIndex)
    // },
    toggleStateV2(){
      this.$store.commit('toggleCell',{
        columnIndex: this.columnIndex,
        rowIndex: this.rowIndex
      })
    }
  },
  computed:{
    cellState(){
      var i = this.rowIndex;
      var j = this.columnIndex;
      return this.$store.state.initialState[i][j];
    }
  }
}
</script>
