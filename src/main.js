import Vue from 'vue';
import './style.scss';

import genres from './util/genres';
import Board from './components/Board.vue'

// var socket = io();

new Vue({
  el: '#root',
  data:{
    size: 4,
    liveCells:[],
    initialState:[
      [false,true,false,false],
      [false,false,false,false],
      [false,false,false,false],
      [false,false,false,false]]
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
  toggleState(columnIndex,rowIndex){
    this.initialState[rowIndex][columnIndex] =! this.initialState[rowIndex][columnIndex];
  }
}
});
