var canvas,
    ctx,
   originX = 300,
   originY = 600,
   width = 1000,
   height = 700
   ;
//see valDocReference.txt to see what these values are corresponding to
//index = line number
var SETTINGS_DEFAULT_PATH = "settings/defaults.json";
var PRESET_STORAGE_KEY = "poetryCommand.presets.v1";

function getBuiltInDefaultSettings()
{
	return {
		canvas: { r: 0, g: 0, b: 0 },
		laser: {
			density: 100,
			vertical: false,
			speed: 20,
			spacing: 27,
			font: "Open Sans",
			size: "28pt",
			color: { r: 255, g: 255, b: 255, a: 1 },
			interval: 50,
			spray: true
		},
		enemy: {
			total: 12,
			interval: 500,
			vertical: false,
			baseSpeed: 2,
			speedVariation: 12,
			spacing: 20,
			font: "Arvo",
			size: "28pt",
			color: { r: 232, g: 115, b: 58, a: 1 }
		},
		fragment: {
			fadeSpeed: 20,
			baseSpeed: 3,
			speedVariation: 17,
			size: "20pt",
			font: "Arvo",
			colorRate: 10,
			color: { r: 156, g: 100, b: 50, a: 1 }
		}
	};
}

function cloneSettings(obj)
{
	return JSON.parse(JSON.stringify(obj));
}

function toIntOrDefault(value, defaultValue)
{
	var parsed = parseInt(value, 10);
	return isNaN(parsed) ? defaultValue : parsed;
}

function toNumberOrDefault(value, defaultValue)
{
	var parsed = parseFloat(value);
	return isNaN(parsed) ? defaultValue : parsed;
}

function toBoolOrDefault(value, defaultValue)
{
	if (value === true || value === false) {
		return value;
	}
	if (value === "true") {
		return true;
	}
	if (value === "false") {
		return false;
	}
	return defaultValue;
}

function normalizeSettings(raw)
{
	var base = getBuiltInDefaultSettings();
	var n = cloneSettings(base);
	if (!raw) {
		return n;
	}

	if (raw.canvas) {
		n.canvas.r = toIntOrDefault(raw.canvas.r, n.canvas.r);
		n.canvas.g = toIntOrDefault(raw.canvas.g, n.canvas.g);
		n.canvas.b = toIntOrDefault(raw.canvas.b, n.canvas.b);
	}

	if (raw.laser) {
		n.laser.density = toIntOrDefault(raw.laser.density, n.laser.density);
		n.laser.density = toIntOrDefault(raw.laser.total, n.laser.density);
		n.laser.vertical = toBoolOrDefault(raw.laser.vertical, n.laser.vertical);
		n.laser.speed = toIntOrDefault(raw.laser.speed, n.laser.speed);
		n.laser.spacing = toIntOrDefault(raw.laser.spacing, n.laser.spacing);
		n.laser.font = raw.laser.font || n.laser.font;
		n.laser.size = (raw.laser.size || n.laser.size).toString();
		n.laser.interval = toIntOrDefault(raw.laser.interval, n.laser.interval);
		n.laser.spray = toBoolOrDefault(raw.laser.spray, n.laser.spray);
		if (raw.laser.color) {
			n.laser.color.r = toIntOrDefault(raw.laser.color.r, n.laser.color.r);
			n.laser.color.g = toIntOrDefault(raw.laser.color.g, n.laser.color.g);
			n.laser.color.b = toIntOrDefault(raw.laser.color.b, n.laser.color.b);
			n.laser.color.a = toNumberOrDefault(raw.laser.color.a, n.laser.color.a);
		}
	}

	if (raw.enemy) {
		n.enemy.total = toIntOrDefault(raw.enemy.total, n.enemy.total);
		n.enemy.interval = toIntOrDefault(raw.enemy.interval, n.enemy.interval);
		n.enemy.vertical = toBoolOrDefault(raw.enemy.vertical, n.enemy.vertical);
		n.enemy.baseSpeed = toIntOrDefault(raw.enemy.baseSpeed, n.enemy.baseSpeed);
		n.enemy.speedVariation = toIntOrDefault(raw.enemy.speedVariation, n.enemy.speedVariation);
		n.enemy.spacing = toIntOrDefault(raw.enemy.spacing, n.enemy.spacing);
		n.enemy.font = raw.enemy.font || n.enemy.font;
		n.enemy.size = (raw.enemy.size || n.enemy.size).toString();
		if (raw.enemy.color) {
			n.enemy.color.r = toIntOrDefault(raw.enemy.color.r, n.enemy.color.r);
			n.enemy.color.g = toIntOrDefault(raw.enemy.color.g, n.enemy.color.g);
			n.enemy.color.b = toIntOrDefault(raw.enemy.color.b, n.enemy.color.b);
			n.enemy.color.a = toNumberOrDefault(raw.enemy.color.a, n.enemy.color.a);
		}
	}

	if (raw.fragment) {
		n.fragment.fadeSpeed = toIntOrDefault(raw.fragment.fadeSpeed, n.fragment.fadeSpeed);
		n.fragment.baseSpeed = toIntOrDefault(raw.fragment.baseSpeed, n.fragment.baseSpeed);
		n.fragment.speedVariation = toIntOrDefault(raw.fragment.speedVariation, n.fragment.speedVariation);
		n.fragment.size = (raw.fragment.size || n.fragment.size).toString();
		n.fragment.font = raw.fragment.font || n.fragment.font;
		n.fragment.colorRate = toIntOrDefault(raw.fragment.colorRate, n.fragment.colorRate);
		if (raw.fragment.color) {
			n.fragment.color.r = toIntOrDefault(raw.fragment.color.r, n.fragment.color.r);
			n.fragment.color.g = toIntOrDefault(raw.fragment.color.g, n.fragment.color.g);
			n.fragment.color.b = toIntOrDefault(raw.fragment.color.b, n.fragment.color.b);
			n.fragment.color.a = toNumberOrDefault(raw.fragment.color.a, n.fragment.color.a);
		}
	}

	return n;
}

function settingsToValArray(settings)
{
	return [
		"Origin2",
		settings.canvas.r.toString(),
		settings.canvas.g.toString(),
		settings.canvas.b.toString(),
		settings.laser.density.toString(),
		settings.laser.vertical ? "true" : "false",
		settings.laser.speed.toString(),
		settings.laser.spacing.toString(),
		settings.laser.font,
		settings.laser.size.toString(),
		settings.laser.color.r.toString(),
		settings.laser.color.g.toString(),
		settings.laser.color.b.toString(),
		settings.laser.color.a.toString(),
		settings.enemy.total.toString(),
		settings.enemy.interval.toString(),
		settings.enemy.vertical ? "true" : "false",
		settings.enemy.baseSpeed.toString(),
		settings.enemy.speedVariation.toString(),
		settings.enemy.spacing.toString(),
		settings.enemy.font,
		settings.enemy.size.toString(),
		settings.enemy.color.r.toString(),
		settings.enemy.color.g.toString(),
		settings.enemy.color.b.toString(),
		settings.enemy.color.a.toString(),
		settings.fragment.fadeSpeed.toString(),
		settings.fragment.baseSpeed.toString(),
		settings.fragment.speedVariation.toString(),
		settings.fragment.size.toString(),
		settings.fragment.font,
		settings.fragment.colorRate.toString(),
		settings.fragment.color.r.toString(),
		settings.fragment.color.g.toString(),
		settings.fragment.color.b.toString(),
		settings.fragment.color.a.toString(),
		settings.laser.interval.toString(),
		settings.laser.spray ? "true" : "false"
	];
}

