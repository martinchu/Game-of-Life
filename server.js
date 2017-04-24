require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
// const reload = require('reload');
const server = http.createServer(app);
const serialize = require('serialize-javascript')
const io = require('socket.io')(server);

const gameSize = 8;

var setup = {
  size: gameSize,
  gameState:[]
};

var tempRow = [];
for(var i = 0; i< gameSize;i++){
  tempRow.push(false);
}
for(var j= 0; j< gameSize; j++){
  setup.gameState.push(tempRow.slice());
}

app.use(require('body-parser').json())

app.get('/',(req,res) => {
  const template = fs.readFileSync(path.resolve('./index.html'),'utf-8');
  const contentMarket = '<!-- APP -->'
  res.send(template.replace(contentMarket,`<script> var __INITIAL_STATE__ = ${serialize(setup)}</script>`));
});

app.post('/toggle_cell',(req,res) =>{
  setup.gameState[req.body.rowIndex][req.body.columnIndex] = !setup.gameState[req.body.rowIndex][req.body.columnIndex];
  res.sendStatus(200)
})

app.use('/public',express.static(path.join(__dirname,'public')));

var config = require('./config')
require('./webpack-dev-middleware').init(app);
// if (config.NODE_ENV === 'development') {
//   const reloadServer = reload(server,app);
// }

server.listen(config.PORT,(()=> {
  // if (config.NODE_ENV === 'development') {
  //   require('open')(`http://localhost:${config.PORT}`);
  // }
}));

io.on('connection',(socket) =>{
  socket.on('toggle cell',(context,payload) =>{
    socket.broadcast.emit('toggle cell',context,payload);
  });
});
