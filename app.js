var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var url = require('url');
var user = [];
var nickname_chat = '';
var pathname;
var contador = 0;
var salas = ['sala1', 'sala2', 'sala3', 'sala4', 'sala5', 'sala6', 'sala7', 'sala8', 'sala9', 'sala10','sala11','sala12','sala13','sala14','sala15'];
var index = -1;
var equipo1 = [];
var equipo2 = [];

app.use(express.static(__dirname + "/"));
//Variables para el tratamiento de eventos
var array = {
    pulsacionesTeclaA: 0,
    pulsacionesTeclaR: 0,
	speed_actual1: 2,
	speed_actual2: 2
}

app.get('/', function(req, res){
	pathname = url.parse(req.url).pathname;
	//console.log(pathname);
	res.sendFile(__dirname + '/login.html');
});
app.get('/salaEspera', function(req, res){
	pathname = url.parse(req.url).pathname;
	//console.log(pathname);
	res.sendFile(__dirname + '/salaEspera.html');
});
app.get('/salaEsperaGame', function(req, res){
	contador++;
	console.log(contador);
	pathname = url.parse(req.url).pathname;
	//console.log(pathname);
	res.sendFile(__dirname + '/salaEsperaGame.html');
});
app.get('/Game', function(req, res){
	//contador=0;
	pathname = url.parse(req.url).pathname;
	//console.log(pathname);
	res.sendFile(__dirname + '/game.html');
});



io.on('connection', function(socket){
	var clientIp = socket.request.connection.remoteAddress;
	//console.log(clientIp);
	socket.on('nickname', function(name){
		user[clientIp] = name;
		//console.log(user[clientIp] +' conectado');
	});
});

io.of('/salaEspera').on('connection', function(socket){
	var clientIp = socket.request.connection.remoteAddress;
	//console.log(user[clientIp]+'estoy dentro de room');
	
	
	socket.on('chat message', function(msg){
		nickname_chat = user[clientIp] + ' : '+msg;
		//console.log(nickname_chat);
		io.of('/salaEspera').emit('chat message', nickname_chat);
	});
	
	socket.on('jugadores',function(){
		for (var x in user) {
			socket.emit('jugadores', user[x]+' conectado');
		}
		socket.broadcast.emit('jugadores', user[clientIp]+' conectado');
	});
	
	socket.on('disconnect', function(){
			if(pathname != '/room'){
				io.of('/salaEspera').emit('jugadores', user[clientIp]+' desconectado');
				//console.log('usuario ha salido '+user.splice(clientIp,1));
				//console.log(user[clientIp]+' desconectado');
			}
	});
});

io.of('/salaEsperaGame').on('connection', function(socket){
	
	var clientIp = socket.request.connection.remoteAddress;
	if(contador%2 !== 0){
		equipo1 = user[clientIp];
		console.log('equipo1 :'+equipo1);
		io.of('/salaEsperaGame').emit('jugadores', contador);
	}else {
		equipo2 = user[clientIp];
		console.log('equipo2 :'+equipo2);	
		io.of('/salaEsperaGame').emit('jugadores', contador);
	}
	

	if(contador%2 == 0){
			index++;
			console.log('usuarios listos para iniciar una partida');
			console.log('los jugadores jugaran en'+salas[index]);
			io.of('/salaEsperaGame').emit('iniciar', '');
	}
	
	socket.on('disconnect', function(){
			if(pathname != '/salaEsperaGame'){
				//--contador;
				io.of('/salaEsperaGame').emit('jugadores', contador);
				//console.log(user[clientIp]+' desconectado');
			}
	});
});

io.of('/game').on('connection', function(socket){
	
	socket.join(salas[index]);
	
	socket.room = salas[index];
	
	socket.on('jugadores1',function(){
		//socket.to(socket.room).emit('jugadores1', 'jugador equipo 1 :'+ equipo1);
		socket.emit('jugadores1','jugador equipo1 :'+ equipo1);
	});
	
	
	
	socket.on('jugadores2',function(){		
		//socket.to(socket.room).emit('jugadores2','jugador equipo 2 :'+ equipo2);
		socket.emit('jugadores2','jugador equipo2 :'+ equipo2);		
	});
	
	
	
	socket.on('click', function(cont){
		socket.broadcast.to(socket.room).emit('click', cont);
		
	});
	
	socket.on('sprite', function(speed){
		var aux = array.speed_actual1;
		aux += speed;
		if(aux>0){
			array.speed_actual1 = aux;
			var str = aux.toString()+'s';
			socket.broadcast.to(socket.room).emit('imgDerecha', str);
		}
		var aux2 = array.speed_actual2;
		aux2 = aux2 + 0.002;
		array.speed_actual2 = aux2;
		var str2 = aux2.toString()+'s';
		socket.broadcast.to(socket.room).emit('imgIzquierda', str2);
		
	});
	socket.on('he ganado', function(){
		socket.broadcast.to(socket.room).emit('he ganado');
	});
});



http.listen(3000, function(){
  console.log('listening on *:3000');
})