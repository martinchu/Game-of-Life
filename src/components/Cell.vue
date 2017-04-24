<template>
  <span v-bind:class = "{'cell':true, 'state':cellState}" v-on:click="toggleState"></span>
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
    toggleState(){
      this.$store.dispatch('toggleCell',{
        columnIndex: this.columnIndex,
        rowIndex: this.rowIndex
      })
      // this.$store.commit('toggleCell',{
      //   columnIndex: this.columnIndex,
      //   rowIndex: this.rowIndex
      // })
    }
  },
  computed:{
    cellState(){
      var i = this.rowIndex;
      var j = this.columnIndex;
      return this.$store.state.gameState[i][j];
    }
  }
}
</script>
