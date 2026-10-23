// ========================================
// PERSONALISE THESE DETAILS
// ========================================

const dramaCards = [
  {
    question: "NUMBER OF FIGHTS",
    answer: "62",
    caption: "Different opinions. Occasionally at full volume.",
  },
  {
    question: "BREAKUP ATTEMPTS",
    answer: "21",
    caption: "Our storyline had a few unexpected turns.",
  },
  {
    question: "TIMES WE MADE UP",
    answer: "21",
    caption: "My favourite part was understanding each other better.",
  },
  {
    question: "TIMES YOU WERE RIGHT",
    answer: "∞",
    caption: "According to you. I’m always wrong, but I’m learning.",
  },
  {
    question: "TIMES I’D CHOOSE YOU AGAIN",
    answer: "Always",
    caption: "Even knowing all the plot twists.",
  },
];


// The correct answer is its position, starting from 0.
// First option = 0, second = 1, third = 2.
const quizQuestions = [
  {
    question: "Where did we first meet?",
    options: [
      "East Coast Park",
      "Dhoby Ghaut",
      "Raffles City",
    ],
    correct: 1,
    explanation: "The place where our story started. I’m glad we met.",
  },
  {
    question: "Where did we have our first kiss?",
    options: [
      "Bedok Reservoir",
      "Theatre",
      "Raffles Place",
    ],
    correct: 1,
    explanation: "A moment I still replay in my head.",
  },
  {
    question: "Why do I love you?",
    options: [
      "Your smile",
      "Your personality",
      "Everything about you",
    ],
    correct: 2,
    explanation: "Trick question. How am I supposed to pick just one thing?",
  },
  {
    question: "What would I pick for our perfect evening?",
    options: [
      "A romantic dinner at a fancy restaurant",
      "Good food, a long walk at the beach, and you",
      "Staying late at work",
    ],
    correct: 1,
    explanation: "Good food and your company. That’s all I need.",
  },
  {
    question: "What’s my favourite thing about us?",
    options: [
      "You feeding me",
      "You arguing with me",
      "Our inside jokes and silly moments",
    ],
    correct: 2,
    explanation: "Our little moments together are my favourite. I love how you feed me.",
  },
];

// Countdown order: #10 first, #1 last.
// Replace the titles, artists, explanations, and MP3 filenames.
const songs = [
  {
    title: "Enchanted",
    artist: "Taylor Swift",
    file: "./audio/enchanted.mp3",
    reason: "For the excitement of meeting you and going home hoping you felt something too.",
  },
  {
    title: "Teenage Dream",
    artist: "Stephen Sanchez",
    file: "./audio/teenage-dream.mp3",
    reason: "You make me feel young and ridiculously in love, like we have a whole world of possibilities ahead of us. Let's go travelling in Europe.",
  },
  {
    title: "ma ma chit lo ma phit",
    artist: "Bunny Phyo and Ye Yint Aung",
    file: "./audio/ma-ma-chit-lo-ma-phit.mp3",
    reason: "Because no matter how much I try to play it cool, I can’t help falling for you.",
  },
  {
    title: "I love you so",
    artist: "Jinbo",
    file: "./audio/i-love-u-so.mp3",
    reason: "I don’t need anything extravagant. I want our ordinary days together, and for you to know how much I love you.",
  },
  {
    title: "Sleep On The Floor",
    artist: "The Lumineers",
    file: "./audio/sleep-on-the-floor.mp3",
    reason: "For the part of me that wants to pack a bag, take your hand, and find out what life could look like somewhere new together.",
  },
  {
    title: "Min mha min ",
    artist: "Lay Phyu",
    file: "./audio/min-mha-min.mp3",
    reason: "Even when getting to you feels difficult, you’re still the person I long for. It’s you, and it keeps being you.",
  },
  {
    title: "About You",
    artist: "The 1975",
    file: "./audio/about-you.mp3",
    reason: "For all the time we spent apart when the memories of you stayed with me. I never forgot you.",
  },
  {
    title: "A Yoe Thar Sone Seit Kuu",
    artist: "Linn Linn",
    file: "./audio/a-yoe-thar-sone-seit-kuu.mp3",
    reason: "I might not have the means to give you everything you dream of yet, but I want to support those dreams and give you the most sincere love I can.",
  },
  {
    title: "Je te laisserai des mots",
    artist: "Patrick Watson",
    file: "./audio/je-te-laisserai-des-mots.mp3",
    reason: "Think of this as a little note I’ve left for you to find whenever you miss me. Until I can be there, I hope my words keep you company.",
  },
  {
    title: "Five Feet Apart",
    artist: "",
    file: "./audio/five-feet-apart.mp3",
    reason: "i watched this movie way back and i loved it, i never thought i knew i would understand how he felt in the movie. This piece just reminds me the distance between us, in the past and now",
  },
];
// ========================================
// PAGE NAVIGATION
// ========================================

