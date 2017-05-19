var baseUrl = window.location.protocol+'//'+window.location.host+'/';
var initialize_url = baseUrl+'onboard/initialize';
var update_url = baseUrl+'onboard/update';

$(document).ready(function(){
	tweakForMissingButton();
	$("form").each(function(){
		this.reset();
	});
	if(isMac()){
		$('body').addClass('mac');
	}
	$('input[name="userDob"]').datetimepicker({
		timepicker:false,
		format: 'd-m-Y',
		maxDate: '0',
		startDate: '1975/01/01',
		onChangeDateTime: function(){
			$('input[name="userDob"]').datetimepicker('hide');
		}
	});
	$(".connectCta.email").click(function(){
		analytics.track("Connect with email button clicked");
		$(".inner.part1, .inner.part8").slideToggle(250);
	});
	$(".existingLink").click(function(e){
		analytics.track("Already have an account link clicked");
		e.preventDefault(); e.stopPropagation();
		$(".inner.part1, .inner.part6").slideToggle(250);
	});
	$(".forgotPwLink").click(function(e){
		analytics.track("Forgot password clicked");
		e.preventDefault(); e.stopPropagation();
		$(".inner.part8, .inner.part7").slideToggle(250);
	});
	$(".backTo").click(function(e){
		e.preventDefault(); e.stopPropagation();
		if($(this).hasClass("connect"))
		{
			analytics.track("Back link clicked - existing user login form");
			$(".inner.part6, .inner.part1").slideToggle(250);
		}
		else if($(this).hasClass("signin"))
		{
			analytics.track("Back link clicked - forgot password form");
			$(".inner.part6, .inner.part7").slideToggle(250);
		}
		else if($(this).hasClass("connect2"))
		{
			analytics.track("Back link clicked - check email exists form");
			$('.inner.part8 .formRow.emailRow input').prop('readonly',false);
			$('.inner.part8 .formRow.emailRow input').val('');
			$('.inner.part8 .formRow.pwdRow input').val('');
			$('.inner.part8 .pwdRow, .inner.part8 .ctaRow, .inner.part8 .forgot').hide();
			$('button.checkCta').show();
			$(".inner.part8, .inner.part1").slideToggle(250);
		}
	});
	$(".testiFormCta").click(function(e){
		e.preventDefault(); e.stopPropagation();
		analytics.track("Continue button clicked after filling step 1");
		submitForm("part2",$(this).parents('form'));
	});
	$(".continueCta").click(function(e){
		e.preventDefault(); e.stopPropagation();
		analytics.track("Continue button clicked after filling step 2");
		submitForm("part3",$(this).parents('form'));
	});
	$(".fbLink").click(function(e){
		analytics.trackLink(this,"Read reviews button clicked");
	});
	$(".completeCta").click(function(e){
		e.preventDefault(); e.stopPropagation();
		if(ifselected($(this).parents('form')[0])){
			analytics.track("Complete button clicked after choosing plan in step 3");
			submitForm("part4",$(this).parents('form'));
		}
	});
	$("input.condition").change(function(){
		if($(this).attr("id") == "condition9")
		{
			$(this).parents(".formRow").siblings(".others").slideToggle(250);
			$(this).parents(".formRow").siblings(".others").children('textarea').val('');
		}
	})
});

function ifselected(frm) {
	var flag = true;
	$(frm).find('select').each(function(){
		if($(this).find('option:selected').is(':disabled')){
			$(this).parent('.select').addClass('error');
			flag = false;
		}
		else {
			$(this).parent('.select').removeClass('error');
			if(flag){
				flag = true;
			}
		}
	});
	return flag;
}

function submitForm(part,frm) {
	switch(part){
		case "part1":
			$(".inner.part1, .inner.part2").slideToggle(250);
		break;
		case "part2":
			if(validateForm1(frm))
			{
				initiateOnboarding(frm);
			}
		break;
		case "part3":
			if(validateForm2(frm))
			{
				updateOnboarding1(frm);
			}
		break;
		case "part4":
			updateOnboarding2(frm);
		break;
	}
}

