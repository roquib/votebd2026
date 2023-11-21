/******************************************

    This file is part of Bangla Unicode Web Tools.

    Bangla Unicode Web Tools is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    Bangla Unicode Web Tools is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Bangla Unicode Web Tools; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA


	Contains bangla character map

	Author: S M Mahbub Murshed
	Copyright: S M Mahbub Murshed
	Email: udvranto@yahoo.com
	Version: 1.0.0
	Date: September 06, 2006, XX:XX GMT
*******************************************/


/***** Bangla Character Map ******/
var BanglaCharacterMapVowel = new Array(
			"অ",
			"আ",
			"ই",
			"ঈ",
			"উ",
			"ঊ",
			"এ",
			"ঐ",
			"ও",
			"ঔ",
			"ঋ");
var BanglaCharacterMapConsonant = new Array(
			"ক",
			"খ",
			"গ",
			"ঘ",
			"ঙ",

			"চ",
			"ছ",
			"জ",
			"ঝ",
			"ঞ",

			"ট",
			"ঠ",
			"ড",
			"ঢ",
			"ণ",

			"ত",
			"থ",
			"দ",
			"ধ",
			"ন",

			"প",
			"ফ",
			"ব",
			"ভ",
			"ম",

			"য",
			"র",
			"ল",
			"শ",
			"ষ",
			"স",
			"হ",

			"ৎ",
			"ড়",
			"ঢ়",
			"য়",
			"ঁ",
			"ং",
			"ঃ");
var BanglaCharacterMapSpecial = new Array(
			"্",
			"zwnj",
			"হসন্ত",
			"র-ফলা",
			"ব-ফলা",
			"য-ফলা",
			"রেফ",
			"।",
			"॥");



/***** Bijoy Character Map ******/
var BijoyCharacterMapVowel = {
			"অ":"F",
			"আ":"gf",
			"ই":"gd",
			"ঈ":"gD",
			"উ":"gs",
			"ঊ":"gS",
			"এ":"gc",
			"ঐ":"gC",
			"ও":"gx",
			"ঔ":"gX",
			"ঋ":"ga" };

var BijoyCharacterMapConsonant = {
			"ক":"j",
			"খ":"J",
			"গ":"o",
			"ঘ":"O",
			"ঙ":"q",

			"চ":"y",
			"ছ":"Y",
			"জ":"u",
			"ঝ":"U",
			"ঞ":"I",

			"ট":"t",
			"ঠ":"T",
			"ড":"e",
			"ঢ":"E",
			"ণ":"B",

			"ত":"k",
			"থ":"K",
			"দ":"l",
			"ধ":"L",
			"ন":"b",

			"প":"r",
			"ফ":"R",
			"ব":"h",
			"ভ":"H",
			"ম":"m",

			"য":"w",
			"র":"v",
			"ল":"V",
			"শ":"M",
			"ষ":"N",
			"স":"n",
			"হ":"i",

			"ৎ":"|",
			"ড়":"p",
			"ঢ়":"P",
			"য়":"W",
			"ঁ":"&amp;",
			"ং":"Q",
			"ঃ":"\\" };

var BijoyCharacterMapSpecial = { 
			"্":"g",
			"zwnj":"`",
			"হসন্ত":"g`",
			"র-ফলা":"z",
			"ব-ফলা":"gh",
			"য-ফলা":"Z",
			"রেফ":"A",
			"।":"G",
			"॥":"gG" };
var BijoyHint	= 	"স্বরবর্ণের \"কার\" লিখতে উপরে টেবিল মতে স্বরবর্ণটির g ব্যতীত অক্ষরটি চাপুন। যেমন: ি লিখতে চাপুন d<br>\
			যুক্তাক্ষর লিখতে \"ব্যাঞ্জনবর্ণ g ব্যাঞ্জনবর্ণ\" চাপুন। যেমন: ক্ষ লিখতে চাপুন kgN।<br>\
			র‌্য (র-য-ফলা) লিখতে র+zwnj+য-ফলা চাপুন। যেমন: র‌্যাব লিখতে চাপুন v`ZFh।\
			<a href=\"https://bugzilla.mozilla.org/show_bug.cgi?id=274152\">ফায়াফক্সে</a> ঠিকমত দেখতে দুবার zwnj চাপুন।";







