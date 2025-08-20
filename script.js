// Word bank for Just One game
const WORD_BANK = [
    // Animals
    "elephant", "penguin", "giraffe", "dolphin", "butterfly", "octopus", "kangaroo", "flamingo",
    "hedgehog", "peacock", "chameleon", "rhinoceros", "koala", "platypus", "seahorse", "jellyfish",
    
    // Objects
    "umbrella", "telescope", "scissors", "toothbrush", "sandwich", "bicycle", "keyboard", "pillow",
    "doorknob", "shoelace", "paperclip", "sunglasses", "calculator", "backpack", "refrigerator", "microwave",
    
    // Actions
    "dancing", "swimming", "cooking", "painting", "singing", "jumping", "running", "climbing",
    "laughing", "sleeping", "reading", "writing", "driving", "flying", "sailing", "gardening",
    
    // Places
    "library", "hospital", "airport", "museum", "restaurant", "playground", "lighthouse", "castle",
    "desert", "jungle", "mountain", "beach", "forest", "city", "village", "island",
    
    // Foods
    "pizza", "chocolate", "banana", "spaghetti", "hamburger", "cookies", "pancakes", "ice cream",
    "popcorn", "watermelon", "cheese", "bread", "soup", "salad", "sandwich", "milkshake",
    
    // Abstract concepts
    "happiness", "friendship", "adventure", "mystery", "imagination", "courage", "wisdom", "freedom",
    "creativity", "patience", "kindness", "honesty", "curiosity", "determination", "enthusiasm", "serenity",
    
    // Professions
    "teacher", "doctor", "firefighter", "chef", "artist", "musician", "pilot", "scientist",
    "detective", "photographer", "architect", "mechanic", "lawyer", "nurse", "engineer", "journalist",
    
    // Weather/Nature
    "rainbow", "lightning", "snowflake", "hurricane", "tornado", "sunrise", "sunset", "storm",
    "breeze", "drizzle", "thunder", "cloudy", "foggy", "windy", "sunny", "frosty"
];

// DOM elements
const screens = {
    home: document.getElementById('home-screen'),
    countdown: document.getElementById('countdown-screen'),
    word: document.getElementById('word-screen'),
    clueInput: document.getElementById('clue-input-screen'),
    clueDisplay: document.getElementById('clue-display-screen')
};

const elements = {
    getWordBtn: document.getElementById('get-word-btn'),
    giveClueBtn: document.getElementById('give-clue-btn'),
    countdownNumber: document.getElementById('countdown-number'),
    randomWord: document.getElementById('random-word'),
    clueInput: document.getElementById('clue-input'),
    showClueBtn: document.getElementById('show-clue-btn'),
    clueText: document.getElementById('clue-text'),
    backFromWord: document.getElementById('back-from-word'),
    backFromInput: document.getElementById('back-from-input'),
    backFromClue: document.getElementById('back-from-clue')
};

// Screen management
function showScreen(screenName) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    screens[screenName].classList.add('active');
}

// Get random word from word bank
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * WORD_BANK.length);
    return WORD_BANK[randomIndex].toUpperCase();
}

// Countdown functionality
function startCountdown() {
    showScreen('countdown');
    let count = 3;
    
    elements.countdownNumber.style.animation = 'none';
    elements.countdownNumber.offsetHeight; // Trigger reflow
    
    const countdownInterval = setInterval(() => {
        elements.countdownNumber.textContent = count;
        elements.countdownNumber.style.animation = 'pulse 1s ease-in-out';
        
        count--;
        
        if (count < 0) {
            clearInterval(countdownInterval);
            showRandomWord();
        }
    }, 1000);
}

// Show random word
function showRandomWord() {
    const word = getRandomWord();
    elements.randomWord.textContent = word;
    showScreen('word');
}

// Show clue input screen
function showClueInput() {
    elements.clueInput.value = '';
    showScreen('clueInput');
    // Focus on input after screen transition
    setTimeout(() => {
        elements.clueInput.focus();
    }, 300);
}

// Show clue display
function showClue() {
    const clueValue = elements.clueInput.value.trim();
    
    if (!clueValue) {
        alert('Please enter a clue first!');
        return;
    }
    
    // Validate single word (no spaces)
    if (clueValue.includes(' ')) {
        alert('Please enter only a single word!');
        return;
    }
    
    elements.clueText.textContent = clueValue.toUpperCase();
    showScreen('clueDisplay');
}

// Event listeners
elements.getWordBtn.addEventListener('click', startCountdown);
elements.giveClueBtn.addEventListener('click', showClueInput);
elements.showClueBtn.addEventListener('click', showClue);

// Back button event listeners
elements.backFromWord.addEventListener('click', () => showScreen('home'));
elements.backFromInput.addEventListener('click', () => showScreen('home'));
elements.backFromClue.addEventListener('click', () => showScreen('home'));

// Enter key handling for clue input
elements.clueInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        showClue();
    }
});

// Prevent spaces in clue input for real-time validation
elements.clueInput.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value.includes(' ')) {
        e.target.value = value.replace(/\s/g, '');
    }
});

// Mobile browser optimization
function optimizeForMobile() {
    // Hide address bar on mobile
    if (window.navigator.standalone !== true) {
        setTimeout(() => {
            window.scrollTo(0, 1);
        }, 100);
    }
    
    // Handle viewport changes (address bar hide/show)
    const handleViewportChange = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', () => {
        setTimeout(handleViewportChange, 100);
    });
    
    handleViewportChange();
}

// Prevent zoom on double tap
document.addEventListener('touchend', (e) => {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

let lastTouchEnd = 0;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    optimizeForMobile();
    showScreen('home');
});
