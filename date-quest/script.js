/* ==========================================================
   Date #2 invitation
   ----------------------------------------------------------
   ✏️  EDIT THIS BLOCK to personalize the site.
   ========================================================== */
const CONFIG = {
  myName: "Brian",
  herName: "Kayler",
  myPhone: "+14694346426",           // the Send button opens a text to this number
  when: "Tuesday, Nov 24 · 7:00pm",
  theme: "retro",
  // Optional: free key from https://web3forms.com to ALSO get an email when she taps Send.
  web3formsKey: "",
};

/* ---------- your date ideas (she picks one) ----------
   meme formats: ["cap", emoji, top, bottom] · ["drake", nah, yeah]
                 ["nobody", who, what] · ["me", me, alsoMe] · ["brain", [a, b, c]]  */
const IDEAS = [
  { emo: "⛸️", name: "Ice skating + dairy-free hot chocolate", why: "I'll hold onto the wall. You hold the cocoa. 100% dairy-free, 0% graceful.",
    meme: ["cap", "⛸️😬", "me on the ice", "a baby deer, but taller"] },
  { emo: "🍣", name: "Homemade sushi + Zelda", why: "We roll sushi (badly), then save Hyrule (also badly).",
    meme: ["cap", "🗡️🍣", "it's dangerous to go alone!", "take this 🍣"] },
  { emo: "🕹️", name: "Arcade + dairy-free dessert", why: "Loser buys dessert. Dairy-free, because I pay attention.",
    meme: ["nobody", "Me after winning ONE round of air hockey:", "\"so I'm basically a pro now\" 🕹️"] },
];
const SURPRISE = { emo: "🎲", name: "Surprise me", why: "Trust the process. (The process is me.)",
  meme: ["me", "\"Surprise me\"", "*is already planning 4 backup plans*"] };
const OTHER = { emo: "💡", name: "I have a better idea", why: "Tell me. I'm listening. Very open-minded.",
  meme: ["cap", "📝🤓", "new feature request", "has entered the chat"] };



/* ---------- themes ---------- */
const THEMES = {
  retro: {
    label: "👾 Retro",
    eyebrow: "⭐ bonus level ⭐",
    title: "Will you go on a date with me?",
    sub: "Choose wisely. There's only one correct answer. (No continues.)",
    meme: ["Me waiting for you", "🐱", "to press yes"],
    memeImg: "cat-meme.jpg",
    yes: "♥ Yes, I'd love to",
    no: ["No", "Last chance", "GAME OVER?", "Insert coin to say no 🪙", "Wrong button combo", "Glitch detected 👾",
      "Error: 'No' not found", "Respawning…", "Press A for yes", "Cheat code: ↑↑↓↓ YES", "Player 2 can't escape"],
    yay: "⭐",
  },
};
const theme = () => THEMES.retro;

/* per-theme screens: pop-up, picker, ticket, final screen, confetti, moving background */
const THEME_SCREENS = {
  retro: {
    opener: { eyebrow: "🎮 Player 2 detected", btn: "▶ Press start" },
    popup: { badge: "⭐ LEVEL UP! ⭐", head: "Yay! 💖", extra: "+1000 XP · Achievement: Said Yes 🏆", btn: "▶ Continue" },
    pick: { eyebrow: "🕹️ Select your quest · Date #2", title: "Choose your quest.", sub: "Three quests. One Player 2 (you). Choose wisely.",
      next: "▶ Start quest", badges: ["⭐ Easy", "⭐⭐ Normal", "⭐⭐⭐ Hard"] },
    ticket: { heading: "Here's your save file.", left: "SAVE FILE 01", right: "P1 + P2", fine: "Progress saved. Snacks count as power-ups." },
    done: { emo: "🏆", head: "Quest accepted!", bye: "See you Tuesday, Player 2 💖" },
    sms: "🎮",
    confetti: ["⭐", "💖", "🪙", "👾", "✨"],
    ambient: { chars: ["✦", "+", "·", "✧"], dir: "twinkle", count: 46 },
  },
};
const screens = () => THEME_SCREENS.retro;