/***** Somewherein Character Map ******/
var SomewhereInCharacterMapVowel = {
			"অ":"ao",
			"আ":"A",
			"ই":"I",
			"ঈ":"II",
			"উ":"U",
			"ঊ":"UU",
			"এ":"E",
			"ঐ":"OI",
			"ও":"O",
			"ঔ":"OU",
			"ঋ":"WR" };

var SomewhereInCharacterMapConsonant = {
			"ক":"k",
			"খ":"kh/K",
			"গ":"g",
			"ঘ":"gh/G",
			"ঙ":"Ng",

			"চ":"c/ch",
			"ছ":"C",
			"জ":"j",
			"ঝ":"jh/J",
			"ঞ":"NG",

			"ট":"t",
			"ঠ":"th",
			"ড":"d",
			"ঢ":"dh",
			"ণ":"N",

			"ত":"T",
			"থ":"Th",
			"দ":"D",
			"ধ":"Dh",
			"ন":"n",

			"প":"p",
			"ফ":"ph/f",
			"ব":"b",
			"ভ":"bh/v",
			"ম":"m",

			"য":"z",
			"র":"r",
			"ল":"l",
			"শ":"sh",
			"ষ":"S",
			"স":"s",
			"হ":"H",

			"ৎ":"tt",
			"ড়":"R",
			"ঢ়":"Rh",
			"য়":"y",

			"ঁ":"NN",
			"ং":"ng",
			"ঃ":"HH"};

var SomewhereInCharacterMapSpecial = { 
			"্":"+",
			"zwnj":"`",
			"হসন্ত":"+",
			"র-ফলা":"+r",
			"ব-ফলা":"+b/+w",
			"য-ফলা":"Y",
			"রেফ":"r+",
			"।":".",
			"॥":"" };
var SomewhereInHint =	"যুক্তাক্ষর লিখতে \"ব্যাঞ্জনবর্ণ + ব্যাঞ্জনবর্ণ\" চাপুন। যেমন: ক্ষ লিখতে চাপুন k+S।<br>\
			র‌্য (র-য-ফলা) লিখতে র+zwnj+য-ফলা চাপুন। যেমন: র‌্যাব লিখতে চাপুন r`Yab।\
			<a href=\"https://bugzilla.mozilla.org/show_bug.cgi?id=274152\">ফায়াফক্সে</a> ঠিকমত দেখতে দুবার zwnj চাপুন।";







/***** Avro Character Map ******/
var AvroCharacterMapVowel = {
			"অ":"o",
			"আ":"a/A",
			"ই":"i",
			"ঈ":"I",
			"উ":"u",
			"ঊ":"U",
			"এ":"e/E",
			"ঐ":"",
			"ও":"O",
			"ঔ":"",
			"ঋ":"" };

var AvroCharacterMapConsonant = {
			"ক":"k/K",
			"খ":"kh",
			"গ":"g/G",
			"ঘ":"gh",
			"ঙ":"",

			"চ":"c/ch",
			"ছ":"chh",
			"জ":"j/J",
			"ঝ":"jh",
			"ঞ":"",

			"ট":"T",
			"ঠ":"Th",
			"ড":"D",
			"ঢ":"Dh",
			"ণ":"N",

			"ত":"t",
			"থ":"th",
			"দ":"D",
			"ধ":"Dh",
			"ন":"n",

			"প":"p",
			"ফ":"ph/f",
			"ব":"b",
			"ভ":"bh/v",
			"ম":"m",

			"য":"J/z",
			"র":"r",
			"ল":"l/L",
			"শ":"S",
			"ষ":"sh",
			"স":"s",
			"হ":"h/H",

			"ৎ":"",
			"ড়":"R",
			"ঢ়":"Rh",
			"য়":"y",

			"ঁ":"^",
			"ং":"",
			"ঃ":"\:"};

var AvroCharacterMapSpecial = { 
			"্":"+",
			"zwnj":"`",
			"হসন্ত":"+`",
			"র-ফলা":"r+",
			"ব-ফলা":"",
			"য-ফলা":"z+",
			"রেফ":"",
			"।":".",
			"॥":"" };
