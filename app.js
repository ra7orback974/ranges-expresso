const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const grid = document.getElementById("grid");
const stackSelect = document.getElementById("stack");
const spotSelect = document.getElementById("spot");
const displaySelect = document.getElementById("display");

const spotLabels = {
  BTN_OPEN: "BTN — Open",
  SB_OPEN: "SB — Open",
  BB_VS_BTN: "BB — vs open BTN",
  BB_VS_SB: "BB — vs open SB"
};

let current = {};

function handAt(row, col) {
  if (row === col) return ranks[row] + ranks[col];
  if (row < col) return ranks[row] + ranks[col] + "s";
  return ranks[col] + ranks[row] + "o";
}

function rankIndex(rank) {
  return ranks.indexOf(rank);
}

function expandToken(token) {
  const out = [];

  const pairRange = token.match(/^([AKQJT2-9])\1-([AKQJT2-9])\2$/);
  if (pairRange) {
    const a = rankIndex(pairRange[1]);
    const b = rankIndex(pairRange[2]);
    for (let i = Math.min(a, b); i <= Math.max(a, b); i++) out.push(ranks[i] + ranks[i]);
    return out;
  }

  const pair = token.match(/^([AKQJT2-9])\1([+-])?$/);
  if (pair) {
    const i = rankIndex(pair[1]);
    if (pair[2] === "+") {
      for (let k = i; k >= 0; k--) out.push(ranks[k] + ranks[k]);
    } else {
      out.push(pair[1] + pair[1]);
    }
    return out;
  }

  const range = token.match(/^([AKQJT2-9])([AKQJT2-9])([so])-([AKQJT2-9])([AKQJT2-9])\3$/);
  if (range && range[1] === range[4]) {
    const high = range[1];
    const suitedness = range[3];
    const a = rankIndex(range[2]);
    const b = rankIndex(range[5]);
    for (let k = Math.min(a, b); k <= Math.max(a, b); k++) out.push(high + ranks[k] + suitedness);
    return out;
  }

  const plus = token.match(/^([AKQJT2-9])([AKQJT2-9])([so])\+$/);
  if (plus) {
    const high = plus[1];
    const low = plus[2];
    const suitedness = plus[3];
    const highI = rankIndex(high);
    const lowI = rankIndex(low);
    for (let k = lowI; k > highI; k--) out.push(high + ranks[k] + suitedness);
    return out;
  }

  out.push(token);
  return out;
}

function expand(list = []) {
  return new Set(list.flatMap(expandToken));
}

function getRangeData() {
  const stack = stackSelect.value;
  const spot = spotSelect.value;
  const byStack = window.RANGE_DATA[stack] || window.RANGE_DATA["15"];
  return byStack[spot] || window.RANGE_DATA["15"][spot];
}

function cycleCell(element) {
  const order = ["fold", "raise", "call", "mixed"];
  const hand = element.dataset.hand;
  const index = order.indexOf(current[hand]);
  const next = order[(index + 1) % order.length];
  current[hand] = next;
  element.className = "cell " + (next === "fold" ? "" : next);
}

function render() {
  grid.innerHTML = "";

  const data = getRangeData();
  const raise = expand(data.raise);
  const call = expand(data.call);
  const mixed = expand(data.mixed);
  const rangeOnly = displaySelect.value === "range";
  current = {};
  let active = 0;

  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 13; col++) {
      const hand = handAt(row, col);
      let status = raise.has(hand) ? "raise" : call.has(hand) ? "call" : mixed.has(hand) ? "mixed" : "fold";
      if (rangeOnly && status !== "fold") status = "raise";

      current[hand] = status;
      if (status !== "fold") active++;

      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "cell " + (status === "fold" ? "" : status);
      cell.textContent = hand;
      cell.dataset.hand = hand;
      cell.title = `${hand} — ${status}`;
      cell.addEventListener("click", () => cycleCell(cell));
      grid.appendChild(cell);
    }
  }

  const stack = stackSelect.value + " BB";
  const label = spotLabels[spotSelect.value];
  document.getElementById("spotTitle").textContent = `${label} • ${stack}`;
  document.getElementById("rangeName").textContent = `Range ${label}`;
  document.getElementById("rangePct").textContent = `${active} / 169 classes actives`;
}

stackSelect.addEventListener("change", render);
spotSelect.addEventListener("change", render);
displaySelect.addEventListener("change", render);
render();