function applyTheme() {
  document.documentElement.dataset.theme = CONFIG.theme;
  document.querySelectorAll(".ambient").forEach((n) => n.remove());
  if (reduceMotion) return;
  const { chars, dir, count } = screens().ambient;
  const box = document.createElement("div");
  box.className = `ambient ${dir}`;
  box.setAttribute("aria-hidden", "true");
  for (let i = 0; i < count; i++) {
    const f = document.createElement("i");
    f.textContent = chars[i % chars.length];
    f.style.left = Math.random() * 100 + "vw";
    if (dir === "twinkle") f.style.top = Math.random() * 100 + "vh";
    f.style.fontSize = 9 + Math.random() * 13 + "px";
    f.style.animationDuration = 8 + Math.random() * 9 + "s";
    f.style.animationDelay = -Math.random() * 17 + "s";
    box.appendChild(f);
  }
  document.body.prepend(box);
}


/* ==========================================================
   app
   ========================================================== */
const $screen = document.getElementById("screen");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const state = { noAttempts: 0, pick: null, otherIdea: "", note: "" };

function render(html) {
  $screen.innerHTML = html;
  $screen.style.animation = "none";
  void $screen.offsetWidth;
  $screen.style.animation = "";
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}

function memeHTML(m) {
  if (!m) return "";
  const [t, a, b, c] = m;
  if (t === "cap") return `<div class="meme cap"><div class="mtop">${esc(b)}</div><div class="memo">${a}</div><div class="mbot">${esc(c)}</div></div>`;
  if (t === "drake") return `<div class="meme drake">
      <div class="dr no"><span class="dface">🙅</span><span>${esc(a)}</span></div>
      <div class="dr yes"><span class="dface">😌👉</span><span>${esc(b)}</span></div></div>`;
  if (t === "nobody") return `<div class="meme tweet"><div class="who"><span class="av">💌</span><b>Very Real Tweet</b> <span class="handle">@date2</span></div>
      <p>Nobody:</p><p>Absolutely nobody:</p><p>${esc(a)} ${esc(b)}</p></div>`;
  if (t === "me") return `<div class="meme tweet"><p><b>Me:</b> ${esc(a)}</p><p><b>Also me:</b> ${esc(b)}</p></div>`;
  if (t === "brain") return `<div class="meme brain">${a.map((line, i) => `<div class="br lvl${i}"><span>${esc(line)}</span><span class="bemo">${["🧠", "🧠✨", "🤯🌌"][i]}</span></div>`).join("")}</div>`;
  return "";
}

/* ---------- 0. opening page ---------- */
function showOpener() {
  render(`
    <div class="ask opener">
      ${screens().opener ? `<p class="eyebrow">${esc(screens().opener.eyebrow)}</p>` : ""}
      <h1>Hey ${esc(CONFIG.herName || "you")},<br />a small question…</h1>
      <img class="puppy" src="puppy.webp" alt="A very hopeful puppy" width="360" height="480" />
      <div class="row" style="justify-content:center">
        <button class="btn big${screens().opener ? " blink" : ""}" id="what">${esc(screens().opener ? screens().opener.btn : "What is it? 👀")}</button>
      </div>
    </div>`);
  document.getElementById("what").onclick = showAsk;
}

