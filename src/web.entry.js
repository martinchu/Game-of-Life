import Vue from 'vue';
import './style.scss';

import Board from './components/Board.vue'

// import Axios from 'axios';

// var socket = io();

new Vue({
  el: '#root',
  data:{
    size: 8,
    liveCells:[],
    deadCells:[],
    initialState:[]
  },
  components: {
    Board,

  },
  methods:{
    // mutateCell: boolean -> Array[Object]
    // Function: find cells that are going to change state
    // mutateAliveCell determines whether we are looking for Alive cells that are mutating/going to be dead
    mutateCell:function(mutateAliveCell){
      var mutatingCells=[];
      var targetCells;
      if(mutateAliveCell){
        targetCells = this.liveCells
      }
      else{
        targetCells = this.deadCells;
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
            this.liveCells.forEach( liveCell =>{
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
      this.toggleState(item.columnIndex,item.rowIndex);
      // kill off cells
    })
    newLiveCells.forEach((item)=>{
      this.toggleState(item.columnIndex,item.rowIndex);
      // populate cells
    })
  },
  // toggleState: num, num => none
  // Function: Notify main.js that user changes a cell
  // 1. Toggle the state by set a temporary Row Data array and use this.$set (directly changing the array element will not dynamically change the props of the cell)
  // 2. Push on/off the cell of the array that keeps track of the living cell
  toggleState(columnIndex,rowIndex){
    var newRow = [];
    this.initialState[rowIndex].forEach(
      (item,i)=>{
        if(i == columnIndex){
          newRow.push(!this.initialState[rowIndex][i])
        }
        else{
          newRow.push(this.initialState[rowIndex][i])
        }
      }
    )
    this.$set(this.initialState,rowIndex,newRow);
    var cell = {
      columnIndex:columnIndex,
      rowIndex: rowIndex
    }
    var originalCellArray;
    var newCellArray;
    // if this cell is now alive(being populated), push the cell value into the liveCells array and delete it off the deadcells array
    if(this.initialState[rowIndex][columnIndex]){
      newCellArray = this.liveCells;
      originalCellArray = this.deadCells;
    }
    // if this cell is now alive(being populated), push the cell value into the deadCells array and delete it off the liveCells array
    else{
      newCellArray = this.deadCells;
      originalCellArray = this.liveCells;
    }
    newCellArray.push(cell);
    originalCellArray.forEach((originalCell,i) =>{
    if(columnIndex == originalCell.columnIndex && rowIndex == originalCell.rowIndex){
          originalCellArray.splice(i,1) //splice the cell is proven to ve not working
        }
    })
  }
},
// mounted: none -> none;
// randomly generated the states of the board
// will push all the states into the Node JS server in future development
mounted: function(){
  for(var rowIndex =0;rowIndex<this.size;rowIndex++){
    var tempRow = [];
    for(var columnIndex=0;columnIndex<this.size;columnIndex++){
      var random_boolean = Math.random() >= 0.5;
      var tempCell = {
        columnIndex:columnIndex,
        rowIndex: rowIndex
      }
      if(random_boolean){
        this.liveCells.push(tempCell)
      }
      else{
        this.deadCells.push(tempCell)
      }
      tempRow.push(random_boolean);
    }
    this.initialState.push(tempRow);
    // let obj = []
    // Axios.post('/add_event',tempRow);
    // ^posting the object into file
  }
}
});
