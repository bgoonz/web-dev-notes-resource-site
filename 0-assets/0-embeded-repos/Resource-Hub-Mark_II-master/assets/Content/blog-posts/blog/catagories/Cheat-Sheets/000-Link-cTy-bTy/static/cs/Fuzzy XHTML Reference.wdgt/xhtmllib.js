var xml;
var sel;
var xhtmlelements = new Array();
var el;
var suggestlength = 0;
var typed;
var RETURN = 13;
var ESC = 27;
var KEYUP = 38;
var KEYDN = 40;
var s = 0;
var modules;
var opacity = 10;
var timeouts;
var timeoutf;
var clever;
var heightadjust = 20;
var mid;
var attdiv;
var defdiv;
var coretypes = new Array('class','id','title');
var coredefs = new Array('NMTOKENS','ID','CDATA');
var I18Ntypes = new Array('xml:lang');
var I18Ndefs = new Array('NMTOKEN');
var eventtypes = new Array('onclick','ondblclick','onmousedown','onmouseup','onmouseover','onmousemove','onmouseout','onkeypress','onkeydown','onkeyup');
var eventdefs = new Array('Script','Script','Script','Script','Script','Script','Script','Script','Script','Script');
var styletypes = new Array('style');
var styledefs = new Array('CDATA');

function init() {
	mid = document.getElementById('middle');
	clever = document.getElementById('clever');
	clever.style.opacity = Math.floor(opacity /10);
	xml = document.getElementById('data');
	sel = document.getElementById('elementselect');
	modules = xml.getElementsByTagName('module');
	for(h=0; h<modules.length; h++) {
		var og = document.createElement('optgroup');
		og.label = modules[h].type;
		var xe = modules[h].getElementsByTagName('element');
			for(var i=0; i<xe.length; i++) {
				if(xe[i].getAttribute("id")) {
				xhtmlelements.push(xe[i].getAttribute("id"));
				var t = document.createTextNode(xe[i].getAttribute("id"));
				var so = document.createElement('option');
				so.appendChild(t)
				og.appendChild(so);
				}
			sel.appendChild(og);
			}
		}

	xhtmlelements.sort();
	
	sel.onchange = info;
	var wgt = document.getElementById("widget");
	wgt.onmousemove = mousemove;
	wgt.onmouseout = mouseexit;
	typed = document.getElementById("elementname");
	typed.onkeyup = suggest;
	typed.onkeydown = keynav;
	document.body.onclick = clearsel;

			
	var links = document.getElementsByTagName("a");
	for (var i=0; i < links.length; i++) {
		if (links[i].className.match("external")) {
			links[i].href = "javascript: widget.openURL('" + links[i].href + "');";
			}
		}
	}

function suggest(event) {
	document.getElementById("xhtmlsuggest").style.display = "block";
	if(event.keyCode == 40) return;
	if(event.keyCode == 38) return;
	if(typed.innerHTML == "") return;
	var cromulent = new Array();
	
	var needle = new RegExp(typed.innerHTML, "gi");
		for(i=0; i<xhtmlelements.length; i++) {
			if(needle.test(xhtmlelements[i])) {
				cromulent.push(xhtmlelements[i]);
				}
			}
		var ul = document.getElementById("xhtmlsuggest");
		clearsel();
		
		var limit = 10;
		(limit > cromulent.length) ? limit = cromulent.length : limit;
		
		for(i=0; i<limit; i++) {
			var li = document.createElement('li');
			var a = document.createElement('a');
			var t = document.createTextNode(cromulent[i]);
			a.appendChild(t);
			a.setAttribute("onclick", "changesel(this.innerText)");
			li.appendChild(a);
			li.onkeydown = keynav;
			ul.appendChild(li);
			}
	}
	
function clearsel() {
	var ul = document.getElementById("xhtmlsuggest");
	while(ul.firstChild) {
		ul.removeChild(ul.firstChild);
		}
	}
function changesel(x) {
	sel.value = typed.innerHTML = x;
	clearsel();
	info();
	}
function clear() {
	document.getElementById("elementname").innerHTML = "XHTML";
	document.getElementById("elementdesc").innerHTML = "Reference";
	document.getElementById("xhtmldisplay").previousSibling.previousSibling.style.display = "none";			
	document.getElementById("xhtmlmin").previousSibling.previousSibling.style.display = "none";
	document.getElementById("xhtmlmisc").previousSibling.previousSibling.style.display = "none";
	document.getElementById("xhtmlsamp").previousSibling.previousSibling.style.display = "none";
	}

