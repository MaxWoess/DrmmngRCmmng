(() => {
  const $ = (id) => document.getElementById(id);
  const stage = $("stage"), photo = $("photo"), censor = $("censor"), stamp = $("stamp");
  const choices = $("choices"), after = $("after"), verdict = $("verdict");
  const LABEL = { drumming: "Drumming", cumming: "Cumming" };

  let deck = [], index = 0, score = 0, streak = 0, answered = false;
  let best = Number(load("best")) || 0;

  function load(k) { try { return localStorage.getItem("doc-" + k); } catch { return null; } }
  function save(k, v) { try { localStorage.setItem("doc-" + k, v); } catch {} }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function start() {
    const n = window.ROUND_LENGTH || window.ITEMS.length;
    deck = shuffle([...window.ITEMS]).slice(0, n);
    index = score = streak = 0;
    $("result").classList.add("hidden");
    $("game").classList.remove("hidden");
    show();
  }

  function show() {
    const item = deck[index];
    const f = item.focus || { x: 50, y: 50, zoom: 2.5 };
    answered = false;
    stage.classList.remove("revealed");
    stage.classList.add("loading");
    // Ohne Übergang auf den Ausschnitt springen, damit das neue Bild nicht sichtbar rauszoomt
    photo.style.transition = "none";
    photo.style.transformOrigin = `${f.x}% ${f.y}%`;
    photo.style.transform = `scale(${f.zoom})`;
    stage.style.setProperty("--fx", f.x + "%");
    stage.style.setProperty("--fy", f.y + "%");
    censor.classList.toggle("on", !!item.censor);
    stamp.className = "stamp";
    photo.onload = () => {
      stage.classList.remove("loading");
      void photo.offsetWidth;
      photo.style.transition = "";
    };
    photo.src = item.src;
    choices.classList.remove("hidden");
    after.classList.add("hidden");
    choices.querySelectorAll("button").forEach((b) => (b.disabled = false));
    updateHud();
    // nächstes Bild vorladen
    if (deck[index + 1]) new Image().src = deck[index + 1].src;
  }

  function guess(g) {
    if (answered) return;
    answered = true;
    const item = deck[index];
    const correct = g === item.answer;
    if (correct) {
      score++; streak++;
      if (streak > best) { best = streak; save("best", best); }
    } else {
      streak = 0;
      stage.classList.remove("shake"); void stage.offsetWidth; stage.classList.add("shake");
    }
    photo.style.transform = "scale(1)";
    stamp.textContent = LABEL[item.answer] + "!";
    stamp.classList.add(item.answer);
    stage.classList.add("revealed");
    verdict.textContent = correct ? "Richtig! ✔" : "Falsch! ✘";
    verdict.className = correct ? "ok" : "bad";
    choices.querySelectorAll("button").forEach((b) => (b.disabled = true));
    choices.classList.add("hidden");
    after.classList.remove("hidden");
    $("next").textContent = index + 1 < deck.length ? "Weiter" : "Ergebnis";
    $("next").focus();
    updateHud();
  }

  function next() {
    if (!answered) return;
    index++;
    if (index < deck.length) show(); else finish();
  }

  function rating(p) {
    if (p === 1) return "Perfekt. Du hast eindeutig zu viel Zeit im Internet verbracht.";
    if (p >= .8) return "Beeindruckend. Ein geschultes Auge.";
    if (p >= .6) return "Nicht schlecht – besser als Raten.";
    if (p >= .4) return "Ungefähr so gut wie eine Münze.";
    return "Ehrlich gesagt: Die Gesichter sind wirklich gleich.";
  }

  function finish() {
    $("game").classList.add("hidden");
    $("result").classList.remove("hidden");
    $("result-score").textContent = `${score} / ${deck.length}`;
    $("result-text").textContent = rating(score / deck.length);
    $("restart").focus();
  }

  async function share() {
    const text = `Ich habe ${score} von ${deck.length} bei „Drumming or Cumming?" richtig erraten.`;
    const data = { title: document.title, text, url: location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(`${text} ${location.href}`); $("share").textContent = "Kopiert!"; }
    } catch {}
  }

  function updateHud() {
    $("progress").textContent = `${index + 1}/${deck.length}`;
    $("score").textContent = score;
    $("streak").textContent = streak;
    $("best").textContent = best;
  }

  choices.addEventListener("click", (e) => {
    const b = e.target.closest("[data-guess]");
    if (b) guess(b.dataset.guess);
  });
  $("next").addEventListener("click", next);
  $("restart").addEventListener("click", start);
  $("share").addEventListener("click", share);

  document.addEventListener("keydown", (e) => {
    if (!$("result").classList.contains("hidden")) return;
    const k = e.key.toLowerCase();
    if (!answered && (k === "arrowleft" || k === "d")) guess("drumming");
    else if (!answered && (k === "arrowright" || k === "c")) guess("cumming");
    else if (answered && (k === "enter" || k === " ")) { e.preventDefault(); next(); }
  });

  start();
})();
