/*
	Script para el juego de tirar la cuerda.
	Pulsaciones de una tecla concreta.
	Fase ALPHA del proyecto.

	By Manel Fernández Muñoz.
*/

var set_var_speed1 = function(spd){
	speed_actual1=spd;
};
var get_var_speed1 = function(){
	return speed_actual1;
};

var speeddown1 = function(speed){
	var aux = get_var_speed2();
	aux = aux + speed;
	set_var_speed2(aux);
	console.log(aux);
	var str = aux.toString()+'s';
	//console.log(str);
	document.getElementById("recorte2").style.animationDuration = str;
};

var speedup1 = function(speed) {
	var aux = get_var_speed1();
	aux = aux + speed;
	if(aux>0){
		set_var_speed1(aux);
		console.log(aux);
		var str = aux.toString()+'s';
		//console.log(str);
		document.getElementById("recorte1").style.animationDuration = str;
	};
	speeddown1(0.02);
};


var set_var_speed2 = function(spd){
	speed_actual2=spd;
};
var get_var_speed2 = function(){
	return speed_actual2;
};
var speeddown2 = function(speed){
	var aux = get_var_speed1();
	aux = aux + speed;
	set_var_speed1(aux);
	console.log(aux);
	var str = aux.toString()+'s';
	//console.log(str);
	document.getElementById("recorte1").style.animationDuration = str;
};

var speedup2 = function(speed) {
	var aux = get_var_speed2();
	aux = aux + speed;
	if(aux>0){
		set_var_speed2(aux);
		console.log(aux);
		var str = aux.toString()+'s';
		//console.log(str);
		document.getElementById("recorte2").style.animationDuration = str;
	};
	speeddown2(0.02);
};

window.onload = function(){
	document.onkeyup = tecla;
	//document.getElementById("boton").onclick = clicar;
	//document.getElementById("powerUp").onclick = potenciador;
	//muestraReloj();
	
	var speed_actual1=0;
	set_var_speed1(3);
	
	var speed_actual2=0;
	set_var_speed2(3);
}

var pulsacionesTeclas = 0; //Variable que contará la cantidad de veces que se pulsen las teclas normales excepto a/A y r/R.
var pulsacionesTeclaA = 0; //Variable que contará la cantidad de veces que se ha pulsado 'a' y 'A'.
var pulsacionesTeclaR = 0 //Variable que contará la cantidad de veces que se ha pulsado 'r' y 'R'.
var pulsacionesRaton = 0; //Variable que contará la cantidad de veces que se ha clicado el botón.

//Todos los valores serán reinicializados al recargar la página

//Función que según la tecla presionada aumentará el valor de un contador u otro.
function tecla(elEvento) { //Si no recibo el evento por parámetro no podré realizar la comparación de letras.
	var evento = window.event || elEvento;
	if(evento.keyCode == 65 || evento.keyCode == 97){
		pulsacionesTeclaA += 1;
		document.getElementById("teclaA").innerHTML = pulsacionesTeclaA;
		speedup1(-0.2);
		/*document.getElementById("teclaA").onclick = function(){
		speedup1(-0.2);
		};*/
		
	}else if(evento.keyCode == 82 || evento.keyCode == 114){
		pulsacionesTeclaR += 1;
    	document.getElementById("teclaR").innerHTML = pulsacionesTeclaR;
		speedup2(-0.2);
		/*document.getElementById("teclaR").onclick = function(){
			speedup2(-0.2);
		};*/
		
	}/*else{
		pulsacionesTeclas += 1;
    	document.getElementById("teclas").innerHTML = pulsacionesTeclas;
	}*/
	
}

/*
	Función clicar simple, solo para contar los clicks que realizamos en un botón.


	function clicar(){
		pulsacionesRaton += 1;
		document.getElementById("clicks").innerHTML = pulsacionesRaton;
	}
*/

