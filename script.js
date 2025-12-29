const imageFrame = document.getElementById('image-frame');
const status = document.getElementById('status');
const wordGrid = document.getElementById('word-grid');

const wordCount = document.getElementById('word-count');
const hiddenInput = document.getElementById('hidden-input');

const imageMap = {
  apple: { src: 'images/apple.svg', label: 'Apple 蘋果' },
  ant: { src: 'images/ant.svg', label: 'Ant 螞蟻' },
  banana: { src: 'images/banana.svg', label: 'Banana 香蕉' },
  bear: { src: 'images/bear.svg', label: 'Bear 熊' },
  cake: { src: 'images/cake.svg', label: 'Cake 蛋糕' },
  cat: { src: 'images/cat.svg', label: 'Cat 貓咪' },
  car: { src: 'images/car.svg', label: 'Car 小汽車' },
  duck: { src: 'images/duck.svg', label: 'Duck 鴨子' },
  dog: { src: 'images/dog.svg', label: 'Dog 小狗' },
  egg: { src: 'images/egg.svg', label: 'Egg 雞蛋' },
  elephant: { src: 'images/elephant.svg', label: 'Elephant 大象' },
  fish: { src: 'images/fish.svg', label: 'Fish 魚' },
  flower: { src: 'images/flower.svg', label: 'Flower 花' },
  giraffe: { src: 'images/giraffe.svg', label: 'Giraffe 長頸鹿' },
  grape: { src: 'images/grape.svg', label: 'Grape 葡萄' },
  hat: { src: 'images/hat.svg', label: 'Hat 帽子' },
  house: { src: 'images/house.svg', label: 'House 房子' },
  'ice cream': { src: 'images/ice-cream.svg', label: 'Ice Cream 冰淇淋' },
  jellyfish: { src: 'images/jellyfish.svg', label: 'Jellyfish 水母' },
  kite: { src: 'images/kite.svg', label: 'Kite 風箏' },
  lion: { src: 'images/lion.svg', label: 'Lion 獅子' },
  leaf: { src: 'images/leaf.svg', label: 'Leaf 樹葉' },
  monkey: { src: 'images/monkey.svg', label: 'Monkey 猴子' },
  moon: { src: 'images/moon.svg', label: 'Moon 月亮' },
  nest: { src: 'images/nest.svg', label: 'Nest 鳥巢' },
  owl: { src: 'images/owl.svg', label: 'Owl 貓頭鷹' },
  orange: { src: 'images/orange.svg', label: 'Orange 柳橙' },
  pig: { src: 'images/pig.svg', label: 'Pig 豬' },
  pizza: { src: 'images/pizza.svg', label: 'Pizza 披薩' },
  queen: { src: 'images/queen.svg', label: 'Queen 皇后' },
  rabbit: { src: 'images/rabbit.svg', label: 'Rabbit 兔子' },
  rainbow: { src: 'images/rainbow.svg', label: 'Rainbow 彩虹' },
  sun: { src: 'images/sun.svg', label: 'Sun 太陽' },
  star: { src: 'images/star.svg', label: 'Star 星星' },
  tree: { src: 'images/tree.svg', label: 'Tree 樹' },
  turtle: { src: 'images/turtle.svg', label: 'Turtle 烏龜' },
  umbrella: { src: 'images/umbrella.svg', label: 'Umbrella 雨傘' },
  van: { src: 'images/van.svg', label: 'Van 貨車' },
  whale: { src: 'images/whale.svg', label: 'Whale 鯨魚' },
  watermelon: { src: 'images/watermelon.svg', label: 'Watermelon 西瓜' },
  xylophone: { src: 'images/xylophone.svg', label: 'Xylophone 木琴' },
  yoyo: { src: 'images/yoyo.svg', label: 'Yoyo 溜溜球' },
  zebra: { src: 'images/zebra.svg', label: 'Zebra 斑馬' }
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
    ? keywords.filter((word) => word.startsWith(filter))
    : keywords;

  wordGrid.innerHTML = '';

  filtered.forEach((word) => {
    const card = document.createElement('div');
    card.className = `word-card${filter && word.startsWith(filter) ? ' highlight' : ''}`;
    card.setAttribute('role', 'listitem');

    if (filter && word.startsWith(filter)) {
      const match = word.slice(0, filter.length);
      const rest = word.slice(filter.length);
      card.innerHTML = `<div><b class="matched-letter">${match}</b>${rest}</div>`;
    } else {
      card.innerHTML = `<div>${word}</div>`;
    }

    wordGrid.appendChild(card);
  });

  wordCount.textContent = `${filtered.length} / ${keywords.length}`;
}



function renderImage(word) {
  // Normalize input: lowercase and trim
  let normalizedWord = word.toLowerCase();

  // Handle 'ice-cream' vs 'ice cream'
  if (normalizedWord === 'ice-cream') normalizedWord = 'ice cream';

  const match = imageMap[normalizedWord];

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
    status.textContent = '先輸入一個單字吧！';
    status.classList.add('negative');
    return;
  }
  renderImage(currentQuery);
}

function handleKeydown(event) {
  const { key } = event;

  if (key === 'Enter') {
    event.preventDefault();
    handleEnter();
    return;
  }

  if (key === 'Escape') {
    event.preventDefault();
    currentQuery = '';
    hiddenInput.value = '';
    setStatus('輸入已清空，重新開始吧！');
    imageFrame.innerHTML = '';
    imageFrame.setAttribute('aria-label', '');
    renderWordGrid(currentQuery);
    return;
  }
}

function handleInputChange() {
  const rawValue = hiddenInput.value.toLowerCase();
  const candidate = rawValue.replace(/[^a-z]/g, '');

  // Always allow clearing
  if (candidate.length === 0) {
    currentQuery = '';
    hiddenInput.value = '';
    renderWordGrid(currentQuery);
    return;
  }

  // Check if strict prefix match exists in the allowed words
  const keywords = Object.keys(imageMap);
  const isValid = keywords.some(word => word.startsWith(candidate));

  if (isValid) {
    currentQuery = candidate;
    hiddenInput.value = candidate;
    renderWordGrid(currentQuery);
  } else {
    // Block input if invalid
    hiddenInput.value = currentQuery;
  }
}

function init() {
  renderWordGrid();
  renderWordGrid();
  setStatus('輸入任何字母開始遊戲！');
  document.addEventListener('keydown', handleKeydown);
  hiddenInput.addEventListener('input', handleInputChange);

  // Keep a hidden input focused for some mobile keyboards while staying invisible.
  hiddenInput.focus();
  hiddenInput.addEventListener('blur', () => hiddenInput.focus());
  document.addEventListener('pointerdown', () => hiddenInput.focus());
}

init();
