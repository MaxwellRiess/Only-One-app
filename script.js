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
    
    // Debug font size
    setTimeout(() => {
        const computedStyle = window.getComputedStyle(elements.randomWord);
        const vw25 = (window.innerWidth * 0.25);
        const vh25 = (window.innerHeight * 0.25);
        console.log('Word font size:', computedStyle.fontSize);
        console.log('Viewport width:', window.innerWidth);
        console.log('Viewport height:', window.innerHeight);
        console.log('25vw would be:', vw25 + 'px');
        console.log('25vh would be:', vh25 + 'px');
        console.log('10rem should be:', '160px (if 1rem = 16px)');
    }, 100);
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

// Fullscreen functionality
function isFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
}

function isFullscreenSupported() {
    return !!(document.documentElement.requestFullscreen || 
              document.documentElement.webkitRequestFullscreen || 
              document.documentElement.msRequestFullscreen);
}

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function updateFullscreenButton() {
    const btn = document.getElementById('fullscreen-btn');
    
    // Check if fullscreen is supported
    if (!isFullscreenSupported()) {
        if (isMobile()) {
            btn.textContent = '📱 Add to Home Screen';
            btn.setAttribute('aria-label', 'Add to home screen for fullscreen experience');
            btn.title = 'For fullscreen mode: Add this page to your home screen';
        } else {
            btn.style.display = 'none'; // Hide on unsupported desktop browsers
        }
        return;
    }
    
    // Normal fullscreen toggle
    if (isFullscreen()) {
        btn.textContent = '🚪 Exit Fullscreen';
        btn.setAttribute('aria-label', 'Exit fullscreen mode');
    } else {
        btn.textContent = '📱 Fullscreen Mode';
        btn.setAttribute('aria-label', 'Enter fullscreen mode');
    }
}

function toggleFullscreen() {
    // Check if fullscreen is supported
    if (!isFullscreenSupported()) {
        if (isMobile()) {
            showMobileFullscreenInstructions();
        }
        return;
    }
    
    if (isFullscreen()) {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen().catch(() => {});
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen().catch(() => {});
        }
    } else {
        // Enter fullscreen
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(() => {});
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen().catch(() => {});
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen().catch(() => {});
        }
    }
}

function showMobileFullscreenInstructions() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    let instructions = "For the best fullscreen experience:\n\n";
    
    if (isIOS) {
        instructions += "📱 iOS Safari:\n";
        instructions += "1. Tap the Share button (⬆️)\n";
        instructions += "2. Select 'Add to Home Screen'\n";
        instructions += "3. Open the app from your home screen\n\n";
        instructions += "Or rotate to landscape mode for a better view.";
    } else if (isAndroid) {
        instructions += "📱 Android Chrome:\n";
        instructions += "1. Tap the menu (⋮)\n";
        instructions += "2. Select 'Add to Home screen'\n";
        instructions += "3. Open the app from your home screen\n\n";
        instructions += "Or try rotating to landscape mode.";
    } else {
        instructions += "📱 Mobile Browser:\n";
        instructions += "1. Add this page to your home screen\n";
        instructions += "2. Open from home screen for fullscreen mode\n\n";
        instructions += "Or rotate to landscape for better viewing.";
    }
    
    alert(instructions);
}

// Event listeners
elements.getWordBtn.addEventListener('click', startCountdown);
elements.giveClueBtn.addEventListener('click', showClueInput);
elements.showClueBtn.addEventListener('click', showClue);

// Fullscreen button
document.getElementById('fullscreen-btn').addEventListener('click', toggleFullscreen);

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
    // More aggressive address bar hiding
    const hideAddressBar = () => {
        if (window.navigator.standalone !== true) {
            // Multiple attempts to hide address bar
            setTimeout(() => window.scrollTo(0, 1), 0);
            setTimeout(() => window.scrollTo(0, 1), 100);
            setTimeout(() => window.scrollTo(0, 1), 500);
            setTimeout(() => window.scrollTo(0, 1), 1000);
        }
    };
    
    // Handle viewport changes (address bar hide/show)
    const handleViewportChange = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Force address bar to hide when viewport changes
        hideAddressBar();
    };
    
    // Note: Fullscreen is now controlled by the toggle button
    
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', () => {
        setTimeout(handleViewportChange, 100);
        setTimeout(hideAddressBar, 200);
    });
    
    // Initial setup
    handleViewportChange();
    hideAddressBar();
    
    // Hide address bar when scrolling stops
    let scrollTimer;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(hideAddressBar, 150);
    });
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

// Fullscreen event listeners
document.addEventListener('fullscreenchange', updateFullscreenButton);
document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
document.addEventListener('msfullscreenchange', updateFullscreenButton);

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    optimizeForMobile();
    showScreen('home');
    // Set initial button state
    updateFullscreenButton();
});
