$(document).ready(() => {
  /**
   * Waypoints
   */
  const about = document.querySelector('.js-about');
  new Waypoint({
    element: about,
    handler() {
      about.classList.add('animated', 'fadeInLeft');
    },
    offset: '75%',
  });

  const wp2 = Array.from(document.querySelectorAll('.wp2'));
  wp2.map((wp) => {
    return new Waypoint({
      element: wp,
      handler() {
        wp.classList.add('animated', 'fadeInDown');
      },
      offset: '75%',
    });
  });

  /**
   * Smooth scrolling to target.
   */
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
      location.hostname === this.hostname) {
      let target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  /**
   * Flexslider
   */
  $('#slider').flexslider({
    animation: 'slide',
    directionNav: false,
    controlNav: true,
    touch: false,
    pauseOnHover: true,
    start() {
      Waypoint.refreshAll();
    },
  });
});
