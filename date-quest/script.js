/* ==========================================================
   date-planner v1.0  —  a very serious questionnaire
   ----------------------------------------------------------
   ✏️  EDIT THIS BLOCK to personalize the site.
   ========================================================== */
const CONFIG = {
  myName: "Brian",   // who she sends the results to
  herName: "",       // e.g. "Sarah" → she gets a special welcome when she types it
  myPhone: "",       // e.g. "15551234567" → the "Text it to me" button opens a message to you
  city: "",          // e.g. "Provo" → shows up in the date ideas
  typingSpeed: 16,   // ms per character (lower = faster)
};

/* ---------- state ---------- */
const state = {
  name: "",
  scores: { adventure: 0, cozy: 0, foodie: 0, artsy: 0, nerdy: 0, active: 0 },
  interests: [],
  time: null,
  food: null,
  social: null,
  answers: [],
  note: "",
};

/* ---------- questions ---------- */
const QUESTIONS = [
  {
    id: "lang",
    label: "language",
    prompt: ["// Q1: Pick a language. This is basically a personality test.", "const vibe = ___;"],
    type: "choice",
    options: [
      { label: "Python", hint: "readable, chill, gets along with everyone", fx: { cozy: 2, nerdy: 1 },
        reply: "Clean syntax, clean vibes. Noted." },
      { label: "JavaScript", hint: "chaotic, runs everywhere, somehow works", fx: { adventure: 2, active: 1 },
        reply: "[object Object] energy. Respect. Slightly concerned." },
      { label: "Rust", hint: "safe, intense, a little dramatic", fx: { active: 2, nerdy: 1 },
        reply: "The borrow checker approves of you. I'm a little intimidated." },
      { label: "HTML", hint: "...is it even a language?", fx: { artsy: 2, cozy: 1 },
        reply: "Starting a fight on question one. Bold. I like it." },
    ],
  },
  {
    id: "weekend",
    label: "ideal saturday",
    prompt: ["// Q2: Describe your ideal Saturday in one commit message.", '$ git commit -m "___"'],
    type: "choice",
    options: [
      { label: "feat: brunch, then wander somewhere new", fx: { foodie: 2, adventure: 2 },
        reply: "Shipping new features AND eating. Efficient." },
      { label: "fix: stayed in, blanket, movie, zero regrets", fx: { cozy: 3 },
        reply: "Approved. Best bug fix in the codebase." },
      { label: "chore: hike / gym / touch grass", fx: { active: 3, adventure: 1 },
        reply: "Look at you, actually touching grass. Rare for a dev." },
      { label: "refactor: museum, bookstore, or a random art thing", fx: { artsy: 3 },
        reply: "Cultured AND well-documented. Merged." },
    ],
  },
  {
    id: "food",
    label: "comfort food",
    prompt: ["// Q3: Your stomach just threw an exception.", "try { surviveTheDay(); }", "catch (HungerError e) { ___ }"],
    type: "choice",
    options: [
      { label: "tacos();", set: { food: "tacos" }, fx: { foodie: 2 }, reply: "Every day is Taco Tuesday if you believe." },
      { label: "sushi();", set: { food: "sushi" }, fx: { foodie: 2 }, reply: "Classy. Raw. Like an unminified stack trace." },
      { label: "koreanBBQ();", set: { food: "kbbq" }, fx: { foodie: 2 }, reply: "Oh this is a GREAT answer. I can work the grill. 🔥" },
      { label: "dessert(); // first. always.", set: { food: "dessert" }, fx: { foodie: 2 }, reply: "Living life in reverse order. Unsorted. Iconic." },
      { label: "whatever(); // not a picky compiler", set: { food: "any" }, fx: { adventure: 1 }, reply: "Low-maintenance build. Compiles anywhere." },
    ],
  },
  {
    id: "time",
    label: "deploy window",
    prompt: ["// Q4: When should we deploy this date?", 'cron.schedule("___")'],
    type: "choice",
    options: [
      { label: "☕ morning", hint: "coffee is my runtime", set: { time: "morning" }, fx: { cozy: 1 },
        reply: "An early riser. Fixing my sleep schedule as we speak." },
      { label: "☀️ afternoon", hint: "peak uptime", set: { time: "afternoon" }, fx: { active: 1 },
        reply: "Max uptime, minimal yawning. Smart." },
      { label: "🌅 golden hour", hint: "for the aesthetics", set: { time: "evening" }, fx: { artsy: 1 },
        reply: "Good lighting is a valid technical requirement." },
      { label: "🌙 late night", hint: "I'm a night owl process", set: { time: "night" }, fx: { adventure: 1 },
        reply: "Night owl detected. The best code is written after 11pm anyway." },
    ],
  },
  {
    id: "energy",
    label: "energy level",
    prompt: ["// Q5: Set your ideal date CPU usage.", "process.setPriority(___)"],
    type: "slider",
  },
  {
    id: "bug",
    label: "rain plan",
    prompt: ["// Q6: Unexpected runtime error mid-date:", "throw new WeatherError(\"it's pouring 🌧️\");"],
    type: "choice",
    options: [
      { label: "Dance in it", hint: "it's not a bug, it's a feature", fx: { adventure: 2, active: 1 },
        reply: "Main character energy. I'll bring a towel." },
      { label: "Duck into a café for something warm", fx: { cozy: 2, foodie: 1 },
        reply: "Graceful error handling. Very senior of you." },
      { label: "Pivot: arcade, bookstore, or museum", fx: { nerdy: 2, artsy: 1 },
        reply: "Hot-swapping the plan with zero downtime. Impressive." },
      { label: "File a ticket and blame the weather", fx: { cozy: 1 },
        reply: "Ticket #404 opened. Weather has not responded. Typical." },
    ],
  },
  {
    id: "imports",
    label: "things she loves",
    prompt: ["// Q7: Import the things you love. Pick as many as you want.", "import { ___ } from './my-favorite-things';"],
    type: "multi",
    options: [
      { label: "music", fx: { artsy: 1 } },
      { label: "art", fx: { artsy: 1 } },
      { label: "games", fx: { nerdy: 1 } },
      { label: "nature", fx: { active: 1, adventure: 1 } },
      { label: "books", fx: { cozy: 1, artsy: 1 } },
      { label: "movies", fx: { cozy: 1 } },
      { label: "cooking", fx: { foodie: 1 } },
      { label: "sports", fx: { active: 1 } },
      { label: "anime", fx: { nerdy: 1, cozy: 1 } },
      { label: "puzzles", fx: { nerdy: 1 } },
      { label: "animals", fx: { cozy: 1 } },
      { label: "travel", fx: { adventure: 1 } },
    ],
  },
  {
    id: "social",
    label: "setting",
    prompt: ["// Q8: Where should this date be hosted?", "server.listen(___)"],
    type: "choice",
    options: [
      { label: "localhost", hint: "just us, somewhere quiet", set: { social: "quiet" }, fx: { cozy: 1 },
        reply: "Private server. Low latency conversation. Love that." },
      { label: "public network", hint: "crowds, events, energy", set: { social: "crowd" }, fx: { adventure: 1 },
        reply: "Going live in production. Fearless." },
      { label: "it depends", hint: "the senior engineer answer", set: { social: "any" },
        reply: "Classic. Can't be wrong if you never commit. 😏" },
    ],
  },
  {
    id: "games",
    label: "competitiveness",
    prompt: ["// Q9: We're playing a game. What does your loop look like?", "while (playing) { ___ }"],
    type: "choice",
    options: [
      { label: "win(); // at all costs", set: { competitive: true }, fx: { nerdy: 1, active: 1 },
        reply: "Noted. I'll start practicing. In secret. Seriously." },
      { label: "haveFun(); // winning is a bonus", fx: { cozy: 1 },
        reply: "Healthy. Well-adjusted. Suspicious." },
      { label: "trashTalk(); // the real game", set: { competitive: true }, fx: { adventure: 1 },
        reply: "Oh this is gonna be fun. Bring it." },
      { label: "spectate(); // I'll cheer", fx: { cozy: 1 },
        reply: "Every dev needs a QA team. You're hired." },
    ],
  },
  {
    id: "pineapple",
    label: "pineapple on pizza",
    prompt: ["// Q10: Critical security review.", "const pineappleOnPizza = ___;"],
    type: "choice",
    options: [
      { label: "true", reply: "Controversial, but a valid boolean. I'll allow it." },
      { label: "false", reply: "Strongly typed opinions. Respect." },
      { label: "undefined", hint: "I refuse to engage", reply: "The safest possible return value. Very diplomatic." },
    ],
  },
  {
    id: "ending",
    label: "end of date",
    prompt: ["// Q11: The date's wrapping up. What's the return value?", "return ___;"],
    type: "choice",
    options: [
      { label: "dessert", fx: { foodie: 2 }, reply: "Always end on a sweet note. Literally." },
      { label: "a long walk & talk", fx: { cozy: 1, artsy: 1 }, reply: "Best part of any date, honestly." },
      { label: '"one more place?"', fx: { adventure: 2 }, reply: "Infinite loop of fun. No break statement. 👀" },
      { label: "home by 10", hint: "I have a sleep schedule", fx: { cozy: 1 },
        reply: "Boundaries AND a sleep schedule? Rare build. Respect." },
    ],
  },
  {
    id: "note",
    label: "note",
    prompt: ["// Last one! Leave a comment for the developer.", "// Something you've been wanting to try? Allergies? Hot takes? (optional)"],
    type: "text",
  },
];

