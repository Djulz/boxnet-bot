const request = require('request');
var io = require('socket.io-client');
var AlphaBeta = require('alphabeta');


class Bot {

    constructor(socket) {
        this.socket = socket;
        //this.ab = thissetupAB();
    }

    score() {

    }

    generateMoves(prevState) {
        var moves = [];
        for (var x = -2; x <= +2; x++)
            for (var y = -2; y <= +2; y++)
                {
                    prevState
                }
    }

    checkWinConditions(state) {
        return false;
    }

    uniqueKey(state) {
        return JSON.stringify(state);
    }

    setupAB(state) {
        return AlphaBetaConstructor({
            scoreFunction: scoreFunction,
            generateMoves: generateMoves,
            checkWinConditions: checkWinConditions,
            uniqueKey: uniqueKey,
            state: state,
            depth: 1
        });
    }

    connect(serverBase, accountName) {
        request.post({
            url: serverBase + '/auth/password/',
            form: { username: accountName, password: 'mypass' }
        },
            function (err, httpResponse, body) {

                if (err) return console.error(err);
                var cookie = httpResponse.headers['set-cookie'][0];
                console.log(cookie)
                //console.log("req body", httpResponse.request.body);
                console.log("status", httpResponse.statusCode);
                console.log("body", body);

                var socket = io(serverBase, { extraHeaders: { cookie: cookie } });
                console.log("connecting..");

                socket.on('connect', () => {
                    console.log("connected!");

                    socket.emit("join", { lobbyName: 'test' });
                });
                socket.on('event', (data) => {
                    console.log(data);
                });
                socket.on('disconnect', () => {
                    console.log("disconnected!");
                });

                socket.on("msg", (data) => {
                    console.log("msg", data);
                });

                socket.on("lobbyData", (data) => {
                    if (data.players.length > 1) {
                        socket.emit("msg", "ready");
                    }
                });

                socket.on("loadingData", (data) => {
                    console.log(data);

                    // //Next units
                    // updateNextUnits(data.nextUnits);
                    setupAB(data.map);

                    // //Init map
                    // map = new DrawableMap(data.map.width, data.map.height);
                    // adaptTileSize(ctx);
                    // map.readData(data);

                    socket.emit("msg", "loaded");
                });

                socket.on('play', () => {
                    console.log("playing");
                    this.int_sendInput = setInterval(() => {
                        socket.emit("input", {
                            x: Math.floor(Math.random() * 50),
                            y: Math.floor(Math.random() * 30),
                            dir: 0
                        });
                    }, 5000);
                });

                socket.on("gameEnd", (data) => {
                    console.log("gameEnd", data);
                    clearInterval(this.int_sendInput);
                });

            });
    }
}

module.exports = Bot;