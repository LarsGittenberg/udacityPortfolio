/* jQuery functionality for Lawrence Getubig Portfolio*/

/* event listeners*/

// when user hovers/mouseenters area (featured-project-card), switch img
//to animated gif
$('.featured-project-card').on('mouseenter', swapToAnimate);

// when user exits/mouseleaves area (flex-container-child-projects), switch img
//to static/non-moving jpg
$('.featured-project-card').on('mouseleave', swapToStatic);

// touch devices have no hover, so animate the card that is mostly on screen instead.
// skipped for people who prefer reduced motion
var isTouchOnly = window.matchMedia('(hover: none)').matches;
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (isTouchOnly && !prefersReducedMotion && 'IntersectionObserver' in window) {
	var cardObserver = new IntersectionObserver(function(entries) {
		entries.forEach(function(entry) {
			// run the existing swap functions with the card as 'this'
			if (entry.isIntersecting) {
				swapToAnimate.call(entry.target);
			} else {
				swapToStatic.call(entry.target);
			}
		});
	}, { threshold: 0.6 }); // card is "in view" when 60% of it is visible

	$('.featured-project-card').each(function() {
		cardObserver.observe(this);
	});
}

// hero animation triggered as soon as the HTML is read (DOM ready), not when every image and script
// has finished downloading ('load'). The tagline unscramble in index.html uses the same moment.
$(assembleImgLayers);

// when user clicks menu navigation icon
$('.menu-icon-container').on('click', changeToX_openNav);

// Safari/iPhone can freeze a page in its back/forward cache with the menu open, then show it
// open again on Back. Close the menu instantly (no slide) as the page is left, and again on
// restore as a safety net, so the user never sees an open menu pop up and slide shut.
function closeNavInstantly() {
	var parts = $('#myNav, .menu-icon-container > *');
	parts.css('transition', 'none');
	$('#myNav').removeClass('open-nav');
	$('.menu-icon-container').children().removeClass('change');
	$('#myNav')[0].offsetWidth; // forces the browser to apply the change now, before transitions come back
	parts.css('transition', '');
}
window.addEventListener('pagehide', closeNavInstantly);
window.addEventListener('pageshow', function (event) {
	if (event.persisted) { closeNavInstantly(); }
});


/* function declarations */
function swapToAnimate() {
	// set the target img as a variable
	var targetImg = $(this).find('img');//in this case, 'this' is div.flex-container-child-projects
	// get target img id
	var imgId = targetImg.attr('id');
	// create src string based on target id, eg images/bird_animate.gif
	var imgSrc_mouseenter = 'images/animate/' + imgId + '_animate.gif';
	//set the src of the target img
	targetImg.attr('src', imgSrc_mouseenter);
}// end swapToAnimate


function swapToStatic() {
	// set the target img as a variable
	var targetImg = $(this).find('img');
	// get target img id
	var imgId = targetImg.attr('id');
	// create src string based on target id, eg images/bird_static.jpg
	var imgSrc_mouseleave = 'images/animate/' + imgId + '_static.jpg';
	//set the src of the target img
	targetImg.attr('src', imgSrc_mouseleave);
} // end swapToStatic


function assembleImgLayers() {
	// code to assemble hero elements
	void document.body.offsetHeight; // make the browser register the scattered start positions first, or it may skip the animation
	$('.img-layer-absolute').addClass('img-layer-assembled');
	// also start the sun's fade-in (its delay is counted from this moment, see .hero-start in main.css)
	$('.hero-container').addClass('hero-start');
}// end assembleImgLayers


function changeToX_openNav() {
	//code to change pancake to X
	var targetBars = $('.menu-icon-container').children();
	targetBars.toggleClass('change');

	// code to open/close Nav overlay
	var targetNav = $('#myNav');
	targetNav.toggleClass('open-nav');
}// end changeToX





