<template>
  <span v-bind:class = "{'cell':true, 'state':state}" v-on:click="toggleState"></span>
</template>
<script>

export default{
  props:['state','columnIndex'],
  methods:{
    toggleState(){
      this.$emit('toggle-state',this.columnIndex)
    }
  }
}
</script>
