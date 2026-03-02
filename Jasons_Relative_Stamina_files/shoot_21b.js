var canvas,
    ctx,
   originX = 300,
   originY = 600,
   width = 1000,
   height = 700
   ;
//see valDocReference.txt to see what these values are corresponding to
//index = line number
var val = getStringArraySpecial("Jasons_Relative_Stamina_files/shootValDoc21bRGB.txt");
//console.log(val);
var cHSL = new Array(parseInt(val[1]),parseInt(val[2]),parseInt(val[3]));


//this feature was added later, that's why it's out of order.
var laserInterval = parseInt(val[36]);
var isSpray			= val[37];
//range 1-15
var laserTotal = parseInt(val[4]);
//boolean
var laserVertical = (val[5] === "true");
//2-25
var laserSpeed = parseInt(val[6]);
//5-50
var laserCspace = parseInt(val[7]);
//allfonts
var laserFont = val[8];
//5-50
var laserSize = val[9];
var laserStyle=laserSize+" "+laserFont;
var	lasers = [];

/*var laserH = 290;
var laserS = 100;
var laserL = 39;
var laserA = 1;*/
var lHSLA = new Array(parseInt(val[10]),parseInt(val[11]),parseInt(val[12]),parseInt(val[13]));
//console.log(lHSLA);
//var laserColor = "hsla("+lHSLA[0]+","+lHSLA[1]+"%,"+lHSLA[2]+"%,"+lHSLA[3]+")";
var laserColor = "rgba("+lHSLA[0]+","+lHSLA[1]+","+lHSLA[2]+","+lHSLA[3]+")";

//range 1-25
var enemyTotal =parseInt(val[14]);
//50-5000
var enemyInterval =parseInt( val[15]); //in milli	
//boolean
var enemyVertical = (val[16] === "true");
//1-10
var enemySpeedBase = parseInt(val[17]);
//0-20
var enemySpeedVar = parseInt( val[18]);
//5-50
var enemyCspace = parseInt( val[19]);
//all fonts
var enemyFont = val[20];
//5-50
var enemySize = val[21];
var enemyStyle = enemySize +" "+enemyFont;
var enemies = [];

/*var enemyH = 26;
var enemyS = 100;
var enemyL = 48;
var enemyA = 1;*/
var eHSLA = new Array(parseInt(val[22]),parseInt(val[23]),parseInt(val[24]),parseInt(val[25]));
var enemyColor = "rgba("+eHSLA[0]+","+eHSLA[1]+","+eHSLA[2]+","+eHSLA[3]+")";
//console.log(eHSLA);
//console.log(enemyColor);
//var enemyColor = "hsla(1,1%,1%,1)";
//1-10	
var fragmentFadeSpeed =parseInt(val[26]);
//1-10
var fragmentSpeedBase = parseInt(val[27]);
//1-20
var fragmentSpeedVar =parseInt(val[28]);
var fragments = [];
var fragmentSize = val[29];
var fragmentFont = val[30];
var fragmentStyle = fragmentSize+" "+fragmentFont;
var colorRate = parseInt(val[31]);

/*var enemyH = 26;
var enemyS = 100;
var enemyL = 48;
var enemyA = 1;*/
var fHSLA = new Array(parseInt(parseInt(val[32])),parseInt(val[33]),parseInt(val[34]),parseInt(val[35]));
var fragmentColor = "rgba("+fHSLA[0]+","+fHSLA[1]+","+fHSLA[2]+","+fHSLA[3]+")";

var mousePos;
	  
var enemyTxt = [];
var laserTxt = [];
var fragmentTxt = [];

var maxEnIndex;
var maxLaIndex;
var maxFaIndex;

var curEnIndex = 0;
var curLaIndex = 0;
var curFaIndex = 0;

var enemySource = "Jasons_Relative_Stamina_files/ABDBody.txt";
var laserSource = "Jasons_Relative_Stamina_files/ABDQuotes.txt";
var fragmentSource ="Jasons_Relative_Stamina_files/ABDReferences.txt";

var valueString = "empty";

var gamePaused = false;

var mouseCurDown = false;
window.onload = function() {
  init();  //example function call.
}
function resetVals (isOrigin)
{
if(isOrigin)
{
	val = getStringArraySpecial("Jasons_Relative_Stamina_files/shootValDoc_Origin21bRGB.txt");
}else
{
	val = getStringArraySpecial("Jasons_Relative_Stamina_files/shootValDoc21bRGB.txt");
}
//console.log(val);
cHSL = new Array(parseInt(val[1]),parseInt(val[2]),parseInt(val[3]));
canvas.style.backgroundColor = 'rgb('+cHSL[0]+','+cHSL[1]+','+cHSL[2]+')';
  
//range 1-15
laserTotal = parseInt(val[4]);
//boolean
laserVertical = (val[5] === "true");
//2-25
laserSpeed = parseInt(val[6]);
//5-50
laserCspace = parseInt(val[7]);

laserInterval = parseInt(val[36]);
isSpray			= val[37];
//allfonts
laserFont = val[8];
//5-50
laserSize = val[9];
laserStyle=laserSize+" "+laserFont;

/*var laserH = 290;
var laserS = 100;
var laserL = 39;
var laserA = 1;*/
lHSLA = new Array(parseInt(val[10]),parseInt(val[11]),parseInt(val[12]),parseInt(val[13]));
laserColor = "rgba("+lHSLA[0]+","+lHSLA[1]+","+lHSLA[2]+","+lHSLA[3]+")";
//ENEMIES
//range 1-25
enemyTotal =parseInt(val[14]);
//50-5000
enemyInterval =parseInt( val[15]); //in milli	
//boolean
enemyVertical = (val[16] === "true");
//1-10
enemySpeedBase = parseInt(val[17]);
//0-20
enemySpeedVar = parseInt( val[18]);
//5-50
enemyCspace = parseInt( val[19]);
//all fonts
enemyFont = val[20];
//5-50
enemySize = val[21];
enemyStyle = enemySize +" "+enemyFont;
eHSLA = new Array(parseInt(val[22]),parseInt(val[23]),parseInt(val[24]),parseInt(val[25]));
enemyColor = "rgba("+eHSLA[0]+","+eHSLA[1]+","+eHSLA[2]+","+eHSLA[3]+")";

//FRAGMENTS
//1-10	
fragmentFadeSpeed =parseInt(val[26]);
//1-10
fragmentSpeedBase = parseInt(val[27]);
//1-20
fragmentSpeedVar =parseInt(val[28]);
fragments = [];
fragmentSize = val[29];
fragmentFont = val[30];
fragmentStyle = fragmentSize+" "+fragmentFont;
colorRate = parseInt(val[31]);

fHSLA = new Array(parseInt(val[32]),parseInt(val[33]),parseInt(val[34]),parseInt(val[35]));
fragmentColor = "rgba("+fHSLA[0]+","+fHSLA[1]+","+fHSLA[2]+","+fHSLA[3]+")";


}
function clearCanvas() {
  ctx.clearRect(0,0,width,height);
}