/* ---------- date ideas ---------- */
const IDEAS = [
  { name: "Sunset hike to a viewpoint", why: "bring snacks, earn the view", tags: ["active", "adventure", "nature"], time: ["afternoon", "evening"] },
  { name: "Arcade night", why: "loser buys boba. No refunds.", tags: ["nerdy", "active", "games"], time: ["evening", "night"], competitive: true, social: "crowd" },
  { name: "Board game café", why: "we'll find out who's competitive real fast", tags: ["nerdy", "cozy", "games", "puzzles"], competitive: true },
  { name: "Escape room", why: "the ultimate pair-programming test", tags: ["nerdy", "adventure", "puzzles"], competitive: true },
  { name: "Art museum + make up fake backstories for the paintings", why: "the more dramatic the better", tags: ["artsy", "art"], time: ["morning", "afternoon"], social: "quiet" },
  { name: "Bookstore date", why: "pick a book for each other under $10", tags: ["artsy", "cozy", "books"], social: "quiet" },
  { name: "Pottery or painting class", why: "guaranteed to be terrible at it together", tags: ["artsy", "adventure", "art"] },
  { name: "Cook a dish neither of us has made before", why: "worst case, we order takeout and laugh", tags: ["foodie", "cozy", "cooking"], time: ["evening", "night"], social: "quiet" },
  { name: "Farmers market / food truck hopping", why: "try one thing from every stand", tags: ["foodie", "adventure"], time: ["morning", "afternoon"], social: "crowd" },
  { name: "Coffee shop + build a tiny ridiculous website together", why: "deploy it before the coffee gets cold", tags: ["nerdy", "cozy"], time: ["morning", "afternoon"], social: "quiet" },
  { name: "Two-person hackathon", why: "build the dumbest app possible in 2 hours", tags: ["nerdy", "adventure"], time: ["afternoon", "night"] },
  { name: "Picnic in the park", why: "I'll bring the food, you bring the playlist", tags: ["cozy", "artsy", "nature", "music"], time: ["afternoon", "evening"], social: "quiet" },
  { name: "Stargazing with blankets & snacks", why: "I'll pretend I know the constellations", tags: ["cozy", "adventure", "nature"], time: ["night"], social: "quiet" },
  { name: "Night market / food festival", why: "eat our way through it", tags: ["foodie", "adventure"], time: ["evening", "night"], social: "crowd" },
  { name: "Movie night + rate the trailers like a code review", why: "LGTM 👍 or request changes", tags: ["cozy", "movies"], time: ["evening", "night"], social: "quiet" },
  { name: "Mini golf or bowling", why: "trash talk mandatory", tags: ["active", "nerdy", "sports", "games"], competitive: true },
  { name: "Rock climbing gym", why: "I'll belay, you judge my form", tags: ["active", "adventure", "sports"] },
  { name: "Kayaking or paddleboarding", why: "whoever falls in first buys lunch", tags: ["active", "adventure", "nature", "sports"], time: ["morning", "afternoon"] },
  { name: "Live music or an open mic", why: "we rate every act, out of 10", tags: ["artsy", "adventure", "music"], time: ["evening", "night"], social: "crowd" },
  { name: "Trivia night", why: "team name: 'Ctrl+Alt+Defeat'", tags: ["nerdy", "games", "puzzles"], time: ["evening", "night"], competitive: true, social: "crowd" },
  { name: "Thrift store challenge", why: "$15 to build each other an outfit", tags: ["artsy", "adventure"], time: ["afternoon"] },
  { name: "Zoo or aquarium", why: "we each pick a favorite animal and defend it", tags: ["cozy", "adventure", "animals", "nature"], time: ["morning", "afternoon"] },
  { name: "Scenic drive + a playlist we each add 5 songs to", why: "aux cord diplomacy", tags: ["cozy", "adventure", "music", "travel"], social: "quiet" },
  { name: "Day trip to a town neither of us has explored", why: "no plan, just vibes and a map", tags: ["adventure", "travel", "foodie"], time: ["morning", "afternoon"] },
  { name: "Anime / show marathon + homemade snacks", why: "you pick the show, I'll pick the snacks", tags: ["cozy", "anime", "movies", "cooking"], time: ["evening", "night"], social: "quiet" },
];