const screenOrder = [
  "welcome",
  "stats",
  "drama",
  "memories",
  "quiz",
  "music",
  "future",
  "finale",
  "letter",
];

const screens = Object.fromEntries(
  screenOrder.map((name) => [
    name,
    document.querySelector(`#${name}-screen`),
  ])
);

const musicPlayer = document.querySelector("#music-player");
const voicePlayer = document.querySelector("#voice-player");

function showScreen(name) {
  if (!screens[name]) return;

  Object.entries(screens).forEach(([key, screen]) => {
    screen.hidden = key !== name;
  });

  document.body.dataset.page = name;

  const page = screenOrder.indexOf(name) + 1;

  document.querySelector("#page-number").textContent =
    `${String(page).padStart(2, "0")} / ${String(screenOrder.length).padStart(2, "0")}`;

  document.querySelector("#page-progress-fill").style.width =
    `${(page / screenOrder.length) * 100}%`;

  document.querySelector("#page-progress").setAttribute(
    "aria-valuenow",
    String(page)
  );

  // Stop audio when leaving its page.
  if (name !== "music") musicPlayer.pause();
  if (name !== "finale") voicePlayer?.pause();

  window.scrollTo({ top: 0, behavior: "instant" });

  const heading = screens[name].querySelector("h1, h2");
  heading.setAttribute("tabindex", "-1");
  heading.focus({ preventScroll: true });
}

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.go);
  });
});

// ========================================
// PLAYFUL STATS
// ========================================

const statCards = screens.stats.querySelectorAll(".stat-card");

statCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (card.classList.contains("is-revealed")) return;

    card.classList.add("is-revealed");
    card.setAttribute("aria-expanded", "true");
    card.querySelector(".reveal-hint").hidden = true;
    card.querySelector(".stat-result").hidden = false;

    const count = screens.stats.querySelectorAll(
      ".stat-card.is-revealed"
    ).length;

    document.querySelector("#stats-progress").textContent =
      `${count} of ${statCards.length} discoveries unlocked`;

    if (count === statCards.length) {
      document.querySelector("#stats-next").hidden = false;
    }
  });
});

// ========================================
// DRAMA FLIP CARDS
// ========================================

let dramaIndex = 0;

const flipCard = document.querySelector("#drama-flip-card");
const flipInner = flipCard.querySelector(".flip-card-inner");
const flipFront = flipCard.querySelector(".flip-front");
const flipBack = flipCard.querySelector(".flip-back");

const dramaNext = document.querySelector("#drama-next-card");
const dramaComplete = document.querySelector("#drama-complete");

function renderDramaCard() {
  const card = dramaCards[dramaIndex];

  flipInner.style.transition = "none";
  flipCard.classList.remove("is-flipped");

  document.querySelector("#drama-question").textContent = card.question;
  document.querySelector("#drama-answer").textContent = card.answer;
  document.querySelector("#drama-caption").textContent = card.caption;

  document.querySelector("#drama-counter").textContent =
    `Card ${dramaIndex + 1} of ${dramaCards.length}`;

  flipCard.setAttribute("aria-expanded", "false");
  flipCard.setAttribute(
    "aria-label",
    `${card.question}. Tap to reveal the answer.`
  );

  flipFront.setAttribute("aria-hidden", "false");
  flipBack.setAttribute("aria-hidden", "true");

  dramaNext.hidden = true;
  dramaComplete.hidden = true;

  // Apply the reset before enabling animation again.
  void flipInner.offsetWidth;
  flipInner.style.transition = "";
}

flipCard.addEventListener("click", () => {
  const flipped = flipCard.classList.toggle("is-flipped");
  const card = dramaCards[dramaIndex];

  flipCard.setAttribute("aria-expanded", String(flipped));
  flipFront.setAttribute("aria-hidden", String(flipped));
  flipBack.setAttribute("aria-hidden", String(!flipped));

  flipCard.setAttribute(
    "aria-label",
    flipped
      ? `${card.answer}. ${card.caption} Tap to flip back.`
      : `${card.question}. Tap to reveal the answer.`
  );

  if (flipped) {
    const lastCard = dramaIndex === dramaCards.length - 1;
    dramaNext.hidden = lastCard;
    dramaComplete.hidden = !lastCard;
  }
});

dramaNext.addEventListener("click", () => {
  if (dramaIndex >= dramaCards.length - 1) return;

  dramaIndex++;
  renderDramaCard();
  flipCard.focus({ preventScroll: true });
});

renderDramaCard();

// ========================================
// PHOTO MEMORIES
// ========================================