function init() {
  canvas = document.getElementById('canvas');
canvas.style.backgroundColor = 'rgb('+cHSL[0]+','+cHSL[1]+','+cHSL[2]+')';
  ctx = canvas.getContext('2d');

  setInterval(gameLoop, 25);
  
  enemyTxt = getStringArray(enemySource);
  maxEnIndex = enemyTxt.length-1;
  laserTxt = getStringArray(laserSource);
  maxLaIndex = laserTxt.length-1;
  fragmentTxt = getStringArray(fragmentSource);
  maxFaIndex = fragmentTxt.length-1;
  
  
  
  width = canvas.width;
  height = canvas.height;
  originX = width/2;
  originY = height;
  //mousePos = getMousePos(canvas);
  
  document.addEventListener('keydown', keyDown, false);
  document.addEventListener('keyup', keyUp, false);
//mouse moving- update position
canvas.addEventListener('mousemove', function(evt) {mousePos = getMousePos( evt);}, false); 
canvas.addEventListener('mousedown', mouseIsDown, false); 
canvas.addEventListener('mouseup', mouseIsUp, false); 
canvas.addEventListener('click', spawnLaser, false); 

ctx.textBaseline="middle";
ctx.textAlign = "center";

updateValText();

}	  
//spawn enemies regularly
setTimeout(spawnEnemy, enemyInterval);


var notBeingSprayed = true;

function gameLoop() {
	
	if(window.innerHeight >600)
	{
	canvas.height = window.innerHeight-150;
	
	}else
	{
	
	canvas.height = 400;
	}
	height = canvas.height;
	originY = canvas.height+20;
	originX = canvas.width/2;
			//document.getElementById("fLig").innerHTML=" "+fragmentVal;

  clearCanvas();
  if(!gamePaused)
  {
  moveLaser();
  moveEnemy();
  moveFragments();
  }
  drawLaser();
  drawEnemy();
  drawFragments();
  checkCollision();

if (mouseCurDown && isSpray && notBeingSprayed && !gamePaused){

spawnLaser();
setTimeout(sprayLaser, laserInterval);
//console.log("Being pressed!");
notBeingSprayed = false;
}

}



function sprayLaser ()
{
	if (mouseCurDown && isSpray && !gamePaused){
	spawnLaser();
	setTimeout(sprayLaser, laserInterval);
	//console.log("Being pressed HERE!");
	}
}

function mouseIsDown() {
mouseCurDown = true;
//console.log(mouseCurDown);
}
function mouseIsUp() {
mouseCurDown = false;
notBeingSprayed = true;
////console.log(mouseCurDown);
}
//get mouse position
function getMousePos(evt) {
var rect = canvas.getBoundingClientRect();
return {
  x: evt.clientX - rect.left,
  y: evt.clientY - rect.top
};
}

function rotateX (cX, cY, x, y, angle)
{
var newCoord = cX + Math.cos(angle) * (x - cX) - Math.sin(angle) * (y - cY);
return newCoord ;
}
function rotateY (cX, cY, x, y, angle)
{
var newCoord = cY + Math.sin(angle) * (x - cX) + Math.cos(angle) * (y - cY);
return newCoord ;
}


