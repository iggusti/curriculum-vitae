(function () {
  'use strict';

  var BIRTH_DATE = new Date(1997, 9, 22);
  var ageElement = document.getElementById('age');

  if (ageElement) {
    var today = new Date();
    var age = today.getFullYear() - BIRTH_DATE.getFullYear();

    if (
      today.getMonth() < BIRTH_DATE.getMonth() ||
      (today.getMonth() === BIRTH_DATE.getMonth() && today.getDate() < BIRTH_DATE.getDate())
    ) {
      age--;
    }

    ageElement.textContent = age;
  }

  if (window.AOS) {
    AOS.init();
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a.smooth-scroll');

    if (!link) {
      return;
    }

    if (
      location.pathname.replace(/^\//, '') !== link.pathname.replace(/^\//, '') ||
      location.hostname !== link.hostname
    ) {
      return;
    }

    var target = document.querySelector(link.hash);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
})();
