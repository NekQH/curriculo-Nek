// Menu Mobile Responsivo
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// Efeito de rolagem (Fade In)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// Efeito na navbar ao fazer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// --- TELA DE CARREGAMENTO ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    // Adiciona um pequeno delay para a animação ser vista com clareza
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 800);
});

// --- INTERNACIONALIZAÇÃO (i18n) ---
const langToggleBtn = document.getElementById('lang-toggle');
const langPtEl = document.querySelector('.lang-pt');
const langEnEl = document.querySelector('.lang-en');

// Recupera a preferência salva no localStorage (padrão é 'pt')
let currentLang = localStorage.getItem('portfolioLang') || 'pt';

// Função de animação de digitação
function typeWriterEffect(element, text, speed = 50) {
    element.innerHTML = '';
    // Adiciona classe para o cursor piscante
    element.classList.add('typing-cursor');
    let i = 0;
    
    // Limpa qualquer intervalo anterior se a função for chamada rapidamente
    if(element.typingInterval) {
        clearInterval(element.typingInterval);
    }
    
    element.typingInterval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(element.typingInterval);
        }
    }, speed);
}

// Função para aplicar os textos baseados no idioma
function applyLanguage(lang) {
    const elementsToTranslate = document.querySelectorAll('[data-pt]');
    
    elementsToTranslate.forEach(el => {
        let textToSet = (lang === 'en' && el.dataset.en) ? el.dataset.en : el.dataset.pt;
        
        if (el.classList.contains('typing-effect')) {
            typeWriterEffect(el, textToSet);
        } else {
            el.innerHTML = textToSet;
        }
    });

    // Atualiza os estilos do botão
    if (lang === 'en') {
        langEnEl.classList.add('active');
        langPtEl.classList.remove('active');
    } else {
        langPtEl.classList.add('active');
        langEnEl.classList.remove('active');
    }
    
    // Salva a escolha
    localStorage.setItem('portfolioLang', lang);
    currentLang = lang;
}

// Aplica o idioma inicial assim que o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLang);
});

// Evento do botão de troca
langToggleBtn.addEventListener('click', () => {
    const newLang = currentLang === 'pt' ? 'en' : 'pt';
    applyLanguage(newLang);
});