function checkCollision ()
{
	if(lasers.length && enemies.length)
		for (var i = 0; i<lasers.length; i++)
		{
			for (var j = 0; j<enemies.length; j++)
			{
			//enemies [0]originX [1]originY [2]speed [3]word [4]width [5]height
			//polygon, vector and box shortcuts referencing SAT library
			var P = SAT.Polygon;
			var V = SAT.Vector;
			var B = SAT.Box;
			//give the laser index easier references
			if(laserVertical)
			{
			var laX = lasers[i][0]+ lasers[i][7]/2;
			var laY = lasers[i][1]+ lasers[i][7]/2;
			var laW = lasers[i][6]+ (lasers[i][5].length-3)*laserCspace;
			//console.log(lasers[i][5].length);
			var laH = lasers[i][7];
			var laA = lasers[i][8];
			
			}else//horizontal
			{
			var laX = lasers[i][0]- lasers[i][6]/2;
			var laY = lasers[i][1]+ lasers[i][7]/2;
			var laW = lasers[i][6];
			var laH = lasers[i][7];
			var laA = 0;
			
			}
			/*
			var cX = rotateX (laX, laY, lasers[i][0]+laW/2, lasers[i][1]+laH/2, laA);
			var cY = rotateY (laX, laY, lasers[i][0]+laW/2, lasers[i][1]+laH/2, laA);
			
			var lTLx = rotateX (cX, cY, laX, laY, laA);
			var lTLy = rotateY (cX, cY, laX, laY, laA);
			
			var lTRx = rotateX (cX, cY, cX+laW/2, laY, laA);
			var lTRy =  rotateY (cX, cY, laX, laY, laA);
						
			var lBRx = rotateX (cX, cY, cX+laW/2, cY+laH/2, laA);
			var lBRy =  rotateY (cX, cY, laX, laY, laA);
			
			var lBLx =  rotateX (cX, cY, laX, cY+laH/2, laA);
			var lBLy =  rotateY (cX, cY, laX, laY, laA);*/
			//rotate the points from the TOP LEFT corner to get proper coordinates
			var lTLx = laX;
			var lTLy = laY;
			
			var lTRx = ((laX+laW-lTLx)*Math.cos(laA)- (laY-lTLy)*Math.sin(laA))+lTLx;
			var lTRy = ((laX+laW-lTLx)*Math.sin(laA)+ (laY-lTLy)*Math.cos(laA))+lTLy;
						
			var lBRx = ((laX+laW-lTLx)*Math.cos(laA)- (laY-laH-lTLy)*Math.sin(laA))+lTLx;
			var lBRy = ((laX+laW-lTLx)*Math.sin(laA)+ (laY-laH-lTLy)*Math.cos(laA))+lTLy;
			
			var lBLx = ((laX-lTLx)*Math.cos(laA)- (laY-laH-lTLy)*Math.sin(laA))+lTLx;
			var lBLy = ((laX-lTLx)*Math.sin(laA)+ (laY-laH-lTLy)*Math.cos(laA))+lTLy;
			
			
			
			//laser Polygon created from calculated points
			var laserPoly = new P(new V(0,0), [new V(lTLx, lTLy), new V(lTRx, lTRy), new V(lBRx, lBRy), new V(lBLx, lBLy)]);

			
			//since the enemies are always rotated 90 degrees and are axis-aligned, I will define them as a box instead of polygon, inverting their H and W values to compensate
			if (enemyVertical)
			{
			var enX = enemies[j][0]-enemies[j][5]/2;
			var enY = enemies[j][1];
			var enW = enemies[j][5];
			var enH = enemies[j][4];
			}
			else
			{ //horizontal
			var enX = enemies[j][0]-enemies[j][4]/2;
			var enY = enemies[j][1]-enemies[j][5]/2;
			var enW = enemies[j][4];
			var enH = enemies[j][5];
			
			}
			
			var enemyBox = new B(new V(enX,enY),enW, enH).toPolygon();
			
			var isCollide = SAT.testPolygonPolygon(laserPoly, enemyBox);
			
			if (isCollide )
			{
			//console.log("Collision!");
			spawnFragments (lasers[i][5], enemies[j][3], lTLx, lTLy);
			lasers.splice(i, 1);
			enemies.splice(j, 1);
			break;
			}
			
			//draw debug Boxes		
			//yellow lasers
			/*ctx.fillStyle ="#ffff33";
			ctx.fillStyle = "hsla("+fHSLA[0]+","+fHSLA[1]+"%,"+fHSLA[2]+"%,0.3)";
			ctx.beginPath();
			ctx.moveTo(lTLx,lTLy);
			ctx.lineTo(lTRx,lTRy);
			ctx.lineTo(lBRx,lBRy);
			ctx.lineTo(lBLx,lBLy);
			ctx.closePath();
			ctx.fill();
			ctx.fillStyle = "#fff";*/
			//ctx.fillRect(lTLx, lTLy, 5, 5);
		//	ctx.fillRect(lTRx, lTRy, 5, 5);
		//	ctx.fillRect(lBLx, lBLy, 5, 5);
		//	ctx.fillRect(lBRx, lBRy, 5, 5);
			//blue enemies
			/*ctx.fillStyle = "#33ccff";
			ctx.fillRect (enX,enY,enW,enH);	
			ctx.fillStyle = "#33ccff";*/
			}		
		}

}

function characterArray(word, string, originX, originY)
{
	var tempArray = word.split("");
	var array= [];
	
	var hue ;
	var saturation;
	var lightness ;
	if(string == "laser")
	{
	 hue = lHSLA[0];
	 saturation = lHSLA[1];
	 lightness = lHSLA[2];
	}
	else if(string == "enemy")
	{
	 hue = eHSLA[0];
	 saturation = eHSLA[1];
	 lightness = eHSLA[2];
	} 
	//console.log(string);
	for (var i = 0; i< tempArray.length; i++)
	{
		if(string == "fragment")
		{
		if (i%2 == 0)
		{
	 hue = lHSLA[0];
	 saturation = lHSLA[1];
	 lightness = lHSLA[2];
		
		}else 
		{
	 hue = eHSLA[0];
	 saturation = eHSLA[1];
	 lightness = eHSLA[2];
		
		}
	
		}
	
	var degreeAngle = (Math.floor((Math.random()*360)));
	var radAngle = degreeAngle * Math.PI / 180;
	
	//get vector of direction towards mouse
	var goalX = Math.floor(Math.random()*width);
	var goalY = Math.floor(Math.random()*height);
	var vectorX = goalX - originX;
	var vectorY = goalY - originY;

	//normalise vector before storing its value
	var vMag = Math.sqrt(vectorX*vectorX + vectorY*vectorY);
	vectorX /= vMag;
	vectorY /= vMag;
	
	var moveX = Math.floor((Math.random()*2)-1)+0.1;
	var moveY = Math.floor((Math.random()*2)-1)+0.1;
	var speedX = Math.floor((Math.random()*fragmentSpeedVar)+fragmentSpeedBase);
	var decay = Math.floor((Math.random()*1.5)+fragmentFadeSpeed)/100;
	var decay = fragmentFadeSpeed/1000+((Math.floor((Math.random()*2)-1))/100);
	//console.log(decay);
	//fragments [0]originX [1]originY [2]Angle [3]speed [4]character [5]opacity [6]xdir [7]ydir [8]decay [9]source [10]Hue [11] Saturation [12]Lightness
	array.push([originX, originY, radAngle, speedX, tempArray[i], 1, vectorX, vectorY, decay, string, hue, saturation, lightness]);
	}
	return array;
}
function updateColor (curC, goalC)
{
	if (curC < goalC)
	{
	curC += colorRate;
	}
	else if (curC > goalC)
	{
	curC -= colorRate;
	}
	return curC;
}

