// Navigation menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const header = document.getElementById('header');

  // Toggle mobile menu
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }

  // Header scroll effect
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navLinks && navLinks.contains(event.target);
    const isClickOnHamburger = hamburger && hamburger.contains(event.target);
    
    if (navLinks && navLinks.classList.contains('active') && !isClickInsideNav && !isClickOnHamburger) {
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu after clicking a link
          if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
          }
        }
      }
    });
  });

  // Form validation for newsletter in footer
  const footerNewsletterForm = document.querySelector('footer .newsletter-form');
  if (footerNewsletterForm) {
    footerNewsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      
      if (emailInput && validateEmail(emailInput.value)) {
        // Would normally submit the form or use AJAX here
        emailInput.value = '';
        showToast('Thank you for subscribing to our newsletter!');
      } else {
        showToast('Please enter a valid email address.', 'error');
      }
    });
  }
});

// Email validation
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Toast notification
function showToast(message, type = 'success') {
  // Check if a toast container exists, if not create one
  let toastContainer = document.querySelector('.toast-container');
  
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
    
    // Add styles for the toast container
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '20px';
    toastContainer.style.right = '20px';
    toastContainer.style.zIndex = '9999';
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  // Style the toast
  toast.style.backgroundColor = type === 'success' ? '#4caf50' : '#f44336';
  toast.style.color = 'white';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '4px';
  toast.style.marginTop = '10px';
  toast.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
  toast.style.transition = 'all 0.3s ease';
  toast.style.opacity = '0';
  
  // Add the toast to the container
  toastContainer.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 10);
  
  // Remove the toast after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      toast.remove();
      
      // Remove the container if there are no more toasts
      if (toastContainer.children.length === 0) {
        toastContainer.remove();
      }
    }, 300);
  }, 3000);
}