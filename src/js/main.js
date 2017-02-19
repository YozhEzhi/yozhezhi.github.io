/** *************** Waypoints ******************/
$(document).ready(function () {
  $('.wp1').waypoint(function () {
    $('.wp1').addClass('animated fadeInLeft');
  }, {
    offset: '75%',
  });
  $('.wp2').waypoint(function () {
    $('.wp2').addClass('animated fadeInUp');
  }, {
    offset: '75%',
  });
  $('.wp3').waypoint(function () {
    $('.wp3').addClass('animated fadeInDown');
  }, {
    offset: '55%',
  });
  $('.wp4').waypoint(function () {
    $('.wp4').addClass('animated fadeInDown');
  }, {
    offset: '75%',
  });
  $('.wp5').waypoint(function () {
    $('.wp5').addClass('animated fadeInUp');
  }, {
    offset: '75%',
  });
  $('.wp6').waypoint(function () {
    $('.wp6').addClass('animated fadeInDown');
  }, {
    offset: '75%',
  });
});

/**
 * Slide-In Nav
 **/
$('#nav-toggle').click(() => $('.pull').slideToggle());

/** *************** Smooth Scrolling ******************/
$('a[href*=#]:not([href=#])').click(function () {
  const target = $(this.hash);
  if (target.length) {
    $('html, body').animate({
      scrollTop: target.offset().top,
    }, 1000);
    return false;
  }
});

/**
 * Nav Transform icon
 */
const navToggler = document.querySelector('#nav-toggle');
navToggler.addEventListener('click', () => navToggler.classList.toggle('active'));

/**
 * Overlays
 */
$('.img')
  .mouseenter(function () { $(this).addClass('hover'); })
  .mouseleave(function () { $(this).removeClass('hover'); });

/**
 * Flexsliders
 **/
$('#portfolioSlider').flexslider({
  animation: 'slide',
  directionNav: false,
  controlNav: true,
  touch: false,
  pauseOnHover: true,
  start() {
    $.waypoints('refresh');
  },
});
