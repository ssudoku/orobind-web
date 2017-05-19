var logo = $('.topLogo img');
var lastSize;
function switchImg(value){
	if(!lastSize || lastSize != value){
		var x = $(logo).attr('data-switch');
		var y = $(logo).attr('src');
		if(y.indexOf("white") > -1 && value == 768){
			//current image is whity
			return false;
		}
		else if(y.indexOf("color") > -1 && value == 992){
			//current image is greeny
			return false;
		}
		$(logo).attr({'src': x, 'data-switch':y});
		lastSize = value;
	}
}
function populateProfile(){
	var profile = user.fetchProfile();
	if(profile){
		$('section.topMenu span.userName').text(profile['name']);
		$('section#sectionAccount form.profileForm input.name').val(profile['name']);
		$('section#sectionAccount form.profileForm input.email').val(profile['email']);
		$('section#sectionAccount form.profileForm input.mobile').val(profile['mobileNumber']);
		$('section#sectionAccount form.profileForm input.address').val((profile['location'] == '') ? '': (profile['location']+', '+profile['city']));
		$('section#sectionAccount form.statsForm input.height').val(profile['height']);
		$('section#sectionAccount form.statsForm input.weight').val(profile['weight']);
		$('section#sectionAccount form.statsForm input.dateOfBirth').val(profile['dateOfBirth']);
		$('section#sectionAccount form.statsForm select.gender').val(profile['gender']);
	}
}
$(document).ready(function(){
	user = new User();

	if(window.innerWidth < 768){
		switchImg(768);
	}
	if(window.innerWidth > 768){
		switchImg(992);
	}
	$('.sessions select').superSelect();

	Path.map('#/login').to(function() {
	  loginUserModal();
	});

	Path.map('#/login-email').to(function() {
	  emailLoginModal();
	});

	Path.map('#/forgot').to(function() {
	  forgotPassword();
	});

	Path.map('#/account').to(function() {
	  closeModals();
		populateProfile();
		var target = "section.infoSection, section.cover";
		loadTab(target);
	});

	Path.map('#/sessions').to(function() {
		if(user.getUserCode() == ""){
			populateProfile();
		}
		var target = "section.sessions";
		user.fetchCoachSessions();
		loadTab(target);
	});

	Path.map('#/wallet').to(function() {
		if(user.getUserCode() == ""){
			populateProfile();
		}
	  var target = "section.wallet";
		var subscriptionData = fetchSubscriptionData();
		if(subscriptionData){
			var expiryDateText = moment(subscriptionData['expiryDate'],"YYYY-MM-DD").format("Do MMM, YYYY");
			$('section.wallet .subscriptionStatus p.planName').html(subscriptionData['planName']);
			$('section.wallet .subscriptionStatus p.planStatus').html(subscriptionData['status']);
			$('section.wallet .subscriptionStatus p.planExpiryDate').html(expiryDateText);
			$('section.wallet .subscriptionStatus p.planSessionsLeft').html(subscriptionData['sessionsLeft']);
		}
		var paymentsData = fetchPreviousPayments();
		if(paymentsData){
			var html = '';
			for(var i=0; i<paymentsData.length; i++){
				html += '<tr><td>'+ moment(paymentsData[i]['txnDate'],"YYYY-MM-DD hh:mm:ss").format("Do MMM, YYYY - h:mm a") +'</td><td>'+paymentsData[i]['transactionCode']+'</td><td>'+paymentsData[i]['paymentMode']+'</td><td>&#8377; '+paymentsData[i]['amount']+'</td></tr>';
			}
			$('section.wallet .paymentHistory table.paymentsTable tbody').html(html);
		}
		loadTab(target);
	});

	Path.root("#/account");

	Path.listen(true);
});
$(document).on("click",".profileInner .mainCta",function(e){
	e.preventDefault(); e.stopPropagation();
	if($(this).parent('form').hasClass('disabled')){
		$(this).parent('form').removeClass('disabled');
		return true;
	}
	else {
		if($(this).hasClass("editStats")){
			var result = user.updateStats();
		}
		else {
			var result = user.updateAccount();
		}
		if(result === "success"){
			showPop("Details updated successfully");
			$(this).parent('form').addClass('disabled');
		}
	}
});
$(document).on("change",".timeOfDay",function(){
	if($(".timeOfDay").val() && $(".timeOfDay option:selected").index() != 0){
		$(".slotContainer").fadeOut(100);
		var x = $(".timeOfDay option:selected").attr("data-order");
		$('.slotContainer[data-order="'+x+'"]').fadeIn(150);
	}
});
$(document).on("change",".reschTimes",function(){
	if($(".reschTimes").val() && $(".reschTimes option:selected").index() != 0){
		$(".rescheduleBlock .slotContainer").fadeOut(100);
		var x = $(".reschTimes option:selected").attr("data-order");
		$('.rescheduleBlock .slotContainer[data-order="'+x+'"]').fadeIn(150);
	}
});
$(document).on("click",".modifySession .modifyAction",function(){
	if($(this).hasClass("reschedule")){
		$(".chooseBlock, .rescheduleBlock").slideToggle(200);
	}
	else if($(this).hasClass("cancel")) {
		$(".chooseBlock, .cancelBlock").slideToggle(200);
	}
});
$(document).on("click",".upcoming .actionItem",function(){
	$(this).parents(".sessionsTable").fadeOut(100);
	var indexstr = $(this).attr('data-sess-index');
	var sessionObj = user.getUpcomingSessions()[parseInt(indexstr)];
	window.tempSessionObj = sessionObj;
	$(".upcoming .modifySession").fadeIn(100);
	$(".upcoming .modifySession .chooseBlock .sessionSelected .dateTime").html(moment(new Date(sessionObj['startTime'])).format('DD-MM-YYYY')+ ' | ' +sessionObj['timeSlot']);
	$(".upcoming .modifySession .chooseBlock .sessionSelected .coachName").html(user.getTrainerName());
	var maxDate = moment().add(2,"days").format("YYYY-MM-DD");
	var selDate = $(this).attr("data-date");
	if(isGreater(selDate,maxDate)){
		$(".chooseBlock .actionTitle, .chooseBlock .modifyAction.reschedule").hide();
	}
	else {
		$(".chooseBlock .actionTitle, .chooseBlock .modifyAction.reschedule").show();
	}
});
function isGreater(testDate,maxDate){
	var a = moment(testDate);
	var b = moment(maxDate);
	var c = b.format("x") - a.format("x");
	if(c < 0){
		return true;
	}
	else {
		return false;
	}
}
$(document).on("click",".upcoming .back",function(){
	$(".upcoming .modifySession").fadeOut(100);
	$(".upcoming .sessionsTable").fadeIn(150);
	$(".chooseBlock").show();
	$(".rescheduleBlock, .cancelBlock").hide();
});
$(document).on("click",".past .actionItem",function(){
	var indexstr = $(this).attr('data-sess-index');
	var sessionObj = user.getUpcomingSessions()[parseInt(indexstr)];
	window.tempSessionObj = sessionObj;
	reportIssue();
});
$(document).on("click",".subscriptionStatus .renewCta",function(){
	$(".subscriptionStatus > *").fadeOut(100);
	$(".subscriptionStatus .renew.step1").fadeIn(150);
});
$(document).on("click",".inventory .inventoryCta",function(){
	var slot = $(".slotContainer.active .inventoryWrap.active").attr("data-slot");
	var dateStr = $(".book .dateBlock.active").attr("data-datestr");
	user.bookSlot(slot,dateStr);
});
$(document).on("click",".inventory .rescheduleCta",function(){
	var slot = $(".rescheduleBlock .slotContainer.active .inventoryWrap.active").attr("data-slot");
	var dateStr = $(".rescheduleBlock .dateBlock.active").attr("data-date");
	user.rescheduleSlot(slot,dateStr,window.tempSessionObj['code']);
});
$(document).on("click",".subscriptionStatus .planCta",function(){
	$(".subscriptionStatus .renew").fadeOut(100);
	$(".subscriptionStatus .renew.step2").fadeIn(150);
});
$(document).on("change",'.cancelBlock input[name="reasons"]',function(){
	var i = $('.cancelBlock input[name="reasons"]:checked').attr("id");
	if(i == "reason8"){
		$(".cancelBlock .options").addClass("others");
	}
	else {
		$(".cancelBlock .options").removeClass("others");
	}
});
$(document).on("change",'.rescheduleBlock input[name="reasons"]',function(){
	var i = $('.rescheduleBlock input[name="reasons"]:checked').attr("id");
	if(i == "reason4"){
		$(".rescheduleBlock .options").addClass("others");
	}
	else {
		$(".rescheduleBlock .options").removeClass("others");
	}
});
$(document).on("click",".sessionReport .reportCta",function(){
	var textBox = $(this).siblings(".reportInput");
	if(textBox.val() && textBox.val().length > 3){
		textBox.removeClass("error");
		user.reportSession(sessionCode,textBox.val());
	}
	else {
		textBox.addClass("error").focus();
	}
});
$(document).on("click",".book .dateBlock",function(){
	$(".book .dateBlock").removeClass("active");
	$(this).addClass("active");
	user.renderSlots($(this).attr("data-datestr"),"book");
	$(".book .inventory").fadeIn(100);
});
$(document).on("click",".rescheduleBlock .dateBlock",function(){
	$(".rescheduleBlock .dateBlock").removeClass("active");
	$(this).addClass("active");
	user.renderSlots($(this).attr("data-date"),"reschedule");
	$(".rescheduleBlock .inventory").fadeIn(100);
});
$(document).on("click",".wallet .walletTab",function(){
	$(".wallet .tabSection").fadeOut(100);
	if($(this).hasClass("subscriptions")){
		$(".tabSection.subscriptionStatus").fadeIn(100);
	}
	if($(this).hasClass("payments")){
		$(".tabSection.paymentHistory").fadeIn(100);
	}
	$(".wallet .walletTab").removeClass("active");
	$(this).addClass("active");
});
$(document).on("click",".inventoryWrap",function(){
	if($(this).hasClass("blocked")){
		return false;
	}
	if($(this).hasClass("active")){
		$(this).removeClass("active");
		$(".slotContainer").removeClass("active");
	}
	else {
		$(".inventoryWrap").removeClass("active");
		$(this).addClass("active");
		$(".slotContainer").removeClass("active");
		$(this).parents(".slotContainer").addClass("active");
	}
});
$(document).on("click",".sessions .sessionsTab",function(){
	$(".sessions .tabSection").fadeOut(100);
	if($(this).hasClass("booking")){
		$(".tabSection.book").fadeIn(100);
		user.fetchCoachSessions();
	}
	if($(this).hasClass("upcoming")){
		fetchAndRenderUpcomingSessions();
	}
	if($(this).hasClass("past")){
		fetchAndRenderPastSessions();
	}
	$(".sessions .sessionsTab").removeClass("active");
	$(this).addClass("active");
});
$(document).on("click",".tabButtonWrap",function(){
	var id = $(this).attr("id");
	switch (id) {
		case "account":
			window.location.hash = "/account";
		break;
		case "sessions":
			window.location.hash = "/sessions";
		break;
		case "wallet":
			window.location.hash = "/wallet";
		break;
	}
});
function loadTab(target){
	var newImg = $(".tabButtonWrap.current .tabButtonImg").attr("data-switch");
	var old = $(".tabButtonWrap.current .tabButtonImg").attr("src");
	$(".tabButtonWrap.current .tabButtonImg").attr({"src":newImg,"data-switch":old});

	$(".tabButtonWrap").removeClass("current");
	$(this).addClass("current");

	newImg = $(".tabButtonWrap.current .tabButtonImg").attr("data-switch");
	old = $(".tabButtonWrap.current .tabButtonImg").attr("src");
	$(".tabButtonWrap.current .tabButtonImg").attr({"src":newImg,"data-switch":old});

	$("section.pageBlocks").not(".tabBar, .topMenu").fadeOut(100);
	$(target).fadeIn(100);
}
$(window).resize(function(){
	if(window.innerWidth < 768){
		switchImg(768);
	}
	if(window.innerWidth > 768){
		switchImg(992);
	}
});

