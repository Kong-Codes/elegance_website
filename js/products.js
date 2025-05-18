document.addEventListener('DOMContentLoaded', function() {
  // Product filtering
  initProductFilters();
  
  // Product quick view
  initQuickView();
  
  // Thumbnail gallery
  initThumbnailGallery();
  
  // Featured product interactions
  initFeaturedProductInteractions();
  
  // Related products slider
  initRelatedProductsSlider();
});

// Product Filtering
function initProductFilters() {
  const categoryFilter = document.getElementById('category-filter');
  const collectionFilter = document.getElementById('collection-filter');
  const sortFilter = document.getElementById('sort-filter');
  const productCards = document.querySelectorAll('.product-card');
  
  if (!categoryFilter || !collectionFilter || !sortFilter || !productCards.length) return;
  
  function applyFilters() {
    const selectedCategory = categoryFilter.value;
    const selectedCollection = collectionFilter.value;
    
    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardCollection = card.getAttribute('data-collection');
      
      const categoryMatch = selectedCategory === 'all' || cardCategory === selectedCategory;
      const collectionMatch = selectedCollection === 'all' || cardCollection === selectedCollection;
      
      if (categoryMatch && collectionMatch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Apply sorting after filtering
    applySorting();
  }
  
  function applySorting() {
    const sortValue = sortFilter.value;
    const productsContainer = document.querySelector('.products-container');
    const visibleProducts = Array.from(productCards).filter(card => card.style.display !== 'none');
    
    if (!productsContainer || !visibleProducts.length) return;
    
    // Sort products based on selected option
    visibleProducts.sort((a, b) => {
      if (sortValue === 'featured') {
        return 0; // Keep original order
      } else if (sortValue === 'newest') {
        // For demo purposes, we'll just reverse the order
        return -1;
      } else if (sortValue === 'price-low') {
        const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
        const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
        return priceA - priceB;
      } else if (sortValue === 'price-high') {
        const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
        const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
        return priceB - priceA;
      }
      return 0;
    });
    
    // Reorder elements in the DOM
    visibleProducts.forEach(product => {
      productsContainer.appendChild(product);
    });
  }
  
  // Event listeners
  categoryFilter.addEventListener('change', applyFilters);
  collectionFilter.addEventListener('change', applyFilters);
  sortFilter.addEventListener('change', applySorting);
}

// Quick View Functionality
function initQuickView() {
  const quickViewButtons = document.querySelectorAll('.quick-view');
  const lightbox = document.getElementById('product-lightbox');
  
  if (!quickViewButtons.length || !lightbox) return;
  
  // Product data - would normally come from a database
  const productData = {
    'classic-blazer': {
      name: 'Classic Tailored Blazer',
      price: '$189.00',
      description: 'A timeless, tailored blazer crafted from premium Italian wool. Features a flattering slim fit, notched lapels, and a single-button closure.',
      images: [
        'images/pexels-pexels-user-878504306-19694333.jpg'
      ],
      colors: ['Black', 'Navy', 'Beige'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    'summer-dress': {
      name: 'Floral Summer Dress',
      price: '$149.00',
      description: 'A breezy summer dress with a flattering silhouette. Made from 100% organic cotton with a beautiful floral print.',
      images: [
        'images/pexels-ron-lach-10544108.jpg',

      ],
      colors: ['Floral', 'White'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    'leather-tote': {
      name: 'Classic Leather Tote',
      price: '$229.00',
      description: 'A spacious tote crafted from premium full-grain leather. Features a durable construction, multiple interior pockets, and a magnetic closure.',
      images: [
        'images/pexels-jose-martin-segura-benites-1422456152-27100523.jpg'
      ],
      colors: ['Brown', 'Black', 'Tan'],
      sizes: ['One Size']
    },
    'winter-coat': {
      name: 'Premium Winter Coat',
      price: '$299.00',
      description: 'A luxurious winter coat with a warm down filling. Features a water-repellent outer shell, adjustable hood, and multiple pockets.',
      images: [
        'images/pexels-victoria-strelka_ph-128225472-11428514.jpg'
      ],
      colors: ['Camel', 'Gray'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    'silk-scarf': {
      name: 'Printed Silk Scarf',
      price: '$89.00',
      description: 'A luxurious silk scarf with a unique print. Made from 100% mulberry silk for a soft, lightweight feel.',
      images: [
        'images/pexels-anuradha-mishra-357832475-14900849.jpg'
      ],
      colors: ['Blue Pattern', 'Red Pattern'],
      sizes: ['One Size']
    },
    'knit-dress': {
      name: 'Merino Wool Knit Dress',
      price: '$179.00',
      description: 'A cozy knit dress made from sustainable merino wool. Features a comfortable fit, ribbed details, and a midi length.',
      images: [
        'images/pexels-arina-krasnikova-5709867.jpg'
      ],
      colors: ['Burgundy', 'Navy', 'Cream'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    }
  };
  
  // Open lightbox
  quickViewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-product');
      const product = productData[productId];
      
      if (product) {
        populateLightbox(product);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      }
    });
  });
  
  // Close lightbox
  const closeButton = lightbox.querySelector('.close-lightbox');
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    });
  }
  
  // Close on overlay click
  lightbox.addEventListener('click', function(e) {
    if (e.target === this) {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });
  
  // Populate lightbox with product data
  function populateLightbox(product) {
    const mainImage = document.getElementById('lightbox-main-image');
    const thumbnailsContainer = lightbox.querySelector('.lightbox-thumbnails');
    const detailsContainer = lightbox.querySelector('.lightbox-details');
    
    // Set main image
    if (mainImage) {
      mainImage.src = product.images[0];
      mainImage.alt = product.name;
    }
    
    // Create thumbnails
    if (thumbnailsContainer) {
      thumbnailsContainer.innerHTML = '';
      
      product.images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = `${product.name} - Image ${index + 1}`;
        thumbnail.className = index === 0 ? 'active' : '';
        
        thumbnail.addEventListener('click', function() {
          // Update main image
          mainImage.src = this.src;
          mainImage.alt = this.alt;
          
          // Update active thumbnail
          thumbnailsContainer.querySelectorAll('img').forEach(img => {
            img.classList.remove('active');
          });
          this.classList.add('active');
        });
        
        thumbnailsContainer.appendChild(thumbnail);
      });
    }
    
    // Populate details
    if (detailsContainer) {
      detailsContainer.innerHTML = `
        <div class="product-category">FEATURED PRODUCT</div>
        <h2 class="featured-title">${product.name}</h2>
        <p class="featured-price">${product.price}</p>
        <div class="product-rating">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star-half-alt"></i>
          <span class="rating-count">(42 reviews)</span>
        </div>
        <p class="product-description">${product.description}</p>
        
        <div class="product-options">
          <div class="option-group">
            <label>Color:</label>
            <div class="color-options">
              ${product.colors.map((color, index) => {
                const colorClass = color.toLowerCase().replace(/\s+/g, '-');
                return `<div class="color-option ${colorClass} ${index === 0 ? 'selected' : ''}" data-color="${color}"></div>`;
              }).join('')}
            </div>
            <span class="selected-option">${product.colors[0]}</span>
          </div>
          
          <div class="option-group">
            <label>Size:</label>
            <div class="size-options">
              ${product.sizes.map((size, index) => {
                return `<button class="size-option ${index === 1 ? 'selected' : ''}">${size}</button>`;
              }).join('')}
            </div>
          </div>
          
          <div class="option-group">
            <label>Quantity:</label>
            <div class="quantity-selector">
              <button class="quantity-btn minus">-</button>
              <input type="number" class="quantity-input" value="1" min="1" max="10">
              <button class="quantity-btn plus">+</button>
            </div>
          </div>
        </div>
        
        <div class="product-actions">
          <button class="add-to-cart-btn">Add to Cart</button>
          <button class="wishlist-btn"><i class="far fa-heart"></i></button>
        </div>
      `;
      
      // Add event listeners to the newly created elements
      initLightboxInteractions(detailsContainer);
    }
  }
  
  // Initialize interactions for lightbox elements
  function initLightboxInteractions(container) {
    // Color selection
    const colorOptions = container.querySelectorAll('.color-option');
    const selectedOptionText = container.querySelector('.selected-option');
    
    colorOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Update selected class
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        
        // Update text
        if (selectedOptionText) {
          selectedOptionText.textContent = this.getAttribute('data-color');
        }
      });
    });
    
    // Size selection
    const sizeOptions = container.querySelectorAll('.size-option');
    
    sizeOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Update selected class
        sizeOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
    
    // Quantity selector
    const minusBtn = container.querySelector('.minus');
    const plusBtn = container.querySelector('.plus');
    const quantityInput = container.querySelector('.quantity-input');
    
    if (minusBtn && plusBtn && quantityInput) {
      minusBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
          quantityInput.value = currentValue - 1;
        }
      });
      
      plusBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
          quantityInput.value = currentValue + 1;
        }
      });
      
      quantityInput.addEventListener('change', function() {
        const value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
          this.value = 1;
        } else if (value > 10) {
          this.value = 10;
        }
      });
    }
    
    // Add to cart button
    const addToCartBtn = container.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', function() {
        // Would normally add the product to the cart
        showToast('Product added to cart!');
      });
    }
    
    // Wishlist button
    const wishlistBtn = container.querySelector('.wishlist-btn');
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', function() {
        // Toggle heart icon
        const icon = this.querySelector('i');
        if (icon) {
          icon.classList.toggle('far');
          icon.classList.toggle('fas');
          
          if (icon.classList.contains('fas')) {
            showToast('Product added to wishlist!');
          } else {
            showToast('Product removed from wishlist!');
          }
        }
      });
    }
  }
}

