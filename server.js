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

var initialState =[
  [false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false]
]
app.use(require('body-parser').json())

app.get('/',(req,res) => {
  const template = fs.readFileSync(path.resolve('./index.html'),'utf-8');
  const contentMarket = '<!-- APP -->'
  res.send(template.replace(contentMarket,`<script> var __INITIAL_STATE__ = ${serialize(initialState)}</script>`));
});

app.post('/toggle_cell',(req,res) =>{
  initialState[req.body.rowIndex][req.body.columnIndex] = !initialState[req.body.rowIndex][req.body.columnIndex];
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
  socket.on('chat message',(context,payload) =>{
    socket.broadcast.emit('chat message',context,payload);
  });
});