const FOOD_PICKS = {
  tacos: "Taco crawl — rate 3 taco spots with a very official scorecard 🌮",
  sushi: "Sushi date — we review each plate like a pull request 🍣",
  kbbq: "Korean BBQ — I'll handle the grill, you handle the judging 🥩",
  dessert: "Dessert crawl — dinner is optional, dessert is required 🍰",
  any: "Mystery restaurant — I pick a place neither of us has tried 🎲",
};

const PROFILES = {
  adventure: { title: "The Full-Stack Adventurer", desc: "You treat life like deploying to prod on a Friday: risky, exciting, and somehow it always works out." },
  cozy:      { title: "The Cozy Backend", desc: "Low latency, high comfort. You run best on warm drinks, soft blankets, and really good conversation." },
  foodie:    { title: "The Foodie Daemon", desc: "A background process that is always, always thinking about the next meal. Respect." },
  artsy:     { title: "The Creative Frontend", desc: "You care how things look AND how they feel. Pixel-perfect taste, zero CSS bugs." },
  nerdy:     { title: "The 10x Nerd", desc: "Puzzles, games, trivia — you'd turn any date into a speedrun, and you'd win." },
  active:    { title: "The Overclocked Athlete", desc: "High uptime, zero idle time. The couch is a deprecated feature." },
};

