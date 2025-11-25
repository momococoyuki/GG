// ==================== NAVIGATION MOBILE ====================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle menu mobile
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animation du burger
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ==================== HEADER SCROLL ====================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ajouter ombre au scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    // Cacher/montrer header
    if (currentScroll > lastScroll && currentScroll > 500) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Hauteur du header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== ANIMATIONS AU SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Éléments à animer
const animatedElements = document.querySelectorAll(`
    .product-card,
    .advantage-card,
    .testimonial-card,
    .contact-card,
    .story-text,
    .story-image
`);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// ==================== ANIMATION CARTES PRODUITS ====================
const productCards = document.querySelectorAll('.product-card');

productCards.forEach((card, index) => {
    // Délai progressif pour chaque carte
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Effet parallax léger au hover
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateY(-10px)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== ANIMATION COMPTEURS ====================
const stats = document.querySelectorAll('.stat-number');

const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target.textContent;
            if (!isNaN(target)) {
                animateCounter(entry.target, parseInt(target));
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    if (!isNaN(stat.textContent)) {
        statsObserver.observe(stat);
    }
});

// ==================== LAZY LOADING IMAGES ====================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ==================== WHATSAPP BUTTON TRACKING ====================
const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');

whatsappButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('WhatsApp click:', button.href);
        // Ici vous pouvez ajouter Google Analytics ou autre tracking
    });
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== SLIDER TÉMOIGNAGES (Auto-scroll) ====================
const testimonialsGrid = document.querySelector('.testimonials-grid');
let isScrolling = false;
let scrollPosition = 0;

if (testimonialsGrid && window.innerWidth > 968) {
    setInterval(() => {
        if (!isScrolling) {
            scrollPosition += 1;
            testimonialsGrid.style.transform = `translateX(-${scrollPosition}px)`;
            
            if (scrollPosition >= testimonialsGrid.scrollWidth / 2) {
                scrollPosition = 0;
            }
        }
    }, 30);
    
    testimonialsGrid.addEventListener('mouseenter', () => {
        isScrolling = true;
    });
    
    testimonialsGrid.addEventListener('mouseleave', () => {
        isScrolling = false;
    });
}

// ==================== PROTECTION CLIC DROIT (Optionnel) ====================
// Décommenter si vous voulez protéger vos images
/*
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
*/

// ==================== EASTER EGG: ANIMATION VANILLE ====================
let clickCount = 0;
const logo = document.querySelector('.logo');

logo.addEventListener('click', (e) => {
    e.preventDefault();
    clickCount++;
    
    if (clickCount === 5) {
        // Créer des émojis vanille qui tombent
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createFallingVanilla();
            }, i * 100);
        }
        clickCount = 0;
    }
});

function createFallingVanilla() {
    const vanilla = document.createElement('div');
    vanilla.textContent = '🌾';
    vanilla.style.position = 'fixed';
    vanilla.style.top = '-50px';
    vanilla.style.left = Math.random() * window.innerWidth + 'px';
    vanilla.style.fontSize = '2rem';
    vanilla.style.zIndex = '9999';
    vanilla.style.pointerEvents = 'none';
    vanilla.style.animation = 'fall 3s linear forwards';
    
    document.body.appendChild(vanilla);
    
    setTimeout(() => {
        vanilla.remove();
    }, 3000);
}

// Animation CSS pour les vanilles qui tombent
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== PERFORMANCE: DEFER NON-CRITICAL ====================
// Charger Google Maps uniquement quand visible
const mapContainer = document.querySelector('.map-container');
const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target.querySelector('iframe');
            if (iframe && !iframe.src) {
                iframe.src = iframe.dataset.src;
            }
            mapObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

if (mapContainer) {
    mapObserver.observe(mapContainer);
}

// ==================== CONSOLE MESSAGE ====================
console.log('%c🌾 Vanille Premium Madagascar 🌾', 
    'font-size: 20px; color: #D4A574; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);'
);
console.log('%cSite créé avec passion ❤️', 
    'font-size: 14px; color: #8B4513;'
);

// ==================== VIDEO AUTO-PLAY AU SURVOL ====================
const videoContainer = document.getElementById('videoContainer');
const videoPlayer = document.getElementById('videoPlayer');
const videoOverlay = document.getElementById('videoOverlay');