function getJSONSettings(curFile)
{
	var request = getHTTPObject();
	if (!request) {
		return null;
	}

	try {
		request.open("GET", curFile, false);
		request.send(null);
		if (request.status >= 200 && request.status < 300 && request.responseText) {
			return JSON.parse(request.responseText);
		}
	} catch (err) {
		return null;
	}
	return null;
}

function loadDefaultSettings()
{
	var json = getJSONSettings(SETTINGS_DEFAULT_PATH);
	return normalizeSettings(json);
}

function getJSONArray(curFile)
{
	var json = getJSONSettings(curFile);
	if (json && json.length) {
		return json;
	}
	var localText = getLocalText(curFile);
	if (localText !== null) {
		try {
			json = JSON.parse(localText);
			if (json && json.length) {
				return json;
			}
		} catch (err) {
			return null;
		}
	}
	return null;
}

function normalizePhraseList(list)
{
	var out = [];
	var seen = {};
	if (!list || !list.length) {
		return out;
	}
	for (var i = 0; i < list.length; i++) {
		var phrase = list[i];
		if (phrase === null || typeof phrase === "undefined") {
			continue;
		}
		phrase = phrase.toString().replace(/\s+/g, " ").trim();
		if (!phrase || seen[phrase]) {
			continue;
		}
		seen[phrase] = true;
		out.push(phrase);
	}
	return out;
}

function shuffleArrayInPlace(arr)
{
	for (var i = arr.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}
}

function rebuildCrimesPhraseOrder()
{
	crimesPhraseOrder = [];
	for (var i = 0; i < crimesPhrases.length; i++) {
		crimesPhraseOrder.push(i);
	}
	shuffleArrayInPlace(crimesPhraseOrder);
	if (crimesPhraseOrder.length > 1 && crimesLastPhrase) {
		var firstPhrase = crimesPhrases[crimesPhraseOrder[0]];
		if (firstPhrase === crimesLastPhrase) {
			var swapIndex = 1 + Math.floor(Math.random() * (crimesPhraseOrder.length - 1));
			var tmp = crimesPhraseOrder[0];
			crimesPhraseOrder[0] = crimesPhraseOrder[swapIndex];
			crimesPhraseOrder[swapIndex] = tmp;
		}
	}
	crimesPhraseCursor = 0;
}

function loadCrimesPhrases()
{
	var phrases = normalizePhraseList(getJSONArray(crimesSourceJSON));
	if (!phrases.length) {
		phrases = normalizePhraseList(getStringArraySpecial(crimesSourceTXT));
	}
	if (!phrases.length) {
		phrases = [DEFAULT_CRIMES_LINE];
	}
	crimesPhrases = phrases;
	crimesLastPhrase = "";
	rebuildCrimesPhraseOrder();
}

function getNextCrimesPhrase()
{
	if (!crimesPhrases.length) {
		return DEFAULT_CRIMES_LINE;
	}
	if (crimesPhraseCursor >= crimesPhraseOrder.length) {
		rebuildCrimesPhraseOrder();
	}
	var phrase = crimesPhrases[crimesPhraseOrder[crimesPhraseCursor]];
	crimesPhraseCursor += 1;
	crimesLastPhrase = phrase;
	return phrase;
}

function setCrimesLineText(text)
{
	var el = document.getElementById("crimesLine");
	if (!el) {
		return;
	}
	el.textContent = text || DEFAULT_CRIMES_LINE;
}

function applyValArray(nextVal)
{
	val = nextVal;
	cHSL = new Array(parseInt(val[1]),parseInt(val[2]),parseInt(val[3]));
	if (canvas) {
		canvas.style.backgroundColor = 'rgb('+cHSL[0]+','+cHSL[1]+','+cHSL[2]+')';
	}

	laserDensity = parseInt(val[4]);
	laserVertical = (val[5] === "true");
	laserSpeed = parseInt(val[6]);
	laserCspace = parseInt(val[7]);
	laserInterval = parseInt(val[36]);
	isSpray = (val[37] === "true");
	laserFont = val[8];
	laserSize = val[9];
	laserStyle=laserSize+" "+laserFont;
	lHSLA = new Array(parseInt(val[10]),parseInt(val[11]),parseInt(val[12]),parseInt(val[13]));
	laserColor = "rgba("+lHSLA[0]+","+lHSLA[1]+","+lHSLA[2]+","+lHSLA[3]+")";

	enemyTotal =parseInt(val[14]);
	enemyInterval =parseInt( val[15]);
	enemyVertical = (val[16] === "true");
	enemySpeedBase = parseInt(val[17]);
	enemySpeedVar = parseInt( val[18]);
	enemyCspace = parseInt( val[19]);
	enemyFont = val[20];
	enemySize = val[21];
	enemyStyle = enemySize +" "+enemyFont;
	eHSLA = new Array(parseInt(val[22]),parseInt(val[23]),parseInt(val[24]),parseInt(val[25]));
	enemyColor = "rgba("+eHSLA[0]+","+eHSLA[1]+","+eHSLA[2]+","+eHSLA[3]+")";

	fragmentFadeSpeed =parseInt(val[26]);
	fragmentSpeedBase = parseInt(val[27]);
	fragmentSpeedVar =parseInt(val[28]);
	fragments = [];
	fragmentSize = val[29];
	fragmentFont = val[30];
	fragmentStyle = fragmentSize+" "+fragmentFont;
	colorRate = parseInt(val[31]);
	fHSLA = new Array(parseInt(val[32]),parseInt(val[33]),parseInt(val[34]),parseInt(val[35]));
	fragmentColor = "rgba("+fHSLA[0]+","+fHSLA[1]+","+fHSLA[2]+","+fHSLA[3]+")";
}

function applySettingsObject(settingsObj)
{
	applyValArray(settingsToValArray(normalizeSettings(settingsObj)));
	updateValText();
}

function getCurrentSettings()
{
	return normalizeSettings({
		canvas: { r: cHSL[0], g: cHSL[1], b: cHSL[2] },
		laser: {
			density: laserDensity,
			vertical: laserVertical,
			speed: laserSpeed,
			spacing: laserCspace,
			font: laserFont,
			size: laserSize,
			color: { r: lHSLA[0], g: lHSLA[1], b: lHSLA[2], a: lHSLA[3] },
			interval: laserInterval,
			spray: !!isSpray
		},
		enemy: {
			total: enemyTotal,
			interval: enemyInterval,
			vertical: enemyVertical,
			baseSpeed: enemySpeedBase,
			speedVariation: enemySpeedVar,
			spacing: enemyCspace,
			font: enemyFont,
			size: enemySize,
			color: { r: eHSLA[0], g: eHSLA[1], b: eHSLA[2], a: eHSLA[3] }
		},
		fragment: {
			fadeSpeed: fragmentFadeSpeed,
			baseSpeed: fragmentSpeedBase,
			speedVariation: fragmentSpeedVar,
			size: fragmentSize,
			font: fragmentFont,
			colorRate: colorRate,
			color: { r: fHSLA[0], g: fHSLA[1], b: fHSLA[2], a: fHSLA[3] }
		}
	});
}

