import Vue from 'vue';
import './style.scss';

import genres from './util/genres';

new Vue({
  el: '#root',
  data:{
    sizeOfGrid: 5
  },
  // template:``,
  components: {
    'board':{
      template:`<div id="Board">
      board
        <row></row>
      </div>`,
      components:{
        'row':{
          template:`<div class="row">
          row
            <cell></cell>
            <cell></cell>
          <div>`,
          components:{
            'cell':{
              template:`
              <span class = "cell">cell</span>
              `
            }
          }
        }
      }
    },
  }
});
