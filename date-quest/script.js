/* ==========================================================
   Let's Plan a Date — a very official, very scientific quiz
   ----------------------------------------------------------
   ✏️  EDIT THIS BLOCK to personalize the site.
   ========================================================== */
const CONFIG = {
  myName: "Brian",   // who she sends the results to
  herName: "",       // e.g. "Sarah" → she gets a special welcome when she types it
  myPhone: "",       // e.g. "15551234567" → the "Send" button opens a text to you
  city: "Utah County",
  dateLabel: "Tuesday, Nov 24 · after 6:30pm",
};

/* ---------- questions ---------- */
const QUESTIONS = [
  {
    title: "Pick a programming language.",
    sub: "Yes, this is a personality test. Choose wisely.",
    label: "language",
    type: "choice",
    options: [
      { emo: "🐍", label: "Python", hint: "readable, chill, gets along with everyone", fx: { cozy: 2, nerdy: 1 },
        reply: "Clean syntax, clean vibes. Noted." },
      { emo: "⚡", label: "JavaScript", hint: "chaotic, runs everywhere, somehow works", fx: { adventure: 2, active: 1 },
        reply: "[object Object] energy. Respect. Slightly concerned." },
      { emo: "🦀", label: "Rust", hint: "safe, intense, a little dramatic", fx: { active: 2, nerdy: 1 },
        reply: "The borrow checker approves of you. I'm a little intimidated." },
      { emo: "📄", label: "HTML", hint: "…is it even a language?", fx: { artsy: 2, cozy: 1 },
        reply: "Starting a fight on question one. Bold. I like it." },
    ],
  },
  {
    title: "Your ideal Saturday looks like…",
    sub: "Be honest. Nobody's grading this. (I'm grading this.)",
    label: "ideal saturday",
    type: "choice",
    options: [
      { emo: "🥞", label: "Brunch, then wandering somewhere new", fx: { foodie: 2, adventure: 2 },
        reply: "Exploring AND eating. Extremely efficient." },
      { emo: "🛋️", label: "Blanket, movie, zero regrets", fx: { cozy: 3 },
        reply: "Honestly? Elite choice. No notes." },
      { emo: "🥾", label: "Hike, gym, touch some grass", fx: { active: 3, adventure: 1 },
        reply: "Look at you, actually touching grass. Rare for a coder." },
      { emo: "🖼️", label: "Museum, bookstore, or a random art thing", fx: { artsy: 3 },
        reply: "Cultured. Classy. Probably has a favorite font." },
    ],
  },
  {
    title: "Hunger strikes. What's the fix?",
    sub: "This one matters more than you think.",
    label: "comfort food",
    type: "choice",
    options: [
      { emo: "🌮", label: "Tacos", set: { food: "tacos" }, fx: { foodie: 2 }, reply: "Every day is Taco Tuesday if you believe." },
      { emo: "🍣", label: "Sushi", set: { food: "sushi" }, fx: { foodie: 2 }, reply: "Classy. Fresh. Chopstick skills will be evaluated." },
      { emo: "🥩", label: "Korean BBQ", set: { food: "kbbq" }, fx: { foodie: 2 }, reply: "Oh this is a GREAT answer. I can work the grill. 🔥" },
      { emo: "🍰", label: "Dessert. First. Always.", set: { food: "dessert" }, fx: { foodie: 2 }, reply: "Living life in reverse order. Iconic." },
      { emo: "🤷", label: "Whatever, I'm not picky", set: { food: "any" }, fx: { adventure: 1 }, reply: "Low-maintenance and open-minded. Love that." },
    ],
  },
  {
    title: "It's late November in Utah. How cold-proof are you?",
    sub: "Be honest. I've seen how people dress in this state.",
    label: "cold tolerance",
    type: "choice",
    options: [
      { emo: "🧤", label: "Bundle me up, outside is fine", set: { weather: "out" }, fx: { adventure: 1, active: 1 },
        reply: "A winter warrior. I respect it. I'll bring hand warmers anyway." },
      { emo: "🦎", label: "Indoors please, I'm basically a lizard", set: { weather: "in" }, fx: { cozy: 1 },
        reply: "Cold-blooded, warm-hearted. Heated buildings only. Noted." },
      { emo: "☕", label: "Outside a little, then hot cocoa immediately", set: { weather: "mix" }, fx: { cozy: 1, foodie: 1 },
        reply: "The perfect compromise. Cocoa is non-negotiable." },
    ],
  },
  {
    title: "How much energy should this date have?",
    sub: "Drag the slider. No judgment. (Some judgment.)",
    label: "energy level",
    type: "slider",
  },
  {
    title: "Plot twist: it starts pouring rain mid-date.",
    sub: "What do we do?",
    label: "rain plan",
    type: "choice",
    options: [
      { emo: "💃", label: "Dance in it", hint: "it's not a bug, it's a feature", fx: { adventure: 2, active: 1 },
        reply: "Main character energy. I'll bring a towel." },
      { emo: "☕", label: "Duck into a café for something warm", fx: { cozy: 2, foodie: 1 },
        reply: "Graceful error handling. Very mature." },
      { emo: "🕹️", label: "Pivot to an arcade, bookstore, or museum", fx: { nerdy: 2, artsy: 1 },
        reply: "Changing plans with zero downtime. Impressive." },
      { emo: "📝", label: "Complain about the weather together", fx: { cozy: 1 },
        reply: "Honestly a great bonding activity. Underrated." },
    ],
  },
  {
    title: "Pick the things you love.",
    sub: "Choose as many as you want.",
    label: "things she loves",
    type: "multi",
    options: [
      { emo: "🎵", label: "Music", key: "music", fx: { artsy: 1 } },
      { emo: "🎨", label: "Art", key: "art", fx: { artsy: 1 } },
      { emo: "🎮", label: "Games", key: "games", fx: { nerdy: 1 } },
      { emo: "🌲", label: "Nature", key: "nature", fx: { active: 1, adventure: 1 } },
      { emo: "📚", label: "Books", key: "books", fx: { cozy: 1, artsy: 1 } },
      { emo: "🎬", label: "Movies", key: "movies", fx: { cozy: 1 } },
      { emo: "🍳", label: "Cooking", key: "cooking", fx: { foodie: 1 } },
      { emo: "🏀", label: "Sports", key: "sports", fx: { active: 1 } },
      { emo: "🌸", label: "Anime", key: "anime", fx: { nerdy: 1, cozy: 1 } },
      { emo: "🧩", label: "Puzzles", key: "puzzles", fx: { nerdy: 1 } },
      { emo: "🐶", label: "Animals", key: "animals", fx: { cozy: 1 } },
      { emo: "✈️", label: "Travel", key: "travel", fx: { adventure: 1 } },
    ],
  },
  {
    title: "Quiet or lively?",
    sub: "Where should this date happen?",
    label: "setting",
    type: "choice",
    options: [
      { emo: "🕯️", label: "Just us, somewhere quiet", set: { social: "quiet" }, fx: { cozy: 1 },
        reply: "Good conversation, no shouting over music. Perfect." },
      { emo: "🎉", label: "Crowds, events, energy", set: { social: "crowd" }, fx: { adventure: 1 },
        reply: "Fearless. Let's find something happening." },
      { emo: "🤔", label: "Depends on the vibe", set: { social: "any" },
        reply: "The classic 'it depends.' Very senior engineer of you. 😏" },
    ],
  },
  {
    title: "We're playing a game. You are…",
    sub: "Mini golf, cards, Mario Kart, whatever.",
    label: "competitiveness",
    type: "choice",
    options: [
      { emo: "🏆", label: "Here to win. At all costs.", set: { competitive: true }, fx: { nerdy: 1, active: 1 },
        reply: "Noted. I'll start practicing. In secret. Seriously." },
      { emo: "😊", label: "Here for fun, winning's a bonus", fx: { cozy: 1 },
        reply: "Healthy. Well-adjusted. Suspicious." },
      { emo: "🗣️", label: "Here for the trash talk", set: { competitive: true }, fx: { adventure: 1 },
        reply: "Oh this is gonna be fun. Bring it." },
      { emo: "📣", label: "Cheering from the sidelines", fx: { cozy: 1 },
        reply: "Every team needs a hype person. You're hired." },
    ],
  },
  {
    title: "Very important: pineapple on pizza?",
    sub: "This will not affect anything. Probably.",
    label: "pineapple on pizza",
    type: "choice",
    options: [
      { emo: "🍍", label: "Yes", reply: "Controversial, but I'll allow it." },
      { emo: "🚫", label: "Absolutely not", reply: "Strong opinions. Respect." },
      { emo: "🙈", label: "I refuse to engage", reply: "Very diplomatic. Smart move." },
    ],
  },
  {
    title: "How should the date end?",
    sub: "The grand finale.",
    label: "end of date",
    type: "choice",
    options: [
      { emo: "🍦", label: "With dessert", fx: { foodie: 2 }, reply: "Always end on a sweet note. Literally." },
      { emo: "🚶", label: "A long walk and talk", fx: { cozy: 1, artsy: 1 }, reply: "Best part of any date, honestly." },
      { emo: "👀", label: "\"One more place?\"", fx: { adventure: 2 }, reply: "An infinite loop of fun. I'm in." },
      { emo: "😴", label: "Home by 10", hint: "I have a sleep schedule", fx: { cozy: 1 },
        reply: "Boundaries AND a sleep schedule? Rare. Respect." },
    ],
  },
  {
    title: "Anything else I should know?",
    sub: "Something you've been wanting to try? Allergies? Hot takes? Totally optional.",
    label: "note",
    type: "text",
  },
];

