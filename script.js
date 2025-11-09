// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const searchIconBtn = document.getElementById('search-icon-btn');
const searchBox = document.querySelector('.search-box');
const searchCloseBtn = document.getElementById('search-close-btn');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
}

// Search icon toggle
if (searchIconBtn && searchBox) {
    searchIconBtn.addEventListener('click', function() {
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
        } else if (searchInput) {
            searchInput.value = '';
        }
    });
}

if (searchCloseBtn && searchBox) {
    searchCloseBtn.addEventListener('click', () => {
        searchBox.classList.remove('active');
        if (searchInput) {
            searchInput.value = '';
        }
    });
}

// Slider functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Auto-advance slides
function autoSlide() {
    currentSlideIndex++;
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    }
    showSlide(currentSlideIndex);
}

// Show specific slide
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[index]) {
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    currentSlideIndex = index;
}

// Change slide manually
function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    showSlide(currentSlideIndex);
}

// Go to specific slide
function currentSlide(index) {
    showSlide(index - 1);
}

// Initialize slider
if (slides.length > 0) {
    // Auto-advance every 5 seconds
    setInterval(autoSlide, 5000);
    showSlide(0);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Search functionality
if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            // Simple search - scroll to relevant section or highlight
            const sections = ['introduction', 'menu', 'space', 'reviews', 'contact'];
            const found = sections.find(section => section.includes(searchTerm));
            
            if (found) {
                const target = document.getElementById(found);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                alert(`No results found for "${searchTerm}". Try searching for: introduction, menu, space, reviews, or contact.`);
            }
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Observe gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Observe review cards
document.querySelectorAll('.review-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Gallery image click handler (optional - can open lightbox)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // Could implement lightbox here if needed
        console.log('Gallery item clicked');
    });
});

// Introduction image carousel
let currentIntroSlideIndex = 0;
const introSlides = document.querySelectorAll('.intro-slide');
const introDots = document.querySelectorAll('.intro-dot');

function showIntroSlide(index) {
    introSlides.forEach(slide => slide.classList.remove('active'));
    introDots.forEach(dot => dot.classList.remove('active'));
    
    if (introSlides[index]) {
        introSlides[index].classList.add('active');
        introDots[index].classList.add('active');
    }
    currentIntroSlideIndex = index;
}

function changeIntroSlide(direction) {
    currentIntroSlideIndex += direction;
    if (currentIntroSlideIndex >= introSlides.length) {
        currentIntroSlideIndex = 0;
    } else if (currentIntroSlideIndex < 0) {
        currentIntroSlideIndex = introSlides.length - 1;
    }
    showIntroSlide(currentIntroSlideIndex);
}

function currentIntroSlide(index) {
    showIntroSlide(index - 1);
}

// Auto-advance intro slides
if (introSlides.length > 0) {
    setInterval(() => {
        changeIntroSlide(1);
    }, 4000);
    showIntroSlide(0);
}

// Reviews carousel
let currentReviewIndex = 0;
const reviewSlides = document.querySelectorAll('.review-slide');
const reviewDots = document.querySelectorAll('.review-dot');

function showReview(index) {
    reviewSlides.forEach(slide => slide.classList.remove('active'));
    reviewDots.forEach(dot => dot.classList.remove('active'));
    
    if (reviewSlides[index]) {
        reviewSlides[index].classList.add('active');
        reviewDots[index].classList.add('active');
    }
    currentReviewIndex = index;
}

function changeReview(direction) {
    currentReviewIndex += direction;
    if (currentReviewIndex >= reviewSlides.length) {
        currentReviewIndex = 0;
    } else if (currentReviewIndex < 0) {
        currentReviewIndex = reviewSlides.length - 1;
    }
    showReview(currentReviewIndex);
}

function currentReview(index) {
    showReview(index - 1);
}

// Auto-advance reviews
if (reviewSlides.length > 0) {
    setInterval(() => {
        changeReview(1);
    }, 5000);
    showReview(0);
}

// Image lightbox for menu and space sections
const lightbox = document.getElementById('image-lightbox');
const lightboxImage = lightbox ? lightbox.querySelector('img') : null;
const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

function openLightbox(image) {
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
}

function closeLightbox() {
    if (!lightbox || !lightboxImage) return;

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    document.body.classList.remove('no-scroll');
}

if (lightbox) {
    const clickableImages = document.querySelectorAll('.menu-item img, .space-collage img');

    clickableImages.forEach(img => {
        img.addEventListener('click', () => openLightbox(img));
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
            closeLightbox();
        }
    });
}