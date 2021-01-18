var indultosTotal = [];
var indultosFiltro =[] ;
var indultosFiltroGenero = [];
var indultosFiltroMinistro = [];
var  indultosFiltroGrave= [];
var  indultosFiltroLeve= [];
var  indultosFiltroCondena =[];
var  indultosFiltroComunidad =[];
var  indultosFiltroTipoDelito =[];
var  indultosFiltroPalabra =[];
var indultosFiltroAnno =[];
var clave = ['null','null','null','null','null',1996,2019,'null'] ;
var indultos = [];
var gonzalez = [];
var aznar = [];
var zapatero =[];
var rajoy = [];
var sanchez =[];
var ministro = [];
var presidente = [gonzalez,aznar,zapatero,rajoy,sanchez];
var anchoCol = 20;
var annoBoe =[1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019];
var pp =0;
var psoe =0;
var yFiltro = 0;
var foto = [];
var nomTipM =['ABORTO','ALLANAMIENTO','ARMAS','COACCIÓN','CONTRABANDO','DESOBEDIENCIA','ECONÓMICO','FALSEDAD','HOMICIDIO','LABORAL','LESIONES','MEDIO AMBIENTE','NEGLIGENCIA','OFENSAS','OMISIÓN','ROBO','SECUESTRO','SEGURIDAD VIAL','SEXUAL'];
var nomTip =['aborto','allanamiento','armas','coacción','contrabando','desobediencia','económico','falsedad','homicidio','laboral','lesiones','medio ambiente','negligencia','ofensas','omisión','robo','secuestro','seguridad vial','sexual'];
var comNum = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19']
var comunidades = ['ANDALUCÍA','ARAGÓN','ASTURIAS','BALEARES','CANARIAS','CANTABRIA','CASTILLA Y LEÓN','CASTILLA LA MANCHA','CATALUÑA','VALENCIANA','EXTREMADURA','GALICIA','MADRID','MURCIA','NAVARRA','PAÍS VASCO','LA RIOJA','CEUTA', 'MELILLA'];
var nomMin = ["JUAN ALBERTO BELLOCH JULBE","MARGARITA MARISCAL DE GANTE","ÁNGEL ACEBES PANIAGUA","FEDERICO TRILLO-FIGUEROA","JOSÉ MARÍA MICHAVILA NÚÑEZ","JUAN FERNANDO LÓPEZ AGUILAR","JOSÉ BONO MARTÍNEZ","MARIANO FERNÁNDEZ BERMEJO","JOSÉ ANTONIO ALONSO SUÁREZ","CARME CHACÓN PIQUERAS","FRANCISCO CAAMAÑO DOMÍNGUEZ","ALBERTO RUIZ-GALLARDÓN JIMÉNEZ","PEDRO MORENÉS EULATE","RAFAEL CATALÁ POLO","DOLORES DELGADO GARCÍA"];
var presNom= ['FELIPE GONZÁLEZ MÁRQUEZ','JOSÉ MARÍA AZNAR LÓPEZ','JOSÉ LUIS RODRÍGUEZ ZAPATERO','MARIANO RAJOY BREY','PEDRO SÁNCHEZ PÉREZ-CASTEJÓN'];
var presPar=['Partido Socialista Obrero Español','Partido Popular','Partido Socialista Obrero Español','Partido Popular','Partido Socialista Obrero Español'];
var presMan=['1982 - 1996','1996 - 2004','2004 - 2011','2011 - 2018', '2018 - Act.']
var hAct=false;
var mAct = false;
var minAct = nomMin.length+1;
var gAct =false;
var lAct = false;
var comAct= comunidades.length+1;
var  tipAct  = nomTip.length+1;
var tipTemp;
var annoAct = false;
var palAct = false;

function preload() {
//  indultosTotal = loadJSON('https://codelab.uoc.edu/filemanager/source_repo/cdelatorred/csvjson.txt');// tabla reducida subida al codelab
indultosTotal = loadJSON('data/indultos.json');
foto[0]= loadImage('data/0.png');
foto[1] = loadImage('data/1.png');
foto[2]= loadImage('data/2.png');
foto[3]= loadImage('data/3.png');
foto[4]= loadImage('data/4.png');
esposa = loadImage('data/esposas.svg');
ppAzul = loadImage('data/PP-azul.svg');
psoeRojo = loadImage('data/PSOE-rojo.svg');

indultos = indultosTotal;
}

