const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let players = {};
let connectedPlayers = 0;
const readyPlayers = new Set();
const startPositions = [-250, 250];
const playerStartY = 100;
const playerStartZ = 14800;

function emitDebugState(eventName) {
    const state = {
        event: eventName,
        connectedPlayers,
        readyCount: readyPlayers.size,
        playerIds: Object.keys(players),
        readyPlayerIds: Array.from(readyPlayers)
    };
    console.log('debugState:', state);
    io.emit('debugState', state);
}

function emitInitialState(socket) {
    const player = players[socket.id];
    if (!player) {
        return;
    }

    socket.emit('myMachine', player);

    Object.values(players).forEach((otherPlayer) => {
        if (otherPlayer.id !== socket.id) {
            socket.emit('opponent', otherPlayer);
        }
    });
}

io.on('connection', (socket) => {
    console.log('New Player Connected:', socket.id);

    if (connectedPlayers >= 2) {
        socket.emit('full', 'The server is full');
        socket.disconnect();
        return;
    }
    
    connectedPlayers++; // プレイヤーが接続したときにカウントを増加

    if (connectedPlayers === 1) {
        socket.emit('wait', 'Please wait for the other player to connect');
    } else if (connectedPlayers === 2) {
        io.emit('start', 'ゲームを開始します');
    }

    players[socket.id] = {
        id: socket.id,
        position: {
            x: startPositions[connectedPlayers - 1] || 0,
            y: playerStartY,
            z: playerStartZ
        },
        scale: {
            x: 1,
            y: 1,
            z: 1
        }
    };
    emitDebugState('connection');

    socket.on('ready', () => {
        readyPlayers.add(socket.id);
        console.log('ready:', readyPlayers.size);
        emitDebugState('ready');

        if (readyPlayers.size >= 2) {
            io.emit('gameStart', 'ゲームを開始します');
            readyPlayers.clear();
            emitDebugState('gameStart');
        }
    });

    socket.on('unReady', () => {
        readyPlayers.delete(socket.id);
        console.log('unReady:', readyPlayers.size);
        emitDebugState('unReady');
    });

    
    socket.on('requestInitialState', () => {
        emitInitialState(socket);
    });

    emitInitialState(socket);

    // クライアントからのデータを受信
    socket.on('position', (position) => {
        players[socket.id].position = position;
        socket.broadcast.emit('opponent', players[socket.id]);
        //console.log('Player Position:', players[socket.id]);
    });
    socket.on('scale', (scale) => {
        players[socket.id].scale = scale;
        socket.broadcast.emit('opponentScale', players[socket.id]);
        //console.log('Player Scale:', players[socket.id]);
    }
    );

    socket.on('disconnect', () => {
        connectedPlayers--; // プレイヤーが切断されたときにカウントを減少
        console.log('Player Disconnected:', socket.id);
        delete players[socket.id];
        readyPlayers.delete(socket.id);
        io.emit('disconnected', socket.id);
        emitDebugState('disconnect');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
