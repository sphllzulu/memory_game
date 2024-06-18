
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const letters = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let twin1,twin2;// these are the first and second cards, respectively
    let twins = 0;//we will use this variable to check if all the twins have been matched. It will be used to check if user has won
    

    function cardShuffle() {
        //a random number between 0 & 1 will be generated, then multiplied with (i+1),
        //the result will then be rounded down to the nearest whole number 
        //the letter that was on index 'j' will be exchanged with the letter on index 'i' and vice versa

        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]]; 
        }
    }

    function createCard(letter) {
        const card = document.createElement('div');//creates a div
        card.classList.add('card');//with a classname 'card'

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = letter;//the front part of the card will contain a letter

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.textContent = '?';//the back part of the card will contain a ? symbol

        card.appendChild(cardFront);//these 2 newly created classes will be the children of the card div
        card.appendChild(cardBack);

        card.addEventListener('click', () => {
            flipCard(card);
        });

        return card;
    }

    function flipCard(card) {
        
    //if the card already contains the classname 'overturned' or is a second card has already been flipped, then the function is terminated 
    //when the card is clicked, it will have the classname 'overturned'

        if (card.classList.contains('overturned') || twin2) return;
        card.classList.add('overturned');

        if (!twin1) {// if the first card has not yet been initialized it  will be assigned a card
            twin1 = card;
        } else {
            twin2 = card;//if it has been initialized, its assumed that a card has been overturned, the 2nd card will in turn be initialized with the current card, then the function to check if they match will be executed
            checkMatch();
        }
    }

    function checkMatch() {
        if (twin1.querySelector('.card-front').textContent === twin2.querySelector('.card-front').textContent) {
            twins++;
            twin1 = undefined;//the cards are reset to undefined
            twin2 = undefined;

            if (twins === 8) {
                // the condition is true, an alert is displayed after half a second delay
                setTimeout(() => alert('Congratulations! You won!'), 500);
            }
        } else {
            setTimeout(() => {
                //if the pair are not twins ,the cards are flipped back since the 'overturned' classname will be removed from the cards 
                twin1.classList.remove('overturned');
                twin2.classList.remove('overturned');
                twin1 = null;
                twin2 = null;
            }, 1000);
        }
    }

    function createGameBoard() {
    //in the letters array,each element is stored in the 'letter' variable 
    //defined in the forEach loop, then it is appended to the front of the card
        cardShuffle();
        letters.forEach(letter => {
            const card = createCard(letter);
            canvas.appendChild(card);
        });
    }

    createGameBoard();
});
