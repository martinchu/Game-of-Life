import Vue from 'vue';
import './style.scss';

import genres from './util/genres';
import Board from './components/Board.vue'

// var socket = io();

new Vue({
  el: '#root',
  data:{
    size: 4,
    allDead:true,
    liveCells:[]
  },
  // template:``,
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
  reportLife(alive,columnIndex,rowIndex){
    var cell = {
      columnIndex:columnIndex,
      rowIndex: rowIndex
    }
    // console.log(typeof(cell.columnIndex))
    // if this cell is reported alive(being populated), push the cell value into the liveCells array
    if(alive){
      this.liveCells.push(cell)
    }
    // if this cell is reported dead(being UNpopulated), delete the cell value off of the liveCells array
    else{
      this.liveCells.splice(this.liveCells.indexOf(cell),1)
    }
  }
}
});
