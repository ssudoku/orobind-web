var d = new Date();
var xMonth = d.getMonth()+1;
var xDay = d.getDate();
var xToday = d.getFullYear() + '-' + (xMonth<10 ? '0' : '') + xMonth + '-' + (xDay<10 ? '0' : '') + xDay;

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var baseUrl = window.location.protocol+'//'+window.location.host+'/';

//Reg exp function to validate email parameter
function validateEmail(mail)
{
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(mail);
}
//function to check if a passed string is a valid name with only alphabets and spaces
function testName(name)
{
  var rx = /^[a-zA-Z ]+$/;
  return rx.test(name);
}
//function to check if a passed string is a valid date with hyphen separators in this format : dd-mm-yyyy
function isDate(value) {
	if(!value || value.indexOf("-") < -1)
	{
		return false;
	}
	var arr = value.split("-");
	var va = parseInt(arr[0]);
	var vb = parseInt(arr[1]);
	var vc = parseInt(arr[2]);
	if (!value.length === 10 || !arr.length === 3)
	{
		return false;
	}
	else if(!arr[0].length === 2 || arr[0] === '' || isNaN(arr[0]) || !isValidDateForMonth(va,vb,vc))
	{
		return false;
	}
	else if(!arr[1].length === 2 || arr[1] === '' || isNaN(arr[1]))
	{
		return false;
	}
	else if(!arr[2].length === 4 || arr[2] === '' || isNaN(arr[2]))
	{
		return false;
	}
	else
	{
		return true;
	}
}
function isLeapYear (Year) {
	if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
		return (true);
	}
	else { return (false); }
};
function isValidDateForMonth(vdate,vmonth,vyear)
{
	switch (vmonth) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			if(parseInt(vdate) < 1 || parseInt(vdate) > 31)
			{
				return false;
			}
			else
			{
				return true;
			}
		break;
		case 4:
		case 6:
		case 9:
		case 11:
			if(parseInt(vdate) < 1 || parseInt(vdate) > 30)
			{
				return false;
			}
			else
			{
				return true;
			}
		break;
		case 2:
			if(isLeapYear(vyear))
			{
				if(parseInt(vdate) < 1 || parseInt(vdate) > 28)
				{
					return false;
				}
				else
				{
					return true;
				}
			}
			else
			{
				if(parseInt(vdate) < 1 || parseInt(vdate) > 27)
				{
					return false;
				}
				else
				{
					return true;
				}
			}
		break;
	}
}