function keynav(event) {
	
	var key = event.keyCode;
	var ul = document.getElementById("xhtmlsuggest");
	var as = ul.getElementsByTagName("a");

		switch(key) {
		
			case RETURN:
				if(as.length < 1) {
					return false;
					break;
					}
					
				for(var i=0; i<as.length; i++) {
					if(as[i].className == "selected") {
						typed.innerHTML = as[i].innerText;
						changesel(typed.innerHTML);
						sel.focus();
						return false;
						break;
						}
					}
				typed.innerHTML = as[0].innerText;
				changesel(typed.innerHTML);
				sel.focus();
				return false;

					
			break;

			case KEYUP:
				for(var i=0; i<as.length; i++) {
					if(as[i].className == "selected") {
						as[i].className = "";
						if(as[i-1]) {
							as[i-1].className = "selected";
							typed.innerHTML = as[i-1].innerText;
							}
						return false;
						} else {
						if(i == as.length) as[0].className = "selected";
						}
					}
				break;

			case KEYDN:
				for(var i=as.length-1; i>=0; i--) {
					if(as[i].className == "selected") {
						as[i].className = "";
						if(as[i+1]) {
							as[i+1].className = "selected";
							typed.innerHTML = as[i+1].innerText;
							hl = 1;
							}
						return false;
						} else {
						if(0>=i) { 
							as[0].className = "selected";
							typed.innherHTML = as[0].innerText;
							}
						}
					}
				event.stopPropagation();
				break;

		}
	}
	
function info() {
	if(defdiv != "") {document.getElementById("datadescription").style.display = "none";}
	clever.style.cssFloat = "left";
	fadeout();
	document.getElementById("collapse").style.display = "block";
	
	var nd = document.getElementById(sel.value);
	var atts = nd.getElementsByTagName('att');
	var attslist = document.getElementById('xhtmlattributes');
	attslist.previousSibling.previousSibling.style.display = "block";
	//remove previous atts
		while(attslist.firstChild) {
			attslist.removeChild(attslist.firstChild);
			}

	//fill out h1 & h2
		document.getElementById("elementname").innerHTML = sel.value;
		document.getElementById("elementdesc").innerHTML = nd.getElementsByTagName("desc")[0].innerHTML;
		
	//fill out display type
		document.getElementById("xhtmldisplay").previousSibling.previousSibling.style.display = "block";
		if(!nd.getAttribute("content")) {
			document.getElementById("xhtmldisplay").innerText = "not applicable";
			} else {
			document.getElementById("xhtmldisplay").innerText = nd.getAttribute("content");
			}
			
	//fill out minimum
	if(nd.getElementsByTagName('minreq')) {
		document.getElementById("xhtmlmin").innerHTML = nd.getElementsByTagName("minreq")[0].innerHTML;
		document.getElementById("xhtmlmin").previousSibling.previousSibling.style.display = "block";
		}

	//fill out misc
	if(nd.getElementsByTagName('misc')[0].innerHTML)
		document.getElementById("xhtmlmisc").innerHTML = nd.getElementsByTagName("misc")[0].innerHTML;
		document.getElementById("xhtmlmisc").previousSibling.previousSibling.style.display = "block";
	//fill out samp
	if(nd.getElementsByTagName('samp')[0].innerHTML)
		document.getElementById("xhtmlsamp").innerHTML = nd.getElementsByTagName("samp")[0].innerHTML;
		document.getElementById("xhtmlsamp").previousSibling.previousSibling.style.display = "block";


	//fill out attributes			
		for(i=0; i<atts.length; i++) {
			if(atts[i].type == "common") {
				commonatts("core");
				commonatts("I18N");
				commonatts("events");
				commonatts("style");
				} else if((atts[i].type == "core") || (atts[i].type == "I18N") || (atts[i].type == "events") || (atts[i].type == "style")) {
				commonatts(atts[i].type);
				} else {
				var li = document.createElement('li');
				li.setAttribute("attr", atts[i].innerHTML);
				li.onmouseover = showAttribute;
				li.onmouseout = hideAttribute;
				li.onclick = defineAttribute;
				var t = document.createTextNode(atts[i].type);
				li.appendChild(t);
				attslist.appendChild(li);
				}
			}
	if(clever.offsetHeight > mid.offsetHeight) {
		if(window.widget) {
			window.resizeTo(348, document.getElementById('top').offsetHeight + clever.offsetHeight + document.getElementById('bottom').offsetHeight);
			}
		eatme();
		}
	if(clever.offsetHeight < mid.offsetHeight) {
		drinkme();
		}
	if(clever.offsetHeight == mid.offsetHeight) {
		fadein();
		}
		
	}

function fadein() {
	clearTimeout(timeoutf);
	if(opacity > 8.5) { 
		clearTimeout(timeoutf);
		opacity = 10;
		clever.style.opacity = Math.floor(opacity/10);
		clever.style.cssFloat = "none";
		if (window.widget) {
			window.resizeTo(348, document.getElementById('top').offsetHeight + mid.offsetHeight + document.getElementById('bottom').offsetHeight);
			}
		} else {
		opacity = opacity + 1;
		clever.style.opacity = Math.floor(opacity/10);
		timeoutf = window.setTimeout("fadein()",1);
		}
	clearsel();
	}