function setup() {
 createCanvas(1920, 1350);
 frameRate(3);
 noStroke();
 preparacion();

 col = color(257,153,253);

  //año
 desde = createInput();
 desde.position(380-22,1040);
 desde.style('color', 'white');
 desde.style('font-size', '15px');
 desde.style('border', 'none' );
 desde.size(40,30);
 desde.style('background-color', col );

 hasta = createInput();
 hasta.position(380-22,1130);
 hasta.style('color', 'white');
 hasta.style('font-size', '15px');
 hasta.style('border', 'none' );
 hasta.size(40,30);
 hasta.style('background-color', col );

 bFA = createButton('BUSCAR');
 bFA.position(300,1220);
 bFA.style('color', col);
 bFA.style('font-size', '15px');
 bFA.style('border', 'none' );
 bFA.style('background-color', 'white' );
 bFA.mousePressed(anno);

 bFAT = createButton('TODOS');
 bFAT.position(390,1220);
 bFAT.style('color', col);
 bFAT.style('font-size', '15px');
 bFAT.style('border', 'none' );
 bFAT.style('background-color', 'white' );
 bFAT.mousePressed(annoTotal);

  //busqueda
  palabra = createInput();
  palabra.position(1450,1090);
  palabra.style('color', 'white');
  palabra.style('font-size', '10px');
  palabra.style('border', 'none' );
  palabra.size(100,20);
  palabra.style('background-color', col );

  bPal = createButton('BUSCAR');
  bPal.position(1460,1190);
  bPal.style('color', col);
  bPal.style('font-size', '15px');
  bPal.style('border', 'none' );
  bPal.style('background-color', 'white' );
  bPal.mousePressed(palabraAct);

}

