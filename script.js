// Stylish Salon Website - JavaScript
// Minimal JavaScript for hamburger menu toggle

document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu toggle
  const toggleButton = document.querySelector('.navbar__toggle');
  const nav = document.querySelector('.navbar__nav');
  
  if (toggleButton && nav) {
    toggleButton.addEventListener('click', function() {
      nav.classList.toggle('navbar__nav--open');
    });
    
    // Close menu when clicking on a navigation link
    const navLinks = document.querySelectorAll('.navbar__list a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('navbar__nav--open');
      });
    });
  }
  
  // Form submission handler (prevent default for demo)
  const contactForm = document.querySelector('.contact__form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const service = document.getElementById('service').value;
      
      // Simple validation
      if (name && email && service) {
        alert('Thank you for your appointment request! We will contact you soon.');
        contactForm.reset();
      }
    });
  }
});
