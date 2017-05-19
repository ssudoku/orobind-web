<%@ include file="/tld_includes.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Personal Fitness Coaches, Diet Plans, Workout Routines, Nutrition Support & more - Orobind</title>
		<link rel="icon" type="image/ico" href="http://cdn.orobind.com/srv/static/imagesV2/favicon.ico">
		<!--include jquery-->
	    <script src="${path.js('webpages-V2/jquery.min.js')}"></script>
		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
			<script src="js/html5shiv.min.js"></script>
			<script src="js/respond.min.js"></script>
		<![endif]-->
		<link href="${path.css('webpagesV3/index-v2.css')}" rel="stylesheet">
		<!--<link href="${path.css('webpages-V2/signupmodal.css')}" rel="stylesheet">-->
		<script src="//load.sumome.com/" data-sumo-site-id="6ea10718c4cea43d02f3b105ec8fc7b2c0416bdda302fe4bcbc0b99b3958e005" async="async"></script>
		<link href='http://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'>
		<link href='http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css' rel='stylesheet' type='text/css'>
		<meta property="og:image" content="http://cdn.orobind.com/srv/static/imagesV2/vid-screenshot.jpg" />
        <meta property="og:title" content="Presenting the most convenient way to be healthy." />
        <meta property="og:site_name" content="http://www.orobind.com" />
        <meta property="og:url" content="http://www.orobind.com" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Orobind gets you the best personal fitness coaches at your doorsteps along with a dedicated nutritionist to help achieve your health goals. Download the Orobind app to book a free trial session." />
		<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-54553092-1', 'auto');
  ga('require', 'displayfeatures');


  ga('send', 'pageview');

</script>
	</head>

