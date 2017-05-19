var baseUrl = window.location.protocol+'//'+window.location.host+'/';

function updateProfile(profileObj){
	var url = baseUrl+'proapp/profileupdate';
	return postData(profileObj, url);
}

function bookSession(obj){
	var url = baseUrl+'proapp/createsession/v2';
	return postData(obj, url);
}

function rescheduleSession(obj){
	var url = baseUrl+'proapp/reschedulesession/v2';
	return postData(obj, url);
}

function cancelSession(obj){
	var url = baseUrl+'proapp/cancelsession/v2';
	var result = postData(obj, url);
	if(result && result['responseCode']){
		if(result['responseCode'] == '1000'){
			fetchAndRenderUpcomingSessions();
		}
		else if(result['responseCode'] == '1010'){
			resetApp();
		}
	}
	else{
		showPop('An error occurred. Please try again later.');
		return null;
	}
}

function fetchAndRenderPastSessions(obj){
	var aSessions = user.fetchPreviousSessions();
	if(aSessions){
		var html = '';
		for(var i=0; i<aSessions.length; i++){
			html+='<tr>';
			html+='<td class="coach"><img class="coachImg" src="/img/proapp/instructor.jpg"><span class="coachName">'+user.getTrainerName()+'</span></td><td class="date">'+moment(new Date(aSessions[i]['startTime'])).format('DD-MM-YYYY')+'</td><td class="action"><button class="actionItem" data-date="'+moment(new Date(aSessions[i]['startTime'])).format('YYYY-MM-DD')+'" data-sess-index="'+i+'"><span class="hideSmall">Report Issue</span><span class="hideLarge">Help!</span></button></td>';
			html+='</tr>';
		}
		$(".tabSection.past tbody").html(html);
		$(".tabSection.past").fadeIn(100);
	}
}

function fetchAndRenderUpcomingSessions(obj){
	var aSessions = user.fetchUpcomingSessions();
	if(aSessions){
		var html = '';
		for(var i=0; i<aSessions.length; i++){
			html+='<tr>';
			html+='<td class="coach"><img class="coachImg" src="/img/proapp/instructor.jpg"><span class="coachName">'+user.getTrainerName()+'</span></td><td class="date">'+moment(new Date(aSessions[i]['startTime'])).format('DD-MM-YYYY')+'</td><td class="startTime">'+aSessions[i]['timeSlot']+'</td><td class="action"><button class="actionItem changeSessionCta" data-date="'+moment(new Date(aSessions[i]['startTime'])).format('YYYY-MM-DD')+'" data-sess-index="'+i+'"><span class="hideSmall">Cancel / Reschedule</span><i class="fa fa-history hideLarge"></i></button></td>';
			html+='</tr>';
		}
		$(".tabSection.upcoming table.sessionsTable tbody").html(html);
		$(".tabSection.upcoming").fadeIn(100);
	}
}

function fetchInventory(oPost,sDate){
	var url = baseUrl+'proapp/fetchcoachavailability/v2';
	var response = postData(oPost,url);
	if(response && response['responseCode']){
		if(response['responseCode'] == '1000'){
			try{
				var aTimeSlots = response['dates'][0]['slotsAvailable'];
				return aTimeSlots;
			}
			catch(e){
				return null;
			}
		}
		else if(response['responseCode'] == '1010'){
			resetApp();
		}
	}
	else{
		showPop('An error occurred. Please try again later.');
		return null;
	}
}

function fetchSubscriptionData(){
	var url = baseUrl+'proapp/existingsubscription';
	var response = getData(url);
	response = {
    "response": "success",
    "responseCode": "1000",
    "status": "Active",
    "planName": "Orobind Express",
    "expiryDate": "2016-01-31",
    "sessionsLeft": 14
	};
	if(response && response['responseCode']){
		if(response['responseCode'] == '1000'){
			return response;
		}
		else if(response['responseCode'] == '1010'){
			resetApp();
			return null;
		}
	}
	else{
		showPop('An error occurred. Please try again later.');
		return null;
	}
}

function fetchPreviousPayments(){
	var url = baseUrl+'proapp/alltransactions';
	var response = getData(url);
	response = {
    "response": "Success Fetched",
    "responseCode": "1000",
    "status": null,
    "userIndividualPaymentSRO": [
      {
        "amount": 6000,
        "paymentAmout": 6000,
        "promoAmount": 0,
        "offerAmount": 0,
        "transactionCode": "txn-11981345141434995444",
        "refAmount": 0,
        "socAmount": 0,
        "txnDate": "2015-06-22 17:50:44",
        "status": "INI",
        "paymentMode": "Online payment",
        "userName": null,
        "userEmail": null
      },
      {
        "amount": 6000,
        "paymentAmout": 6000,
        "promoAmount": 0,
        "offerAmount": 0,
        "transactionCode": "txn-6175413061435857603",
        "refAmount": 0,
        "socAmount": 0,
        "txnDate": "2015-07-02 17:20:03",
        "status": "INI",
        "paymentMode": "Online payment",
        "userName": null,
        "userEmail": null
      }
    ]
	};
	if(response && response['responseCode']){
		if(response['responseCode'] == '1000'){
			var paymentsArr = response['userIndividualPaymentSRO'];
			return paymentsArr;
		}
		else if(response['responseCode'] == '1010'){
			resetApp();
			return null;
		}
	}
	else{
		showPop('An error occurred. Please try again later.');
		return null;
	}
}

function resetApp(){
	location.reload(true);
}

function resetModify(){
	$(".rescheduleBlock .slotContainer").detach();
	$(".rescheduleBlock .dateBlock").removeClass("active");
	$(".rescheduleBlock .options #reason1").click();
	$(".rescheduleBlock, .modifySession").fadeOut(100);
	$(".sessionsTable, .chooseBlock").fadeIn(100);
}

function fetchSessions(obj){
	url = baseUrl+'proapp/sessionsforuser';
	return postData(obj, url);
}