var AvroHint =	"যুক্তাক্ষর লিখতে \"ব্যাঞ্জনবর্ণ + ব্যাঞ্জনবর্ণ\" চাপুন। যেমন: ক্ষ লিখতে চাপুন k+sh।<br>\
			র‌্য (র-য-ফলা) লিখতে র+zwnj+য-ফলা চাপুন। যেমন: র‌্যাব লিখতে চাপুন r`+yab।\
			<a href=\"https://bugzilla.mozilla.org/show_bug.cgi?id=274152\">ফায়াফক্সে</a> ঠিকমত দেখতে দুবার zwnj চাপুন।";

function CharacterMapTable(maptype)
{
	var table = "";

	var vpart1 = "";
	var vpart2 = "";
	var cpart1 = "";
	var cpart2 = "";
	var spart1 = "";
	var spart2 = "";

	var CharacterMapVowel;
	var CharacterMapConsonant;
	var CharacterMapSpecial;
	var Hint;

	if(maptype=="english")
		return table;
	else if(maptype=="bijoy" || maptype=="unijoy" )
	{
		CharacterMapVowel = BijoyCharacterMapVowel;
		CharacterMapConsonant = BijoyCharacterMapConsonant;
		CharacterMapSpecial = BijoyCharacterMapSpecial;
		Hint = BijoyHint;
		table += "<b>Bijoy Character Map:</b><br>";
	}
	else if(maptype=="unijoy" )
	{
		CharacterMapVowel = BijoyCharacterMapVowel;
		CharacterMapConsonant = BijoyCharacterMapConsonant;
		CharacterMapSpecial = BijoyCharacterMapSpecial;
		Hint = BijoyHint;
		table += "<b>Unijoy Character Map:</b><br>";
	}
	else if(maptype=="somewherein")
	{
		CharacterMapVowel = SomewhereInCharacterMapVowel;
		CharacterMapConsonant = SomewhereInCharacterMapConsonant;
		CharacterMapSpecial = SomewhereInCharacterMapSpecial;
		Hint = SomewhereInHint;
		table += "<b>Somewherein Phonetic Character Map:</b><br>";
	}
	else if(maptype=="avro")
	{
		CharacterMapVowel = AvroCharacterMapVowel;
		CharacterMapConsonant = AvroCharacterMapConsonant;
		CharacterMapSpecial = AvroCharacterMapSpecial;
		Hint = AvroHint;
		table += "<b>Avro Phonetic Character Map:</b><br>";
	}

	table += "<table border=1 cellspacing=0>";

	for(var i=0; i<BanglaCharacterMapVowel.length; i++)
	{
		vpart1 += "<td>"+ BanglaCharacterMapVowel[i] +"</td>";
		vpart2 += "<td>"+ CharacterMapVowel[BanglaCharacterMapVowel[i]] +"</td>";
	}

	for(var i=0; i<BanglaCharacterMapConsonant.length; i++)
	{
		cpart1 += "<td>"+ BanglaCharacterMapConsonant[i] +"</td>";
		cpart2 += "<td>"+ CharacterMapConsonant[BanglaCharacterMapConsonant[i]] +"</td>";
	}

	for(var i=0; i<BanglaCharacterMapSpecial.length; i++)
	{
		spart1 += "<td>"+ BanglaCharacterMapSpecial[i] +"</td>";
		spart2 += "<td>"+ CharacterMapSpecial[BanglaCharacterMapSpecial[i]] +"</td>";
	}

	table += "<span class=\"bangla\">";
	table += "<tr align=\"center\">";
	table += cpart1;
	table += "</tr>";
	table += "</span>";

	table += "<span class=\"english\">";
	table += "<tr align=\"center\">";
	table += cpart2;
	table += "</tr>";
	table += "</span>";

	table += "<span class=\"bangla\">";
	table += "<tr align=\"center\">";
	table += vpart1 + spart1;
	table += "</tr>";
	table += "</span>";

	table += "<span class=\"english\">";
	table += "<tr align=\"center\">";
	table += vpart2 + spart2;
	table += "</tr>";
	table += "</span>";

	table += "</table>";
	table += Hint;
	return table;
}
