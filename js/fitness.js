var fetchEmailUrl = "/oes/fetchuserdetails?";
var submitScoreUrl = "/oes/submitcategoryscores?";

$(document).ready(function(){
	newTest = new oft();
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
			$("#userEmail").removeClass("error");
			$("#part1, #part2").slideToggle(200);
		}
	});
	$("#part2 .cta.proceed").click(function(e){
		e.preventDefault(); e.stopPropagation();
		if(validateStats()){
			var questionArray = newTest.getQuestions();
			populateQuestions(questionArray);
			$("#part2, #part3").slideToggle(200);
		}
	});
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
	$("#part5 .cta.back").click(function(e){
		e.preventDefault(); e.stopPropagation();
		$("#part5, #part4").slideToggle(200);
	});
	$("#part3 .cta.part2").click(function(e){
		e.preventDefault(); e.stopPropagation();
		if(validateStamina()){
			newTest.updateStamina($(this).parents('form'));
			$("#part3, #part4").slideToggle(200);
		}
	});
	$("#part4 .cta.part3").click(function(e){
		e.preventDefault(); e.stopPropagation();
		if(validateStrength()){
			newTest.updateStrength($(this).parents('form'));
			$("#part4, #part5").slideToggle(200);
		}
	});
	$("#part5 .cta.part4").click(function(e){
		e.preventDefault(); e.stopPropagation();
		if(validateFlexibility()){
			newTest.updateFlexibility($(this).parents('form'));
			var scores = newTest.processAnswers();
			publish(scores);
			$("#part5, #part6").slideToggle(200);
		}
	});
	$("#part6 .cta.reset").click(function(e){
		e.preventDefault(); e.stopPropagation();
		$('form').each(function(){
			$(this)[0].reset();
		});
		$("#part6, #part1").slideToggle(200);
	});
	$('input[type="radio"]').change(function(){
		$(this).parents(".questionBlock").removeClass("error");
	});
});

function publish(scores){
	$("#part6 .announce .name").text(newTest.getUserName());
	$("#part6 .score .value").text(scores.overall);
	newTest.uploadScores();
}

function validateStamina(){
	var frm = $("#part3 #staminaQs");
	var cnt = 0;
	frm.find('input[type="text"]').each(function(){
		if(!$(this).val() || isNaN($(this).val()) || $(this).val() < 0){
			$(this).parents(".questionBlock").addClass("error");
			showPop("Please answer all questions with valid answers");
			return false;
		}
		else {
			$(this).parents(".questionBlock").removeClass("error");
			cnt ++;
		}
	});
	if(cnt > 2) {
		return true;
	}
	else {
		return false;
	}
}

function validateStrength(){
	var frm = $("#part4 #strengthQs");
	var cnt = 0;
	frm.find('input[type="text"]').each(function(){
		if(!$(this).val() || isNaN($(this).val()) || $(this).val() < 0){
			$(this).parents(".questionBlock").addClass("error");
			showPop("Please answer all questions with valid answers");
			return false;
		}
		else {
			$(this).parents(".questionBlock").removeClass("error");
			cnt ++;
		}
	});
	if(cnt > 2) {
		return true;
	}
	else {
		return false;
	}
}

function validateFlexibility(){
	var frm = $("#part5 #flexibilityQs");
	var cnt = 0, currentOpt = "", currentFlag = false;
	frm.find('input[type="radio"]').each(function(){
		if($(this).attr("name") != currentOpt) {
			currentFlag = false;
		}
		if($(this).is(":checked")){
			$(this).parents(".questionBlock").removeClass("error");
			cnt ++; currentFlag = true; currentOpt = $(this).attr("name");
		}
		else if ($(this).is(":last-of-type") && currentFlag == false) {
			$(this).parents(".questionBlock").addClass("error");
			showPop("Please answer all questions.");
			return false;
		}
	});
	if(cnt > 1) {
		return true;
	}
	else {
		return false;
	}
}

function populateQuestions(questions){
	var container1 = $("#part3 .formWrap form");
	container1.find("div").detach();
	var container2 = $("#part4 .formWrap form");
	container2.find("div").detach();
	var container3 = $("#part5 .formWrap form");
	container3.find("div").detach();
	var htmlStr1 = "", htmlStr2 = "", htmlStr3 = "";

	for(var key in questions){
		var k = parseInt(key) + 1;
		if(questions[key]["qcat"] == "stamina"){
			htmlStr1 += '<div class="questionBlock"><h4 class="question hard">'
			htmlStr1 += k + ". "
				+ questions[key]['qvalue']
				+ '</h4><input type="text" placeholder="How many seconds" class="fields" id="'
				+ questions[key].qid
				+ '"></div>';
		}
		if(questions[key]["qcat"] == "strength"){
			htmlStr2 += '<div class="questionBlock"><h4 class="question hard">'
			htmlStr2 += k + ". "
				+ questions[key]['qvalue']
				+ '</h4><input type="text" placeholder="How many seconds" class="fields" id="'
				+ questions[key].qid
				+ '"></div>';
		}
		if(questions[key]["qcat"] == "flexibility"){
			htmlStr3 += '<div class="questionBlock"><h4 class="question hard">'
			htmlStr3 += k + ". "
				+ questions[key]['qvalue']
				+ '</h4>';
			if(questions[key].qid == 9 || questions[key].qid == 19){
				htmlStr3 += '<input type="radio" id="q1a" name="'+ questions[key].qid +'" data-value="0"><label for="q1a">Above Shin</label><br>'
				+ '<input type="radio" id="q1b" name="'+ questions[key].qid +'" data-value="1"><label for="q1b">Shin</label><br>'
				+ '<input type="radio" id="q1c" name="'+ questions[key].qid +'" data-value="2"><label for="q1c">Ankle</label><br>'
				+ '<input type="radio" id="q1d" name="'+ questions[key].qid +'" data-value="3"><label for="q1d">Toes</label><br>'
				+ '<input type="radio" id="q1e" name="'+ questions[key].qid +'" data-value="4"><label for="q1e">Floor</label></div>';
			}
			else {
				htmlStr3 += '<input type="radio" id="q2a" name="'+ questions[key].qid +'" data-value="0"><label for="q2a">Knee</label><br>'
				+ '<input type="radio" id="q2b" name="'+ questions[key].qid +'" data-value="1"><label for="q2b">Below Knee</label><br>'
				+ '<input type="radio" id="q2c" name="'+ questions[key].qid +'" data-value="2"><label for="q2c">Shin</label><br>'
				+ '<input type="radio" id="q2d" name="'+ questions[key].qid +'" data-value="3"><label for="q2d">Ankle</label><br>'
				+ '<input type="radio" id="q2e" name="'+ questions[key].qid +'" data-value="4"><label for="q2e">Toes</label></div>';
			}
		}
	}
	container1.prepend(htmlStr1);
	container2.prepend(htmlStr2);
	container3.prepend(htmlStr3);
}

