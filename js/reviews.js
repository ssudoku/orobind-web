$(document).ready(function(){
	$("#requestACallForm").ajaxForm({
			success: function(response, statusText, xhr, $form)  {
					$('.callbackModal').addClass('hit');
					analytics.track("Request callback form submitted successfully",{
						"from":"Neither ios nor android"
					});
			},
			error: function(response, statusText, error, $form)  {
					$('.callbackModal').addClass('miss');
					analytics.track("Request callback form submit failed",{
						"from":"Neither ios nor android",
						"reason":"request timed out"
					});
			}
	});
	$("#requestACallForm2").ajaxForm({
			success: function(response, statusText, xhr, $form)  {
					$('.leadsModal').addClass('hit');
					analytics.track("Request callback form submitted successfully",{
						"from":"Callback modal"
					});
			},
			error: function(response, statusText, error, $form)  {
					$('.leadsModal').addClass('miss');
					analytics.track("Request callback form submit failed",{
						"from":"Callback modal",
						"reason":"request timed out"
					});
			}
	});
	$("#requestACallForm3").ajaxForm({
			success: function(response, statusText, xhr, $form)  {
					$('.videoWrap .innerForm').addClass('hit');
					analytics.track("Request callback form submitted successfully",{
						"from":"Video callback form"
					});
			},
			error: function(response, statusText, error, $form)  {
					$('.videoWrap .innerForm').addClass('miss');
					analytics.track("Request callback form submit failed",{
						"from":"Video callback form",
						"reason":"request timed out"
					});
			}
	});
	$(".mainCallForm").ajaxForm({
			success: function(response, statusText, xhr, $form)  {
					showModalMessage({
						"message":"Thank you for your interest in Orobind. We will reach out to your within 48 hours."
					});
					analytics.track("Request callback form submitted successfully",{
						"from":"Main callback form"
					});
			},
			error: function(response, statusText, error, $form)  {
				showModalMessage({
					"message":"Some error occured. Check your connection and try again later."
				});
				analytics.track("Request callback form submit failed",{
					"from":"Main callback form",
					"reason":"request timed out"
				});
			}
	});
	$(".testiCta").click(function(){
		$(".leadsModal").removeClass("hit");
		$(".leadsModal").removeClass("miss");
		$(".modal, .leadsModal").fadeIn(100);
		analytics.track("Callback button below testimonial clicked",{
			"user":$(this).siblings(".userName").text()
		});
	});
	$(".leadsModal .close").click(function(){
		$(".leadsModal").removeClass("hit");
		$(".leadsModal").removeClass("miss");
		$(".leadsModal, .modal").fadeOut(100)
	});
	$('.topNav .callback, .sidenav .callback').off();
	$('.topNav .callback, .sidenav .callback').click(function(e){
		e.preventDefault(); e.stopPropagation();
		closeDownload();
		$('.modal').fadeIn(100);
		$('.leadsModal').fadeIn(250);
		$('.wrapper, .sidenav').removeClass('active');
		analytics.track("Callback button on navigation menu clicked");
	});
	$(".videoWrap .close").click(function(){
		$(".videoWrap").removeClass("active");
		$(".videoWrap .innerForm").removeClass("hit");
		$(".videoWrap .innerForm").removeClass("miss");
		$(".videoWrap iframe").detach();
	});
	$(".playButton").click(function(){
		var pId = $(this).attr("data-videoid");
		var srccode='<iframe class="videoEmbed" width="720" height="405" src="https://www.youtube-nocookie.com/embed/'+ pId +'?autoplay=1&color=white&rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
		$(".videoWrap .innerVideo").append(srccode);
		$(".videoWrap").addClass("active");
		analytics.track("Video playback button clicked on testimonial",{
			"user":$(this).siblings(".userName").text()
		});
	});
});
