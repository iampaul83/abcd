const imageFrame = document.getElementById('image-frame');
const status = document.getElementById('status');
const wordGrid = document.getElementById('word-grid');
const typedBubble = document.getElementById('typed-bubble');
const wordCount = document.getElementById('word-count');
const hiddenInput = document.getElementById('hidden-input');

const imageMap = {
  apple: { src: 'images/apple.svg', label: 'Apple 蘋果', hint: '水果' },
  banana: { src: 'images/banana.svg', label: 'Banana 香蕉', hint: '水果' },
  cat: { src: 'images/cat.svg', label: 'Cat 貓咪', hint: '動物' },
  dog: { src: 'images/dog.svg', label: 'Dog 小狗', hint: '動物' },
  car: { src: 'images/car.svg', label: 'Car 小汽車', hint: '交通' },
  sun: { src: 'images/sun.svg', label: 'Sun 太陽', hint: '自然' },
};

let currentQuery = '';

function setStatus(message, type = '') {
  status.textContent = message;
  status.classList.remove('positive', 'negative');
  if (type) status.classList.add(type);
}

function renderWordGrid(filter = '') {
  const keywords = Object.keys(imageMap);
  const filtered = filter
    ? keywords.filter((word) => word.includes(filter))
    : keywords;

  wordGrid.innerHTML = '';

  filtered.forEach((word) => {
    const card = document.createElement('div');
    card.className = `word-card${filter && word.startsWith(filter) ? ' highlight' : ''}`;
    card.setAttribute('role', 'listitem');
    card.innerHTML = `${word}<span>${imageMap[word].hint}</span>`;
    wordGrid.appendChild(card);
  });

  wordCount.textContent = `${filtered.length} / ${keywords.length}`;
}

function updateTypedBubble() {
  typedBubble.textContent = currentQuery || '開始打字吧！';
  typedBubble.classList.toggle('empty', currentQuery.length === 0);
  typedBubble.setAttribute('aria-label', currentQuery || '尚未輸入');
}

function renderImage(word) {
  const match = imageMap[word];
  imageFrame.innerHTML = '';

  if (!match) {
    imageFrame.setAttribute('aria-label', '沒有找到圖片');
    setStatus('找不到這個單字，請再試一次！', 'negative');
    return false;
  }

  const img = document.createElement('img');
  img.src = match.src;
  img.alt = match.label;
  imageFrame.setAttribute('aria-label', match.label);
  imageFrame.appendChild(img);
  setStatus(`你輸入了：${word}`, 'positive');
  return true;
}

function handleEnter() {
  if (!currentQuery) {
    setStatus('先輸入一些字母吧！', 'negative');
    return;
  }
  renderImage(currentQuery.toLowerCase());
}

function handleKeydown(event) {
  const { key } = event;

  if (key === 'Enter') {
    event.preventDefault();
    handleEnter();
    return;
  }

  if (key === 'Backspace') {
    currentQuery = currentQuery.slice(0, -1);
  } else if (key === 'Escape') {
    currentQuery = '';
    setStatus('輸入已清空，重新開始吧！');
    imageFrame.innerHTML = '';
    imageFrame.setAttribute('aria-label', '');
  } else if (/^[a-zA-Z]$/.test(key)) {
    currentQuery += key.toLowerCase();
  } else {
    return; // ignore other keys
  }

  hiddenInput.value = currentQuery;
  updateTypedBubble();
  renderWordGrid(currentQuery);
}

function handleInputChange() {
  const sanitized = hiddenInput.value.toLowerCase().replace(/[^a-z]/g, '');
  currentQuery = sanitized;
  updateTypedBubble();
  renderWordGrid(currentQuery);
}

function init() {
  renderWordGrid();
  updateTypedBubble();
  setStatus('輸入任何字母開始遊戲！');
  document.addEventListener('keydown', handleKeydown);
  hiddenInput.addEventListener('input', handleInputChange);

  // Keep a hidden input focused for some mobile keyboards while staying invisible.
  hiddenInput.focus();
  hiddenInput.addEventListener('blur', () => hiddenInput.focus());
  document.addEventListener('pointerdown', () => hiddenInput.focus());
}

init();