//function to fit an image into its container, preserving the aspect ratio
function fitImgToContainer(arg){
	//img - the img tag
	//left - position from the left edge takes %, px, center etc
	//top - position from the top edge takes %, px, center etc
	if(arg)
	{
		var spacer = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAMAAAC6sdbXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkRBRENCRTU2Mzk1MTFFNTlCODREREY3QjJENzM0OTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkRBRENCRTY2Mzk1MTFFNTlCODREREY3QjJENzM0OTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyREFEQ0JFMzYzOTUxMUU1OUI4NERERjdCMkQ3MzQ5MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyREFEQ0JFNDYzOTUxMUU1OUI4NERERjdCMkQ3MzQ5MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvP60iIAAAAGUExURf///wAAAFXC034AAAABdFJOUwBA5thmAAAADklEQVR42mJgwAcAAgwAAB4AAcwgsosAAAAASUVORK5CYII=";
		if(arg["img"])
		{
			var imgurl = $(arg["img"]).attr("src");
			var cssimg = 'url("' + imgurl + '")';
			if(arg["left"] && arg["top"])
			{
				var csspos = arg["left"] + " " + arg["top"];
			}
			else if(arg["left"])
			{
				var csspos = arg["left"] + " center";
			}
			else if(arg["top"])
			{
				var csspos = "center " + arg["top"];
			}
			else {
				var csspos = "center center";
			}
			$(arg["img"]).attr({"data-fitImg":imgurl,"src":spacer});
			$(arg["img"]).css({
				"background-image":cssimg,
				"background-position": csspos,
				"background-size":"cover",
				"width":"100%",
				"height":"100%"
			});
		}
	}
}
//function to display tooltip
function showToolTip(arg){
	//options
	//element - the element on which to invoke the function
	//message - the message to put on the tooltip
	//timed - 0 to disable
	//timer - in ms

	var parentElem = arg["element"];
	var loc = $(parentElem)[0].getBoundingClientRect();

	$(".tooltip").detach();
	var htmlTooltip = '<div style="position: absolute; display:none; z-index: 25;" class="tooltip"><p style="color: rgb(255, 255, 255); padding: 5px; line-height: 1; border-radius: 7px; background: rgb(71, 212, 212) none repeat scroll 0% 0%; position: relative; z-index: 10;" class="tooltipConten">';
	htmlTooltip += arg["message"];
	htmlTooltip += '</p><span style="background: rgb(71, 212, 212) none repeat scroll 0% 0%; line-height: 1; display: block; width: 7px; height: 7px; position: relative; -webkit-transform: rotate(45deg); -moz-transform: rotate(45deg); -o-transform: rotate(45deg); transform: rotate(45deg); top: -3px; left: 24px; z-index: -1;" class="arrow">&nbsp;</span></div>'
	$('body').append(htmlTooltip);
	$(".tooltip").fadeIn(150).css({
		"left": loc.left + 'px',
		"top": loc.top - 32 + 'px'
	});
	if(arg["timed"] && arg["timed"] != "0")
	{
		if(arg["timer"])
		{
			var timerSecs = parseInt(arg["timer"]);
		}
		else {
			var timerSecs = 4000;
		}
		setTimeout(function(){
			$(".tooltip").fadeOut(150);
		},timerSecs);
	}
}
//shortcut function for small error messages
function showPop(str)
{
	showModalMessage({"message":str,"nobutton":true});
}
//confirmation modal
$(document).on("click",".confirmModal button.yes",function(){
	$('.messageModal').fadeOut(150);
	window.confirmModalSuccess();
});
$(document).on("click",".confirmModal button.no",function(){
	$('.messageModal').fadeOut(150);
	if(window.confirmModalFail)
	{
		window.confirmModalFail();
	}
});
function confirmModal(arg)
{
	//function options
	//"title" - modal title
	//"class" - modal class
	//"message" - modal message (optional)
	//"timed" - required (0 for false or 1 for true)
	//"timer" - valid if "timed" (value in milliseconds)
	//"success" - function to fire if user clicks on yes
	//"fail" - function to fire if user clicks on no
	//"default" - optional function to fire if timer expires on timed mode - default is success (success, fail and custom fn)
	//"confirmLabel" - name of the button for yes
	//"denyLabel" - name of the function for no

	modalHtml = '';
	if(arg)
	{
		if(arg["title"])
		{
			modalHtml += '<h4 class="confirmTitle">'+arg["title"]+'</h4>';
		}
		else {
			showPop("Confirm function invoked without title option");
			return false;
		}
		if(arg["message"])
		{
			modalHtml += '<p class="confirmMessage">'+arg["message"]+'</p>';
		}
		if(arg["timed"] && arg["timed"] != "0")
		{
			if(arg["timer"])
			{
				modalHtml += '<p class="timerMessage">Auto-confirming in <span class="timerVal">' + parseInt(arg["timer"])/1000 + '</span> seconds</p>';
			}
			else {
				modalHtml += '<p class="timerMessage">Auto-confirming in <span class="timerVal">4</span> seconds</p>';
			}
		}
		if(arg["denyLabel"])
		{
			modalHtml += '<button class="no">'+arg["denyLabel"]+'</button>';
		}
		else {
			modalHtml += '<button class="no">No</button>';
		}
		if(arg["confirmLabel"])
		{
			modalHtml += '<button class="yes">'+arg["confirmLabel"]+'</button>';
		}
		else {
			modalHtml += '<button class="yes">Yes</button>';
		}
		if(arg["success"])
		{
			window.confirmModalSuccess = arg["success"];
		}
		else {
			showPop("Confirm modal invoked without success function");
			return false;
		}
		if(arg["fail"])
		{
			window.confirmModalFail = arg["fail"];
		}
		if(arg["class"])
		{
			var className = arg["class"] + " confirmModal";
		}
		else {
			var className = "confirmModal";
		}
	}
	else {
		showPop("Confirm function invoked without options");
		return false;
	}

	showModalMessage({
		"class":className, //the classname of the main modal, as defined by the css for the particular module
		"closable":"0", //the modal can be closed by the user. any value other than 1 makes it unclosable by user
		"content":modalHtml, //passing the html content
		"timed":"0", //if the modal should be auto-closed after 3 seconds. "0" will disable this
		"size":"small" //small -320px, wide -540px, xl -768px, xxl - 992px
	});

	if(arg["timed"] && arg["timed"] != "0")
	{
		if(arg["timer"]){
			var countdown = arg["timer"]/1000;
		}
		else {
			var countdown = 4;
		}
		var i=1;
		var cdtimer = window.setInterval(function(){
			if(i > countdown)
			{
				if(arg["default"] && arg["default"] == "success")
				{
					$(".confirmModal button.yes").click();
				}
				else if(arg["default"] && arg["default"] == "fail")
				{
					$(".confirmModal button.no").click();
				}
				else if(arg["default"])
				{
					$(".confirmModal").fadeOut(150);
					if(typeof arg["default"] == "function"){
					arg.default();}
				}
				else {
					$(".confirmModal button.yes").click();
				}

				window.clearInterval(cdtimer);
			}
			else {
				var remaining = countdown - i;
				$(".confirmModal .timerMessage .timerVal").text(remaining);
				i++;
			}
		},1000);
	}
}