/* ---------- 1. the ask ---------- */
function showAsk() {
  const t = theme();
  render(`
    <div class="ask">
      <p class="eyebrow">${esc(t.eyebrow)}</p>
      <h1>${esc(t.title)}</h1>
      <p class="sub">${esc(t.sub)}</p>
      ${t.memeImg
        ? `<img class="meme-photo meme-img" src="${t.memeImg}" alt="Meme: a wide-eyed cat. ${esc(t.meme[0])} ${esc(t.meme[2])}" width="440" height="443" />`
        : `<div class="meme-photo" role="img" aria-label="Meme: ${esc(t.meme[0])} ${esc(t.meme[2])}">
        <span>${esc(t.meme[0])}</span><span class="cat${[...t.meme[1]].length > 2 ? " multi" : ""}">${t.meme[1]}</span><span>${esc(t.meme[2])}</span>
      </div>`}
      <div class="ask-btns">
        <button class="btn big" id="yes">${esc(t.yes)}</button>
        <button class="btn no-btn" id="no">No</button>
      </div>
      <p class="tries" id="tries"></p>
    </div>`);
  const yes = document.getElementById("yes");
  const no = document.getElementById("no");
  const tries = document.getElementById("tries");
  let last = 0;

  const dodge = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (Date.now() - last < 250) return; // one tap fires pointerdown + click; count it once
    last = Date.now();
    const n = ++state.noAttempts;
    if (no.parentElement !== document.body) {   // let it roam the whole screen
      const r = no.getBoundingClientRect();
      document.body.appendChild(no);
      no.classList.add("runaway");
      no.style.left = r.left + "px";
      no.style.top = r.top + "px";
    }
    no.textContent = theme().no[Math.min(n, theme().no.length - 1)];
    const w = no.offsetWidth, h = no.offsetHeight, pad = 16;
    const px = e && e.clientX !== undefined ? e.clientX : innerWidth / 2;
    const py = e && e.clientY !== undefined ? e.clientY : innerHeight / 2;
    const yr = yes.getBoundingClientRect();
    let x = pad, y = pad;
    for (let i = 0; i < 30; i++) {
      x = pad + Math.random() * Math.max(1, innerWidth - w - pad * 2);
      y = pad + Math.random() * Math.max(1, innerHeight - h - pad * 2);
      const far = Math.hypot(x + w / 2 - px, y + h / 2 - py) > 140;
      const offYes = x + w < yr.left - 8 || x > yr.right + 8 || y + h < yr.top - 8 || y > yr.bottom + 8;
      if (far && offYes) break;
    }
    no.style.left = x + "px";
    no.style.top = y + "px";
    yes.style.transform = `scale(${Math.min(1 + n * 0.08, 1.7)})`;
    tries.textContent = n < 3 ? "" : `Attempts to say no: ${n}. Impressive persistence. Wrong direction, though.`;
  };
  no.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") dodge(e); });
  no.addEventListener("pointerdown", dodge);
  no.addEventListener("click", dodge);

  yes.onclick = () => { no.remove(); showYay(); };
}

/* ---------- 2. yay ---------- */
function showYay() {
  hearts();
  const m = document.createElement("div");
  m.className = "modal-bg";
  m.innerHTML = `
    <div class="modal modal-${CONFIG.theme}" role="dialog" aria-modal="true" aria-labelledby="yay">
      ${screens().popup.badge ? `<div class="m-badge">${esc(screens().popup.badge)}</div>` : ""}
      <div class="big-emoji">${theme().yay}</div>
      <h2 id="yay">${esc(screens().popup.head)}</h2>
      <p class="small" style="font-size:17px;color:var(--ink)">I'm so glad u said yes 🥰</p>
      ${screens().popup.extra ? `<p class="m-extra">${esc(screens().popup.extra)}</p>` : ""}
      <button class="btn" id="cont">${esc(screens().popup.btn)}</button>
    </div>`;
  document.body.appendChild(m);
  const btn = m.querySelector("#cont");
  btn.focus();
  btn.onclick = () => { m.remove(); showPick(); };
}