/* ==========================================================
   engine
   ========================================================== */
const $out = document.getElementById("output");
const $input = document.getElementById("input-area");
const $term = document.getElementById("terminal");
const $progress = document.getElementById("progress");
const $status = document.getElementById("status-msg");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let fast = false; // set when she taps to skip the current typing burst

const wait = (ms) => new Promise((r) => setTimeout(r, fast || reduceMotion ? Math.min(ms, 20) : ms));
const scrollDown = () => { $term.scrollTop = $term.scrollHeight; };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

$term.addEventListener("click", (e) => {
  if (!e.target.closest("button, input")) fast = true;
});

function newLine(cls = "") {
  const el = document.createElement("div");
  el.className = "line " + cls;
  $out.appendChild(el);
  return el;
}

function print(text, cls = "") {
  const el = newLine(cls);
  el.textContent = text;
  scrollDown();
  return el;
}

async function type(text, cls = "", speed = CONFIG.typingSpeed) {
  const el = newLine(cls);
  if (fast || reduceMotion) { el.textContent = text; scrollDown(); return el; }
  el.classList.add("typing");
  const chars = Array.from(text);
  for (let i = 0; i < chars.length; i++) {
    if (fast) { el.textContent = text; break; }
    el.textContent += chars[i];
    if (i % 4 === 0) scrollDown();
    await new Promise((r) => setTimeout(r, speed));
  }
  el.classList.remove("typing");
  scrollDown();
  return el;
}

function addScores(fx = {}) {
  for (const [k, v] of Object.entries(fx)) state.scores[k] = (state.scores[k] || 0) + v;
}

function clearInput() {
  $input.innerHTML = "";
  document.onkeydown = null;
}

function readyForInput() {
  fast = false;
  $status.textContent = "waiting for input…";
  scrollDown();
}

/* ---------- input widgets ---------- */
function askChoice(options) {
  return new Promise((resolve) => {
    readyForInput();
    const wrap = document.createElement("div");
    wrap.className = "options";
    options.forEach((opt, i) => {
      const b = document.createElement("button");
      b.className = "opt";
      b.innerHTML = `<span class="key">[${i + 1}]</span>${esc(opt.label)}${opt.hint ? `<span class="hint">// ${esc(opt.hint)}</span>` : ""}`;
      b.onclick = () => { clearInput(); resolve(opt); };
      wrap.appendChild(b);
    });
    $input.appendChild(wrap);
    document.onkeydown = (e) => {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= options.length) { clearInput(); resolve(options[n - 1]); }
    };
    scrollDown();
  });
}

