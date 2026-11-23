/* ==========================================================
   Let's Plan a Date — a very official, very scientific quiz
   ----------------------------------------------------------
   ✏️  EDIT THIS BLOCK to personalize the site.
   ========================================================== */
const CONFIG = {
  myName: "Brian",   // who she sends the results to
  herName: "",       // e.g. "Sarah" → she gets a special welcome when she types it
  myPhone: "",       // e.g. "15551234567" → the "Send" button opens a text to you
  city: "",          // e.g. "Provo" → shows up above the date ideas
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
    title: "Best time for a date?",
    sub: "Pick your peak hours.",
    label: "time of day",
    type: "choice",
    options: [
      { emo: "☕", label: "Morning", hint: "coffee is my personality", set: { time: "morning" }, fx: { cozy: 1 },
        reply: "An early riser. I'm fixing my sleep schedule as we speak." },
      { emo: "☀️", label: "Afternoon", hint: "peak energy, minimal yawning", set: { time: "afternoon" }, fx: { active: 1 },
        reply: "Sensible. Strategic. Well-rested." },
      { emo: "🌅", label: "Golden hour", hint: "for the aesthetics", set: { time: "evening" }, fx: { artsy: 1 },
        reply: "Good lighting is a valid requirement. Agreed." },
      { emo: "🌙", label: "Late night", hint: "certified night owl", set: { time: "night" }, fx: { adventure: 1 },
        reply: "Night owl detected. The best ideas happen after 11pm anyway." },
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
  { name: "Sunset hike to a viewpoint", why: "Bring snacks, earn the view.", tags: ["active", "adventure", "nature"], time: ["afternoon", "evening"] },
  { name: "Arcade night", why: "Loser buys boba. No refunds.", tags: ["nerdy", "active", "games"], time: ["evening", "night"], competitive: true, social: "crowd" },
  { name: "Board game café", why: "We'll find out who's competitive real fast.", tags: ["nerdy", "cozy", "games", "puzzles"], competitive: true },
  { name: "Escape room", why: "The ultimate teamwork test.", tags: ["nerdy", "adventure", "puzzles"], competitive: true },
  { name: "Art museum + make up backstories for the paintings", why: "The more dramatic, the better.", tags: ["artsy", "art"], time: ["morning", "afternoon"], social: "quiet" },
  { name: "Bookstore date", why: "Pick a book for each other under $10.", tags: ["artsy", "cozy", "books"], social: "quiet" },
  { name: "Pottery or painting class", why: "Guaranteed to be terrible at it together.", tags: ["artsy", "adventure", "art"] },
  { name: "Cook a dish neither of us has made", why: "Worst case, we order takeout and laugh.", tags: ["foodie", "cozy", "cooking"], time: ["evening", "night"], social: "quiet" },
  { name: "Farmers market / food truck hopping", why: "Try one thing from every stand.", tags: ["foodie", "adventure"], time: ["morning", "afternoon"], social: "crowd" },
  { name: "Coffee shop + build a tiny ridiculous website together", why: "Ship it before the coffee gets cold.", tags: ["nerdy", "cozy"], time: ["morning", "afternoon"], social: "quiet" },
  { name: "Two-person hackathon", why: "Build the dumbest app possible in 2 hours.", tags: ["nerdy", "adventure"], time: ["afternoon", "night"] },
  { name: "Picnic in the park", why: "I'll bring the food, you bring the playlist.", tags: ["cozy", "artsy", "nature", "music"], time: ["afternoon", "evening"], social: "quiet" },
  { name: "Stargazing with blankets & snacks", why: "I'll pretend I know the constellations.", tags: ["cozy", "adventure", "nature"], time: ["night"], social: "quiet" },
  { name: "Night market or food festival", why: "Eat our way through the whole thing.", tags: ["foodie", "adventure"], time: ["evening", "night"], social: "crowd" },
  { name: "Movie night + we rate the trailers", why: "Strict scoring. No mercy.", tags: ["cozy", "movies"], time: ["evening", "night"], social: "quiet" },
  { name: "Mini golf or bowling", why: "Trash talk is mandatory.", tags: ["active", "nerdy", "sports", "games"], competitive: true },
  { name: "Rock climbing gym", why: "I'll belay, you judge my form.", tags: ["active", "adventure", "sports"] },
  { name: "Kayaking or paddleboarding", why: "Whoever falls in first buys lunch.", tags: ["active", "adventure", "nature", "sports"], time: ["morning", "afternoon"] },
  { name: "Live music or an open mic", why: "We rate every act out of 10.", tags: ["artsy", "adventure", "music"], time: ["evening", "night"], social: "crowd" },
  { name: "Trivia night", why: "Team name: Ctrl+Alt+Defeat.", tags: ["nerdy", "games", "puzzles"], time: ["evening", "night"], competitive: true, social: "crowd" },
  { name: "Thrift store challenge", why: "$15 to build each other an outfit.", tags: ["artsy", "adventure"], time: ["afternoon"] },
  { name: "Zoo or aquarium", why: "We each pick a favorite animal and defend it.", tags: ["cozy", "adventure", "animals", "nature"], time: ["morning", "afternoon"] },
  { name: "Scenic drive + a shared playlist", why: "We each add 5 songs. No skipping.", tags: ["cozy", "adventure", "music", "travel"], social: "quiet" },
  { name: "Day trip to a town neither of us knows", why: "No plan, just vibes and a map.", tags: ["adventure", "travel", "foodie"], time: ["morning", "afternoon"] },
  { name: "Anime or show marathon + homemade snacks", why: "You pick the show, I'll pick the snacks.", tags: ["cozy", "anime", "movies", "cooking"], time: ["evening", "night"], social: "quiet" },
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

  "Morning": ["cap", "☕", "but first", "coffee"],
  "Afternoon": ["cap", "☀️😎", "not too early, not too late", "perfectly balanced"],
  "Golden hour": ["cap", "🌅📸", "golden hour", "everyone's a model"],
  "Late night": ["nobody", "My brain at 1am:", "\"let's get food and talk about the universe\" 🌙"],

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

/* ---------- intro ---------- */
function showIntro() {
  $topbar.hidden = true;
  render(`
    <div class="big-emoji">💌</div>
    <p class="eyebrow">You've been selected</p>
    <h1>Let's plan a date.</h1>
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
    <p class="sub">${special ? "I was really hoping it'd be you." : "Great name. Strong start."} Answer honestly — the results decide our date. No pressure.</p>
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
    if (idea.time && s.time) score += idea.time.includes(s.time) ? 2 : -2;
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
  const where = CONFIG.city ? ` in ${CONFIG.city}` : "";

  const summary = [
    `💌 Date quiz results for ${name}`,
    `Type: ${profile.title}`,
    "",
    ...s.summary.map(([k, v]) => `• ${k}: ${v}`),
    "",
    "Recommended dates:",
    ...ideas.map((d, i) => `${i + 1}. ${d.name}`),
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

    <div class="section-title">Your perfect dates${esc(where)}</div>
    <div class="ideas">
      ${ideas.map((d, i) => `<div class="idea"><span class="num">${i + 1}</span><div><b>${esc(d.name)}</b><small>${esc(d.why)}</small></div></div>`).join("")}
      <div class="idea food"><span class="num">🍽️</span><div><b>${esc(foodName)}</b><small>${esc(foodWhy)}</small></div></div>
    </div>

    <p class="note">Send these to ${esc(CONFIG.myName)} and let the planning begin. No pressure. (A little pressure. ${esc(CONFIG.myName)} is very excited.)</p>
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

showIntro();
