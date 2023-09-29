const container = document.querySelector('.container');
const input = document.querySelector('#input');
const boxesContainer = document.querySelector('.boxes-wrapper');
let inputDisplay = document.querySelector('.input-display');
const message = document.querySelector('.message');
const subMessage = document.querySelector('.sub-message');
const hint = document.querySelector('.hint');
let wrongLettersContainer = document.querySelector('.wrong-letters');
const remainingGuess = document.querySelector('.remaining-guess');
const button = document.querySelector('.reset-button');
const prizeElement = document.querySelector('.prize'); // Added prize element reference

let randomNumber;
let wordLetters;
let initialGuess;
let wrongLetters = [];
let boxes;
let correctGuesses = 0;
let remainingLives = 10;


const words = [
  {
    word: 'Paniki',
    hint: 'Sa araw nahihimbing, sa gabi ay gising.',
  },
  {
    word: 'Gagamba',
    hint: 'Bata pa si Nene marunong nang manahi.',
  },
  {
    word: 'Aso',
    hint: 'Mataas kung nakaupo, mababa kung nakatayo.',
  },
  {
    word: 'Kalapati',
    hint: 'Ibon kong saan man makarating, makababalik kung saan nanggaling.',
  },
  {
    word: 'Sibuyas',
    hint: 'Habang aking hinihiwa, ako ay pinaluluha.',
  },
  {
    word: 'Saranggola',
    hint: 'Buto’t-balat, lumilipad.',
  },
  {
    word: 'Sapatos',
    hint: 'Dala mo, dala ka, dala ka pa ng iyong dala.',
  },
  {
    word: 'Zipper',
    hint: 'Dumaan ang hari, nagkagatan ang mga pari.',
  },
  {
    word: 'Lamesa',
    hint: 'May apat na binti ngunit hindi makalakad.',
  },
  {
    word: 'Bombilya',
    hint: 'Kung gabi ay hinog, sa araw ay hilaw.',
  },
  {
    word: 'Bibig',
    hint:'Isang balong malalim, punong-puno ng patalim'
  },
  {
    word: 'Mata',
    hint: 'Dalawang batong maitim, malayo ang dinarating'
  },
  {
    word: 'tainga',
    hint: 'Dalawang balon, hindi malingon'
  },
  {
    word: 'bangka',
    hint: 'Naligo ang kapitan, hindi nabasa ang tiyan'
  },
  {
    word: 'daliri',
    hint: 'Limang puno ng niyog, isa’y matayog'
  },
  {
    word: 'kabag',
    hint: 'Aling ibon dito sa mundo ang lumilipad at sumususo ang anak?'
  },
  {
    word: 'kampana',
    hint: 'Nang hatakin ko ang baging, nagkagulo ang mga matsing'
  },
  {
    word: 'pinya',
    hint: 'Isang prinsesa, punong-puno ng mata'
  },
  {
    word: 'Acacia',
    hint: 'Sa init ay sumasaya, sa lamig ay nalalanta'
  },
  {
    word: 'ahas',
    hint: 'Baston ni Kapitan, Hindi ko mahawakan'
  },
  {
    word: 'alimango',
    hint: 'Bahay ni Ka Huli, haligi’y bali-bali, ang bubong ay kawali'
  },
  {
    word: 'Alitaptap',
    hint: 'Isang kulisap, Kikislap-kislap'
  },
  {
    word: 'alkansiya',
    hint: 'Ang alaga kong hugis bilog, barya-barya ang laman loob'
  },
  {
    word: 'aklat',
    hint: 'Bahay ng salita, imbakan ng diwa'
  },
  {
    word: 'Ampalaya',
    hint: 'Nang sumipot sa liwanag, kulubot na ang balat'
  },
  {
    word: 'Amorsiko',
    hint: 'Sa bukid nagsasaksakan, sa bahay nagbunutan'
  },
  {
    word: 'aparador',
    hint: 'Hindi naman hayop, hindi rin tao, may dalawang pakpak ngunit hindi naman maka-lipad'
  },
  {
    word: 'apoy',
    hint: 'Kabayo kong pula, nanalo sa karera umuusok pa'
  },
  {
    word: 'araw',
    hint: 'Manok kong pula, inutusan ko ng umaga, nang umuwi’y gabi na'
  },
  {
    word: 'baboy',
    hint: 'Kahit gaano linisin, marumi ang tingin'
  },
  {
    word: 'bagyo',
    hint: 'Walang pakpak, mabilis lumipad, malawak gumawak'
  },
  {
    word: 'bituin',
    hint: 'Itinanim sa kinagabihan, inani sa kinaumagahan'
  },
  {
    word: 'bulaklak',
    hint: 'Bumubuka’y walang bibig, Ngumingiti ng tahimik'
  },
  {
    word: 'bubuyog',
    hint: 'Heto na si Lelong, Bubulong-bulong'
  },
  {
    word: 'bombilya',
    hint: 'Isang butil ng palay, sakop ang buong bahay'
  },
  {
    word: 'Escalator',
    hint: 'Tumapak ako sa impyerno, maya-maya ay nasa langit na ako'
  },
  {
    word: 'Punso',
    hint: 'Baboy ko sa Kaingin, Tumataba’y walang kinakain'
  },
  {
    word: 'kamatayan',
    hint: 'Walang sinumang nakaka-alam, pagdating ng kadiliman'
  },
  {
    word: 'ibon',
    hint: 'Mga eroplano sa kalawakan, dumadapo sa mga puno sa kagubatan'
  },
  {
    word: 'Langaw',
    hint: 'Bisitang hindi inaasahan, nauuna sa hapag kainan'
  },
  {
    word: 'sinaing',
    hint: 'Umupo si itim, sinulot ni pula, Lumabas si puti, bubuga-buga'
  },
  {
    word: 'semento',
    hint: 'Kapag bago ay mahina, Matibay kapag naluma'
  },
  {
    word: 'karayom',
    hint: 'Hindi madangkal, hindi madipa, pinagtutulungan ng lima'
  },
  {
    word: 'Pagiisip',
    hint: 'Walang pintong pinasukan, naka-pasok sa kalooban'
  },
  {
    word: 'lamok',
    hint: 'Kung kailan ka tahimik, saka nambubuwisit'
  },

  {
    word: 'ngipin',
    hint: ' Isang bakud-bakuran, sari-sari ang nagdaan'
  },
  {
    word: 'kabaong',
    hint: 'Binili ko nang di nagustuhan, ginamit ko nang di ko nalalaman'
  },
  {
    word: 'Sumbrero',
    hint: 'Bumili ako ng alipin, mas mataas pa sa akin'
  },
  {
    word: 'kandila',
    hint: 'Kung gusto mo tumagal pa ang aking buhay, kailangang ako’y mamatay'
  },

]


