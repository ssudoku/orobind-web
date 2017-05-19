//login scripts
$(document).ready(function(){
	Path.map('#/login').to(function() {
	  loginUserModal();
	});

	Path.map('#/login-email').to(function() {
	  emailLoginModal();
	});

	Path.map('#/forgot').to(function() {
	  forgotPassword();
	});

	Path.root("#/login");

	Path.listen(true);
});

var loginContent = '<div class="loginOptions"><h3 class="gateWayTitle">Enter Orobind Pro</h3><div class="loginCard"><button class="loginCta fb">Facebook</button><p class="label">Connect via Facebook</p><div class="divider"><span class="dividerText">or</span></div><button class="loginCta gp">Google</button><p class="label">Connect via Google+</p><div class="divider"><span class="dividerText">or</span></div><button class="loginCta em">Email</button><p class="label">Login with your email</p></div><a href="#" class="existing">New User?</a></div>';
var loginEmailContent = '<div class="loginEmail"><h3 class="gateWayTitle">Login with Email</h3><button class="back"><i class="fa fa-long-arrow-left"></i> Back</button><div class="loginCard"><input type="text" class="loginField" name="email" placeholder="Email"><input type="password" class="loginField" name="password" placeholder="••••••••"><button class="loginCta em">Login</button></div><a href="#/forgot" class="existing">Forgot your password?</a></div>';
var forgotPwContent = '<div class="forgotPw"><h3 class="gateWayTitle">Forgot Password?</h3><p class="success">An email has been sent to you with a link to reset the password.</p><p class="error">Invalid email address. Please try again with the correct email.</p><button class="back"><i class="fa fa-long-arrow-left"></i> Back</button><div class="forgotCard"><input type="text" class="loginField" name="email" placeholder="Email"><button class="loginCta em">Reset Password</button></div></div>';

function loginUserModal(){
	showModalMessage({
		"class":"gateWayModal",
		"closable":"0",
		"content":loginContent,
		"nobutton":true,
		"timed":"0",
		"size":"small"
	});
}
function emailLoginModal(){
	showModalMessage({
		"class":"gateWayModal",
		"closable":"0",
		"content":loginEmailContent,
		"nobutton":true,
		"timed":"0",
		"size":"small"
	});
}
function forgotPassword(){
	showModalMessage({
		"class":"gateWayModal",
		"closable":"0",
		"content":forgotPwContent,
		"nobutton":true,
		"timed":"0",
		"size":"small"
	});
}

function closeModals(){
	$(".messageModal").fadeOut(150);
}

$(document).on("click",".loginCta.em",function(){
	window.location.hash = "#/login-email";
});

$(document).on("click",".forgotPw .back",function(){
	window.location.hash = "#/login-email";
});

$(document).on("click",".loginEmail .back",function(){
	window.location.hash = "#/login";
});
