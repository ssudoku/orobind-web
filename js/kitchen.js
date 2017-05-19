$(document).ready(function(){
	$("#setUser .cta.part1").click(function(e){
		e.preventDefault(); e.stopPropagation();
		var x = $("#userEmail").val();
		if(!x || !validateEmail(x))
		{
			$("#userEmail").addClass("error").focus();
			return false;
		}
		else {
			var usr = fetchUser(x);
			$("#part1, #part2").slideToggle(200);
		}
	});
	$('input[type="radio"]').change(function(){
		$(this).parents(".questionBlock").removeClass("error");
	})
	$("#part2 .cta.back").click(function(e){
		e.preventDefault(); e.stopPropagation();
		$("#part2, #part1").slideToggle(200);
	});
	$("#part3 .cta.back").click(function(e){
		e.preventDefault(); e.stopPropagation();
		$("#part3, #part2").slideToggle(200);
	});
	$("#part4 .cta.back").click(function(e){
		e.preventDefault(); e.stopPropagation();
		$("#part4, #part3").slideToggle(200);
	});
	$("#part2 .cta.proceed").click(function(e){
		e.preventDefault(); e.stopPropagation();
		$("#part2, #part3").slideToggle(200);
	});
	$("#part3 .cta.proceed").click(function(e){
		e.preventDefault(); e.stopPropagation();
		if(validatePart3()){
			storeDetails("#part2");
			$("#part4, #part3").slideToggle(200);
		}
	});
	$("#part4 .cta.finish").click(function(e){
		e.preventDefault(); e.stopPropagation();
		if(validatePart4()){
			if(storeDetails("#part3"))
			{
				saveResult();
			}
		}
	});
});
function validatePart3(){
	if($('#part3 input[type="radio"]:checked').length == 12)
	{
		return true;
	}
	else {
		$('#part3 input[type="radio"]').each(function(){
			if(!$(this).is(":checked") && !$(this).siblings('input[type="radio"]').is(":checked")){
				$(this).parents(".questionBlock").addClass("error");
				showPop("All questions have to be answered");
			}
			else {
				$(this).parents(".questionBlock").removeClass("error");
			}
		});
		return false;
	}
}
function validatePart4(){
	if($('#part4 input[type="radio"]:checked').length == 12)
	{
		return true;
	}
	else {
		$('#part4 input[type="radio"]').each(function(){
			if(!$(this).is(":checked") && !$(this).siblings('input[type="radio"]').is(":checked")){
				$(this).parents(".questionBlock").addClass("error");
				showPop("All questions have to be answered");
			}
			else {
				$(this).parents(".questionBlock").removeClass("error");
			}
		});
		return false;
	}
}
function saveResult(){
	//
}
function storeDetails(sel){
	//
}
function fetchUser(email){
	//
}

function getData(url) {
    var result = null;
    attachLoader();
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data) {
			result = data;
		},
		error: function(xhr, status, thrown)
		{
			showPop(thrown);
		}
    });
    return result;
}
function showModalMessage(arg)
{
	$('.messageModal').detach();

  var modalCard = '<div class="messageModal"><div class="messageModalInner inner"><a class="close">&#10060;</a><div class="modalContent"></div><button class="modalCta">Close</button></div></div>';

	var message = either(arg["message"],arg["content"]);
	var duration = either(arg["duration"],3000) ;

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
	if(!arg || arg["timed"] == undefined || arg["timed"] == null || isNaN(arg["timed"]) || arg["timed"] == "1")
	{
		setTimeout(function(){
			$('.messageModal').fadeOut(150);
		},duration);
	}
}
$(document).on("click", ".messageModal .modalCta, .messageModal .close", function(e){
	e.preventDefault(); e.stopPropagation();
	$('.messageModal').fadeOut(150);
});
//either value, preferably first arguement
function either(arg1,arg2)
{
	if(arg1 === undefined || arg1 === null)
	{
		return arg2;
	}
	else {
		return arg1;
	}
}
function showPop(msg){
	showModalMessage({"message":msg,"nobutton":true});
}
function testName(name)
{
	var rx = /^[a-zA-Z ]+$/;
	return rx.test(name);
}

function validateEmail(mail)
{
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return re.test(mail);
}

function isDate(value) {
	if(!value)
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
