(function () {
  "use strict";

  const { currencies, categories, cards, merchants } = window.CARD_DATA;
  const catById = Object.fromEntries(categories.map((c) => [c.id, c]));
  const cardById = Object.fromEntries(cards.map((c) => [c.id, c]));
  const merchantById = Object.fromEntries(merchants.map((m) => [m.id, m]));

  // ---------- persistence ----------
  const STORE_KEY = "card-optimizer-v1";
  const defaults = () => ({
    wallet: [],
    cpp: Object.fromEntries(Object.entries(currencies).map(([k, v]) => [k, v.cpp])),
    rotating: { cff: [], discover: [] },
    customCash: "dining",
    onlyMine: false,
  });
  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return defaults();
      const saved = JSON.parse(raw);
      const d = defaults();
      return {
        ...d,
        ...saved,
        cpp: { ...d.cpp, ...(saved.cpp || {}) },
        rotating: { ...d.rotating, ...(saved.rotating || {}) },
        wallet: (saved.wallet || []).filter((id) => cardById[id]),
      };
    } catch (e) {
      return defaults();
    }
  }
  let state = load();
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
  }
  const inWallet = (id) => state.wallet.includes(id);

  // ---------- helpers ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s || "").toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9+]+/g, " ").trim();
  const $ = (sel) => document.querySelector(sel);
  const fmtNum = (n) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });
  const fmtMoney = (n) => n.toLocaleString(undefined, { style: "currency", currency: "USD" });
  const fmtPct = (n) => (Math.round(n * 10) / 10).toFixed(1).replace(/\.0$/, "") + "%";
  const fullName = (c) => (c.name.startsWith(c.issuer) ? c.name : c.issuer + " " + c.name);

  // ---------- engine ----------
  function pointValue(card) {
    if (card.currency === "CASH") return { cpp: 1, downgraded: false };
    const full = Number(state.cpp[card.currency]) || currencies[card.currency].cpp;
    if (card.pool && !card.pool.some(inWallet)) {
      return { cpp: Math.min(1, full), downgraded: true };
    }
    return { cpp: full, downgraded: false };
  }

  function multLabel(card, rate) {
    return card.currency === "CASH" ? fmtPct(rate) : (Math.round(rate * 10) / 10) + "x";
  }

  /** Returns how a card earns on a purchase target {merchant?, category}. */
  function evaluate(card, target) {
    const cat = target.category;
    const m = target.merchant;
    const result = { card, rate: card.base, why: "base rate", notes: [], unusable: null };

    if (card.closedLoop && (!m || m.id !== card.closedLoop)) {
      result.unusable = "Only works at " + (merchantById[card.closedLoop] || {}).name;
      result.rate = 0;
    } else if (m && m.networks && !m.networks.includes(card.network)) {
      result.unusable = m.networkNote || "Not accepted here";
      result.rate = 0;
    } else {
      const options = [{ rate: card.base, why: "base rate" }];
      if (card.earn[cat] != null) options.push({ rate: card.earn[cat], why: catById[cat].label });
      if (m && card.merchants && card.merchants[m.id] != null) options.push({ rate: card.merchants[m.id], why: m.name + " bonus" });
      if (card.special === "rotating" && (state.rotating[card.id] || []).includes(cat)) {
        options.push({ rate: card.rotatingRate, why: "rotating 5% category" });
        result.notes.push(card.rotatingCap);
      }
      if (card.special === "customCash" && state.customCash === cat) {
        options.push({ rate: 5, why: "Custom Cash category" });
        result.notes.push(card.rotatingCap);
      }
      const best = options.reduce((a, b) => (b.rate > a.rate ? b : a));
      result.rate = best.rate;
      result.why = best.why;
      if (card.caps && card.caps[cat] && best.why !== "base rate") result.notes.push(card.caps[cat]);
      if (card.portal && ["flights", "hotels", "car_rental", "travel_other"].includes(cat)) result.notes.push("Tip: " + card.portal);
    }

    const pv = pointValue(card);
    result.cpp = pv.cpp;
    if (pv.downgraded && result.rate > 0) {
      const partners = card.pool.map((id) => cardById[id].name).join(" or ");
      result.notes.push(`Points worth 1¢ unless you also have ${partners}`);
    }
    result.value = result.rate * pv.cpp; // effective % back
    (card.notes || []).forEach((n) => result.notes.push(n));
    return result;
  }

  function rank(cardList, target) {
    return cardList
      .map((c) => evaluate(c, target))
      .sort((a, b) => (a.unusable ? 1 : 0) - (b.unusable ? 1 : 0) || b.value - a.value || a.card.fee - b.card.fee);
  }

  // ---------- search ----------
  function searchTargets(q) {
    const nq = norm(q);
    if (!nq) return [];
    const out = [];
    merchants.forEach((m) => {
      const hay = norm(m.name) + " " + norm(m.aliases);
      if (hay.includes(nq) || (nq.length >= 4 && (" " + nq + " ").includes(" " + norm(m.name) + " "))) {
        out.push({ type: "merchant", merchant: m, category: m.category, score: norm(m.name) === nq ? -1 : norm(m.name).startsWith(nq) ? 0 : 1 });
      }
    });
    categories.forEach((c) => {
      const hay = norm(c.label) + " " + norm(c.keywords);
      if (hay.includes(nq) || nq.split(" ").some((w) => w.length > 2 && hay.split(" ").includes(w))) {
        out.push({ type: "category", category: c.id, score: norm(c.label).startsWith(nq) ? 0.5 : 2 });
      }
    });
    return out.sort((a, b) => a.score - b.score).slice(0, 8);
  }

  function matchMerchantByName(name) {
    const n = " " + norm(name) + " ";
    return merchants.find((m) => n.includes(" " + norm(m.name) + " ")) ||
      merchants.find((m) => norm(m.aliases).split(" ").filter((w) => w.length >= 4).some((w) => n.includes(" " + w + " ")));
  }

  // ---------- UI: tabs ----------
  let currentTarget = null;

  function setTab(name) {
    document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
    document.querySelectorAll(".panel").forEach((p) => (p.hidden = p.id !== "panel-" + name));
    try { sessionStorage.setItem("co-tab", name); } catch (e) { /* ignore */ }
    if (name === "all") renderTable();
    if (name === "wallet") renderWallet();
    if (name === "settings") renderSettings();
  }

  // ---------- UI: card visual ----------
  function miniCard(card, extra = "") {
    const [a, b] = card.color;
    return `<div class="mini-card${card.dark ? " dark-text" : ""}" style="background:linear-gradient(135deg, ${a}, ${b})">
      <span class="mc-issuer">${esc(card.issuer)}</span>
      <span class="mc-name">${esc(card.name)}</span>
      <span class="mc-net">${esc(card.network === "target" ? "store card" : card.network)}</span>${extra}
    </div>`;
  }

  // ---------- UI: where ----------
  function renderCategoryChips() {
    $("#chips").innerHTML = categories
      .map((c) => `<button class="chip" data-cat="${c.id}"><span>${c.icon}</span> ${esc(c.label)}</button>`)
      .join("");
  }

  function renderSuggestions(list) {
    const box = $("#suggestions");
    if (!list.length) { box.hidden = true; box.innerHTML = ""; return; }
    box.hidden = false;
    box.innerHTML = list
      .map((t, i) => {
        const cat = catById[t.category];
        const label = t.type === "merchant" ? esc(t.merchant.name) : esc(cat.label);
        const sub = t.type === "merchant" ? cat.label : "Category";
        return `<button class="suggestion" data-i="${i}"><span class="s-icon">${cat.icon}</span><span><b>${label}</b><small>${esc(sub)}</small></span></button>`;
      })
      .join("");
    box._list = list;
  }

  function selectTarget(t) {
    currentTarget = t;
    renderSuggestions([]);
    document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", t.type === "category" && c.dataset.cat === t.category));
    renderResults();
    $("#results").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function earnText(r, amount) {
    if (!amount || r.unusable) return "";
    const card = r.card;
    if (card.currency === "CASH") return `<div class="earn">${fmtMoney((amount * r.rate) / 100)} back</div>`;
    const pts = amount * r.rate;
    return `<div class="earn">${fmtNum(pts)} ${currencies[card.currency].unit} ≈ ${fmtMoney((pts * r.cpp) / 100)}</div>`;
  }

  function resultRow(r, i, amount) {
    const notes = r.unusable ? [r.unusable] : r.notes;
    return `<li class="row${r.unusable ? " unusable" : ""}">
      <span class="rank">${r.unusable ? "✕" : i + 1}</span>
      <div class="row-card">${miniCard(r.card)}</div>
      <div class="row-info">
        <div class="row-title">${esc(fullName(r.card))}</div>
        <div class="row-why">${r.unusable ? "Can't use here" : `${multLabel(r.card, r.rate)} · ${esc(r.why)}`}</div>
        ${notes.length ? `<ul class="notes">${notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}
      </div>
      <div class="row-value">${r.unusable ? "—" : fmtPct(r.value)}<small>${r.unusable ? "" : "value"}</small>${earnText(r, amount)}</div>
    </li>`;
  }

  function renderResults() {
    const box = $("#results");
    if (!currentTarget) { box.hidden = true; return; }
    box.hidden = false;
    const t = currentTarget;
    const cat = catById[t.category];
    const title = t.type === "merchant" || t.type === "place" ? t.label || t.merchant.name : cat.label;
    const amount = parseFloat($("#amount").value) || 0;

    const mine = cards.filter((c) => inWallet(c.id));
    const pool = mine.length ? mine : cards;
    const ranked = rank(pool, t);
    const best = ranked[0];

    let html = `<div class="res-head">
      <div><div class="res-label">${cat.icon} ${esc(cat.label)}</div><h2>${esc(title)}</h2></div>
    </div>`;

    if (!mine.length) {
      html += `<div class="banner">You haven't added cards yet, so this ranks <b>every</b> card. <button class="link" data-goto="wallet">Add your cards →</button></div>`;
    }

    if (best && !best.unusable) {
      html += `<div class="hero">
        <div class="hero-text">
          <div class="hero-kicker">${mine.length ? "Use this card" : "Best card overall"}</div>
          <div class="hero-name">${esc(fullName(best.card))}</div>
          <div class="hero-rate"><b>${multLabel(best.card, best.rate)}</b> · about <b>${fmtPct(best.value)}</b> back</div>
          ${earnText(best, amount)}
        </div>
        ${miniCard(best.card)}
      </div>`;
    } else {
      html += `<div class="banner warn">None of your cards are accepted here. ${t.merchant && t.merchant.networkNote ? esc(t.merchant.networkNote) + "." : ""}</div>`;
    }

    // Suggest a card the user doesn't have
    if (mine.length) {
      const others = rank(cards.filter((c) => !inWallet(c.id)), t).filter((r) => !r.unusable);
      const top = others[0];
      const bestVal = best && !best.unusable ? best.value : 0;
      if (top && top.value - bestVal >= 1) {
        html += `<div class="tip">💡 <b>${esc(fullName(top.card))}</b> would earn <b>${fmtPct(top.value)}</b> here (${multLabel(top.card, top.rate)}, ${esc(top.why)}). ${top.card.fee ? `$${top.card.fee}/yr fee.` : "No annual fee."}</div>`;
      }
    }

    html += `<h3 class="sub">${mine.length ? "All your cards" : "All cards"}, ranked</h3><ol class="ranked">${ranked.map((r, i) => resultRow(r, i, amount)).join("")}</ol>`;
    $("#results-body").innerHTML = html;
  }

  // ---------- location ----------
  const OSM_MAP = {
    amenity: {
      restaurant: "dining", cafe: "dining", fast_food: "dining", bar: "dining", pub: "dining", food_court: "dining", ice_cream: "dining", biergarten: "dining",
      fuel: "gas", charging_station: "ev", pharmacy: "drugstore", cinema: "entertainment", theatre: "entertainment",
      nightclub: "entertainment", arts_centre: "entertainment", parking: "transit", car_rental: "car_rental",
    },
    shop: {
      supermarket: "groceries", grocery: "groceries", greengrocer: "groceries", butcher: "groceries", bakery: "dining",
      wholesale: "wholesale", department_store: "superstore", chemist: "drugstore", doityourself: "home_improvement",
      hardware: "home_improvement", mobile_phone: "phone", coffee: "dining",
    },
    tourism: { hotel: "hotels", motel: "hotels", hostel: "hotels", theme_park: "entertainment", museum: "entertainment", zoo: "entertainment" },
    leisure: { fitness_centre: "fitness", sports_centre: "fitness", bowling_alley: "entertainment", amusement_arcade: "entertainment", water_park: "entertainment" },
  };

  function osmCategory(tags) {
    for (const key of ["amenity", "shop", "tourism", "leisure"]) {
      if (tags[key] && OSM_MAP[key][tags[key]]) return OSM_MAP[key][tags[key]];
    }
    if (tags.shop) return "other";
    return null;
  }

  function distance(lat1, lon1, lat2, lon2) {
    const R = 6371000, toRad = (d) => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }

  function placesFromOsm(elements, lat, lon) {
    const seen = new Set();
    return elements
      .map((el) => {
        const tags = el.tags || {};
        const plat = el.lat ?? (el.center && el.center.lat), plon = el.lon ?? (el.center && el.center.lon);
        const merchant = matchMerchantByName(tags.brand || "") || matchMerchantByName(tags.name || "");
        let category = osmCategory(tags);
        // Brand wins for things like a Costco gas station or a Target tagged as "department_store".
        if (merchant && !(merchant.id === "costco" && tags.amenity === "fuel")) category = merchant.category;
        const m = merchant && merchant.id === "costco" && tags.amenity === "fuel" ? merchantById.costco_gas : merchant;
        if (!category) return null;
        return { name: tags.name, merchant: m, category, dist: plat != null ? distance(lat, lon, plat, plon) : 9999 };
      })
      .filter((p) => p && p.name && !seen.has(p.name + p.category) && seen.add(p.name + p.category))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 12);
  }

  async function findNearby() {
    const box = $("#nearby");
    box.hidden = false;
    if (!navigator.geolocation) { box.innerHTML = `<p class="muted">Your browser doesn't support location.</p>`; return; }
    box.innerHTML = `<p class="muted">📍 Finding where you are…</p>`;
    let pos;
    try {
      pos = await new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej, { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }));
    } catch (e) {
      box.innerHTML = `<p class="muted">Couldn't get your location${e && e.code === 1 ? " (permission denied)" : ""}. Try typing the store name instead.</p>`;
      return;
    }
    const { latitude: lat, longitude: lon } = pos.coords;
    box.innerHTML = `<p class="muted">🔎 Looking for stores and restaurants near you…</p>`;
    const r = 150;
    const query = `[out:json][timeout:15];(
      nwr(around:${r},${lat},${lon})["name"]["shop"];
      nwr(around:${r},${lat},${lon})["name"]["amenity"];
      nwr(around:${r},${lat},${lon})["name"]["tourism"];
      nwr(around:${r},${lat},${lon})["name"]["leisure"];
    );out center 60;`;
    try {
      const resp = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: "data=" + encodeURIComponent(query),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      if (!resp.ok) throw new Error("HTTP " + resp.status);
      const data = await resp.json();
      const places = placesFromOsm(data.elements || [], lat, lon);
      renderNearby(places);
    } catch (e) {
      box.innerHTML = `<p class="muted">Couldn't look up nearby places right now. Try typing the store name instead.</p>`;
    }
  }

  function renderNearby(places) {
    const box = $("#nearby");
    if (!places.length) {
      box.innerHTML = `<p class="muted">No stores found right around you. Try typing the name instead.</p>`;
      return;
    }
    box._places = places;
    box.innerHTML = `<div class="nearby-head">Places near you <button class="link" id="close-nearby">close</button></div>` +
      places.map((p, i) => {
        const cat = catById[p.category];
        return `<button class="suggestion" data-place="${i}"><span class="s-icon">${cat.icon}</span><span><b>${esc(p.name)}</b><small>${esc(cat.label)} · ${p.dist < 1000 ? Math.round(p.dist) + " m" : "nearby"}</small></span></button>`;
      }).join("");
  }

  // ---------- UI: wallet ----------
  function renderWallet() {
    const q = norm($("#wallet-filter").value);
    const list = cards.filter((c) => !q || norm(c.issuer + " " + c.name).includes(q));
    $("#wallet-count").textContent = state.wallet.length ? `${state.wallet.length} card${state.wallet.length > 1 ? "s" : ""} in your wallet` : "Tap the cards you have";
    $("#wallet-grid").innerHTML = list.map((c) => {
      const on = inWallet(c.id);
      const top = Object.entries(c.earn).sort((a, b) => b[1] - a[1]).slice(0, 3)
        .map(([k, v]) => `${multLabel(c, v)} ${catById[k].label.toLowerCase()}`);
      if (c.merchants) Object.entries(c.merchants).sort((a, b) => b[1] - a[1]).slice(0, 2).forEach(([k, v]) => top.unshift(`${multLabel(c, v)} ${merchantById[k].name}`));
      if (c.special === "rotating") top.unshift("5% rotating");
      if (c.special === "customCash") top.unshift("5% top category");
      const summary = [...new Set(top)].slice(0, 3).join(" · ") || "";
      return `<button class="wallet-item${on ? " on" : ""}" data-card="${c.id}" aria-pressed="${on}">
        ${miniCard(c, on ? `<span class="check">✓</span>` : "")}
        <div class="wi-text"><b>${esc(fullName(c))}</b>
        <small>${esc(summary ? summary + " · " : "")}${c.base ? multLabel(c, c.base) + " else" : ""}</small>
        <small class="fee">${c.fee ? "$" + c.fee + "/yr" : "No annual fee"} · ${esc(currencies[c.currency].name)}</small></div>
      </button>`;
    }).join("");
  }

  // ---------- UI: comparison table ----------
  function renderTable() {
    const list = state.onlyMine && state.wallet.length ? cards.filter((c) => inWallet(c.id)) : cards;
    const showValue = $("#show-value").checked;
    const cols = categories;
    const cell = (c, cat) => {
      const r = evaluate(c, { category: cat.id });
      return { r, text: showValue ? fmtPct(r.value) : multLabel(c, r.rate) };
    };
    // best per column
    const bests = cols.map((cat) => Math.max(...list.map((c) => evaluate(c, { category: cat.id }).value)));
    let html = `<table class="matrix"><thead><tr><th class="sticky">Card</th>${cols.map((c) => `<th title="${esc(c.label)}"><span>${c.icon}</span>${esc(c.label)}</th>`).join("")}</tr></thead><tbody>`;
    list.forEach((c) => {
      html += `<tr class="${inWallet(c.id) ? "mine" : ""}"><th class="sticky"><span class="dot" style="background:${c.color[1]}"></span>${esc(fullName(c))}<small>${c.fee ? "$" + c.fee : "$0"} · ${c.currency === "CASH" ? "cash" : esc(c.currency)}</small></th>`;
      cols.forEach((cat, i) => {
        const { r, text } = cell(c, cat);
        const isBase = r.why === "base rate";
        const isBest = r.value > 0 && Math.abs(r.value - bests[i]) < 1e-9;
        html += `<td class="${isBest ? "best" : ""}${isBase ? " base" : ""}${r.unusable ? " na" : ""}">${r.unusable ? "—" : text}</td>`;
      });
      html += `</tr>`;
    });
    html += `</tbody></table>`;
    $("#table-wrap").innerHTML = html;
    $("#only-mine").checked = state.onlyMine;
    $("#only-mine").disabled = !state.wallet.length;
  }

  // ---------- UI: settings ----------
  function renderSettings() {
    $("#cpp-list").innerHTML = Object.entries(currencies)
      .filter(([k]) => k !== "CASH")
      .map(([k, v]) => `<label class="cpp-row"><span>${esc(v.name)}</span><span class="cpp-input"><input type="number" step="0.05" min="0" max="5" data-cpp="${k}" value="${state.cpp[k]}"> ¢</span></label>`)
      .join("");

    const rotatingCards = cards.filter((c) => c.special === "rotating");
    $("#rotating").innerHTML = rotatingCards.map((c) => `<fieldset><legend>${esc(fullName(c))}: active 5% categories this quarter</legend>
      <div class="checks">${categories.filter((x) => x.id !== "other").map((cat) => `<label class="check-chip"><input type="checkbox" data-rot="${c.id}" value="${cat.id}" ${(state.rotating[c.id] || []).includes(cat.id) ? "checked" : ""}> ${cat.icon} ${esc(cat.label)}</label>`).join("")}</div>
    </fieldset>`).join("");

    const cc = cardById.citi_cc;
    $("#custom-cash").innerHTML = cc.customCashOptions.map((id) => `<option value="${id}" ${state.customCash === id ? "selected" : ""}>${catById[id].icon} ${esc(catById[id].label)}</option>`).join("");
  }

  // ---------- events ----------
  function bind() {
    document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => setTab(t.dataset.tab)));

    const input = $("#search");
    input.addEventListener("input", () => renderSuggestions(searchTargets(input.value)));
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const list = searchTargets(input.value);
        if (list.length) selectTarget(list[0]);
      } else if (e.key === "Escape") {
        renderSuggestions([]);
      }
    });
    $("#suggestions").addEventListener("click", (e) => {
      const b = e.target.closest(".suggestion");
      if (!b) return;
      const t = $("#suggestions")._list[+b.dataset.i];
      input.value = t.type === "merchant" ? t.merchant.name : catById[t.category].label;
      selectTarget(t);
    });
    $("#chips").addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      input.value = "";
      selectTarget({ type: "category", category: b.dataset.cat });
    });
    $("#near-me").addEventListener("click", findNearby);
    $("#nearby").addEventListener("click", (e) => {
      if (e.target.id === "close-nearby") { $("#nearby").hidden = true; return; }
      const b = e.target.closest("[data-place]");
      if (!b) return;
      const p = $("#nearby")._places[+b.dataset.place];
      input.value = p.name;
      selectTarget({ type: "place", label: p.name, merchant: p.merchant, category: p.category });
    });
    $("#amount").addEventListener("input", renderResults);
    $("#results").addEventListener("click", (e) => {
      const g = e.target.closest("[data-goto]");
      if (g) setTab(g.dataset.goto);
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-wrap")) renderSuggestions([]);
    });

    $("#wallet-filter").addEventListener("input", renderWallet);
    $("#wallet-grid").addEventListener("click", (e) => {
      const b = e.target.closest("[data-card]");
      if (!b) return;
      const id = b.dataset.card;
      state.wallet = inWallet(id) ? state.wallet.filter((x) => x !== id) : [...state.wallet, id];
      save();
      renderWallet();
      renderResults();
    });

    $("#only-mine").addEventListener("change", (e) => { state.onlyMine = e.target.checked; save(); renderTable(); });
    $("#show-value").addEventListener("change", renderTable);

    $("#panel-settings").addEventListener("input", (e) => {
      if (e.target.dataset.cpp) {
        const v = parseFloat(e.target.value);
        if (!isNaN(v) && v >= 0) { state.cpp[e.target.dataset.cpp] = v; save(); renderResults(); }
      }
    });
    $("#panel-settings").addEventListener("change", (e) => {
      const rot = e.target.dataset.rot;
      if (rot) {
        const set = new Set(state.rotating[rot] || []);
        e.target.checked ? set.add(e.target.value) : set.delete(e.target.value);
        state.rotating[rot] = [...set];
      }
      if (e.target.id === "custom-cash") state.customCash = e.target.value;
      save();
      renderResults();
    });
    $("#reset").addEventListener("click", () => {
      if (!confirm("Reset your wallet and settings?")) return;
      state = defaults();
      save();
      renderSettings();
      renderWallet();
      renderResults();
    });
  }

  // ---------- init ----------
  renderCategoryChips();
  bind();
  let startTab = state.wallet.length ? "where" : "wallet";
  try { startTab = sessionStorage.getItem("co-tab") || startTab; } catch (e) { /* ignore */ }
  setTab(startTab);

  // Exposed for testing in the console.
  window.CardOptimizer = { evaluate, rank, searchTargets, placesFromOsm, matchMerchantByName, get state() { return state; } };
})();
