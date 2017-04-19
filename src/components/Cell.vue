<template>
  <span v-bind:class = "{'cell':true, 'alive':alive}" v-on:click="checkCell"></span>
</template>
<script>

export default{
  data(){
    return{
      alive: false
      // the cell is not populated by default
    };
  },
  props:['columnIndex'],
  methods:{
    // checkCell: change if the cell is alive
      checkCell(){
        this.alive = !this.alive;
        this.$emit('report-life',this.alive,this.columnIndex)
      }
  }
}
</script>