const memories = [
  {
    image: "./images/photo1.jpg",
    title: "Up in the Mountains",
    reason: "I love that we are matching in this photo. I love that we are together. I love that we are happy.",
  },
  {
    image: "./images/photo2.jpg",
    title: "Overpriced meal but with a priceless view",
    reason: "You look like a princess here. I love that you are my princess.",
  },
  {
    image: "./images/photo3.jpg",
    title: "KL Big Fight",
    reason: "Honestly, I don’t remember what we were fighting about. ",
  },
  {
    image: "./images/photo4.jpg",
    title: "Our couple vibes",
    reason: "We are a power couple. I love that we are a power couple.",
  },
];

const memoryList = document.querySelector("#memory-list");
const memoryPrev = document.querySelector("#memory-prev");
const memoryNext = document.querySelector("#memory-next");

memoryList.replaceChildren();

memories.forEach((memory, index) => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "memory-card";
  card.setAttribute("aria-expanded", "false");
  card.setAttribute("aria-controls", `memory-reason-${index}`);

  const image = document.createElement("img");
  image.src = memory.image;
  image.alt = memory.title;
  image.loading = "lazy";
  image.draggable = false;

  const title = document.createElement("h3");
  title.textContent = memory.title;

  const hint = document.createElement("span");
  hint.className = "small-print";
  hint.textContent = "Tap to reveal";

  const reason = document.createElement("p");
  reason.id = `memory-reason-${index}`;
  reason.className = "memory-reason";
  reason.textContent = memory.reason;
  reason.hidden = true;

  card.append(image, title, hint, reason);

  card.addEventListener("click", () => {
    const expanded = card.getAttribute("aria-expanded") === "true";

    card.setAttribute("aria-expanded", String(!expanded));
    reason.hidden = expanded;
    hint.textContent = expanded ? "Tap to reveal" : "Tap to hide";
  });

  memoryList.appendChild(card);
});

