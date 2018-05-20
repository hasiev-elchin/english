var mainHeader = document.querySelector('.main-header'),
		promo = document.querySelector('.promo');

// if(parseInt(getComputedStyle(promo, null).paddingTop) < mainHeader.offsetHeight) {
// 	promo.style.paddingTop = mainHeader.offsetHeight+"px";
// }

var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

// navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {
	if (navMain.classList.contains('main-nav--closed')) {
		navMain.classList.remove('main-nav--closed');
		navMain.classList.add('main-nav--opened');
	} else {
		navMain.classList.add('main-nav--closed');
		navMain.classList.remove('main-nav--opened');
	}
});
window.addEventListener('resize', function(evt){
	if(window.innerWidth > 1199) {
		navMain.classList.remove('main-nav--opened');
		navMain.classList.add('main-nav--closed');
	}
});

$('.reviews__slider').slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	speed: 300,
	dots: true,
	arrows: true,
	autoplay: true,
	autoplaySpeed: 3000,
	swipeToSlide: true
}).slick('slickGoTo', 2);

new WOW().init();