function draw() {
background(255);

// cabecera
fill(0);
textAlign(CENTER);
textFont('Open Sans');
textSize(25);
textStyle(BOLD);
text((Object.keys(indultosTotal).length)+' INDULTOS CONCEDIDOS EN ESPAÑA',width/2,43);
textSize(15);
textStyle(NORMAL);
text('Desde 1996 hasta 2019',width/2,68);

//si filtro activo
if (indultosTotal.length == indultos.length ){
  yFiltro = 0;
} else{
  textStyle(BOLD);
  fill(135,92,195);
  yFiltro = 40;
  textSize(25);
  text((Object.keys(indultos).length)+' Indultos',width/2,110);
}

 // porcetaje
 textAlign(CENTER);
 textStyle(BOLD);
 textSize(15);
 fill(0);
 imageMode(CORNER);

 // pp
 fill(255,30,30);
 image(ppAzul, (width/2)-230,84+ yFiltro, ppAzul.width/6,ppAzul.height/6);
 text(100 - (round((pp*100)/Object.keys(indultos).length)) + '%',(width/2)+170,105+ yFiltro);
 rect((width/2)-150, 100+ yFiltro, 300,5);

 // psoe
 fill(30,30,255);
 image(psoeRojo, (width/2)+195,84+ yFiltro, ppAzul.width/6,ppAzul.height/6);
 text(round((pp*100)/Object.keys(indultos).length) + '%',(width/2)-170,105+ yFiltro);
 rect((width/2)-150, 100+ yFiltro, (pp*300)/Object.keys(indultos).length,5);

 //espoasas
 imageMode(CENTER);
 image(esposa,width/2, 940);

 // Sexo
 fill(0);
 textAlign(CENTER);
 textStyle(BOLD);
 textSize(15);
 text('SEXO',800,1000);

 if (hAct==true) {
   bH = createImg('data/hombreAct.svg');
 } else {
   bH = createImg('data/hombre.svg');
 }
 bH.size(80,80);
 bH.position(800-40, 1040);
 bH.mousePressed(hombreAct);

 if (mAct==true) {
   bM = createImg('data/mujerAct.svg');
 } else {
   bM = createImg('data/mujer.svg');
 }
 bM.size(80,80);
 bM.position(800-40, 1170);
 bM.mousePressed(mujerAct);

 // Ministro
 fill(0);
 textAlign(LEFT);
 textStyle(BOLD);
 textSize(15);
 text('MINISTRO',520,1000);

 for (var i = 0; i < nomMin.length; i++){

  bMin = createButton(nomMin[i]);
      if (minAct == i){
            col = color(135,92,195);
      } else{
            col = color(257,153,253);
      }
  bMin.style('color', col);
  bMin.style('font-size', '10px');
  bMin.style('border', 'none' );
  //bMin.center();
  bMin.style('background-color', 'white' );
  bMin.position(519,1020+15*i);
  bMin.mousePressed(ministroAct);
  }

  // condena
  fill(0);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(15);
  text('CONDENA',1145,1000);

  if (gAct==true) {
      bCG = createImg('data/graveAct.svg');
  } else {
      bCG = createImg('data/grave.svg');
  }
  bCG.size(80,80);
  bCG.position(1140-35,1020);
  textStyle(NORMAL);
  textSize(10);
  textAlign(CENTER);
  text('SUPERIOR',1140,1115);
  text('a 1 año',1140,1130);
  bCG.mousePressed(graveAct);

  if (lAct==true) {
      bCL= createImg('data/leveAct.svg');
  } else {
      bCL= createImg('data/leve.svg');
  }
  bCL.size(80,80);
  bCL.position(1140-35,1150);
  textStyle(NORMAL);
  textSize(10);
  textAlign(CENTER);
  text('INFERIOR',1140,1245);
  text('a 1 año',1140,1260);
  bCL.mousePressed(leveAct);

 //comunidad
 fill(0);
 textAlign(LEFT);
 textStyle(BOLD);
 textSize(15);
 text('COMUNIDAD',width/2-45,1000);

 for (var i = 0; i < comunidades.length; i++){

  bCom = createButton(comunidades[i]);
      if (comAct == i){
            col = color(135,92,195);
      } else{
            col = color(257,153,253);
      }
  bCom.style('color', col);
  bCom.style('font-size', '10px');
  bCom.style('border', 'none' );
  //bCom.center();
  bCom.style('background-color', 'white' );
  bCom.position(width/2-45,1020+15*i);
  bCom.mousePressed(comunidadAct);
  }

  //Tipo DElito
  fill(0);
  textAlign(LEFT);
  textStyle(BOLD);
  textSize(15);
  text('DELITO',1280,1000);

  for (var i = 0; i < nomTipM.length; i++){

   bTip = createButton(nomTipM[i]);
       if (tipAct == i){
             col = color(135,92,195);
       } else{
             col = color(257,153,253);
       }
   bTip.style('color', col);
   bTip.style('font-size', '10px');
   bTip.style('border', 'none' );
   //bTip.center();
   bTip.style('background-color', 'white' );
   bTip.position(1280,1020+15*i);
   bTip.mousePressed(tipoDelitoAct);
   }

   //Año
   fill(0);
   textAlign(CENTER);
   textStyle(BOLD);
   textSize(15);
   text('AÑO',380,1000);

   textStyle(NORMAL);
   textSize(10);
   text('DESDE',380,1090);
   text('HASTA',380,1180);

   if (annoAct == true){
        col = color(135,92,195);
   } else{
        col = color(257,153,253);
 }
  desde.style('background-color', col );
  hasta.style('background-color', col );
  bFA.style('color', col);

  if (annoAct == false){
        col = color(135,92,195);
   } else{
        col = color(257,153,253);
 }
  bFAT.style('color', col);

  //palabra
  fill(0);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(15);
  text('BUSCADOR',1500,1000);

  if (palAct == true){
       col = color(135,92,195);
  } else{
       col = color(257,153,253);
  }
  palabra.style('background-color', col );
  bPal.style('color', col);

  barras();
  indultosDemanda();
  fotoPresidente();
}