//popup modals
function showModalMessage(arg)
{
	$('.messageModal').detach();

  var modalCard = '<div class="messageModal"><div class="messageModalInner"><button class="close"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path fill="#47D4D4" d="M15 0c8.27 0 15 6.663 15 14.853s-6.73 14.852-15 14.852S0 23.043 0 14.853 6.73 0 15 0z"/><path fill="#FFF" d="M19.11 9.025L15 13.095l-4.11-4.07c-.49-.485-1.284-.485-1.774 0s-.49 1.272 0 1.757l4.11 4.07-4.11 4.07c-.49.485-.49 1.27 0 1.757.49.485 1.284.484 1.774 0L15 16.61l4.11 4.07c.49.483 1.284.484 1.774 0 .49-.487.49-1.273 0-1.76l-4.11-4.068 4.11-4.07c.49-.484.49-1.27 0-1.757-.49-.485-1.284-.484-1.774 0z"/></svg></button><div class="modalContent"></div><button class="modalCta">Close <i class="fa fa-close"></i></button></div></div>';

	var message = arg["message"] || arg["content"];
	var duration = parseInt(arg["duration"]) || 3000 ;

	$('body').append(modalCard);

	if(arg && arg["class"])
	{
		$(".messageModal").addClass(arg["class"]);
		var innerClass = arg["class"];
		innerClass += "Inner";
		$(".messageModal .messageModalInner").addClass(innerClass);
	}

	if(arg && arg["closable"] && arg["closable"] != "1")
	{
		$(".messageModal .messageModalInner .close, .messageModal .messageModalInner .modalCta").detach();
	}

	if(arg && arg["nobutton"])
	{
		$(".messageModal .messageModalInner .modalCta").detach();
	}

	if(arg["width"]) // small, wide, xl, xxl
	{
		$('.messageModal').addClass(arg["width"]);
	}

	$('.messageModal .modalContent').html(message);
	$('.messageModal').fadeIn(150).css("display","flex");
	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)
	{
		var innerhght = $(".messageModalInner").height() + 40 + "px";
		$(".messageModalInner").css({
			"position":"absolute",
			"margin":"auto",
			"left":"0",
			"right":"0",
			"top":"0",
			"bottom":"0",
			"height":innerhght
		})
	}
	if(!arg || !arg["timed"] || arg["timed"] == "1")
	{
		setTimeout(function(){
			$('.messageModal').fadeOut(150);
		},duration);
	}
}
$(document).on("click", ".messageModal .modalCta, .messageModal .close", function(e){
	e.preventDefault(); e.stopPropagation();
	window.pendingActions = null;
	$('.messageModal').fadeOut(150);
});
function attachLoader()
{

	if(!window.loaderStylesAdded)
	{
		var loaderCSS = '.loader { display:-moz-flex; display:-webkit-flex; display: flex; position: fixed;width: 100%;height: 100%;z-index: 9999;background: rgba(255, 255, 255, 0.9); -webkit-justify-content: center; -moz-justify-content: center; -o-justify-content: center; justify-content: center; -webkit-align-items: center; -moz-align-items: center; -o-align-items: center; align-items: center;flex-direction: column;top: 0;left: 0;}.loader .loaderText {color: #424F5A;margin-bottom: 8px;}';

		var head = document.head || document.getElementsByTagName('head')[0];
		var newStyle = document.createElement('style');

		newStyle.type = 'text/css';
		if (newStyle.styleSheet){
		  newStyle.styleSheet.cssText = loaderCSS;
		} else {
		  newStyle.appendChild(document.createTextNode(loaderCSS));
		}

		head.appendChild(newStyle);
		window.loaderStylesAdded = true;
	}

	var loaderCard = '<div class="loader"><h4 class="loaderText">Waiting</h4><img class="loaderImg" src="http://cdn.orobind.com/srv/static/imagesV2/orobind-spinning-clock.gif"></div>';
	$('body').append(loaderCard);
}
function detachLoader()
{
	$('.loader').detach();
}

