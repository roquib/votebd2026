// Copyright 2003 Eddie Traversa
// http://www.dhtmlnirvana.com/
// free to use as long as this copyright notice stays intact
var tags = new Array( 'div','td','tr','p','b','table','strong','emphasis','a','h1','h2','h3','pre','sub','sup','i','th','cp','ul','ol','li','dt','dd', 'input', 'textarea', 'font', 'span');
var pixelArray =  new Array('10','12','16','20','24','30','40');
var emArray =  new Array('0.7','0.9','1.0','1.5','2.0','2.5','3');
var initSize = 2;

function fontSizerInit()
{
	initSize = parseInt(getCookie("bnwfontsize"));
	if(initSize==null || isFinite(initSize)==false) initSize = 2;
	unit = getCookie("bnwfontsizeunit");
	if(unit==null || unit=="") unit = "px";
	fontSizerChangeElements(initSize,unit);
}

function fontSizerReset()
{
	initSize = 2;
	fontSizer(0,"px");
}

function fontSizer(inc,unit) {
	var size = initSize;
	size += inc;
	if (size < 0 ) {
		size = 0;
	}
	if (size > 6 ) {
		size = 6;
	}
	initSize = size;
	setCookie("bnwfontsize",size,90);
	setCookie("bnwfontsizeunit",unit,90);
	fontSizerChangeElements(size,unit);
}

function fontSizerChangeElements(size,unit)
{
	if (!document.getElementById) 
		return;
	getBody = document.getElementsByTagName('body')[0];
	for (i = 0 ; i < tags.length ; i++ ) {
		getallTags = getBody.getElementsByTagName(tags[i]);
	for (k = 0 ; k < getallTags.length ; k++) 
		getallTags[k].style.fontSize = (unit=='px') ? pixelArray[size]+unit: emArray[size]+unit;
	}
}
