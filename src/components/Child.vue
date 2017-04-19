<template>
  <div id="child">
    <grandchild v-for="column in columns" v-bind:columnIndex="column" v-bind:alive="rowState[column]" v-on:report-life="reportLife" ></grandchild>
  </div>
</template>
<script>
import Grandchild from "./Grandchild.vue"
export default{
  props: ['size','rowIndex','rowState'],
  data(){
    return{
        columns:[0,1,2,3]
    }
  },
  methods:{
    reportLife(alive,columnIndex){
      this.$emit('report-life',alive,columnIndex,this.rowIndex)
    }
  },
  components:{
    Grandchild
  }

}
</script>