function spawnFragments(laser, enemy, originX, originY)
{


	var laserChar = characterArray(fragmentTxt[curFaIndex], "fragment", originX, originY);
	curFaIndex ++;

	if (curFaIndex > maxFaIndex)
	{
	curFaIndex = 0;
	}
	for (var i=0; i<laserChar.length;i++)
	{
	fragments.push([laserChar[i][0],laserChar[i][1],laserChar[i][2],laserChar[i][3],laserChar[i][4],laserChar[i][5],laserChar[i][6],laserChar[i][7],laserChar[i][8],laserChar[i][9],laserChar[i][10],laserChar[i][11],laserChar[i][12]]);
	//fragments.push([laserChar[i]]);
	}
	/*var laserChar = characterArray(laser, "laser", originX, originY);
	var enemyChar = characterArray(laser, "enemy", originX, originY);
	
	for (var i=0; i<laserChar.length;i++)
	{
	fragments.push([laserChar[i][0],laserChar[i][1],laserChar[i][2],laserChar[i][3],laserChar[i][4],laserChar[i][5],laserChar[i][6],laserChar[i][7],laserChar[i][8],laserChar[i][9],laserChar[i][10],laserChar[i][11],laserChar[i][12]]);
	//fragments.push([laserChar[i]]);
	}	
	for (var i=0; i<enemyChar.length;i++)
	{
	fragments.push([enemyChar[i][0],enemyChar[i][1],enemyChar[i][2],enemyChar[i][3],enemyChar[i][4],enemyChar[i][5],enemyChar[i][6],enemyChar[i][7],enemyChar[i][8],enemyChar[i][9],enemyChar[i][10],enemyChar[i][11],enemyChar[i][12]]);
	}*/
	//console.log();
}

function moveFragments ()
{
	if(fragments.length)
	for (var i = 0; i< fragments.length; i++)
	{
		fragments[i][0] += fragments [i][6]*fragments[i][3];
		fragments[i][1] += fragments [i][7]*fragments[i][3];
		fragments[i][7] += 0.04;
		fragments[i][5] -= fragments[i][8];
		
		fragments[i][10]= updateColor (fragments[i][10], fHSLA[0]);
		fragments[i][11]= updateColor (fragments[i][11], fHSLA[1]);
		fragments[i][12]= updateColor (fragments[i][12], fHSLA[2]);
		if (fragments[i][5] <= 0)
		{
		//console.log(fHSLA);
		fragments.splice(i,1);
		}
	}
}

function drawFragments()
{
	if(fragments.length)
	for ( var i = 0; i<fragments.length;i++)
	{
		
	ctx.save();
	ctx.translate (fragments[i][0], fragments[i][1]);
	ctx.rotate(fragments[i][2]);	
	
	ctx.font = fragmentStyle;
	ctx.fillStyle ="rgba("+fragments[i][10]+","+fragments[i][11]+","+fragments[i][12]+","+fragments[i][5]+")";
	
	//ctx.fillStyle ="rgba(0,255,127,"+fragments[i][5]+")";
	ctx.fillText(fragments[i][4], 0, 0);
	
	//console.log(fragments[i][0]);
	
	ctx.restore();
	}
}
function spawnLaser()
{

  if(lasers.length < laserTotal)
  {
	//get vector of direction towards mouse
	var vectorX = mousePos.x - originX;
	var vectorY = mousePos.y - originY;

	//normalise vector before storing its value
	var vMag = Math.sqrt(vectorX*vectorX + vectorY*vectorY);
	vectorX /= vMag;
	vectorY /= vMag;

	//get the word for that vector
	var laserWord = laserTxt [curLaIndex];
	curLaIndex ++;
	
	//loop word array	
	if (curLaIndex > maxLaIndex)
	{
		curLaIndex =0;
	}
	
	//get bounding box of word by placing it in an invisible div and getting its dimensions
	document.getElementById("Test").innerHTML=laserWord;
	var divGuide = document.getElementById("Test");
	
//var laserStyle=laserSize+" "+laserFont;
	divGuide.style.font = laserStyle;
	var wordWidth = (divGuide.clientWidth + 1);
	var wordHeight = (divGuide.clientHeight +1 );
	
	//add laser to laser array
	/////////////origin coords, vector coords, speed, word
	//Lasers [0]originX[1]originY[2]vectorX[3]vectorY[4]speed[5]word[6]width[7]height[8]angle
	lasers.push([originX, originY, vectorX,vectorY, laserSpeed, laserWord, wordWidth, wordHeight/2,0]);
	  }
}

function moveLaser() {

	//Lasers 
	//[0]originX
	//[1]originY
	//[2]vectorX
	//[3]vectorY
	//[4]speed
	//[5]word
	//[6]width
	//[7]height
	//[8]angle
    for (var i = 0; i < lasers.length; i++) 
  { 
	var isDead = false;
  
	if (lasers[i][0] > -100 && lasers[i][0] < width+100)
	{
      lasers[i][0] += lasers[i][2]* lasers[i][4];
	}else {isDead = true;}

	if (lasers[i][1] > -100 && lasers[i][1] < height+100)
	{
      lasers[i][1] += lasers[i][3]* lasers[i][4];
	}else {isDead = true;}

	
	if(isDead)
	{
      lasers.splice(i, 1);
	}
  }
}