function validateForm1(obj) {
	var isFormValid = true;
	$(obj).find('input, select').removeClass('error');
	var uname = $(obj).find('input[name="userName"]').val();
	var email = $(obj).find('input[name="userEmail"]').val();
	var mobile = $(obj).find('input[name="mobile"]').val();
	var password = $(obj).find('input[name="password"]').val();
	var city = $(obj).find('select[name="city"] option:selected').val();
	var goal = $(obj).find('select[name="goal"] option:selected').val();

	if(uname == "" || !testName(uname))
	{
		$(obj).find('input[name="userName"]').addClass("error");
		isFormValid = false;
	}
	else {
		$(obj).find('input[name="userName"]').removeClass("error")
	}
	if(email == "" || !validateEmail(email))
	{
		$(obj).find('input[name="userEmail"]').addClass("error");
		isFormValid = false;
	}
	else {
		$(obj).find('input[name="userEmail"]').removeClass("error")
	}
	if(mobile == "" || isNaN(mobile) || mobile.length != 10)
	{
		$(obj).find('input[name="mobile"]').addClass("error");
		isFormValid = false;
	}
	else {
		$(obj).find('input[name="mobile"]').removeClass("error")
	}
	if(ifselected(obj)){
		isFormValid = true;
	}
	else {
		isFormValid = false;
	}
	if(window.profileObj['mode'] == 'signup'){
		if(password == "" || password.length < 6)
		{
			$(obj).find('input[name="password"]').addClass("error");
			showPop('Password should contain at least 6 characters.');
			isFormValid = false;
		}
		else {
			$(obj).find('input[name="password"]').removeClass("error")
		}
	}
	return isFormValid;
}

function validateForm2(obj) {
	var dob = $(obj).find('input[name="userDob"]').val();
	if(dob == "" || !isDate(dob))
	{
		$(obj).find('input[name="userDob"]').addClass("error").focus();
		return false;
	}
	else {
		$(obj).find('input[name="userDob"]').removeClass("error")
	}
	var selcheck = ifselected(obj);
	if(!selcheck){
		return false;
	}
	var boxcheck = checkedObj($(obj).find('.condition'));
	if(!boxcheck){
		$(obj).find('.condition').parent('.formRow').addClass('error');
		return false;
	}
	else {
		$(obj).find('.condition').parent('.formRow').removeClass('error');
	}
	if($(obj).find('textarea[name="comments"]').is(':visible')){
		if($(obj).find('textarea[name="comments"]').val() == ""){
			$(obj).find('textarea[name="comments"]').addClass('error');
			return false;
		}
		else {
			$(obj).find('textarea[name="comments"]').removeClass('error');
		}
	}
	else {
		$(obj).find('textarea[name="comments"]').removeClass('error');
	}
	return true;
}