<body>
	<div class="sidenav">
		<nav class="sidenavlist">
			<a href="#how">How it Works</a>
			<a href="#societies">Healthy Communities</a>
			<a href="#success">Success Stories</a>
			<a href="#" class="sidedownload">Download the App</a>
			<a href="#" class="callback">Request Callback <i class="fa fa-phone"></i></a>
		</nav>
	</div>
	<div class="wrapper">
	<!-- opening screen -->
		<section class="pageBlocks home" id="home">
			<nav class="topNav clearfix">
				<a href="#" class="topLogo fleft">
					<img src="http://cdn.orobind.com/srv/static/imagesV2/logo-white.png" data-switch="http://cdn.orobind.com/srv/static/imagesV2/logo-color.png">
				</a>
				<a href="#success" class="animate">Success Stories</a>
				<a href="#how" class="animate">How it Works</a>
				<a href="#societies" class="animate">Healthy Communities</a>
				<a href="#" class="topDownload animate dark">Download the app</a>
				<button class="menutoggle"><i class="fa fa-bars fa-lg"></i></button>
			</nav>
			<div class="callout">
				<h1>Presenting the <span class="mainPoint">most convenient way</span> to be healthy.</h1>
				<h2>Get in Shape. Eat Healthy.<span class="brSmall"> </span>Feel Good. Just a Tap Away.</h2>
        <div class="formContainer">
					<form class="mainCallForm" action="/requestcall" method="POST">
						<div class="box name">
							<input class="callFormInput" type="text" name="cName" placeholder="Your Name">
							<span class="mistake">&#10006;</span>
							<span class="done">&#10004;</span>
						</div>
						<div class="box phone">
							<input class="callFormInput" type="text" name="email" placeholder="Email">
							<span class="mistake">&#10006;</span>
							<span class="done">&#10004;</span>
						</div>
						<div class="box email">
							<input class="callFormInput" type="text" name="mobile" placeholder="Mobile">
							<span class="mistake">&#10006;</span>
							<span class="done">&#10004;</span>
						</div>
						<button class="mainFormCta">Request Callback</button>
					</form>
					<p class="afterText">We'll get back to you within 48 hours to get you started</p>
				</div>
			</div>
			<div class="indicator">
				<img src="http://cdn.orobind.com/srv/static/imagesV2/arrow.png">
			</div>
			<video preload autoplay loop poster="http://cdn.orobind.com/srv/static/imagesV2/blankposter.png" id="bgvid">
				<source src="http://cdn.orobind.com/srv/static/imagesV2/1.webm" type="video/webm">
				<source src="http://cdn.orobind.com/srv/static/imagesV2/1.mp4" type="video/mp4">
				<source src="http://cdn.orobind.com/srv/static/imagesV2/1.ogg" type="video/ogg">
			</video>
		</section>
	<!-- opening screen ends -->

	<!-- User success stories -->
		<section class="pageBlocks success" id="success">
			<h2 class="sectionTitle light">User Success Stories</h2>
			<hr class="narrowcenter light"></hr>
			<div class="centerWrap row clearfix">
				<div class="col-md-6 story row clearfix">
					<div class="col-tn-12"><h4 class="storyTitle">Bhavjot Kaur</h4></div>
					<div class="col-sm-4 col-tn-4">
						<img class="fullwidth storyImg" src="http://cdn.orobind.com/srv/static/imagesV2/4-bhavjot.jpg">
					</div>
					<div class="col-sm-8">
						<p class="storyContent"><i class="fa fa-quote-left"></i>
							When my weight ticked at 90 kgs, it was a wake up call! I signed up for a trial programme at Orobind.com. They've provided me a certified personal coach and changed my entire lifestyle. I lost 15 kgs in 6 months.
						</p>
					</div>
				</div>
				<div class="col-md-6 story row clearfix">
					<div class="col-tn-12"><h4 class="storyTitle">Deepak</h4></div>
					<div class="col-sm-4 col-tn-4">
						<img class="fullwidth storyImg" src="http://cdn.orobind.com/srv/static/imagesV2/5-deepak.jpg">
					</div>
					<div class="col-sm-8">
						<p class="storyContent"><i class="fa fa-quote-left"></i>
							Orobind has been a great experience. The best thing about Orobind was their focus on individual needs. They considered my current lifestyle and what I can and can't do.
						</p>
					</div>
				</div>
			</div>
			<div class="centerWrap row clearfix">
				<div class="col-md-6 story row clearfix">
					<div class="col-tn-12"><h4 class="storyTitle">Kiran Jonnalagadda</h4></div>
					<div class="col-sm-4 col-tn-4">
						<img class="fullwidth storyImg" src="http://cdn.orobind.com/srv/static/imagesV2/3-kiran.jpg">
					</div>
					<div class="col-sm-8">
						<p class="storyContent"><i class="fa fa-quote-left"></i>
							Earlier, I did join a gym but discontinued it as i felt as if I didn't belong there. Plus carrying workout clothes and commuting to gym was a big problem. Now I train at a time and place convenient to me and the coach brings the equipment that I need to achieve my fitness goals.
						</p>
					</div>
				</div>
				<div class="col-md-6 story row clearfix">
					<div class="col-tn-12"><h4 class="storyTitle">Richa &amp; Amit</h4></div>
					<div class="col-sm-4 col-tn-4">
						<img class="fullwidth storyImg" src="http://cdn.orobind.com/srv/static/imagesV2/1-richa-amit.jpg">
					</div>
					<div class="col-sm-8">
						<p class="storyContent"><i class="fa fa-quote-left"></i>
							The Coach comes to our place, which was important as we couldn't leave Aadya at home and go workout. The diet plan given feels personal as it takes into consideration odd working hours and other constraints.
						</p>
					</div>
				</div>
			</div>

			<div class="centerWrap row clearfix hidden">
				<div class="col-md-6 story row clearfix">
					<div class="col-tn-12"><h4 class="storyTitle">Kiran Jonnalagadda</h4></div>
					<div class="col-sm-4 col-tn-4">
						<img class="fullwidth storyImg" src="http://cdn.orobind.com/srv/static/imagesV2/3-kiran.jpg">
					</div>
					<div class="col-sm-8">
						<p class="storyContent"><i class="fa fa-quote-left"></i>
							Earlier, I did join a gym but discontinued it as i felt as if I didn't belong there. Plus carrying workout clothes and commuting to gym was a big problem. Now I train at a time and place convenient to me and the coach brings the equipment that I need to achieve my fitness goals.
						</p>
					</div>
				</div>
				<div class="col-md-6 story row clearfix">
					<div class="col-tn-12"><h4 class="storyTitle">Richa &amp; Amit</h4></div>
					<div class="col-sm-4 col-tn-4">
						<img class="fullwidth storyImg" src="http://cdn.orobind.com/srv/static/imagesV2/1-richa-amit.jpg">
					</div>
					<div class="col-sm-8">
						<p class="storyContent"><i class="fa fa-quote-left"></i>
							The Coach comes to our place, which was important as we couldn't leave Aadya at home and go workout. The diet plan given feels personal as it takes into consideration odd working hours and other constraints.
						</p>
					</div>
				</div>
			</div>
			<!--<button class="sectionCTA bg-sec white">View More</button>-->
		</section>
	<!-- User success stories ends -->

	<!-- how it works screen -->
		<section class="pageBlocks how" id="how">
			<h2 class="sectionTitle">How does it work?</h2>
			<hr class="narrowcenter"></hr>
			<div class="part clearfix">
				<div class="col-md-7 col-sm-6">
					<h4 class="partTitle">Get Started</h4>
					<p class="partContent">Choose a convenient time and day for your session and we will recommend a trusted expert to you. You can make the booking from within the app and get started. Once the booking is confirmed, the expert visits you at your place and starts your training session.</p>
					<div class="attest row clearfix">
						<div class="col-sm-3 col-md-2 col-tn-4">
							<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/2-ashwanigarg.jpg">
						</div>
						<div class="col-sm-9 col-md-10 col-tn-8">
							<p class="quote"><i class="fa fa-quote-left"></i>
								Now that the coach comes down to my home, my excuses to not workout are gone. Also, Govind is quite innovative with the variety of exercises we do.
							</p>
							<span class="quotedby">
								<strong>- Ashwani Garg,</strong> Happy Orobind User
							</span>
						</div>
					</div>
				</div>
				<div class="col-md-5 col-sm-6">
					<img src="http://cdn.orobind.com/srv/static/imagesV2/mock.png" class="threefourth">
				</div>
			</div>
			<div class="part clearfix">
				<div class="col-md-7 col-sm-6">
					<h4 class="partTitle">Monitor Your Performance</h4>
					<p class="partContent">Orobind experts do a basic level tracking for you. This further increases the accountability and leads to development of healthy habits. You can also keep a close tab on how many sessions you have utilized and renew your subscription through the app. The app has an improved graphical representation of your data which makes it simple and easy to grasp.</p>
					<div class="attest row clearfix">
						<div class="col-sm-3 col-md-2 col-tn-4">
							<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/5-deepak.jpg">
						</div>
						<div class="col-sm-9 col-md-10 col-tn-8">
							<p class="quote"><i class="fa fa-quote-left"></i>
								The best thing about Orobind was their focus on individual needs. They considered my current lifestyle and what I can and can't do.
							</p>
							<span class="quotedby">
								<strong>- Deepak,</strong> Happy Orobind User
							</span>
						</div>
					</div>
				</div>
				<div class="col-md-5 col-sm-6">
					<img src="http://cdn.orobind.com/srv/static/imagesV2/mock-performance.png" class="threefourth">
				</div>
			</div>
			<div class="part clearfix">
				<div class="col-md-7 col-sm-6">
					<h4 class="partTitle">Stay Connected</h4>
					<p class="partContent">Consider this as your personal health assistant. You get direct access to a fitness expert, an Orobind motivation expert and a nutritionist through our in built chat option. Ask as many queries, on as many topics as you want. Highly useful for recommendations while at a restaurant, cafeteria or a grocery store.</p>
					<div class="attest row clearfix">
						<div class="col-sm-3 col-md-2 col-tn-4">
							<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/4-bhavjot.jpg">
						</div>
						<div class="col-sm-9 col-md-10 col-tn-8">
							<p class="quote"><i class="fa fa-quote-left"></i>
								When my weight ticked at 90 kgs, it was a wake up call! I signed up for a trial programme at Orobind.com. I lost 15 kgs in 6 months.
							</p>
							<span class="quotedby">
								<strong>- Bhavjot Kaur,</strong> Happy Orobind User
							</span>
						</div>
					</div>
				</div>
				<div class="col-md-5 col-sm-6">
					<img src="http://cdn.orobind.com/srv/static/imagesV2/mock-messages.png" class="threefourth">
				</div>
			</div>
			<div class="part clearfix">
				<div class="col-md-7 col-sm-6">
					<h4 class="partTitle">Be Safe</h4>
					<p class="partContent">Your safety is our biggest responsibility &amp; priority. All the experts affiliated with us go through a rigorous 7 stage on-boarding process - a police verification, certification by a third party background checking agency, demo session by them to our internal team etc. To further protect your privacy (mobile number) we ensure that there need not be any exchange of numbers between you and the experts, thus keeping the entire exercise strictly professional.</p>
					<div class="attest row clearfix">
						<div class="col-sm-3 col-md-2 col-tn-4">
							<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/3-kiran.jpg">
						</div>
						<div class="col-sm-9 col-md-10 col-tn-8">
							<p class="quote"><i class="fa fa-quote-left"></i>
								Now I train at a time and place convenient to me and the coach brings the equipment that I need to achieve my fitness goals.
							</p>
							<span class="quotedby">
								<strong>- Kiran,</strong> Happy Orobind User
							</span>
						</div>
					</div>
				</div>
				<div class="col-md-5 col-sm-6">
					<img src="http://cdn.orobind.com/srv/static/imagesV2/mock-safety.png" class="threefourth">
				</div>
			</div>

		</section>
	<!-- how it works ends -->

	<!-- Media -->
		<section class="pageBlocks media" id="media">
			<h2 class="sectionTitle">Orobind in the Media</h2>
			<hr class="narrowcenter"></hr>
			<div class="centerWrap">
				<div class="mediaThumb">
					<a href="http://www.medianama.com/2015/03/223-funding-roundup-orobind-daily-rounds-qyk-and-paytm/"><img src="http://cdn.orobind.com/srv/static/imagesV2/press-medianama-bw.png" data-switch="http://cdn.orobind.com/srv/static/imagesV2/press-medianama.png"></a>
				</div>
				<div class="mediaThumb">
					<a href="http://yourstory.com/2015/03/orobind-angel-funding/"><img src="http://cdn.orobind.com/srv/static/imagesV2/press-yourstory-bw.gif" data-switch="http://cdn.orobind.com/srv/static/imagesV2/press-yourstory.gif"></a>
				</div>
				<!--<div class="mediaThumb">
					<a href="#"><img src="http://cdn.orobind.com/srv/static/imagesV2/press-dc-bw.gif" data-switch="http://cdn.orobind.com/srv/static/imagesV2/press-dc.gif"></a>
				</div>-->
				<div class="mediaThumb">
					<a href="http://indulge.newindianexpress.com/tag/orobind-app"><img src="http://cdn.orobind.com/srv/static/imagesV2/press-express-bw.gif" data-switch="http://cdn.orobind.com/srv/static/imagesV2/press-express.gif"></a>
				</div>
				<div class="mediaThumb">
					<a href="http://www.hindustantimes.com/apps-updates/seeking-made-in-india-app-solutions/article1-1351021.aspx"><img src="http://cdn.orobind.com/srv/static/imagesV2/press-ht-bw.png" data-switch="http://cdn.orobind.com/srv/static/imagesV2/press-ht.png"></a>
				</div>

				<div class="mediaThumb">
					<a href="http://thetechportal.in/2015/03/14/orobind-an-app-that-lets-you-find-personal-fitness-coaches-scoops-up-200k-in-angel-round/"><img src="http://cdn.orobind.com/srv/static/imagesV2/press-tp-bw.png" data-switch="http://cdn.orobind.com/srv/static/imagesV2/press-tp.png"></a>
				</div>
				<div class="mediaThumb">
					<a href="http://www.vccircle.com/news/technology/2015/03/13/mobile-marketplace-fitness-coaches-orobind-secures-200k"><img src="http://cdn.orobind.com/srv/static/imagesV2/press-vccircle-bw.png" data-switch="http://cdn.orobind.com/srv/static/imagesV2/press-vccircle.png"></a>
				</div>
			</div>
		</section>
	<!-- Media ends -->

	<!-- healthy communities -->
		<section class="pageBlocks societies" id="societies">
			<h2 class="sectionTitle">Healthy Communities</h2>
			<hr class="narrowcenter"></hr>
			<div class="centerWrap clearfix">
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/shantiniketan.jpg">
					<p class="societyLabel">Prestige Shantiniketan</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/windmills.jpg">
					<p class="societyLabel">Windmills of Your Mind</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/metropolis.jpg">
					<p class="societyLabel">Brigade Metropolis</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/purva.jpg">
					<p class="societyLabel">Purva Fountain Square</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/ajmera.jpg">
					<p class="societyLabel">Ajmera Infinity</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/almond.jpg">
					<p class="societyLabel">Almond Tree</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/petunia.jpg">
					<p class="societyLabel">Sobha Petunia</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/arcadia.jpg">
					<p class="societyLabel">Skylark Arcadia</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/retreat.jpg">
					<p class="societyLabel">The Retreat</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/jharoka.jpg">
					<p class="societyLabel">Rohan Jharoka</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/atlantis.jpg">
					<p class="societyLabel">Gopalan Atlantis</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/galaxy.jpg">
					<p class="societyLabel">SMR Vinay Atlantis</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/pinnacle.jpg">
					<p class="societyLabel">Vaswani Pinnacle</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/regency.jpg">
					<p class="societyLabel">Silverwood Regency</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/verity.jpg">
					<p class="societyLabel">SJR Verity</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/hmworld.jpg">
					<p class="societyLabel">HM World City</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/purva-panorama.jpg">
					<p class="societyLabel">Purva Panorama</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/chaitanya-swojas.jpg">
					<p class="societyLabel">Chaitanya Swojas</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/spurthi.jpg">
					<p class="societyLabel">Shriram Spurthi</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/adarsh-palmretreat.jpg">
					<p class="societyLabel">Adarsh Palm Retreat</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/gopalan-jewels.jpg">
					<p class="societyLabel">Gopalan Jewels</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/gopalan-residency.jpg">
					<p class="societyLabel">Gopalan Residency</p>
				</div>
				<div class="col-sm-4 col-md-3 col-tn-6 society">
					<img class="fullwidth" src="http://cdn.orobind.com/srv/static/imagesV2/adarsh-palmmeadows.jpg">
					<p class="societyLabel">Adarsh Palm Meadows</p>
				</div>
			</div>
			<!--<button class="sectionCTA bg-sec white">View More</button>-->
		</section>
	<!-- healthy communities ends -->

	<!-- Footer -->
		<section class="pageBlocks footer clearfix" id="footer">
			<div class="col-sm-3 col-md-2">
				<img src="http://cdn.orobind.com/srv/static/imagesV2/logo-white.png" class="footerlogo">
			</div>
			<div class="col-sm-5 col-md-7 footercenter">
				<nav class="footerNav">
					<a href="/about?tag=about">About Us</a>
					<a href="/about?tag=team">The Team</a>
					<a href="/about?tag=faq">FAQ</a>
					<!--<a href="orobind.html#policy">Policies</a>
					<a href="orobind.html#trust">Are the Coaches Trusted?</a>-->
					<a href="http://blog.orobind.com">Blog</a>
				</nav>
			</div>
			<div class="col-sm-4 col-md-3">
				<span class="social">
					Join the Conversation
					<a href="http://www.facebook.com/orobind"><i class="fa fa-facebook-square"></i></a>
					<a href="http://twitter.com/orobind"><i class="fa fa-twitter-square"></i></a>
				</span>
			</div>
		</section>
	<!-- Footer Ends -->
	</div>
	<div class="modal">&nbsp;</div>
	<div class="callbackModal">
		<h3 class="modalTitle">Hello there</h3>
		<p class="content">We will be launching our apps for other platforms pretty soon. Please fill in the details below and we will reach out to you shortly to get you started</p>
		<a class="closeCallback">X</a>
		<p class="post hit">Thanks for showing interest in Orobind. We will reach out to you shortly.</p>
		<button class="post hit">Close</button>
		<p class="post miss">Uh oh! Looks like something went wrong. Please try again.</p>
		<form id="requestACallForm" class="callbackForm" method="POST" action="/requestcall">
			<div class="fieldRow">
				<input type="text" class="callbackField" placeholder="Your Name" name="cName">
				<p class="errorText">Only alphabets &amp; spaces</p>
			</div>
			<div class="fieldRow">
				<input type="text" class="callbackField" placeholder="Email" name="email">
				<p class="errorText">Yourname@website.com</p>
			</div>
			<div class="fieldRow">
				<input type="text" class="callbackField" placeholder="Mobile Number" name="mobile">
				<p class="errorText">10 digit mobile number</p>
			</div>
			<button class="callbackCTA">Request a Callback</button>
		</form>
	</div>
	<div class="appDownloadModal">
		<a class="closeAppDownload">X</a>
		<div class="iosDevice">
			<h3 class="modalTitle">Get our iOS app from the <br><i class="fa fa-apple"></i> App store</h3>
			<p class="timer">Redirecting in <span class="redirTime">5</span> seconds</p>
			<button class="cancelRedir">Not iOS? Click here</button>
		</div>
		<div class="androidDevice">
			<h3 class="modalTitle">Get our android app from <br><i class="fa fa-android"></i> Google Play store</h3>
			<p class="timer">Redirecting in <span class="redirTime">5</span> seconds</p>
			<button class="cancelRedir">Not android? Click here</button>
		</div>
		<div class="normal">
			<h3 class="modalTitle">Choose your platform</h3>
			<div class="row clearfix choosePlatform">
				<div class="col-tn-6 choice ios">
					<i class="fa fa-apple"></i>
					<p>iOS</p>
				</div>
				<div class="col-tn-6 choice android">
					<i class="fa fa-android"></i>
					<p>Android</p>
				</div>
			</div>
			<button class="callback">Different OS? Click here</button>
		</div>
	</div>
</body>
	<script src="${path.js('webpages-V2/index-v2.js')}"></script>
	<script src="${path.js('webpages-V2/jquery.form.js')}"></script>
	<script>
    $(document).ready(function(){
  		$("#requestACallForm").ajaxForm({
      		success: function(response, statusText, xhr, $form)  {
      	    	$('.callbackModal').addClass('hit');
      		},
      		error: function(response, statusText, error, $form)  {
      	    	$('.callbackModal').addClass('miss');
      		}
  		});
      $(".mainCallForm").ajaxForm({
      		success: function(response, statusText, xhr, $form)  {
      	    	showModalMessage({
                "message":"Thank you for your interest in Orobind. We will reach out to your within 48 hours."
              });
      		},
      		error: function(response, statusText, error, $form)  {
            showModalMessage({
              "message":"Uh oh. Something went wrong. Check your connection and try again."
            });
      		}
  		});
    });
	</script>
</html>
