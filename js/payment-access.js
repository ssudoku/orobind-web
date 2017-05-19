window.suggestedAccessPlan = 'ACR4';
window.planObj = [];
$(document).ready(function(){
	var planData = fetchPlans();
	window.planObj = [];
	if(planData && planData["leftCount"])
	{
		window.leftCount = planData["leftCount"];
	}
	else
	{
		window.leftCount = null;
	}
	if(planData && planData["lastDay"])
	{
		window.lastDay = planData["lastDay"];
	}
	else
	{
		window.lastDay = null;
	}
	if(planData && planData["responseCode"] && planData["responseCode"]==1000)
	{
		planData["accessSubDTO"].sort(function(a,b) { return parseInt(b["amount"]) - parseInt(a["amount"]) });
		for (var j in planData["accessSubDTO"])
		{
			if(planData["accessSubDTO"][j]["code"] == window.suggestedAccessPlan)
			{
				var divstr1 = '<div class="plan suggested '+planData["accessSubDTO"][j]["code"]+'" data-subcode="'+planData["accessSubDTO"][j]["code"]+'"><img class="suggestedImg" src="http://cdn.orobind.com/srv/static/imagesV2/suggested-white.png">';
				divstr1 += '<div class="planRow"><div class="accented"><span class="planMain">'+calcWeeks(planData["accessSubDTO"][j]["duration"])+'</span>';
				divstr1 += '<span class="discounted"><i class="fa fa-rupee"></i> <span class="value">'+calcDiscounted(planData["accessSubDTO"][j])+'</span></span></div>';
				if(calcDiscount(planData["accessSubDTO"][j]) > 0)
				{
					divstr1 += '<span class="discount">'+calcDiscount(planData["accessSubDTO"][j])+'% discount</span>';
				}
				divstr1 += '<button class="chooseSuggestedPlan">Choose plan <i class="fa fa-chevron-right"></i></button>';
				divstr1 += '</div></div><img class="divider" src="http://cdn.orobind.com/srv/static/imagesV2/divider-grey.png">';
				$('.wrapper .choiceRow').append(divstr1);
				window.planObj.push(planData["accessSubDTO"][j]);
			}
		}
		for (var i in planData["accessSubDTO"])
		{
			if(planData["accessSubDTO"][i]["code"] != window.suggestedAccessPlan)
			{
				var divstr = '<div class="plan '+planData["accessSubDTO"][i]["code"]+'" data-subcode="'+planData["accessSubDTO"][i]["code"]+'">';
				divstr += '<div class="planRow"><span class="planMain">'+calcWeeks(planData["accessSubDTO"][i]["duration"])+'</span>';
				if(calcDiscount(planData["accessSubDTO"][i]) > 0)
				{
					divstr += '<span class="discount">'+calcDiscount(planData["accessSubDTO"][i])+'% off</span>';
				}
				divstr += '<span class="discounted"><i class="fa fa-rupee"></i> <span class="value">'+calcDiscounted(planData["accessSubDTO"][i])+'</span> <i class="fa fa-chevron-right proceed"></i></span>';
				divstr += '</div></div>';
				$('.wrapper .choiceRow').append(divstr);
				window.planObj.push(planData["accessSubDTO"][i]);
			}
		}
	}
});
$(document).on("click",".backCta", function(e) {
	e.preventDefault(); e.stopPropagation();
	$('.wrapper2, .wrapper').fadeToggle(200);
});
$(document).on("click",".pageCta", function(e) {
	$('.submitForm')[0].submit();
});
$(document).on("click",".choiceRow .plan", function(e) {
	var sCode = $(this).attr("data-subcode");
	$('.submitForm').find('.subCodeContainer').val(sCode);

	var cObj = {};
	for(var key in window.planObj)
	{
		if(window.planObj[key]["code"] == sCode)
		{
			cObj = window.planObj[key];
		}
	}
	$('.choiceRow .chosen').detach();
	var divstr = '<div class="chosen '+cObj["code"]+'" data-subcode="'+cObj["code"]+'">';
	divstr += '<div class="planRow"><div class="accented"><span class="planMain">'+calcWeeks(cObj["duration"])+'</span>';
	divstr += '<span class="discounted"><i class="fa fa-rupee"></i> <span class="value">'+calcDiscounted(cObj)+'</span></span></div>';
	divstr += '</div></div>';
	$('.wrapper2 .choiceRow').append(divstr);
	$('.wrapper2, .wrapper').fadeToggle(200);

	if(window.leftCount || window.lastDay)
	{
		$('.paymentRow .tableTitle').each(function(){
			if($(this).text() == 'Current Balance')
			{
				$(this).show();
			}
		});
		$('.currentPlan').show();
		$('.currentPlan tbody').detach();
		var cpd = '<tbody>';
		if(window.leftCount)
		{
			cpd += '<tr><td>Days left in current plan</td><td>'+window.leftCount+'</td></tr>';
		}
		if(window.lastDay)
		{
			cpd += '<tr><td>Last day of current plan</td><td>'+window.lastDay.split("-").reverse().join("-")+'</td></tr>';
		}
		cpd += '</tbody>';
		$('.currentPlan').append(cpd);
	}
	else
	{
		$('.paymentRow .tableTitle').each(function(){
			if($(this).text() == 'Current Balance')
			{
				$(this).hide();
			}
		});
		$('.currentPlan').hide();
	}

	$('.summaryTable tbody').detach();
	var tbd = '<tbody><tr><td>Plan Chosen</td><td>'+cObj["duration"]+' Days</td></tr>';
	tbd += '<tr><td>Actual Price</td><td><i class="fa fa-rupee"></i> '+cObj["amount"]+'</td></tr>';
	tbd += '<tr><td>Discount</td><td>'+calcDiscount(cObj)+'%</td></tr>';
	tbd += '<tr><td>Payable Amount</td><td><i class="fa fa-rupee"></i> '+calcDiscounted(cObj)+'</td></tr></tbody>';
	$('.summaryTable').append(tbd);
	$('.summaryTable, .newPayment .submitForm').fadeIn(200);
});

