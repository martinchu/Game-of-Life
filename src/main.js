import Vue from 'vue';
import './style.scss';

import Board from './components/Board.vue'

// var socket = io();

new Vue({
  el: '#root',
  data:{
    size: 4,
    liveCells:[],
    deadCells:[],
    initialState:[]
  },
  components: {
    Board,

  },
  methods:{
    // Step through the game
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
      var threeNeighbour = neighbour > 3;
      if(overOrUnderPopulated == mutateAliveCell){
        var mutatingCell = {
          columnIndex:cell.columnIndex,
          rowIndex: cell.rowIndex
        }
        mutatingCells.push(mutatingCell)
      }
    })
    return mutatingCells;
  },
  onUpdate: function(){
    var newDeadCells = this.mutateCell(true);
    newDeadCells.forEach((item)=>{
      this.toggleState(item.columnIndex,item.rowIndex);
    })
    var newLiveCells = this.mutateCell(false);
    console.log(newLiveCells);
    newLiveCells.forEach((item)=>{
      this.toggleState(item.columnIndex,item.rowIndex);
    })
  },
  // toggleState: num, num => void
  // Function: Notify main.js that user changes a cell
  // 1. Toggle the state by set a temporary Row Data array and use this.$set
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
    // if this cell is reported alive(being populated), push the cell value into the liveCells array
    var originalCellArray;
    var newCellArray;
    if(this.initialState[rowIndex][columnIndex]){
      newCellArray = this.liveCells;
      originalCellArray = this.deadCells;
    }
    else{
      newCellArray = this.deadCells;
      originalCellArray = this.liveCells;
    }
    newCellArray.push(cell);
    originalCellArray.forEach((originalCell,i) =>{
    if(columnIndex == originalCell.columnIndex && rowIndex == originalCell.rowIndex){
          originalCellArray.splice(i,1)
        }
    })
  }
},
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
  }
}
});
