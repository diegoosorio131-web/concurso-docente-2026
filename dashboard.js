/* Tablero de inicio: solo lee el progreso guardado y lo muestra. No modifica datos. */
(function () {
  const $ = (id) => document.getElementById(id);
  function render() {
    try {
      const name = ($("accountName")?.textContent || "").trim();
      const first = name && name !== "Cuenta" && name !== "Mi cuenta" ? name.split(/\s+/)[0] : "";
      if ($("dashName")) $("dashName").textContent = first ? " " + first : "";
      if (typeof loadProgress !== "function" || typeof studyItems === "undefined") return;
      const progress = loadProgress();
      const done = (progress.completedItems || []).filter((i) => i >= 0 && i < studyItems.length).length;
      const percent = Math.round((done / studyItems.length) * 100);
      const attempts = progress.attempts || [];
      const best = attempts.reduce((m, a) => Math.max(m, Number(a.score) || 0), 0);
      const next = studyItems.find((_, i) => !(progress.completedItems || []).includes(i));
      $("dashPercent").textContent = percent + "%";
      $("dashRouteText").textContent = done + " de " + studyItems.length + " pasos de la ruta";
      $("dashAttempts").textContent = attempts.length;
      $("dashBest").textContent = attempts.length ? best + "%" : "—";
      const ring = $("dashRing");
      if (ring) ring.style.strokeDashoffset = String(314 - (314 * percent) / 100);
      if (next && $("dashNext")) $("dashNext").textContent = "Siguiente paso: " + next.category + " · " + next.title + ".";
    } catch (e) { /* el tablero es opcional */ }
  }
  render();
  const inicio = $("inicio");
  if (inicio) new MutationObserver(() => inicio.classList.contains("active") && render()).observe(inicio, { attributes: true, attributeFilter: ["class"] });
  const acc = $("accountName");
  if (acc) new MutationObserver(render).observe(acc, { childList: true, characterData: true, subtree: true });
})();
