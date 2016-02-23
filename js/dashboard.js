// If you want to draw your charts with Theme colors you must run initiating charts after that current skin is loaded
$(window).bind("load", function () {
	$("#myBtnLogout").click(function(){
		jsLIB.ajaxCall( false, jsLIB.rootDir+'rules/login.php', { MethodName : 'logout' } );
		window.location.replace( jsLIB.rootDir+'index.php' );
	});
});