function drawLaser() {
	//Lasers 
	//[0]originX
	//[1]originY
	//[2]vectorX
	//[3]vectorY
	//[4]speed
	//[5]word
	//[6]width
	//[7]height
	//[8]angle
	
  if (lasers.length)
    for (var i = 0; i < lasers.length; i++) 
	{
		var theta = Math.atan2(lasers[i][3], lasers [i][2]);
		lasers[i][8] = theta;
		//make and array with the characters of the laser's word
		
		ctx.save();
		ctx.translate (lasers[i][0], lasers[i][1]);
		//ctx.rotate(theta);	

		
		//var laserStyle=laserSize+" "+laserFont;
		ctx.font = laserStyle;
		ctx.fillStyle = laserColor;
		
		if(laserVertical)
		{	
			var tempWord = lasers[i][5].split("");
			var tempX = 0;
			var tempY = 0;
			
			for (var c=tempWord.length-1; c>=0; c--)
			{
			ctx.fillText(tempWord[c], tempX, tempY);
			tempX += laserCspace*lasers[i][2];
			tempY += laserCspace*lasers[i][3];
			}
		}
		else
		{
			ctx.fillText(lasers[i][5], 0, 0);
		}

		ctx.restore();
    }
}
function spawnEnemy ()
{
if(enemies.length<enemyTotal)
{
	//console.log("Enemy Spawned!"+enemyInterval);
	//get new word for the enemy
	var enemyWord = enemyTxt [curEnIndex];
	curEnIndex ++;

	if (curEnIndex > maxEnIndex)
	{
	curEnIndex = 0;
	}
	
	//get a random x start position inside the screen
	var startX =Math.floor((Math.random()*canvas.width));
	//get random speed between 2 and 12
	var speed = Math.floor((Math.random()*enemySpeedVar)+enemySpeedBase); 
	
	//get bounding box by putting word in invisible div and measuring it
	document.getElementById("Test").innerHTML=enemyWord;
	var divGuide = document.getElementById("Test");
	divGuide.style.font = enemyStyle;
	var wordWidth = (divGuide.clientWidth + 1);
	var wordHeight = (divGuide.clientHeight +1 );
	
	if(speed <= 0)
	{
	speed = 1;
	}
	//enemies [0]originX [1]originY [2]speed [3]word [4]width [5]height
	enemies.push([startX,-50, speed, enemyWord, wordWidth, wordHeight/2]);

	//prints in firebug
	//console.log("add enemy", enemyWord, enemies.length);
}

setTimeout(spawnEnemy, enemyInterval);
}  

function moveEnemy()
{

	//enemies [0]originX [1]originY [2]speed [3]word [4]width [5]height
	if (enemies.length)
    for (var i = 0; i < enemies.length; i++) 
	{
	 if(enemies[i][1] < canvas.height+200)
	 {
		enemies[i][1]+= enemies [i][2];
	 }else
	 {
		enemies.splice(i,1);
	 }
	
	}
//console.log("move enemy");
}
function drawEnemy()
{
	//enemies [0]originX [1]originY [2]speed [3]word [4]width [5]height
	if (enemies.length>0)
	for (var i = 0; i < enemies.length; i++) 
	{
		var theta = Math.PI/2;
		ctx.save();
		ctx.translate (enemies[i][0], enemies[i][1]);
		//ctx.rotate(theta);	

			/*ctx.fillStyle ="#fff";
		ctx.fillRect(0,0-enemies[i][5],enemies[i][4],enemies[i][5]);*/

		ctx.font = enemyStyle;
		ctx.fillStyle =enemyColor;
		
		
		if(enemyVertical)
		{
			var tempWord = enemies[i][3].split("");
			var tempX = 0;
			var tempY = 0;
			
			for (var c=0; c<tempWord.length; c++)
			{
			ctx.fillText(tempWord[c], tempX, tempY);
			
			tempY += enemyCspace;
			}
		}
		else
		{
			ctx.fillText(enemies[i][3], 0, 0);
		}
		
		ctx.restore();

	//console.log(enemies[i][3]);
	}
}
var laserVPressed = false;
var interfacePressed = false;

var interfaceVisible = false;
function keyDown(e) {
          //e.preventDefault();
      var evtobj = window.event? event : e
	  
	  //ctrl+i
	  if (evtobj.keyCode == 32 && evtobj.ctrlKey && !interfacePressed)
	  {
				//console.log("IN");
			if(interfaceVisible)
			{
				document.getElementById('container').style.display = "none";
				interfaceVisible = false;
				//console.log("OFF");
			}else
			{
				document.getElementById('container').style.display = "block";
				interfaceVisible = true;
				//console.log("ON");
			}
	  interfacePressed=true;
	  }

	  switch(evtobj.keyCode)
	  {
	  //M/N change number of lasers
		case 77: //m
			laserTotal += 1;
		break;
		
		case 78: //n
			if (laserTotal >1)
			laserTotal -= 1;
		break;
		case 80: //p
			gamePaused = !gamePaused
		break;
	  //left/right laser size
		case 37: //left
          e.preventDefault();
			var tempLaserVal = parseInt(laserSize.substring(0,2));
			if (tempLaserVal>10)
			tempLaserVal -=1;
			
			laserSize = tempLaserVal+"pt";
			laserStyle=laserSize+" "+laserFont;
		break;
		case 39: //right
          e.preventDefault();
			var tempLaserVal = parseInt(laserSize.substring(0,2));
			console.log(tempLaserVal);
			if(tempLaserVal <100)
			tempLaserVal +=1;
			
			laserSize = tempLaserVal+"pt";
			laserStyle=laserSize+" "+laserFont;
		break;
	  
	  //up/down spray speed
		case 38: //up
          e.preventDefault();
			if(laserInterval >10)
			laserInterval -=10;
			
		break;
		case 40: //down
          e.preventDefault();
			if(laserInterval <5000)
			laserInterval +=10;
			
		break;
	  //v toggle vertical
		case 86: //v
		if(!laserVPressed)
		{
			laserVertical = !laserVertical;
			laserVPressed = true;
		}
			
		break;
	  }
	  updateValText();
	  //CRTL+I hide content div
  }
  

