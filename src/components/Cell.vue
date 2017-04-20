<template>
  <span v-bind:class = "{'cell':true, 'state':state}" v-on:click="toggleState"></span>
</template>
<script>

export default{
  props:['state','columnIndex'],
  methods:{
    // when clicked, emit back to parent with extra information
    // let the parent handle the change of state
    // the props is binded dynamically so it will update the state
    toggleState(){
      this.$emit('toggle-state',this.columnIndex)
    }
  }
}
</script>