/* ---------- date ideas ---------- */
const IDEAS = [
  { name: "Luminaria at Thanksgiving Point", where: "Lehi", why: "Millions of Christmas lights. Open until 9, so it works after work.", tags: ["cozy", "artsy", "adventure", "nature"], weather: "out" },
  { name: "Christmas tree lot adventure", where: "a local tree lot", why: "Find the most tragic Charlie Brown tree, then the perfect one. Hot cocoa after.", tags: ["cozy", "adventure", "nature", "artsy"], weather: "mix" },
  { name: "Ice skating at Peaks Ice Arena", where: "Provo", why: "I'll hold onto the wall. You hold onto your dignity.", tags: ["active", "adventure", "sports"], weather: "in" },
  { name: "Bowling + arcade at Nickel City", where: "Orem", why: "Loser buys the post-game snacks. No refunds.", tags: ["nerdy", "active", "games"], competitive: true, weather: "in", social: "crowd" },
  { name: "Rock climbing at The Quarry", where: "Provo", why: "I'll belay, you judge my form.", tags: ["active", "adventure", "sports"], weather: "in" },
  { name: "Private karaoke room at Heart & Seoul", where: "Provo", why: "Duets are mandatory. Talent is optional.", tags: ["adventure", "music", "artsy"], weather: "in", social: "quiet" },
  { name: "Couples escape room at The Escape Date", where: "Pleasant Grove", why: "The ultimate teamwork test. Pair programming, but locked in.", tags: ["nerdy", "adventure", "puzzles"], competitive: true, weather: "in", social: "quiet" },
  { name: "VR arcade at VR Junkies", where: "Orem", why: "Zombies, space, or rhythm games. I will scream.", tags: ["nerdy", "games", "adventure"], competitive: true, weather: "in" },
  { name: "Roller skating at Classic Skate", where: "Orem", why: "Retro lights, loud music, questionable balance.", tags: ["active", "music", "adventure"], weather: "in", social: "crowd" },
  { name: "Indoor surfing + arcade at Provo Beach", where: "Provo", why: "Beach day in November. Wipeouts will be filmed.", tags: ["active", "adventure", "sports", "games"], weather: "in", social: "crowd" },
  { name: "A show at Hale Center Theater", where: "Orem", why: "Dress up a little, judge the costumes a lot.", tags: ["artsy", "music"], weather: "in" },
  { name: "Hot cocoa + a drive to see the valley lights", where: "Utah County", why: "Heated seats, good playlist, great view.", tags: ["cozy", "music", "adventure"], weather: "mix", social: "quiet" },
  { name: "Cook dinner together", where: "my kitchen", why: "Worst case, we order takeout and laugh about it.", tags: ["foodie", "cozy", "cooking"], weather: "in", social: "quiet" },
  { name: "Board games + hot chocolate", where: "a cozy café or my place", why: "We'll find out who's competitive real fast.", tags: ["nerdy", "cozy", "games", "puzzles"], competitive: true, weather: "in", social: "quiet" },
  { name: "Bookstore browse + dessert after", where: "Orem / Provo", why: "Pick a book for each other under $10.", tags: ["artsy", "cozy", "books"], weather: "in", social: "quiet" },
  { name: "Paint-your-own pottery", where: "Utah County", why: "Guaranteed to be terrible at it together.", tags: ["artsy", "cozy", "art"], weather: "in", social: "quiet" },
  { name: "Movie night + we rate the trailers", where: "a theater or my couch", why: "Strict scoring. No mercy.", tags: ["cozy", "movies", "anime"], weather: "in", social: "quiet" },
  { name: "Dessert crawl", where: "Provo", why: "Three dessert spots, one official scorecard.", tags: ["foodie", "adventure"], weather: "mix" },
];

