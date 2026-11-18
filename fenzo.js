/**
 * FENZO Haute Skincare - High-Performance Interactive Runtime
 * Ultra-fast GSAP ScrollTrigger animations, smooth cart drawer, & reactive UI
 */

(function () {
  'use strict';

  // --- Cart State ---
  const cartState = {
    items: [
      {
        id: 'fenzo-hydra-luxe',
        name: 'Hydra-Luxe Recovery Cream',
        size: '50ml / 1.7 fl oz',
        price: 54.00,
        qty: 1,
        image: 'images/cream-hydra.jpg'
      }
    ],
    freeShippingThreshold: 75.00
  };

  // --- Product Catalog ---
  const products = {
    'hydra-luxe': {
      id: 'fenzo-hydra-luxe',
      name: 'Hydra-Luxe Recovery Cream',
      category: 'Deep Barrier Defense',
      tagline: '72-Hour Cellular Hydration & Ceramide Lock',
      price: '$54.00',
      priceNum: 54.00,
      image: 'images/cream-hydra.jpg',
      badge: 'Best For Dehydrated Skin',
      description: 'A transformative, velvety daily moisture cream powered by 5 bio-identical ceramides, multi-depth hyaluronic acid, and botanical squalane. Restores the lipid moisture barrier and plumps fine lines without any greasy residue.',
      benefits: ['Instant 72H Epidermal Hydration', 'Reinforces Damaged Skin Barrier', 'Silky, Non-Comedogenic Finish'],
      volume: '50ml / 1.7 fl. oz.'
    },
    'peptide-radiance': {
      id: 'fenzo-peptide-radiance',
      name: 'Cellular Peptide Radiance Cream',
      category: 'Collagen & Firming Matrix',
      tagline: 'Copper Tripeptide & Niacinamide Glow',
      price: '$58.00',
      priceNum: 58.00,
      image: 'images/cream-peptide.jpg',
      badge: 'Clinically Proven Firming',
      description: 'An advanced firming and brightening treatment cream infused with bio-mimetic peptides, stabilized Vitamin C, and 5% Niacinamide. Visibly smooths micro-creases, boosts elasticity, and imparts an ethereal glass-skin radiance.',
      benefits: ['Noticeably Firms & Lifts Contour', 'Evens Skin Tone & Dark Spots', 'Boosts Natural Collagen Synthesis'],
      volume: '50ml / 1.7 fl. oz.'
    },
    'botanical-night': {
      id: 'fenzo-botanical-night',
      name: 'Botanical Night Infusion Cream',
      category: 'Overnight Cellular Repair',
      tagline: 'Phyto-Retinol Bakuchiol & Deep Lipids',
      price: '$62.00',
      priceNum: 62.00,
      image: 'images/cream-botanical.jpg',
      badge: 'Dermatologist Recommended',
      description: 'A nutrient-dense nocturnal restorative balm that accelerates cellular turnover while you sleep. Formulated with gentle Bakuchiol (plant-based retinol alternative), cold-pressed Blue Tansy, and Evening Primrose oils.',
      benefits: ['Zero Irritation Cellular Renewal', 'Soothes Redness & Micro-Inflammation', 'Wake Up to Restored, Supple Skin'],
      volume: '50ml / 1.7 fl. oz.'
    },
    'radiance-trio': {
      id: 'fenzo-radiance-trio',
      name: 'The Fenzo Discovery Trio',
      category: 'The Complete Daily Ritual',
      tagline: 'Hydra-Luxe + Peptide Radiance + Botanical Night',
      price: '$148.00',
      priceNum: 148.00,
      image: 'images/cream-trio.jpg',
      badge: 'Best Seller — Save $26',
      description: 'The definitive clinical ritual for complete 24-hour skin transformation. Includes full-size jars of Hydra-Luxe for morning protection, Peptide Radiance for daytime luminosity, and Botanical Night Infusion for overnight repair.',
      benefits: ['Complete 24-Hour Day & Night Regimen', 'Includes All 3 Full-Size Jars (3 x 50ml)', 'Complimentary Deluxe Skincare Spatula'],
      volume: '3 x 50ml / Complete Set'
    }
  };

  let activeProductKey = 'hydra-luxe';
  let productQty = 1;

  // --- Initialize when DOM is ready ---
  function init() {
    initHeroAnimations();
    initScrollAnimations();
    initProductSlider();
    initCartDrawer();
    initFAQAccordion();
    initMobileMenu();
    initSmoothAnchors();
    renderCart();
  }

  // --- GSAP Hero & Scroll Animations ---
  function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero entrance timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate title lines
    heroTl.fromTo(
      '.hero-title-line',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, stagger: 0.15, delay: 0.1 }
    );

    heroTl.fromTo(
      '.hero-subtitle-text',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    );

    // Hero cream container entrance
    heroTl.fromTo(
      '.hero-cream-showcase',
      { scale: 0.88, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
      '-=0.7'
    );

    // Subtle floating breathing animation on hero cream
    gsap.to('.hero-cream-img', {
      y: -12,
      rotation: 1.2,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // GSAP ScrollTrigger for Hero Cream (smooth 3D tilt & parallax)
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.to('.hero-cream-img', {
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8
        },
        y: 80,
        rotation: 3.5,
        scale: 0.95,
        opacity: 0.95,
        ease: 'none'
      });
    }
  }

  // --- Aesthetic Scroll-Based Animations ---
  function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Manifesto Headline Horizontal Text Scrub
    gsap.fromTo(
      '.manifesto-headline',
      { scale: 0.94, opacity: 0.8 },
      {
        scrollTrigger: {
          trigger: '#manifesto',
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 1
        },
        scale: 1.04,
        opacity: 1,
        ease: 'none'
      }
    );

    // Red Section Glow & Glass Cards Stagger
    gsap.fromTo(
      '.fenzo-glass-card',
      { y: 50, opacity: 0, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: '#reviews',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        stagger: 0.18,
        ease: 'power3.out'
      }
    );

    // Stats Cards Stagger
    gsap.fromTo(
      '.fenzo-stat-card',
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '#stats',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      }
    );

    // General reveals
    gsap.utils.toArray('.fenzo-reveal').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 35 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }
      );
    });

    // Refresh calculations
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  }

  // --- Product Slider & Variant Switcher ---
  function initProductSlider() {
    const tabs = document.querySelectorAll('[data-product-tab]');
    const qtyDisplay = document.getElementById('fenzo-product-qty');
    const btnMinus = document.getElementById('fenzo-qty-minus');
    const btnPlus = document.getElementById('fenzo-qty-plus');
    const btnAdd = document.getElementById('fenzo-add-to-bag');

    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const key = tab.getAttribute('data-product-tab');
        if (products[key]) {
          switchProduct(key);
        }
      });
    });

    if (btnMinus) {
      btnMinus.addEventListener('click', () => {
        if (productQty > 1) {
          productQty--;
          if (qtyDisplay) qtyDisplay.textContent = productQty;
        }
      });
    }

    if (btnPlus) {
      btnPlus.addEventListener('click', () => {
        productQty++;
        if (qtyDisplay) qtyDisplay.textContent = productQty;
      });
    }

    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        const prod = products[activeProductKey];
        if (!prod) return;
        addToCart(prod, productQty);
        openCart();
        showToast(`Added ${productQty}x ${prod.name} to your bag`);
      });
    }
  }

  function switchProduct(key) {
    activeProductKey = key;
    const prod = products[key];
    if (!prod) return;

    // Reset quantity
    productQty = 1;
    const qtyDisplay = document.getElementById('fenzo-product-qty');
    if (qtyDisplay) qtyDisplay.textContent = '1';

    // Update active tab style
    document.querySelectorAll('[data-product-tab]').forEach((tab) => {
      if (tab.getAttribute('data-product-tab') === key) {
        tab.classList.add('is-active');
      } else {
        tab.classList.remove('is-active');
      }
    });

    // Animate content change
    const imgEl = document.getElementById('fenzo-featured-img');
    const titleEl = document.getElementById('fenzo-product-title');
    const priceEl = document.getElementById('fenzo-product-price');
    const descEl = document.getElementById('fenzo-product-desc');
    const badgeEl = document.getElementById('fenzo-product-badge');
    const catEl = document.getElementById('fenzo-product-category');

    if (typeof gsap !== 'undefined') {
      gsap.to([imgEl, titleEl, priceEl, descEl], {
        opacity: 0,
        y: -10,
        duration: 0.2,
        onComplete: () => {
          if (imgEl) imgEl.src = prod.image;
          if (titleEl) titleEl.textContent = prod.name;
          if (priceEl) priceEl.textContent = prod.price;
          if (descEl) descEl.textContent = prod.description;
          if (badgeEl) badgeEl.textContent = prod.badge;
          if (catEl) catEl.textContent = prod.category;

          gsap.fromTo(
            [imgEl, titleEl, priceEl, descEl],
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
          );
        }
      });
    } else {
      if (imgEl) imgEl.src = prod.image;
      if (titleEl) titleEl.textContent = prod.name;
      if (priceEl) priceEl.textContent = prod.price;
      if (descEl) descEl.textContent = prod.description;
      if (badgeEl) badgeEl.textContent = prod.badge;
      if (catEl) catEl.textContent = prod.category;
    }
  }

  // --- Cart Drawer Implementation ---
  function initCartDrawer() {
    const cartTriggers = document.querySelectorAll('[data-open-cart]');
    const cartCloseBtn = document.getElementById('fenzo-cart-close');
    const cartBackdrop = document.getElementById('fenzo-cart-backdrop');

    cartTriggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
      });
    });

    if (cartCloseBtn) {
      cartCloseBtn.addEventListener('click', closeCart);
    }
    if (cartBackdrop) {
      cartBackdrop.addEventListener('click', closeCart);
    }

    // Escape key closes cart
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeCart();
    });
  }

  function openCart() {
    const drawer = document.getElementById('fenzo-cart-drawer');
    const backdrop = document.getElementById('fenzo-cart-backdrop');
    if (!drawer || !backdrop) return;

    backdrop.style.display = 'block';
    drawer.style.display = 'flex';

    if (typeof gsap !== 'undefined') {
      gsap.to(backdrop, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        drawer,
        { x: '100%' },
        { x: '0%', duration: 0.45, ease: 'power3.out' }
      );
    } else {
      backdrop.style.opacity = '1';
      drawer.style.transform = 'translateX(0)';
    }
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    const drawer = document.getElementById('fenzo-cart-drawer');
    const backdrop = document.getElementById('fenzo-cart-backdrop');
    if (!drawer || !backdrop) return;

    if (typeof gsap !== 'undefined') {
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          backdrop.style.display = 'none';
        }
      });
      gsap.to(drawer, {
        x: '100%',
        duration: 0.35,
        ease: 'power3.in',
        onComplete: () => {
          drawer.style.display = 'none';
        }
      });
    } else {
      backdrop.style.display = 'none';
      drawer.style.display = 'none';
    }
    document.body.style.overflow = '';
  }

  function addToCart(prod, qty) {
    const existing = cartState.items.find((i) => i.id === prod.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cartState.items.push({
        id: prod.id,
        name: prod.name,
        size: prod.volume,
        price: prod.priceNum,
        qty: qty,
        image: prod.image
      });
    }
    renderCart();
  }

  function updateItemQty(index, change) {
    if (!cartState.items[index]) return;
    cartState.items[index].qty += change;
    if (cartState.items[index].qty <= 0) {
      cartState.items.splice(index, 1);
    }
    renderCart();
  }

  function removeItem(index) {
    cartState.items.splice(index, 1);
    renderCart();
  }

  function renderCart() {
    const countBadges = document.querySelectorAll('[data-cart-count]');
    const listEl = document.getElementById('fenzo-cart-items-list');
    const subtotalEl = document.getElementById('fenzo-cart-subtotal');
    const progressBar = document.getElementById('fenzo-shipping-progress');
    const shippingText = document.getElementById('fenzo-shipping-text');
    const emptyMsg = document.getElementById('fenzo-cart-empty-state');
    const checkoutBtn = document.getElementById('fenzo-checkout-btn');

    // Calculate totals
    const totalItems = cartState.items.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cartState.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    countBadges.forEach((b) => {
      b.textContent = totalItems;
    });

    if (subtotalEl) {
      subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    }

    // Free shipping progress calculation
    const remaining = cartState.freeShippingThreshold - subtotal;
    const progressPercent = Math.min(
      100,
      (subtotal / cartState.freeShippingThreshold) * 100
    );

    if (progressBar) {
      progressBar.style.width = `${progressPercent}%`;
    }

    if (shippingText) {
      if (remaining <= 0) {
        shippingText.innerHTML = `<strong>✨ Free Express Delivery unlocked!</strong>`;
      } else {
        shippingText.innerHTML = `Add <strong>$${remaining.toFixed(
          2
        )}</strong> more for complimentary express delivery.`;
      }
    }

    if (!listEl) return;

    if (cartState.items.length === 0) {
      listEl.innerHTML = '';
      if (emptyMsg) emptyMsg.style.display = 'block';
      if (checkoutBtn) {
        checkoutBtn.setAttribute('disabled', 'disabled');
        checkoutBtn.style.opacity = '0.5';
        checkoutBtn.style.pointerEvents = 'none';
      }
      return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';
    if (checkoutBtn) {
      checkoutBtn.removeAttribute('disabled');
      checkoutBtn.style.opacity = '1';
      checkoutBtn.style.pointerEvents = 'auto';
    }

    listEl.innerHTML = cartState.items
      .map(
        (item, index) => `
      <div class="cart-item-row" data-cart-index="${index}">
        <div class="cart-item-img-w">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        </div>
        <div class="cart-item-info">
          <div class="cart-item-top">
            <h4 class="cart-item-title">${item.name}</h4>
            <button class="cart-item-del-btn" data-del-item="${index}" aria-label="Remove item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
            </button>
          </div>
          <div class="cart-item-size">${item.size}</div>
          <div class="cart-item-btm">
            <div class="cart-item-qty-control">
              <button class="cart-qty-btn minus" data-qty-change="-1" data-item-idx="${index}">−</button>
              <span class="cart-qty-num">${item.qty}</span>
              <button class="cart-qty-btn plus" data-qty-change="1" data-item-idx="${index}">+</button>
            </div>
            <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
          </div>
        </div>
      </div>
    `
      )
      .join('');

    // Attach listeners to cart items
    listEl.querySelectorAll('[data-qty-change]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(btn.getAttribute('data-item-idx'), 10);
        const change = parseInt(btn.getAttribute('data-qty-change'), 10);
        updateItemQty(idx, change);
      });
    });

    listEl.querySelectorAll('[data-del-item]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(btn.getAttribute('data-del-item'), 10);
        removeItem(idx);
      });
    });
  }

  // --- FAQ Accordion ---
  function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.fenzo-faq-item');

    faqItems.forEach((item) => {
      const qBtn = item.querySelector('.fenzo-faq-q');
      const ansEl = item.querySelector('.fenzo-faq-a');
      if (!qBtn || !ansEl) return;

      qBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close all others
        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove('is-open');
            const otherAns = other.querySelector('.fenzo-faq-a');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('is-open');
          ansEl.style.maxHeight = null;
        } else {
          item.classList.add('is-open');
          ansEl.style.maxHeight = ansEl.scrollHeight + 'px';
        }
      });
    });
  }

  // --- Mobile Navigation Menu ---
  function initMobileMenu() {
    const toggleBtn = document.getElementById('fenzo-mobile-toggle');
    const menuEl = document.getElementById('fenzo-mobile-menu');
    if (!toggleBtn || !menuEl) return;

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menuEl.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menuEl.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
      if (!menuEl.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeMenu();
      }
    });

    function openMenu() {
      menuEl.classList.add('is-open');
      toggleBtn.classList.add('is-active');
    }

    function closeMenu() {
      menuEl.classList.remove('is-open');
      toggleBtn.classList.remove('is-active');
    }
  }

  // --- Smooth Anchor Navigation ---
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // --- Toast Notification ---
  function showToast(msg) {
    let toast = document.getElementById('fenzo-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'fenzo-toast';
      toast.className = 'fenzo-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3200);
  }

  // Run init on DOMContentLoaded or immediately if ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
