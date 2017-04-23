import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import Axios from 'axios';

export default new Vuex.Store({
  state:{
    size: 8,
    initialState:[]
  },
  getters: {
    liveCells: state => {
      var liveCells = [];
      for(var i = 0; i < state.size; i++){
        for(var j = 0; j < state.size; j++){
          if(state.initialState[i][j]){
            var cell ={
              columnIndex: j,
              rowIndex: i
            }
            liveCells.push(cell)
          }
        }
      }
      return liveCells;
    },
    deadCells: state => {
      var deadCells = [];
      for(var i = 0; i < state.size; i++){
        for(var j = 0; j < state.size; j++){
          if(!state.initialState[i][j]){
            var cell ={
              columnIndex: j,
              rowIndex: i
            }
            deadCells.push(cell)
          }
        }
      }
      return deadCells;
    }
  },
  mutations: {
    toggleCell(state,payload){
      Vue.set(state.initialState[payload.rowIndex],payload.columnIndex,!state.initialState[payload.rowIndex][payload.columnIndex])
      Axios.post('/add_event',payload);
    },
    addNewRow(state,payload){
      state.initialState.push(payload)
    }
  },
  actions:{
    addEvent(context,payload){
      console.log(context)
    }
  }
});
