# Conway's Game of Life


## Installation

1. Clone this repository on your local file system

    ```
    $ cd /path/to/install/location
    $ git clone git@github.com:martinchu/Game-of-Life.git
    ```

2. Install dependencies

    ```
    $ npm install
    ```

3. Start project

    ```
    $ npm run start
    ```


## TODOs
  1. New Veux Constant to store the states of the board

    ```
    ```
    ```
    Vue.use(Vuex);

    const store = new Vuex.Store({
      state:{
        boardState: [....,.....]
      },
      mutations:{
        toggleState(state, [columnIndex, rowIndex]){
          state.boardState[rowIndex][columnIndex].$set(...)
        }
      }
    });


    Vue.component({
      computed:{
        myVal(){
          return this.$store.state.myVal;
        }
      },
      methods:{
        updateVal(){
          this.$store.commit('toggleState')
        }
      },
      template:
      <div>...</div>
    })





    ```
  2. Change the board from boolean based to integar based
  ```

  ```