function askMulti(options) {
  return new Promise((resolve) => {
    readyForInput();
    const picked = new Set();
    const wrap = document.createElement("div");
    wrap.className = "chips";
    options.forEach((opt) => {
      const b = document.createElement("button");
      b.className = "opt";
      b.setAttribute("aria-pressed", "false");
      const render = () => { b.innerHTML = `<span class="key">${picked.has(opt) ? "[x]" : "[ ]"}</span>${esc(opt.label)}`; };
      render();
      b.onclick = () => {
        picked.has(opt) ? picked.delete(opt) : picked.add(opt);
        b.classList.toggle("checked", picked.has(opt));
        b.setAttribute("aria-pressed", String(picked.has(opt)));
        render();
      };
      wrap.appendChild(b);
    });
    const run = document.createElement("button");
    run.className = "run";
    run.textContent = "▶ npm install";
    const errLine = document.createElement("div");
    errLine.className = "line err";
    run.onclick = () => {
      if (picked.size === 0) {
        errLine.textContent = "ERR! cannot import from an empty module. Pick at least one 🙂";
        return;
      }
      clearInput();
      resolve([...picked]);
    };
    $input.append(wrap, run, errLine);
    scrollDown();
  });
}

const CPU_LABELS = [
  [15, "idle process 😴 — couch, snacks, no plans"],
  [35, "low power mode 🔋 — something chill"],
  [60, "balanced ⚖️ — a little of everything"],
  [85, "turbo boost 🚀 — let's do stuff"],
  [101, "OVERCLOCKED 🔥 — fan noises intensify"],
];
const cpuLabel = (v) => CPU_LABELS.find(([max]) => v < max)[1];

function askSlider() {
  return new Promise((resolve) => {
    readyForInput();
    const wrap = document.createElement("div");
    wrap.className = "slider-wrap";
    wrap.innerHTML = `
      <input type="range" min="0" max="100" value="50" aria-label="Energy level" />
      <div class="slider-label"></div>`;
    const range = wrap.querySelector("input");
    const label = wrap.querySelector(".slider-label");
    const update = () => { label.textContent = `CPU: ${range.value}%  →  ${cpuLabel(+range.value)}`; };
    range.oninput = update;
    update();
    const run = document.createElement("button");
    run.className = "run";
    run.textContent = "▶ apply";
    run.onclick = () => { clearInput(); resolve(+range.value); };
    $input.append(wrap, run);
    scrollDown();
  });
}

function askText(ps1, placeholder, { allowEmpty = true } = {}) {
  return new Promise((resolve) => {
    readyForInput();
    const row = document.createElement("div");
    row.className = "prompt-row";
    row.innerHTML = `<span class="ps1">${esc(ps1)}</span><input type="text" maxlength="280" autocomplete="off" autocapitalize="off" spellcheck="false" />`;
    const input = row.querySelector("input");
    input.placeholder = placeholder;
    const run = document.createElement("button");
    run.className = "run";
    run.textContent = "↵ enter";
    const submit = () => {
      const v = input.value.trim();
      if (!v && !allowEmpty) { input.focus(); return; }
      clearInput();
      resolve(v);
    };
    input.onkeydown = (e) => { if (e.key === "Enter") submit(); };
    run.onclick = submit;
    $input.append(row, run);
    input.focus({ preventScroll: true });
    scrollDown();
  });
}

/* ==========================================================
   the show
   ========================================================== */
async function boot() {
  const logo = newLine("logo");
  logo.textContent = "date_planner.exe";
  await wait(300);
  await type("$ ./date_planner --mode=fun --pressure=none", "code");
  await wait(250);
  const steps = [
    ["loading charm.dll", "ok"],
    ["checking coffee levels", "ok"],
    ["scanning for compatible humans", "1 found 👀"],
    ["calibrating humor module", "mostly ok"],
  ];
  for (const [what, res] of steps) {
    const el = print(`[    ] ${what}...`, "comment");
    await wait(350);
    el.innerHTML = `<span class="ok">[ OK ]</span> <span class="comment">${esc(what)}...</span> <span class="ok">${esc(res)}</span>`;
  }
  await wait(250);
  print("");
  await type("Hi! 👋 You've been selected for a very official, very scientific", "pink");
  await type(`date-planning questionnaire. ${QUESTIONS.length} questions. No wrong answers.`, "pink");
  await type("(Okay, some wrong answers. You'll know them when you see them.)", "comment");
  print("");
}

