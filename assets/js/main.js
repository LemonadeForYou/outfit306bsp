// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved theme
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

if (darkModeToggle) {
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
}

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

document.querySelectorAll('.feature-card, .activity-preview-card, .officer-card, .announcement-card, .resource-card').forEach(el => {
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
    
    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }
}

// Attendance table data simulation (for members page)
function loadAttendanceData() {
  const tbody = document.getElementById('attendance-body');
  if (tbody) {
    const sampleData = [
      { name: 'Juan Dela Cruz', rank: 'Senior Scout', attend: '95%', points: 245 },
      { name: 'Maria Santos', rank: 'Star Scout', attend: '98%', points: 312 },
      { name: 'Jose Rizal', rank: 'Explorer', attend: '87%', points: 198 },
      { name: 'Ana Reyes', rank: 'Scribe', attend: '100%', points: 278 },
      { name: 'Carlos Mendoza', rank: 'Troop Guide', attend: '92%', points: 234 },
      { name: 'Patricia Cruz', rank: 'Instructor', attend: '96%', points: 289 }
    ];
    
    tbody.innerHTML = sampleData.map(m => `
      <tr>
        <td>${m.name}</td>
        <td>${m.rank}</td>
        <td>${m.attend}</td>
        <td>${m.points}</td>
      </tr>
    `).join('');
  }
}

// Close mobile menu when clicking a link
const allNavLinks = document.querySelectorAll('.nav-links a');
allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks && window.innerWidth <= 768) {
      navLinks.classList.remove('active');
    }
  });
});

// Initialize on page load
window.addEventListener('load', () => {
  initLightbox();
  loadAttendanceData();
  console.log('Outfit 306 website loaded — Laging Handa!');
});