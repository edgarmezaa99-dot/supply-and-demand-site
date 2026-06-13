// Make every product card navigate to its dedicated product page
document.querySelectorAll('.product-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    if (card.id) window.location.href = `product?id=${card.id}`;
  });
});

// Image gallery cycle (tap/click to cycle through product photos)
function cycleImg(wrap) {
  const img = wrap.querySelector('img');
  const imgs = JSON.parse(img.dataset.imgs);
  const idx = (parseInt(img.dataset.idx) + 1) % imgs.length;
  img.dataset.idx = idx;
  img.src = imgs[idx];
  const dots = wrap.querySelectorAll('span');
  dots.forEach((d, i) => d.style.opacity = i === idx ? '1' : '.45');
}

// Mobile nav
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// Sticky header shadow
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10 ? '0 2px 12px rgba(0,0,0,0.1)' : '';
});

// Category keyword mapping for filter tabs
const CAT_MAP = {
  closet:   ['closet', 'wardrobe', 'sliding closet'],
  shower:   ['shower', 'frameless', 'semi-frameless', 'bypass', 'pivot'],
  glass:    ['glass', 'tempered', 'laminated', 'panel'],
  aluminum: ['aluminum window', 'aluminium window', 'slider window', 'window'],
  bifold:   ['bifold', 'bi-fold', 'bi fold'],
  mirror:   ['mirror', 'vanity'],
  interior: ['interior door', 'hollow', 'flush door', 'panel door'],
};

function matchCat(product, filter) {
  if (filter === 'all') return true;
  const text = (product.title + ' ' + product.type + ' ' + product.tags).toLowerCase();
  return (CAT_MAP[filter] || []).some(kw => text.includes(kw));
}

function formatPrice(min, max) {
  if (!min && min !== 0) return 'Call for pricing';
  const fmt = n => '$' + parseFloat(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (min === max || max === 0) return fmt(min);
  return fmt(min) + ' – ' + fmt(max);
}

function productIcon(product) {
  const t = (product.title + ' ' + product.type).toLowerCase();
  if (t.includes('shower')) return 'images/icon-shower.svg';
  if (t.includes('closet') || t.includes('bifold')) return 'images/icon-door.svg';
  if (t.includes('mirror')) return 'images/icon-mirror.svg';
  if (t.includes('patio') || t.includes('aluminum')) return 'images/icon-window.svg';
  return 'images/icon-window.svg';
}

function productBg(product) {
  const t = (product.title + ' ' + product.type).toLowerCase();
  if (t.includes('shower')) return '#c8e6f8';
  if (t.includes('closet') || t.includes('bifold')) return '#d4d4f8';
  if (t.includes('mirror')) return '#c8f0d8';
  if (t.includes('patio') || t.includes('aluminum')) return '#fce8c4';
  return '#e8e8e8';
}

function buildCard(product) {
  const hasVariants = product.variants && product.variants.length > 1;
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.title = (product.title + ' ' + product.type + ' ' + product.tags).toLowerCase();

  let imgHtml = '';
  if (product.image) {
    imgHtml = `<div class="product-img-wrap"><img src="${product.image}" alt="${product.title}" loading="lazy" /></div>`;
  } else {
    imgHtml = `<div class="product-img-wrap" style="background:${productBg(product)}"><img src="${productIcon(product)}" alt="" class="product-img-placeholder"></div>`;
  }

  let variantsHtml = '';
  if (hasVariants) {
    variantsHtml = `<div class="product-variants">` +
      product.variants.slice(0, 5).map(v => `
        <div class="variant-row">
          <span class="variant-title">${v.title}</span>
          <span class="variant-price">${v.available ? '$' + parseFloat(v.price).toLocaleString('en-US',{minimumFractionDigits:2}) : '<span class="variant-oos">Out of stock</span>'}</span>
        </div>`).join('') +
      (product.variants.length > 5 ? `<div style="font-size:.75rem;color:var(--gray-400);padding:.2rem .5rem">+${product.variants.length-5} more sizes</div>` : '') +
      `</div>`;
  }

  const price = hasVariants
    ? `<span class="price price-range">${formatPrice(product.minPrice, product.maxPrice)}</span>`
    : `<span class="price">$${parseFloat(product.variants[0]?.price || 0).toLocaleString('en-US',{minimumFractionDigits:2})}</span>`;

  card.innerHTML = `
    ${imgHtml}
    <div class="product-body">
      <div class="product-tag">${product.type || 'Product'}</div>
      <h3>${product.title}</h3>
      ${product.description ? `<p class="product-desc">${product.description.slice(0,120)}${product.description.length>120?'…':''}</p>` : ''}
      ${variantsHtml}
      <div class="product-footer">
        ${price}
        <a href="#contact" class="btn-sm">Get Quote</a>
      </div>
    </div>`;
  return card;
}

function loadProducts() {
  const grid = document.getElementById('productGrid');
  const loading = document.getElementById('loadingState');
  const fallback = document.getElementById('fallbackGrid');
  if (loading) loading.remove();
  if (grid) grid.style.display = 'none';
  if (fallback) fallback.style.display = 'grid';
}

function setupFilters(products) {
  document.getElementById('filterTabs').querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      document.querySelectorAll('#productGrid .product-card').forEach(card => {
        const title = card.dataset.title || '';
        const show = filter === 'all' || (CAT_MAP[filter]||[]).some(kw => title.includes(kw));
        card.classList.toggle('hidden', !show);
      });
    });
  });
}

