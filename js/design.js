/* jQuery functionality for Lawrence Getubig Portfolio*/

/* event listeners*/

// when user hovers/mouseenters area (flex-container-projects-child), switch img
//to animated gif
$('.flex-container-projects-child').on('mouseenter', swapToAnimate);

// when user exits/mouseleaves area (flex-container-projects-child), switch img
//to static/non-moving jpg
$('.flex-container-projects-child').on('mouseleave', swapToStatic);

// when page loads - hero animation triggered
$( window ).on( "load", assembleImgLayers);

// when user clicks menu navigation icon
$('.menu-icon-container').on('click', changeToX_openNav);

/* function declarations */
function swapToAnimate() {
	// set the target img as a variable
	var targetImg = $(this).find('img');//in this case, 'this' is div.flex-container-projects-child
	// get target img id
	var imgId = targetImg.attr('id');
	// create src string based on target id, eg images/bird_animate.gif
	var imgSrc_mouseenter = 'images/' + imgId + '_animate.gif';
	//set the src of the target img
	targetImg.attr('src', imgSrc_mouseenter);
}// end swapToAnimate


function swapToStatic() {
	// set the target img as a variable
	var targetImg = $(this).find('img');
	// get target img id
	var imgId = targetImg.attr('id');
	// create src string based on target id, eg images/bird_static.jpg
	var imgSrc_mouseleave = 'images/' + imgId + '_static.jpg';
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










/**/