/* ---------- 3. pick an idea ---------- */
function showPick() {
  const all = [...IDEAS, SURPRISE, OTHER];
  render(`
    <p class="eyebrow">${esc(screens().pick.eyebrow)} · ${esc(CONFIG.when)}</p>
    <h2>${esc(screens().pick.title)}</h2>
    <p class="sub">${esc(screens().pick.sub)}</p>
    <div class="options">${all.map((o, i) => `
      <button class="opt" data-i="${i}">
        <span class="emo">${o.emo}</span>
        <span class="txt">${screens().pick.badges[i] ? `<span class="diff">${esc(screens().pick.badges[i])}</span>` : ""}${esc(o.name)}<span class="hint">${esc(o.why)}</span></span>
      </button>`).join("")}
    </div>
    <div id="other-wrap" hidden>
      <input id="other" class="field" type="text" maxlength="160" placeholder="Your idea (I'm already excited)" style="margin-top:12px" />
    </div>
    <div id="meme"></div>
    <label class="eyebrow" for="note" style="display:block;margin-top:22px">Anything I should know? (optional)</label>
    <textarea id="note" class="field" rows="2" maxlength="300" placeholder="When you get off work, cravings, hot takes…"></textarea>
    <div class="row end"><button class="btn" id="next" disabled>${esc(screens().pick.next)}</button></div>
  `);
  const opts = [...$screen.querySelectorAll(".opt")];
  const btn = document.getElementById("next");
  const otherWrap = document.getElementById("other-wrap");
  const other = document.getElementById("other");
  const memeBox = document.getElementById("meme");
  const note = document.getElementById("note");
  note.value = state.note;
  other.value = state.otherIdea;

  const valid = () => state.pick && (state.pick !== OTHER || other.value.trim());
  const select = (i) => {
    state.pick = all[i];
    opts.forEach((o, j) => o.classList.toggle("selected", i === j));
    otherWrap.hidden = state.pick !== OTHER;
    memeBox.innerHTML = memeHTML(state.pick.meme);
    btn.disabled = !valid();
    if (state.pick === OTHER) other.focus();
  };
  opts.forEach((o, i) => (o.onclick = () => {
    select(i);
    if (state.pick !== OTHER) setTimeout(() => memeBox.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" }), 80);
  }));
  other.oninput = () => { state.otherIdea = other.value; btn.disabled = !valid(); };
  if (state.pick) select(all.indexOf(state.pick));
  btn.onclick = () => {
    state.note = note.value.trim();
    state.otherIdea = other.value.trim();
    showTicket();
  };
}

/* ---------- 4. ticket + send ---------- */
const activity = () => (state.pick === OTHER ? state.otherIdea : state.pick.name);

function showTicket() {
  render(`
    <p class="eyebrow">Almost done</p>
    <h2>${esc(screens().ticket.heading)}</h2>
    <div class="ticket ticket-${CONFIG.theme}">
      <div class="t-top"><span>${esc(screens().ticket.left)}</span><span>${esc(screens().ticket.right)}</span></div>
      <div class="t-emo">${state.pick.emo}</div>
      <div class="t-name">${esc(activity())}</div>
      <div class="t-when">${esc(CONFIG.when)}</div>
      ${state.note ? `<div class="t-note">“${esc(state.note)}”</div>` : ""}
      <div class="t-fine">${esc(screens().ticket.fine)}</div>
    </div>
    <p class="sub" style="margin-top:18px">Tap below and a text to ${esc(CONFIG.myName)} pops up, already written. Just hit send. ${esc(CONFIG.myName)} will act cool about it. ${esc(CONFIG.myName)} will not be cool about it.</p>
    <div class="row">
      <button class="btn" id="send">${screens().sms} Send to ${esc(CONFIG.myName)}</button>
      <button class="btn ghost" id="back">← Change pick</button>
    </div>
    <p class="error" id="err"></p>
  `);
  document.getElementById("back").onclick = showPick;
  document.getElementById("send").onclick = send;
}

function summaryText() {
  return [
    `${screens().sms} I said YES to date #2!`,
    ``,
    `When: ${CONFIG.when}`,
    `We're doing: ${activity()}`,
    `Note: ${state.note || "(none)"}`,
    `Times I tried to press "No": ${state.noAttempts} ${state.noAttempts ? "(it ran away 🙄)" : "(zero. obviously.)"}`,
  ].join("\n");
}

function smsLink() {
  const sep = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent) ? "&" : "?";
  return `sms:${CONFIG.myPhone}${sep}body=${encodeURIComponent(summaryText())}`;
}

async function send() {
  // optional email copy; never blocks the text
  if (CONFIG.web3formsKey) {
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: CONFIG.web3formsKey,
        subject: `💌 Date #2: ${activity()}`,
        from_name: "Date #2 Invitation",
        message: summaryText(),
      }),
    }).catch(() => {});
  }
  showDone();
  window.location.href = smsLink();
}

function showDone() {
  hearts();
  render(`
    <div class="ask">
      <div class="big-emoji">${screens().done.emo}</div>
      <h1>${esc(screens().done.head)}</h1>
      <p class="sub">Your text to ${esc(CONFIG.myName)} is ready in Messages. Hit send and ${esc(CONFIG.myName)} will begin a very embarrassing happy dance.</p>
      <div class="when">🎟️ ${esc(activity())}<br />🗓️ ${esc(CONFIG.when)}</div>
      <p class="sub">Messages didn't open?</p>
      <div class="row" style="justify-content:center">
        <a class="btn" href="${esc(smsLink())}">💬 Open Messages</a>
        <button class="btn soft" id="copy">Copy text</button>
      </div>
      <p class="error" id="err"></p>
      <p class="sub" style="margin-top:22px">${esc(screens().done.bye)}</p>
    </div>
  `);
  document.getElementById("copy").onclick = async () => {
    document.getElementById("err").textContent = (await copyText(summaryText()))
      ? "Copied! Paste it in a text to " + CONFIG.myName + " 💬"
      : "Couldn't copy. A screenshot works too 📸";
  };
}

/* ---------- helpers ---------- */
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
  const emojis = screens().confetti;
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

applyTheme();
showOpener();