$(document).on("click","button.cancelCta",function(e){
	e.preventDefault(); e.stopPropagation();
	if(window.tempSessionObj){
		$('.cancelBlock .othersExpand textarea.othersSpecify').removeClass('error');
		var comment = '';
		var checkedReasonId = $('.cancelBlock .options input[type="radio"]:checked').attr('id');
		if(checkedReasonId == 'reason4'){
			var textArea = $('.cancelBlock .othersExpand textarea.othersSpecify');
			if(textArea.val() == ''){
				textArea.addClass('error');
				return false;
			}
			else{
				comment = textArea.val();
			}
		}
		else{
			comment = $('label#'+checkedReasonId).html();
		}
		var postObj = new Object();
		postObj['sessionCode'] = window.tempSessionObj['code'];
		postObj['comment'] = comment;
		cancelSession(postObj);
	}
	else{
		showPop('An error occurred. Please try again later');
	}
});

/*
$(document).on("click","button.dateBlock",function(e){
	e.preventDefault(); e.stopPropagation();
	window.currentDateInventory = null;
	var oDate = new Date();
	var sDate = moment(oDate).format('YYYY-MM-DD');
	if($(this).hasClass('day2')){
		oDate.setDate(oDate.getDate()+1);
		sDate = moment(oDate).format('YYYY-MM-DD');
	}
	else if($(this).hasClass('day3')){
		oDate.setDate(oDate.getDate()+2);
		sDate = moment(oDate).format('YYYY-MM-DD');
	}
	if(user.getTrainerCode().length > 0){
		var postObj = new Object();
		postObj['trainerCode'] = user.getTrainerCode();
		var aDates = new Array();
		aDates.push(sDate);
		postObj['dates'] = aDates;
		var currentDateInventory = fetchInventory(postObj, sDate);
		if(currentDateInventory){
			window.currentDateInventory = currentDateInventory;
		}
	}
	else{
		resetApp();
	}
});
*/