//master AJAX function
function ajaxRequest(arg)
{
	//define options
	//"url" - required
	//"type" - GET or POST, default is get.
	//"data" - optional, if present, will pass this as the data, otherwise will assume the data is query stringed
	//"data-type" - optional, default is json
	//"contentType" - optional, default is application/json
	//"async" - optional, default is true
	//"processData" - optional, default is true
	//"success" - optional, function to call on success
	//"fail" - optional, function to call on failure

	var type = arg["type"] || 'GET';
	var dataType = arg["data-type"] || 'json';
	var putdata = arg["data"] || '';
	var asyn = arg["async"] || true;
	var contentType = arg["contentType"] || 'application/json';
	var processData = arg["processData"] || true;

	attachLoader();
	var result = null;
	$.ajax({
			url: arg["url"],
			type: type,
			dataType: dataType,
			data: putdata,
			async: asyn,
			processData: processData, // Don't process the files
			contentType: contentType,
			success: function(data) {
					detachLoader();
					if(arg["success"])
					{
						var f = arg["success"];
						f();
					}
					result = data;
			},
			error: function(xhr, status, thrown)
			{
					detachLoader();
					if(arg["fail"])
					{
						var f = arg["fail"];
						f();
					}
			}
	});
	return result;
}

//validation functions
function isMobileValid(mobile){
	var isValid = true;
	if (isNaN(mobile)){
		isValid = false;
	}
	if(isValid){
		if(!(mobile.length == 10)){
			isValid = false;
		}
	}
	return isValid;
}
function isEmailValid(email){
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

function _ajaxError(message){
    showModalMessage({
        "class":"", //the classname of the main modal, as defined by the css for the particular module
        "closable":"1", //the modal can be closed by the user. any value other than 1 makes it unclosable by user
        "content":message, //passing the html content
        "nobutton":true, //to disable the default "close" button. also disabled if "closable" is set to any value other than 1
        "timed":"0", //if the modal should be auto-closed after 3 seconds. "0" will disable this
        "duration":"3000", //auto-close delay in ms. if timed is set as 0, this value does not matter
        "size":"small" //small -320px, wide -540px, xl -768px, xxl - 992px
    });
}