function resetVals (isOrigin)
{
	if (isOrigin) {
		applySettingsObject(getBuiltInDefaultSettings());
	} else {
		applySettingsObject(loadDefaultSettings());
	}
}

var val = settingsToValArray(loadDefaultSettings());
//console.log(val);
var cHSL = new Array(parseInt(val[1]),parseInt(val[2]),parseInt(val[3]));


//this feature was added later, that's why it's out of order.
var laserInterval = parseInt(val[36]);
var isSpray			= (val[37] === "true");
//range 1-15
var laserDensity = parseInt(val[4]);
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
var lasers = [];

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
var enemySource = "data/ABDBody.txt";
var maxLaIndex;
var maxFaIndex;

var curEnIndex = 0;
var curLaIndex = 0;
var curFaIndex = 0;
var enemyStreamLaneIndex = 0;
var enemySentenceLaneIndex = 0;
var enemySentenceLaneActive = false;
var laserSpawnCount = 0;
var currentAmendmentLabel = "Amendment I";
var currentAmendmentSentence = "";
var amendmentFirstSentenceByLabel = {};
var amendmentLabels = [];
var laserSource = "data/ABDQuotes.txt";
var fragmentSource ="data/ABDReferences.txt";

var DEFAULT_CRIMES_LINE = "Another Pedophile Set Free";
var crimesSourceJSON = "politician/institutional_corruption_phrases.json";
var crimesSourceTXT = "politician/institutional_corruption_phrases.txt";
var crimesPhrases = [];
var gamePaused = false;
var mouseCurDown = false;
var mouseOnCanvas = false;
var crimesPhraseOrder = [];
var crimesPhraseCursor = 0;
var crimesLastPhrase = "";
var crimesLineVisible = false;
var crimesLineOpacity = 1;
var crimesLineFadePerTick = 0.005;

var valueString = "empty";

window.onload = function() {
  init();  //example function call.
}
function clearCanvas() {
  ctx.clearRect(0,0,width,height);
}




function init() {
  canvas = document.getElementById('canvas');
canvas.style.backgroundColor = 'rgb('+cHSL[0]+','+cHSL[1]+','+cHSL[2]+')';
  ctx = canvas.getContext('2d');
  applyMobileContextMode();
  setInterfaceVisibility(interfaceVisible);
  updateCanvasSizeForViewport();
  window.addEventListener('resize', function () {
	applyMobileContextMode();
	updateCanvasSizeForViewport();
  }, false);
  if (window.visualViewport) {
	window.visualViewport.addEventListener('resize', updateCanvasSizeForViewport, false);
	window.visualViewport.addEventListener('scroll', updateCanvasSizeForViewport, false);
  }

  setInterval(gameLoop, 25);
  
    loadCrimesPhrases();

enemyTxt = getStringArray(enemySource);
  maxEnIndex = enemyTxt.length-1;
  laserTxt = getStringArray(laserSource);
  maxLaIndex = laserTxt.length-1;
  initializeCurrentAmendment();
  resetCrimesLine();
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
canvas.addEventListener('mousemove', function(evt) {
	mousePos = getMousePos(evt);
	mouseOnCanvas = true;
}, false);
canvas.addEventListener('mouseenter', mouseEnteredCanvas, false);
canvas.addEventListener('mouseleave', mouseLeftCanvas, false);
canvas.addEventListener('mousedown', mouseIsDown, false); 
canvas.addEventListener('mouseup', mouseIsUp, false); 
canvas.addEventListener('touchstart', touchIsDown, { passive: false });
canvas.addEventListener('touchmove', touchMove, { passive: false });
canvas.addEventListener('touchend', touchIsUp, { passive: false });
canvas.addEventListener('touchcancel', touchIsUp, { passive: false });

	ctx.textBaseline="middle";
	ctx.textAlign = "center";
	decorateControlLabels();

	updateValText();
	refreshPresetSelect();
	setSettingsStatus("Defaults loaded from settings/defaults.json", false);

}	  

function getNextElementOrBreak(node)
{
	var n = node.nextSibling;
	while (n) {
		if (n.nodeType === 1) {
			return n;
		}
		if (n.nodeType === 3 && n.nodeValue.trim() !== "") {
			return null;
		}
		n = n.nextSibling;
	}
	return null;
}

function decorateControlLabels()
{
	var panel = document.getElementById('container');
	if (!panel) {
		return;
	}

	var walker = document.createTreeWalker(panel, NodeFilter.SHOW_TEXT, null, false);
	var nodes = [];
	var node;
	while ((node = walker.nextNode())) {
		nodes.push(node);
	}

	for (var i = 0; i < nodes.length; i++) {
		var textNode = nodes[i];
		var raw = textNode.nodeValue;
		if (!raw || !raw.trim()) {
			continue;
		}
		var parent = textNode.parentNode;
		if (!parent || parent.nodeType !== 1) {
			continue;
		}
		if (parent.classList && parent.classList.contains('control-label')) {
			continue;
		}
		if (/^(H1|H2|OPTION|BUTTON|CODE|SPAN|SELECT|TEXTAREA)$/i.test(parent.nodeName)) {
			continue;
		}

		var first = getNextElementOrBreak(textNode);
		var target = first;
		if (first && first.nodeName === "BR") {
			target = getNextElementOrBreak(first);
		}
		if (!target || !/^(INPUT|SELECT)$/i.test(target.nodeName)) {
			continue;
		}

		var labelText = raw.replace(/\s+/g, ' ').trim();
		if (!labelText || labelText.length < 2) {
			continue;
		}
		// Avoid wrapping content paragraphs.
		if (labelText.length > 90) {
			continue;
		}

		var span = document.createElement('span');
		span.className = 'control-label';
		span.textContent = labelText;
		parent.replaceChild(span, textNode);
		parent.insertBefore(document.createTextNode(' '), span.nextSibling);
	}
}
//spawn enemies regularly
setTimeout(spawnEnemy, getEnemySpawnDelay());


var notBeingSprayed = true;
var laserOriginMode = "s";
var tiltControlListening = false;
var tiltPermissionRequested = false;
var tiltLastGamma = null;
var tiltFilteredGamma = null;
var tiltBaselineGamma = null;

function setLaserOriginMode(mode)
{
	if (mode !== "a" && mode !== "s" && mode !== "d") {
		return;
	}
	laserOriginMode = mode;
	originX = getLaserOriginX();
}