async function askName() {
  await type("First, please authenticate.", "code");
  while (true) {
    const name = await askText("login:", "your name", { allowEmpty: false });
    print(name, "you");
    const lower = name.toLowerCase();
    if (["root", "admin", "sudo", "administrator"].includes(lower)) {
      await type("Permission denied. Nice try, hacker 😏 Real name please.", "err");
      continue;
    }
    if (CONFIG.herName && lower === CONFIG.herName.toLowerCase()) {
      await type(`Access granted. Welcome, ${name}. I was really hoping it'd be you. 💖`, "ok");
    } else {
      await type(`Access granted. Welcome, ${name}. Session started. ✨`, "ok");
    }
    return name;
  }
}

async function runQuestion(q, i, total) {
  $progress.textContent = `q ${i + 1}/${total}`;
  print("", "spacer");
  for (const [n, p] of q.prompt.entries()) await type(p, n === 0 ? "comment" : "code");

  if (q.type === "choice") {
    const opt = await askChoice(q.options);
    print(opt.label, "you");
    addScores(opt.fx);
    if (opt.set) Object.assign(state, opt.set);
    state.answers.push([q.label, opt.label]);
    await wait(200);
    await type(opt.reply, "reply");
  }

  if (q.type === "slider") {
    const v = await askSlider();
    print(`${v}% — ${cpuLabel(v)}`, "you");
    state.energy = v;
    if (v >= 60) addScores({ active: Math.round((v - 50) / 15), adventure: 1 });
    else if (v <= 40) addScores({ cozy: Math.round((50 - v) / 12) });
    state.answers.push([q.label, `${v}% (${cpuLabel(v).split(" —")[0]})`]);
    await wait(200);
    const reply =
      v < 15 ? "A fellow believer in the sacred art of doing nothing. Beautiful." :
      v < 35 ? "Chill mode engaged. Low stress, high quality." :
      v < 60 ? "Perfectly balanced, as all things should be." :
      v < 85 ? "Okay okay, let's actually go do something! 🚀" :
               "Warning: I may need to start training for this date. 😅";
    await type(reply, "reply");
  }

  if (q.type === "multi") {
    const picks = await askMulti(q.options);
    print(`import { ${picks.map((p) => p.label).join(", ")} }`, "you");
    picks.forEach((p) => { addScores(p.fx); state.interests.push(p.label); });
    state.answers.push([q.label, picks.map((p) => p.label).join(", ")]);
    await wait(200);
    await type(`added ${picks.length} package${picks.length > 1 ? "s" : ""}, found 0 vulnerabilities`, "ok");
    await type(picks.length >= 6 ? "Okay, well-rounded human detected. Noted ALL of that." : "Great taste. Writing this down. Literally.", "reply");
  }

  if (q.type === "text") {
    const v = await askText(">", "type here, or just hit enter");
    state.note = v;
    if (v) {
      print(v, "you");
      state.answers.push(["note", v]);
      await type("Comment saved. The developer will read it very carefully. 📝", "reply");
    } else {
      print("(skipped)", "you");
      await type("No comment. Mysterious. I respect it.", "reply");
    }
  }
  await wait(350);
}

async function compile() {
  $progress.textContent = "build";
  $status.textContent = "compiling…";
  print("", "spacer");
  await type("$ npm run build-date", "code");
  const lines = [
    ["> resolving dependencies...", "comment"],
    ["> optimizing for maximum fun...", "comment"],
    ["warning: charm levels exceed recommended limits", "warn"],
    [`> running tests... ${QUESTIONS.length} passed, 0 failed`, "ok"],
  ];
  for (const [t, c] of lines) { await wait(450); print(t, c); }
  const bar = print("", "purple");
  for (let p = 0; p <= 20; p++) {
    bar.textContent = `[${"█".repeat(p)}${"░".repeat(20 - p)}] ${p * 5}%`;
    await wait(55);
  }
  await wait(300);
  print("✔ BUILD SUCCESSFUL — 0 errors, 1 warning (too much charm)", "ok");
}

