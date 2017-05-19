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
$(window).resize(function(){
	if(window.innerWidth < 768){
		switchImg(768);
	}
	if(window.innerWidth > 768){
		switchImg(992);
	}
});
$(document).ready(function(){
	if(window.innerWidth < 768){
		switchImg(768);
	}
	if(window.innerWidth > 768){
		switchImg(992);
	}
});
$(document).on("click",".planCta",function(){
	$(".renew").fadeOut(100);
	$(".renew.step2").fadeIn(150);
});
$(document).on("click",".step2 .back",function(){
	$(".renew").fadeIn(150);
	$(".renew.step2").fadeOut(100);
});
