	//######################      Variables      #########################################
	
	var ancho=1080;
	var alto=600;
	var canva,ctx;

	var suelo=360;

	var Dmono={y: suelo , vy:0, gravity:1.8 , salto:31, vymax:9 , saltando:false};
	var nivel={velocidad:9,pmarcador:0,muerto:false};
	var castor={x:600,y:suelo+33,velocidad:3};
	var globo={x:900, y:100,velocidad:4};
	var volador={x:800, y:100,velocidad:3};
	var sueloG={x:0, y:450};
	var fondos={x:0,y:0};

	var lobys=new Audio();
		lobys.src='songs/loby.mp3';
	var mort=new Audio();
		mort.src='songs/Muerte.mp3';
	var ok=new Audio();
		ok.src='songs/bingo.mp3';
		
	var imgMono,imgVolador,imgCastor,imgSuelo;
	
	
	
	//#############################  Imagenes y salto  #######################################


	function Imagenes(){
		imgMono=new Image();
		imgVolador=new Image();
		imgEnv=new Image();
		imgCastor=new Image();
		imgSuelo=new Image();
		imgFondo=new Image();
	
		imgMono.src='img/mono.png';
		imgVolador.src='img/tr.png';
		imgEnv.src='img/ct2.png';
		imgCastor.src='img/ct.png';
		imgSuelo.src='img/suelo1.png';
		imgFondo.src='img/fondo.png';
	}


	document.addEventListener('keydown',function(evento){
		if(evento.keyCode == 32){
			if(nivel.muerto==false){
				if(Dmono.saltando==false){
					salto();
				}	
			}else{
				StopSong();
				
				InicioSong();
				nivel.velocidad=9;
				globo.velocidad=4;
				nivel.muerto=false;
				castor.velocidad=3;
				volador.velocidad=3;
				castor.x=600;
				volador.x=800;
				globo.x=900;
				nivel.pmarcador=0;
			}
			
		}
	});



	function presionar(){
		if(nivel.muerto==false){
			if(Dmono.saltando==false){
				salto();
			}	
		}else{
			StopSong();
			
			InicioSong();
			nivel.velocidad=9;
			globo.velocidad=4;
			nivel.muerto=false;
			castor.velocidad=3;
			volador.velocidad=3;
			castor.x=600;
			volador.x=800;
			globo.x=900;
			nivel.pmarcador=0;
		}
	}




//************************ sonido *******************************************************/	

	function InicioSong(){
		lobys.play();
	}

	function StopSong(){
		lobys.pause();
		lobys.currentTime = 0;
	}


	//-----------------------   Inicio   -------------------------------------------------

	function iniciar(){
		canva=document.querySelector('#canvass');
		ctx=canva.getContext('2d');
		Imagenes();
	}
	
	function Limpiar(){
		canva.width=ancho;
		canva.height=alto;
	}

	//************************ Dibujo y lógica del mono ************************************
	function DibujaMona(){
		ctx.drawImage(imgMono,0,0,155,171,100,Dmono.y,155,171);
	}

	function Pgravity(){
		if(Dmono.saltando==true){
			if(Dmono.y-Dmono.vy-Dmono.gravity>suelo){
				Dmono.saltando=false;
				Dmono.vy=0;
				Dmono.y=suelo;
			}else{
				Dmono.vy-=Dmono.gravity;
				Dmono.y-=Dmono.vy;
			}
			
		}
	}

	function salto(){
		Dmono.vy=Dmono.salto;
		Dmono.saltando=true;
	}

	//-------------------------- Dibujo y lógica de Objetos --------------------------------
	function DibujaCastor(){
		ctx.drawImage(imgCastor,0,0,130,126,castor.x,castor.y,130,126);
	}
	
	function Lcastor(){
		if(castor.x < -100){
			castor.x=ancho+100;
			nivel.pmarcador+=10;
		}else{
			castor.x-=nivel.velocidad;
			castor.x-=castor.velocidad;
		}
	}
	
	function DibujaGlobo(){
		ctx.drawImage(imgVolador,0,0,130,126,globo.x,globo.y,130,126);
	}
	
	function Lglobo(){
		if(globo.x < -100){
			globo.x=ancho+100;
		}else{
			globo.x-=globo.velocidad;
		}
	}
	
	function DibujaVolador(){
		ctx.drawImage(imgEnv,0,0,130,126,volador.x,volador.y,130,126);
	}
	
	function LEv(){
		if(volador.x < -100){
			volador.x=ancho+100;
			nivel.pmarcador+=5;
		}else{
			volador.x-=volador.velocidad;
		}
	}
	
	function DiujaFondo(){
		ctx.drawImage(imgFondo,fondos.x,0,1080,600,0,fondos.y,1080,600);
	}
	
	
	
	function DiujaSuelo(){
		ctx.drawImage(imgSuelo,sueloG.x,0,1800,160,0,sueloG.y,1800,160);
	}
	
	function LSuelo(){
		if(sueloG.x > 700){
			sueloG.x=0;
		}else{
			sueloG.x += nivel.velocidad;
		}
	}
	
	//########################################################################################
	function muerte(){
		//castor
		//volador
		if(castor.x>=100 && castor.x<=255){
			if(Dmono.y >= suelo-33){
	
				nivel.muerto=true;
				nivel.velocidad=0;
				globo.velocidad=0;
				castor.velocidad=0;
				
				volador.velocidad=0;
				StopSong();
				mort.play();
				
			}
		}else if(volador.x>=100 && volador.x<=240){
			if(Dmono.y >=100 && Dmono.y<=226){
	
				nivel.muerto=true;
				nivel.velocidad=0;
				globo.velocidad=0;
				castor.velocidad=0;
				volador.velocidad=0;
				StopSong();
				mort.play(); 
	
			}
		}
	
		//globo
	 
	}

	function bonus(){
		if(globo.x>=100 && globo.x<=220){
			if(Dmono.y >=100 && Dmono.y<=140){
				nivel.pmarcador+=20;
				ok.play();
	
			}
		}
		
	}
	
	function puntaje(){
		ctx.font="50px impact";
		ctx.fillStyle='white';
		ctx.fillText(`${nivel.pmarcador}`,510,50);
		if(nivel.muerto==true){
			ctx.font="100px impact";
			ctx.fillStyle='black';
			ctx.fillText(`Game Over`,400,550);
		}
	}
	
	//Bucle Principal
	var FPS=48;
	setInterval(function(){
		principal();
	},1000/FPS);
	
	function principal(){
		InicioSong();
		Limpiar();
		Pgravity();
		muerte();
		bonus();
		DiujaFondo();
		Lcastor();
		DiujaSuelo();
		LSuelo();
		DibujaCastor();
		Lglobo();
		DibujaGlobo();
		DibujaVolador();
		DibujaMona();
		LEv();
		puntaje();
	
	}
	