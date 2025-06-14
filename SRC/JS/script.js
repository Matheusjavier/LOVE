document.addEventListener('DOMContentLoaded', () => {
    console.log('Script iniciado: DOMContentLoaded.'); // Log 1

    const revealButton = document.getElementById('revealButton');
    const hiddenMessage = document.getElementById('hiddenMessage');
    const body = document.body;
    const heartBackground = document.querySelector('.heart-background');

    if (revealButton) {
        console.log('Botão revealButton encontrado.'); // Log 2
    } else {
        console.error('ERRO: Botão revealButton NÃO encontrado! Verifique o ID no HTML.'); // Erro 1
    }

    // Função para criar um único coração flutuante
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 5 + 8}s`;
        heart.style.width = `${Math.random() * 10 + 10}px`;
        heart.style.height = heart.style.width;
        heart.style.opacity = Math.random() * 0.5 + 0.15;
        heart.style.transform = `rotate(-45deg) scale(${Math.random() * 0.5 + 0.5})`;

        const circle1 = document.createElement('div');
        circle1.style.position = 'absolute';
        circle1.style.width = '100%';
        circle1.style.height = '100%';
        circle1.style.backgroundColor = 'inherit';
        circle1.style.borderRadius = '50%';
        circle1.style.top = '-50%';
        circle1.style.left = '0';

        const circle2 = document.createElement('div');
        circle2.style.position = 'absolute';
        circle2.style.width = '100%';
        circle2.style.height = '100%';
        circle2.style.backgroundColor = 'inherit';
        circle2.style.borderRadius = '50%';
        circle2.style.top = '0';
        circle2.style.left = '50%';

        heart.appendChild(circle1);
        heart.appendChild(circle2);
        
        if (heartBackground) {
            heartBackground.appendChild(heart);
        } else {
            console.warn('AVISO: Elemento .heart-background não encontrado para corações flutuantes.');
            document.body.appendChild(heart);
        }

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Gerar corações flutuantes a cada X milissegundos
    setInterval(createFloatingHeart, 1500);
    console.log('Intervalo para corações flutuantes iniciado.'); // Log 3

    // Efeito de "chuva de corações" ao carregar a página
    function burstHearts(numHearts = 50) {
        console.log(`Função burstHearts chamada com ${numHearts} corações.`); // Log 4
        for (let i = 0; i < numHearts; i++) {
            const heart = document.createElement('div');
            heart.classList.add('burst-heart');
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.top = `${Math.random() * 100}vh`;
            heart.style.width = `${Math.random() * 15 + 5}px`;
            heart.style.height = heart.style.width;
            heart.style.opacity = Math.random() * 0.8 + 0.2;
            heart.style.animation = `burstHeart ${Math.random() * 1 + 1}s ease-out forwards`;
            heart.style.backgroundColor = `rgba(255, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${heart.style.opacity})`;

            const circle1 = document.createElement('div');
            circle1.style.position = 'absolute';
            circle1.style.width = '100%';
            circle1.style.height = '100%';
            circle1.style.backgroundColor = 'inherit';
            circle1.style.borderRadius = '50%';
            circle1.style.top = '-50%';
            circle1.style.left = '0';

            const circle2 = document.createElement('div');
            circle2.style.position = 'absolute';
            circle2.style.width = '100%';
            circle2.style.height = '100%';
            circle2.style.backgroundColor = 'inherit';
            circle2.style.borderRadius = '50%';
            circle2.style.top = '0';
            circle2.style.left = '50%';

            heart.appendChild(circle1);
            heart.appendChild(circle2);
            body.appendChild(heart);

            heart.addEventListener('animationend', () => {
                heart.remove();
            });
        }
    }

    // Chama a chuva de corações ao carregar a página
    burstHearts(100);
    console.log('Chuva de corações inicial acionada.'); // Log 5

    // CSS para a animação da explosão de corações (injetado via JS para variáveis CSS)
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes burstHeart {
            0% {
                transform: translate(0, 0) scale(0) rotate(0deg);
                opacity: 0;
            }
            20% {
                opacity: 1;
                transform: translate(calc(var(--rand-x) * 1px), calc(var(--rand-y) * 1px)) scale(1) rotate(calc(var(--rand-rot) * 1deg));
            }
            100% {
                transform: translate(calc(var(--rand-x) * 3px), calc(var(--rand-y) * 3px)) scale(0.5) rotate(calc(var(--rand-rot) * 2deg));
                opacity: 0;
            }
        }
        .burst-heart {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transform: rotate(-45deg);
        }

        /* Estilos para o Pop-up de Amor (INJETADO VIA JS) */
        .love-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(255, 105, 180, 0.95);
            color: white;
            padding: 30px 40px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
            font-family: 'Dancing Script', cursive;
            font-size: 2.5em;
            text-align: center;
            z-index: 99999 !important; /* Valor alto e !important */
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
            max-width: 90%;
            box-sizing: border-box;
            cursor: pointer;
        }

        .love-popup.show {
            opacity: 1 !important; /* Garante visibilidade forçada */
            visibility: visible !important; /* Garante visibilidade forçada */
        }

        .love-popup p {
            margin: 0;
            text-shadow: 2px 2px 5px rgba(0,0,0,0.4);
        }

        .love-popup .heart-emoji {
            font-size: 1.2em;
            color: #ff0062;
            animation: pulseHeartEmoji 1s infinite alternate;
        }

        @keyframes pulseHeartEmoji {
            0% { transform: scale(1); }
            100% { transform: scale(1.15); }
        }

        /* Media Query para o Pop-up em telas menores (INJETADO VIA JS) */
        @media (max-width: 768px) {
            .love-popup {
                font-size: 2em;
                padding: 25px 30px;
            }
        }

        @media (max-width: 480px) {
            .love-popup {
                font-size: 1.6em;
                padding: 20px 25px;
            }
        }
    `;
    document.head.appendChild(styleSheet);
    console.log('Estilos CSS injetados via JavaScript.'); // Log 6

    // Criar o elemento do pop-up dinamicamente
    const lovePopup = document.createElement('div');
    lovePopup.id = 'lovePopup';
    lovePopup.classList.add('love-popup', 'hidden');
    lovePopup.innerHTML = '<p>EU TE AMO MUITO <span class="heart-emoji">❤️</span></p>';
    
    console.log('Pop-up de amor criado.'); // Log 7 (antes de adicionar ao DOM)

    // Evento do botão para revelar a mensagem oculta E mostrar o pop-up
    if (revealButton) {
        revealButton.addEventListener('click', () => {
            console.log('Botão de revelação clicado!'); // Log 8

            if (hiddenMessage.classList.contains('hidden')) {
                hiddenMessage.classList.remove('hidden');
                revealButton.textContent = 'EU TE AMOOO! ❤️';
                burstHearts(50);
                console.log('Mensagem oculta revelada e burstHearts acionado.'); // Log 9

                // Adicionar o pop-up ao DOM aqui para garantir que ele seja o último elemento filho do body
                // quando o botão é clicado, forçando sua sobreposição.
                body.appendChild(lovePopup); 
                console.log('Pop-up de amor adicionado/movido para o final do BODY no DOM.');


                // Mostrar o pop-up
                lovePopup.classList.add('show');
                console.log('Pop-up de amor exibido. Z-Index LOVE POPUP:', getComputedStyle(lovePopup).zIndex); // Log 10, adicionado z-index do pop-up

                // Fazer o botão desaparecer suavemente
                revealButton.style.opacity = '0';
                revealButton.style.transition = 'opacity 0.5s ease-out';
                setTimeout(() => {
                    revealButton.style.display = 'none'; // Esconde completamente após a transição
                    revealButton.remove(); // Remove o botão do DOM (opcional, mas limpa)
                    console.log('Botão de revelação removido.');
                }, 500); // Tempo da transição

                // Esconder o pop-up automaticamente após 10 segundos (para debug)
                setTimeout(() => {
                    lovePopup.classList.remove('show');
                    console.log('Pop-up de amor escondido automaticamente.'); // Log 11
                }, 10000); 
                
            } else {
                console.log('Botão clicado, mensagem já visível. Sem ação para o botão.'); // Log 12
                // Se a mensagem já estiver visível e o pop-up já estiver mostrando,
                // um clique subsequente no botão pode fechar o pop-up.
                if (lovePopup.classList.contains('show')) {
                    lovePopup.classList.remove('show');
                    console.log('Pop-up de amor escondido por clique no botão.'); // Log 13
                }
            }
        });
    }

    // Adicionar evento para fechar o pop-up ao clicar nele
    if (lovePopup) {
        lovePopup.addEventListener('click', () => {
            lovePopup.classList.remove('show');
            console.log('Pop-up de amor escondido por clique direto.'); // Log 14
        });
    }


    // Animação da mensagem principal letra por letra
    const mainMessage = document.getElementById('main-message');
    if (mainMessage) {
        console.log('Elemento main-message encontrado.'); // Log 15
        const originalText = mainMessage.textContent;
        mainMessage.textContent = '';
        let charIndex = 0;

        function typeWriter() {
            if (charIndex < originalText.length) {
                mainMessage.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    } else {
        console.warn('AVISO: Elemento main-message NÃO encontrado! Animação typeWriter desativada.');
    }


    // Função para o contador dinâmico
    function setupLoveCounter() {
        console.log('Configurando contador de amor.'); // Log 16
        const startDate = new Date('2021-07-31T00:00:00'); 
        const daysSpan = document.getElementById('days');
        const hoursSpan = document.getElementById('hours');
        const minutesSpan = document.getElementById('minutes');
        const secondsSpan = document.getElementById('seconds');

        if (!daysSpan || !hoursSpan || !minutesSpan || !secondsSpan) {
            console.error('ERRO: Um ou mais elementos do contador (days, hours, minutes, seconds) NÃO foram encontrados.');
            return;
        }

        function updateCounter() {
            const now = new Date();
            const difference = now.getTime() - startDate.getTime();

            const totalSeconds = Math.floor(difference / 1000);
            const days = Math.floor(totalSeconds / (3600 * 24));
            const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = Math.floor(totalSeconds % 60);

            daysSpan.textContent = String(days).padStart(2, '0');
            hoursSpan.textContent = String(hours).padStart(2, '0');
            minutesSpan.textContent = String(minutes).padStart(2, '0');
            secondsSpan.textContent = String(seconds).padStart(2, '0');
        }

        setInterval(updateCounter, 1000);
        updateCounter();
        console.log('Contador de amor iniciado.'); // Log 17
    }

    setupLoveCounter();
});