<template>
  <div id="board">
    <row v-for='(i,rowIndex) in size' v-bind:size="size" v-bind:rowIndex="rowIndex" v-on:report-life="reportLife"></row>
  </div>
</template>
<script>
import Row from "./Row.vue"
export default{
  props:["size"],
  components:{
    Row
  },
  methods:{
    reportLife(alive,columnIndex,rowIndex){
      this.$emit('report-life',alive,columnIndex,rowIndex)
    }
  }
}
</script>
