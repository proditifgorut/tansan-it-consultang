// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuButton = document.getElementById('mobile-menu-button');
  
  mobileMenu.classList.toggle('hidden');
  
  // Toggle hamburger icon
  const bars = menuButton.querySelectorAll('span');
  bars.forEach((bar, index) => {
    if (mobileMenu.classList.contains('hidden')) {
      bar.style.transform = 'rotate(0deg)';
    } else {
      if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
      if (index === 1) bar.style.opacity = '0';
      if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }
  });
}

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: 'smooth'
  });
  
  // Close mobile menu if open
  const mobileMenu = document.getElementById('mobile-menu');
  if (!mobileMenu.classList.contains('hidden')) {
    toggleMobileMenu();
  }
}

// Intersection Observer for navigation highlighting
function initNavHighlighting() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('text-primary-600', 'font-semibold');
          link.classList.add('text-gray-700');
        });
        
        const activeLink = document.querySelector(`[onclick="scrollToSection('${entry.target.id}')"]`);
        if (activeLink) {
          activeLink.classList.remove('text-gray-700');
          activeLink.classList.add('text-primary-600', 'font-semibold');
        }
      }
    });
  }, { threshold: 0.3 });
  
  sections.forEach(section => observer.observe(section));
}

// Testimonial carousel
let currentTestimonial = 0;
const testimonials = [
  {
    name: "PT Mandiri Manufacturing",
    industry: "Manufaktur",
    text: "Implementasi Odoo membantu kami meningkatkan efisiensi produksi hingga 40% dan mengurangi kesalahan inventory hingga 90%.",
    rating: 5
  },
  {
    name: "CV Sukses Retailindo",
    industry: "Retail",
    text: "Dengan Odoo POS dan e-commerce terintegrasi, omzet online kami naik 150% dalam 6 bulan pertama.",
    rating: 5
  },
  {
    name: "Klinik Sehat Bersama",
    industry: "Kesehatan",
    text: "Sistem appointment dan billing Odoo membuat operasional klinik lebih tertata dan pasien lebih puas.",
    rating: 5
  }
];

function showTestimonial(index) {
  const testimonial = testimonials[index];
  document.getElementById('testimonial-text').textContent = testimonial.text;
  document.getElementById('testimonial-name').textContent = testimonial.name;
  document.getElementById('testimonial-industry').textContent = testimonial.industry;
  
  // Update active dot
  document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
    dot.classList.toggle('bg-primary-600', i === index);
    dot.classList.toggle('bg-gray-300', i !== index);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

// Auto-advance testimonials
function initTestimonialCarousel() {
  showTestimonial(0);
  setInterval(nextTestimonial, 5000);
}

// Form handling
function handleConsultationForm(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  
  // Show success message
  const successMessage = document.getElementById('form-success');
  successMessage.classList.remove('hidden');
  
  // Reset form
  event.target.reset();
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    successMessage.classList.add('hidden');
  }, 5000);
  
  console.log('Form submitted:', data);
}

// Service filter
function filterServices(category) {
  const services = document.querySelectorAll('.service-card');
  const buttons = document.querySelectorAll('.filter-btn');
  
  // Update active button
  buttons.forEach(btn => {
    btn.classList.remove('bg-primary-600', 'text-white');
    btn.classList.add('bg-gray-200', 'text-gray-700');
  });
  
  event.target.classList.remove('bg-gray-200', 'text-gray-700');
  event.target.classList.add('bg-primary-600', 'text-white');
  
  // Filter services
  services.forEach(service => {
    if (category === 'all' || service.dataset.category === category) {
      service.style.display = 'block';
    } else {
      service.style.display = 'none';
    }
  });
}

// ROI Calculator
function calculateROI() {
  const employees = document.getElementById('employees').value;
  const currentCost = document.getElementById('current-cost').value;
  
  if (!employees || !currentCost) return;
  
  const annualSavings = employees * 2400000; // Estimated 2.4M savings per employee
  const implementation = 80000000; // Average implementation cost
  const roi = ((annualSavings - implementation) / implementation * 100).toFixed(1);
  const payback = (implementation / annualSavings * 12).toFixed(1);
  
  document.getElementById('roi-result').innerHTML = `
    <div class="bg-green-50 p-6 rounded-lg">
      <h4 class="text-lg font-semibold text-green-800 mb-4">Hasil Perhitungan ROI</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">Rp ${annualSavings.toLocaleString('id-ID')}</div>
          <div class="text-sm text-gray-600">Penghematan per Tahun</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">${roi}%</div>
          <div class="text-sm text-gray-600">ROI dalam 3 Tahun</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">${payback} Bulan</div>
          <div class="text-sm text-gray-600">Payback Period</div>
        </div>
      </div>
    </div>
  `;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initNavHighlighting();
  initTestimonialCarousel();
  
  // Add scroll animations
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  });
  
  animateElements.forEach(el => scrollObserver.observe(el));
});

// Make functions globally available
window.toggleMobileMenu = toggleMobileMenu;
window.scrollToSection = scrollToSection;
window.handleConsultationForm = handleConsultationForm;
window.filterServices = filterServices;
window.calculateROI = calculateROI;
