document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Language Switching Logic
    const langBtn = document.querySelector('.lang-switcher');
    const krBtn = langBtn?.querySelector('span:first-child');
    const enBtn = langBtn?.querySelector('span:last-child');
    let currentLang = 'KR';

    const translations = {
        'KR': {
            'hero-title': 'GLOBAL AI AGENT FROM CHICAGO.',
            'hero-subtitle': '미국 시카고 본사와 한국을 연결하는 프리미엄 AI 자동화 솔루션. 글로벌 스탠다드의 기술력으로 대표님의 비즈니스를 무한 확장시킵니다.',
            'contact-btn': '상담 신청'
        },
        'EN': {
            'hero-title': 'GLOBAL AI AGENT FROM CHICAGO.',
            'hero-subtitle': 'Premium AI Automation connecting Chicago HQ and Korea. We scale your business with global standard technology.',
            'contact-btn': 'Contact Us'
        }
    };

    const updateLanguage = (lang) => {
        currentLang = lang;
        if (lang === 'KR') {
            krBtn.style.color = 'var(--accent-blue)';
            enBtn.style.color = '#94a3b8';
            document.documentElement.lang = 'ko';
        } else {
            enBtn.style.color = 'var(--accent-blue)';
            krBtn.style.color = '#94a3b8';
            document.documentElement.lang = 'en';
        }
        
        // Simple text swap examples (can expand as needed)
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) subtitle.textContent = translations[lang]['hero-subtitle'];
        
        const navCtaBtn = document.querySelector('.nav-cta .btn-primary');
        if (navCtaBtn) navCtaBtn.textContent = translations[lang]['contact-btn'];
    };

    krBtn?.addEventListener('click', () => updateLanguage('KR'));
    enBtn?.addEventListener('click', () => updateLanguage('EN'));

    // Smooth scroll for nav links (existing)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Handle cross-page hash links
            if (window.location.pathname.includes('.html') && !window.location.pathname.includes('index.html')) {
                window.location.href = 'index.html' + targetId;
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
});
