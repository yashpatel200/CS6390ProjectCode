// VARIABLES
let words: string[] = ['magic', 'journey', 'travel', 'explore', 'life',
  'experience', 'happiness', 'gratitude', 'discipline', 'exercise',
  'workout', 'friendship', 'practice', 'routine', 'morning', 'reading',
  'books', 'education', 'amour', 'delibrate', 'protein', 'partner',
  'empathy', 'concert', 'patience', 'humor', 'resilience', 'confidence',
  'consistency', 'appreciation', 'literature', 'meaning', 'humble',
  'province', 'flight', 'alchemy', 'intense', 'adorable', 'swoon', 'stunning',
  'sensational', 'provocative', 'apocalypse', 'compliance', 'meticulous',
  'replicate', 'relentless', 'pursuit', 'proactive', 'astounding',
  'delightful', 'legitimate', 'mesmerizing', 'polarizing', 'validate'];

const levels: { [key: string]: number } = {
  easy: 5,
  medium: 3,
  hard: 2
};
let currentLevel: number = levels.easy;
let timeCount: number = currentLevel + 1, scoreCount: number = 0, isPlaying: boolean, wordDisplayed: string;

let currentWord: HTMLElement | null = document.querySelector('#current-word'),
  inputWord: HTMLInputElement | null = document.querySelector('#input-word'),
  time: HTMLElement | null = document.querySelector('#seconds'),
  timeLeft: HTMLElement | null = document.querySelector('#time-left'),
  score: HTMLElement | null = document.querySelector('#score'),
  message: HTMLElement | null = document.querySelector('#message'),
  difficultyLevel: HTMLSelectElement | null = document.querySelector('#difficulty');

// EVENT LISTENERS
window.addEventListener('load', init);
if (inputWord) inputWord.addEventListener('input', startMatch);
if (difficultyLevel) difficultyLevel.addEventListener('change', changeLevel);

// FUNCTIONS
function init(): void {
  if (time && currentWord) {
    time.textContent = currentLevel.toString();
    showWord();
    // call the countdown function every second
    setInterval(countdown, 1000);
    // checking the game status every 0.1s
    setInterval(checkStatus, 100);
  }
}

function showWord(): void {
  let randomIndex: number = Math.floor(Math.random() * words.length);
  wordDisplayed = words[randomIndex];
  if (currentWord) currentWord.textContent = wordDisplayed;
}

function countdown(): void {
  if (timeCount > 0) {
    timeCount--;
    if (timeLeft) timeLeft.textContent = timeCount.toString();
  } else if (timeCount === 0) {
    isPlaying = false;
  }
}

function checkStatus(): void {
  if (!isPlaying && timeCount === 0 && message) {
    message.textContent = 'Time Up!!';
    scoreCount = 0
    message.className = 'mt-3 text-danger';
  }
}

function startMatch(this: HTMLInputElement): void {
  if (this.value === wordDisplayed) {
    isPlaying = true;
    if (message) {
      message.textContent = 'Correct!!'
      message.className = 'mt-3 text-success'
    }
    this.value = '';
    scoreCount++;
    if (score) score.textContent = scoreCount.toString();
    timeCount = currentLevel + 1; // will reset the clock to start the countdown again
    showWord();
  }
}

function changeLevel(this: HTMLSelectElement): void {
  let level: string | null = this.options[this.selectedIndex].value;
  if (level === 'Medium' || level === 'Hard') {
    if (inputWord && message) {
      inputWord.focus();
      scoreCount = 0;
      message.textContent = '';
      isPlaying = true;
      currentLevel = levels[level.toLowerCase()];
      if (time) time.textContent = currentLevel.toString();
      timeCount = currentLevel + 1;
      startMatch.call(inputWord);
    }
  }
}