const FOOD_PICKS = {
  tacos: ["Taco crawl", "Rate 3 taco spots with a very official scorecard. 🌮"],
  sushi: ["Sushi dinner", "We review every plate like food critics. 🍣"],
  kbbq: ["Korean BBQ", "I'll handle the grill, you handle the judging. 🥩"],
  dessert: ["Dessert crawl", "Dinner is optional. Dessert is required. 🍰"],
  any: ["Mystery restaurant", "I pick a place neither of us has tried. 🎲"],
};

const PROFILES = {
  adventure: { emo: "🧭", title: "The Adventurer", desc: "You're always down for something new. Risky, spontaneous, and somehow it always works out." },
  cozy:      { emo: "🧸", title: "The Cozy One", desc: "Warm drinks, soft blankets, and really good conversation. You know how to actually enjoy things." },
  foodie:    { emo: "🍜", title: "The Foodie", desc: "Always thinking about the next meal, and honestly? That's a great quality in a person." },
  artsy:     { emo: "🎨", title: "The Creative", desc: "You notice the little details and have great taste. Probably has a favorite font." },
  nerdy:     { emo: "🎮", title: "The Lovable Nerd", desc: "Puzzles, games, trivia — you'd turn any date into a competition, and you'd win." },
  active:    { emo: "⚡", title: "The Energizer", desc: "High energy, always moving. The couch is merely a suggestion." },
};