function keyUp(e) {
//console.log(interfacePressed);
	if(laserVPressed && e.keyCode ==86)
	{
		laserVPressed = false;
	}

  //ctrl+i
  if (e.keyCode == 32)
  {
  
	  interfacePressed = false;
  }
}

function getLocalText(curFile)
{
	if (!window.STAMINA_LOCAL_TEXT) {
		return null;
	}

	if (Object.prototype.hasOwnProperty.call(window.STAMINA_LOCAL_TEXT, curFile))
	{
		return window.STAMINA_LOCAL_TEXT[curFile];
	}

	var fileName = curFile.split('/').pop();
	if (Object.prototype.hasOwnProperty.call(window.STAMINA_LOCAL_TEXT, fileName))
	{
		return window.STAMINA_LOCAL_TEXT[fileName];
	}

	return null;
}


//create the current string array
function getStringArray(curFile)
{
	var localText = getLocalText(curFile);
	if (localText !== null) {
		return localText.split(/[\s ]+/);
	}

	var request = getHTTPObject();
	var wordArray = [];
	if (request) {
		request.onreadystatechange = function() {
			wordArray =request.responseText.split(/[\s ]+/);
		};
		request.open("GET", curFile, false);
		request.send(null);
		return wordArray;
	}

	return wordArray;

}
//create the current string array
function getStringArraySpecial(curFile)
{
	var localText = getLocalText(curFile);
	if (localText !== null) {
		return localText.split(/[\n\r]+/);
	}

	var request = getHTTPObject();
	var wordArray = [];
	if (request) {
		request.onreadystatechange = function() {
			wordArray =request.responseText.split(/[\n\r]+/);
		};
		request.open("GET", curFile, false);
		request.send(null);
		return wordArray;
	}

	return wordArray;

}

function getHTTPObject() {
  var xhr = false;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch(e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch(e) {
        xhr = false;
      }
    }
  }
  return xhr;
}

window.onload = init;

function updateLaserVal(reference)
{
var laserVal = document.getElementById(reference).value;

//console.log("In HERE");
	switch(reference)
	{
	case 'laFont':
		laserFont = laserVal;
		laserStyle=laserSize+" "+laserFont;
	break;
	
	case 'laOrientation':
		
		if(document.getElementById(reference).checked)
		{
		laserVertical = true;
		}
		else
		{
		
		laserVertical = false;
		}
	break;
	case 'laSpray':
		
		if(document.getElementById(reference).checked)
		{
		isSpray = true;
		}
		else
		{
		
		isSpray = false;
		}
	break;
	case 'laSpeed':
	case 'laTSpeed':
		laserSpeed=laserVal;
		//document.getElementById("lSpeed").innerHTML=" "+laserVal;
	break;
	case 'laSpacing':
	case 'laTSpacing':
		laserCspace=laserVal;
		//document.getElementById("lSpacing").innerHTML=" "+laserVal;
	
	break;
	case 'laSize':
	case 'laTSize':
		laserSize=laserVal+"pt";
		laserStyle = laserSize+" "+laserFont;
		//document.getElementById("lSize").innerHTML=" "+laserVal;
	
	break;
	case 'laTotal':
	case 'laTTotal':
		laserTotal= laserVal;
		//document.getElementById("lTotal").innerHTML=" "+laserVal;
	
	break;
	case 'laHue':
	case 'laTHue':
		lHSLA[0]=parseInt(laserVal);
		//document.getElementById("lHue").innerHTML=" "+laserVal;
		laserColor = "rgba("+lHSLA[0]+","+lHSLA[1]+","+lHSLA[2]+","+lHSLA[3]+")"; laserVal;
	
	break;
	case 'laSat':
	case 'laTSat':
		lHSLA[1]=parseInt(laserVal);
		//document.getElementById("lSat").innerHTML=" "+laserVal;
		laserColor = "rgba("+lHSLA[0]+","+lHSLA[1]+","+lHSLA[2]+","+lHSLA[3]+")";
	break;
	case 'laLig':
	case 'laTLig':
		lHSLA[2]=parseInt(laserVal);
		//document.getElementById("lLig").innerHTML=" "+laserVal;
		laserColor = "rgba("+lHSLA[0]+","+lHSLA[1]+","+lHSLA[2]+","+lHSLA[3]+")";
	break;
	case 'laInterval':
	case 'laTInterval':
		laserInterval=parseInt(laserVal);
	break;

	}
/*
console.log(laserStyle);
console.log(reference);
console.log(laserVal);*/
updateValText();
}


function updateEnemyVal(reference)
{

console.log("enemyColor");
var enemyVal = document.getElementById(reference).value;

	switch(reference)
	{
	case 'enFont':
		enemyFont = enemyVal;
		enemyStyle=enemySize+" "+enemyFont;
	break;
	
	case 'enOrientation':
		
		if(document.getElementById(reference).checked)
		{
		enemyVertical = true;
		}
		else
		{
		
		enemyVertical = false;
		}
	break;
	case 'enSpeed':
	case 'enTSpeed':
		enemySpeedVar=enemyVal;
		//document.getElementById("eSpeed").innerHTML=" "+enemyVal;
	break;
	case 'enBSpeed':
	case 'enTBSpeed':
		enemySpeedBase=enemyVal;
		//document.getElementById("eBSpeed").innerHTML=" "+enemyVal;
	break;
	case 'enSpacing':
	case 'enTSpacing':
		//why do I need parse Int only here?
		enemyCspace = parseInt(enemyVal);
		//document.getElementById("eSpacing").innerHTML=" "+enemyVal;
	
	break;
	case 'enSize':
	case 'enTSize':
		enemySize=enemyVal+"pt";
		enemyStyle = enemySize+" "+enemyFont;
		//document.getElementById("eSize").innerHTML=" "+enemyVal;
	
	break;
	case 'enTotal':
	case 'enTTotal':
		enemyTotal= enemyVal;
		//document.getElementById("eTotal").innerHTML=" "+enemyVal;
	
	break;
	case 'enInterval':
	case 'enTInterval':
		enemyInterval= parseInt(enemyVal);
		//document.getElementById("eInterval").innerHTML=" "+enemyVal;
	
	break;
		case 'enHue':
		case 'enTHue':
			eHSLA[0]=parseInt(enemyVal);
			//document.getElementById("eHue").innerHTML=" "+enemyVal;
 enemyColor = "rgba("+eHSLA[0]+","+eHSLA[1]+","+eHSLA[2]+","+eHSLA[3]+")";
		
		
		break;
		case 'enSat':
		case 'enTSat':
			eHSLA[1]=parseInt(enemyVal);
			//document.getElementById("eSat").innerHTML=" "+enemyVal;
 enemyColor = "rgba("+eHSLA[0]+","+eHSLA[1]+","+eHSLA[2]+","+eHSLA[3]+")";
		
		
		break;
		case 'enLig':
		case 'enTLig':
			eHSLA[2]=parseInt(enemyVal);
			//document.getElementById("eLig").innerHTML=" "+enemyVal;
enemyColor = "rgba("+eHSLA[0]+","+eHSLA[1]+","+eHSLA[2]+","+eHSLA[3]+")";
		
		break;
	
	}
/*
console.log(enemyStyle);
console.log(reference);
console.log(enemyVal);*/
updateValText();

}

