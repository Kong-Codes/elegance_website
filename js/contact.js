document.addEventListener('DOMContentLoaded', function() {
  // Form validation
  initContactFormValidation();
  
  // FAQ accordion
  initFaqAccordion();
  
  // Newsletter subscription
  initNewsletterSubscription();
  
  // Animate contact cards
  animateContactCards();
});

// Contact Form Validation
function initContactFormValidation() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const privacyCheckbox = document.getElementById('privacy');
  
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');
  const privacyError = document.getElementById('privacyError');
  
  const formStatus = document.getElementById('formStatus');
  
  // Input validation
  if (nameInput && nameError) {
    nameInput.addEventListener('blur', function() {
      validateName(this.value);
    });
    
    nameInput.addEventListener('input', function() {
      clearError(nameError);
    });
  }
  
  if (emailInput && emailError) {
    emailInput.addEventListener('blur', function() {
      validateEmail(this.value);
    });
    
    emailInput.addEventListener('input', function() {
      clearError(emailError);
    });
  }
  
  if (subjectInput && subjectError) {
    subjectInput.addEventListener('blur', function() {
      validateSubject(this.value);
    });
    
    subjectInput.addEventListener('input', function() {
      clearError(subjectError);
    });
  }
  
  if (messageInput && messageError) {
    messageInput.addEventListener('blur', function() {
      validateMessage(this.value);
    });
    
    messageInput.addEventListener('input', function() {
      clearError(messageError);
    });
  }
  
  if (privacyCheckbox && privacyError) {
    privacyCheckbox.addEventListener('change', function() {
      validatePrivacy(this.checked);
    });
  }
  
  // Form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName(nameInput.value);
    const isEmailValid = validateEmail(emailInput.value);
    const isSubjectValid = validateSubject(subjectInput.value);
    const isMessageValid = validateMessage(messageInput.value);
    const isPrivacyValid = validatePrivacy(privacyCheckbox.checked);
    
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid && isPrivacyValid) {
      // In a real application, we would submit the form data to a server here
      // For demo purposes, we'll just show a success message
      formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
      formStatus.className = 'form-status success';
      
      // Reset form
      contactForm.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
      }, 5000);
    } else {
      formStatus.textContent = 'Please fix the errors in the form.';
      formStatus.className = 'form-status error';
      
      // Hide error message after 3 seconds
      setTimeout(() => {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
      }, 3000);
    }
  });
  
  // Validation functions
  function validateName(name) {
    if (!name.trim()) {
      showError(nameError, 'Please enter your name');
      return false;
    } else if (name.trim().length < 2) {
      showError(nameError, 'Name must be at least 2 characters');
      return false;
    } else {
      clearError(nameError);
      return true;
    }
  }
  
  function validateEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!email.trim()) {
      showError(emailError, 'Please enter your email address');
      return false;
    } else if (!emailRegex.test(email)) {
      showError(emailError, 'Please enter a valid email address');
      return false;
    } else {
      clearError(emailError);
      return true;
    }
  }
  
  function validateSubject(subject) {
    if (!subject.trim()) {
      showError(subjectError, 'Please enter a subject');
      return false;
    } else if (subject.trim().length < 3) {
      showError(subjectError, 'Subject must be at least 3 characters');
      return false;
    } else {
      clearError(subjectError);
      return true;
    }
  }
  
  function validateMessage(message) {
    if (!message.trim()) {
      showError(messageError, 'Please enter your message');
      return false;
    } else if (message.trim().length < 10) {
      showError(messageError, 'Message must be at least 10 characters');
      return false;
    } else {
      clearError(messageError);
      return true;
    }
  }
  
  function validatePrivacy(checked) {
    if (!checked) {
      showError(privacyError, 'You must agree to the privacy policy');
      return false;
    } else {
      clearError(privacyError);
      return true;
    }
  }
  
  function showError(element, message) {
    if (element) {
      element.textContent = message;
    }
  }
  
  function clearError(element) {
    if (element) {
      element.textContent = '';
    }
  }
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle');
    
    if (question && answer && toggle) {
      question.addEventListener('click', function() {
        // Toggle current item
        item.classList.toggle('active');
        
        // Update icon
        toggle.innerHTML = item.classList.contains('active') 
          ? '<i class="fas fa-minus"></i>' 
          : '<i class="fas fa-plus"></i>';
        
        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherToggle = otherItem.querySelector('.faq-toggle');
            if (otherToggle) {
              otherToggle.innerHTML = '<i class="fas fa-plus"></i>';
            }
          }
        });
      });
    }
  });
}

// Newsletter Subscription
function initNewsletterSubscription() {
  const newsletterForm = document.querySelector('.newsletter-section .newsletter-form');
  const newsletterStatus = document.getElementById('newsletterStatus');
  
  if (!newsletterForm || !newsletterStatus) return;
  
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    
    if (emailInput && validateNewsletterEmail(emailInput.value)) {
      // In a real application, we would submit the email to a server here
      // For demo purposes, we'll just show a success message
      newsletterStatus.textContent = 'Thank you for subscribing to our newsletter!';
      newsletterStatus.className = 'newsletter-status success';
      
      // Reset form
      newsletterForm.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        newsletterStatus.className = 'newsletter-status';
        newsletterStatus.textContent = '';
      }, 5000);
    } else {
      newsletterStatus.textContent = 'Please enter a valid email address.';
      newsletterStatus.className = 'newsletter-status error';
      
      // Hide error message after 3 seconds
      setTimeout(() => {
        newsletterStatus.className = 'newsletter-status';
        newsletterStatus.textContent = '';
      }, 3000);
    }
  });
  
  function validateNewsletterEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.trim() && emailRegex.test(email);
  }
}

// Animate Contact Cards
function animateContactCards() {
  const contactCards = document.querySelectorAll('.contact-card');
  
  contactCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 150);
  });
}

// Map interaction
document.addEventListener('DOMContentLoaded', function() {
  const mapWrapper = document.querySelector('.map-wrapper');
  
  if (mapWrapper) {
    // Add hover effect to map
    mapWrapper.addEventListener('mouseenter', function() {
      this.style.boxShadow = 'var(--box-shadow-lg)';
    });
    
    mapWrapper.addEventListener('mouseleave', function() {
      this.style.boxShadow = 'var(--box-shadow-sm)';
    });
  }
});

// Animate sections on scroll
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.contact-form-section, .faq-section, .newsletter-section');
  
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  function checkSections() {
    sections.forEach(section => {
      if (isInViewport(section) && !section.classList.contains('animated')) {
        section.classList.add('animated');
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Apply initial styles
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
  });
  
  // Check on scroll
  window.addEventListener('scroll', checkSections);
  
  // Initial check
  checkSections();
});