// Thumbnail Gallery
function initThumbnailGallery() {
  const mainImage = document.getElementById('featured-main-image');
  const thumbnails = document.querySelectorAll('.thumbnail');
  
  if (!mainImage || !thumbnails.length) return;
  
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      // Update main image
      mainImage.src = this.src;
      mainImage.alt = this.alt;
      
      // Update active thumbnail
      thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
}

// Featured Product Interactions
function initFeaturedProductInteractions() {
  // Color selection
  const colorOptions = document.querySelectorAll('.featured-product .color-option');
  const selectedOptionText = document.querySelector('.featured-product .selected-option');
  
  if (colorOptions.length && selectedOptionText) {
    colorOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Update selected class
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        
        // Update text
        selectedOptionText.textContent = this.getAttribute('data-color');
      });
    });
  }
  
  // Size selection
  const sizeOptions = document.querySelectorAll('.featured-product .size-option');
  
  if (sizeOptions.length) {
    sizeOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Update selected class
        sizeOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
  }
  
  // Quantity selector
  const minusBtn = document.querySelector('.featured-product .minus');
  const plusBtn = document.querySelector('.featured-product .plus');
  const quantityInput = document.querySelector('.featured-product .quantity-input');
  
  if (minusBtn && plusBtn && quantityInput) {
    minusBtn.addEventListener('click', function() {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
    
    plusBtn.addEventListener('click', function() {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
      }
    });
    
    quantityInput.addEventListener('change', function() {
      const value = parseInt(this.value);
      if (isNaN(value) || value < 1) {
        this.value = 1;
      } else if (value > 10) {
        this.value = 10;
      }
    });
  }
  
  // Add to cart button
  const addToCartBtn = document.querySelector('.featured-product .add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      // Would normally add the product to the cart
      showToast('Product added to cart!');
    });
  }
  
  // Wishlist button
  const wishlistBtn = document.querySelector('.featured-product .wishlist-btn');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', function() {
      // Toggle heart icon
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        
        if (icon.classList.contains('fas')) {
          showToast('Product added to wishlist!');
        } else {
          showToast('Product removed from wishlist!');
        }
      }
    });
  }
}

