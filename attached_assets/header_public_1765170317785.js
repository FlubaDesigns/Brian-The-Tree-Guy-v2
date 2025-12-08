/* Kingdom Connects – header_public.js (modular version, preserves original structure) */
import { auth } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

(function() {
  var html = document.documentElement;

  // ---------- Load saved theme & font scale ----------
  const savedTheme = localStorage.getItem('kc-theme');
  if (savedTheme) html.setAttribute('data-theme', savedTheme);

  const savedScale = localStorage.getItem('kc-fontScale');
  if (savedScale) html.style.setProperty('--base-font-size', savedScale + 'px');

  // ---------- Get role-specific login URL ----------
  function getLoginUrl() {
    const currentPage = window.location.pathname.split('/').pop();
    const roleMap = {
      'for-businesses.html': 'login.html?role=business',
      'for-churches.html': 'login.html?role=church',
      'for-agents.html': 'login.html?role=agent'
    };
    return roleMap[currentPage] || 'login.html';
  }

  // ---------- HEADER ----------
  const header = document.getElementById("header");
  if (header) {
    const loginUrl = getLoginUrl();
    header.innerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <a class="brand" href="index.html" aria-label="Home">
            <img class="site-logo" src="/library/kingdom-connects-logo-300.png" alt="Kingdom Connects logo">
            <h1 class="site-title">Kingdom Connects</h1>
          </a>

          <div class="header-actions">
            <div id="userStatus" class="user-status"></div>
            
            <div class="gear-wrap">
              <button id="settingsBtn" class="gear-btn" aria-haspopup="menu" aria-expanded="false" title="Change appearance" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>

              <div id="settingsMenu" role="menu" aria-label="Display & theme settings">
                <h4>Display</h4>
                <div class="setting-row">
                  <span>Theme</span>
                  <button class="theme-toggle" id="themeToggle" aria-label="Toggle light/dark" type="button">
                    <span class="toggle-track"><span class="toggle-thumb"></span></span>
                  </button>
                </div>
                <div class="setting-row">
                  <span>Font size</span>
                  <div class="font-size-controls">
                    <button type="button" id="fontMinus" aria-label="Decrease font size">–</button>
                    <button type="button" id="fontPlus" aria-label="Increase font size">+</button>
                  </div>
                </div>
              </div>
            </div>

            <button class="menu-toggle" id="menuBtn" aria-haspopup="true" aria-expanded="false" aria-controls="navMenu" title="Open menu" type="button">
              <span class="bar"></span><span class="bar"></span><span class="bar"></span>
            </button>
          </div>

          <ul class="nav-links" id="navMenu">
            <li id="navAuthLink"></li>
            <li><a href="index.html">Home</a></li>
            <li><a href="business_directory.html">Businesses</a></li>
            <li class="has-dropdown">
              <a href="church_directory.html" class="dropdown-toggle" aria-expanded="false">Churches <span class="dropdown-arrow">▾</span></a>
              <ul class="dropdown-menu">
                <li><a href="church_directory.html">Church Directory</a></li>
              </ul>
            </li>
            <li class="has-dropdown">
              <a href="for-businesses.html" class="dropdown-toggle" aria-expanded="false">Why Join <span class="dropdown-arrow">▾</span></a>
              <ul class="dropdown-menu">
                <li><a href="for-businesses.html">For Businesses</a></li>
                <li><a href="for-churches.html">For Churches</a></li>
                <li><a href="for-agents.html">Become an Agent</a></li>
              </ul>
            </li>
            <li><a href="add_to_directory.html">Add to Directory</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
      </header>
    `;
  }

  // ---------- MENU ----------
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");
  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = navMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        navMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ---------- DROPDOWN NAVIGATION ----------
  const dropdowns = document.querySelectorAll('.has-dropdown');
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    // Click/keyboard: Toggle dropdown (all screen sizes)
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Close other dropdowns
      dropdowns.forEach(other => {
        if (other !== dropdown) {
          other.classList.remove('active');
        }
      });
      
      // Toggle this dropdown
      dropdown.classList.toggle('active');
      toggle.setAttribute('aria-expanded', dropdown.classList.contains('active'));
    });
    
    // Keyboard support: Enter and Space
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });
    
    // Desktop: Also show on hover (in addition to click)
    if (window.matchMedia('(min-width: 769px)').matches) {
      dropdown.addEventListener('mouseenter', () => {
        dropdown.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
      });
      dropdown.addEventListener('mouseleave', (e) => {
        // Only close if mouse is leaving the entire dropdown area
        if (!dropdown.contains(e.relatedTarget)) {
          dropdown.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ---------- SETTINGS ----------
  const settingsBtn = document.getElementById("settingsBtn");
  const settingsMenu = document.getElementById("settingsMenu");
  if (settingsBtn && settingsMenu) {
    settingsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      settingsMenu.classList.toggle("open");
      settingsBtn.setAttribute("aria-expanded", settingsMenu.classList.contains("open"));
    });
    document.addEventListener("click", (e) => {
      if (!settingsMenu.contains(e.target) && !settingsBtn.contains(e.target)) {
        settingsMenu.classList.remove("open");
        settingsBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ---------- THEME TOGGLE ----------
  const themeToggle = document.getElementById("themeToggle");
  const applyTheme = (mode) => {
    html.setAttribute("data-theme", mode);
    try { localStorage.setItem("kc-theme", mode); } catch(_) {}
  };
  if (themeToggle) {
    themeToggle.classList.toggle("is-on", (html.getAttribute("data-theme") || "dark") === "light");
    themeToggle.addEventListener("click", () => {
      const current = html.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      themeToggle.classList.toggle("is-on", next === "light");
    });
  }

  // ---------- FONT SIZE ----------
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const getBase = () => {
    const raw = getComputedStyle(html).getPropertyValue("--base-font-size").trim();
    return raw ? parseFloat(raw) : 16;
  };
  const setBase = (px) => {
    html.style.setProperty("--base-font-size", px + "px");
    try { localStorage.setItem("kc-fontScale", String(px)); } catch(_) {}
  };
  const fontMinus = document.getElementById("fontMinus");
  const fontPlus  = document.getElementById("fontPlus");
  if (fontMinus) fontMinus.addEventListener("click", () => setBase(clamp(getBase() - 1, 14, 22)));
  if (fontPlus)  fontPlus.addEventListener("click", () => setBase(clamp(getBase() + 1, 14, 22)));

  // ---------- USER STATUS INDICATOR (Desktop only) ----------
  const userStatus = document.getElementById("userStatus");
  if (userStatus) {
    const loginUrl = getLoginUrl();
    // Set default login button
    userStatus.innerHTML = `<a href="${loginUrl}" class="login-btn" title="Login">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="icon-sm">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10 17 15 12 10 7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
      </svg>
    </a>`;
    
    // Update if user is authenticated (modular Firebase)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userStatus.innerHTML = `<button class="login-btn" id="logoutBtn" title="Logout" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="icon-sm">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>`;
        
        // Wait for logout utility to load
        const attachLogout = () => {
          if (window.kcAttachLogoutHandler) {
            window.kcAttachLogoutHandler('logoutBtn', 'index.html');
          } else {
            setTimeout(attachLogout, 50);
          }
        };
        attachLogout();
      }
    });
  }

  // ---------- NAV AUTH LINK (Mobile only - first item in hamburger menu) ----------
  const navAuthLink = document.getElementById("navAuthLink");
  if (navAuthLink) {
    const loginUrl = getLoginUrl();
    // Set default login link
    navAuthLink.innerHTML = `<a href="${loginUrl}">Login / Sign Up</a>`;
    
    // Update if user is authenticated (modular Firebase)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navAuthLink.innerHTML = `<a href="#" id="mobileLogoutLink">Logout</a>`;
        
        // Wait for logout utility to load
        const attachLogout = () => {
          if (window.kcAttachLogoutHandler) {
            window.kcAttachLogoutHandler('mobileLogoutLink', 'index.html');
          } else {
            setTimeout(attachLogout, 50);
          }
        };
        attachLogout();
      } else {
        navAuthLink.innerHTML = `<a href="${loginUrl}">Login / Sign Up</a>`;
      }
    });
  }
})();
