const express = require('express');
const io = require('socket.io');
const {
  MAP_MOVE,
  MAP_CLICK_FEATURE,
  MAP_CLOSE_POPUP,
  MAP_ZOOM_UPDATE,
} = require('./constants');

const app = express();
app.use(express.static('public'));
const server = app.listen(3000);

const ioServer = io(server);

ioServer.on('connection', socket => {
  socket.on(MAP_MOVE, center => socket.broadcast.emit(MAP_MOVE, center));
  socket.on(MAP_CLICK_FEATURE, featureId => socket.broadcast.emit(MAP_CLICK_FEATURE, featureId));
  socket.on(MAP_CLOSE_POPUP, () => socket.broadcast.emit(MAP_CLOSE_POPUP));
  socket.on(MAP_ZOOM_UPDATE, zoom => socket.broadcast.emit(MAP_ZOOM_UPDATE, zoom));
});
