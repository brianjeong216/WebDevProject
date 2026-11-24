/* ==========================================================
   Survey → envelope → letter → send answers to Brian
   ✏️  Edit this block to change what the letter says.
   ========================================================== */
const INVITE = {
  herName: "Kayler",
  myName: "Brian",
  myPhone: "+14694346426",
  when: "Tonight",
  pickup: "6:30 PM",
  pickupWhere: "your place",
};

const QUESTIONS = [
  { key: "movie", q: "What's your favorite movie?", placeholder: "Type your answer…", note: "There are no wrong answers. (There are some wrong answers.)" },
  { key: "snack", q: "What's your favorite snack?", placeholder: "Type your answer…", note: "This information is highly classified and will be used responsibly." },
  { key: "wyr", q: "Would you rather have hair for teeth or teeth for hair?", placeholder: "Or explain yourself…", note: "Choose carefully. This one says a lot about a person.",
    choices: ["🦷 Hair for teeth", "💇 Teeth for hair"] },
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const answers = {};

/* ---------- scenery ---------- */
(function scenery() {
  const lights = document.querySelector(".lights");
  const colors = ["#ffd36b", "#ff6b6b", "#7ee08a", "#6bb8ff", "#ffa94d"];
  const n = Math.max(8, Math.round(window.innerWidth / 38));
  for (let i = 0; i < n; i++) {
    const b = document.createElement("i");
    const c = colors[i % colors.length];
    b.style.background = c;
    b.style.boxShadow = `0 0 10px 3px ${c}88`;
    b.style.animationDelay = (i % 5) * 0.45 + "s";
    b.style.marginTop = 14 + Math.sin((i / (n - 1)) * Math.PI) * 14 + "px";
    lights.appendChild(b);
  }
  if (reduceMotion) return;
  const snow = document.querySelector(".snow");
  for (let i = 0; i < 60; i++) {
    const f = document.createElement("i");
    const size = 2 + Math.random() * 4;
    f.style.width = f.style.height = size + "px";
    f.style.left = Math.random() * 100 + "vw";
    f.style.opacity = 0.35 + Math.random() * 0.6;
    f.style.animationDuration = 7 + Math.random() * 10 + "s";
    f.style.animationDelay = -Math.random() * 17 + "s";
    snow.appendChild(f);
  }
})();

const $survey = document.getElementById("survey");
const $intro = document.getElementById("intro");
const $letter = document.getElementById("letter");
const $stage = document.querySelector(".stage");

/* ---------- 1. survey, one question at a time ---------- */
function showQuestion(i) {
  const Q = QUESTIONS[i];
  const pct = Math.round((i / QUESTIONS.length) * 100);
  $survey.innerHTML = `
    <div class="sheet pop">
      <div class="sheet-head">
        <span>📋 Quick survey</span>
        <span>Question ${i + 1} of ${QUESTIONS.length}</span>
      </div>
      <div class="meter"><i style="width:${pct}%"></i></div>
      <label class="q" for="ans">${esc(Q.q)}</label>
      ${Q.choices ? `<div class="choices">${Q.choices.map((c) => `<button type="button" class="choice">${esc(c)}</button>`).join("")}</div>` : ""}
      <input id="ans" class="field" type="text" maxlength="140" autocomplete="off" placeholder="${esc(Q.placeholder)}" />
      <p class="fine">${esc(Q.note)}</p>
      <div class="sheet-actions">
        ${i > 0 ? `<button type="button" class="btn ghost" id="back">← Back</button>` : "<span></span>"}
        <button type="button" class="btn" id="next" disabled>${i === QUESTIONS.length - 1 ? "Submit" : "Next →"}</button>
      </div>
    </div>`;
  const input = document.getElementById("ans");
  const next = document.getElementById("next");
  const chips = [...$survey.querySelectorAll(".choice")];
  let picked = answers[Q.key + "_pick"] || "";
  input.value = answers[Q.key + "_text"] || "";
  const sync = () => {
    answers[Q.key + "_pick"] = picked;            // keep what she typed if she goes back
    answers[Q.key + "_text"] = input.value;
    chips.forEach((c) => c.classList.toggle("on", c.textContent === picked));
    next.disabled = !(picked || input.value.trim());
  };
  chips.forEach((c) => (c.onclick = () => { picked = picked === c.textContent ? "" : c.textContent; sync(); }));
  input.oninput = sync;
  input.onkeydown = (e) => { if (e.key === "Enter" && !next.disabled) next.click(); };
  next.onclick = () => {
    const text = input.value.trim();
    answers[Q.key + "_pick"] = picked;
    answers[Q.key + "_text"] = text;
    answers[Q.key] = picked && text ? `${picked} (${text})` : picked || text;
    i + 1 < QUESTIONS.length ? showQuestion(i + 1) : showThanks();
  };
  const back = document.getElementById("back");
  if (back) back.onclick = () => showQuestion(i - 1);
  sync();
  if (!Q.choices) setTimeout(() => input.focus({ preventScroll: true }), 250);
}

function showThanks() {
  $survey.innerHTML = `
    <div class="sheet pop thanks">
      <div class="meter"><i style="width:100%"></i></div>
      <div class="check">✓</div>
      <h2>Thank you for completing our survey!</h2>
      <p>Your responses have been recorded.</p>
      <p class="fine">(They will be carefully analyzed by a team of one.)</p>
      <p class="incoming">✉️ Incoming mail…</p>
    </div>`;
  setTimeout(showEnvelope, reduceMotion ? 300 : 2600);
}

/* ---------- 2. envelope ---------- */
const env = document.getElementById("envelope");
const tap = document.getElementById("tap");
let opened = false;

function showEnvelope() {
  if (!$intro.hidden) return;
  $survey.hidden = true;
  $intro.hidden = false;
  $intro.classList.add("arrive");
}

env.addEventListener("click", () => {
  if (opened) return;
  opened = true;
  tap.textContent = "Opening…";
  const t = reduceMotion ? 0 : 1;
  env.classList.add("opening");
  $intro.classList.add("opening");
  setTimeout(() => env.classList.add("pulling"), 650 * t);
  setTimeout(() => $intro.classList.add("gone"), 1700 * t);
  setTimeout(showLetter, 2150 * t);
});

/* ---------- 3. letter + survey results + send ---------- */
const resultData = () => ({ m: answers.movie || "", s: answers.snack || "", w: answers.wyr || "", t: Date.now() });

function resultsCardHTML(d, title) {
  const done = d.t ? new Date(d.t).toLocaleString([], { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "";
  return `
    <div class="results" id="results">
      <p class="r-kicker">📋 Survey results</p>
      <h3>${esc(title)}</h3>
      <div class="r-row"><span>🎬 Favorite movie</span><b>${esc(d.m || "—")}</b></div>
      <div class="r-row"><span>🍿 Favorite snack</span><b>${esc(d.s || "—")}</b></div>
      <div class="r-row"><span>🤔 Hair for teeth or teeth for hair?</span><b>${esc(d.w || "—")}</b></div>
      <p class="r-foot">✉️ Invite opened · See you at ${esc(INVITE.pickup)}${done ? ` · ${esc(done)}` : ""}</p>
    </div>`;
}

function showLetter() {
  $intro.hidden = true;
  $stage.classList.add("reading");
  $letter.innerHTML = `
    <p class="to">Dear ${esc(INVITE.herName)},</p>
    <p class="lead">You said <i>"surprise me."</i> Challenge accepted. 😏 Here's everything you're allowed to know:</p>

    <div class="details">
      <div class="row"><span class="ic">🗓️</span><span><b>When</b>${esc(INVITE.when)}</span></div>
      <div class="row"><span class="ic">🚗</span><span><b>Pickup</b>${esc(INVITE.pickup)} at ${esc(INVITE.pickupWhere)}</span></div>
      <div class="row"><span class="ic">📍</span><span><b>Where</b><span class="classified">top secret place</span><small>(classified)</small></span></div>
      <div class="row"><span class="ic">🌙</span><span><b>Tonight's forecast</b>Chilly, with temps in the 30s all night.</span></div>
      <div class="row"><span class="ic">🧣</span><span><b>Dress code</b>Cozy and warm, something you can move in.</span></div>
      <div class="row"><span class="ic">✨</span><span><b>Also</b>Look cute. (Easy for you.)</span></div>
      <div class="row"><span class="ic">🍫</span><span><b>Treats</b>Save some room for treats.</span></div>
    </div>

    <p class="sign">See you soon,<br />${esc(INVITE.myName)}</p>
    <p class="ps">P.S. No more hints. I've already said too much.</p>

    ${resultsCardHTML(resultData(), `${INVITE.herName}'s answers`)}

    <div class="actions">
      <a class="btn" id="send" href="${esc(smsLink())}">📨 Send my answers to ${esc(INVITE.myName)}</a>
    </div>
    <p class="hint">Pick <b>Messages</b> → <b>${esc(INVITE.myName)}</b> → send.<br />Not working? <a href="${esc(smsLink())}">Text the link instead</a></p>
    <p class="status" id="status"></p>`;
  $letter.hidden = false;
  window.scrollTo({ top: 0, behavior: "auto" });
  document.getElementById("send").addEventListener("click", sendToBrian);
  prepareScreenshot();
}

/* ---------- sending: screenshot via share sheet, link as fallback ---------- */
function encode(obj) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(obj)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function decode(str) {
  try {
    const d = JSON.parse(decodeURIComponent(escape(atob(str.replace(/-/g, "+").replace(/_/g, "/")))));
    return d && typeof d === "object" ? d : null;
  } catch { return null; }
}
const resultsURL = () => `${location.origin}${location.pathname}?r=${encode(resultData())}`;
const smsText = () => `📋 Survey complete! Here are my answers 👉 ${resultsURL()}`;
function smsLink() {
  const sep = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent) ? "&" : "?";
  return `sms:${INVITE.myPhone}${sep}body=${encodeURIComponent(smsText())}`;
}

let shareFile = null;
function loadHtml2Canvas() {
  if (window.html2canvas) return Promise.resolve(window.html2canvas);
  return new Promise((resolve, reject) => {
    const sc = document.createElement("script");
    sc.src = "html2canvas.min.js";
    sc.onload = () => resolve(window.html2canvas);
    sc.onerror = reject;
    document.head.appendChild(sc);
  });
}
async function prepareScreenshot() {
  shareFile = null;
  try {
    const h2c = await loadHtml2Canvas();
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    const el = document.getElementById("results");
    if (!el) return;
    const canvas = await h2c(el, {
      backgroundColor: "#fdf8ef", scale: 2, logging: false,
      onclone: (doc) => {
        const st = doc.createElement("style");
        st.textContent = "*,*::before,*::after{animation:none!important;transition:none!important}";
        doc.head.appendChild(st);
      },
    });
    const blob = await new Promise((r) => canvas.toBlob(r, "image/png"));
    if (blob) shareFile = new File([blob], `${INVITE.herName.toLowerCase()}-survey.png`, { type: "image/png" });
  } catch { shareFile = null; }
}
async function sendToBrian(e) {
  if (!(shareFile && navigator.canShare && navigator.share && navigator.canShare({ files: [shareFile] }))) return; // use the sms: link
  e.preventDefault();
  try {
    await navigator.share({ files: [shareFile], text: smsText() });
    document.getElementById("status").textContent = "Sent! ✓ (If you didn't pick Messages, tap the button again.)";
  } catch (err) {
    if (err && err.name === "AbortError") return;
    window.location.href = smsLink();
  }
}

/* ---------- what Brian sees when he opens her link ---------- */
function showResultsPage(d) {
  $survey.hidden = true;
  $intro.hidden = true;
  $stage.classList.add("reading");
  $letter.classList.add("receipt");
  $letter.innerHTML = `
    <p class="to">Survey's in! 📬</p>
    <p class="lead">${esc(INVITE.herName)} answered all three questions and opened the invite.</p>
    ${resultsCardHTML(d, `${INVITE.herName}'s answers`)}`;
  $letter.hidden = false;
}

/* ---------- start ---------- */
{
  const r = new URLSearchParams(location.search).get("r");
  const d = r && decode(r);
  if (d) showResultsPage(d);
  else showQuestion(0);
}