const ENERGY = [
  [15, "🥔", "Couch potato mode", "A fellow believer in the sacred art of doing nothing. Beautiful."],
  [35, "🌿", "Something chill", "Low stress, high quality. Perfect."],
  [60, "⚖️", "A little of everything", "Perfectly balanced, as all things should be."],
  [85, "🚀", "Let's do stuff!", "Okay okay, let's actually go do something!"],
  [101, "🔥", "Run a marathon", "Warning: I may need to start training for this date. 😅"],
];
const energyFor = (v) => ENERGY.find(([max]) => v < max);


/* ---------- memes (shown when she picks an answer, keyed by answer label) ----------
   formats:  ["cap", emoji, top text, bottom text]      classic Impact caption
             ["drake", nah text, yeah text]             two-panel nah / yeah
             ["nobody", who, what]                      "Nobody: / Me:" tweet
             ["me", me text, also-me text]              "Me: / Also me:"
             ["brain", [line1, line2, line3]]           expanding brain        */
const MEMES = {
  "Python": ["cap", "🐍", "python devs be like", "it's not slow, it's relaxed"],
  "JavaScript": ["cap", "🐶☕🔥", "undefined is not a function", "this is fine"],
  "Rust": ["cap", "🦀", "fought the borrow checker", "and won (barely)"],
  "HTML": ["drake", "Real programming languages", "<marquee>✨ HTML ✨</marquee>"],

  "Brunch, then wandering somewhere new": ["cap", "🥞", "brunch", "is just breakfast with confidence"],
  "Blanket, movie, zero regrets": ["nobody", "Me at 3pm on a Saturday:", "*still in pajamas, on episode 6* 🛋️🍿"],
  "Hike, gym, touch some grass": ["cap", "🌱👆", "touched grass", "achievement unlocked"],
  "Museum, bookstore, or a random art thing": ["cap", "🖼️🧐", "me at the museum", "*nods like i understand art*"],

  "Tacos": ["drake", "Making a healthy salad", "Tacos. Again. 🌮"],
  "Sushi": ["cap", "🥢🍣", "me using chopsticks", "like i've trained my whole life"],
  "Korean BBQ": ["cap", "🥩🔥", "me at korean bbq", "the grill is my IDE"],
  "Dessert. First. Always.": ["brain", ["Dinner, then dessert", "Dessert, then dinner", "Dessert IS dinner"]],
  "Whatever, I'm not picky": ["me", "\"I'm not picky, anywhere is fine\"", "*vetoes 6 restaurants*"],


  "Bundle me up, outside is fine": ["cap", "🥶👍", "it's 30 degrees", "perfect weather honestly"],
  "Indoors please, I'm basically a lizard": ["drake", "Going outside in November", "Heated buildings 🔥"],
  "Outside a little, then hot cocoa immediately": ["brain", ["Hot cocoa", "Hot cocoa with marshmallows", "Hot cocoa as a personality"]],

  "Dance in it": ["cap", "💃🌧️", "singing in the rain", "but make it chaotic"],
  "Duck into a café for something warm": ["cap", "🌧️☕", "rain outside, cocoa inside", "✨ ambiance ✨"],
  "Pivot to an arcade, bookstore, or museum": ["drake", "Canceling the date", "Speedrunning plan B"],
  "Complain about the weather together": ["cap", "🐶☕🌧️", "it's pouring", "this is fine"],

  "Just us, somewhere quiet": ["cap", "🕯️🤫", "introverts unite", "separately. in our own space."],
  "Crowds, events, energy": ["cap", "🎉👀", "more people", "= more people-watching"],
  "Depends on the vibe": ["cap", "🤔", "\"it depends\"", "— every senior dev ever"],

  "Here to win. At all costs.": ["cap", "🏆😤", "it's just a game", "said no winner ever"],
  "Here for fun, winning's a bonus": ["cap", "😊🍿", "winning?", "i'm here for the snacks"],
  "Here for the trash talk": ["nobody", "Me after winning ONE round of mini golf:", "\"gg ez\" 🗣️"],
  "Cheering from the sidelines": ["cap", "📣", "go team!!", "(i don't know the rules)"],

  "Yes": ["drake", "Pizza without pineapple", "🍍 + 🍕 = 💖"],
  "Absolutely not": ["cap", "🇮🇹😤", "pineapple on pizza?", "italy has entered the chat"],
  "I refuse to engage": ["cap", "🙈", "i see nothing", "i say nothing"],

  "With dessert": ["cap", "🍦", "there's always room", "for dessert"],
  "A long walk and talk": ["cap", "🚶🚶", "\"just one more lap\"", "*3 hours later*"],
  "\"One more place?\"": ["cap", "👀🌙", "\"one more place?\"", "*it is now 2am*"],
  "Home by 10": ["cap", "🔋😴", "me at 9:45pm", "social battery: 1%"],
};