function preparacion(){
	g=0;
	a= 0;
	z =0;
	r=0;
	s=0;

	//Vaciar variable presidente
	for (var u = 0; u <5; u++){
  	presidente[u].length = 0;
	}

  // Ordenar por presidente
	for (var i = 0; i < Object.keys(indultos).length; i++){
		ministro = indultos[i].signature;
		switch (ministro) {
      case "JUAN ALBERTO BELLOCH JULBE":
         gonzalez[g]=indultos[i];
         g++;
      break;
			case "MARGARITA MARISCAL DE GANTE":
				 aznar[a] = indultos[i];
         a++;
      break;
			case "ÁNGEL ACEBES PANIAGUA":
				 aznar[a] = indultos[i];
         a++;
      break;
      case "FEDERICO TRILLO-FIGUEROA":
         aznar[a] = indultos[i];
         a++;
      break;
      case "JOSÉ MARÍA MICHAVILA NÚÑEZ":
				 aznar[a] = indultos[i];
         a++;
      break;
      case "JUAN FERNANDO LÓPEZ AGUILAR":
				 zapatero[z]=indultos[i];
         z++;
      break;
      case "JOSÉ BONO MARTÍNEZ":
       	zapatero[z]=indultos[i];
         z++;
      break;
      case "MARIANO FERNÁNDEZ BERMEJO":
         zapatero[z]=indultos[i];
         z++;
      break;
      case "JOSÉ ANTONIO ALONSO SUÁREZ":
       	zapatero[z]=indultos[i];
         z++;
      break;
      case "CARME CHACÓN PIQUERAS":
       	zapatero[z]=indultos[i];
         z++;
      break;
      case "FRANCISCO CAAMAÑO DOMÍNGUEZ":
         zapatero[z]=indultos[i];
         z++;
      break;
      case "ALBERTO RUIZ-GALLARDÓN JIMÉNEZ":
       	rajoy[r]=indultos[i];
         r++;
      break;
      case "PEDRO MORENÉS EULATE":
       	rajoy[r]=indultos[i];
         r++;
      break;
      case "RAFAEL CATALÁ POLO":
       	rajoy[r]=indultos[i];
         r++;
      break;
      case "DOLORES DELGADO GARCÍA":
    		 sanchez[s]=indultos[i];
         s++;
      break;
		}
	}
  console.log(Object.keys(indultos).length);
//partidos

 pp = presidente[1].length + presidente[3].length;
 psoe = presidente[0].length + presidente[2].length+ presidente[4].length;
}

function fotoPresidente(){
  for (var u = 0; u < 5; u++) {

    y = yFiltro +(160+(140*u));// separado
    x = 420;
    // color

    if ((presidente[u] == aznar) || (presidente[u] == rajoy) ){
     colPar = color(30,30,255);
    } else {
     colPar = color( 255,30,30);
    }

     //foto
    imageMode(CENTER);
    image(foto[u], 320, y+(115/2)+2,115,115);

     // Posicion raton
    var disPre = dist(mouseX, mouseY, 320, y+(115/2)+2);

    //dod presidente
    if (disPre < 115/2) {

        push();
        translate(327,y-2);

        //fondo
        fill(colPar,80);
        rect(0, 0, 450,125);

        //texto
        fill('white');
        textAlign(LEFT);
        textSize(20);
        textStyle(BOLD);
        text(presNom[u],80,40);
        textSize(15);
        textStyle(NORMAL);
        text(presPar[u],80,62);
        textSize(20);
        text(presMan[u],80,89);
        textStyle(BOLD);
        textSize(15);
        text('Indultos '+presidente[u].length,80,110);

        pop();
        image(foto[u], 320, y+(115/2)+2,115,115);
     }
   }
}

function barras(){
  for (var u = 0; u < 5; u++) {

    y = yFiltro +(160+(140*u));// separado-
    x = 420;

    // color-
    if ((presidente[u] == aznar) || (presidente[u] == rajoy) ){
     colPar = color(30,30,255);
    } else {
     colPar = color( 255,30,30);
    }

    // Barras-
   for (var i = 0; i < (presidente[u].length) / 25; i++) {// fila-

       // Ultima columna-
       if ((0 < ((presidente[u].length) % 25) ) && (i == Math.trunc((presidente[u].length) / 25))){
         anchoCol = ((presidente[u].length) % 25);
       } else {
         anchoCol = 25;// valor inicial-
      }

       // Columna
       for (var e = 0; e < anchoCol; e++) {
         fill(colPar);
         ellipse(5*i + x, 5*e+ y, 3);

        }
     }
      }
}

