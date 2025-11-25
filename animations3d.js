// ==================== SYSTÈME DE PARTICULES 3D (THREE.JS) ====================
let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init3DParticles() {
    const canvas = document.getElementById('canvas3d');
    if (!canvas || !window.THREE) return;

    // Créer la scène 3D
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Créer le système de particules avec nouvelles couleurs
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    // Position et couleur des particules
    for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 1000;
        posArray[i + 1] = (Math.random() - 0.5) * 1000;
        posArray[i + 2] = (Math.random() - 0.5) * 500;

        // Nouvelles couleurs: terracotta, vert vanille, orange curcuma
        const colorChoice = Math.random();
        if (colorChoice < 0.4) {
            // Terracotta (#E07856)
            colors[i] = 0.88 + Math.random() * 0.1;
            colors[i + 1] = 0.47 + Math.random() * 0.1;
            colors[i + 2] = 0.34 + Math.random() * 0.1;
        } else if (colorChoice < 0.7) {
            // Vert vanille (#7A9B76)
            colors[i] = 0.48 + Math.random() * 0.1;
            colors[i + 1] = 0.61 + Math.random() * 0.1;
            colors[i + 2] = 0.46 + Math.random() * 0.1;
        } else {
            // Orange curcuma (#F4A259)
            colors[i] = 0.96 + Math.random() * 0.04;
            colors[i + 1] = 0.64 + Math.random() * 0.1;
            colors[i + 2] = 0.35 + Math.random() * 0.1;
        }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Matériau des particules
    const particlesMaterial = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation
    animate3DParticles();
}

function animate3DParticles() {
    requestAnimationFrame(animate3DParticles);

    if (particles) {
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0002;
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
    }

    renderer.render(scene, camera);
}

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) / 10;
    mouseY = (event.clientY - windowHalfY) / 10;
});

window.addEventListener('resize', () => {
    if (!camera || !renderer) return;
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==================== ROTATION 3D DES CARTES PRODUITS ====================
const productCards = document.querySelectorAll('.product-card');

productCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

//  PARTICLES AU CLIC ====================
function createGoldenParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.background = 'radial-gradient(circle, #F4A259, #E07856)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9998';
    particle.style.boxShadow = '0 0 10px rgba(224, 120, 86, 0.8)';

    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 4;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    document.body.appendChild(particle);

    let posX = x;
    let posY = y;
    let opacity = 1;
    let size = 6;

    const animate = () => {
        posX += vx;
        posY += vy - 1;
        opacity -= 0.02;
        size -= 0.1;

        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.opacity = opacity;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    };

    animate();
}

document.addEventListener('click', (e) => {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createGoldenParticle(e.clientX, e.clientY), i * 20);
    }
});

// ==================== INITIALISATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🌿 Site MADA-VANILLE Familial & Moderne 🌿',
        'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #E07856, #7A9B76); color: white; padding: 10px 20px; border-radius: 15px;'
    );

    if (window.THREE) {
        init3DParticles();
        console.log('✅ Particules 3D terracotta initialisées');
    }

    // ==================== EFFET GLOW TEXTE ====================
    const glowTexts = document.querySelectorAll('.glow-text');

    glowTexts.forEach(text => {
        text.addEventListener('mousemove', (e) => {
            const rect = text.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            text.style.setProperty('--x', x + 'px');
            text.style.setProperty('--y', y + 'px');
        });
    });

    document.body.classList.add('loaded');
});

// Mobile optimization
if (isMobile) {
    console.log('📱 Mode mobile - Animations optimisées');
}