/* ---------- results ---------- */
function pickIdeas() {
  const scored = IDEAS.map((idea) => {
    let s = 0;
    for (const t of idea.tags) {
      if (state.scores[t] !== undefined) s += state.scores[t];
      if (state.interests.includes(t)) s += 3;
    }
    if (idea.time && state.time && idea.time.includes(state.time)) s += 2;
    if (idea.time && state.time && !idea.time.includes(state.time)) s -= 2;
    if (idea.social && state.social && state.social !== "any") s += idea.social === state.social ? 2 : -2;
    if (idea.competitive && state.competitive) s += 2;
    s += Math.random() * 1.5; // a little spice so it isn't always identical
    return { ...idea, s };
  });
  return scored.sort((a, b) => b.s - a.s).slice(0, 3);
}

function buildSummary(profile, ideas, food) {
  const lines = [
    `💌 date_planner results for ${state.name}`,
    `type: ${profile.title}`,
    "",
    ...state.answers.map(([k, v]) => `• ${k}: ${v}`),
    "",
    "recommended dates:",
    ...ideas.map((d, i) => `${i + 1}. ${d.name}`),
    `fuel: ${food}`,
  ];
  return lines.join("\n");
}

function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1800);
}

function hearts() {
  if (reduceMotion) return;
  const emojis = ["💖", "💕", "✨", "💌", "🌸"];
  for (let i = 0; i < 28; i++) {
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

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}

function showResults() {
  const top = Object.entries(state.scores).sort((a, b) => b[1] - a[1]);
  const profile = PROFILES[top[0][0]];
  const max = Math.max(1, top[0][1]);
  const ideas = pickIdeas();
  const food = FOOD_PICKS[state.food || "any"];
  const where = CONFIG.city ? ` in ${CONFIG.city}` : "";
  const summary = buildSummary(profile, ideas, food);

  const bars = top
    .map(([k, v]) => {
      const n = Math.round((Math.max(0, v) / max) * 12);
      return `<span class="name">${k}</span><span class="bar">${"█".repeat(n)}<span>${"░".repeat(12 - n)}</span></span><span class="pct">${Math.round((Math.max(0, v) / max) * 100)}%</span>`;
    })
    .join("");

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="tag">// date profile for ${esc(state.name)}</div>
    <h2>${esc(profile.title)}</h2>
    <p>${esc(profile.desc)}</p>

    <h3>&gt; trait_analysis</h3>
    <div class="bars">${bars}</div>

    <h3>&gt; recommended_dates${esc(where)}</h3>
    <ul class="ideas">
      ${ideas.map((d) => `<li><b>${esc(d.name)}</b><small>// ${esc(d.why)}</small></li>`).join("")}
      <li><b>${esc(food)}</b><small>// fuel, because we're not debugging on an empty stomach</small></li>
    </ul>

    <h3>&gt; next_steps</h3>
    <p>Send these results to ${esc(CONFIG.myName)} and let the planning begin. No pressure. (Some pressure. ${esc(CONFIG.myName)} is very excited.)</p>

    <div class="actions">
      <button class="run" id="copy">📋 copy results</button>
      <button class="run secondary" id="text">💬 text it to ${esc(CONFIG.myName)}</button>
      <button class="run ghost" id="again">↻ run again</button>
    </div>`;
  $input.appendChild(card);

  card.querySelector("#copy").onclick = async () => {
    toast((await copyText(summary)) ? "copied to clipboard ✔" : "couldn't copy — try a screenshot 📸");
  };
  card.querySelector("#text").onclick = async () => {
    await copyText(summary);
    const sep = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent) ? "&" : "?";
    window.location.href = `sms:${CONFIG.myPhone}${sep}body=${encodeURIComponent(summary)}`;
  };
  card.querySelector("#again").onclick = () => window.location.reload();

  $progress.textContent = "done ✔";
  $status.textContent = "process exited with code 0 (and a smile)";
  hearts();
  setTimeout(() => card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }), 100);
}

async function main() {
  await boot();
  state.name = await askName();
  for (const [i, q] of QUESTIONS.entries()) await runQuestion(q, i, QUESTIONS.length);
  await compile();
  showResults();
}

main();
