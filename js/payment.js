// Scripts for the payment page
$(document).on("click",".planCta", function(e){
	e.preventDefault(); e.stopPropagation();
	$(".planInner").removeClass("chosen");
	$(this).parents(".planInner").addClass("chosen");
	$(this).parents(".plan").removeClass("col-sm-4").addClass("full").siblings(".plan").toggle();
	$('.orderCol, .formWrap').toggle();
});
$(document).on("click",".success", function(e){
	e.preventDefault(); e.stopPropagation();
	$(".planInner").removeClass("chosen");
	$(this).parents(".plan").removeClass("full").addClass("col-sm-4").siblings(".plan").toggle();
	$('.orderCol, .formWrap').toggle();
});
$(window).load(function(){
	underline();
	var x = window.location.search.replace("?", "");
	if (x.length > 0)
	{
		tmp = x.split('=');
		str = '#' + tmp[1];
		for (var key in checkPoints)
		{
			if (checkPoints[''+key+'']['href'] == str)
			{
				var ran = key;
				setTimeout(function(){
					$(checkPoints[ran]['elem']).click();
				}, 250);
			}
		}
	}
});
$(document).ready(function(){
	$('.callbackCTA').click(function(e){
		e.preventDefault(); e.stopPropagation();
		var x = $(this).parent('form');
		if(validate(x))
		{
			$(x).submit();
		}
	});
	$('.callback, .secondary').click(function(e){
		$('.modal').fadeIn(100);
		$('.callbackModal').fadeIn(250);
		$('.wrapper, .sidenav').removeClass('active');
		e.preventDefault(); e.stopPropagation();
	});
	$('.closeCallback, button.hit').click(function(){
		closeCallback();
	});
	$('.modal').click(function(){
		closeCallback()
	});
	$('.menutoggle').click(function(){
		$('.wrapper, .sidenav').toggleClass('active');
	});
	$('.sidenavlist a').not('.callback').click(function(){
		$('.wrapper, .sidenav').toggleClass('active');
	});
	checkPoints = {}; i = 0;
});

function closeCallback()
{
	$('.callbackModal').fadeOut(100);
	$('.modal').fadeOut(250);
	$('.callbackModal').removeClass('hit miss');
}
function underline(eventobj)
{
	for (var indx in checkPoints)
	{
		if($(window).scrollTop() >= checkPoints[indx]["scrollStart"]-200 && $(window).scrollTop() <= checkPoints[indx]["scrollEnd"]-200)
		{
			$('.topNav a').removeClass('current');
			$(checkPoints[indx]["elem"]).addClass('current');
		}
		else if($(window).scrollTop() <= checkPoints[1]["scrollStart"]-200)
		{
			$('.topNav a').removeClass('current');
		}
	}
}