function validateStats(){

	var frm = $("#statsForm");
	var uName = frm.find("#userName");
	var uEmail = frm.find("#userEmail");
	var uMobile = frm.find("#userMobile");
	var uDob = frm.find("#userDob");
	var uHeight = frm.find("#userHeight");
	var uWeight = frm.find("#userWeight");

	if(!uName.val() || !testName(uName.val())){
		uName.addClass("error").focus();
		return false;
	}
	else {
		uName.removeClass("error");
	}
	if(!uMobile.val() || isNaN(uMobile.val()) || uMobile.val().length !== 10){
		uMobile.addClass("error").focus();
		return false;
	}
	else {
		uMobile.removeClass("error");
	}
	if(!uEmail.val() || !validateEmail(uEmail.val())){
		uEmail.addClass("error").focus();
		return false;
	}
	else {
		uEmail.removeClass("error");
	}
	if(!uHeight.val() || isNaN(uHeight.val()) || uHeight.val().length < 2 || uHeight.val().length > 3){
		uHeight.addClass("error").focus();
		return false;
	}
	else {
		uHeight.removeClass("error");
	}
	if(!uWeight.val() || isNaN(uWeight.val()) || uWeight.val().length < 2 || uWeight.val().length > 3){
		uWeight.addClass("error").focus();
		return false;
	}
	else {
		uWeight.removeClass("error");
	}
	if(!uDob.val() || !isDate(uDob.val())){
		uDob.addClass("error").focus();
		return false;
	}
	else {
		uDob.removeClass("error");
	}
	newTest.updateUser({
		"name":uName.val(),
		"email":uEmail.val(),
		"dob":uDob.val(),
		"mobile":uMobile.val(),
		"height":uHeight.val(),
		"weight":uWeight.val(),
		"sex":frm.find("#userSex option:selected").attr("data-value")
	});
	return true;
}

function fetchUser(email){
	var url = fetchEmailUrl + email;
	var exists = getData(url,"get",null);
	if(exists){
		switch (exists.responseCode) {
			case '1005':
				showPop("New user detected. Fill the details to continue");

				$('#part2 #statsForm')[0].reset();
				$('#part2 form .flexRow .info').detach();
				$('#part2 form input[type="hidden"]').attr("type","hidden");

				$('#part2 #userEmail').val(email);
				break;
			case '1000':
				var userData = exists.userProfileViewDTO;
				if(userData){
					$('#part2 #statsForm')[0].reset();
					$('#part2 form .flexRow .info').detach();
					$('#part2 form input[type="hidden"]').attr("type","hidden");

					$('#part2 #userEmail').val(userData["email"]).attr("type","hidden");
					var infoEmail = '<p class="info">'+ userData["email"] +'</p>';
					$('#part2 #userEmail').parent(".flexRow").append(infoEmail);

					$('#part2 #userName').val(userData["name"]).attr("type","hidden");
					var infoName = '<p class="info">'+ userData["name"] +'</p>';
					$('#part2 #userName').parent(".flexRow").append(infoName);

					$('#part2 #userMobile').val(userData["mobile"]).attr("type","hidden");
					var infoMobile = '<p class="info">'+ userData["mobile"] +'</p>';
					$('#part2 #userMobile').parent(".flexRow").append(infoMobile);

					$('#part2 #userWeight').val(userData["weight"]);
					$('#part2 #userHeight').val(userData["height"]);

					var dob = "";
					dob += userData.day + "-" + userData.valMonth + "-" + userData.valYear;
					$('#part2 #userDob').val(dob);

					if(userData.gender == "Male"){
						$('#part2 #userSex').val("m").find('option[value="m"]').prop("selected","selected");
						$('#part2 #userSex').find('option[value="f"]').removeProp("selected");
					}
					else {
						$('#part2 #userSex').val("f").find('option[value="f"]').prop("selected","selected");
						$('#part2 #userSex').find('option[value="m"]').removeProp("selected");
					}
				}
				break;
			default:
				showPop("Error. Please try again.");
		}
	}
}

