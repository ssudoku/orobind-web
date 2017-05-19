function User(){
	var profile = {
		"email":"",
		"name":"",
		"mobileNumber":"",
		"gender":"",
		"height":"",
		"weight":"",
		"location":"",
		"city":"",
		"dateOfBirth":""
	};
	var userCode = "";
	var sessionGroupCode = "";
	var trainer = {
		"trainerName":"",
		"trainerCode":""
	};
	var subscription = {
		"plan":"",
		"status":"",
		"sessionsLeft":"",
		"expiryDate":""
	};
	//set date for today, tomorrow and day after tomorrow
	var tomorrow = new Date(), dayAfter = new Date(), andThen = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	dayAfter.setDate(dayAfter.getDate() + 2);
	andThen.setDate(andThen.getDate() + 3);
	//add them in the right format to the dates object
	var dates = [{
		"date":tomorrow,
		"str":tomorrow.getFullYear() + "-" + zeroPrefix(Math.abs(parseInt(tomorrow.getMonth()) + 1)) + "-" + zeroPrefix(tomorrow.getDate())
	},{
		"date":dayAfter,
		"str":dayAfter.getFullYear() + "-" + zeroPrefix(Math.abs(parseInt(dayAfter.getMonth()) + 1)) + "-" + zeroPrefix(dayAfter.getDate())
	},{
		"date":andThen,
		"str":andThen.getFullYear() + "-" + zeroPrefix(Math.abs(parseInt(andThen.getMonth()) + 1)) + "-" + zeroPrefix(andThen.getDate())
	}];
	//fetch coach availability using the dates set
	var slots = [];
	this.fetchCoachSessions = function(){
		var url = '/proapp/fetchcoachavailability/v2';
		var response = postData({
			"trainerCode":trainer["trainerCode"],
			"sessionGroupCode":sessionGroupCode,
			"dates":[dates[0]["str"],dates[1]["str"],dates[2]["str"]]
		},url);
		response = {
			"response": "Successfully fetched.",
			"responseCode": "1000",
			"status": null,
			"dates": [{
			  "date": "2016-01-15",
			  "slotsAvailable": [21, 22, 23, 27, 28, 29, 30, 31, 32, 47, 48, 49, 50, 51, 52, 53, 54, 55, 59, 60, 61, 62, 63, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84]
			},{
			  "date": "2016-01-16",
			  "slotsAvailable": [29, 30, 32, 33, 47, 52, 53, 56, 57, 58, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 80, 81, 83, 84]
			},{
			  "date": "2016-01-17",
			  "slotsAvailable": [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84]
			}]
		};
		if(response && response['responseCode'] && (response['responseCode'] == '1000')){
			slots = response["dates"];
			renderDates();
		}
		else {
			//error handler code
		}
	}
	function renderDates() {
		var par = $(".book .dateRow");
		var dayText = [];
		var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
		for(var x in dates){
			var dt = days[dates[x]["date"].getDay()]
							+	" "
							+ zeroPrefix(dates[x]["date"].getDate());
			dayText.push(dt);
		}
		par.find(".dateBlock.day1 .value").text(dayText[0]);
		par.find(".dateBlock.day1").attr("data-datestr",dates[0]["str"]);
		par.find(".dateBlock.day2 .value").text(dayText[1]);
		par.find(".dateBlock.day2").attr("data-datestr",dates[1]["str"]);
		par.find(".dateBlock.day3 .value").text(dayText[2]);
		par.find(".dateBlock.day3").attr("data-datestr",dates[2]["str"]);
		par.addClass("active");
	}
	function slotHour(slot){
		return Math.floor((slot - 1)/4);
	}
	function getSlotTimeOfDay(slot){
		if(slot > 48){
			return 'pm';
		}
		else {
			return 'am';
		}
	}
	function ampm(slot){
		if(parseInt(slot) > 12) {
			return (parseInt(slot) - 12);
		}
		else {
			return slot;
		}
	}
	function getTimeForSlotNum(a){
		var maj = Math.floor((a-1)/4);
		var min = ((a-1)%4)*15;
		return (zeroPrefix(maj)+":"+zeroPrefix(min));
	}
	this.bookSlot = function(slotNum,dateStr){
		var url = "/proapp/createsession/v2";
		var tim = getTimeForSlotNum(slotNum);
		var bookStr = dateStr + " " + tim;
		var dataObj = {
			"userCode":userCode,
			"sessionGroupCode":sessionGroupCode,
			"time":[bookStr]
		}
		var result = postData(dataObj,url);
		result = {"responseCode":"1000"};
		if(result && result['responseCode'] && result['responseCode'] == "1000") {
			showPop("Session booked successfully");
			setTimeout(function() {
				$(".sessionsTab.upcoming").click();
			},1000);
		}
		else {
			showPop("Some error occured. Please try again");
		}
	}
	this.rescheduleSlot = function(slotNum,dateStr,sessionCode){
		var url = "/proapp/reschedulesession/v2";
		var tim = getTimeForSlotNum(slotNum);
		var bookStr = dateStr + " " + tim;
		var dataObj = {
			"sessionCode":sessionCode,
			"time":[bookStr]
		}
		var result = postData(dataObj,url);
		result = {"responseCode":"1000"};
		if(result && result['responseCode'] && result['responseCode'] == "1000") {
			showPop("Session rescheduled successfully");
			setTimeout(function() {
				resetModify();
				$(".sessionsTab.upcoming").click();
			},0);
		}
	}
	this.renderSlots = function(chosenDate,mode) {
		for (var i in slots){
			if(slots[i]["date"] == chosenDate){
				var slotDivs = "", flag1 = false, flag2 = false, flag3 = false, prevHour = null;
				for (var j = 21; j <= 88; j++){
					if(j < 41) {
						if(!flag1){
							slotDivs += '<div class="slotContainer" data-order="1">';
							flag1 = true;
						}
					}
					else if (j < 65) {
						if(!flag2){
							slotDivs += '</div><div class="slotContainer" data-order="2">';
							flag2 = true;
						}
					}
					else {
						if(!flag3){
							slotDivs += '</div><div class="slotContainer" data-order="3">';
							flag3 = true;
						}
					}
					if(prevHour === null || prevHour !== slotHour(j)){
						//first row
						slotDivs += '<div class="slotCols">'
						+ '<span class="legend">'
						+ ampm(slotHour(j))
						+ ' ' + getSlotTimeOfDay(j)
						+ '</span>';
						prevHour = slotHour(j);
					}
					//fill a row
					slotDivs += '<span class="inventoryWrap';
					if(slots[i]["slotsAvailable"].indexOf(j) < 0) {
						//this session is not available
						slotDivs += ' blocked';
					}
					slotDivs += '" data-slot="'
					+ j +'">'
					+ zeroPrefix(ampm(slotHour(j)))
					+ ':';
					if(j%4 === 0){
						slotDivs += '45';
					}
					else {
						slotDivs += zeroPrefix(Math.abs(((j%4) - 1)*15));
					}
					slotDivs += '</span>';
					if(j%4 === 0){
						slotDivs += '</div>';
					}

					if(j == 88){
						slotDivs += '</div></div>';
					}
				}
				if(mode == "book"){
					$('.book .slotContainer').detach();
					$('.book .inventory .inventoryCta').before(slotDivs);
				}
				else {
					$('.modifySession .inventory .slotContainer').detach();
					$('.modifySession .rescheduleCta').before(slotDivs);
				}
			}
		}
	}
	var previousSessions = [];
	var upcomingSessions = [];
	this.updateStats = function(){
		var pForm = $(".profileForm");
		var sForm = $(".statsForm");
		var requestObject = {};

		if(!validateForm(sForm)){
			return false;
		}

		requestObject['height'] = (sForm.find('.profileFormFields[name="height"]').val() != profile['height']) ? sForm.find('.profileFormFields[name="height"]').val() : profile['height'];
		requestObject['weight'] = (sForm.find('.profileFormFields[name="weight"]').val() != profile['weight']) ? sForm.find('.profileFormFields[name="weight"]').val() : profile['weight'];
		requestObject['gender'] = (sForm.find('.profileFormFields[name="gender"]').val() != profile['gender']) ? sForm.find('.profileFormFields[name="gender"]').val() : profile['gender'];
		var dob = sForm.find('.profileFormFields[name="dob"]').val().split("-");
		requestObject['day'] = (zeroPrefix(dob[0]) != profile['day']) ? zeroPrefix(dob[0]) : profile['day'];
		requestObject['valMonth'] = (dob[1] != profile['valMonth']) ? dob[1] : profile['valMonth'];
		requestObject['valYear'] = (dob[2] != profile['valYear']) ? dob[2] : profile['valYear'];

		requestObject['name'] = profile['name'];
		requestObject['userCode'] = userCode;
		requestObject['mobileNumber'] = profile['mobileNumber'];
		requestObject['location'] = profile['location'];
		requestObject['city'] = profile['city'];
		requestObject['password'] = profile['password'];

		var savestate = this.updateProfile(requestObject);
		if(savestate){
			this.fetchProfile();
			return "success";
		}
		else {
			return "success";
		}
	}
	this.updateAccount = function(){
		var pForm = $(".profileForm");
		var sForm = $(".statsForm");
		var requestObject = {};

		if(!validateForm(pForm)){
			return false;
		}

		requestObject['name'] = (pForm.find('.profileFormFields[name="name"]').val() != profile['name']) ? pForm.find('.profileFormFields[name="name"]').val() : profile['name'];
		requestObject['mobileNumber'] = (pForm.find('.profileFormFields[name="mobileNumber"]').val() != profile['weight']) ? pForm.find('.profileFormFields[name="mobileNumber"]').val() : profile['mobileNumber'];
		requestObject['gender'] = (pForm.find('.profileFormFields[name="gender"]').val() != profile['gender']) ? pForm.find('.profileFormFields[name="gender"]').val() : profile['gender'];
		requestObject['location'] = (pForm.find('.profileFormFields[name="location"]').val() != profile['location']) ? pForm.find('.profileFormFields[name="location"]').val() : profile['location'];
		requestObject['password'] = (pForm.find('.profileFormFields[name="password"]').val() != profile['password']) ? pForm.find('.profileFormFields[name="password"]').val() : profile['password'];

		requestObject['day'] = profile['day'];
		requestObject['valMonth'] = profile['valMonth'];
		requestObject['valYear'] = profile['valYear'];
		requestObject['height'] = profile['height'];
		requestObject['userCode'] = userCode;
		requestObject['weight'] = profile['weight'];
		requestObject['city'] = profile['city'];
		requestObject['gender'] = profile['gender'];

		var savestate = this.updateProfile(requestObject);
		if(savestate){
			this.fetchProfile();
			return "success";
		}
		else {
			return "success";
		}
	}
	this.fetchProfile = function(){
		var url = '/proapp/fetchloggedinuserdetails';
		var response = getData(url);
		response = {
	    "response": "success",
	    "responseCode": "1000",
	    "status": null,
	    "userProfileViewDTO": {
	        "name": "Shubhanshu Srivastava",
	        "mobile": "1122334455",
	        "location": "",
	        "city": "Bangalore",
	        "weight": 75,
	        "height": 180,
	        "gender": "Female",
	        "day": 22,
	        "month": "Jun",
	        "valMonth": 6,
	        "year": null,
	        "valYear": 1987,
	        "password": "60bffb4d75e3eae49a3c49f03f50bc05",
	        "percentageComplete": null,
	        "goalWeightReduction": null,
	        "howManyWeeks": null,
	        "goalCode": null,
	        "profilePic": null,
	        "email": "shubhanshu.srivastava@gmail.com"
	    },
	    "userCode": "us812332d6-bdbd-4796-ac58-1c8ed6e889d8",
	    "sessionGroupCode": "sg5fa90890-fc05-461e-9ffe-f22f4c000594",
	    "trainerName": "Nisar Khan",
	    "trainerCode": "tr23382343-7be9-4fe8-b9d1-a231fe33d0a1"
		};
		if(response && response['responseCode'] && (response['responseCode'] == '1000')){
			profile['email'] = response['userProfileViewDTO']['email'];
			profile['name'] = (response['userProfileViewDTO']['name'] ? response['userProfileViewDTO']['name'] : '');
			profile['mobileNumber'] = (response['userProfileViewDTO']['mobile'] ? response['userProfileViewDTO']['mobile'] : '');
			profile['gender'] = (response['userProfileViewDTO']['gender'] ? response['userProfileViewDTO']['gender'] : '');
			profile['height'] = (response['userProfileViewDTO']['height'] ? response['userProfileViewDTO']['height'] : '');
			profile['weight'] = (response['userProfileViewDTO']['weight'] ? response['userProfileViewDTO']['weight'] : '');
			profile['location'] = (response['userProfileViewDTO']['location'] ? response['userProfileViewDTO']['location'] : '');
			profile['city'] = (response['userProfileViewDTO']['city'] ? response['userProfileViewDTO']['city'] : '');
			profile['dateOfBirth'] = ((response['userProfileViewDTO']['day'] && response['userProfileViewDTO']['valMonth'] && response['userProfileViewDTO']['valYear']) ? response['userProfileViewDTO']['day']+'-'+response['userProfileViewDTO']['valMonth']+'-'+response['userProfileViewDTO']['valYear'] : '');
			userCode = response['userCode'];
			sessionGroupCode = (response['sessionGroupCode'] ? response['sessionGroupCode'] : '');
			trainer['trainerName'] = (response['trainerName'] ? response['trainerName'] : '');
			trainer['trainerCode'] = (response['trainerCode'] ? response['trainerCode'] : '');
		}
		else{
			showPop('An error occurred. Please try again.');
		}
    	return profile;
	}
	this.updateProfile = function(profileObj){
		var url = '/proapp/profileupdate';
		var response = postData(profileObj, url);
		if(response && response['responseCode'] && (response['responseCode'] == '1000')){
			profile['email'] = response['userProfileViewDTO']['email'];
			profile['name'] = (response['userProfileViewDTO']['name'] ? response['userProfileViewDTO']['name'] : '');
			profile['mobileNumber'] = (response['userProfileViewDTO']['mobile'] ? response['userProfileViewDTO']['mobile'] : '');
			profile['gender'] = (response['userProfileViewDTO']['gender'] ? response['userProfileViewDTO']['gender'] : '');
			profile['height'] = (response['userProfileViewDTO']['height'] ? response['userProfileViewDTO']['height'] : '');
			profile['weight'] = (response['userProfileViewDTO']['weight'] ? response['userProfileViewDTO']['weight'] : '');
			profile['location'] = (response['userProfileViewDTO']['location'] ? response['userProfileViewDTO']['location'] : '');
			profile['city'] = (response['userProfileViewDTO']['city'] ? response['userProfileViewDTO']['city'] : '');
			profile['dateOfBirth'] = ((response['userProfileViewDTO']['day'] && response['userProfileViewDTO']['valMonth'] && response['userProfileViewDTO']['valYear']) ? response['userProfileViewDTO']['day']+'-'+response['userProfileViewDTO']['valMonth']+'-'+response['userProfileViewDTO']['valYear'] : '');
		}
		else{
			showPop('An error occurred. Please try again.');
			return null;
		}
    	return profile;
	}
	this.getProfile = function(){
		return profile;
	}
	this.getSessionGroupCode = function(){
		return sessionGroupCode;
	}
	this.getUserCode = function(){
		return userCode;
	}
	this.getTrainerCode = function(){
		return trainer['trainerCode'];
	}
	this.getTrainerName = function(){
		return trainer['trainerName'];
	}
	this.fetchPreviousSessions = function(){
		if(sessionGroupCode.length > 0){
			var oPost = new Object();
			oPost['sessionGrpCode'] = sessionGroupCode;
			var url = '/proapp/sessionsforuser';
			var oResponse = postData(oPost, url);
			oResponse = {
			  "statusCode": "1000",
			  "message": "Success",
			  "sessionGroupCode": "sg5fa90890-fc05-461e-9ffe-f22f4c000594",
			  "alreadySessions": "2016-12-31,2015-12-22,2016-03-26,",
			  "cancellationCountLeft": 65,
			  "cancellationCountAllocated": 68,
			  "upcomingSessionSROs": [{
			    "statusCode": "INI",
			    "code": "se9ea73001-f124-44b0-97be-33e355fb0fea",
			    "sessionType": "WRKT",
			    "startTime": 1483122600000,
			    "dayVisible": "Saturday",
			    "timeSlot": "01:00PM Onwards",
			    "endTime": 1483126200000,
			    "scheduledStartTime": "2016-12-31 13:00:00"
			  }, {
			    "statusCode": "INI",
			    "code": "se830a5a26-4b66-4318-9f5d-40cc8482eed4",
			    "sessionType": "WRKT",
			    "startTime": 1450722600000,
			    "dayVisible": "Tuesday",
			    "timeSlot": "01:00PM Onwards",
			    "endTime": 1450726200000,
			    "scheduledStartTime": "2015-12-22 13:00:00"
			  }, {
			    "statusCode": "INI",
			    "code": "seeb6eeb8b-f4e6-4a07-8ddb-69fb97caa17d",
			    "sessionType": "WRKT",
			    "startTime": 1458930600000,
			    "dayVisible": "Saturday",
			    "timeSlot": "01:00PM Onwards",
			    "endTime": 1458934200000,
			    "scheduledStartTime": "2016-03-26 13:00:00"
			  }],
			  "pastSessionSROs": [{
			    "statusCode": "INI",
			    "code": "se16ad61e2-9d73-4bb8-bf09-1651d61cbbaa",
			    "sessionType": "WRKT",
			    "startTime": 1448303400000,
			    "dayVisible": "Tuesday",
			    "timeSlot": "01:00PM Onwards",
			    "endTime": 1448307000000,
			    "scheduledStartTime": "2015-11-24 13:00:00"
			  }, {
			    "statusCode": "DNE",
			    "code": "se125360b5-8807-4b27-911d-bc4d295238d6",
			    "sessionType": "WRKT",
			    "startTime": 1448908200000,
			    "dayVisible": "Tuesday",
			    "timeSlot": "08:00 AM Onwards",
			    "endTime": 1448911800000,
			    "scheduledStartTime": "2015-12-01 08:00:00"
			  }, {
			    "statusCode": "INI",
			    "code": "sed8f6feba-99c6-4835-95b9-8c79980e43d7",
			    "sessionType": "WRKT",
			    "startTime": 1436985000000,
			    "dayVisible": "Thursday",
			    "timeSlot": "1:05 AM Onwards",
			    "endTime": 1436988600000,
			    "scheduledStartTime": "2015-07-16 01:05:00"
			  }],
			  "allRsdRequestPendingCode": []
			};
			if(oResponse && oResponse['statusCode']){
				if(oResponse['statusCode'] == '1000'){
					previousSessions = oResponse['pastSessionSROs'];
					return oResponse['pastSessionSROs'];
				}
				else if(oResponse['statusCode'] == '1010'){
					previousSessions = [];
					resetApp();
				}
			}
			else{
				showPop('An error occurred. Please try again later.');
				previousSessions = [];
				return null;
			}
		}
		else{
			previousSessions = [];
			resetApp();
		}
	}
	this.fetchUpcomingSessions = function(){
		if(sessionGroupCode.length > 0){
			var oPost = new Object();
			oPost['sessionGrpCode'] = sessionGroupCode;
			var url = '/proapp/sessionsforuser';
			var oResponse = postData(oPost, url);
			oResponse = {
			  "statusCode": "1000",
			  "message": "Success",
			  "sessionGroupCode": "sg5fa90890-fc05-461e-9ffe-f22f4c000594",
			  "alreadySessions": "2016-12-31,2015-12-22,2016-03-26,",
			  "cancellationCountLeft": 65,
			  "cancellationCountAllocated": 68,
			  "upcomingSessionSROs": [{
			    "statusCode": "INI",
			    "code": "se9ea73001-f124-44b0-97be-33e355fb0fea",
			    "sessionType": "WRKT",
			    "startTime": 1483122600000,
			    "dayVisible": "Saturday",
			    "timeSlot": "01:00PM Onwards",
			    "endTime": 1483126200000,
			    "scheduledStartTime": "2016-12-31 13:00:00"
			  }, {
			    "statusCode": "INI",
			    "code": "se830a5a26-4b66-4318-9f5d-40cc8482eed4",
			    "sessionType": "WRKT",
			    "startTime": 1450722600000,
			    "dayVisible": "Tuesday",
			    "timeSlot": "01:00PM Onwards",
			    "endTime": 1450726200000,
			    "scheduledStartTime": "2015-12-22 13:00:00"
			  }, {
			    "statusCode": "INI",
			    "code": "seeb6eeb8b-f4e6-4a07-8ddb-69fb97caa17d",
			    "sessionType": "WRKT",
			    "startTime": 1458930600000,
			    "dayVisible": "Saturday",
			    "timeSlot": "01:00PM Onwards",
			    "endTime": 1458934200000,
			    "scheduledStartTime": "2016-03-26 13:00:00"
			  }],
			  "pastSessionSROs": [{
			    "statusCode": "INI",
			    "code": "se16ad61e2-9d73-4bb8-bf09-1651d61cbbaa",
			    "sessionType": "WRKT",
			    "startTime": 1448303400000,
			    "dayVisible": "Tuesday",
			    "timeSlot": "01:00PM Onwards",
			    "endTime": 1448307000000,
			    "scheduledStartTime": "2015-11-24 13:00:00"
			  }, {
			    "statusCode": "DNE",
			    "code": "se125360b5-8807-4b27-911d-bc4d295238d6",
			    "sessionType": "WRKT",
			    "startTime": 1448908200000,
			    "dayVisible": "Tuesday",
			    "timeSlot": "08:00 AM Onwards",
			    "endTime": 1448911800000,
			    "scheduledStartTime": "2015-12-01 08:00:00"
			  }, {
			    "statusCode": "INI",
			    "code": "sed8f6feba-99c6-4835-95b9-8c79980e43d7",
			    "sessionType": "WRKT",
			    "startTime": 1436985000000,
			    "dayVisible": "Thursday",
			    "timeSlot": "1:05 AM Onwards",
			    "endTime": 1436988600000,
			    "scheduledStartTime": "2015-07-16 01:05:00"
			  }],
			  "allRsdRequestPendingCode": []
			};
			if(oResponse && oResponse['statusCode']){
				if(oResponse['statusCode'] == '1000'){
					upcomingSessions = oResponse['upcomingSessionSROs'];
					return oResponse['upcomingSessionSROs'];
				}
				else if(oResponse['statusCode'] == '1010'){
					upcomingSessions = [];
					resetApp();
				}
			}
			else{
				showPop('An error occurred. Please try again later.');
				upcomingSessions = [];
				return null;
			}
		}
		else{
			upcomingSessions = [];
			resetApp();
		}
	}
	this.getPreviousSessions = function(){
		return previousSessions;
	}
	this.getUpcomingSessions = function(){
		return upcomingSessions;
	}
	function validateForm(frm){
		if($(frm).hasClass("statsForm")){
			// validate statsForm
			var dob = $(frm).find('.profileFormFields[name="dob"]').val();
			var hgt = $(frm).find('.profileFormFields[name="height"]').val();
			var wgt = $(frm).find('.profileFormFields[name="weight"]').val();

			if(!dob || !isDate(dob)){
				$(frm).find('.profileFormFields[name="dob"]').addClass("error").focus();
				return false;
			}
			else {
				$(frm).find('.profileFormFields[name="dob"]').removeClass("error");
			}
			if(!hgt || isNaN(hgt) || parseFloat(hgt) < 100 || parseFloat(hgt) > 210){
				$(frm).find('.profileFormFields[name="height"]').addClass("error").focus();
				return false;
			}
			else {
				$(frm).find('.profileFormFields[name="height"]').removeClass("error");
			}
			if(!wgt || isNaN(wgt) || parseFloat(wgt) < 30 || parseFloat(wgt) > 200){
				$(frm).find('.profileFormFields[name="weight"]').addClass("error").focus();
				return false;
			}
			else {
				$(frm).find('.profileFormFields[name="weight"]').removeClass("error");
			}
			return true;
		}
		else if ($(frm).hasClass("profileForm")) {
			// validate profileForm
			var nam = $(frm).find('.profileFormFields[name="name"]').val();
			var mob = $(frm).find('.profileFormFields[name="mobileNumber"]').val();
			var pw = $(frm).find('.profileFormFields[name="password"]').val();
			var loc = $(frm).find('.profileFormFields[name="location"]').val();

			if(!nam || !testName(nam)){
				$(frm).find('.profileFormFields[name="name"]').addClass("error").focus();
				return false;
			}
			else {
				$(frm).find('.profileFormFields[name="name"]').removeClass("error");
			}
			if(!mob || isNaN(mob) || mob.length != 10 || mob.indexOf("0") == 0){
				$(frm).find('.profileFormFields[name="mobileNumber"]').addClass("error").focus();
				return false;
			}
			else {
				$(frm).find('.profileFormFields[name="mobileNumber"]').removeClass("error");
			}
			if(!pw || pw.length < 6){
				$(frm).find('.profileFormFields[name="password"]').addClass("error").focus();
				return false;
			}
			else {
				$(frm).find('.profileFormFields[name="password"]').removeClass("error");
			}
			return true;
		}
		else {
			// default
		}
	}
}

function getData(url){
	var response = null;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function(data) {
            response = data;
        },
        error: function(xhr, status, thrown)
        {

        }
    });
    return response;
}

function postData(profileObj, url){
	var response = null;
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(profileObj),
		async: false,
		processData: false, // Don't process the files
		contentType: 'application/json',
		success: function(data) {
			response = data;
		},
		error: function(xhr, status, thrown){

		}
	});
	return response;
}

function zeroPrefix(num){
	if (parseInt(num) > 9) {
		return parseInt(num);
	}
	else {
		return '0'+ parseInt(num);
	}
}
