import Vue from 'vue';
import './style.scss';

import Board from './components/Board.vue'

// var socket = io();

new Vue({
  el: '#root',
  data:{
    size: 4,
    liveCells:[],
    initialState:[
      [false,false,false,false],
      [false,false,false,false],
      [false,false,false,false],
      [false,false,false,false]]
    },
    components: {
      Board,

    },
    methods:{
      // Step through the game
      onUpdate: function(){
        if(this.liveCells.length){
          this.liveCells.forEach( cell =>{
            var neighbourCount = 0;
            // finding possible alive neighbour
            for(var i = -1; i < 2; i++){
              for(var j = -1; j < 2; j++){
                var neighbour = {
                  columnIndex: cell.columnIndex + i,
                  rowIndex: cell.rowIndex + j
                }
                this.liveCells.forEach( item =>{
                  if((i != 0 || j != 0) && neighbour.columnIndex == item.columnIndex && neighbour.rowIndex == item.rowIndex){
                    neighbourCount++;
                  }
                }
              )
            }
          }
          if(neighbourCount==2 || neighbourCount==3){
            console.log("survived. ")
          }
          else{
            console.log("under/over populated.")
          }
        })
      }
    },
    // Notify main.js that user changes a cell:
    // 1. Toggle the state
    // 2. Push on/off the cell of the array that keeps track of the living cell
    toggleState(columnIndex,rowIndex){
      // this.initialState[rowIndex][columnIndex] =! this.initialState[rowIndex][columnIndex];
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
      if(this.initialState[rowIndex][columnIndex]){
        this.liveCells.push(cell)
      }
      // if this cell is reported dead(being UNpopulated), delete the cell value off of the liveCells array
      else{
        this.liveCells.splice(this.liveCells.indexOf(cell),1)
      }
      console.log(this.liveCells)
    }
  }
});
