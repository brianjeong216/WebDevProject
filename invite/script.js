/* ==========================================================
   Envelope invitation
   ✏️  Edit this block to change what the letter says.
   ========================================================== */
const INVITE = {
  herName: "Kayler",
  myName: "Brian",
  myPhone: "+14694346426",
  when: "Tonight · Tuesday, Nov 24",
  pickup: "6:15 PM",
  pickupWhere: "your place",
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

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

/* ---------- the letter ---------- */
function letterHTML() {
  const reply = `Got your letter ✉️ See you at ${INVITE.pickup}!`;
  const sep = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent) ? "&" : "?";
  const sms = `sms:${INVITE.myPhone}${sep}body=${encodeURIComponent(reply)}`;
  return `
    <p class="to">Dear ${esc(INVITE.herName)},</p>
    <p class="lead">You said <i>"surprise me."</i> Challenge accepted. 😏 Here's everything you're allowed to know:</p>

    <div class="details">
      <div class="row"><span class="ic">🗓️</span><span><b>When</b>${esc(INVITE.when)}</span></div>
      <div class="row"><span class="ic">🚗</span><span><b>Pickup</b>${esc(INVITE.pickup)} at ${esc(INVITE.pickupWhere)}</span></div>
      <div class="row"><span class="ic">📍</span><span><b>Where</b><span class="classified">top secret place</span><small>(classified)</small></span></div>
      <div class="row"><span class="ic">🧣</span><span><b>Dress code</b>Cozy and warm: a good coat, gloves, a beanie, and your warmest socks. Wear something you can move around in.</span></div>
      <div class="row"><span class="ic">✨</span><span><b>Also</b>Look cute. (Easy for you.)</span></div>
      <div class="row"><span class="ic">🍫</span><span><b>Come hungry</b>Save room for delicious treats.</span></div>
    </div>

    <p class="sign">See you soon,<br />${esc(INVITE.myName)}</p>
    <p class="ps">P.S. No more hints. I've already said too much.</p>

    <div class="actions">
      <a class="btn" href="${esc(sms)}">Text ${esc(INVITE.myName)} "see you soon"</a>
      <button class="btn ghost" id="again">Read again from the envelope</button>
    </div>`;
}

/* ---------- open sequence ---------- */
const env = document.getElementById("envelope");
const intro = document.getElementById("intro");
const letter = document.getElementById("letter");
const tap = document.getElementById("tap");
let opened = false;

env.addEventListener("click", () => {
  if (opened) return;
  opened = true;
  tap.textContent = "Opening…";
  const t = reduceMotion ? 0 : 1;
  env.classList.add("opening");                       // seal pops, flap folds back
  intro.classList.add("opening");
  setTimeout(() => env.classList.add("pulling"), 650 * t);   // letter slides up
  setTimeout(() => intro.classList.add("gone"), 1700 * t);   // envelope fades away
  setTimeout(() => {
    intro.hidden = true;
    letter.innerHTML = letterHTML();
    letter.hidden = false;
    window.scrollTo({ top: 0, behavior: "auto" });
    document.getElementById("again").onclick = reset;
  }, 2150 * t);
});

function reset() {
  opened = false;
  letter.hidden = true;
  intro.hidden = false;
  env.classList.remove("opening", "pulling");
  intro.classList.remove("opening");
  tap.textContent = "Tap the envelope to open";
  requestAnimationFrame(() => intro.classList.remove("gone"));
}