var loginContent = '<div class="loginOptions"><h3 class="gateWayTitle">Enter Orobind Pro</h3><div class="loginCard"><button class="loginCta fb">Facebook</button><p class="label">Connect via Facebook</p><div class="divider"><span class="dividerText">or</span></div><button class="loginCta gp">Google</button><p class="label">Connect via Google+</p><div class="divider"><span class="dividerText">or</span></div><button class="loginCta em">Email</button><p class="label">Login with your email</p></div><a href="#" class="existing">New User?</a></div>';
var loginEmailContent = '<div class="loginEmail"><h3 class="gateWayTitle">Login with Email</h3><button class="back"><i class="fa fa-long-arrow-left"></i> Back</button><div class="loginCard"><input type="text" class="loginField" name="email" placeholder="Email"><input type="password" class="loginField" name="password" placeholder="••••••••"><button class="loginCta em">Login</button></div><a href="#" class="existing">Forgot your password?</a></div>';
var forgotPwContent = '<div class="forgotPw"><h3 class="gateWayTitle">Forgot Password?</h3><p class="success">An email has been sent to you with a link to reset the password.</p><p class="error">Invalid email address. Please try again with the correct email.</p><button class="back"><i class="fa fa-long-arrow-left"></i> Back</button><div class="forgotCard"><input type="text" class="loginField" name="email" placeholder="Email"><button class="loginCta em">Reset Password</button></div></div>';

