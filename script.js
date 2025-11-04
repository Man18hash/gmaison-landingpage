const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Header shadow on scroll
const header = document.querySelector('.site-header');
if (header) {
  const setScrolled = () => {
    if (window.scrollY > 4) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });
}

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - 64; // account for header
    window.scrollTo({ top: y, behavior: 'smooth' });
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Fake availability check
const checkButton = document.getElementById('checkButton');
if (checkButton) {
  checkButton.addEventListener('click', () => {
    // Read counters for demo
    const adults = parseInt(document.getElementById('adultsValue')?.textContent || '2', 10);
    const children = parseInt(document.getElementById('childrenValue')?.textContent || '0', 10);
    checkButton.disabled = true;
    const original = checkButton.textContent;
    checkButton.textContent = 'Checking…';
    setTimeout(() => {
      alert(`Thank you! A concierge will confirm availability shortly.\nGuests: ${adults} adult(s), ${children} child(ren).`);
      // proceed to full booking flow
      window.location.href = '/booking.html';
      checkButton.textContent = original;
      checkButton.disabled = false;
    }, 900);
  });
}

// Counter controls
document.querySelectorAll('.counter').forEach((wrap) => {
  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const valueEl = wrap.querySelector('.value');
    let val = parseInt(valueEl.textContent, 10);
    if (btn.dataset.action === 'inc') val += 1;
    if (btn.dataset.action === 'dec') val = Math.max(0, val - 1);
    valueEl.textContent = String(val);
    // Update guests summary if present
    const guestsRoot = wrap.closest('[data-role="guests"]');
    if (guestsRoot) updateGuestsSummary(guestsRoot);
  });
});


// Guests dropdown helpers
function updateGuestsSummary(root){
  const adultsEl = root.querySelector('#adultsValue, #adultsValBk');
  const childrenEl = root.querySelector('#childrenValue, #childrenValBk');
  if (!adultsEl || !childrenEl) return;
  const adults = parseInt(adultsEl.textContent,10);
  const children = parseInt(childrenEl.textContent,10);
  const summaryEl = root.querySelector('#guestsSummary, #guestsSummaryBk');
  if (summaryEl) summaryEl.textContent = `${adults} Adult${adults===1?'':'s'}, ${children} Child${children===1?'':'ren'}`;
}

function initGuestsDropdown(root){
  const trigger = root.querySelector('.trigger');
  const pop = root.querySelector('.popover');
  if (!trigger || !pop) return;
  const toggle = (open) => {
    const next = open !== undefined ? open : !pop.classList.contains('open');
    pop.classList.toggle('open', next);
  };
  trigger.addEventListener('click', (e)=>{
    e.stopPropagation();
    toggle();
  });
  document.addEventListener('click', (e)=>{
    if (!pop.classList.contains('open')) return;
    if (!root.contains(e.target)) toggle(false);
  });
  document.addEventListener('keydown', (e)=>{ if (e.key==='Escape') toggle(false); });
  updateGuestsSummary(root);
}

document.querySelectorAll('[data-role="guests"]').forEach(initGuestsDropdown);
