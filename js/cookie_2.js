// event listener on window loading, check for cookie
$(window).on('load', checkCookie);

function setCookie() {
    Cookies.set('heroAssembled', 'true');
}

function checkCookie() {
    var cValue = Cookies.get('heroAssembled')
    if (cValue === "true") {
        // cookie exists, don't do animation
        var targetImg = $('.hero-container').find('img');
        $(targetImg).removeClass('start-transparent start-bottom start-left start-right start-top start-right-fast');
    }
    else {
        // cookie doesn't exist, do animation, then set cookie
        setCookie();
    }
}

// more info on cookie js library used here
//https://github.com/js-cookie/js-cookie
