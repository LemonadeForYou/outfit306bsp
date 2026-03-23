// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Color Picker Elements
const colorPickerBtn = document.getElementById('colorPickerBtn');
const colorPickerDropdown = document.getElementById('colorPickerDropdown');
const colorOptions = document.querySelectorAll('.color-option');

// Color themes with their RGB values
const colorThemes = {
  green: { primary: '#1e6f3f', primaryDark: '#0f4a2a', primaryLight: '#2d8a4f', rgb: '30, 111, 63' },
  blue: { primary: '#1e6f9f', primaryDark: '#0f4a6e', primaryLight: '#2d8abf', rgb: '30, 111, 159' },
  red: { primary: '#c73d2f', primaryDark: '#9b2c1f', primaryLight: '#dc5a4a', rgb: '199, 61, 47' },
  purple: { primary: '#7c3aed', primaryDark: '#5b21b6', primaryLight: '#9b6bff', rgb: '124, 58, 237' },
  orange: { primary: '#ea580c', primaryDark: '#c2410c', primaryLight: '#f97316', rgb: '234, 88, 12' }
};

// Check for saved theme
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Check for saved color theme
const savedColor = localStorage.getItem('colorTheme') || 'green';
applyColorTheme(savedColor);

// Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  if (body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    localStorage.setItem('theme', 'light');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
});

// Color Picker Dropdown Toggle
colorPickerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  colorPickerDropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!colorPickerBtn.contains(e.target) && !colorPickerDropdown.contains(e.target)) {
    colorPickerDropdown.classList.remove('active');
  }
});

// Apply color theme
function applyColorTheme(color) {
  const theme = colorThemes[color];
  if (!theme) return;
  
  document.documentElement.style.setProperty('--primary', theme.primary);
  document.documentElement.style.setProperty('--primary-dark', theme.primaryDark);
  document.documentElement.style.setProperty('--primary-light', theme.primaryLight);
  document.documentElement.style.setProperty('--primary-rgb', theme.rgb);
  
  // Update hero overlay
  const heroOverlay = document.querySelector('.hero-overlay');
  if (heroOverlay) {
    heroOverlay.style.background = `linear-gradient(135deg, rgba(${theme.rgb}, 0.7), rgba(0,0,0,0.4))`;
  }
  
  // Update section tags and badges
  const sectionTags = document.querySelectorAll('.section-tag, .hero-badge');
  sectionTags.forEach(tag => {
    if (!tag.classList.contains('hero-badge') || tag.classList.contains('hero-badge')) {
      tag.style.backgroundColor = theme.primary;
    }
  });
  
  localStorage.setItem('colorTheme', color);
}

// Color option click handlers
colorOptions.forEach(option => {
  option.addEventListener('click', () => {
    const color = option.dataset.color;
    applyColorTheme(color);
    colorPickerDropdown.classList.remove('active');
  });
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll Animations (Fade-up)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card, .activity-preview-card, .officer-mini-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease-out';
  observer.observe(el);
});

// Lightbox functionality for gallery page
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (galleryItems.length && lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
      });
    });
    
    if (lightbox) {
      lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
      });
    }
  }
}

// Loading animation
window.addEventListener('load', () => {
  initLightbox();
  console.log('Outfit 306 website loaded — Laging Handa!');
});

// Attendance table data simulation (for members page)
function loadAttendanceData() {
  const tbody = document.getElementById('attendance-body');
  if (tbody) {
    const sampleData = [
      { name: 'Juan Dela Cruz', rank: 'Senior Scout', attend: '95%', points: 245 },
      { name: 'Maria Santos', rank: 'Star Scout', attend: '98%', points: 312 },
      { name: 'Jose Rizal', rank: 'Explorer', attend: '87%', points: 198 },
      { name: 'Ana Reyes', rank: 'Scribe', attend: '100%', points: 278 }
    ];
    
    tbody.innerHTML = sampleData.map(m => `
      <tr>
        <td style="padding: 1rem;">${m.name}</td>
        <td style="padding: 1rem;">${m.rank}</td>
        <td style="padding: 1rem;">${m.attend}</td>
        <td style="padding: 1rem;">${m.points}</td>
      </tr>
    `).join('');
  }
}

loadAttendanceData();