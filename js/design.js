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

// HERO COLLAPSE (proof of concept): once the intro has assembled, the hero's bottom edge
// rises until the hero is gone, so the project cards come into view.
// Plays once per browser session; skipped for reduced motion or if the visitor starts scrolling first.
var hero = document.querySelector('.hero-container');
var heroTagline = document.getElementById('tagline');

if (hero && heroTagline && !prefersReducedMotion) {
	var HERO_INTRO_MS = 6000; // face layers finish ~5.1s, central shape fades in by 6s
	var HERO_HOLD_MS = 2500;  // pause so the tagline can be read
	var HERO_COLLAPSE_MS = 1200; // keep in step with the transition time in main.css

	var collapseHero = function(animate) {
		hero.style.height = hero.offsetHeight + 'px'; // height:auto can't animate, so pin the current height first
		if (animate) {
			hero.classList.add('hero-collapsing');
			void hero.offsetHeight; // force the browser to register the pinned height before changing it
		}
		hero.style.height = '0px';
		if (animate) { setTimeout(finishHeroCollapse, HERO_COLLAPSE_MS + 100); } // backup in case transitionend doesn't fire
		hero.setAttribute('aria-hidden', 'true'); // nothing left to see, so hide it from screen readers too
		try { sessionStorage.setItem('heroCollapsed', '1'); } catch (e) {}
	};

	// remove the transition class when done, so window resizes don't animate
	var finishHeroCollapse = function() {
		if (!hero.classList.contains('hero-collapsing')) { return; }
		hero.classList.remove('hero-collapsing');
		if (window.Waypoint) { Waypoint.refreshAll(); } // hero is shorter now; recalculate waypoint positions
	};
	hero.addEventListener('transitionend', function(e) {
		if (e.target === hero) { finishHeroCollapse(); }
	});

	var alreadySeen = false;
	try { alreadySeen = sessionStorage.getItem('heroCollapsed') === '1'; } catch (e) {}

	if (alreadySeen) {
		collapseHero(false); // returning within this session: start collapsed, no animation
	} else {
		var heroTimer;
		var cancelHeroCollapse = function() { clearTimeout(heroTimer); };
		// if the visitor is already scrolling or tapping, don't move the cards under their finger
		['scroll', 'wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function(evt) {
			window.addEventListener(evt, cancelHeroCollapse, { once: true, passive: true });
		});
		$(window).on('load', function() {
			heroTimer = setTimeout(function() { collapseHero(true); }, HERO_INTRO_MS + HERO_HOLD_MS);
		});
	}
}

// when page hero/home page loads - hero animation triggered
$( window ).on( 'load', assembleImgLayers);


//$(document).ready(assembleImgLayers); //what is the diff between this and window-on-load method?
// when user clicks menu navigation icon
$('.menu-icon-container').on('click', changeToX_openNav);


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
	$('.img-layer-absolute').addClass('img-layer-assembled');
}// end assembleImgLayers


function changeToX_openNav() {
	//code to change pancake to X
	var targetBars = $('.menu-icon-container').children();
	targetBars.toggleClass('change');

	// code to open/close Nav overlay
	var targetNav = $('#myNav');
	targetNav.toggleClass('open-nav');
}// end changeToX


function menuSignal() {
	console.log('signal class added')
	$('.menu-signal').addClass('signal');
}
/*

var waypointTrigger = $('#myNav');

//make a waypoint object
var waypoint = new Waypoint({
	element: waypointTrigger,
	handler: function() {
		//do something
		$('.menu-signal').addClass('signal');
	}
})

*/