function indultosDemanda(){
  for (var u = 0; u < 5; u++) {

    y = yFiltro +(160+(140*u));// separado-
    x = 420;

    // color-
    if ((presidente[u] == aznar) || (presidente[u] == rajoy) ){
     colPar = color(30,30,255);
    } else {
     colPar = color( 255,30,30);
    }

    // Barras-
   for (var i = 0; i < (presidente[u].length) / 25; i++) {// fila-

       // Ultima columna-
       if ((0 < ((presidente[u].length) % 25) ) && (i == Math.trunc((presidente[u].length) / 25))){
         anchoCol = ((presidente[u].length) % 25);
       } else {
         anchoCol = 25;// valor inicial-
      }

       // Columna
       for (var e = 0; e < anchoCol; e++) {

          // Posicion raton
          var dis = dist(mouseX, mouseY,5*i +x, 5*e+ y);

          // dod
          if (dis < 3) {
            fill(135,92,195);
            ellipse(5*i+x, 5*e + y,6);
            explicacion = (presidente[u][(i*20)+e].court) + ' '+(presidente[u][(i*20)+e].crimes_sentences);

            push();
            translate(mouseX, mouseY);
            fill(colPar);
            rect(10,-10, 260,70+(10*(textWidth(explicacion)/210)));

             textSize(15);
             textAlign(LEFT);
             fill('white');
             textStyle(BOLD);
             text((presidente[u][(i*20)+e].boe), 25,15);
             textStyle(NORMAL);
             text((presidente[u][(i*20)+e].boe_date)+ ' ' +(presidente[u][(i*20)+e].gender), 25,34);
             textSize(10);
             textStyle(BOLD);
             text((presidente[u][(i*20)+e].signature), 25,48);
             textStyle(NORMAL);
             text((presidente[u][(i*20)+e].court) + ' '+(presidente[u][(i*20)+e].crimes_sentences), 25,54,210);
             pop();

            }
        }
     }
  }
}

function filtro(){


  u=0;
  cont =0;
  indultosFiltroGenero = [];
  indultosFiltroMinitro =[];
  indultosFiltroGrave= [];
  indultosFiltroLeve= [];
  indultosFiltroCondena =[];
  indultosFiltroComunidad =[];
  indultosFiltroTipoDelito =[];
  indultosFiltroAnno =[];
  indultosFiltroPalabra =[];

// por genero
	for (var i = 0; i < Object.keys(indultosTotal).length; i++){

  	if ( indultosTotal[i].gender == clave[0]){
			indultosFiltroGenero[u] = indultosTotal[i];
			u++
		} else{
      cont= cont +1;
    }
	}
  if (cont == Object.keys(indultosTotal).length){
    indultosFiltroGenero = indultosTotal;
    u=0;
    cont =0;
  } else{
    u=0;
    cont =0;
  }

  //por ministro
  for (var i = 0; i < Object.keys(indultosFiltroGenero).length; i++){

    if ( indultosFiltroGenero[i].signature == clave[1]){
      indultosFiltroMinitro[u] = indultosFiltroGenero[i];
      u++
    } else{
      cont= cont +1;
    }
  }
  if (cont == Object.keys(indultosFiltroGenero).length){
    indultosFiltroMinitro = indultosFiltroGenero;
    u=0;
    cont =0;
  } else{
    u=0;
    cont =0;
  }

//por condena
for (var i = 0; i < Object.keys(indultosFiltroMinitro).length; i++){

  if (indultosFiltroMinitro[i].crimes_sentences.split('años').length > 1){

    indultosFiltroGrave[u] =  indultosFiltroMinitro[i];
    u++
  } else{
      indultosFiltroLeve[cont] =  indultosFiltroMinitro[i];
    cont= cont +1;
  }
}
if (clave[2] == 'Grave'){
  indultosFiltroCondena =  indultosFiltroGrave;
  u=0;
  cont =0;
} else if (clave[2] == 'Leve'){
  indultosFiltroCondena =  indultosFiltroLeve;
  u=0;
  cont =0;
} else{
  indultosFiltroCondena =  indultosFiltroMinitro;
  u=0;
  cont =0;
}

//Comunidad
for (var i = 0; i < Object.keys(indultosFiltroCondena).length; i++){

  if ( indultosFiltroCondena[i].court_region_id == clave[3]){
    indultosFiltroComunidad[u] = indultosFiltroCondena[i];
    u++
  } else{
    cont= cont +1;
  }
}
if (cont == Object.keys(indultosFiltroCondena).length){
  indultosFiltroComunidad = indultosFiltroCondena;
  u=0;
  cont =0;
} else{
  u=0;
  cont =0;
}

//tipo de delito
for (var i = 0; i < Object.keys(indultosFiltroComunidad).length; i++){

  if ((indultosFiltroComunidad[i].crimes_sentences.split(clave[4]).length > 1)){
    indultosFiltroTipoDelito[u] = indultosFiltroComunidad[i];
    u++
  } else{
    cont= cont +1;
  }
}
if (cont == Object.keys(indultosFiltroComunidad).length){
    indultosFiltroTipoDelito = indultosFiltroComunidad;
  u=0;
  cont =0;
} else{
  u=0;
  cont =0;
}

//año
for (var i = 0; i < Object.keys(indultosFiltroTipoDelito).length; i++){

  if ((indultosFiltroTipoDelito[i].boe_date.split('-')[0] <= clave[6]) && (indultosFiltroTipoDelito[i].boe_date.split('-')[0] >= clave[5]) ){
    indultosFiltroAnno[u] = indultosFiltroTipoDelito[i];

    u++
  } else{
    cont= cont +1;
  }
}
if (cont == Object.keys(indultosFiltroTipoDelito).length){
    indultosFiltroAnno = indultosFiltroComunidad;
  u=0;
  cont =0;
} else{
  u=0;
  cont =0;
}

//palabra
for (var i = 0; i < Object.keys(indultosFiltroAnno).length; i++){

  if ((indultosFiltroAnno[i].crimes_sentences.split(clave[7]).length > 1)){
    indultosFiltroPalabra[u] = indultosFiltroAnno[i];
    u++
  } else{
    cont= cont +1;
  }
}
if (cont == Object.keys(indultosFiltroAnno).length){
    indultosFiltroPalabra = indultosFiltroAnno;
  u=0;
  cont =0;
} else{
  u=0;
  cont =0;
}

indultos =   indultosFiltroPalabra;

  preparacion();
}