// Related Products Slider
function initRelatedProductsSlider() {
  const slider = document.querySelector('.related-products-slider');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  
  if (!slider || !prevBtn || !nextBtn) return;
  
  let scrollAmount = 0;
  const slideWidth = slider.querySelector('.related-product').offsetWidth;
  const slideCount = slider.querySelectorAll('.related-product').length;
  const maxScroll = (slideCount - 4) * slideWidth;
  
  // Scroll left
  prevBtn.addEventListener('click', function() {
    scrollAmount = Math.max(scrollAmount - slideWidth, 0);
    slider.style.transform = `translateX(-${scrollAmount}px)`;
    updateButtonState();
  });
  
  // Scroll right
  nextBtn.addEventListener('click', function() {
    scrollAmount = Math.min(scrollAmount + slideWidth, maxScroll);
    slider.style.transform = `translateX(-${scrollAmount}px)`;
    updateButtonState();
  });
  
  // Update button states
  function updateButtonState() {
    prevBtn.disabled = scrollAmount === 0;
    nextBtn.disabled = scrollAmount >= maxScroll;
    
    prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
    nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
  }
  
  // Apply initial state
  slider.style.transition = 'transform 0.3s ease';
  updateButtonState();
}

// Add to wishlist functionality for product cards
document.addEventListener('DOMContentLoaded', function() {
  const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
  
  wishlistButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent triggering quick view
      
      // Toggle heart icon
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        
        if (icon.classList.contains('fas')) {
          showToast('Product added to wishlist!');
        } else {
          showToast('Product removed from wishlist!');
        }
      }
    });
  });
});

// Animation for products on page load
document.addEventListener('DOMContentLoaded', function() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
});