//Función que contará los clicks de un botón y que si tenemos activado un potenciador valdrán el doble.
/*function clicar(){
	if(document.getElementById("powerUp").style.borderColor == "silver"){
		pulsacionesRaton += 1;
		document.getElementById("clicks").innerHTML = pulsacionesRaton;
	}else if(document.getElementById("powerUp").style.borderColor == "black"){
		pulsacionesRaton += 2;
		document.getElementById("clicks").innerHTML = pulsacionesRaton;
	}
}

/*
	Vamos a intentar crear un potenciador simple en el que los clicks valgan 2 en lugar de 1.
	La condición que utilizaremos será, que cambiando el color del borde del botón de potenciador,
	el click contará 1, si el color es silver, o 2, si el color es black.
	La función potenciador servirá para cambiar el color del borde, mientras que el aumento de los clicks
	se verá repercutido dentro de la propia función de clicar.

function potenciador(){
	if(this.style.borderColor == "silver"){
		this.style.borderColor = "black";
	}else if(this.style.borderColor == "black"){
		this.style.borderColor = "silver";
	}
}*/

/*
	Función que servirá como contador de tiempo negativo, para que tengamos las partidas con una durabilidad
	fija y que las salas de espera también tengan durabilidad fija antes de empezar a jugar.

var segundos = 59;
var minutos = 1;
var cronometro;*/

$(document).ready(function(){
				var time = document.getElementsByTagName('h2')[0];
				var min = 0;
				var sec = 40;
				time.textContent=min+":"+sec;
				var evilHit = function(){
					sec--;
					//h1.textContent=min+":"+sec;
					if(sec <= 9 && sec >= 0){
						time.textContent=min+":0"+sec;
					}else{
						time.textContent=min+":"+sec;
					}
					if (sec <= 0) {
						if(min > 0){
							min--;
							sec = 59;
							time.textContent=min+":"+sec;
						}
						else if(min == 0 && sec == 0){
							clearInterval(itv);
							if(pulsacionesTeclaA < pulsacionesTeclaR){
								//alert("ha ganado equipo R");
								document.getElementById("reloj").innerHTML = '<button id="reiniciar" name="reiniciar" onclick="location.reload()">Reiniciar</button>';
								document.getElementById("equipo2").innerHTML = '<h1>Felicidades!</h1> <img src="ganador.gif" width="168" height="66" />';
								document.getElementById("equipo1").innerHTML = '<h1>Prueba otra vez</h1> <img src="perdedor.gif" width="168" height="66" />';
							}else if(pulsacionesTeclaA > pulsacionesTeclaR){
								//alert("ha ganado el equipo A");
								document.getElementById("reloj").innerHTML = '<button id="reiniciar" name="reiniciar" onclick="location.reload()">Reiniciar</button>';
								document.getElementById("equipo1").innerHTML = '<h1>Felicidades!</h1> <img src="ganador.gif" width="168" height="66" />';
								document.getElementById("equipo2").innerHTML = '<h1>Prueba otra vez</h1> <img src="perdedor.gif" width="168" height="66" />';
							}else{
								document.getElementById("reloj").innerHTML = '<button id="reiniciar" name="reiniciar" onclick="location.reload()">Reiniciar</button><h2> Noooooooo! </h2>';
								document.getElementById("equipo1").innerHTML = '<img src="perdedor.gif" width="168" height="66" />';
								document.getElementById("equipo2").innerHTML = '<img src="perdedor.gif" width="168" height="66" />';
							}
						}
					}/*else if(sec <= 9 && sec => 0){
						h1.textContent=min+":0"+sec;
					}*/
				}
				var itv = setInterval(evilHit, 100);
})
/*
function muestraReloj() {
 
 	s = document.getElementById("segundos");
 	m = document.getElementById("minutos");

 	cronometro = setInterval(
 		function(){
	 		if(minutos == 0 && segundos == 0){
			
	 				minutos = 2;
	 				segundos = 0;
	 		}

	 		if(segundos <= 0)
	 		{
	 			segundos = 59;
	 			minutos--;
	 			m.innerHTML = minutos;
	 		}

	 		s.innerHTML = segundos;
	 		segundos--;
 		}, 100);
}*/
