// ==========================================
// 1. Copy Button for Code Blocks
// ==========================================
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.code-copy');
  if (!btn) return;
  var pre = btn.closest('.code-block').querySelector('pre');
  var text = pre.textContent;
  navigator.clipboard.writeText(text).then(function () {
    var originalText = btn.textContent;
    btn.textContent = 'Copied!';
    btn.style.color = '#10B981';
    btn.style.borderColor = '#10B981';
    setTimeout(function () {
      btn.textContent = originalText;
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 2000);
  });
});

// ==========================================
// 2. Lightbox Slideshow with Prev/Next & Keyboard
// ==========================================
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightbox-img');
var lightboxCaption = document.getElementById('lightbox-caption');
var btnPrev = document.querySelector('.lightbox-prev');
var btnNext = document.querySelector('.lightbox-next');
var btnClose = document.querySelector('.lightbox-close');

var allFigures = Array.from(document.querySelectorAll('figure img'));
var currentImgIndex = -1;

function showLightboxImage(index) {
  if (index < 0) index = allFigures.length - 1;
  if (index >= allFigures.length) index = 0;
  currentImgIndex = index;

  var targetImg = allFigures[currentImgIndex];
  lightboxImg.src = targetImg.src;
  lightboxImg.alt = targetImg.alt || '';

  var stepContainer = targetImg.closest('.step');
  var stepText = '';
  if (stepContainer) {
    var p = stepContainer.querySelector('p');
    if (p) stepText = p.textContent.trim();
  }
  var captionText = targetImg.alt || stepText || '';
  lightboxCaption.textContent = '[' + (currentImgIndex + 1) + ' / ' + allFigures.length + '] ' + captionText;
  lightbox.classList.add('open');
}

document.addEventListener('click', function (e) {
  if (e.target.matches('figure img')) {
    var idx = allFigures.indexOf(e.target);
    if (idx !== -1) showLightboxImage(idx);
  }
});

if (btnPrev) {
  btnPrev.addEventListener('click', function (e) {
    e.stopPropagation();
    showLightboxImage(currentImgIndex - 1);
  });
}

if (btnNext) {
  btnNext.addEventListener('click', function (e) {
    e.stopPropagation();
    showLightboxImage(currentImgIndex + 1);
  });
}

if (btnClose) {
  btnClose.addEventListener('click', function (e) {
    e.stopPropagation();
    lightbox.classList.remove('open');
  });
}

if (lightbox) {
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      lightbox.classList.remove('open');
    }
  });
}

document.addEventListener('keydown', function (e) {
  if (!lightbox || !lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') {
    lightbox.classList.remove('open');
  } else if (e.key === 'ArrowLeft') {
    showLightboxImage(currentImgIndex - 1);
  } else if (e.key === 'ArrowRight') {
    showLightboxImage(currentImgIndex + 1);
  }
});

// ==========================================
// 3. Reading Progress Bar & Back to Top
// ==========================================
var progressBar = document.getElementById('progress-bar');
var backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', function () {
  var scrollTop = window.scrollY || document.documentElement.scrollTop;
  var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = scrollPercent + '%';
  }

  if (backToTopBtn) {
    if (scrollTop > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
}, { passive: true });

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==========================================
// 4. Sidebar Mobile Toggle
// ==========================================
var menuBtn = document.getElementById('menu-btn');
var sidebar = document.getElementById('sidebar');
var overlay = document.getElementById('sidebar-overlay');

if (menuBtn && sidebar && overlay) {
  menuBtn.addEventListener('click', function () {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  });

  overlay.addEventListener('click', function () {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  });

  sidebar.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth < 1024) {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
      }
    });
  });
}

// ==========================================
// 5. Sidebar Quick Search / Filter
// ==========================================
var searchInput = document.getElementById('sidebar-search');
if (searchInput) {
  searchInput.addEventListener('input', function (e) {
    var query = e.target.value.toLowerCase().trim();
    var navLinks = document.querySelectorAll('.sidebar-nav a');

    navLinks.forEach(function (link) {
      var text = link.textContent.toLowerCase();
      var li = link.closest('li') || link;
      if (!query || text.indexOf(query) !== -1) {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    });
  });
}

// ==========================================
// 6. Scroll-Spy (Hierarchical Active State)
// ==========================================
var spyLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');
var spySections = [];

spyLinks.forEach(function (link) {
  var id = link.getAttribute('href').slice(1);
  var el = document.getElementById(id);
  if (el) {
    spySections.push({ el: el, link: link });
  }
});

function updateSpy() {
  var scrollY = window.scrollY + 140;
  var current = null;

  for (var i = 0; i < spySections.length; i++) {
    if (spySections[i].el.offsetTop <= scrollY) {
      current = spySections[i];
    }
  }

  spyLinks.forEach(function (l) {
    l.classList.remove('active');
  });

  if (current) {
    current.link.classList.add('active');
    // If it's a sub-link, also highlight parent group
    var parentList = current.link.closest('.nav-sub-list');
    if (parentList) {
      var groupTitle = parentList.previousElementSibling;
      if (groupTitle && groupTitle.classList.contains('nav-group-title')) {
        groupTitle.classList.add('active');
      }
    }
  }
}

window.addEventListener('scroll', updateSpy, { passive: true });
updateSpy();

// Dashboard module search
var moduleSearch = document.getElementById('module-search');
if (moduleSearch) {
  moduleSearch.addEventListener('input', function () {
    var q = this.value.toLowerCase().trim();
    var cards = document.querySelectorAll('.module-card');
    var shown = 0;
    cards.forEach(function (card) {
      var haystack = (card.textContent + ' ' + (card.getAttribute('data-search') || '')).toLowerCase();
      var match = !q || haystack.indexOf(q) !== -1;
      card.style.display = match ? '' : 'none';
      if (match) shown++;
    });
    var empty = document.getElementById('module-empty');
    if (empty) empty.hidden = shown !== 0;
  });
}
