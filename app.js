
const ranks = ["A","K","Q","J","T","9","8","7","6","5","4","3","2"];

const stackEl = document.getElementById("stack");
const positionEl = document.getElementById("position");
const spotEl = document.getElementById("spot");
const matrixEl = document.getElementById("matrix");

for (let bb = 15; bb >= 5; bb--) {
  const option = document.createElement("option");
  option.value = bb;
  option.textContent = `${bb} BB`;
  stackEl.appendChild(option);
}

function setSpotOptions() {
  const pos = positionEl.value;
  spotEl.innerHTML = "";
  const options = pos === "BB"
    ? [
        ["vs_btn_open","Vs open BTN"],
        ["vs_sb_limp","Vs limp SB"],
        ["vs_sb_raise","Vs raise SB"]
      ]
    : [
        ["firstin","First in / unopened"],
        ["vs_limp","Vs limp"],
        ["vs_raise","Vs raise"]
      ];

  options.forEach(([value,label], idx) => {
    const o = document.createElement("option");
    o.value = value;
    o.textContent = label;
    if (idx > 0) o.disabled = true;
    spotEl.appendChild(o);
  });
}

function handAt(row, col) {
  if (row === col) return ranks[row] + ranks[col];
  if (row < col) return ranks[row] + ranks[col] + "s";
  return ranks[col] + ranks[row] + "o";
}

function currentKey() {
  return `${stackEl.value}|${positionEl.value}|${spotEl.value}`;
}

function actionLabel(action) {
  return ({
    fold:"Fold",
    limp:"Limp",
    raise:"Raise",
    shove:"All-in",
    mixed:"Mix",
    unknown:"Non validé"
  })[action] || action;
}

function renderBreakdown(data) {
  const box = document.getElementById("breakdown");
  const values = data?.breakdown || {fold:100,limp:0,raise:0,shove:0};
  box.innerHTML = "";
  ["fold","limp","raise","shove"].forEach(action => {
    const pct = values[action] || 0;
    const row = document.createElement("div");
    row.className = "action-row";
    row.innerHTML = `
      <div style="width:100%">
        <div style="display:flex;justify-content:space-between">
          <div class="action-left"><i class="swatch ${action}"></i><span>${actionLabel(action)}</span></div>
          <strong>${pct.toFixed(1).replace(".0","")} %</strong>
        </div>
        <div class="bar"><div class="fill ${action}" style="width:${pct}%"></div></div>
      </div>`;
    box.appendChild(row);
  });
}

function renderDetail(hand, info) {
  const box = document.getElementById("handDetail");
  if (!info) {
    box.innerHTML = `
      <div class="big-hand">${hand}</div>
      <p><strong>Non validé</strong></p>
      <p>Cette main n’a pas encore de stratégie enregistrée pour ce spot.</p>`;
    return;
  }
  const extra = info.mix ? `<p>${info.mix}</p>` : "";
  box.innerHTML = `
    <div class="big-hand">${hand}</div>
    <p><strong>${actionLabel(info.action)}</strong>${info.freq ? ` • ${info.freq}%` : ""}</p>
    ${extra}`;
}

function dominantAction(data) {
  if (!data?.breakdown) return "—";
  const entries = Object.entries(data.breakdown);
  entries.sort((a,b)=>b[1]-a[1]);
  return actionLabel(entries[0][0]);
}

function render() {
  const data = RANGE_DATA[currentKey()];
  document.getElementById("spotTitle").textContent =
    data?.label || `${positionEl.value} • ${stackEl.value} BB • ${spotEl.options[spotEl.selectedIndex]?.text || ""}`;

  document.getElementById("playedPct").textContent = data?.playedPct || "—";
  document.getElementById("dominantAction").textContent = dominantAction(data);
  document.getElementById("dataStatus").textContent = data?.status || "À compléter";
  document.getElementById("sourceText").textContent =
    data?.source || "Aucune donnée validée n’est encore enregistrée pour ce spot.";
  document.getElementById("warningBox").textContent =
    data?.warning || "Cette profondeur / situation est prête dans l’interface mais doit encore recevoir des ranges validées.";

  renderBreakdown(data);
  matrixEl.innerHTML = "";

  for (let r=0; r<13; r++) {
    for (let c=0; c<13; c++) {
      const hand = handAt(r,c);
      const info = data?.hands?.[hand];
      const action = info?.action || "unknown";
      const cell = document.createElement("button");
      cell.className = `cell ${action}`;
      cell.type = "button";
      cell.title = `${hand} — ${actionLabel(action)}`;
      cell.innerHTML = `<span>${hand}</span>${info?.freq && info.freq !== 100 ? `<span class="freq">${info.freq}%</span>` : ""}`;
      cell.addEventListener("click", () => renderDetail(hand, info));
      matrixEl.appendChild(cell);
    }
  }

  document.getElementById("handDetail").innerHTML =
    `<div class="big-hand">—</div><p>Clique sur une case de la matrice.</p>`;
}

positionEl.addEventListener("change", () => { setSpotOptions(); render(); });
stackEl.addEventListener("change", render);
spotEl.addEventListener("change", render);

setSpotOptions();
render();
