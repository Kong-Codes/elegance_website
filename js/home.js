document.addEventListener('DOMContentLoaded', function() {
  // Testimonial Slider
  initTestimonialSlider();
  
  // Collection items hover effect
  initCollectionHoverEffects();
});

// Testimonial Slider
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-testimonial');
  const nextBtn = document.querySelector('.next-testimonial');
  
  if (!slides.length || !dots.length) return;
  
  let currentSlide = 0;
  const slideCount = slides.length;
  
  // Automatic slideshow
  let slideInterval = setInterval(nextSlide, 5000);
  
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Deactivate all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show the current slide and activate the corresponding dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Reset the interval
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(currentSlide);
  }
  
  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      prevSlide();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      nextSlide();
    });
  }
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
  
  // Pause slideshow on hover
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', function() {
      clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    });
  }
}

// Collection Items Hover Effects
function initCollectionHoverEffects() {
  const collectionItems = document.querySelectorAll('.collection-item');
  
  collectionItems.forEach(item => {
    const overlay = item.querySelector('.overlay');
    const image = item.querySelector('img');
    
    if (overlay && image) {
      // Add parallax effect on hover
      item.addEventListener('mousemove', function(e) {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = x / rect.width;
        const yPercent = y / rect.height;
        
        const moveX = (xPercent - 0.5) * 10;
        const moveY = (yPercent - 0.5) * 10;
        
        image.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
      });
      
      // Reset on mouse leave
      item.addEventListener('mouseleave', function() {
        image.style.transform = '';
      });
    }
  });
}

// Hero Section Animation
document.addEventListener('DOMContentLoaded', function() {
  const heroContent = document.querySelector('.hero-content');
  
  if (heroContent) {
    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 200);
  }
});

// Instagram Feed Hover Effects
document.addEventListener('DOMContentLoaded', function() {
  const instagramItems = document.querySelectorAll('.instagram-item');
  
  instagramItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
});

// Animations on scroll
document.addEventListener('DOMContentLoaded', function() {
  const elementsToAnimate = document.querySelectorAll('.collection-grid, .about-preview, .testimonials, .instagram-feed');
  
  const animateOnScroll = function() {
    elementsToAnimate.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight * 0.85) {
        element.classList.add('animated');
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Apply initial styles
  elementsToAnimate.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Run once on load
  animateOnScroll();
});