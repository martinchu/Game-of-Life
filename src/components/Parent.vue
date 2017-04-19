<template>
  <div id="parent">
    <child v-for='(i,rowIndex) in initialState' v-bind:size="size" v-bind:rowIndex="rowIndex" v-bind:rowState="this.initialState[rowIndex]"></child>
  </div>
</template>
<script>
import Child from "./Child.vue"
export default{
  data(){
    return{
      initialState:[
      [0,0,0,0],
      [0,0,0,1],
      [0,1,0,0],
      [0,0,1,0]]
    }
  },
  props:["size"],
  components:{
    Child
  },
  methods:{

  }
}
</script>
