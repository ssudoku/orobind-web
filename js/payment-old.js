//payment page scripts

$(document).ready(function() {
	var planData = fetchPlans();
	if(planData && planData["responseCode"] && planData["responseCode"] == 1000)
	{
		for (var i in planData["userSubDTO"])
		{
			var trow = '<tr>';
			trow += '<td><div class="offerPeriod"><span class="sessCount">'+ planData["userSubDTO"][i]["sessionCount"] +'</span> Sessions</div></td>';
			trow += '<td><span class="sessPeriod">'+ Math.floor(parseInt(planData["userSubDTO"][i]["sessionCount"])/12) +'</span> Months</td>';
			trow += '<td><i class="fa fa-rupee"></i> <span class="planAmount">'+ planData["userSubDTO"][i]["amount"] +'</span></td>';
			trow += '<td><i class="fa fa-rupee"></i> <span class="planDiscount">'+ planData["userSubDTO"][i]["discount"] +'</span> <span class="discountPercent">('+ Math.floor(100*parseInt(planData["userSubDTO"][i]["discount"])/planData["userSubDTO"][i]["amount"]) +'% off)</span></td>';
			trow += '<td><i class="fa fa-rupee"></i> <span class="planDiscountedAmount">'+ Math.floor(parseInt(planData["userSubDTO"][i]["amount"]) - parseInt(planData["userSubDTO"][i]["discount"])) +'</span></td>';
			trow += '<td><div class="choice button" data-plan='+ planData["userSubDTO"][i]["code"] +'>Choose <i class="fa fa-check"></i></div></td>';
			trow += '</tr>';
			$('.planChoice tbody').append(trow);
		}
		switchTable();
	}
});
function switchTable()
{
    $(".planChoice").each(function() {
        var $this = $(this);
        var newrows = [];
        $this.find("tr").each(function(){
            var i = 0;
            $(this).find("td, th").each(function(){
                i++;
                if(newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
                newrows[i].append($(this));
            });
        });
        $this.find("tr").remove();
        $.each(newrows, function(){
            $this.append(this);
        });
    });
}

function fetchPlans() {
	var url = '/getusersubrenoption?id=1022212524';
	var x = getData(url);
	return x;
}
function getData(url) {
    var result = null;
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
			alert(thrown);
		}
    });
    return result;
}
$(document).ready(function(){
	$('.promoCta').click(function(e){
		e.preventDefault(); e.stopPropagation();
		amountArray = $('.summaryTable td.billAmount').html().split(" ");
		for(var key in amountArray)
		{
			if(!isNaN(amountArray[key]))
			{
				$('.summaryTable td.billAmount').attr("data-original",amountArray[key]);
			}
		}
		if(validatePromo())
		{
			compileFetch();
			if(resultObject["responseCode"] != 1000)
			{
				$('.paymentRow form h3.successMsg').remove();
				if($('.paymentRow form h3.errorMsg').length !==0)
				{
					$('.paymentRow form h3.errorMsg').html('<i class="fa fa-exclamation-circle"></i> '+resultObject["response"]);
				}
				else
				{
					$('.paymentRow form').prepend('<h3 class="errorMsg"><i class="fa fa-exclamation-circle"></i> '+resultObject["response"]+'</h3>');
				}
				for (var key in amountArray)
				{
					if(!isNaN(amountArray[key]))
					{
						amountArray[key] = $('.summaryTable td.billAmount').attr("data-original");
					}
				}
				var totalAdjusted = amountArray.join(" ");
				$('.summaryTable td.billAmount').html(totalAdjusted);
				$('.summaryTable td.discountAmount').html('<i class="fa fa-rupee"></i> 0');
			}
			else
			{
				$('.paymentRow form h3.errorMsg').remove();
				if($('.paymentRow form h3.successMsg').length !== 0)
				{
					$('.paymentRow form h3.successMsg').html('<i class="fa fa-check"></i> '+resultObject["response"]);
				}
				else
				{
					$('.paymentRow form').prepend('<h3 class="successMsg"><i class="fa fa-check"></i> '+resultObject["response"]+'</h3>');
				}
				for (var key in amountArray)
				{
					if(!isNaN(amountArray[key]))
					{
						amountArray[key] = $('.summaryTable td.billAmount').attr("data-original") - resultObject["promoAmount"];
					}
				}
				var totalAdjusted = amountArray.join(" ");
				$('.summaryTable td.billAmount').html(totalAdjusted);
				$('.summaryTable td.discountAmount').html('<i class="fa fa-rupee"></i> '+ resultObject["promoAmount"]);
			}
		}
	});
	
});