function updateFragmentVal(reference)
{
	var fragmentVal = document.getElementById(reference).value;
	switch(reference)
	{
		case 'frFont':
			fragmentFont = fragmentVal;
			fragmentStyle=fragmentSize+" "+fragmentFont;
		break;
		case 'frSpeed':
		case 'frTSpeed':
			fragmentSpeedVar=fragmentVal;
			//document.getElementById("fSpeed").innerHTML=" "+fragmentVal;
		break;
		case 'frBSpeed':
		case 'frTBSpeed':
			fragmentSpeedBase=parseInt(fragmentVal);
			//document.getElementById("fBSpeed").innerHTML=" "+fragmentVal;
		break;
		case 'frSize':
		case 'frTSize':
			fragmentSize=fragmentVal+"pt";
			fragmentStyle=fragmentSize+" "+fragmentFont;
			//document.getElementById("fSize").innerHTML=" "+fragmentVal;
		
		break;
		case 'frFade':
		case 'frTFade':
			fragmentFadeSpeed=parseInt(fragmentVal);
			//document.getElementById("fFade").innerHTML=" "+fragmentVal;
		
		break;
		case 'frHue':
		case 'frTHue':
			fHSLA[0]=parseInt(fragmentVal);
			//document.getElementById("fHue").innerHTML=" "+fragmentVal;
		
var fragmentColor = "rgba("+fHSLA[0]+","+fHSLA[1]+","+fHSLA[2]+","+fHSLA[3]+")";
		break;
		case 'frSat':
		case 'frTSat':
			fHSLA[1]=parseInt(fragmentVal);
			//document.getElementById("fSat").innerHTML=" "+fragmentVal;
		
var fragmentColor = "rgba("+fHSLA[0]+","+fHSLA[1]+","+fHSLA[2]+","+fHSLA[3]+")";
		break;
		case 'frLig':
		case 'frTLig':
			fHSLA[2]=parseInt(fragmentVal);
			//document.getElementById("fLig").innerHTML=" "+fragmentVal;
		var fragmentColor = "rgba("+fHSLA[0]+","+fHSLA[1]+","+fHSLA[2]+","+fHSLA[3]+")";
		break;
		case 'frRate':
		case 'frTRate':
			colorRate=parseInt(fragmentVal)/2;
			//document.getElementById("fRate").innerHTML=" "+(fragmentVal/2);
		
		break;
	}

/*onsole.log(enemyStyle);/*
console.log(reference);
console.log(fragmentVal);*/
	updateValText();
}
 function updateValText()
{	
	//SET FONT BOXES
	var sel = document.getElementById('frFont');
    for(var i, j = 0; i = sel.options[j]; j++) {
        if(i.value == fragmentFont) {
            sel.selectedIndex = j;
            break;
        }
    }	
	sel = document.getElementById('laFont');
    for(var i, j = 0; i = sel.options[j]; j++) {
        if(i.value == laserFont) {
            sel.selectedIndex = j;
            break;
        }
    }	
	sel = document.getElementById('enFont');
    for(var i, j = 0; i = sel.options[j]; j++) {
        if(i.value == enemyFont) {
            sel.selectedIndex = j;
            break;
        }
    }
	//LASERS
	if(laserVertical)
	document.getElementById("laOrientation").checked = true;
	else
	document.getElementById("laOrientation").checked = false;
	if(isSpray)
	document.getElementById("laSpray").checked = true;
	else
	document.getElementById("laSpray").checked = false;
	
	document.getElementById("lInterval").innerHTML=" "+laserInterval;
	document.getElementById("lSpeed").innerHTML=" "+laserSpeed;
	document.getElementById("lSpacing").innerHTML=" "+laserCspace;
	document.getElementById("lSize").innerHTML=" "+laserSize;
	document.getElementById("lTotal").innerHTML=" "+laserTotal;
	document.getElementById("lHue").innerHTML=" "+lHSLA[0];
	document.getElementById("lSat").innerHTML=" "+lHSLA[1];
	document.getElementById("lLig").innerHTML=" "+lHSLA[2];
	//console.log(lHSLA);
	
	//ENEMIES
	if(enemyVertical)
	document.getElementById("enOrientation").checked = true;
	else
	document.getElementById("enOrientation").checked = false;
	
	document.getElementById("eSpeed").innerHTML=" "+enemySpeedVar;
	document.getElementById("eBSpeed").innerHTML=" "+enemySpeedBase;
	document.getElementById("eSpacing").innerHTML=" "+enemyCspace;
	document.getElementById("eSize").innerHTML=" "+enemySize;
	document.getElementById("eTotal").innerHTML=" "+enemyTotal;
	document.getElementById("eInterval").innerHTML=" "+enemyInterval;
	document.getElementById("eHue").innerHTML=" "+eHSLA[0];
	document.getElementById("eSat").innerHTML=" "+eHSLA[1];
	document.getElementById("eLig").innerHTML=" "+eHSLA[2];
	
	
	//FRAGMENT
	document.getElementById("fSpeed").innerHTML=" "+fragmentSpeedVar;
	document.getElementById("fBSpeed").innerHTML=" "+fragmentSpeedBase;
	document.getElementById("fSize").innerHTML=" "+fragmentSize;
	document.getElementById("fFade").innerHTML=" "+fragmentFadeSpeed;
	document.getElementById("fHue").innerHTML=" "+fHSLA[0];
	document.getElementById("fSat").innerHTML=" "+fHSLA[1];
	document.getElementById("fLig").innerHTML=" "+fHSLA[2];
	document.getElementById("fRate").innerHTML=" "+(colorRate/2);

	//CANVAS
	document.getElementById("cHue").innerHTML=" "+cHSL[0];
	document.getElementById("cSat").innerHTML=" "+cHSL[1];
	document.getElementById("cLig").innerHTML=" "+cHSL[2];
}