function calcWeeks(obj)
{
	var wks = parseFloat(Math.floor(obj/7));
	if(wks == parseFloat(obj/7))
	{
		if(wks > 1)
		{
			var retVal = wks + ' Weeks';
		}
		else
		{
			var retVal = wks + ' Week';
		}
	}
	else
	{
		var retVal = obj + ' Days';
	}
	return retVal;
}

function calcDiscount(obj)
{
	var amt = obj["amount"]; var dsc = obj["discount"];
	if(Math.floor(dsc/amt*100) >= parseFloat(dsc/amt*100))
	{
		return parseInt(dsc/amt*100);
	}
	else
	{
		return parseFloat(dsc/amt*100).toFixed(2);
	}
}
function calcDiscounted(obj)
{
	var amt = obj["amount"]; var dsc = obj["discount"];
	return amt-dsc;
}

function fetchPlans()
{
	var hiddenId = $('.paymentRow form').find('input[name="id"]').val();
	resultObject = fetchAccess(hiddenId);
	resultObject = {

    "response": "successfully fetched",
    "responseCode": "1000",
    "status": "Success",
    "leftCount": "16",
    "lastDay": "2015-08-19",
    "accessSubDTO": 
    [
        {
            "code": "ACR2",
            "amount": 2000,
            "duration": 14,
            "discount": 200
        },
        {
            "code": "ACR1",
            "amount": 1000,
            "duration": 7,
            "discount": 0
        },
        {
            "code": "ACR3",
            "amount": 3000,
            "duration": 21,
            "discount": 500
        },
        {
        	"code": "ACR4",
            "amount": 4000,
            "duration": 42,
            "discount": 1000
        }
    ]};
    return resultObject;
}
// Base AJAX function for retrieving the promocode validation
function fetchAccess(hId)
{
	var result = null;
	url = "/getAccessRenOption?" + "id=" + hId;
	$.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data) {
			result = data;
		}
    });
	return result;
}