function getEffectiveTiltGamma(evt)
{
	if (!evt) {
		return null;
	}
	var gamma = (typeof evt.gamma === "number") ? evt.gamma : null;
	var beta = (typeof evt.beta === "number") ? evt.beta : null;
	if (gamma === null && beta === null) {
		return null;
	}
	var angle = 0;
	if (window.screen && window.screen.orientation && typeof window.screen.orientation.angle === "number") {
		angle = window.screen.orientation.angle;
	} else if (typeof window.orientation === "number") {
		angle = window.orientation;
	}
	angle = ((angle % 360) + 360) % 360;

	// Portrait: gamma tracks left-right tilt. Landscape: beta maps better.
	if ((angle === 90 || angle === 270) && beta !== null) {
		return angle === 90 ? beta : -beta;
	}
	return gamma !== null ? gamma : beta;
}

function tiltDeltaToOriginMode(delta)
{
	if (delta === null || typeof delta !== "number") {
		return "s";
	}
	if (delta <= -8) {
		return "a";
	}
	if (delta >= 8) {
		return "d";
	}
	return "s";
}

function recenterTiltBaseline()
{
	if (typeof tiltLastGamma !== "number") {
		return;
	}
	tiltBaselineGamma = tiltLastGamma;
	tiltFilteredGamma = tiltLastGamma;
	setLaserOriginMode("s");
}

function onDeviceOrientation(evt)
{
	if (!mobileContext || !evt) {
		return;
	}
	var gamma = getEffectiveTiltGamma(evt);
	if (gamma === null) {
		return;
	}
	tiltLastGamma = gamma;
	if (tiltBaselineGamma === null) {
		tiltBaselineGamma = gamma;
		tiltFilteredGamma = gamma;
	}
	if (tiltFilteredGamma === null) {
		tiltFilteredGamma = gamma;
	} else {
		tiltFilteredGamma = (tiltFilteredGamma * 0.8) + (gamma * 0.2);
	}
	var delta = tiltFilteredGamma - tiltBaselineGamma;
	setLaserOriginMode(tiltDeltaToOriginMode(delta));
}

function startTiltControl()
{
	if (tiltControlListening || !window.DeviceOrientationEvent) {
		return;
	}
	window.addEventListener("deviceorientation", onDeviceOrientation, true);
	tiltControlListening = true;
}

function maybeEnableTiltControl()
{
	if (!mobileContext || !window.DeviceOrientationEvent) {
		return;
	}
	if (typeof DeviceOrientationEvent.requestPermission === "function") {
		// iOS requires a user gesture; request from first touch event.
		if (tiltPermissionRequested) {
			return;
		}
		tiltPermissionRequested = true;
		DeviceOrientationEvent.requestPermission()
			.then(function(permissionState) {
				if (permissionState === "granted") {
					startTiltControl();
				}
			})
			.catch(function() {
				// Keep existing touch controls if permission is denied.
			});
		return;
	}
	startTiltControl();
}

function getLaserOriginX()
{
	if (laserOriginMode === "a") {
		return canvas.width * 0.125;
	}
	if (laserOriginMode === "d") {
		return canvas.width * 0.875;
	}
	return canvas.width * 0.5;
}

function normalizeTokenForAmendment(token)
{
	if (!token) {
		return "";
	}
	return token.toString().replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+/g, "");
}

function isRomanNumeralToken(token)
{
	return /^[IVXLCDM]+$/i.test(token);
}

function extractAmendmentLabel(textLine, prevToken, nextToken)
{
	if (!textLine) {
		return null;
	}

	var match = textLine.match(/^\s*(Amendment\s+[IVXLCDM]+)/i);
	if (match) {
		return match[1].replace(/\s+/g, " ").trim();
	}

	var current = normalizeTokenForAmendment(textLine);
	var prev = normalizeTokenForAmendment(prevToken);
	var next = normalizeTokenForAmendment(nextToken);

	if (/^amendment$/i.test(current) && isRomanNumeralToken(next)) {
		return "Amendment " + next.toUpperCase();
	}

	if (/^amendment$/i.test(prev) && isRomanNumeralToken(current)) {
		return "Amendment " + current.toUpperCase();
	}

	return null;
}

function updateCurrentAmendmentDisplay()
{
	var labelEl = document.getElementById("currentAmendment");
	if (labelEl) {
		labelEl.textContent = currentAmendmentLabel;
	}
	currentAmendmentSentence = amendmentFirstSentenceByLabel[currentAmendmentLabel] || "";
	var sentenceEl = document.getElementById("amendmentSentence");
	if (sentenceEl) {
		sentenceEl.textContent = currentAmendmentSentence;
	}
}

function appendSentenceToken(curSentence, token)
{
	if (!token && token !== 0) {
		return curSentence;
	}
	var t = token.toString().trim();
	if (!t) {
		return curSentence;
	}
	if (!curSentence) {
		return t;
	}
	if (/^[,.;:!?)\]]/.test(t)) {
		return curSentence + t;
	}
	return curSentence + " " + t;
}