function fadeout() {
	clearTimeout(timeoutf);
	if(opacity < 1) { 
		clearTimeout(timeoutf);
		opacity = 0
		clever.style.opacity = Math.floor(opacity/10);
		clever.style.cssFloat = "left";
		} else {
		opacity = opacity - 1;
		clever.style.opacity = Math.floor(opacity/10);
		timeoutf = window.setTimeout("fadeout()",1);
		}
	}


function eatme() {
	clearTimeout(timeouts);
	if(clever.offsetHeight > (mid.offsetHeight + heightadjust)) {
		mid.style.height = (mid.offsetHeight + 3) + "px";
		timeouts = window.setTimeout("eatme()",0);
		} else {
		fadein();
		}
	}
function drinkme() {
	clearTimeout(timeouts);
	if(clever.offsetHeight < (mid.offsetHeight + heightadjust)) {
		mid.style.height = (mid.offsetHeight - 4) + "px";
		timeouts = window.setTimeout("drinkme()",0);
		} else {
		fadein();
		}
	}

function showAttribute() {
	try {
		attdiv = document.createElement("div");
		attdiv.setAttribute("id", "attdiv");
		attdiv.style.position = "absolute";
		attdiv.style.top = (event.currentTarget.offsetTop + 12) + "px";
		attdiv.style.left = (event.clientX+12) + "px";
		attdiv.style.display = "block";
		var t = document.createTextNode("Attribute value: " + event.currentTarget.attr);
		attdiv.appendChild(t);
		event.currentTarget.appendChild(attdiv);
		if(attdiv.offsetWidth + attdiv.offsetLeft > 343) attdiv.style.left = (attdiv.offsetLeft-100) + "px";
		}
	finally {
		return false; 
		}
	}
	
function hideAttribute() {
	if(attdiv.id == "attdiv") {
		event.currentTarget.removeChild(attdiv);
		attdiv = "";
		}
	}
function defineAttribute() {
	hideAttribute();
	defdiv = document.getElementById("datadescription");
	var cryptic = event.currentTarget.attr;
	var datatypes = document.getElementById("datatypes");
	var datatypes = datatypes.getElementsByTagName("type");
	
	if(cryptic[0] == '(' || cryptic[0] == '"') {
		var thedef = cryptic;
		} else {
		for(i=0; i<datatypes.length; i++) {
			if(cryptic == datatypes[i].name) {
				var thedef = datatypes[i].innerHTML;
				break;
				}
			}
		}
	defdiv.innerHTML = thedef;
	defdiv.onclick = function() { defdiv.style.display = "none" };
	defdiv.style.display = "block";
	}

function commonatts(x) {
	var attslist = document.getElementById('xhtmlattributes');
	if(x == "core") {
		var types = coretypes;
		var defs = coredefs;
		}
	if(x == "I18N") {
		var types = I18Ntypes;
		var defs = I18Ndefs;
		}
	if(x == "events") {
		var types = eventtypes;
		var defs = eventdefs;
		}
	if(x == "style") {
		var types = styletypes;
		var defs = styledefs;
		}
		
	for(j=0; j<types.length; j++) {
		var li = document.createElement('li');
		li.setAttribute("class",x);
		li.setAttribute("attr",defs[j]);
		var t = document.createTextNode(types[j]);
		li.appendChild(t);
		li.onmouseover = showAttribute;
		li.onmouseout = hideAttribute;
		li.onclick = defineAttribute;
		attslist.appendChild(li);
		}
	}


function collapse() {
	if(defdiv != "") {document.getElementById("datadescription").style.display = "none";}
	clever.style.cssFloat = "left";
	
	var attslist = document.getElementById('xhtmlattributes');
	attslist.previousSibling.previousSibling.style.display = "none";
	//remove previous atts
		attslist.innerHTML = "";

	//h1 & h2
		document.getElementById("elementname").innerHTML = "XHTML";
		document.getElementById("elementdesc").innerHTML = "Reference";
		
	//display type
		document.getElementById("xhtmldisplay").previousSibling.previousSibling.style.display = "none";
		document.getElementById("xhtmldisplay").innerHTML = "";
			
	//minimum
		document.getElementById("xhtmlmin").innerHTML = "";
		document.getElementById("xhtmlmin").previousSibling.previousSibling.style.display = "none";

	//fill out misc
		document.getElementById("xhtmlmisc").innerHTML = "";
		document.getElementById("xhtmlmisc").previousSibling.previousSibling.style.display = "none";
	//fill out samp
		document.getElementById("xhtmlsamp").innerHTML = "";
		document.getElementById("xhtmlsamp").previousSibling.previousSibling.style.display = "none";

		document.getElementById("collapse").style.display = "none";
		//sel.value = "";

		shrink();
	}

function shrink() {
	clearTimeout(timeouts);
	if(clever.offsetHeight < mid.offsetHeight) {
		mid.style.height = (mid.offsetHeight - 4) + "px";
		timeouts = window.setTimeout("shrink()",0);
		} else {
			if(window.widget) {
			setTimeout('window.resizeTo(348, 94)', 10);	
			}
		}
	}


window.onload = init;

