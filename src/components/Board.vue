<template>
  <div id="board">
    <row v-for='(rowState,rowIndex) in gameState' v-bind:row-index="rowIndex"></row>
  </div>
</template>
<script>
import Row from './Row.vue'
export default{
  components:{
    Row
  },
  computed:{
    size(){
      return this.$store.state.size;
    },
    gameState(){
      return this.$store.state.gameState;
    }
  }
}
</script>
