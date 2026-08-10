/* Deccan Shifa Diagnostic Centre | JavaScript | v1.0 */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({ duration:700, once:true, offset:60, easing:"ease-out-cubic" });
  }

  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  const nav = document.getElementById("mainNav");
  const updateNav = () => nav && nav.classList.toggle("nav-scrolled", window.scrollY > 20);
  updateNav();
  window.addEventListener("scroll", updateNav, { passive:true });

  document.querySelectorAll("#primaryNav .nav-link, #primaryNav .nav-cta").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("primaryNav");
      if (menu && menu.classList.contains("show") && typeof bootstrap !== "undefined") {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  const links = [...document.querySelectorAll("#primaryNav .nav-link[href^='#']")];
  const sections = links.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => link.classList.remove("active"));
        const active = links.find(link => link.getAttribute("href") === `#${entry.target.id}`);
        if (active) active.classList.add("active");
      });
    }, { rootMargin:"-30% 0px -55% 0px" });
    sections.forEach(section => observer.observe(section));
  }
});
