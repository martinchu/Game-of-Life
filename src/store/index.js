import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


export default new Vuex.Store({
  state:{
    size: 8,
    liveCells:[],
    deadCells:[],
    initialState:[]
  },
  mutations: {
    toggleCell(state,payload){
      Vue.set(state.initialState[payload.rowIndex],payload.columnIndex,!state.initialState[payload.rowIndex][payload.columnIndex])
      var originalCellArray;
      var newCellArray;
      // if this cell is now alive(being populated), push the cell value into the liveCells array and delete it off the deadcells array
      if(state.initialState[payload.rowIndex][payload.columnIndex]){
        newCellArray = state.liveCells;
        originalCellArray = state.deadCells;
      }
      // if this cell is now alive(being populated), push the cell value into the deadCells array and delete it off the liveCells array
      else{
        newCellArray = state.deadCells;
        originalCellArray = state.liveCells;
      }
      newCellArray.push(payload);
      originalCellArray.forEach((originalCell,i) =>{
        if(payload.columnIndex == originalCell.columnIndex && payload.rowIndex == originalCell.rowIndex){
          originalCellArray.splice(i,1) //splice the cell is proven to ve not working
        }
      })
    }
  },
  actions:{

  }
});