function checkedObj(collection){
	var flag = false, flagCount = 0;
	$(collection).each(function(index){
		if($(this).is(":checked")){
			flagCount++;
			if($(this).is(":last-of-type")){
				flag = true;
			}
		}
		else {
			flag = false;
			if($(this).is(":last-of-type") && flagCount > 0){
				flag = true;
			}
		}
	});
	return flag;
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

function initiateOnboarding(frm){
	var uname = $(frm).find('input[name="userName"]').val();
	var email = $(frm).find('input[name="userEmail"]').val();
	var mobile = $(frm).find('input[name="mobile"]').val();
	var password = $(frm).find('input[name="password"]').val();
	var city = $(frm).find('select[name="city"] option:selected').val();
	var goal = $(frm).find('select[name="goal"] option:selected').val();
	var obj = new Object();
	obj['name']=uname;
	obj['mobileNumber']=mobile;
	obj['email']=email;
	obj['password']=password;
	obj['city']=city;
	obj['goal']=goal;
	$.ajax({
	    url: initialize_url,
	    type: 'POST',
	    dataType: 'json',
	    data: JSON.stringify(obj),
	    async: false,
	    processData: false, // Don't process the files
	    contentType: 'application/json',
	    success: function(data) {
	      if(data && data["responseCode"] && data["responseCode"] == "1000")
	      {
	      	if(window.profileObj && window.profileObj['mode']){
	      		if(window.profileObj['mode'] == 'signup'){
		      		var response = loginUser(email, password, false);
			      	if(response){
			      		$(".inner.part2, .inner.part3").slideToggle(250);
			      	}
		      	}
		      	else{
		      		$(".inner.part2, .inner.part3").slideToggle(250);
		      	}
	      	}
	      	else{
	      		showPop('An error occurred. Please try again later.')
	      	}
	      }
	      else if(data && data["responseCode"] && data["responseCode"] == "1010"){
	      	location.reload(true);
	      }
	      else{
	        showPop('An error occurred. Please try again later.');
	      }
	    },
	    error: function(xhr, status, thrown){
	      showPop('An error occurred. Please try again later.');
	    }
	});
}

function updateOnboarding1(frm){
	var dob = $(frm).find('input[name="userDob"]').val();
	var gender = $(frm).find('select[name="gender"]').val();
	var weightLossTargetRange = $(frm).find('select[name="q1"]').val();
	var healthConditions = new Array();
	var conditions = $(frm).find('input.condition');
	for(var i=0; i<conditions.length; i++){
	  var condition = conditions[i];
	  if(condition.checked){
	  	if(condition.id == 'condition9'){
	  		healthConditions.push($(frm).children(".others").children('textarea').val());
	  	}
	  	else{
	  		healthConditions.push($(frm).find("label[for='"+condition.id+"']").text());
	  	}
	  }
	}
	var obj = new Object();
	obj['dateOfBirth']=dob;
	obj['gender']=gender;
	obj['weightLossTargetRange']=weightLossTargetRange;
	obj['healthConditions']=healthConditions;
	$.ajax({
	    url: update_url,
	    type: 'POST',
	    dataType: 'json',
	    data: JSON.stringify(obj),
	    async: false,
	    processData: false, // Don't process the files
	    contentType: 'application/json',
	    success: function(data) {
	      if(data && data["responseCode"] && data["responseCode"] == "1000")
	      {
					analytics.track("Form successfully submitted");
	        $(".inner.part3, .inner.part4").slideToggle(250);
	      }
	      else if(data && data["responseCode"] && data["responseCode"] == "1010"){
					analytics.track("Form submit failed. Session expired.");
	      	location.reload(true);
	      }
	      else{
					analytics.track("Form submit failed. Unknown error.");
	        showPop('An error occurred. Please try again later.');
	      }
	    },
	    error: function(xhr, status, thrown){
				analytics.track("Form submit failed. Network error.");
	      showPop('An error occurred. Please try again later.');
	    }
	});
}

function updateOnboarding2(frm){
	var serviceSelected = 'PRO';
	if($(frm).find('input#planInjury')[0].checked){
		serviceSelected = 'PRO (Injury)';
	}
	var referralSource = $(frm).find('select[name="source"]').val();
	var obj = new Object();
	obj['chosenService']=serviceSelected;
	obj['referralSource']=referralSource;

	$.ajax({
	    url: update_url,
	    type: 'POST',
	    dataType: 'json',
	    data: JSON.stringify(obj),
	    async: false,
	    processData: false, // Don't process the files
	    contentType: 'application/json',
	    success: function(data) {
	      if(data && data["responseCode"] && data["responseCode"] == "1000")
	      {
					analytics.track("Form successfully updated");
	        $(".mainCol, .sideBar, .part5").slideToggle(250);
	      }
	      else if(data && data["responseCode"] && data["responseCode"] == "1010"){
					analytics.track("Form update failed. Session expired.");
	      	location.reload(true);
	      }
	      else{
					analytics.track("Form update failed. Unknown error.");
	        showPop('An error occurred. Please try again later.');
	      }
	    },
	    error: function(xhr, status, thrown){
				analytics.track("Form update failed. Network error.");
	      showPop('An error occurred. Please try again later.');
	    }
	});
}

//popup modals
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

function tweakForMissingButton(){
	$('.connectCta.facebook').each(function(){
		if($(this).parent().find('.connectCta.google').length == 0){
			if(window.innerWidth < 768){
				$(this).css("width","100%");
			}
			else {
				$(this).css("width","264px");
			}
		}
	});
}

$(window).resize(function(){
	tweakForMissingButton();
});

function isMac(){
	return navigator.userAgent.match(/Mac|Macintosh|Apple|KHTML/i);
}
