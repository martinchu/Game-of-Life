import Vue from 'vue';
import './style.scss';

import Board from './components/Board.vue'

// var socket = io();
import store from './store'

new Vue({
  el: '#root',
  store,
  components: {
    Board
  },
  methods:{
    // mutateCell: boolean -> Array[Object]
    // Function: find cells that are going to change state
    // mutateAliveCell determines whether we are looking for Alive cells that are mutating/going to be dead
    mutateCell:function(mutateAliveCell){
      var mutatingCells=[];
      var targetCells;
      if(mutateAliveCell){
        targetCells = this.$store.getters.liveCells
      }
      else{
        targetCells = this.$store.getters.deadCells;
      }
      targetCells.forEach( cell =>{
        var neighbourCount = 0;
        // finding possible alive neighbour
        for(var i = -1; i < 2; i++){
          for(var j = -1; j < 2; j++){
            // loop through the 8 neighbours
            var neighbour = {
              columnIndex: cell.columnIndex + i,
              rowIndex: cell.rowIndex + j
            }
            // Search through existing living cells
            this.$store.getters.liveCells.forEach( liveCell =>{
              if((i != 0 || j != 0) && neighbour.columnIndex == liveCell.columnIndex && neighbour.rowIndex == liveCell.rowIndex){
                // if that neighbour is a live cell
                neighbourCount++;
              }
            }
          )
        }
      }
      var overOrUnderPopulated = (neighbourCount>3 ||neighbourCount<2)// if the cell is over/under-populated
      // looking for Alive cells that are mutating/going to be dead
      var mutatingCell = {
        columnIndex:cell.columnIndex,
        rowIndex: cell.rowIndex
      }
      if(overOrUnderPopulated == mutateAliveCell && mutateAliveCell){
        mutatingCells.push(mutatingCell)
      }
      // looking for dead cells that are mutating/going to be alive
      else if(!mutateAliveCell && neighbourCount==3){
        mutatingCells.push(mutatingCell)
      }
    })
    return mutatingCells;
  },
  // onUpdate: none -> none
  // Function: respond to the update button (will be automated with a setinterval in future development)
  onUpdate: function(){
    var newDeadCells = this.mutateCell(true);
    // find alive cells that are going to be dead
    var newLiveCells = this.mutateCell(false);
    // find dead cells that are going to be alive
    newDeadCells.forEach((item)=>{
      this.$store.commit('toggleCell',item)
      // kill off cells
    })
    newLiveCells.forEach((item)=>{
      this.$store.commit('toggleCell',item)
      // populate cells
    })
  },
},
// mounted: none -> none;
// randomly generated the states of the board
// will push all the states into the Node JS server in future development
mounted: function(){
  // var size = this.$store.state.size;
  for(var rowIndex =0;rowIndex<this.$store.state.size;rowIndex++){
    var tempRow = [];
    for(var columnIndex=0;columnIndex<this.$store.state.size;columnIndex++){
      var random_boolean = Math.random() >= 0.5;
      tempRow.push(random_boolean);
    }
    this.$store.commit('addNewRow',tempRow);
  }
  // setInterval(this.onUpdate,2500)
},
computed:{
  size(){
    return this.$store.state.size;
  },
  initialState(){
    return this.$store.state.initialState;
  }
},
beforeDestroy: function(){
  clearInterval(this.onUpdate);
}
});