// Function to validate if promo code is present in UI
function validatePromo()
{
	$box = $('.paymentRow form').find('input.promoInput');
	var promoCode = $box.val();
	if(promoCode == '')
	{
		$box.addClass('error').focus();
		return false;
	}
	else
	{
		$box.removeClass('error');
		return true;
	}
}

// Function to compile promocode validation parameters
function compileFetch()
{
	var hiddenCode = $('.paymentRow form').find('input:hidden[name="code"]').val();
	var hiddenId = $('.paymentRow form').find('input:hidden[name="id"]').val();
	var totalAmount = $('.summaryTable td.billAmount').attr("data-original");
	var promoCode = $('.paymentRow form').find('input.promoInput').val();
	resultObject = fetchPromo(hiddenCode,hiddenId,promoCode,totalAmount);
}
// Base AJAX function for retrieving the promocode validation
function fetchPromo(hCode,hId,pCode,amount)
{
	var result = null;
	url = "/validatepromoforsubscription?" + "code=" + hCode + "&id=" + hId + "&promo=" + pCode + "&amount=" + amount;
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
	/*
	var resultTrue = {"response":"Promo Code Applied","responseCode":"1000","status":null,"promoAmount":300};
	var resultFalse = {"response":"Invalid Promo Code","responseCode":"1001","status":null,"promoAmount":null};
	return resultTrue;*/
}

var timer;
$(document).on("click",".choice.button",function(e){
    if(timer)
    {
        window.clearTimeout(timer);
    }
    $(".choice.button").removeClass("active");
    $(this).addClass("active");
    var sC = $(this).attr("data-plan");
    timer = window.setTimeout(function(){
        var paymentData = fetchPayment({"subCode":sC});
        if(paymentData && paymentData["responseCode"] && paymentData["responseCode"] == 1000)
        {
            var tbody = '<tr><td>Your current balance</td><td><i class="fa fa-rupee"></i> '+ paymentData["userProfileViewDTO"]["userCredit"] +'</td></tr>';
            tbody += '<tr><td>Credits to be added</td><td><i class="fa fa-rupee"></i> '+ paymentData["userProfileViewDTO"]["rechargeAmount"] +'</td></tr>';
            tbody += '<tr><td>New balance after purchase</td><td><i class="fa fa-rupee"></i> '+ paymentData["userProfileViewDTO"]["totalAmountAfterRecharge"] +'</td></tr>';
            tbody += '<tr><td>Discount</td><td class="discountAmount"><i class="fa fa-rupee"></i> '+ paymentData["userProfileViewDTO"]["advPayDiscount"] +'</td></tr>';
            tbody += '<tr><td>Referral Discount</td><td class="discountAmountRef"><i class="fa fa-rupee"></i> '+ paymentData["userProfileViewDTO"]["refDiscount"] +'</td></tr>';
            tbody += '<tr><td>Social Networking Discount</td><td class="discountAmountSocNet"><i class="fa fa-rupee"></i> '+ paymentData["userProfileViewDTO"]["socNetDiscount"] +'</td></tr>';
            tbody += '<tr><td>Billable Amount</td><td class="billAmount" data-original="'+ paymentData["userProfileViewDTO"]["rechargeAmount"] +'"><i class="fa fa-rupee"></i> '+ Math.floor(parseInt(paymentData["userProfileViewDTO"]["rechargeAmount"]) - parseInt(paymentData["userProfileViewDTO"]["socNetDiscount"]) - parseInt(paymentData["userProfileViewDTO"]["advPayDiscount"]) - parseInt(paymentData["userProfileViewDTO"]["refDiscount"])) +'</td></tr>';
            $('.summaryTable tbody tr').detach();
            $('.submitForm').find('input.subCodeContainer').val(sC);
            $('.summaryTable').append(tbody).show(100);
            $('.submitForm').show(100);
        }
    },500);
});

function fetchPayment(arg) {
    var subCode = arg["subCode"];
    var url = '/getsuboptionbycode?id=1022212524&code=ae5f0e8b368511b6f88a95b3f350227b8d2c0f90d5d7a0727acd15e0b477257315cda3715bbe54862f66ac69cc81406ff6abbabbc20eb5c0b6dbd1872da1dbcc'+'&subCode='+subCode;
    var x = getData(url);
    return x;
}