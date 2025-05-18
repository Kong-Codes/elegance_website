document.addEventListener('DOMContentLoaded', function() {
  // Timeline animation
  animateTimeline();
  
  // Team member hover effects
  initTeamHoverEffects();
  
  // Value item animation
  animateValueItems();
  
  // Animate sections on scroll
  initScrollAnimations();
});

// Timeline Animation
function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  function checkTimelineItems() {
    timelineItems.forEach((item, index) => {
      if (isInViewport(item)) {
        setTimeout(() => {
          item.classList.add('animated');
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, index * 200); // Staggered animation
      }
    });
  }
  
  // Apply initial styles
  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Check on scroll
  window.addEventListener('scroll', checkTimelineItems);
  
  // Initial check
  checkTimelineItems();
}

// Team Member Hover Effects
function initTeamHoverEffects() {
  const teamMembers = document.querySelectorAll('.team-member');
  
  teamMembers.forEach(member => {
    const image = member.querySelector('.team-member-image img');
    
    if (image) {
      // Add subtle zoom effect on hover
      member.addEventListener('mouseenter', function() {
        image.style.transform = 'scale(1.05)';
        image.style.transition = 'transform 0.5s ease';
      });
      
      member.addEventListener('mouseleave', function() {
        image.style.transform = 'scale(1)';
      });
    }
  });
}

// Value Items Animation
function animateValueItems() {
  const valueItems = document.querySelectorAll('.value-item');
  
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  function checkValueItems() {
    valueItems.forEach((item, index) => {
      if (isInViewport(item)) {
        setTimeout(() => {
          item.classList.add('animated');
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, index * 200); // Staggered animation
      }
    });
  }
  
  // Apply initial styles
  valueItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Check on scroll
  window.addEventListener('scroll', checkValueItems);
  
  // Initial check
  checkValueItems();
}

// Scroll Animations for Sections
function initScrollAnimations() {
  const sections = document.querySelectorAll('.mission, .our-story, .team, .awards, .cta-section');
  
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
}

// Parallax effect for story image
document.addEventListener('DOMContentLoaded', function() {
  const storyImage = document.querySelector('.story-image');
  
  if (storyImage) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      const storySection = document.querySelector('.our-story');
      
      if (storySection) {
        const sectionOffset = storySection.offsetTop;
        const sectionHeight = storySection.offsetHeight;
        
        if (scrollPosition > sectionOffset - window.innerHeight && 
            scrollPosition < sectionOffset + sectionHeight) {
          const parallaxValue = (scrollPosition - (sectionOffset - window.innerHeight)) * 0.1;
          storyImage.style.backgroundPositionY = `-${parallaxValue}px`;
        }
      }
    });
  }
});

// Counter animation for milestones (if added later)
function animateCounter(element, target, duration) {
  let start = 0;
  const increment = target > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / target));
  
  const timer = setInterval(() => {
    start += increment;
    element.textContent = start;
    if (start === target) {
      clearInterval(timer);
    }
  }, stepTime);
}