function memeHTML(m) {
  if (!m) return "";
  const [t, a, b, c] = m;
  if (t === "cap") return `<div class="meme cap"><div class="mtop">${esc(b)}</div><div class="memo">${a}</div><div class="mbot">${esc(c)}</div></div>`;
  if (t === "drake") return `<div class="meme drake">
      <div class="dr no"><span class="dface">🙅</span><span>${esc(a)}</span></div>
      <div class="dr yes"><span class="dface">😌👉</span><span>${esc(b)}</span></div></div>`;
  if (t === "nobody") return `<div class="meme tweet"><div class="who"><span class="av">💌</span><b>Very Real Tweet</b> <span class="handle">@datequiz</span></div>
      <p>Nobody:</p><p>Absolutely nobody:</p><p>${esc(a)} ${esc(b)}</p></div>`;
  if (t === "me") return `<div class="meme tweet"><p><b>Me:</b> ${esc(a)}</p><p><b>Also me:</b> ${esc(b)}</p></div>`;
  if (t === "brain") return `<div class="meme brain">${a.map((line, i) => `<div class="br lvl${i}"><span>${esc(line)}</span><span class="bemo">${["🧠", "🧠✨", "🤯🌌"][i]}</span></div>`).join("")}</div>`;
  return "";
}

/* ==========================================================
   app
   ========================================================== */
const $screen = document.getElementById("screen");
const $topbar = document.getElementById("topbar");
const $fill = document.getElementById("fill");
const $count = document.getElementById("count");
const $back = document.getElementById("back");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

let name = "";
let step = 0;
const answers = new Array(QUESTIONS.length).fill(undefined);

function render(html) {
  $screen.innerHTML = html;
  $screen.style.animation = "none";
  void $screen.offsetWidth; // restart the enter animation
  $screen.style.animation = "";
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}

/* ---------- the ask ---------- */
const NO_TEXTS = ["No", "Are you sure?", "Really sure?", "Think again 🤔", "Wrong button", "Error 404: 'No' not found", "Nice try", "Can't catch me 😜", "Just press yes 🙃", "I'll wait…", "Still no?", "Yes is right there →"];

function showAsk() {
  $topbar.hidden = true;
  render(`
    <div class="ask">
      <div class="big-emoji shy">🥺👉👈</div>
      <p class="eyebrow">An important question</p>
      <h1>Want to go out with me?</h1>
      <p class="sub">Again. Date #2. The sequel. Sequels are usually worse, but I promise this one has a bigger budget.</p>
      <div class="ask-btns">
        <button class="btn big" id="yes">Yes 💖</button>
        <button class="btn ghost big" id="no">No</button>
      </div>
      <p class="tries" id="tries"></p>
    </div>`);
  const yes = document.getElementById("yes");
  const no = document.getElementById("no");
  const tries = document.getElementById("tries");
  let n = 0;

  let last = 0;
  const dodge = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (Date.now() - last < 250) return; // one tap fires pointerdown + click; count it once
    last = Date.now();
    n++;
    // first dodge: pull the button out so it can roam the whole screen
    if (no.parentElement !== document.body) {
      const r = no.getBoundingClientRect();
      document.body.appendChild(no);
      no.classList.add("runaway");
      no.style.left = r.left + "px";
      no.style.top = r.top + "px";
    }
    no.textContent = NO_TEXTS[Math.min(n, NO_TEXTS.length - 1)];
    const w = no.offsetWidth, h = no.offsetHeight, pad = 16;
    const px = e && e.clientX !== undefined ? e.clientX : innerWidth / 2;
    const py = e && e.clientY !== undefined ? e.clientY : innerHeight / 2;
    const yr = yes.getBoundingClientRect();
    let x = pad, y = pad;
    for (let i = 0; i < 30; i++) {
      x = pad + Math.random() * Math.max(1, innerWidth - w - pad * 2);
      y = pad + Math.random() * Math.max(1, innerHeight - h - pad * 2);
      const farFromFinger = Math.hypot(x + w / 2 - px, y + h / 2 - py) > 140;
      const offYes = x + w < yr.left - 8 || x > yr.right + 8 || y + h < yr.top - 8 || y > yr.bottom + 8;
      if (farFromFinger && offYes) break;
    }
    no.style.left = x + "px";
    no.style.top = y + "px";
    yes.style.transform = `scale(${Math.min(1 + n * 0.08, 1.7)})`;
    tries.textContent = n < 3 ? "" : `Attempts to say no: ${n}. Impressive persistence. Wrong direction, though.`;
  };

  no.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") dodge(e); });
  no.addEventListener("pointerdown", dodge);
  no.addEventListener("click", dodge);

  yes.onclick = () => {
    no.remove();
    showYay();
  };
}