function setupFallbackFilters() {
  document.getElementById('filterTabs').querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      document.querySelectorAll('#fallbackGrid .product-card').forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });
}

loadProducts();

// Contact form
const DASHBOARD_URL = 'http://localhost:3000';

document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('btnText');
  btn.textContent = 'Sending...';
  const data = Object.fromEntries(new FormData(e.target));
  try {
    await fetch(DASHBOARD_URL + '/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, source: 'website' })
    });
  } catch(_) {}
  btn.textContent = 'Request Sent! ✓';
  e.target.reset();
  setTimeout(() => btn.textContent = 'Send Request', 3000);
});

document.getElementById('consultForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('consultBtnText');
  btn.textContent = 'Submitting...';
  const data = Object.fromEntries(new FormData(e.target));
  try {
    await fetch(DASHBOARD_URL + '/api/consultations', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, payment: 'unpaid' })
    });
  } catch(_) {}
  btn.textContent = 'Request Received! We\'ll call to confirm ✓';
  e.target.reset();
  setTimeout(() => btn.textContent = 'Request Consultation — $45', 4000);
});

// ─── QUOTE MODAL ─────────────────────────────────────────────
const modal        = document.getElementById('quoteModal');
const modalClose   = document.getElementById('modalClose');
const modalProduct = document.getElementById('modalProduct');
const quoteProduct = document.getElementById('quoteProduct');

function openModal(productName) {
  quoteProduct.value  = productName;
  modalProduct.textContent = productName;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Upgrade every product card footer to two buttons
function upgradeProductCards() {
  document.querySelectorAll('.product-footer').forEach(footer => {
    const card = footer.closest('.product-card');
    const h3   = card ? card.querySelector('h3') : null;
    const name = h3 ? h3.textContent.trim() : 'Product';

    footer.innerHTML = `
      <span class="price">${footer.querySelector('.price') ? footer.querySelector('.price').textContent : 'Call for pricing'}</span>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap">
        <a href="#contact" class="btn-sm">Get Quote</a>
        <button class="btn-custom" data-product="${name}">Custom Size</button>
      </div>`;
  });

  document.querySelectorAll('.btn-custom').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.product));
  });
}

// Quote form submission
document.getElementById('quoteForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn  = document.getElementById('quoteSubmitBtn');
  const txt  = document.getElementById('quoteSubmitText');
  const note = document.getElementById('quoteNote');
  const fd   = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());

  txt.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('http://localhost:3000/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.ok) {
      txt.textContent = '✓ Quote Submitted!';
      note.textContent = 'We received your request and will contact you same day.';
      note.style.color = 'var(--green)';
      e.target.reset();
      setTimeout(closeModal, 2500);
    } else {
      throw new Error(json.error || 'Server error');
    }
  } catch(err) {
    txt.textContent = 'Submit Quote Request';
    note.textContent = 'Error submitting. Please call us at (909) 929-5575.';
    note.style.color = 'var(--red)';
  } finally {
    btn.disabled = false;
    setTimeout(() => {
      txt.textContent = 'Submit Quote Request';
      note.style.color = '';
    }, 4000);
  }
});

// Run after products load
setTimeout(upgradeProductCards, 1500);
