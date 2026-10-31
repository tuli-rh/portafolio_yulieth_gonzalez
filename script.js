// Fondo interactivo con destellos / estrellitas y corazoncitos flotantes
const canvas = document.getElementById('cute-bg');
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class CuteParticle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 3;
        this.speedY = Math.random() * 0.4 + 0.2;
        this.opacity = Math.random() * 0.6 + 0.3;
        this.fadeSpeed = Math.random() * 0.008 + 0.003;
        this.type = Math.random() > 0.5 ? 'sparkle' : 'heart';
    }

    update() {
        this.y -= this.speedY;
        this.opacity -= this.fadeSpeed;
        if (this.opacity <= 0 || this.y <= 0) {
            this.reset();
            this.y = canvas.height;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ff9ebb';

        if (this.type === 'sparkle') {
            // Estrellita de 4 puntas
            ctx.beginPath();
            for (let i = 0; i < 4; i++) {
                ctx.lineTo(Math.cos((18 + i * 90) * Math.PI / 180) * this.size + this.x,
                           Math.sin((18 + i * 90) * Math.PI / 180) * this.size + this.y);
                ctx.lineTo(Math.cos((54 + i * 90) * Math.PI / 180) * (this.size / 2) + this.x,
                           Math.sin((54 + i * 90) * Math.PI / 180) * (this.size / 2) + this.y);
            }
            ctx.closePath();
            ctx.fill();
        } else {
            // Corazoncito simple
            const d = this.size / 2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + d / 4);
            ctx.quadraticCurveTo(this.x, this.y, this.x - d / 2, this.y);
            ctx.quadraticCurveTo(this.x - d, this.y, this.x - d, this.y + d / 2);
            ctx.quadraticCurveTo(this.x - d, this.y + d, this.x, this.y + d * 1.5);
            ctx.quadraticCurveTo(this.x + d, this.y + d, this.x + d, this.y + d / 2);
            ctx.quadraticCurveTo(this.x + d, this.y, this.x + d / 2, this.y);
            ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + d / 4);
            ctx.fill();
        }
        ctx.restore();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push(new CuteParticle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

initParticles();
animate();

// Lógica para Modo Oscuro / Modo Claro
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// Formulario de contacto
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Mensaje enviado con éxito!');
});