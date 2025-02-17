class NumberGuessingGame {
    constructor() {
        this.minNumber = 1;
        this.maxNumber = 100;
        this.maxAttempts = Math.ceil(Math.log2(this.maxNumber - this.minNumber + 1));
        this.attemptsLeft = 7; // Фиксированное количество жизней
        this.targetNumber = null;
        
        this.guessInput = document.getElementById('guessInput');
        this.message = document.getElementById('message');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.hearts = document.querySelectorAll('.heart');
        
        this.initializeGame();
        this.setupEventListeners();
    }
    
    initializeGame() {
        this.targetNumber = Math.floor(Math.random() * (this.maxNumber - this.minNumber + 1)) + this.minNumber;
        this.attemptsLeft = 7;
        this.guessInput.value = '';
        this.guessInput.disabled = false;
        this.message.textContent = '';
        this.message.className = 'message mb-3';
        this.newGameBtn.style.display = 'none';
        this.updateHearts();
        this.guessInput.focus();
    }
    
    updateHearts() {
        this.hearts.forEach((heart, index) => {
            heart.style.opacity = index < this.attemptsLeft ? '1' : '0.2';
        });
    }
    
    checkGuess(guess) {
        if (guess === this.targetNumber) {
            this.message.textContent = 'Поздравляем! Вы угадали число!';
            this.message.className = 'message mb-3 success';
            this.endGame();
        } else {
            this.attemptsLeft--;
            this.updateHearts();
            
            if (this.attemptsLeft === 0) {
                this.message.textContent = `Игра окончена. Загаданное число было: ${this.targetNumber}`;
                this.message.className = 'message mb-3 error';
                this.endGame();
            } else {
                this.message.textContent = guess < this.targetNumber ? 
                    'Загаданное число больше' : 'Загаданное число меньше';
                this.message.className = 'message mb-3';
            }
        }
    }
    
    endGame() {
        this.guessInput.disabled = true;
        this.newGameBtn.style.display = 'block';
    }
    
    setupEventListeners() {
        this.guessInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const guess = parseInt(this.guessInput.value);
                if (guess >= this.minNumber && guess <= this.maxNumber) {
                    this.checkGuess(guess);
                    this.guessInput.value = '';
                }
            }
        });
        
        this.newGameBtn.addEventListener('click', () => {
            this.initializeGame();
        });
    }
}

// Инициализация игры
document.addEventListener('DOMContentLoaded', () => {
    new NumberGuessingGame();
}); 