if (videoContainer && videoPlayer) {
    // Lire la vidéo au survol
    videoContainer.addEventListener('mouseenter', () => {
        videoPlayer.play().catch(error => {
            console.log('Autoplay prevented:', error);
        });
        videoOverlay.style.opacity = '0';
    });

    // Mettre en pause quand la souris sort
    videoContainer.addEventListener('mouseleave', () => {
        videoPlayer.pause();
        videoOverlay.style.opacity = '1';
    });

    // Cacher l'overlay quand la vidéo démarre
    videoPlayer.addEventListener('play', () => {
        videoOverlay.style.opacity = '0';
        videoOverlay.style.pointerEvents = 'none';
    });

    // Montrer l'overlay quand la vidéo est en pause
    videoPlayer.addEventListener('pause', () => {
        videoOverlay.style.opacity = '1';
        videoOverlay.style.pointerEvents = 'auto';
    });

    // Clic sur le bouton play de l'overlay
    const playBtn = videoOverlay.querySelector('.video-play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            videoPlayer.play();
            videoPlayer.muted = false; // Activer le son au clic
        });
    }

    // Clic sur la vidéo pour activer/désactiver le son
    videoPlayer.addEventListener('click', () => {
        videoPlayer.muted = !videoPlayer.muted;

        // Afficher un indicateur visuel
        const muteIndicator = document.createElement('div');
        muteIndicator.textContent = videoPlayer.muted ? '🔇' : '🔊';
        muteIndicator.style.position = 'absolute';
        muteIndicator.style.top = '50%';
        muteIndicator.style.left = '50%';
        muteIndicator.style.transform = 'translate(-50%, -50%)';
        muteIndicator.style.fontSize = '3rem';
        muteIndicator.style.color = 'white';
        muteIndicator.style.zIndex = '10';
        muteIndicator.style.pointerEvents = 'none';
        muteIndicator.style.animation = 'fadeOut 1s forwards';

        videoContainer.appendChild(muteIndicator);

        setTimeout(() => {
            muteIndicator.remove();
        }, 1000);
    });
}

// ==================== VIDEO HISTOIRE (Section Notre Histoire) ====================
const storyVideoContainer = document.getElementById('storyVideoContainer');
const storyVideoPlayer = document.getElementById('storyVideoPlayer');
const storyVideoOverlay = document.getElementById('storyVideoOverlay');

if (storyVideoContainer && storyVideoPlayer && storyVideoOverlay) {
    // Clic sur le bouton play de l'overlay
    const storyPlayBtn = storyVideoOverlay.querySelector('.video-play-btn');
    if (storyPlayBtn) {
        storyPlayBtn.addEventListener('click', () => {
            storyVideoPlayer.play();
            storyVideoOverlay.style.opacity = '0';
            storyVideoOverlay.style.pointerEvents = 'none';
        });
    }

    // Cacher l'overlay quand la vidéo démarre
    storyVideoPlayer.addEventListener('play', () => {
        storyVideoOverlay.style.opacity = '0';
        storyVideoOverlay.style.pointerEvents = 'none';
    });

    // Montrer l'overlay quand la vidéo est en pause
    storyVideoPlayer.addEventListener('pause', () => {
        if (storyVideoPlayer.currentTime === 0 || storyVideoPlayer.ended) {
            storyVideoOverlay.style.opacity = '0';
            storyVideoOverlay.style.pointerEvents = 'auto';
        }
    });

    // Remettre l'overlay quand la vidéo se termine
    storyVideoPlayer.addEventListener('ended', () => {
        setTimeout(() => {
            storyVideoOverlay.style.opacity = '0';
            storyVideoOverlay.style.pointerEvents = 'auto';
        }, 500);
    });

    // Animation de hover sur le container - Lecture automatique au survol
    storyVideoContainer.addEventListener('mouseenter', () => {
        if (storyVideoPlayer.paused) {
            storyVideoPlayer.play();
            storyVideoOverlay.style.opacity = '0';
            storyVideoOverlay.style.pointerEvents = 'none';
        }
    });

    storyVideoContainer.addEventListener('mouseleave', () => {
        if (!storyVideoPlayer.paused) {
            storyVideoPlayer.pause();
        }
    });
}

// Animation CSS pour l'indicateur de son
const videoStyle = document.createElement('style');
videoStyle.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
        }
    }
`;
document.head.appendChild(videoStyle);

// ==================== ANIMATIONS DYNAMIQUES SUPPLÉMENTAIRES ====================

// Animation des boutons au scroll
const buttons = document.querySelectorAll('.btn');
buttons.forEach((btn, index) => {
    btn.style.animationDelay = `${index * 0.1}s`;
});

// Animation des sections au scroll avec effet de zoom
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'sectionZoomIn 0.8s ease-out forwards';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Animation CSS pour le zoom des sections
const sectionStyle = document.createElement('style');
sectionStyle.textContent = `
    @keyframes sectionZoomIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(sectionStyle);

// Effet de particules sur les cartes produits
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        createSparkle(card);
    });
});

function createSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.background = 'radial-gradient(circle, #D4A574, transparent)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.opacity = '0';
    sparkle.style.animation = 'sparkleAnim 1s ease-out';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '10';

    element.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Animation CSS pour les sparkles
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnim {
        0% {
            opacity: 0;
            transform: scale(0) translateY(0);
        }
        50% {
            opacity: 1;
            transform: scale(1) translateY(-10px);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-20px);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Animation de typing pour les titres (optionnel)
const mainTitle = document.querySelector('.title-main');
if (mainTitle) {
    mainTitle.style.overflow = 'hidden';
    mainTitle.style.whiteSpace = 'nowrap';
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Site Vanille Premium chargé avec succès! 🌿');

    // Ajouter classe loaded pour animations d'entrée
    document.body.classList.add('loaded');

    // Performance log
    if (window.performance) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd -
                        window.performance.timing.navigationStart;
        console.log(`⚡ Page chargée en ${loadTime}ms`);
    }
});
