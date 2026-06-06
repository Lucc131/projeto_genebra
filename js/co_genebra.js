/* ==========================================================================
   DINÂMICAS E INTERATIVIDADES - CO.GENEBRA (Casa de Oração)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       0. SISTEMA DE MODO ESCURO / CLARO
       ========================================================================== */
    const themeToggle = document.getElementById('themeToggle');
    const iconSun = document.querySelector('.icon-sun');
    const iconMoon = document.querySelector('.icon-moon');

    // Recuperar preferência salva ou usar o modo claro por padrão ao entrar
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme ? savedTheme : 'light';

    // Função para aplicar o tema
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (iconSun && iconMoon) {
                iconSun.classList.add('hidden');
                iconMoon.classList.remove('hidden');
            }
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            if (iconSun && iconMoon) {
                iconSun.classList.remove('hidden');
                iconMoon.classList.add('hidden');
            }
        }
    };

    // Aplicar tema inicial no carregamento
    applyTheme(initialTheme);

    // Adicionar escutador de evento no botão
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }


    /* ==========================================================================
       1. EFEITO SCROLL-FADE - IMAGEM DE FUNDO DO HERO (TOPO)
       ========================================================================== */
    const heroBg = document.getElementById('heroBg');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        const windowHeight = window.innerHeight;

        // A opacidade diminui gradativamente de 1 para 0
        // Chega a 0 ligeiramente antes de rolar toda a tela do Hero (80% da altura da janela)
        const opacity = Math.max(0, 1 - (scrollPos / (windowHeight * 0.8)));

        if (heroBg) {
            heroBg.style.opacity = opacity;
        }
    });

    /* ==========================================================================
       2. CABEÇALHO - ESTILO AO ROLAR (STICKY GLASS EFFECT)
       ========================================================================== */
    const header = document.querySelector('.main-header');

    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Executar uma vez no carregamento para caso já esteja com scroll

    /* ==========================================================================
       3. MENU MOBILE TOGGLE
       ========================================================================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar o menu ao clicar em qualquer link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ==========================================================================
       4. ANIMAÇÕES AO ROLAR A PÁGINA (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe que ativa a transição CSS
                entry.target.classList.add('revealed');
                // Deixa de observar para manter o elemento fixado no estado final
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12, // Elemento precisa estar 12% visível na tela
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       5. MODAL DE CÉLULAS (ABRIR, SELECIONAR E FECHAR)
       ========================================================================== */
    const findCellBtn = document.getElementById('findCellBtn');
    const cellModal = document.getElementById('cellModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalOptionCards = document.querySelectorAll('.modal-option-card');

    const openModal = () => {
        if (cellModal) {
            cellModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Impede o scroll de fundo
        }
    };

    const closeModal = () => {
        if (cellModal) {
            cellModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restaura o scroll
        }
    };

    if (findCellBtn) {
        findCellBtn.addEventListener('click', openModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Fechar ao clicar fora do modal
    window.addEventListener('click', (e) => {
        if (e.target === cellModal) {
            closeModal();
        }
    });

    // Simulação ao clicar em um card de opção de célula no modal
    modalOptionCards.forEach(card => {
        card.addEventListener('click', () => {
            const cellType = card.querySelector('h5').textContent;
            alert(`Você escolheu: ${cellType}. Entraremos em contato via e-mail para conectar você ao líder deste grupo!`);
            closeModal();
        });
    });

    const carousel = document.getElementById("verseCarousel");
    const track = carousel.querySelector(".verse-track");
    const slides = [...carousel.querySelectorAll(".verse-slide")];

    let current = 0;
    let startX = 0;
    let endX = 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${current * 100}%)`;

        slides.forEach(slide =>
            slide.classList.remove("active")
        );

        slides[current].classList.add("active");

        carousel.style.background =
            slides[current].dataset.bg;
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        current =
            (current - 1 + slides.length) % slides.length;

        updateCarousel();
    }

    /* Swipe Mobile */

    carousel.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", e => {
        endX = e.changedTouches[0].clientX;

        const distance = startX - endX;

        if (distance > 50) nextSlide();
        if (distance < -50) prevSlide();
    });

    /* Auto play opcional */

    setInterval(nextSlide, 7000);

    updateCarousel();

    /* ==========================================================================
       7. DOAÇÕES - CALCULADORA DE DOAÇÕES & COPIAR CHAVE PIX
       ========================================================================== */
    const copyPixBtn = document.getElementById('copyPixBtn');
    const pixKeyText = document.getElementById('pixKey').textContent;
    const copyToast = document.getElementById('copyToast');

    // Copiar chave Pix
    if (copyPixBtn && copyToast) {
        copyPixBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(pixKeyText).then(() => {
                // Ativar o toast de sucesso
                copyToast.classList.add('active');

                // Mudar texto do botão temporariamente
                const copyBtnText = copyPixBtn.querySelector('.copy-text');
                copyBtnText.textContent = 'Copiado!';

                // Resetar após 3 segundos
                setTimeout(() => {
                    copyToast.classList.remove('active');
                    copyBtnText.textContent = 'Copiar';
                }, 3000);
            }).catch(err => {
                console.error('Falha ao copiar Pix: ', err);
            });
        });
    }

    // Seletor de Valores da Calculadora
    const valueButtons = document.querySelectorAll('.value-btn');
    const customValueInput = document.getElementById('customValue');
    const donateBtn = document.getElementById('donateBtn');

    valueButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover ativo de todos
            valueButtons.forEach(b => b.classList.remove('active'));

            // Adicionar ao clicado
            btn.classList.add('active');

            // Limpar campo de valor customizado
            if (customValueInput) {
                customValueInput.value = '';
            }
        });
    });

    if (customValueInput) {
        customValueInput.addEventListener('input', () => {
            // Se o usuário digitar algo, limpa a seleção dos botões padrão
            if (customValueInput.value.length > 0) {
                valueButtons.forEach(b => b.classList.remove('active'));
            }
        });
    }

    // Botão de Contribuir
    if (donateBtn) {
        donateBtn.addEventListener('click', () => {
            let finalValue = 0;
            const activeBtn = document.querySelector('.value-btn.active');

            if (activeBtn) {
                finalValue = activeBtn.dataset.value;
            } else if (customValueInput && customValueInput.value) {
                finalValue = customValueInput.value;
            }

            if (finalValue > 0) {
                alert(`Obrigado pela sua intenção de doar R$ ${finalValue}! Use a chave Pix acima (copiando-a) no aplicativo do seu banco para consolidar sua oferta.`);
            } else {
                alert('Por favor, selecione ou insira um valor para realizar a contribuição.');
            }
        });
    }
});
