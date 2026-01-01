const imageFrame = document.getElementById('image-frame');
const wordGrid = document.getElementById('word-grid');
const hiddenInput = document.getElementById('hidden-input');

const imageMap = {
  apple: { src: 'images/apple.svg', label: 'Apple 蘋果' },
  ant: { src: 'images/ant.svg', label: 'Ant 螞蟻' },
  banana: { src: 'images/banana.svg', label: 'Banana 香蕉' },
  bear: { src: 'images/bear.svg', label: 'Bear 熊' },
  bird: { src: 'images/bird.svg', label: 'Bird 小鳥' },
  cake: { src: 'images/cake.svg', label: 'Cake 蛋糕' },
  cat: { src: 'images/cat.svg', label: 'Cat 貓咪' },
  car: { src: 'images/car.svg', label: 'Car 小汽車' },
  cookie: { src: 'images/cookie.svg', label: 'Cookie 餅乾' },
  door: { src: 'images/door.svg', label: 'Door 門' },
  duck: { src: 'images/duck.svg', label: 'Duck 鴨子' },
  dog: { src: 'images/dog.svg', label: 'Dog 小狗' },
  egg: { src: 'images/egg.svg', label: 'Egg 雞蛋' },
  elephant: { src: 'images/elephant.svg', label: 'Elephant 大象' },
  fish: { src: 'images/fish.svg', label: 'Fish 魚' },
  fly: { src: 'images/fly.svg', label: 'Fly 蒼蠅' },
  flower: { src: 'images/flower.svg', label: 'Flower 花' },
  fox: { src: 'images/fox.svg', label: 'Fox 狐狸' },
  girl: { src: 'images/girl.svg', label: 'Girl 女孩' },
  giraffe: { src: 'images/giraffe.svg', label: 'Giraffe 長頸鹿' },
  grape: { src: 'images/grape.svg', label: 'Grape 葡萄' },
  hat: { src: 'images/hat.svg', label: 'Hat 帽子' },
  horse: { src: 'images/horse.svg', label: 'Horse 馬' },
  house: { src: 'images/house.svg', label: 'House 房子' },
  'ice cream': { src: 'images/ice-cream.svg', label: 'Ice Cream 冰淇淋' },
  indian: { src: 'images/indian.svg', label: 'Indian 印第安人' },
  jellyfish: { src: 'images/jellyfish.svg', label: 'Jellyfish 水母' },
  kangaroo: { src: 'images/kangaroo.svg', label: 'Kangaroo 袋鼠' },
  kite: { src: 'images/kite.svg', label: 'Kite 風箏' },
  kiwi: { src: 'images/kiwi.svg', label: 'Kiwi 奇異果' },
  koala: { src: 'images/koala.svg', label: 'Koala 無尾熊' },
  lemon: { src: 'images/lemon.svg', label: 'Lemon 檸檬' },
  lion: { src: 'images/lion.svg', label: 'Lion 獅子' },
  leaf: { src: 'images/leaf.svg', label: 'Leaf 樹葉' },
  milk: { src: 'images/milk.svg', label: 'Milk 牛奶' },
  monkey: { src: 'images/monkey.svg', label: 'Monkey 猴子' },
  moon: { src: 'images/moon.svg', label: 'Moon 月亮' },
  nest: { src: 'images/nest.svg', label: 'Nest 鳥巢' },
  nurse: { src: 'images/nurse.svg', label: 'Nurse 護士' },
  octopus: { src: 'images/octopus.svg', label: 'Octopus 章魚' },
  orange: { src: 'images/orange.svg', label: 'Orange 柳橙' },
  owl: { src: 'images/owl.svg', label: 'Owl 貓頭鷹' },
  panda: { src: 'images/panda.svg', label: 'Panda 貓熊' },
  pig: { src: 'images/pig.svg', label: 'Pig 豬' },
  pizza: { src: 'images/pizza.svg', label: 'Pizza 披薩' },
  queen: { src: 'images/queen.svg', label: 'Queen 皇后' },
  rabbit: { src: 'images/rabbit.svg', label: 'Rabbit 兔子' },
  rainbow: { src: 'images/rainbow.svg', label: 'Rainbow 彩虹' },
  snake: { src: 'images/snake.svg', label: 'Snake 蛇' },
  sun: { src: 'images/sun.svg', label: 'Sun 太陽' },
  star: { src: 'images/star.svg', label: 'Star 星星' },
  tree: { src: 'images/tree.svg', label: 'Tree 樹' },
  turtle: { src: 'images/turtle.svg', label: 'Turtle 烏龜' },
  umbrella: { src: 'images/umbrella.svg', label: 'Umbrella 雨傘' },
  vacuum: { src: 'images/vacuum.svg', label: 'Vacuum 吸塵器' },
  van: { src: 'images/van.svg', label: 'Van 貨車' },
  vase: { src: 'images/vase.svg', label: 'Vase 花瓶' },
  vulture: { src: 'images/vulture.svg', label: 'Vulture 禿鷹' },
  whale: { src: 'images/whale.svg', label: 'Whale 鯨魚' },
  watermelon: { src: 'images/watermelon.svg', label: 'Watermelon 西瓜' },
  window: { src: 'images/window.svg', label: 'Window 窗戶' },
  xylophone: { src: 'images/xylophone.svg', label: 'Xylophone 木琴' },
  yam: { src: 'images/yam.svg', label: 'Yam 山藥' },
  yoyo: { src: 'images/yoyo.svg', label: 'Yoyo 溜溜球' },
  zebra: { src: 'images/zebra.svg', label: 'Zebra 斑馬' },
  zoo: { src: 'images/zoo.svg', label: 'Zoo 動物園' }
};