function getData(url,type,dataString) {
    var result = null;
		if(!dataString){
			$.ajax({
	        url: url,
	        type: type,
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
		}
		else {
			$.ajax({
	        url: url,
	        type: type,
	        dataType: 'json',
					data: dataString,
	        async: false,
	        success: function(data) {
					result = data;
				},
				error: function(xhr, status, thrown)
				{
					showPop(thrown);
				}
	    });
		}
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

function oft() {
	var user = {
		"name":"",
		"dob":"",
		"age":"",
		"email":"",
		"mobile":"",
		"height":"",
		"weight":"",
		"bmi":"",
		"sex":"",
		"strength":"",
		"flexibility":"",
		"stamina":"",
		"overall":""
	}
	var answerArray = [];
	this.uploadScores = function(){
		var dataObj = {
		 "email":user.email,
		 "name":user.name,
		 "mobileNumber":user.mobile,
		 "height":user.height,
		 "weight":user.weight,
		 "gender":user.sex,
		 "dateOfBirth":user.dob.split("-").reverse().join("-"),
		 "scores":[
		  {
		   "categoryName":"strength",
		   "score":user.strength
		  },{
		   "categoryName":"stamina",
		   "score":user.stamina
		  },{
		   "categoryName":"flexibility",
		   "score":user.flexibility
		  }
		 ]
		};
		var updated = getData(submitScoreUrl,"post",JSON.stringify(dataObj));
		if(updated && updated.responseCode && updated.responseCode == "1000"){
			showPop("Score successfully updated");
		}
		else {
			showPop("Score not updated. Please check your data connection");
		}
	}
	this.getUserName = function(){
		return user.name;
	}
	this.updateUser = function(data){
		for(var key in data){
			user[key] = data[key];
		}
		if(user["height"] && user["weight"]){
			user["bmi"] = getBmi(user["height"],user["weight"]);
		}
		if(user["dob"]){
			user["age"] = getAge(user["dob"]);
		}
	};
	this.getUser = function(data){
		return user;
	}
	function getBmi(height,weight){
		var sq = (height * height)/10000;
		return weight/sq;
	}
	var getScore = function(answers, ageGroup, bmi, gender){
		var finalScores = {};
		for (var key in answers){
			var x = getQno(answers[key]["qid"]);
			bmiSlab = bmiCat(bmi);
			var opts = qdb["answers"][gender][ageGroup][bmiSlab][x];
			var currentAns = ""; var currentAnsCmp = "";
			for (var a in opts){
				switch (opts[a]["type"]) {
					case "eq":
						if(answers[key]["val"] == opts[a]["val"]){
							currentAns = opts[a]["ans"];
							currentAnsCmp = "eq";
						}
					break;
					case "ls":
						if(answers[key]["val"] < opts[a]["val"] && currentAnsCmp != "ls"){
							currentAns = opts[a]["ans"];
							currentAnsCmp = "ls";
						}
					break;
					case "le":
						if(answers[key]["val"] <= opts[a]["val"] && currentAnsCmp != "le"){
							currentAns = opts[a]["ans"];
							currentAnsCmp = "le";
						}
					break;
					case "gt":
						if(answers[key]["val"] > opts[a]["val"]){
							currentAns = opts[a]["ans"];
							currentAnsCmp = "gt";
						}
					break;
					case "ge":
						if(answers[key]["val"] >= opts[a]["val"]){
							currentAns = opts[a]["ans"];
							currentAnsCmp = "ge";
						}
					break;
					case "ne":
						if(answers[key]["val"] != opts[a]["val"]){
							currentAns = opts[a]["ans"];
							currentAnsCmp = "ne";
						}
					break;
				}
				if (a == (opts.length - 1)){
					finalScores[x]= currentAns;
					currentAns = ""; currentAnsCmp = "";
				}
			}
		}
		return finalScores;
	};
	function getStamScore(ans){
		var score = parseFloat(100*(parseInt(ans[1]) + parseInt(ans[2]) + parseInt(ans[3]))/60).toFixed(2);
		user.stamina = score;
		return score;
	};
	function getStrScore(ans){
		var score = parseFloat(100*(parseInt(ans[4]) + parseInt(ans[5]) + parseInt(ans[6]))/60).toFixed(2);
		user.strength = score;
		return score;
	};
	function getFlexScore(ans){
		var score = parseFloat(100*(parseInt(ans[7]) + parseInt(ans[8]))/40).toFixed(2);
		user.flexibility = score;
		return score;
	};
	this.updateStamina = function(formobj){
		$(formobj).find('input[type="text"]').each(function(){
			var last = answerArray.length - 1;
			if(answerArray.length > 0){
				var existFlag = false;
				for(var key in answerArray){
					if(answerArray[key]["qid"] == $(this).attr("id")){
						existFlag = !existFlag;
						answerArray[key]["val"] = $(this).val()
					}
					else if(key == last && existFlag == false){
						var tempobj = {
							"qid":$(this).attr("id"),
							"val":$(this).val()
						}
						answerArray.push(tempobj);
					}
				}
			}
			else{
				var tempobj = {
					"qid":$(this).attr("id"),
					"val":$(this).val()
				}
				answerArray.push(tempobj);
			}
		});
	};
	this.updateStrength = function(formobj){
		$(formobj).find('input[type="text"]').each(function(){
			var last = answerArray.length - 1;
			if(answerArray.length > 0){
				var existFlag = false;
				for(var key in answerArray){
					if(answerArray[key]["qid"] == $(this).attr("id")){
						existFlag = !existFlag;
						answerArray[key]["val"] = $(this).val()
					}
					else if(key == last && existFlag == false){
						var tempobj = {
							"qid":$(this).attr("id"),
							"val":$(this).val()
						}
						answerArray.push(tempobj);
					}
				}
			}
			else{
				var tempobj = {
					"qid":$(this).attr("id"),
					"val":$(this).val()
				}
				answerArray.push(tempobj);
			}
		});
	};
	this.updateFlexibility = function(formobj){
		$(formobj).find('input[type="radio"]').each(function(){
			if($(this).is(":checked")){
				var last = answerArray.length - 1;
				if(answerArray.length > 0){
					var existFlag = false;
					for(var key in answerArray){
						if(answerArray[key]["qid"] == $(this).attr("name")){
							existFlag = !existFlag;
							answerArray[key]["val"] = $(this).attr("data-value");
						}
						else if(key == last && existFlag == false){
							var tempobj = {
								"qid":$(this).attr("name"),
								"val":$(this).attr("data-value")
							}
							answerArray.push(tempobj);
						}
					}
				}
				else{
					var tempobj = {
						"qid":$(this).attr("name"),
						"val":$(this).attr("data-value")
					}
					answerArray.push(tempobj);
				}
			}
		});
	};
	this.processAnswers = function(){
		var ageGroup = getAgeGroup(user.age);
		var bmi = user.bmi;
		var gender = user.sex;
		var ans = getScore(answerArray, ageGroup, bmi, gender);
		var scores = {
			"stamina": getStamScore(ans),
			"strength": getStrScore(ans),
			"flexibility": getFlexScore(ans)
		}
		scores.overall = parseFloat((parseFloat(scores.stamina) + parseFloat(scores.strength) + parseFloat(scores.flexibility))/3).toFixed(2);
		return scores;
	};
	function getAge(dob){
		if(isDate(dob)){
			var dobArray = dob.split("-");
			var c = new Date().getTime();
			var birth = new Date(dobArray[2],dobArray[1],dobArray[0]).getTime();
			var years = parseInt((c - birth)/31536000000);
		}
		return years;
	}
	var getAgeGroup = function(years){
		if(years <= 22){
			return "grp1";
		}
		else if (years <= 35) {
			return "grp2";
		}
		else if (years <= 45) {
			return "grp3";
		}
		else if (years > 45) {
			return "grp4";
		}
	};
	var getQno = function(qId){
		var x;
		switch (parseInt(qId)) {
			case 1:
			case 2:
			case 3:
				x = qId;
			break;

			case 4:
			case 6:
				x = 4;
			break;

			case 5:
			case 7:
				x = 5;
			break;

			case 8:
				x = 6;
			break;

			case 9:
			case 10:
				x = qId - 2;
			break;

			case 11:
			case 12:
			case 13:
				x = qId - 10;
			break;

			case 14:
			case 16:
				x = 14;
			break;

			case 15:
			case 17:
				x = 15;
			break;

			case 18:
				x = 16;
			break;

			case 19:
			case 20:
				x = qId - 12;
			break;
		}
		return x;
	}
	function bmiCat(bmi){
		if(bmi && bmi < 28)
		{
			return "lt28";
		}
		else {
			return "gt28";
		}
	}
	this.getQuestions = function(){
		var result = [];
		var csex = user.sex; var cbmi = bmiCat(user.bmi);
		for(var key in qdb.questions){
			if(qdb.questions[key].sex == csex){
				if(qdb.questions[key].bmi == "any" || qdb.questions[key].bmi == cbmi){
					var qid = qdb.questions[key].qid;
					result.push({
						"qid":qid,
						"qvalue":qdb.questions[key].qvalue,
						"qcat":qdb.questions[key].category
					});
				}
			}
		}
		return result;
	}
	var qdb = {
		"version":"1.0",
		"author":"Orobind",
		"created":"26-11-2015",
		"questions":[
			{
				'qvalue':'How many seconds of <span class="key">Jumping Jacks</span> was he able to do?',
				'qid':1,
				'priority':1,
				'sex':'m',
				'bmi':'any',
				'category':'stamina'
			},{
				'qvalue':'How many seconds of <span class="key">Foot Fire</span> was he able to do?',
				'qid':2,
				'priority':2,
				'sex':'m',
				'bmi':'any',
				'category':'stamina'
			},{
				'qvalue':'How many seconds of <span class="key">High Knees</span> was he able to do?',
				'qid':3,
				'priority':3,
				'sex':'m',
				'bmi':'any',
				'category':'stamina'
			},{
				'qvalue':'How many <span class="key">Pushups</span> was he able to do?',
				'qid':4,
				'priority':1,
				'sex':'m',
				'bmi':'lt28',
				'category':'strength'
			},{
				'qvalue':'How many <span class="key">Full Squats</span> was he able to do?',
				'qid':5,
				'priority':2,
				'sex':'m',
				'bmi':'lt28',
				'category':'strength'
			},{
				'qvalue':'How many <span class="key">Knee Pushups</span> was he able to do?',
				'qid':6,
				'priority':1,
				'sex':'m',
				'bmi':'gt28',
				'category':'strength'
			},{
				'qvalue':'How many <span class="key">Half Squats</span> was he able to do?',
				'qid':7,
				'priority':2,
				'sex':'m',
				'bmi':'gt28',
				'category':'strength'
			},{
				'qvalue':'How many seconds was he able to hold <span class="key">Plank</span>?',
				'qid':8,
				'priority':3,
				'sex':'m',
				'bmi':'any',
				'category':'strength'
			},{
				'qvalue':'Ask the user to perform <span class="key">Toe Touch</span> and hold in that position for 10 seconds. Where were the hands after 10 seconds?',
				'qid':9,
				'priority':1,
				'sex':'m',
				'bmi':'any',
				'category':'flexibility'
			},{
				'qvalue':'Ask the user to perform <span class="key">Side Bend Toe Touch</span> and hold in that position for 10 seconds. Where was the hand after 10 seconds?',
				'qid':10,
				'priority':2,
				'sex':'m',
				'bmi':'any',
				'category':'flexibility'
			},{
				'qvalue':'How many seconds of <span class="key">Jumping Jacks</span> was she able to do?',
				'qid':11,
				'priority':1,
				'sex':'f',
				'bmi':'any',
				'category':'stamina'
			},{
				'qvalue':'How many seconds of <span class="key">Foot Fire</span> was she able to do?',
				'qid':12,
				'priority':2,
				'sex':'f',
				'bmi':'any',
				'category':'stamina'
			},{
				'qvalue':'How many seconds of <span class="key">High Knees</span> was she able to do?',
				'qid':13,
				'priority':3,
				'sex':'f',
				'bmi':'any',
				'category':'stamina'
			},{
				'qvalue':'How many <span class="key">Knee Pushups</span> was she able to do?',
				'qid':14,
				'priority':1,
				'sex':'f',
				'bmi':'lt28',
				'category':'strength'
			},{
				'qvalue':'How many <span class="key">Full Squats</span> was she able to do?',
				'qid':15,
				'priority':2,
				'sex':'f',
				'bmi':'lt28',
				'category':'strength'
			},{
				'qvalue':'How many <span class="key">Wall Pushups</span> was she able to do?',
				'qid':16,
				'priority':1,
				'sex':'f',
				'bmi':'gt28',
				'category':'strength'
			},{
				'qvalue':'How many <span class="key">Half Squats</span> was she able to do?',
				'qid':17,
				'priority':2,
				'sex':'f',
				'bmi':'gt28',
				'category':'strength'
			},{
				'qvalue':'How many seconds was she able to hold <span class="key">Plank</span>?',
				'qid':18,
				'priority':3,
				'sex':'f',
				'bmi':'any',
				'category':'strength'
			},{
				'qvalue':'Ask the user to perform <span class="key">Toe Touch</span> and hold in that position for 10 seconds. Where were the hands after 10 seconds?',
				'qid':19,
				'priority':1,
				'sex':'f',
				'bmi':'any',
				'category':'flexibility'
			},{
				'qvalue':'Ask the user to perform <span class="key">Side Bend Toe Touch</span> and hold in that position for 10 seconds. Where were the hands after 10 seconds?',
				'qid':20,
				'priority':2,
				'sex':'f',
				'bmi':'any',
				'category':'flexibility'
			}
		],
		"answers":{
			"m":{
				"grp1":{
					"lt28":{
						"1":[
							{"type":"ls","val":"180","ans":"5"},
							{"type":"ls","val":"300","ans":"10"},
							{"type":"ls","val":"390","ans":"15"},
							{"type":"gt","val":"390","ans":"20"}
						],
						"2":[
							{"type":"ls","val":"150","ans":"5"},
							{"type":"ls","val":"240","ans":"10"},
							{"type":"ls","val":"360","ans":"15"},
							{"type":"gt","val":"360","ans":"20"}
						],
						"3":[
							{"type":"ls","val":"120","ans":"5"},
							{"type":"ls","val":"180","ans":"10"},
							{"type":"ls","val":"270","ans":"15"},
							{"type":"gt","val":"270","ans":"20"}
						],
						"4":[
							{"type":"ls","val":"25","ans":"5"},
							{"type":"ls","val":"35","ans":"10"},
							{"type":"ls","val":"50","ans":"15"},
							{"type":"gt","val":"50","ans":"20"}
						],
						"5":[
							{"type":"ls","val":"25","ans":"5"},
							{"type":"ls","val":"35","ans":"10"},
							{"type":"ls","val":"45","ans":"15"},
							{"type":"gt","val":"45","ans":"20"}
						],
						"6":[
							{"type":"ls","val":"90","ans":"5"},
							{"type":"ls","val":"150","ans":"10"},
							{"type":"ls","val":"180","ans":"15"},
							{"type":"gt","val":"180","ans":"20"}
						],
						"7":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						],
						"8":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						]
					},
					"gt28":{
						"1":[
							{"type":"ls","val":"180","ans":"5"},
							{"type":"ls","val":"300","ans":"10"},
							{"type":"ls","val":"390","ans":"15"},
							{"type":"gt","val":"390","ans":"20"}
						],
						"2":[
							{"type":"ls","val":"150","ans":"5"},
							{"type":"ls","val":"240","ans":"10"},
							{"type":"ls","val":"360","ans":"15"},
							{"type":"gt","val":"360","ans":"20"}
						],
						"3":[
							{"type":"ls","val":"120","ans":"5"},
							{"type":"ls","val":"180","ans":"10"},
							{"type":"ls","val":"270","ans":"15"},
							{"type":"gt","val":"270","ans":"20"}
						],
						"4":[
							{"type":"ls","val":"15","ans":"5"},
							{"type":"ls","val":"25","ans":"10"},
							{"type":"ls","val":"35","ans":"15"},
							{"type":"gt","val":"35","ans":"20"}
						],
						"5":[
							{"type":"ls","val":"20","ans":"5"},
							{"type":"ls","val":"25","ans":"10"},
							{"type":"ls","val":"30","ans":"15"},
							{"type":"gt","val":"30","ans":"20"}
						],
						"6":[
							{"type":"ls","val":"90","ans":"5"},
							{"type":"ls","val":"150","ans":"10"},
							{"type":"ls","val":"180","ans":"15"},
							{"type":"gt","val":"180","ans":"20"}
						],
						"7":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						],
						"8":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						]
					}
				},
				"grp2":{
					"lt28":{
						"1":[
							{"type":"ls","val":"150","ans":"5"},
							{"type":"ls","val":"240","ans":"10"},
							{"type":"ls","val":"360","ans":"15"},
							{"type":"gt","val":"360","ans":"20"}
						],
						"2":[
							{"type":"ls","val":"120","ans":"5"},
							{"type":"ls","val":"210","ans":"10"},
							{"type":"ls","val":"300","ans":"15"},
							{"type":"gt","val":"300","ans":"20"}
						],
						"3":[
							{"type":"ls","val":"90","ans":"5"},
							{"type":"ls","val":"150","ans":"10"},
							{"type":"ls","val":"210","ans":"15"},
							{"type":"gt","val":"210","ans":"20"}
						],
						"4":[
							{"type":"ls","val":"20","ans":"5"},
							{"type":"ls","val":"30","ans":"10"},
							{"type":"ls","val":"45","ans":"15"},
							{"type":"gt","val":"45","ans":"20"}
						],
						"5":[
							{"type":"ls","val":"20","ans":"5"},
							{"type":"ls","val":"30","ans":"10"},
							{"type":"ls","val":"40","ans":"15"},
							{"type":"gt","val":"40","ans":"20"}
						],
						"6":[
							{"type":"ls","val":"60","ans":"5"},
							{"type":"ls","val":"90","ans":"10"},
							{"type":"ls","val":"120","ans":"15"},
							{"type":"gt","val":"120","ans":"20"}
						],
						"7":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						],
						"8":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						]
					},
					"gt28":{
						"1":[
							{"type":"ls","val":"150","ans":"5"},
							{"type":"ls","val":"240","ans":"10"},
							{"type":"ls","val":"360","ans":"15"},
							{"type":"gt","val":"360","ans":"20"}
						],
						"2":[
							{"type":"ls","val":"120","ans":"5"},
							{"type":"ls","val":"210","ans":"10"},
							{"type":"ls","val":"300","ans":"15"},
							{"type":"gt","val":"300","ans":"20"}
						],
						"3":[
							{"type":"ls","val":"90","ans":"5"},
							{"type":"ls","val":"150","ans":"10"},
							{"type":"ls","val":"210","ans":"15"},
							{"type":"gt","val":"210","ans":"20"}
						],
						"4":[
							{"type":"ls","val":"10","ans":"5"},
							{"type":"ls","val":"20","ans":"10"},
							{"type":"ls","val":"30","ans":"15"},
							{"type":"gt","val":"30","ans":"20"}
						],
						"5":[
							{"type":"ls","val":"15","ans":"5"},
							{"type":"ls","val":"20","ans":"10"},
							{"type":"ls","val":"25","ans":"15"},
							{"type":"gt","val":"25","ans":"20"}
						],
						"6":[
							{"type":"ls","val":"60","ans":"5"},
							{"type":"ls","val":"90","ans":"10"},
							{"type":"ls","val":"120","ans":"15"},
							{"type":"gt","val":"120","ans":"20"}
						],
						"7":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						],
						"8":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						]
					}
				},
				"grp3":{
					"lt28":{
						"1":[
							{"type":"ls","val":"90","ans":"5"},
							{"type":"ls","val":"180","ans":"10"},
							{"type":"ls","val":"240","ans":"15"},
							{"type":"gt","val":"240","ans":"20"}
						],
						"2":[
							{"type":"ls","val":"60","ans":"5"},
							{"type":"ls","val":"120","ans":"10"},
							{"type":"ls","val":"210","ans":"15"},
							{"type":"gt","val":"210","ans":"20"}
						],
						"3":[
							{"type":"ls","val":"45","ans":"5"},
							{"type":"ls","val":"90","ans":"10"},
							{"type":"ls","val":"150","ans":"15"},
							{"type":"gt","val":"150","ans":"20"}
						],
						"4":[
							{"type":"ls","val":"15","ans":"5"},
							{"type":"ls","val":"25","ans":"10"},
							{"type":"ls","val":"35","ans":"15"},
							{"type":"gt","val":"35","ans":"20"}
						],
						"5":[
							{"type":"ls","val":"15","ans":"5"},
							{"type":"ls","val":"25","ans":"10"},
							{"type":"ls","val":"30","ans":"15"},
							{"type":"gt","val":"30","ans":"20"}
						],
						"6":[
							{"type":"ls","val":"45","ans":"5"},
							{"type":"ls","val":"60","ans":"10"},
							{"type":"ls","val":"90","ans":"15"},
							{"type":"gt","val":"90","ans":"20"}
						],
						"7":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						],
						"8":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						]
					},
					"gt28":{
						"1":[
							{"type":"ls","val":"90","ans":"5"},
							{"type":"ls","val":"180","ans":"10"},
							{"type":"ls","val":"240","ans":"15"},
							{"type":"gt","val":"240","ans":"20"}
						],
						"2":[
							{"type":"ls","val":"60","ans":"5"},
							{"type":"ls","val":"120","ans":"10"},
							{"type":"ls","val":"210","ans":"15"},
							{"type":"gt","val":"210","ans":"20"}
						],
						"3":[
							{"type":"ls","val":"45","ans":"5"},
							{"type":"ls","val":"90","ans":"10"},
							{"type":"ls","val":"150","ans":"15"},
							{"type":"gt","val":"150","ans":"20"}
						],
						"4":[
							{"type":"ls","val":"8","ans":"5"},
							{"type":"ls","val":"15","ans":"10"},
							{"type":"ls","val":"25","ans":"15"},
							{"type":"gt","val":"25","ans":"20"}
						],
						"5":[
							{"type":"ls","val":"10","ans":"5"},
							{"type":"ls","val":"15","ans":"10"},
							{"type":"ls","val":"20","ans":"15"},
							{"type":"gt","val":"20","ans":"20"}
						],
						"6":[
							{"type":"ls","val":"45","ans":"5"},
							{"type":"ls","val":"60","ans":"10"},
							{"type":"ls","val":"90","ans":"15"},
							{"type":"gt","val":"90","ans":"20"}
						],
						"7":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						],
						"8":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						]
					}
				},
				"grp4":{
					"lt28":{
						"1":[
							{"type":"ls","val":"45","ans":"5"},
							{"type":"ls","val":"120","ans":"10"},
							{"type":"ls","val":"180","ans":"15"},
							{"type":"gt","val":"180","ans":"20"}
						],
						"2":[
							{"type":"ls","val":"30","ans":"5"},
							{"type":"ls","val":"60","ans":"10"},
							{"type":"ls","val":"120","ans":"15"},
							{"type":"gt","val":"120","ans":"20"}
						],
						"3":[
							{"type":"ls","val":"30","ans":"5"},
							{"type":"ls","val":"60","ans":"10"},
							{"type":"ls","val":"90","ans":"15"},
							{"type":"gt","val":"90","ans":"20"}
						],
						"4":[
							{"type":"ls","val":"10","ans":"5"},
							{"type":"ls","val":"15","ans":"10"},
							{"type":"ls","val":"25","ans":"15"},
							{"type":"gt","val":"25","ans":"20"}
						],
						"5":[
							{"type":"ls","val":"10","ans":"5"},
							{"type":"ls","val":"15","ans":"10"},
							{"type":"ls","val":"20","ans":"15"},
							{"type":"gt","val":"20","ans":"20"}
						],
						"6":[
							{"type":"ls","val":"30","ans":"5"},
							{"type":"ls","val":"45","ans":"10"},
							{"type":"ls","val":"60","ans":"15"},
							{"type":"gt","val":"60","ans":"20"}
						],
						"7":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						],
						"8":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						]
					},
					"gt28":{
						"1":[
							{"type":"ls","val":"45","ans":"5"},
							{"type":"ls","val":"120","ans":"10"},
							{"type":"ls","val":"180","ans":"15"},
							{"type":"gt","val":"180","ans":"20"}
						],
						"2":[
							{"type":"ls","val":"30","ans":"5"},
							{"type":"ls","val":"60","ans":"10"},
							{"type":"ls","val":"120","ans":"15"},
							{"type":"gt","val":"120","ans":"20"}
						],
						"3":[
							{"type":"ls","val":"30","ans":"5"},
							{"type":"ls","val":"60","ans":"10"},
							{"type":"ls","val":"90","ans":"15"},
							{"type":"gt","val":"90","ans":"20"}
						],
						"4":[
							{"type":"ls","val":"5","ans":"5"},
							{"type":"ls","val":"10","ans":"10"},
							{"type":"ls","val":"15","ans":"15"},
							{"type":"gt","val":"15","ans":"20"}
						],
						"5":[
							{"type":"ls","val":"5","ans":"5"},
							{"type":"ls","val":"10","ans":"10"},
							{"type":"ls","val":"20","ans":"15"},
							{"type":"gt","val":"20","ans":"20"}
						],
						"6":[
							{"type":"ls","val":"30","ans":"5"},
							{"type":"ls","val":"45","ans":"10"},
							{"type":"ls","val":"60","ans":"15"},
							{"type":"gt","val":"60","ans":"20"}
						],
						"7":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						],
						"8":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						]
					}
				}
			},
			"f":{
				"grp1":{
					"lt28":{
						"1":[
							{"type":"ls","val":"90","ans":"5"},
							{"type":"ls","val":"150","ans":"10"},
							{"type":"ls","val":"210","ans":"15"},
							{"type":"gt","val":"210","ans":"20"}
						],
						"2":[
							{"type":"ls","val":"60","ans":"5"},
							{"type":"ls","val":"120","ans":"10"},
							{"type":"ls","val":"150","ans":"15"},
							{"type":"gt","val":"150","ans":"20"}
						],
						"3":[
							{"type":"ls","val":"45","ans":"5"},
							{"type":"ls","val":"90","ans":"10"},
							{"type":"ls","val":"120","ans":"15"},
							{"type":"gt","val":"120","ans":"20"}
						],
						"4":[
							{"type":"ls","val":"20","ans":"5"},
							{"type":"ls","val":"30","ans":"10"},
							{"type":"ls","val":"35","ans":"15"},
							{"type":"gt","val":"35","ans":"20"}
						],
						"5":[
							{"type":"ls","val":"20","ans":"5"},
							{"type":"ls","val":"25","ans":"10"},
							{"type":"ls","val":"30","ans":"15"},
							{"type":"gt","val":"30","ans":"20"}
						],
						"6":[
							{"type":"ls","val":"40","ans":"5"},
							{"type":"ls","val":"60","ans":"10"},
							{"type":"ls","val":"90","ans":"15"},
							{"type":"gt","val":"90","ans":"20"}
						],
						"7":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						],
						"8":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						]
					},
					"gt28":{
						"1":[
							{"type":"ls","val":"90","ans":"5"},
							{"type":"ls","val":"150","ans":"10"},
							{"type":"ls","val":"210","ans":"15"},
							{"type":"gt","val":"210","ans":"20"}
						],
						"2":[
							{"type":"ls","val":"60","ans":"5"},
							{"type":"ls","val":"120","ans":"10"},
							{"type":"ls","val":"150","ans":"15"},
							{"type":"gt","val":"150","ans":"20"}
						],
						"3":[
							{"type":"ls","val":"45","ans":"5"},
							{"type":"ls","val":"90","ans":"10"},
							{"type":"ls","val":"120","ans":"15"},
							{"type":"gt","val":"120","ans":"20"}
						],
						"4":[
							{"type":"ls","val":"15","ans":"5"},
							{"type":"ls","val":"20","ans":"10"},
							{"type":"ls","val":"25","ans":"15"},
							{"type":"gt","val":"25","ans":"20"}
						],
						"5":[
							{"type":"ls","val":"12","ans":"5"},
							{"type":"ls","val":"15","ans":"10"},
							{"type":"ls","val":"20","ans":"15"},
							{"type":"gt","val":"20","ans":"20"}
						],
						"6":[
							{"type":"ls","val":"40","ans":"5"},
							{"type":"ls","val":"60","ans":"10"},
							{"type":"ls","val":"90","ans":"15"},
							{"type":"gt","val":"90","ans":"20"}
						],
						"7":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						],
						"8":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						]
					}
				},
				"grp2":{
					"lt28":{
						"1":[
							{"type":"ls","val":"60","ans":"5"},
							{"type":"ls","val":"120","ans":"10"},
							{"type":"ls","val":"180","ans":"15"},
							{"type":"gt","val":"180","ans":"20"}
						],
						"2":[
							{"type":"ls","val":"45","ans":"5"},
							{"type":"ls","val":"90","ans":"10"},
							{"type":"ls","val":"120","ans":"15"},
							{"type":"gt","val":"120","ans":"20"}
						],
						"3":[
							{"type":"ls","val":"30","ans":"5"},
							{"type":"ls","val":"60","ans":"10"},
							{"type":"ls","val":"90","ans":"15"},
							{"type":"gt","val":"90","ans":"20"}
						],
						"4":[
							{"type":"ls","val":"15","ans":"5"},
							{"type":"ls","val":"25","ans":"10"},
							{"type":"ls","val":"30","ans":"15"},
							{"type":"gt","val":"30","ans":"20"}
						],
						"5":[
							{"type":"ls","val":"15","ans":"5"},
							{"type":"ls","val":"20","ans":"10"},
							{"type":"ls","val":"25","ans":"15"},
							{"type":"gt","val":"25","ans":"20"}
						],
						"6":[
							{"type":"ls","val":"35","ans":"5"},
							{"type":"ls","val":"50","ans":"10"},
							{"type":"ls","val":"60","ans":"15"},
							{"type":"gt","val":"60","ans":"20"}
						],
						"7":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						],
						"8":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						]
					},
					"gt28":{
						"1":[
							{"type":"ls","val":"60","ans":"5"},
							{"type":"ls","val":"120","ans":"10"},
							{"type":"ls","val":"180","ans":"15"},
							{"type":"gt","val":"180","ans":"20"}
						],
						"2":[
							{"type":"ls","val":"45","ans":"5"},
							{"type":"ls","val":"90","ans":"10"},
							{"type":"ls","val":"120","ans":"15"},
							{"type":"gt","val":"120","ans":"20"}
						],
						"3":[
							{"type":"ls","val":"30","ans":"5"},
							{"type":"ls","val":"60","ans":"10"},
							{"type":"ls","val":"90","ans":"15"},
							{"type":"gt","val":"90","ans":"20"}
						],
						"4":[
							{"type":"ls","val":"12","ans":"5"},
							{"type":"ls","val":"15","ans":"10"},
							{"type":"ls","val":"20","ans":"15"},
							{"type":"gt","val":"20","ans":"20"}
						],
						"5":[
							{"type":"ls","val":"10","ans":"5"},
							{"type":"ls","val":"12","ans":"10"},
							{"type":"ls","val":"15","ans":"15"},
							{"type":"gt","val":"15","ans":"20"}
						],
						"6":[
							{"type":"ls","val":"35","ans":"5"},
							{"type":"ls","val":"50","ans":"10"},
							{"type":"ls","val":"60","ans":"15"},
							{"type":"gt","val":"60","ans":"20"}
						],
						"7":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						],
						"8":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						]
					}
				},
				"grp3":{
					"lt28":{
						"1":[
							{"type":"ls","val":"45","ans":"5"},
							{"type":"ls","val":"120","ans":"10"},
							{"type":"ls","val":"90","ans":"15"},
							{"type":"gt","val":"90","ans":"20"}
						],
						"2":[
							{"type":"ls","val":"30","ans":"5"},
							{"type":"ls","val":"60","ans":"10"},
							{"type":"ls","val":"90","ans":"15"},
							{"type":"gt","val":"90","ans":"20"}
						],
						"3":[
							{"type":"ls","val":"20","ans":"5"},
							{"type":"ls","val":"45","ans":"10"},
							{"type":"ls","val":"60","ans":"15"},
							{"type":"gt","val":"60","ans":"20"}
						],
						"4":[
							{"type":"ls","val":"10","ans":"5"},
							{"type":"ls","val":"20","ans":"10"},
							{"type":"ls","val":"25","ans":"15"},
							{"type":"gt","val":"25","ans":"20"}
						],
						"5":[
							{"type":"ls","val":"10","ans":"5"},
							{"type":"ls","val":"15","ans":"10"},
							{"type":"ls","val":"20","ans":"15"},
							{"type":"gt","val":"20","ans":"20"}
						],
						"6":[
							{"type":"ls","val":"30","ans":"5"},
							{"type":"ls","val":"40","ans":"10"},
							{"type":"ls","val":"45","ans":"15"},
							{"type":"gt","val":"45","ans":"20"}
						],
						"7":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						],
						"8":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						]
					},
					"gt28":{
						"1":[
							{"type":"ls","val":"45","ans":"5"},
							{"type":"ls","val":"120","ans":"10"},
							{"type":"ls","val":"90","ans":"15"},
							{"type":"gt","val":"90","ans":"20"}
						],
						"2":[
							{"type":"ls","val":"30","ans":"5"},
							{"type":"ls","val":"60","ans":"10"},
							{"type":"ls","val":"90","ans":"15"},
							{"type":"gt","val":"90","ans":"20"}
						],
						"3":[
							{"type":"ls","val":"20","ans":"5"},
							{"type":"ls","val":"45","ans":"10"},
							{"type":"ls","val":"60","ans":"15"},
							{"type":"gt","val":"60","ans":"20"}
						],
						"4":[
							{"type":"ls","val":"8","ans":"5"},
							{"type":"ls","val":"10","ans":"10"},
							{"type":"ls","val":"15","ans":"15"},
							{"type":"gt","val":"15","ans":"20"}
						],
						"5":[
							{"type":"ls","val":"8","ans":"5"},
							{"type":"ls","val":"10","ans":"10"},
							{"type":"ls","val":"12","ans":"15"},
							{"type":"gt","val":"12","ans":"20"}
						],
						"6":[
							{"type":"ls","val":"30","ans":"5"},
							{"type":"ls","val":"40","ans":"10"},
							{"type":"ls","val":"45","ans":"15"},
							{"type":"gt","val":"45","ans":"20"}
						],
						"7":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						],
						"8":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						]
					}
				},
				"grp4":{
					"lt28":{
						"1":[
							{"type":"ls","val":"30","ans":"5"},
							{"type":"ls","val":"60","ans":"10"},
							{"type":"ls","val":"90","ans":"15"},
							{"type":"gt","val":"90","ans":"20"}
						],
						"2":[
							{"type":"ls","val":"30","ans":"5"},
							{"type":"ls","val":"45","ans":"10"},
							{"type":"ls","val":"60","ans":"15"},
							{"type":"gt","val":"60","ans":"20"}
						],
						"3":[
							{"type":"ls","val":"10","ans":"5"},
							{"type":"ls","val":"30","ans":"10"},
							{"type":"ls","val":"45","ans":"15"},
							{"type":"gt","val":"45","ans":"20"}
						],
						"4":[
							{"type":"ls","val":"5","ans":"5"},
							{"type":"ls","val":"15","ans":"10"},
							{"type":"ls","val":"20","ans":"15"},
							{"type":"gt","val":"20","ans":"20"}
						],
						"5":[
							{"type":"ls","val":"5","ans":"5"},
							{"type":"ls","val":"10","ans":"10"},
							{"type":"ls","val":"15","ans":"15"},
							{"type":"gt","val":"15","ans":"20"}
						],
						"6":[
							{"type":"ls","val":"20","ans":"5"},
							{"type":"ls","val":"25","ans":"10"},
							{"type":"ls","val":"30","ans":"15"},
							{"type":"gt","val":"30","ans":"20"}
						],
						"7":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						],
						"8":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						]
					},
					"gt28":{
						"1":[
							{"type":"ls","val":"30","ans":"5"},
							{"type":"ls","val":"60","ans":"10"},
							{"type":"ls","val":"90","ans":"15"},
							{"type":"gt","val":"90","ans":"20"}
						],
						"2":[
							{"type":"ls","val":"30","ans":"5"},
							{"type":"ls","val":"45","ans":"10"},
							{"type":"ls","val":"60","ans":"15"},
							{"type":"gt","val":"60","ans":"20"}
						],
						"3":[
							{"type":"ls","val":"10","ans":"5"},
							{"type":"ls","val":"30","ans":"10"},
							{"type":"ls","val":"45","ans":"15"},
							{"type":"gt","val":"45","ans":"20"}
						],
						"4":[
							{"type":"ls","val":"5","ans":"5"},
							{"type":"ls","val":"8","ans":"10"},
							{"type":"ls","val":"12","ans":"15"},
							{"type":"gt","val":"12","ans":"20"}
						],
						"5":[
							{"type":"ls","val":"5","ans":"5"},
							{"type":"ls","val":"8","ans":"10"},
							{"type":"ls","val":"10","ans":"15"},
							{"type":"gt","val":"10","ans":"20"}
						],
						"6":[
							{"type":"ls","val":"20","ans":"5"},
							{"type":"ls","val":"25","ans":"10"},
							{"type":"ls","val":"30","ans":"15"},
							{"type":"gt","val":"30","ans":"20"}
						],
						"7":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						],
						"8":[
							{"type":"eq","val":"1","ans":"5"},
							{"type":"eq","val":"2","ans":"10"},
							{"type":"eq","val":"3","ans":"15"},
							{"type":"eq","val":"4","ans":"20"}
						]
					}
				}
			}
		}
	};
}
