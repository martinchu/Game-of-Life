import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import Axios from 'axios';

var socket = io();

const store = new Vuex.Store({
  state:{
    size: 8,
    gameState:[]
  },
  getters: {
    liveCells: state => {
      var liveCells = [];
      for(var i = 0; i < state.size; i++){
        for(var j = 0; j < state.size; j++){
          if(state.gameState[i][j]){
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
          if(!state.gameState[i][j]){
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
      Vue.set(state.gameState[payload.rowIndex],payload.columnIndex,!state.gameState[payload.rowIndex][payload.columnIndex])
    },
    addNewRow(state,payload){
      state.gameState.push(payload)
    }
  },
  actions:{
    toggleCell(context,payload){
      return new Promise((resolve,reject) =>{
        Axios.post('/toggle_cell',payload).then(response => {
          if(response.status === 200){
            socket.emit('chat message',context,payload);
            context.commit('toggleCell',payload);
            resolve();
          }
          else{
            reject(new Error('not toggled succesfully'));
          }
        });
      });

    }
  }
});
socket.on('chat message',(context,payload) =>{
  // context.commit('toggleCell',payload);
  store.commit('toggleCell',payload)
});
export { store };