function getCurrentMemoryIndex() {
  const cards = [...memoryList.children];
  const padding = parseFloat(getComputedStyle(memoryList).paddingLeft) || 0;
  const start = memoryList.getBoundingClientRect().left
    + memoryList.clientLeft
    + padding;

  let closestIndex = 0;
  let closestDistance = Infinity;

  cards.forEach((card, index) => {
    const distance = Math.abs(card.getBoundingClientRect().left - start);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function moveMemory(direction) {
  const cards = [...memoryList.children];
  if (!cards.length) return;

  const nextIndex = Math.max(
    0,
    Math.min(cards.length - 1, getCurrentMemoryIndex() + direction)
  );

  const padding = parseFloat(getComputedStyle(memoryList).paddingLeft) || 0;
  const start = memoryList.getBoundingClientRect().left
    + memoryList.clientLeft
    + padding;

  memoryList.scrollBy({
    left: cards[nextIndex].getBoundingClientRect().left - start,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
}

memoryPrev.addEventListener("click", () => moveMemory(-1));
memoryNext.addEventListener("click", () => moveMemory(1));

memoryList.addEventListener("keydown", (event) => {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

  event.preventDefault();
  moveMemory(event.key === "ArrowLeft" ? -1 : 1);
});
// ========================================
// QUIZ
// ========================================

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

const quizOptions = document.querySelector("#quiz-options");
const quizFeedback = document.querySelector("#quiz-feedback");
const quizNext = document.querySelector("#quiz-next");

function renderQuiz() {
  const question = quizQuestions[quizIndex];
  quizAnswered = false;

  document.querySelector("#quiz-counter").textContent =
    `Question ${quizIndex + 1} of ${quizQuestions.length}`;

  document.querySelector("#quiz-question").textContent =
    question.question;

  quizOptions.replaceChildren();
  quizFeedback.textContent = "";
  quizNext.hidden = true;

  quizNext.textContent =
    quizIndex === quizQuestions.length - 1
      ? "See my results →"
      : "Next question →";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => {
      if (quizAnswered) return;
      quizAnswered = true;

      const correct = index === question.correct;
      if (correct) quizScore++;

      const optionButtons = [...quizOptions.children];

      optionButtons.forEach((optionButton, optionIndex) => {
        // Keep focus on the selected answer, but prevent another answer.
        optionButton.setAttribute("aria-disabled", "true");

        if (optionIndex === question.correct) {
          optionButton.classList.add("is-correct");
          optionButton.textContent += " ✓";
        }
      });

      if (!correct) {
        button.classList.add("is-wrong");
      }

      quizFeedback.textContent =
        `${correct ? "You got it! " : "A little plot twist! "}` +
        question.explanation;

      quizNext.hidden = false;
    });

    quizOptions.append(button);
  });
}

quizNext.addEventListener("click", () => {
  if (!quizAnswered) return;

  if (quizIndex < quizQuestions.length - 1) {
    quizIndex++;
    renderQuiz();
    quizOptions.querySelector("button").focus({ preventScroll: true });
  } else {
    document.querySelector("#quiz-panel").hidden = true;
    document.querySelector("#quiz-result").hidden = false;

    const scoreHeading = document.querySelector("#quiz-score");
    scoreHeading.textContent = `${quizScore} / ${quizQuestions.length} correct`;
    scoreHeading.setAttribute("tabindex", "-1");
    scoreHeading.focus({ preventScroll: true });
  }
});

renderQuiz();

// ========================================
// MUSIC PLAYER
// ========================================

let songIndex = 0;

const songList = document.querySelector("#song-list");
const musicStatus = document.querySelector("#music-status");

function tryPlayMusic() {
  musicStatus.textContent = "";

  musicPlayer.play().catch((error) => {
    if (error.name === "AbortError") return;

    musicStatus.textContent =
      "Couldn’t start this song. Try the player, or check the MP3 file.";
  });
}

function selectSong(index, play = false) {
  songIndex = (index + songs.length) % songs.length;
  const song = songs[songIndex];
  const rank = songs.length - songIndex;

  musicPlayer.pause();
  musicPlayer.src = song.file;

  document.querySelector("#song-title").textContent =
    `#${rank} — ${song.title}`;

  document.querySelector("#song-artist").textContent = song.artist;
  document.querySelector("#song-reason").textContent = song.reason;

  musicStatus.textContent = "";

  songList.querySelectorAll(".song-row").forEach((row, index) => {
    const active = index === songIndex;
    row.classList.toggle("is-active", active);
    row.setAttribute("aria-pressed", String(active));
  });

  if (play) tryPlayMusic();
}

songs.forEach((song, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "song-row";
  button.setAttribute("aria-pressed", "false");

  const rank = document.createElement("span");
  rank.className = "song-rank";
  rank.textContent = `#${songs.length - index}`;

  const details = document.createElement("span");
  details.className = "song-details";

  const title = document.createElement("strong");
  title.textContent = song.title;

  const artist = document.createElement("small");
  artist.textContent = song.artist;

  details.append(title, artist);
  button.append(rank, details);

  button.addEventListener("click", () => {
    selectSong(index, true);
  });

  songList.append(button);
});

document.querySelector("#previous-song").addEventListener("click", () => {
  selectSong(songIndex - 1, true);
});

document.querySelector("#next-song").addEventListener("click", () => {
  selectSong(songIndex + 1, true);
});

// Continue the countdown automatically, stopping after #1.
musicPlayer.addEventListener("ended", () => {
  if (songIndex < songs.length - 1) {
    selectSong(songIndex + 1, true);
  }
});

musicPlayer.addEventListener("error", () => {
  musicStatus.textContent =
    "Song unavailable. Check that its MP3 filename and folder match the code.";
});

musicPlayer.addEventListener("play", () => {
  voicePlayer?.pause();
});

voicePlayer?.addEventListener("play", () => {
  musicPlayer.pause();
});

voicePlayer?.addEventListener("error", () => {
  const voiceStatus = document.querySelector("#voice-status");
  if (voiceStatus) {
    voiceStatus.textContent =
      "Add your recording as audio/birthday-message.mp3 to hear it here.";
  }
});

selectSong(0);

// ========================================
// MYSTERY DATES
// ========================================

document.querySelectorAll(".date-card").forEach((card) => {
  card.addEventListener("click", () => {
    const result = card.querySelector(".date-result");
    result.hidden = !result.hidden;

    card.classList.toggle("is-revealed", !result.hidden);
    card.setAttribute("aria-expanded", String(!result.hidden));
  });
});

// ========================================
// BIRTHDAY FINALE
// ========================================

let birthdayRevealed = false;

const cakeButton = document.querySelector("#cake-button");

cakeButton.addEventListener("click", () => {
  if (birthdayRevealed) return;
  birthdayRevealed = true;

  cakeButton.classList.add("is-blown");
  cakeButton.disabled = true;
  cakeButton.setAttribute("aria-label", "Birthday wish made");

  document.querySelector("#candle-flames").hidden = true;
  document.querySelector("#cake-label").textContent = "Wish made.";
  document.querySelector("#wish-instruction").textContent =
    "Happy birthday, my ma. I hope everything you’re wishing for comes true.";
  document.querySelector("#letter-link").hidden = false;

  launchConfetti();
});

function launchConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const container = document.querySelector("#confetti");
  const colours = ["#ffffff", "#efe0ff", "#d7b4ff", "#b88aff"];

  for (let index = 0; index < 50; index++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor =
      colours[Math.floor(Math.random() * colours.length)];
    piece.style.animationDelay = `${Math.random() * 0.6}s`;
    piece.style.animationDuration = `${2 + Math.random()}s`;
    piece.addEventListener("animationend", () => piece.remove());
    container.append(piece);
  }
}