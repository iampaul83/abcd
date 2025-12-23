const wordInput = document.getElementById('word-input');
const showButton = document.getElementById('show-button');
const imageFrame = document.getElementById('image-frame');
const status = document.getElementById('status');
const typedWord = document.getElementById('typed-word');

const imageMap = {
  apple: { src: 'images/apple.svg', label: 'Apple 蘋果' },
  banana: { src: 'images/banana.svg', label: 'Banana 香蕉' },
  cat: { src: 'images/cat.svg', label: 'Cat 貓咪' },
  dog: { src: 'images/dog.svg', label: 'Dog 小狗' },
  car: { src: 'images/car.svg', label: 'Car 小汽車' },
  sun: { src: 'images/sun.svg', label: 'Sun 太陽' },
};

function renderImage(word) {
  const match = imageMap[word];

  imageFrame.innerHTML = '';

  if (!match) {
    imageFrame.setAttribute('aria-label', '沒有找到圖片');
    status.textContent = '找不到這個單字，請換一個試試！';
    status.style.color = '#d32f2f';
    return;
  }

  const img = document.createElement('img');
  img.src = match.src;
  img.alt = match.label;
  imageFrame.setAttribute('aria-label', match.label);
  imageFrame.appendChild(img);

  status.textContent = `你輸入了：${word}`;
  status.style.color = '#2e2e2e';
}

function handleShow() {
  const word = wordInput.value.trim().toLowerCase();
  if (!word) {
    status.textContent = '先輸入一個單字吧！';
    status.style.color = '#d32f2f';
    wordInput.focus();
    return;
  }
  renderImage(word);
}

function syncTypedWord() {
  const value = wordInput.value.trim();
  typedWord.textContent = value || '（尚未輸入）';
}

function focusHiddenInput() {
  wordInput.focus({ preventScroll: true });
}

showButton.addEventListener('click', handleShow);

wordInput.addEventListener('input', syncTypedWord);

wordInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleShow();
  }
});

document.addEventListener('click', focusHiddenInput);
document.addEventListener('keydown', (event) => {
  const isTypingKey = event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

  if (document.activeElement !== wordInput) {
    focusHiddenInput();
    if (isTypingKey) {
      wordInput.value += event.key;
      syncTypedWord();
      event.preventDefault();
    }
    if (event.key === 'Enter') {
      handleShow();
    }
  }
});

focusHiddenInput();
