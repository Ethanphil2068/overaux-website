/* ═══════════════════════════════════════════════════════════════
   OverAux — The Chillin' Zone · Interactions
   Menu data grounded in public posts & delivery listings.
   Items marked est: true carry an estimated price (footnoted *).
   ═══════════════════════════════════════════════════════════════ */

const MENU = [
  // ── Rice Meals (confirmed: "rice meals from ₱150") ──
  { id: 1,  cat: "rice",     name: "Chicken Tenders Rice Meal", desc: "Crispy golden tenders, java rice, house dip.", price: 150, badge: "deal", est: false },
  { id: 2,  cat: "rice",     name: "Bacon Cheese Rice Meal", desc: "Rice topped with bacon strips and melted cheese sauce.", price: 170, badge: "", est: true },
  { id: 3,  cat: "rice",     name: "OverAux Silog", desc: "Garlic rice, egg, and the day's ulam.", price: 165, badge: "", est: true },

  // ── Burgers & Pizza (confirmed items) ──
  { id: 4,  cat: "burgers",  name: "Double-Patty Smash Burger", desc: "Two smashed patties, cheese, house sauce — fries on the side.", price: 195, badge: "bestseller", est: true },
  { id: 5,  cat: "burgers",  name: "Classic Smash Burger", desc: "Single patty, pickles, onions, smash sauce.", price: 155, badge: "", est: true },
  { id: 6,  cat: "burgers",  name: "10-Inch Pizza", desc: "Thin-crust, made for sharing — ask for the flavor of the day.", price: 250, badge: "", est: true },

  // ── Nachos & Things to Share (signature) ──
  { id: 7,  cat: "shares",   name: "Loaded Nachos", desc: "Our signature — a heaping plate of chips, cheese sauce and salsa.", price: 210, badge: "signature", est: true },
  { id: 8,  cat: "shares",   name: "Nacho Fries", desc: "Fries topped nacho-style with cheese sauce and salsa.", price: 190, badge: "bestseller", est: false },
  { id: 9,  cat: "shares",   name: "Bacon Cheese Fries", desc: "Crispy fries, bacon bits, cheese sauce.", price: 140, badge: "", est: true },
  { id: 10, cat: "shares",   name: "Onion Rings", desc: "Golden, crunchy, made for sharing.", price: 100, badge: "", est: true },
  { id: 11, cat: "shares",   name: "Chicken Tenders", desc: "Solo basket with your choice of dip.", price: 130, badge: "", est: true },

  // ── Coffee (confirmed prices) ──
  { id: 12, cat: "coffee",   name: "Brewed Coffee", desc: "Quality Arabica beans — hot and fresh all day.", price: 30, was: 40, badge: "deal", est: false },
  { id: 13, cat: "coffee",   name: "Iced Coffee", desc: "The reviewer favorite — Arabica over ice.", price: 60, was: 80, badge: "bestseller", est: false },
  { id: 14, cat: "coffee",   name: "Coffee Latte", desc: "Espresso and steamed milk, smooth and mellow.", price: 85, badge: "", est: true },
  { id: 15, cat: "coffee",   name: "Mocha", desc: "Coffee meets chocolate. Best with cheesecake.", price: 95, badge: "", est: true },

  // ── Iced Blends & Coolers ──
  { id: 16, cat: "drinks",   name: "Iced Blends", desc: "Creamy blended refreshers in assorted flavors.", price: 110, badge: "", est: true },
  { id: 17, cat: "drinks",   name: "Signature Drinks", desc: "House signatures — grab two for ₱250 during promos.", price: 125, badge: "signature", est: true },
  { id: 18, cat: "drinks",   name: "Milk Tea", desc: "Classic milk tea, sweetness adjusted to your liking.", price: 100, badge: "", est: true },
  { id: 19, cat: "drinks",   name: "Iced Tea", desc: "Bottomless-style chill, served ice cold.", price: 60, badge: "", est: true },

  // ── Desserts ──
  { id: 20, cat: "desserts", name: "Cheesecake", desc: "\"The best cheesecake\" — multiple reviewers. Pair with iced coffee.", price: 95, badge: "bestseller", est: true },
  { id: 21, cat: "desserts", name: "Signature Overload Halo-Halo", desc: "All the overload toppings — buy two, third at half price.", price: 120, badge: "signature", est: true },
  { id: 22, cat: "desserts", name: "Baked Goods", desc: "A rotating selection of cakes and pastries — ask what's fresh.", price: 75, badge: "", est: true },

  // ── Bar ──
  { id: 23, cat: "bar",      name: "Beer", desc: "Ice-cold bottles for the barkada.", price: 70, badge: "", est: true },
  { id: 24, cat: "bar",      name: "Cocktails", desc: "House mixed drinks — chill nights done right.", price: 150, badge: "", est: true },
];

const CATS = [
  ["rice", "Rice Meals"],
  ["burgers", "Burgers & Pizza"],
  ["shares", "Nachos & Things to Share"],
  ["coffee", "Coffee"],
  ["drinks", "Iced Blends & Coolers"],
  ["desserts", "Desserts"],
  ["bar", "Beer & Cocktails"],
];

const BADGES = {
  signature: "house signature",
  bestseller: "guest favorite",
  deal: "special price",
};

