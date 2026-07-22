/* Shared site navigation.
 *
 * Each page includes assets/nav.css and this file. The markup lives here so
 * five static pages cannot drift apart. Pages with a light background from
 * the top carry class="nav-light" on <body>; pages with a dark hero leave it
 * off, and the bar stays transparent until the reader scrolls.
 *
 * Footer links remain in every page, so navigation still works without JS.
 */
(function () {
  var LINKS = [
    ['./', 'Home'],
    ['./why-awe.html', 'Why awe'],
    ['./story.html', 'Our story'],
    null, // divider
    ['./privacy.html', 'Privacy'],
    ['./support.html', 'Support']
  ];

  var here = location.pathname.replace(/\/index\.html$/, '/').split('/').pop();

  var bar = document.createElement('div');
  bar.className = 'sitebar';

  var home = document.createElement('a');
  home.className = 'sitebar-home';
  home.href = './';
  home.innerHTML =
    '<img src="./assets/icon-512.png" alt="" width="30" height="30" /><span>Awe Well</span>';

  var toggle = document.createElement('button');
  toggle.className = 'sitebar-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Menu');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'sitemenu');
  toggle.innerHTML = '<span></span><span></span><span></span>';

  var menu = document.createElement('nav');
  menu.className = 'sitemenu';
  menu.id = 'sitemenu';
  menu.hidden = true;
  menu.setAttribute('aria-label', 'Site');

  LINKS.forEach(function (item) {
    if (!item) {
      menu.appendChild(document.createElement('hr'));
      return;
    }
    var a = document.createElement('a');
    a.href = item[0];
    a.textContent = item[1];
    var target = item[0].replace('./', '');
    if (target === here || (target === '' && (here === '' || here === 'index.html'))) {
      a.setAttribute('aria-current', 'page');
    }
    menu.appendChild(a);
  });

  bar.appendChild(home);
  bar.appendChild(toggle);
  bar.appendChild(menu);
  document.body.appendChild(bar);

  function setOpen(open) {
    bar.classList.toggle('open', open);
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(menu.hidden);
  });

  document.addEventListener('click', function (e) {
    if (!menu.hidden && !menu.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Light pages are solid immediately; dark-hero pages solidify on scroll.
  var alwaysSolid = document.body.classList.contains('nav-light');
  function sync() {
    bar.classList.toggle('solid', alwaysSolid || window.scrollY > 30);
  }
  sync();
  if (!alwaysSolid) {
    window.addEventListener('scroll', sync, { passive: true });
  }
})();