var reportSession = '<div class="sessionReport"><h3 class="gateWayTitle">Report issue with session</h3><p>Can you describe the problem so that we can help you?</p><textarea class="reportInput" placeholder="Describe the issue"></textarea><button class="reportCta">Submit</button></div>';

function loginUserModal(){
	showModalMessage({
		"class":"gateWayModal", //the classname of the main modal, as defined by the css for the particular module
		"closable":"1", //the modal can be closed by the user. any value other than 1 makes it unclosable by user
		"content":loginContent, //passing the html content
		"nobutton":true, //to disable the default "close" button. also disabled if "closable" is set to any value other than 1
		"timed":"0", //if the modal should be auto-closed after 3 seconds. "0" will disable this
		"size":"small" //small -320px, wide -540px, xl -768px, xxl - 992px
	});
}
function emailLoginModal(){
	showModalMessage({
		"class":"gateWayModal", //the classname of the main modal, as defined by the css for the particular module
		"closable":"1", //the modal can be closed by the user. any value other than 1 makes it unclosable by user
		"content":loginEmailContent, //passing the html content
		"nobutton":true, //to disable the default "close" button. also disabled if "closable" is set to any value other than 1
		"timed":"0", //if the modal should be auto-closed after 3 seconds. "0" will disable this
		"size":"small" //small -320px, wide -540px, xl -768px, xxl - 992px
	});
}
function forgotPassword(){
	showModalMessage({
		"class":"gateWayModal", //the classname of the main modal, as defined by the css for the particular module
		"closable":"1", //the modal can be closed by the user. any value other than 1 makes it unclosable by user
		"content":forgotPwContent, //passing the html content
		"nobutton":true, //to disable the default "close" button. also disabled if "closable" is set to any value other than 1
		"timed":"0", //if the modal should be auto-closed after 3 seconds. "0" will disable this
		"size":"small" //small -320px, wide -540px, xl -768px, xxl - 992px
	});
}
function reportIssue(){
	showModalMessage({
		"class":"gateWayModal", //the classname of the main modal, as defined by the css for the particular module
		"closable":"1", //the modal can be closed by the user. any value other than 1 makes it unclosable by user
		"content":reportSession, //passing the html content
		"nobutton":true, //to disable the default "close" button. also disabled if "closable" is set to any value other than 1
		"timed":"0", //if the modal should be auto-closed after 3 seconds. "0" will disable this
		"size":"small" //small -320px, wide -540px, xl -768px, xxl - 992px
	});
}

function closeModals(){
	$(".messageModal").fadeOut(150);
}