function updateCanvasVal(reference)
{

	canvasVal = document.getElementById(reference).value;
	
	switch(reference)
	{
		case 'caHue':
		case 'caTHue':
		cHSL[0] = parseInt(canvasVal);
		canvas.style.backgroundColor = 'rgb('+cHSL[0]+','+cHSL[1]+','+cHSL[2]+')';//"hsl("cHSL[0]","cHSL[1]"%,"cHSL[2]"%)";
		//document.getElementById("cHue").innerHTML=" "+canvasVal;
		break;
		case 'caSat':
		case 'caTSat':
		cHSL[1] = parseInt(canvasVal);
		document.getElementById("canvas").style.backgroundColor = 'rgb('+cHSL[0]+','+cHSL[1]+','+cHSL[2]+')';//"hsl("cHSL[0]","cHSL[1]"%,"cHSL[2]"%)";
		//document.getElementById("cSat").innerHTML=" "+canvasVal;
		
		break;
		case 'caLig':
		case 'caTLig':
		cHSL[2] = parseInt(canvasVal);
		document.getElementById("canvas").style.backgroundColor = 'rgb('+cHSL[0]+','+cHSL[1]+','+cHSL[2]+')';//"hsl("cHSL[0]","cHSL[1]"%,"cHSL[2]"%)";
		//document.getElementById("cLig").innerHTML=" "+canvasVal;
		
		break;
		case 'caLog':
		document.getElementById("cLog").innerHTML='<h2>Laser Options</h2>laserStyle = '+laserStyle+'</BR> laserVertical ='+laserVertical+'</BR> laserSpray = '+isSpray+'</BR> laser Spray Speed = '+laserInterval+'</BR>laserCspace = '+laserCspace+'</BR> laserSpeed = '+laserSpeed+'</BR> laserTotal = '+laserTotal+'</BR> laserColor = '+laserColor+'</BR><h2>Enemy Options</h2> enemyStyle = '+enemyStyle+'</BR> enemyVertical= '+enemyVertical+'</BR> enemyCspace = '+enemyCspace+'</BR> enemySpeedBase = '+enemySpeedBase+'</BR> enemySpeedVar = '+enemySpeedVar+'</BR> ememyTotal = '+enemyTotal+'</BR> enemyColor = '+enemyColor+'</BR> enemyInterval = '+enemyInterval+'<h2> Explosion Options</h2> fragmentStyle = '+fragmentStyle+'</BR> fragmentSpeedBase = '+fragmentSpeedBase+'</BR> fragmentSpeedVar = '+fragmentSpeedVar+'</BR> fragmentColor = '+fragmentColor+'</BR> color change rate = '+colorRate+'<h2>Canvas Options</h2> canvasColor = hsl('+cHSL[0]+','+cHSL[1]+'%,'+cHSL[2]+'%)';
		
		break;
	}
	updateValText();
	//	document.getElementById("cHue").innerHTML=" "+canvasVal;
	//	document.getElementById("cSat").innerHTML=" "+canvasVal;
		//document.getElementById("cLig").innerHTML=" "+canvasVal;
	//console.log("canvasVal");
}


function getValueString()
{
//console.log(cHSL[2]);
	valueString = /*"START!***"+*/cHSL[0].toString()+"***"+cHSL[1].toString()+"***"+cHSL[2].toString()+"***"+
	laserTotal.toString()+"***"+laserVertical+"***"+laserSpeed.toString()+"***"+laserCspace.toString()+"***"+laserFont+"***"+laserSize+"***"+lHSLA[0].toString()+"***"+lHSLA[1].toString()+"***"+lHSLA[2].toString()+"***"+lHSLA[3].toString()+"***"+
	enemyTotal.toString()+"***"+enemyInterval.toString()+"***"+enemyVertical+"***"+enemySpeedBase.toString()+"***"+enemySpeedVar.toString()+"***"+enemyCspace.toString()+"***"+enemyFont+"***"+enemySize+"***"+eHSLA[0].toString()+"***"+eHSLA[1].toString()+"***"+eHSLA[2].toString()+"***"+eHSLA[3].toString()+"***"+
	fragmentFadeSpeed.toString()+"***"+fragmentSpeedBase.toString()+"***"+fragmentSpeedVar.toString()+"***"+fragmentSize+"***"+fragmentFont+"***"+colorRate.toString()+"***"+fHSLA[0].toString()+"***"+fHSLA[1].toString()+"***"+fHSLA[2].toString()+"***"+fHSLA[3].toString()+"***"+laserInterval.toString()+"***"+isSpray.toString()+"***"+document.getElementById("noteStringArea").value+"***"+"  ";

	document.getElementById("valStringArea").value= valueString;
	//var divGuide = document.getElementById("Test");
}