function ministroAct() {

  for (var i = 0; i < nomMin.length; i++){
    pre = 1020+15*i;
    if (mouseY > pre){
         minTemp  = i;
    }
  }

  if (minAct == minTemp){
    clave[1] = 'null';
    minAct  = nomMin.length+1;
  } else{
    minAct  = minTemp;
    clave[1] = nomMin[minAct];
  }
  filtro();
}

function graveAct() {

  if (gAct==true) {
      gAct=false;
      clave[2] = 'null';
      filtro();
  } else {
    if (lAct == true){
      leveAct();
    }
    gAct=true;
    clave[2] = 'Grave';
    filtro();
  }
 //generoFiltro();
 //sliderFiltro();
}

function leveAct() {

  if (lAct==true) {
      lAct=false;
      clave[2] = 'null';
      filtro();
  } else {
    if (gAct == true){
      graveAct();
    }
    lAct=true;
    clave[2] = 'Leve';
    filtro();
  }
 //generoFiltro();
 //sliderFiltro();
}

function comunidadAct() {

  for (var i = 0; i < comunidades.length; i++){
    pre = 1020+15*i; //posicion boton eje y
    if (mouseY > pre){
         comTemp  = i;
    }
  }

  if (comAct == comTemp){
    clave[3] = 'null';
    comAct  = comunidades.length+1;
  } else{
    comAct  = comTemp;
    clave[3] = comNum[comAct];
  }
  filtro();
}

function tipoDelitoAct() {

  for (var i = 0; i < nomTip.length; i++){
    pre = 1020+15*i; //posicion boton eje y
    if (mouseY > pre){
         tipTemp  = i;
    }
  }

  if (tipAct == tipTemp){
    clave[4] = 'null';
    tipAct  = nomTip.length+1;
  } else{
    tipAct  = tipTemp;
    clave[4] = nomTip[tipAct];
  }
  filtro();
}

function palabraAct() {

  if (palAct == true){
       clave[7] = 'null';
       palAct = false;
  } else{
       clave[7] = palabra.value();
       palAct = true;
  }
  filtro();
}

function annoTotal() {
  annoAct = false;
  clave[5] = 1996;
  clave[6] = 2019;
  filtro();
}

function anno() {

  for (var i = 0; i < annoBoe.length; i++){
    if (desde.value() == annoBoe[i]){
        desdeTemp = desde.value();
    }
    if (hasta.value() == annoBoe[i]){
        hastaTemp = hasta.value();
    }
  }
  if (desdeTemp <= hastaTemp ){
    annoAct = true;
    clave[5] = desde.value();
    clave[6] = hasta.value();
    filtro();
  }
}

function hombreAct() {

  if (hAct==true) {
      hAct=false;
      clave[0] = 'null';
      filtro();
  } else {
    if (mAct == true){
      mujerAct();
    }
    hAct=true;
    clave[0] = 'Hombre';
    filtro();
  }
 //generoFiltro();
 //sliderFiltro();
}

function mujerAct() {

    if (mAct==true) {
        mAct=false;
        clave[0] = 'null';
        filtro();
    } else {
      if (hAct == true){
        hombreAct();
      }
      mAct=true;
      clave[0] = 'Mujer';
      filtro();
    }
}