let currentQuery = '';



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
      const match = word.slice(0, filter.length).toUpperCase();
      const rest = word.slice(filter.length).toUpperCase();
      card.innerHTML = `<div><b class="matched-letter">${match}</b>${rest}</div>`;
    } else {
      card.innerHTML = `<div>${word.toUpperCase()}</div>`;
    }

    // Add click event listener to each card
    card.addEventListener('click', () => {
      // Use the original word (which is lowercase in the key list)
      renderImage(word);
      // Optional: Update input/highlight if desired,
      // but simple image rendering is enough for now.
      // If we want to sync the input:
      currentQuery = word;
      hiddenInput.value = word;
      // Re-render grid to highlight this word
      renderWordGrid(word);
    });

    wordGrid.appendChild(card);
  });


}



function renderImage(word) {
  // Normalize input: lowercase and trim
  let normalizedWord = word.toLowerCase();

  if (normalizedWord.includes('-')) {
    normalizedWord = normalizedWord.replace(/-/g, ' ');
  }

  const match = imageMap[normalizedWord];

  imageFrame.innerHTML = '';

  if (!match) {
    imageFrame.setAttribute('aria-label', '沒有找到圖片');
    return false;
  }

  const img = document.createElement('img');
  img.src = match.src;
  img.alt = match.label;
  img.classList.add('pop-in');
  imageFrame.setAttribute('aria-label', match.label);
  imageFrame.appendChild(img);
  return true;
}

function handleEnter() {
  if (!currentQuery) {
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
    imageFrame.innerHTML = '';
    imageFrame.setAttribute('aria-label', '');
    renderWordGrid(currentQuery);
    return;
  }
}

function handleInputChange() {
  const rawValue = hiddenInput.value.toLowerCase();
  const candidate = rawValue.replace(/[^a-z\s]/g, '');

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

  document.addEventListener('keydown', handleKeydown);
  hiddenInput.addEventListener('input', handleInputChange);

  // Keep a hidden input focused for some mobile keyboards while staying invisible.
  hiddenInput.focus();
  hiddenInput.addEventListener('blur', () => hiddenInput.focus());
  document.addEventListener('pointerdown', () => hiddenInput.focus());
}

init();