input.addEventListener('keyup', userInput);
button.addEventListener('click', nextCard);

function nextCard() {
  try {
    words.splice(randomNumber, 1);
    start();
  } catch {
    location.reload();
  }
}

function focusAgain() {
  input.focus();
}

function reset() {
  initialGuess = 10;
  wrongLetters = [];
  boxesContainer.innerHTML = '';
  wrongLettersContainer.textContent = '';
  message.textContent = '';
  subMessage.textContent = 'Give it a try!';
  input.value = '';
  input.addEventListener('focusout', focusAgain);
  input.focus();
}

start();

function start() {
  reset();
  randomNumber = Math.floor(Math.random() * words.length);
  const randomWord = words[randomNumber];
  wordLetters = randomWord.word.split('');
  for (let i = 0; i < wordLetters.length; i++) {
    boxesContainer.innerHTML += `<div class="box"></div>`;
  }
  hint.textContent = `Hint: ${randomWord.hint}`;
  remainingGuess.textContent = initialGuess;
  boxes = document.querySelectorAll('.box');
}

function userInput(e) {
  if (e.keyCode <= 64 || event.keyCode >= 91) {
    subMessage.textContent = 'Input letters only!';
    return;
  }
  subMessage.textContent = '';

  const lastLetter = input.value[input.value.length - 1].toUpperCase();
  const hasBeenDeclared = wrongLetters.some((letter) => {
    return letter.toUpperCase() == lastLetter;
  });
  if (hasBeenDeclared) {
    inputDisplay.textContent = '';
    message.textContent = '';
    subMessage.textContent = 'It\'s already been declared!';
    return;
  }

  inputDisplay.textContent = `"${lastLetter}"`;

  const isThere = wordLetters.some((letter) => {
    return letter.toUpperCase() == lastLetter;
  });
  const findIndex = wordLetters.reduce((result, letter, index) => {
    if (letter.toUpperCase() == lastLetter) {
      result.push(index);
    }
    return result;
  }, []);
  if (isThere) {
    for (let i = 0; i < findIndex.length; i++) {
      boxes[findIndex[i]].innerHTML = `<p>${lastLetter}</p>`;
    }
    message.textContent = 'is Correct!';
    message.style.color = 'green';
    correctGuesses++;

    // Check if the player has guessed 10 riddles correctly without losing all lives
    if (correctGuesses === 10 && remainingLives > 0) {
      // Display the prize element
      prizeElement.style.display = 'block';
    }

    const isAllFilledUp = [...boxes].every((box) => {
      return box.children.length === 1;
    });
    if (isAllFilledUp) {
      inputDisplay.textContent = '';
      message.textContent = 'GREAT JOB!';
      message.style.color = 'green';
      button.textContent = 'One more game?';
      input.removeEventListener('focusout', focusAgain);
      input.blur();
    }
  } else {
    message.textContent = 'is Wrong!';
    message.style.color = 'red';
    initialGuess--;
    remainingGuess.textContent = initialGuess;
    wrongLetters.push(lastLetter);
    wrongLettersContainer.textContent = '';
    for (let i = 0; i < wrongLetters.length; i++) {
      wrongLettersContainer.textContent += `${wrongLetters[i]} `;
    }

    // Check if the player has run out of lives
    if (initialGuess < 1) {
      inputDisplay.textContent = '';
      message.textContent = 'GAME OVER!';
      message.style.color = 'red';
      subMessage.textContent = `The word is ${wordLetters.join('').toUpperCase()}`;
      button.textContent = 'Restart the game?';
      input.removeEventListener('focusout', focusAgain);
      input.blur();
      for (let i = 0; i < boxes.length; i++) {
        boxes[0].innerHTML = '';
      }
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = `<p>${wordLetters[i].toUpperCase()}</p>`;
      }
    }

    // Check if the player has run out of lives
    if (remainingLives === 0) {
      alert('Game Over! You ran out of lives.');
    }
  }
}