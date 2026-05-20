# Shared partials

Header HTML used across all pages (kept here for reference; each page inlines it).

```html
<header class="site-header">
  <div class="site-header__inner">
    <a class="site-header__logo" href="index.html" aria-label="Summit Fellowship home">
      <svg ...></svg>
      <span class="site-header__wordmark">Summit <span class="ws">Fellowship</span></span>
    </a>
    <nav class="site-nav" aria-label="Primary">
      <a class="site-nav__link" href="about.html">About</a>
      ...
    </nav>
    <a class="site-header__cta" href="itinerary.html">View Itinerary</a>
    <button class="menu-toggle" aria-expanded="false" aria-label="Menu">☰</button>
  </div>
</header>
```
