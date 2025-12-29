const wordInput = document.getElementById('word-input');
const showButton = document.getElementById('show-button');
const imageFrame = document.getElementById('image-frame');
const status = document.getElementById('status');

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

function renderImage(word) {
  // Normalize input: lowercase and trim
  let normalizedWord = word.toLowerCase();

  // Handle 'ice-cream' vs 'ice cream'
  if (normalizedWord === 'ice-cream') normalizedWord = 'ice cream';

  const match = imageMap[normalizedWord];

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
  const word = wordInput.value.trim();
  if (!word) {
    status.textContent = '先輸入一個單字吧！';
    status.style.color = '#d32f2f';
    wordInput.focus();
    return;
  }
  renderImage(word);
}

showButton.addEventListener('click', handleShow);
wordInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleShow();
  }
});
