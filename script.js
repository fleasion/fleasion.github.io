(() => {
  const header = document.getElementById('site-header');
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -28px' });
    reveals.forEach((el) => observer.observe(el));
  }

  const releaseLinks = document.querySelectorAll('[data-download-link]');
  const releaseLabels = document.querySelectorAll('[data-download-label]');
  const releaseTitle = document.querySelector('[data-release-title]');
  const releaseMeta = document.querySelector('[data-release-meta]');

  const platform = (() => {
    const value = `${navigator.userAgent || ''} ${navigator.platform || ''}`.toLowerCase();
    if (/android|iphone|ipad|ipod|mobile/.test(value)) return null;
    if (value.includes('win')) return { name: 'Windows', match: (n) => n.endsWith('-Windows.exe') || n.endsWith('.exe') };
    if (value.includes('mac')) return { name: 'macOS', match: (n) => n.includes('MacOS') && n.endsWith('.zip') };
    if (value.includes('linux')) return { name: 'Linux', match: (n) => n.includes('Linux') };
    return null;
  })();

  fetch('https://api.github.com/repos/fleasion/Fleasion/releases/latest', {
    headers: { Accept: 'application/vnd.github+json' }
  })
    .then((response) => {
      if (!response.ok) throw new Error(`GitHub API ${response.status}`);
      return response.json();
    })
    .then((release) => {
      const tag = release.tag_name || 'latest';
      if (releaseTitle) releaseTitle.textContent = `${tag} is the latest stable release`;
      if (releaseMeta && release.published_at) {
        const date = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(release.published_at));
        releaseMeta.textContent = `Published ${date}. Standalone builds are available for Windows, macOS, and Linux.`;
      }

      if (!platform || !Array.isArray(release.assets)) return;
      const asset = release.assets.find((item) => typeof item.name === 'string' && platform.match(item.name));
      if (!asset?.browser_download_url) return;
      releaseLinks.forEach((link) => {
        link.href = asset.browser_download_url;
        link.setAttribute('data-resolved-platform', platform.name);
      });
      releaseLabels.forEach((label) => { label.textContent = `Download ${tag} for ${platform.name}`; });
    })
    .catch(() => {
      // GitHub Releases remains the intentionally useful fallback.
    });
})();
