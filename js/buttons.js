$('#citybuttons li').click(function(e) {
    e.preventDefault();
    $('#citybuttons li').removeClass('active');
    $(this).addClass('active');
});

$('.menu-ui a').click(function() {
    $('.menu-ui a').removeClass('active');
    $(this).addClass('active');
});

$('.burger_icon').click(function(){
		$('header nav').toggleClass('show');
		$('header .burger_icon').toggleClass('active');
	});