function showYay() {
  hearts();
  const m = document.createElement("div");
  m.className = "modal-bg";
  m.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="yay">
      <div class="big-emoji">🥳</div>
      <h2 id="yay">Yay 💖!</h2>
      <p>This is the best decision you've ever made.</p>
      <p class="small">(Second best: agreeing to date #1.)</p>
      <button class="btn" id="cont">Okay, let's plan it →</button>
    </div>`;
  document.body.appendChild(m);
  const btn = m.querySelector("#cont");
  btn.focus();
  btn.onclick = () => { m.remove(); showIntro(); };
}

/* ---------- intro ---------- */
function showIntro() {
  $topbar.hidden = true;
  render(`
    <div class="big-emoji">📅</div>
    <p class="eyebrow">Date #2 is officially confirmed</p>
    <h1>Now let's figure out what we're doing.</h1>
    <div class="when">🗓️ ${esc(CONFIG.dateLabel)}<br />📍 ${esc(CONFIG.city)}</div>
    <p class="sub">A very official, very scientific quiz. ${QUESTIONS.length} quick questions, no wrong answers. (Okay, a few wrong answers. You'll know them when you see them.)</p>
    <label for="name" class="eyebrow" style="display:block">First things first — what's your name?</label>
    <input id="name" class="field" type="text" maxlength="40" autocomplete="given-name" placeholder="Your name" />
    <div class="error" id="err"></div>
    <div class="row"><button class="btn" id="start">Let's go →</button></div>
  `);
  const input = document.getElementById("name");
  const err = document.getElementById("err");
  const go = () => {
    const v = input.value.trim();
    if (!v) { err.textContent = "I need a name! You can make one up. (Please don't make one up.)"; input.focus(); return; }
    if (["admin", "root", "sudo"].includes(v.toLowerCase())) { err.textContent = "Nice try, hacker 😏 Real name please."; return; }
    name = v;
    showWelcome();
  };
  input.onkeydown = (e) => { if (e.key === "Enter") go(); };
  document.getElementById("start").onclick = go;
}

function showWelcome() {
  $topbar.hidden = true;
  const special = CONFIG.herName && name.toLowerCase() === CONFIG.herName.toLowerCase();
  render(`
    <div class="big-emoji">${special ? "💖" : "✨"}</div>
    <h1>Hi, ${esc(name)}!</h1>
    <p class="sub">${special ? "I was really hoping it'd be you." : "Great name. Strong start."} Answer honestly — the results decide what we do on Tuesday. No pressure.</p>
    <div class="row"><button class="btn" id="go">Start the quiz</button></div>
  `);
  document.getElementById("go").onclick = () => { step = 0; showQuestion(); };
}

/* ---------- questions ---------- */
function setProgress() {
  $topbar.hidden = false;
  $fill.style.width = `${(step / QUESTIONS.length) * 100}%`;
  $count.textContent = `${step + 1} / ${QUESTIONS.length}`;
  $back.disabled = false;
}

$back.onclick = () => {
  if (step === 0) showWelcome();
  else { step--; showQuestion(); }
};

function next() {
  step++;
  if (step < QUESTIONS.length) showQuestion();
  else showLoading();
}

function showQuestion() {
  const q = QUESTIONS[step];
  setProgress();
  const last = step === QUESTIONS.length - 1;
  const head = `<p class="eyebrow">Question ${step + 1}</p><h2>${esc(q.title)}</h2><p class="sub">${esc(q.sub)}</p>`;
  const nextBtn = `<div class="row end"><button class="btn" id="next">${last ? "See my results ✨" : "Next →"}</button></div>`;

  if (q.type === "choice") {
    render(`${head}
      <div class="options">${q.options.map((o, i) => `
        <button class="opt" data-i="${i}">
          <span class="emo">${o.emo}</span>
          <span class="txt">${esc(o.label)}${o.hint ? `<span class="hint">${esc(o.hint)}</span>` : ""}</span>
        </button>`).join("")}
      </div>
      <div id="meme"></div>
      <div class="reply" id="reply"></div>${nextBtn}`);
    const btn = document.getElementById("next");
    const reply = document.getElementById("reply");
    const memeBox = document.getElementById("meme");
    const opts = [...$screen.querySelectorAll(".opt")];
    const select = (i) => {
      answers[step] = i;
      opts.forEach((o, j) => o.classList.toggle("selected", i === j));
      reply.textContent = q.options[i].reply;
      memeBox.innerHTML = memeHTML(MEMES[q.options[i].label]);
      btn.disabled = false;
    };
    opts.forEach((o, i) => (o.onclick = () => {
      select(i);
      setTimeout(() => btn.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" }), 60);
    }));
    btn.disabled = answers[step] === undefined;
    if (answers[step] !== undefined) select(answers[step]);
    btn.onclick = next;
  }

  if (q.type === "multi") {
    const picked = new Set(answers[step] || []);
    render(`${head}
      <div class="chips">${q.options.map((o, i) => `
        <button class="opt${picked.has(i) ? " selected" : ""}" data-i="${i}" aria-pressed="${picked.has(i)}">
          <span>${o.emo}</span><span>${esc(o.label)}</span>
        </button>`).join("")}
      </div>
      <div class="reply" id="reply"></div>${nextBtn}`);
    const btn = document.getElementById("next");
    const reply = document.getElementById("reply");
    const update = () => {
      answers[step] = [...picked];
      btn.disabled = picked.size === 0;
      reply.textContent =
        picked.size === 0 ? "" :
        picked.size >= 6 ? "Okay, well-rounded human detected. Writing ALL of this down." :
        picked.size >= 3 ? "Great taste. Writing this down. Literally." :
        "Noted! (You can pick more, if you want.)";
    };
    $screen.querySelectorAll(".opt").forEach((o) => {
      o.onclick = () => {
        const i = +o.dataset.i;
        picked.has(i) ? picked.delete(i) : picked.add(i);
        o.classList.toggle("selected", picked.has(i));
        o.setAttribute("aria-pressed", String(picked.has(i)));
        update();
      };
    });
    update();
    btn.onclick = next;
  }

  if (q.type === "slider") {
    const v = answers[step] ?? 50;
    render(`${head}
      <div class="range-label" id="rl"></div>
      <input class="range" id="range" type="range" min="0" max="100" value="${v}" aria-label="Energy level" />
      <div class="range-ends"><span>🥔 couch</span><span>marathon 🔥</span></div>
      <div class="reply" id="reply"></div>${nextBtn}`);
    const range = document.getElementById("range");
    const rl = document.getElementById("rl");
    const reply = document.getElementById("reply");
    const update = () => {
      const [, emo, label, joke] = energyFor(+range.value);
      rl.textContent = `${emo} ${label}`;
      reply.textContent = joke;
      answers[step] = +range.value;
    };
    range.oninput = update;
    update();
    document.getElementById("next").onclick = next;
  }

  if (q.type === "text") {
    render(`${head}
      <textarea class="field" id="note" rows="3" maxlength="400" placeholder="Type anything… or skip it"></textarea>
      <div class="row end">
        <button class="btn ghost" id="skip">Skip</button>
        <button class="btn" id="next">See my results ✨</button>
      </div>`);
    const note = document.getElementById("note");
    note.value = answers[step] || "";
    document.getElementById("skip").onclick = () => { answers[step] = ""; next(); };
    document.getElementById("next").onclick = () => { answers[step] = note.value.trim(); next(); };
  }
}

/* ---------- scoring ---------- */
function compute() {
  const s = { scores: { adventure: 0, cozy: 0, foodie: 0, artsy: 0, nerdy: 0, active: 0 }, interests: [], summary: [] };
  const add = (fx = {}) => { for (const [k, v] of Object.entries(fx)) s.scores[k] += v; };

  QUESTIONS.forEach((q, i) => {
    const a = answers[i];
    if (q.type === "choice") {
      const o = q.options[a];
      add(o.fx);
      Object.assign(s, o.set || {});
      s.summary.push([q.label, o.label]);
    } else if (q.type === "multi") {
      a.forEach((j) => { add(q.options[j].fx); s.interests.push(q.options[j].key); });
      s.summary.push([q.label, a.map((j) => q.options[j].label).join(", ")]);
    } else if (q.type === "slider") {
      if (a >= 60) add({ active: Math.round((a - 50) / 15), adventure: 1 });
      else if (a <= 40) add({ cozy: Math.round((50 - a) / 12) });
      s.summary.push([q.label, `${a}% (${energyFor(a)[2]})`]);
    } else if (q.type === "text" && a) {
      s.summary.push(["note", a]);
    }
  });
  return s;
}

function pickIdeas(s) {
  return IDEAS.map((idea) => {
    let score = 0;
    for (const t of idea.tags) {
      if (t in s.scores) score += s.scores[t];
      if (s.interests.includes(t)) score += 3;
    }
    if (s.weather === "out") score += idea.weather === "out" ? 3 : 0;
    if (s.weather === "in") score += idea.weather === "out" ? -4 : 1;
    if (s.weather === "mix") score += idea.weather === "in" ? 0 : 2;
    if (idea.social && s.social && s.social !== "any") score += idea.social === s.social ? 2 : -2;
    if (idea.competitive && s.competitive) score += 2;
    score += Math.random() * 1.5; // a little variety
    return { ...idea, score };
  }).sort((a, b) => b.score - a.score).slice(0, 3);
}

/* ---------- loading ---------- */
function showLoading() {
  $fill.style.width = "100%";
  $count.textContent = "✓";
  $back.disabled = true;
  render(`<div class="loading"><div class="spinner"></div><h2>Planning your date…</h2><p id="msg"></p></div>${memeHTML(["cap", "⏳😬", "me waiting for the results", "please be compatible"])}`);
  const msgs = ["Analyzing your vibe…", "Consulting the snack council…", "Checking the weather (and my charm levels)…", "Almost there…"];
  const msg = document.getElementById("msg");
  let i = 0;
  msg.textContent = msgs[0];
  const t = setInterval(() => { i++; if (i < msgs.length) msg.textContent = msgs[i]; }, 650);
  setTimeout(() => { clearInterval(t); showResults(); }, reduceMotion ? 300 : 2700);
}

/* ---------- results ---------- */
function showResults() {
  const s = compute();
  const ranked = Object.entries(s.scores).sort((a, b) => b[1] - a[1]);
  const profile = PROFILES[ranked[0][0]];
  const max = Math.max(1, ranked[0][1]);
  const ideas = pickIdeas(s);
  const [foodName, foodWhy] = FOOD_PICKS[s.food || "any"];

  const summary = [
    `💌 Date quiz results for ${name}`,
    `Type: ${profile.title}`,
    "",
    ...s.summary.map(([k, v]) => `• ${k}: ${v}`),
    "",
    "Recommended dates:",
    ...ideas.map((d, i) => `${i + 1}. ${d.name} (${d.where})`),
    `🍽️ ${foodName}`,
  ].join("\n");

  $topbar.hidden = true;
  render(`
    <div class="big-emoji">${profile.emo}</div>
    <p class="eyebrow">${esc(name)}, your date type is…</p>
    <h1 class="result-type">${esc(profile.title)}</h1>
    <p class="sub">${esc(profile.desc)}</p>
    ${memeHTML(["drake", "Swiping through dating apps", `Taking a quiz built just for you`])}

    <div class="section-title">Your vibe breakdown</div>
    <div class="bars">${ranked.map(([k, v]) => {
      const pct = Math.round((Math.max(0, v) / max) * 100);
      return `<div class="bar-row"><span class="name">${k}</span><span class="bar"><i data-w="${pct}"></i></span><span class="pct">${pct}%</span></div>`;
    }).join("")}</div>

    <div class="section-title">Date #2 options · ${esc(CONFIG.dateLabel)}</div>
    <div class="ideas">
      ${ideas.map((d, i) => `<div class="idea"><span class="num">${i + 1}</span><div><b>${esc(d.name)}</b><small>📍 ${esc(d.where)} · ${esc(d.why)}</small></div></div>`).join("")}
      <div class="idea food"><span class="num">🍽️</span><div><b>${esc(foodName)}</b><small>${esc(foodWhy)}</small></div></div>
    </div>

    <p class="note">Send these to ${esc(CONFIG.myName)} and the plan for Tuesday gets locked in. No pressure. (A little pressure. ${esc(CONFIG.myName)} is very excited.)</p>
    <div class="row">
      <button class="btn" id="text">💬 Send to ${esc(CONFIG.myName)}</button>
      <button class="btn soft" id="copy">Copy results</button>
      <button class="btn ghost" id="again">Retake</button>
    </div>
  `);

  requestAnimationFrame(() => setTimeout(() => {
    $screen.querySelectorAll(".bar i").forEach((b) => (b.style.width = b.dataset.w + "%"));
  }, 150));

  document.getElementById("copy").onclick = async () => toast((await copyText(summary)) ? "Copied! ✓" : "Couldn't copy — try a screenshot 📸");
  document.getElementById("text").onclick = async () => {
    await copyText(summary);
    const sep = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent) ? "&" : "?";
    window.location.href = `sms:${CONFIG.myPhone}${sep}body=${encodeURIComponent(summary)}`;
  };
  document.getElementById("again").onclick = () => { answers.fill(undefined); step = 0; showQuestion(); };
  hearts();
}

/* ---------- helpers ---------- */
function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1800);
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}

function hearts() {
  if (reduceMotion) return;
  const emojis = ["💖", "💕", "✨", "💌", "🌸"];
  for (let i = 0; i < 24; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = emojis[i % emojis.length];
    h.style.left = Math.random() * 100 + "vw";
    h.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
    h.style.animationDelay = Math.random() * 1.2 + "s";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 6500);
  }
}

showAsk();
