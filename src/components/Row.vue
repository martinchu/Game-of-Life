<template>
  <div class="row">
    <cell v-for="column in columns" v-bind:columnIndex="column" v-on:report-life="reportLife"></cell>
</div>
</template>
<script>
import Cell from './Cell.vue'
export default{
  components:{
    Cell
  },
  data(){
    return{
      columns:[0,1,2,3]
      // using size like the Board.vue does not render the right structure
      // unknown reason
      // Fix for the future
    }
  },
  props: ['size','rowIndex'],
  methods:{
    reportLife(alive,columnIndex){
      this.$emit('report-life',alive,columnIndex,this.rowIndex)
    }
  }
}
</script>