function extractFirstSentenceFromWordIndex(startIndex)
{
	var sentence = "";
	for (var i = startIndex; i < laserTxt.length; i++) {
		var raw = laserTxt[i];
		var norm = normalizeTokenForAmendment(raw);
		var nextNorm = normalizeTokenForAmendment(laserTxt[i + 1]);

		if (sentence && /^amendment$/i.test(norm) && isRomanNumeralToken(nextNorm)) {
			break;
		}

		if (!sentence) {
			if (/^section$/i.test(norm) || /^\d+$/.test(norm)) {
				continue;
			}
			if (/^[,.;:!?()\[\]]+$/.test((raw || "").toString().trim())) {
				continue;
			}
		}

		sentence = appendSentenceToken(sentence, raw);
		if (/[.!?]["')\]]*$/.test((raw || "").toString().trim())) {
			break;
		}
	}
	return sentence.replace(/\s+/g, " ").trim();
}

function buildAmendmentSentenceMap()
{
	amendmentFirstSentenceByLabel = {};
	amendmentLabels = [];
	for (var i = 0; i < laserTxt.length - 1; i++) {
		var current = normalizeTokenForAmendment(laserTxt[i]);
		var next = normalizeTokenForAmendment(laserTxt[i + 1]);
		if (/^amendment$/i.test(current) && isRomanNumeralToken(next)) {
			var label = "Amendment " + next.toUpperCase();
			if (!amendmentFirstSentenceByLabel[label]) {
				amendmentFirstSentenceByLabel[label] = extractFirstSentenceFromWordIndex(i + 2);
				amendmentLabels.push(label);
			}
		}
	}
}

function getAmendmentLabelIndex(label)
{
	for (var i = 0; i < amendmentLabels.length; i++) {
		if (amendmentLabels[i] === label) {
			return i;
		}
	}
	return -1;
}

function getRandomAmendmentLabel()
{
	if (!amendmentLabels.length) {
		return currentAmendmentLabel || "Amendment I";
	}

	if (amendmentLabels.length === 1) {
		return amendmentLabels[0];
	}

	var currentIndex = getAmendmentLabelIndex(currentAmendmentLabel);
	var nextSequentialIndex = (currentIndex >= 0) ? ((currentIndex + 1) % amendmentLabels.length) : -1;
	var candidates = [];
	for (var i = 0; i < amendmentLabels.length; i++) {
		if (amendmentLabels[i] === currentAmendmentLabel) {
			continue;
		}
		if (i === nextSequentialIndex) {
			continue;
		}
		candidates.push(amendmentLabels[i]);
	}

	if (!candidates.length) {
		for (var j = 0; j < amendmentLabels.length; j++) {
			if (amendmentLabels[j] !== currentAmendmentLabel) {
				candidates.push(amendmentLabels[j]);
			}
		}
	}

	return candidates[Math.floor(Math.random() * candidates.length)];
}
function showCrimesLine()
{
	var el = document.getElementById("crimesLine");
	if (!el) {
		return;
	}
	setCrimesLineText(getNextCrimesPhrase());
	crimesLineVisible = true;
	crimesLineOpacity = 1;
	el.style.display = "block";
	el.style.opacity = "1";
}

function resetCrimesLine()
{
	crimesLineVisible = false;
	crimesLineOpacity = 1;
	var el = document.getElementById("crimesLine");
	if (!el) {
		return;
	}
	setCrimesLineText(DEFAULT_CRIMES_LINE);
	el.style.opacity = "1";
	el.style.display = "block";
}

function updateCrimesLineFade()
{
	if (!crimesLineVisible) {
		return;
	}
	var el = document.getElementById("crimesLine");
	if (!el) {
		return;
	}
	crimesLineOpacity -= crimesLineFadePerTick;
	if (crimesLineOpacity < 0) {
		crimesLineOpacity = 0;
	}
	el.style.opacity = crimesLineOpacity.toFixed(3);
}
function initializeCurrentAmendment()
{
	buildAmendmentSentenceMap();
	currentAmendmentLabel = getRandomAmendmentLabel();
	updateCurrentAmendmentDisplay();
}

function getRandomEnemyTargetX()
{
	var lanes = [canvas.width * 0.125, canvas.width * 0.5, canvas.width * 0.875];
	var lane = lanes[Math.floor(Math.random() * lanes.length)];
	var jitter = (Math.random() - 0.5) * (canvas.width * 0.088);
	var target = lane + jitter;
	if (target < 0) {
		target = 0;
	}
	if (target > canvas.width) {
		target = canvas.width;
	}
	return target;
}

function canSpawnEnemyInLane(laneX, minGapY)
{
	return true;
}

function isEnemySentenceEndToken(token)
{
	if (!token) {
		return false;
	}
	var t = token.toString().trim();
	return /[.!?]["')\]]*$/.test(t);
}

function getEnemySpawnDelay()
{
	// Enemy stream cadence is controlled only by spawn delay.
	return Math.max(10, Math.floor(enemyInterval * 0.6));
}

function gameLoop() {
	updateCanvasSizeForViewport();
				//document.getElementById("fLig").innerHTML=" "+fragmentVal;

  clearCanvas();
  if(!gamePaused)
  {
  moveLaser();
  moveEnemy();
  moveFragments();
  updateCrimesLineFade();
  }
  drawLaser();
  drawEnemy();
  drawFragments();
  checkCollision();

}



function sprayLaser ()
{
	if (mouseCurDown && isSpray && !gamePaused){
	spawnLaser();
	setTimeout(sprayLaser, laserInterval);
	//console.log("Being pressed HERE!");
	}
}

function mouseIsDown(evt) {
mouseCurDown = true;
mousePos = getMousePos(evt);
mouseOnCanvas = true;

if(gamePaused)
{
	return;
}

if(isSpray)
{
	if(notBeingSprayed)
	{
		spawnLaser();
		setTimeout(sprayLaser, laserInterval);
		notBeingSprayed = false;
	}
}
else
{
	// Single click should always emit exactly one word when spray is off.
	spawnLaser();
}
}
function mouseIsUp() {
mouseCurDown = false;
notBeingSprayed = true;
////console.log(mouseCurDown);
}

function getPrimaryTouchPoint(evt) {
	if (evt.touches && evt.touches.length) {
		return evt.touches[0];
	}
	if (evt.changedTouches && evt.changedTouches.length) {
		return evt.changedTouches[0];
	}
	return null;
}

function touchIsDown(evt) {
	maybeEnableTiltControl();
	evt.preventDefault();
	var touch = getPrimaryTouchPoint(evt);
	if (!touch) {
		return;
	}
	if (mobileContext) {
		recenterTiltBaseline();
	}
	mouseIsDown(touch);
}

function touchMove(evt) {
	evt.preventDefault();
	var touch = getPrimaryTouchPoint(evt);
	if (!touch) {
		return;
	}
	mousePos = getMousePos(touch);
	mouseOnCanvas = true;
}

function touchIsUp(evt) {
	evt.preventDefault();
	mouseIsUp();
}

function mouseEnteredCanvas(evt) {
	mouseOnCanvas = true;
	if (evt) {
		mousePos = getMousePos(evt);
	}
}

function mouseLeftCanvas() {
	mouseOnCanvas = false;
	// Stop continuous fire immediately once the pointer leaves the canvas.
	mouseCurDown = false;
	notBeingSprayed = true;
}
//get mouse position
function getMousePos(evt) {
var rect = canvas.getBoundingClientRect();
var scaleX = canvas.width / rect.width;
var scaleY = canvas.height / rect.height;
return {
  x: (evt.clientX - rect.left) * scaleX,
  y: (evt.clientY - rect.top) * scaleY
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
	var laserWord = (laser && laser.length) ? laser : "";
	var enemyWord = (enemy && enemy.length) ? enemy : "";

	// Fallback only if both inputs are empty.
	if (!laserWord && !enemyWord) {
		laserWord = fragmentTxt[curFaIndex];
		curFaIndex ++;
		if (curFaIndex > maxFaIndex)
		{
			curFaIndex = 0;
		}
	}

	var laserChar = characterArray(laserWord, "laser", originX, originY);
	var enemyChar = characterArray(enemyWord, "enemy", originX, originY);
	
	for (var i=0; i<laserChar.length;i++)
	{
		fragments.push([laserChar[i][0],laserChar[i][1],laserChar[i][2],laserChar[i][3],laserChar[i][4],laserChar[i][5],laserChar[i][6],laserChar[i][7],laserChar[i][8],laserChar[i][9],laserChar[i][10],laserChar[i][11],laserChar[i][12]]);
	}
	for (var j=0; j<enemyChar.length;j++)
	{
		fragments.push([enemyChar[j][0],enemyChar[j][1],enemyChar[j][2],enemyChar[j][3],enemyChar[j][4],enemyChar[j][5],enemyChar[j][6],enemyChar[j][7],enemyChar[j][8],enemyChar[j][9],enemyChar[j][10],enemyChar[j][11],enemyChar[j][12]]);
	}
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
  if (!mouseOnCanvas || !mousePos) {
	return;
  }

  if(lasers.length < laserDensity)
  {
	laserSpawnCount += 1;
	var launchX = getLaserOriginX();
	//get vector of direction towards mouse
	var vectorX = mousePos.x - launchX;
	var vectorY = mousePos.y - originY;

	//normalise vector before storing its value
	var vMag = Math.sqrt(vectorX*vectorX + vectorY*vectorY);
	if (!vMag) {
		return;
	}
	vectorX /= vMag;
	vectorY /= vMag;

	//get the word for that vector
	var laserWord = laserTxt [curLaIndex];
	var amendmentLabel = extractAmendmentLabel(laserWord, laserTxt[curLaIndex - 1], laserTxt[curLaIndex + 1]);
	var isAmendmentHeadingToken = /^amendment$/i.test(normalizeTokenForAmendment(laserWord));
	if (amendmentLabels.length && amendmentLabel && isAmendmentHeadingToken) {
		currentAmendmentLabel = getRandomAmendmentLabel();
		updateCurrentAmendmentDisplay();
	}
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

	// Color cadence:
	// every 10th laser -> blue
	// every 5th (non-10th) -> red
	// otherwise -> default laser color
	var laserColorForShot = laserColor;
	if (laserSpawnCount % 10 === 0) {
		laserColorForShot = "rgba(0,102,255,1)";
	} else if (laserSpawnCount % 5 === 0) {
		laserColorForShot = "rgba(255,0,0,1)";
	}
	
	//add laser to laser array
	/////////////origin coords, vector coords, speed, word
	//Lasers [0]originX[1]originY[2]vectorX[3]vectorY[4]speed[5]word[6]width[7]height[8]angle[9]color
	lasers.push([launchX, originY, vectorX,vectorY, laserSpeed, laserWord, wordWidth, wordHeight/2,0,laserColorForShot]);
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
	//[9]color
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
		ctx.fillStyle = lasers[i][9] || laserColor;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		
		if(laserVertical)
		{	
			var tempWord = lasers[i][5].split("");
			// Center the full character chain around the laser origin.
			var centerOffset = ((tempWord.length - 1) * laserCspace) / 2;
			var tempX = -centerOffset * lasers[i][2];
			var tempY = -centerOffset * lasers[i][3];
			
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
		if (!enemyWord) {
			enemyWord = "";
		}
		
			// Enemy lasers stream from fixed lanes at the top (non-random flow).
			var lanes = [canvas.width * 0.125, canvas.width * 0.5, canvas.width * 0.875];
			if (!enemySentenceLaneActive) {
				enemyStreamLaneIndex = enemySentenceLaneIndex % lanes.length;
				enemySentenceLaneActive = true;
			}
			var startX = lanes[enemyStreamLaneIndex % lanes.length];
			// Stream-like downward motion with fixed speed for regular spacing.
			var speed = Math.max(1, enemySpeedBase);
			var targetX = startX;
		var vx = 0;
		var vy = Math.max(1, speed * 1.15);
		var ax = 0;
		var ay = 0;
	
	//get bounding box by putting word in invisible div and measuring it
		document.getElementById("Test").innerHTML=enemyWord;
		var divGuide = document.getElementById("Test");
			divGuide.style.font = enemyStyle;
			var wordWidth = (divGuide.clientWidth + 1);
			var wordHeight = (divGuide.clientHeight +1 );
			
			curEnIndex ++;
			if (curEnIndex > maxEnIndex)
			{
			curEnIndex = 0;
			}
			if (isEnemySentenceEndToken(enemyWord)) {
				enemySentenceLaneActive = false;
				enemySentenceLaneIndex += 1;
			}
		
		if(speed <= 0)
		{
	speed = 1;
	}
	// enemies:
	// [0]x [1]y [2]speed [3]word [4]width [5]height [6]vx [7]vy [8]ax [9]ay [10]targetX
	enemies.push([startX,-50, speed, enemyWord, wordWidth, wordHeight/2, vx, vy, ax, ay, targetX, false]);

	//prints in firebug
	//console.log("add enemy", enemyWord, enemies.length);
}

setTimeout(spawnEnemy, getEnemySpawnDelay());
}  

function moveEnemy()
{

	// enemies:
	// [0]x [1]y [2]speed [3]word [4]width [5]height [6]vx [7]vy [8]ax [9]ay [10]targetX
	if (enemies.length)
    for (var i = 0; i < enemies.length; i++) 
	{
		// Backward-compatible fallback for any legacy enemy entries.
		if (typeof enemies[i][6] === "undefined") {
			enemies[i][6] = 0;
			enemies[i][7] = enemies[i][2];
			enemies[i][8] = 0;
			enemies[i][9] = 0.015;
			enemies[i][11] = false;
		}

		enemies[i][6] += enemies[i][8];
		enemies[i][7] += enemies[i][9];
		enemies[i][0] += enemies[i][6];
		enemies[i][1] += enemies[i][7];

		if (!enemies[i][11] && enemies[i][1] >= canvas.height)
		{
			showCrimesLine();
			enemies[i][11] = true;
		}

		if (enemies[i][1] > canvas.height + 250 || enemies[i][0] < -250 || enemies[i][0] > canvas.width + 250)
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
		var shadowR = eHSLA[0];
		var shadowG = eHSLA[1];
		var shadowB = eHSLA[2];
		var shadowTrail = 8;
		var vx = enemies[i][6] || 0;
		var vy = enemies[i][7] || enemies[i][2] || 1;
		var vMag = Math.sqrt(vx*vx + vy*vy);
		if (vMag < 0.001) {
			vMag = 1;
		}
		var tx = -vx / vMag;
		var ty = -vy / vMag;
		var flickerBase = (Date.now() * 0.02) + (i * 1.7);
		ctx.fillStyle =enemyColor;
		
		// Motion-mark trail rendering is temporarily disabled.
		/*
		// Draw subtle trailing copies opposite motion direction (motion-blur style).
		for (var t = shadowTrail; t >= 1; t--) {
			var alpha = 0.08 * (shadowTrail - t + 1);
			var flicker = 0.82 + 0.28 * Math.sin(flickerBase + t * 0.9);
			alpha *= flicker;
			if (alpha < 0.02) {
				alpha = 0.02;
			}
			var trailX = tx * t * 5;
			var trailY = ty * t * 5;
			ctx.fillStyle ="rgba("+shadowR+","+shadowG+","+shadowB+","+alpha+")";
			if(enemyVertical)
			{
				var tempShadowWord = enemies[i][3].split("");
				var tempShadowX = trailX;
				var tempShadowY = trailY;
				
				for (var cs=0; cs<tempShadowWord.length; cs++)
				{
					ctx.fillText(tempShadowWord[cs], tempShadowX, tempShadowY);
					tempShadowY += enemyCspace;
				}
			}
			else
			{
				ctx.fillText(enemies[i][3], trailX, trailY);
			}
		}
		*/
		
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

var interfaceVisible = true;
var mobileContext = false;

function detectMobileContext()
{
	var ua = navigator.userAgent || "";
	var uaMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
	var coarsePointer = !!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
	var touchPoints = (navigator.maxTouchPoints || 0) > 1;
	return uaMobile || coarsePointer || touchPoints;
}

function applyMobileContextMode()
{
	mobileContext = detectMobileContext();
	if (document.body) {
		document.body.classList.toggle("mobile-context", mobileContext);
	}
	if (mobileContext) {
		setInterfaceVisibility(false);
		maybeEnableTiltControl();
	}
}

function setInterfaceVisibility(visible)
{
	var container = document.getElementById('container');
	interfaceVisible = !!visible;
	if (container) {
		container.style.display = interfaceVisible ? "block" : "none";
	}
	if (document.body) {
		document.body.classList.toggle("panel-hidden", !interfaceVisible);
	}
}

function updateCanvasWidthForLayout()
{
	if (!canvas) {
		return;
	}
	var compactLayout = mobileContext || window.innerWidth <= 900;
	var reserved = compactLayout ? 24 : (interfaceVisible ? 305 : 24);
	var target = Math.floor(window.innerWidth - reserved);
	if (target < 320) {
		target = 320;
	}
	canvas.width = target;
	width = canvas.width;
}

function getElementOuterHeight(id)
{
	var el = document.getElementById(id);
	if (!el) {
		return 0;
	}
	var style = window.getComputedStyle(el);
	if (style.display === "none" || style.visibility === "hidden") {
		return 0;
	}
	var mt = parseFloat(style.marginTop) || 0;
	var mb = parseFloat(style.marginBottom) || 0;
	return el.offsetHeight + mt + mb;
}

function updateCanvasSizeForViewport()
{
	if (!canvas) {
		return;
	}
	updateCanvasWidthForLayout();

	var viewportHeight = window.innerHeight;
	if (window.visualViewport && window.visualViewport.height) {
		viewportHeight = Math.floor(window.visualViewport.height);
	}
	var mobileBottomInset = 0;
	if (mobileContext) {
		mobileBottomInset = Math.max(16, window.innerHeight - viewportHeight);
	}

	// Keep title/canvas/amendment/crime text visible on startup.
	var reserved = 24
		+ getElementOuterHeight("header")
		+ getElementOuterHeight("currentAmendment")
		+ getElementOuterHeight("amendmentSentence")
		+ getElementOuterHeight("crimesLine")
		+ 18
		+ mobileBottomInset;
	var target = Math.floor(viewportHeight - reserved);
	if (target < 260) {
		target = 260;
	}
	canvas.height = target;
	height = canvas.height;
	originY = canvas.height + 20;
	originX = getLaserOriginX();
}

function keyDown(e) {
          //e.preventDefault();
      var evtobj = window.event? event : e
	  
		  //option+h
			  if (evtobj.keyCode == 72 && evtobj.altKey && !interfacePressed)
			  {
				if (!mobileContext) {
					setInterfaceVisibility(!interfaceVisible);
				}
				updateCanvasSizeForViewport();
		  interfacePressed=true;
		  }

	  switch(evtobj.keyCode)
	  {
	  //M/N change number of lasers
		case 77: //m
			laserDensity += 1;
		break;
		
		case 78: //n
			if (laserDensity >1)
			laserDensity -= 1;
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
	  //a/s/d select laser launch origin (left / center / right)
		case 65: //a
			setLaserOriginMode("a");
		break;
		case 83: //s
			setLaserOriginMode("s");
		break;
		case 68: //d
			setLaserOriginMode("d");
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

  //release option+h latch
  if (e.keyCode == 72)
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
	var request = getHTTPObject();
	var wordArray = [];
	if (request) {
		try {
			request.open("GET", curFile, false);
			request.send(null);
			if (request.status >= 200 && request.status < 300 && request.responseText) {
				wordArray = request.responseText.split(/[\s ]+/);
			}
			if (wordArray.length > 0) {
				return wordArray;
			}
		} catch (err) {
			// fall back to embedded text below
		}
	}

	if (localText !== null) {
		return localText.split(/[\s ]+/);
	}

	return wordArray;

}
//create the current string array
function getStringArraySpecial(curFile)
{
	var localText = getLocalText(curFile);
	var request = getHTTPObject();
	var wordArray = [];
	if (request) {
		try {
			request.open("GET", curFile, false);
			request.send(null);
			if (request.status >= 200 && request.status < 300 && request.responseText) {
				wordArray = request.responseText.split(/[\n\r]+/);
			}
			if (wordArray.length > 0) {
				return wordArray;
			}
		} catch (err) {
			// fall back to embedded text below
		}
	}

	if (localText !== null) {
		return localText.split(/[\n\r]+/);
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
		laserDensity= laserVal;
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
	document.getElementById("lTotal").innerHTML=" "+laserDensity;
	document.getElementById("lHue").innerHTML=" "+lHSLA[0];
	document.getElementById("lSat").innerHTML=" "+lHSLA[1];
	document.getElementById("lLig").innerHTML=" "+lHSLA[2];
	document.getElementById("laInterval").value = laserInterval;
	document.getElementById("laTInterval").value = laserInterval;
	document.getElementById("laSpacing").value = laserCspace;
	document.getElementById("laTSpacing").value = laserCspace;
	document.getElementById("laSize").value = parseInt(laserSize, 10);
	document.getElementById("laTSize").value = parseInt(laserSize, 10);
	document.getElementById("laSpeed").value = laserSpeed;
	document.getElementById("laTSpeed").value = laserSpeed;
	document.getElementById("laTotal").value = laserDensity;
	document.getElementById("laTTotal").value = laserDensity;
	document.getElementById("laHue").value = lHSLA[0];
	document.getElementById("laTHue").value = lHSLA[0];
	document.getElementById("laSat").value = lHSLA[1];
	document.getElementById("laTSat").value = lHSLA[1];
	document.getElementById("laLig").value = lHSLA[2];
	document.getElementById("laTLig").value = lHSLA[2];
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
	document.getElementById("enSpacing").value = enemyCspace;
	document.getElementById("enTSpacing").value = enemyCspace;
	document.getElementById("enInterval").value = enemyInterval;
	document.getElementById("enTInterval").value = enemyInterval;
	document.getElementById("enSize").value = parseInt(enemySize, 10);
	document.getElementById("enTSize").value = parseInt(enemySize, 10);
	document.getElementById("enBSpeed").value = enemySpeedBase;
	document.getElementById("enTBSpeed").value = enemySpeedBase;
	document.getElementById("enSpeed").value = enemySpeedVar;
	document.getElementById("enTSpeed").value = enemySpeedVar;
	document.getElementById("enTotal").value = enemyTotal;
	document.getElementById("enTTotal").value = enemyTotal;
	document.getElementById("enHue").value = eHSLA[0];
	document.getElementById("enTHue").value = eHSLA[0];
	document.getElementById("enSat").value = eHSLA[1];
	document.getElementById("enTSat").value = eHSLA[1];
	document.getElementById("enLig").value = eHSLA[2];
	document.getElementById("enTLig").value = eHSLA[2];
	
	
	//FRAGMENT
	document.getElementById("fSpeed").innerHTML=" "+fragmentSpeedVar;
	document.getElementById("fBSpeed").innerHTML=" "+fragmentSpeedBase;
	document.getElementById("fSize").innerHTML=" "+fragmentSize;
	document.getElementById("fFade").innerHTML=" "+fragmentFadeSpeed;
	document.getElementById("fHue").innerHTML=" "+fHSLA[0];
	document.getElementById("fSat").innerHTML=" "+fHSLA[1];
	document.getElementById("fLig").innerHTML=" "+fHSLA[2];
	document.getElementById("fRate").innerHTML=" "+(colorRate/2);
	document.getElementById("frSize").value = parseInt(fragmentSize, 10);
	document.getElementById("frTSize").value = parseInt(fragmentSize, 10);
	document.getElementById("frFade").value = fragmentFadeSpeed;
	document.getElementById("frTFade").value = fragmentFadeSpeed;
	document.getElementById("frBSpeed").value = fragmentSpeedBase;
	document.getElementById("frTBSpeed").value = fragmentSpeedBase;
	document.getElementById("frSpeed").value = fragmentSpeedVar;
	document.getElementById("frTSpeed").value = fragmentSpeedVar;
	document.getElementById("frHue").value = fHSLA[0];
	document.getElementById("frTHue").value = fHSLA[0];
	document.getElementById("frSat").value = fHSLA[1];
	document.getElementById("frTSat").value = fHSLA[1];
	document.getElementById("frLig").value = fHSLA[2];
	document.getElementById("frTLig").value = fHSLA[2];
	document.getElementById("frRate").value = colorRate * 2;
	document.getElementById("frTRate").value = colorRate * 2;

	//CANVAS
	document.getElementById("cHue").innerHTML=" "+cHSL[0];
	document.getElementById("cSat").innerHTML=" "+cHSL[1];
	document.getElementById("cLig").innerHTML=" "+cHSL[2];
	document.getElementById("caHue").value = cHSL[0];
	document.getElementById("caTHue").value = cHSL[0];
	document.getElementById("caSat").value = cHSL[1];
	document.getElementById("caTSat").value = cHSL[1];
	document.getElementById("caLig").value = cHSL[2];
	document.getElementById("caTLig").value = cHSL[2];
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
		document.getElementById("cLog").innerHTML='<h2>Laser Options</h2>laserStyle = '+laserStyle+'</BR> laserVertical ='+laserVertical+'</BR> laserSpray = '+isSpray+'</BR> laser Spray Speed = '+laserInterval+'</BR>laserCspace = '+laserCspace+'</BR> laserSpeed = '+laserSpeed+'</BR> laserDensity = '+laserDensity+'</BR> laserColor = '+laserColor+'</BR><h2>Enemy Options</h2> enemyStyle = '+enemyStyle+'</BR> enemyVertical= '+enemyVertical+'</BR> enemyCspace = '+enemyCspace+'</BR> enemySpeedBase = '+enemySpeedBase+'</BR> enemySpeedVar = '+enemySpeedVar+'</BR> ememyTotal = '+enemyTotal+'</BR> enemyColor = '+enemyColor+'</BR> enemyInterval = '+enemyInterval+'<h2> Explosion Options</h2> fragmentStyle = '+fragmentStyle+'</BR> fragmentSpeedBase = '+fragmentSpeedBase+'</BR> fragmentSpeedVar = '+fragmentSpeedVar+'</BR> fragmentColor = '+fragmentColor+'</BR> color change rate = '+colorRate+'<h2>Canvas Options</h2> canvasColor = hsl('+cHSL[0]+','+cHSL[1]+'%,'+cHSL[2]+'%)';
		
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
	laserDensity.toString()+"***"+laserVertical+"***"+laserSpeed.toString()+"***"+laserCspace.toString()+"***"+laserFont+"***"+laserSize+"***"+lHSLA[0].toString()+"***"+lHSLA[1].toString()+"***"+lHSLA[2].toString()+"***"+lHSLA[3].toString()+"***"+
	enemyTotal.toString()+"***"+enemyInterval.toString()+"***"+enemyVertical+"***"+enemySpeedBase.toString()+"***"+enemySpeedVar.toString()+"***"+enemyCspace.toString()+"***"+enemyFont+"***"+enemySize+"***"+eHSLA[0].toString()+"***"+eHSLA[1].toString()+"***"+eHSLA[2].toString()+"***"+eHSLA[3].toString()+"***"+
	fragmentFadeSpeed.toString()+"***"+fragmentSpeedBase.toString()+"***"+fragmentSpeedVar.toString()+"***"+fragmentSize+"***"+fragmentFont+"***"+colorRate.toString()+"***"+fHSLA[0].toString()+"***"+fHSLA[1].toString()+"***"+fHSLA[2].toString()+"***"+fHSLA[3].toString()+"***"+laserInterval.toString()+"***"+isSpray.toString()+"***"+document.getElementById("noteStringArea").value+"***"+"  ";

	document.getElementById("valStringArea").value= valueString;
	//var divGuide = document.getElementById("Test");
}

function getPresetMap()
{
	try {
		var raw = localStorage.getItem(PRESET_STORAGE_KEY);
		if (!raw) {
			return {};
		}
		var parsed = JSON.parse(raw);
		return parsed && typeof parsed === "object" ? parsed : {};
	} catch (err) {
		return {};
	}
}

function savePresetMap(presetMap)
{
	localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(presetMap));
}

function setSettingsStatus(message, isError)
{
	var statusEl = document.getElementById("settingsStatus");
	if (!statusEl) {
		return;
	}
	statusEl.style.color = isError ? "#fda4af" : "#93c5fd";
	statusEl.textContent = message;
}

function refreshPresetSelect()
{
	var select = document.getElementById("settingsPresetList");
	if (!select) {
		return;
	}
	var presets = getPresetMap();
	var names = Object.keys(presets).sort();
	select.innerHTML = "";
	for (var i = 0; i < names.length; i++) {
		var option = document.createElement("option");
		option.value = names[i];
		option.textContent = names[i];
		select.appendChild(option);
	}
	if (names.length > 0) {
		select.selectedIndex = 0;
	}
}

function saveNamedPreset()
{
	var input = document.getElementById("settingsPresetName");
	if (!input) {
		return;
	}
	var name = input.value.trim();
	if (!name) {
		setSettingsStatus("Preset name is required.", true);
		return;
	}
	var presets = getPresetMap();
	presets[name] = getCurrentSettings();
	savePresetMap(presets);
	refreshPresetSelect();
	document.getElementById("settingsPresetList").value = name;
	setSettingsStatus("Saved preset: " + name, false);
}

function loadSelectedPreset()
{
	var select = document.getElementById("settingsPresetList");
	if (!select || !select.value) {
		setSettingsStatus("Select a preset to load.", true);
		return;
	}
	var presets = getPresetMap();
	if (!presets[select.value]) {
		setSettingsStatus("Preset not found.", true);
		return;
	}
	applySettingsObject(presets[select.value]);
	setSettingsStatus("Loaded preset: " + select.value, false);
}

function deleteSelectedPreset()
{
	var select = document.getElementById("settingsPresetList");
	if (!select || !select.value) {
		setSettingsStatus("Select a preset to delete.", true);
		return;
	}
	var presets = getPresetMap();
	delete presets[select.value];
	savePresetMap(presets);
	refreshPresetSelect();
	setSettingsStatus("Deleted preset.", false);
}

function loadDefaultSettingsFromFile()
{
	applySettingsObject(loadDefaultSettings());
	setSettingsStatus("Reloaded defaults from settings/defaults.json", false);
}
