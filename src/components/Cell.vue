<template>
  <span v-bind:class = "{'cell':true, 'state':state}" v-on:click="toggleState"></span>
</template>
<script>

export default{
  props:['state','columnIndex'],
  methods:{
      toggleState(){
        console.log('cell')
        this.$emit('toggle-state',this.columnIndex)
        console.log('back to cell')
        console.log(this.state);
      }
  }
}
</script>
