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
function openDownload()
{
	analytics.track("Download app modal opened");
	if($('body').hasClass('android'))
	{
		var platform = 'android';
	}
	else if($('body').hasClass('ios'))
	{
		var platform = 'ios';
	}
	else
	{
		var platform = 'others';
	}

	switch(platform) {
		case 'ios':
			$('.appDownloadModal .iosDevice').show();
			$('.appDownloadModal .androidDevice, .appDownloadModal .normal').hide();
		break;
		case 'android':
			$('.appDownloadModal .androidDevice').show();
			$('.appDownloadModal .iosDevice, .appDownloadModal .normal').hide();
		break;
		case 'others':
			$('.appDownloadModal .normal').show();
			$('.appDownloadModal .iosDevice, .appDownloadModal .androidDevice').hide();
		break;
	}

	$('.modal').fadeIn(50);
	$('.appDownloadModal').fadeIn(100);
	startTimer(platform);
}
function startTimer(platform)
{
	if(platform == 'others')
	{
		return false;
	}
	else if(platform == 'android')
	{
		var link = 'https://play.google.com/store/apps/details?id=com.orobind';
	}
	else if(platform == 'ios')
	{
		var link = 'https://itunes.apple.com/in/app/orobind/id995900882';
	}
	window.redirTimer = setTimeout(function() {
		window.open(link,'_self');
	},5000);
	var t = 5;
	window.redirCountDown = setInterval(function(){
		t--;
		$('.appDownloadModal .timer .redirTime').text(t);
		if(t < 1)
		{
			window.clearInterval(window.redirCountDown);
		}
	},1000);
}
function closeDownload()
{
	$('.modal').fadeOut(100);
	$('.appDownloadModal').fadeOut(50);
}
$(document).ready(function(){
	var currentPath = window.location.href;
	currentPath.replace("http://www.orobind.com","");
	$('.choice.ios').click(function(e){
		window.open('https://itunes.apple.com/in/app/orobind/id995900882','_self');
	});
	$('.choice.android').click(function(e){
		window.open('https://play.google.com/store/apps/details?id=com.orobind','_self');
	});
	$('.topDownload, .sidedownload').click(function(e){
		e.preventDefault(); e.stopPropagation();
		openDownload();
	});
	$('.closeAppDownload').click(function(e){
		e.preventDefault(); e.stopPropagation();
		closeDownload();
	});
	$('.callbackCTA').click(function(e){
		var x = $(this).parent('form');
		analytics.track("Callback request submit clicked",{
			"form":"Request callback form top right homepage",
			"path":window.location.pathname
		});
		if(!validate(x))
		{
			e.preventDefault(); e.stopPropagation();
			analytics.track("Callback request submit failed - validation",{
				"form":"Request callback form top right homepage",
				"path":window.location.pathname
			});
		}
	});
	$(".mainFormCta").click(function(e){
		var x = $(this).parent('form');
		analytics.track("Callback request submit clicked",{
			"form":"Homepage main form"
		});
		if(!validate(x))
		{
			e.preventDefault(); e.stopPropagation();
			analytics.track("Callback request submit failed - validation",{
				"form":"Homepage main form"
			});
		}
	});
	if($(window).width() < 768)
	{
		var divheight = $('section.home').height() * 1.77777778;
		$('video#bgvid').width(divheight);
		$('video#bgvid').height($('section.home').height());
	}
	$('.cancelRedir').click(function(e){
		window.clearInterval(window.redirCountDown);
		window.clearTimeout(window.redirTimer);
		$('.appDownloadModal .normal').show();
		$('.appDownloadModal .iosDevice, .appDownloadModal .androidDevice').hide();
	});
	$('.callback, .secondary').click(function(e){
		//closeDownload();
		//$('.modal').fadeIn(100);
		//$('.callbackModal').fadeIn(250);
		//$('.wrapper, .sidenav').removeClass('active');
		//e.preventDefault(); e.stopPropagation();
		analytics.track("Request callback button clicked on nav menu");
		setTimeout(function(){
			window.location.href = "http://www.orobind.com/tryit";
		},200);
	});
	$('.mainCta').click(function(e){
		//closeDownload();
		//$('.modal').fadeIn(100);
		//$('.callbackModal').fadeIn(250);
		//$('.wrapper, .sidenav').removeClass('active');
		//e.preventDefault(); e.stopPropagation();
		analytics.track("Main cta clicked to request callback");
		setTimeout(function(){
			window.location.href = "http://www.orobind.com/tryit";
		},200);
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
	$('.mediaThumb img').hover(function(){
		var x = $(this).attr('data-switch');
		var y = $(this).attr('src');
		$(this).attr({'src': x, 'data-switch':y});
	},
	function(){
		var x = $(this).attr('data-switch');
		var y = $(this).attr('src');
		$(this).attr({'src': x, 'data-switch':y});
	});
	$('.mediaThumb a').click(function(e){
		e.preventDefault(); e.stopPropagation();
		analytics.track("Click on media link",{
			"publisher":$(this).attr("data-publisher"),
			"callback":function(){ window.location.href = $(this).attr("href") }
		});
	});
	if($(window).scrollTop() > 600)
	{
		stick();
	}
	else {
		window.scrollFlag = 0;
	}
	checkPoints = {}; i = 0;
	$('.topNav').find('a').each(function(){
		var href = $(this).attr('href');
		var elem = this;
		if(href.indexOf('#') == 0 && href.length > 1)
		{
			checkPoints[i+1] = {"elem" : elem, "href" : href};
			i++;
		}
	});
	$(window).scroll(function(e){
		underline(e);
		if($(window).scrollTop() > 500 && window.scrollFlag == 0)
		{
			stick();
		}
		else if($(window).scrollTop() < 500 && window.scrollFlag == 1)
		{
			nonstick();
		}

	});
	$(".info .readmore").click(function(e){
		analytics.trackLink(this, 'Clicked on read review', {
  		user: $(this).parent("h4").attr("data-name")
		});
	});
	$('.indicator img').click(function(){
		var t = $('section.home').height();
		$("html, body").animate({scrollTop:t}, 800, 'swing');
	});
	$('.sectionCTA').click(function(){
		toggleHidden(this);
	});
	$('.footer .social a').click(function(){
		if($(this).hasClass("fblink"))
		{
			analytics.track("Click on footer social link - facebook",{
				"path":window.location.pathname
			});
		}
		else if($(this).hasClass("twlink"))
		{
			analytics.track("Click on footer social link - twitter",{
				"path":window.location.pathname
			});
		}
	});
	$('.footer .footerNav a').click(function(e){
		var tgt = $(this).attr("href");
		var that = this;

		var about = new RegExp('tag=about');
		var team = new RegExp('tag=team');
		var faq = new RegExp('tag=faq');
		var blog = new RegExp('blog');
		var dl = new RegExp('download');

		if(about.test(tgt))
		{
			analytics.trackLink(that, 'Click on footer navigation link - about us', {
				"path":window.location.pathname,
			});
		}
		else if(team.test(tgt))
		{
			analytics.trackLink(that, 'Click on footer navigation link - team', {
				"path":window.location.pathname,
			});
		}
		else if(faq.test(tgt))
		{
			analytics.trackLink(that, 'Click on footer navigation link - faq', {
				"path":window.location.pathname,
			});
		}
		else if(blog.test(tgt))
		{
			analytics.trackLink(that, 'Click on footer navigation link - blog', {
				"path":window.location.pathname,
			});
		}
		else if(dl.test(tgt))
		{
			analytics.track("Click on footer navigation link - download app",{
				"path":window.location.pathname
			});
		}
	});
	$('.faq .col-md-6').eq(0).find('.faqlist .question').click(function(){
		var indx = $(this).parents('li').index();
		switch(indx){
			case 0:	var question = "what is orobind"; break;
			case 1: var question = "role of orobind"; break;
			case 2: var question = "need to download?"; break;
			case 3: var question = "how many sessions"; break;
			case 4: var question = "duration of sessions"; break;
			case 5: var question = "where will sessions happen"; break;
			case 6: var question = "is it safe"; break;
			case 7: var question = "free space"; break;
			case 8: var question = "what equipment needed"; break;
			case 9: var question = "where to get equipment"; break;
			case 10: var question = "post pregnancy workout safe?"; break;
			case 11: var question = "injuries"; break;
			case 12: var question = "unable to complete 12"; break;
		}
		analytics.track("faq question clicked",{
			"which":question
		});
	});
	$('.faq .col-md-6').eq(1).find('.faqlist .question').click(function(){
		var indx = $(this).parents('li').index();
		switch(indx){
			case 0:	var question = "kgs in 4 weeks"; break;
			case 1: var question = "who takes care of diet"; break;
			case 2: var question = "never worked out before?"; break;
			case 3: var question = "how many diet sessions"; break;
			case 4: var question = "how to reach coach"; break;
			case 5: var question = "supplements safe?"; break;
			case 6: var question = "how to pay orobind"; break;
			case 7: var question = "full payment advance?"; break;
			case 8: var question = "how to reschedule"; break;
			case 9: var question = "if coach doesnt show up"; break;
			case 10: var question = "kg loss or inch loss"; break;
			case 11: var question = "referral discount"; break;
			case 12: var question = "travel or discontinue"; break;
		}
		analytics.track("faq question clicked",{
			"which":question
		});
	});
	$('.topNav a').click(function(e){
		var tgt = $(this).attr("href");
		var that = this;
		if(tgt != "#")
		{
			switch(tgt){
				case "#how":
					analytics.track("Click on top navigation link - how it works",{
						"path":window.location.pathname
					});
				break;
				case "#team":
					analytics.track("Click on top navigation link - team",{
						"path":window.location.pathname
					});
				break;
				case "#media":
					analytics.track("Click on top navigation link - media",{
						"path":window.location.pathname
					});
				break;
				case "#faq":
					analytics.track("Click on top navigation link - faq",{
						"path":window.location.pathname
					});
				break;
				case "/user-reviews":
					analytics.trackLink(that, 'Clicked on #thegoodfight', {
			  		"path":window.location.pathname,
					});
				break;
			}
		}
		else
		{
			if($(this).hasClass("topDownload"))
			{
				analytics.track("Click on top navigation link - download app",{
					"path":window.location.pathname
				});
			}
			else if($(this).hasClass("callback"))
			{
				analytics.track("Click on top navigation link - request callback",{
					"path":window.location.pathname
				});
			}
		}
	});
	$('.sidenav a').click(function(){
		var tgt = $(this).attr("href");
		var that = this;
		if(tgt != "#")
		{
			switch(tgt){
				case "#how":
					analytics.track("Click on side navigation link - how it works",{
						"path":window.location.pathname
					});
				break;
				case "#media":
					analytics.track("Click on side navigation link - media",{
						"path":window.location.pathname
					});
				break;
				case "#team":
					analytics.track("Click on side navigation link - team",{
						"path":window.location.pathname
					});
				break;
				case "#faq":
					analytics.track("Click on side navigation link - faq",{
						"path":window.location.pathname
					});
				break;
				case "/user-reviews":
					analytics.trackLink(that, 'Clicked on #thegoodfight - sidenav', {
			  		"path":window.location.pathname,
					});
				break;
			}
		}
		else
		{
			if($(this).hasClass("sideDownload"))
			{
				analytics.track("Click on side navigation link - download app",{
					"path":window.location.pathname
				});
			}
			else if($(this).hasClass("callback"))
			{
				analytics.track("Click on side navigation link - request callback",{
					"path":window.location.pathname
				});
			}
		}
	});
	$(window).load(function() {
	function filterPath(string) {
		return string
		.replace(/^\//,'')
		.replace(/(index|default).[a-zA-Z]{3,4}$/,'')
		.replace(/\/$/,'');
	}
	var locationPath = filterPath(location.pathname);
	var scrollElem = scrollableElement('html', 'body');
	// Any links with hash tags in them (can't do ^= because of fully qualified URL potential)
	$('a[href*=#]').not('.callback, .secondary').each(function() {
	// Ensure it's a same-page link
	var thisPath = filterPath(this.pathname) || locationPath;
	if (  locationPath == thisPath
		&& (location.hostname == this.hostname || !this.hostname)
		&& this.hash.replace(/#/,'') ) {
			// Ensure target exists
			var $target = $(this.hash), target = this.hash;
			if (target) {
				// Find location of target
				var targetOffset = parseInt($target.offset().top);
				if($(window).width() > 768)
				{
					targetOffset -= (this.hash == '#how') ? 100 : 50;
				}
				else
				{
					targetOffset -= (this.hash == '#how') ? 65 : 50;
				}
				$(this).click(function(event) {
					// Prevent jump-down
					event.preventDefault();
					event.stopPropagation();
					// Animate to target
					$(scrollElem).animate({scrollTop: targetOffset}, 800);
				});
			}
		}
	});
	// Use the first element that is "scrollable"  (cross-browser fix?)
	function scrollableElement(els) {
		for (var i = 0, argLength = arguments.length; i <argLength; i++) {
			var el = arguments[i],
			$scrollElement = $(el);
			if ($scrollElement.scrollTop()> 0) {
				return el;
			} else {
				$scrollElement.scrollTop(1);
				var isScrollable = $scrollElement.scrollTop()> 0;
				$scrollElement.scrollTop(0);
				if (isScrollable) {
					return el;
				}
			}
		}
		return [];
	}
});
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
var logo = $('.topLogo img');
function stick(){
	$('.topNav').addClass('sticky');
	window.scrollFlag = 1;
	var x = $(logo).attr('data-switch');
	var y = $(logo).attr('src');
	$(logo).attr({'src': x, 'data-switch':y});
}
function nonstick(){
	$('.topNav').removeClass('sticky');
	window.scrollFlag = 0;
	var x = $(logo).attr('data-switch');
	var y = $(logo).attr('src');
	$(logo).attr({'src': x, 'data-switch':y});
}
function toggleHidden(obj){
	$(obj).parents('section.pageBlocks').find('.hidden').toggle(300);
	var fin = ($(obj).text() == 'View More') ? 'View Less' : 'View More';
	$(obj).text(fin);
}
function validate(formobj){
	var nameobj = $(formobj).find('input').eq(0);
	var emailobj = $(formobj).find('input').eq(1);
	var mobileobj = $(formobj).find('input').eq(2);
	var namestr = nameobj.val();
	if (nameobj.val() == '' || nameobj.val().length < 3)
	{
		nameobj.addClass('error').focus();
		return false;
	}
	else if (/^[a-zA-Z ]*$/.test(namestr) == false)
	{
		nameobj.addClass('error').removeClass("valid").focus();
		return false;
	}
	else if (emailobj.val() == '' || emailobj.val().length < 6 || !isNaN(emailobj.val()) || emailobj.val().indexOf('@') == -1 || emailobj.val().indexOf('.') == -1)
	{
		nameobj.removeClass('error').addClass("valid");
		emailobj.addClass('error').removeClass("valid").focus();
		return false;
	}
	else if (mobileobj.val() == '' || mobileobj.val().length < 10)
	{
		emailobj.removeClass('error').addClass("valid");
		mobileobj.addClass('error').removeClass("valid").focus();
		return false;
	}
	else
	{
		$(formobj).find('input').each(function(){
			$(this).removeClass('error').addClass("valid");
		});
		return true;
	}
}
var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	},
	default: function() {
		return navigator.userAgent
	}
};

//show modal message
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
