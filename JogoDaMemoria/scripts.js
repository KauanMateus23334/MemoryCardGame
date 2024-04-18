document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('card-container');
    const images = [
        'image1.jpg',
        'image2.jpg',
        'image3.jpg',
        'image4.jpg',
        'image5.jpg',
        'image6.jpg',
        'image7.jpg',
        'image8.jpg'
    ];

    let flippedCards = [];
    let matchedCards = [];

    // Inicializa o jogo
    function initGame() {
        const shuffledImages = [...images, ...images].sort(() => Math.random() - 0.5);

        shuffledImages.forEach((image, index) => {
            const card = createCardElement(image);
            card.addEventListener('click', () => flipCard(card));
            cardsContainer.appendChild(card);
        });
    }

    // Cria um elemento de carta com a imagem especificada
    function createCardElement(image) {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.style.backgroundImage = `url('images/${image}')`;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        return card;
    }

    // Função para virar uma carta
    function flipCard(card) {
        if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    // Função para verificar se as cartas viradas combinam
    function checkMatch() {
        const [card1, card2] = flippedCards;
        const image1 = card1.querySelector('.card-back').style.backgroundImage;
        const image2 = card2.querySelector('.card-back').style.backgroundImage;

        if (image1 === image2) {
            matchedCards.push(card1, card2);
            checkWin();
        } else {
            flippedCards.forEach(card => card.classList.remove('flipped'));
        }

        flippedCards = [];
    }

    // Função para verificar se o jogador venceu o jogo
    function checkWin() {
        if (matchedCards.length === images.length * 2) {
            alert('Parabéns! Você venceu o jogo!');
        }
    }

    // Inicia o jogo quando a página é carregada
    initGame();
});