/* ── Menu rendering ── */
const grid = document.getElementById("menuGrid");
const emptyMsg = document.getElementById("menuEmpty");
let activeCat = "all";
let query = "";

function itemHTML(item, i) {
  const tag = item.badge ? `<em class="menu-item-tag">${BADGES[item.badge]}</em>` : "";
  const ast = item.est ? `<span class="menu-ast">*</span>` : "";
  const was = item.was ? ` <s class="menu-was">₱${item.was}</s>` : "";
  return `
    <article class="menu-item" style="animation-delay:${Math.min(i * 40, 360)}ms">
      <div class="menu-item-row">
        <span class="menu-item-name">${item.name}${tag}</span>
        <span class="menu-item-dots"></span>
        <span class="menu-item-price">₱${item.price}${ast}${was}</span>
      </div>
      <p class="menu-item-desc">${item.desc}</p>
    </article>`;
}

function renderMenu() {
  const q = query.trim().toLowerCase();
  const matches = (m) =>
    (activeCat === "all" || m.cat === activeCat) &&
    (!q || m.name.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q));

  let idx = 0;
  let html = "";
  for (const [cat, label] of CATS) {
    const items = MENU.filter((m) => m.cat === cat && matches(m));
    if (!items.length) continue;
    html += `<div class="menu-group"><h4 class="menu-group-title">${label}</h4>`;
    html += items.map((m) => itemHTML(m, idx++)).join("");
    html += `</div>`;
  }
  grid.innerHTML = html;
  emptyMsg.classList.toggle("hidden", idx > 0);
}

document.getElementById("menuTabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".menu-tab");
  if (!btn) return;
  document.querySelectorAll(".menu-tab").forEach((t) => {
    t.classList.toggle("active", t === btn);
    t.setAttribute("aria-selected", t === btn ? "true" : "false");
  });
  activeCat = btn.dataset.cat;
  renderMenu();
});

document.getElementById("menuSearch").addEventListener("input", (e) => {
  query = e.target.value;
  renderMenu();
});

renderMenu();

/* ── Stars ── */
function starSVG(fill, i) {
  const gradId = `sg-${Math.round(fill * 100)}-${i}`;
  return `<svg viewBox="0 0 24 24" aria-hidden="true">
    <defs><linearGradient id="${gradId}"><stop offset="${fill * 100}%" stop-color="#d9a441"/><stop offset="${fill * 100}%" stop-color="#3a2c1c"/></linearGradient></defs>
    <path fill="url(#${gradId})" d="M12 2l2.9 6.26 6.6.56-5 4.4 1.5 6.48L12 16.9 5.99 19.7l1.5-6.48-5-4.4 6.6-.56z"/>
  </svg>`;
}

document.querySelectorAll(".stars[data-rating]").forEach((el) => {
  const rating = parseFloat(el.dataset.rating);
  let html = "";
  for (let i = 1; i <= 5; i++) html += starSVG(Math.max(0, Math.min(1, rating - (i - 1))), i);
  el.innerHTML = html;
});

/* ── Rating bars animate on reveal ── */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll(".rating-bar-fill").forEach((f) => {
      f.style.width = `${f.dataset.width}%`;
    });
    barObserver.unobserve(entry.target);
  });
}, { threshold: 0.4 });
document.querySelectorAll(".rating-bars").forEach((el) => barObserver.observe(el));

/* ── Reveal on scroll ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ── Animated counters ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || "";
  const dur = 1800;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll(".stat-number[data-count]").forEach((el) => counterObserver.observe(el));

/* ── Nav: scroll state, mobile toggle, active link ── */
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 24);
}, { passive: true });

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

const sections = [...document.querySelectorAll("section[id]")];
const linkMap = new Map(
  [...navLinks.querySelectorAll("a:not(.btn)")].map((a) => [a.getAttribute("href").slice(1), a])
);
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    linkMap.forEach((a, id) => a.classList.toggle("active", id === entry.target.id));
  });
}, { rootMargin: "-38% 0px -55% 0px" });
sections.forEach((s) => sectionObserver.observe(s));

/* ── Hours: highlight today ── */
(function markToday() {
  const day = new Date().getDay(); // 0 Sun … 6 Sat
  const rows = document.querySelectorAll(".hours-table tr");
  const idx = day === 0 ? 2 : day === 6 ? 1 : 0;
  rows[idx]?.setAttribute("data-today", "true");
})();

/* ── Reservation form ── */
const form = document.getElementById("reserveForm");
const toast = document.getElementById("toast");
let toastTimer;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 4200);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll("input[required]").forEach((input) => {
    const ok = input.value.trim() !== "";
    input.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    showToast("Please fill in your name, mobile, date and time.");
    return;
  }
  const name = document.getElementById("fName").value.trim().split(" ")[0];
  const date = document.getElementById("fDate").value;
  const time = document.getElementById("fTime").value;
  form.reset();
  showToast(`Salamat, ${name}! Reservation request for ${date} at ${time} noted — we'll confirm via call or Messenger.`);
});

/* ── Preloader & year ── */
const hidePreloader = () => document.getElementById("preloader").classList.add("done");
window.addEventListener("load", () => setTimeout(hidePreloader, 900));
setTimeout(hidePreloader, 2800); // fallback in case load already fired
document.getElementById("year").textContent = new Date().getFullYear();
