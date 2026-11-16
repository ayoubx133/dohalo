/* Dohalo Games: mobile menu and screenshot viewer. No tracking, no cookies. */
(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { btn.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { btn.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); btn.focus(); }
    });
  }

  var links = Array.prototype.slice.call(document.querySelectorAll('a[data-lightbox]'));
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;
  var dlg, img, group = [], idx = 0;
  function build() {
    dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.setAttribute('aria-label', 'Screenshot viewer');
    dlg.innerHTML = '<img alt=""><button class="lb-close" type="button" aria-label="Close">&times;</button>' +
      '<button class="lb-nav lb-prev" type="button" aria-label="Previous screenshot">&lsaquo;</button>' +
      '<button class="lb-nav lb-next" type="button" aria-label="Next screenshot">&rsaquo;</button>';
    document.body.appendChild(dlg);
    img = dlg.querySelector('img');
    dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
    dlg.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
    dlg.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }
  function show(i) {
    idx = (i + group.length) % group.length;
    var a = group[idx];
    img.src = a.getAttribute('href');
    var inner = a.querySelector('img');
    img.alt = inner ? inner.alt : '';
    var multi = group.length > 1;
    dlg.querySelector('.lb-prev').hidden = !multi;
    dlg.querySelector('.lb-next').hidden = !multi;
  }
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (!dlg) build();
      var g = a.getAttribute('data-lightbox');
      group = links.filter(function (x) { return x.getAttribute('data-lightbox') === g; });
      show(group.indexOf(a));
      dlg.showModal();
    });
  });
})();
