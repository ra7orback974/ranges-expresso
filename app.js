const ranks=['A','K','Q','J','T','9','8','7','6','5','4','3','2'];
const grid=document.querySelector('#grid'), spot=document.querySelector('#spot');
let selected='AA';

function handName(r,c){if(r===c)return ranks[r]+ranks[c];return r<c?ranks[r]+ranks[c]+'s':ranks[c]+ranks[r]+'o'}
function ri(x){return ranks.indexOf(x)}
function pair(h){return h.length===2}
function suited(h){return h.endsWith('s')}
function offsuit(h){return h.endsWith('o')}
function strength(h){
  if(pair(h)) return 100-ri(h[0])*5;
  const a=ri(h[0]),b=ri(h[1]);
  return 92-a*5-b*2+(suited(h)?8:0);
}

// Published opening summaries retained from V2.
function btnOpen(h){
  const s=strength(h);
  if(pair(h) && ri(h[0])>=8) return 'allin';
  if(offsuit(h) && h[0]==='A' && ri(h[1])>=7) return 'allin';
  if(s>58) return 'raise';
  return 'fold';
}
function sbOpen(h){
  const s=strength(h);
  if(pair(h)&&['22','33','44'].includes(h))return'allin';
  if(offsuit(h)&&h[0]==='A'&&ri(h[1])>=5)return'allin';
  if(['T7s','T4s','97s','86s','76s'].includes(h))return'limp';
  if(s>54)return'raise';
  if(s>40)return'limp';
  return'fold';
}

// BB vs BTN 2bb at 15bb: guideline implementation from PokerStars Learn.
// Explicit published principles:
// - defend all suited hands
// - shove all pairs up to JJ
// - shove some small suited aces
// - shove A8o+
// - shove some strong suited connectors
// - non-all-in 3bet mainly QQ+, AKs (+ a few connectors for balance)
// Exact cell frequencies in the image are not exposed as text, so borderline cells are simplified.
function bbVsBtn(h){
  if(['QQ','KK','AA','AKs'].includes(h)) return 'raise';
  if(pair(h) && !['QQ','KK','AA'].includes(h)) return 'allin';
  if(offsuit(h) && h[0]==='A' && ri(h[1])<=6) return 'allin'; // A8o+
  if(['A2s','A3s','A4s','A5s','76s','87s','98s','T9s'].includes(h)) return 'allin';
  if(suited(h)) return 'call';
  // Broadways / stronger offsuit continue; weakest offsuit folds.
  const s=strength(h);
  if(s>=50) return 'call';
  return 'fold';
}

function currentAction(h){
  if(spot.value==='BTN_OPEN') return btnOpen(h);
  if(spot.value==='SB_OPEN') return sbOpen(h);
  return bbVsBtn(h);
}

function meta(){
  if(spot.value==='BTN_OPEN') return {
    hero:'BTN', title:'BTN OPEN · 15BB', scenario:'BTN — first in', pct:'32.1% joué',
    note:'Ouverture 15bb basée sur la solution publiée; détails cellule par cellule simplifiés.',
    actions:[['fold','Fold','67.9%'],['raise','Raise 2bb','24.4%'],['allin','All-in','7.7%']],
    table:['OPEN','',''], pot:'Pot : 1.5bb'
  };
  if(spot.value==='SB_OPEN') return {
    hero:'SB', title:'SB OPEN · 15BB', scenario:'SB — BTN fold', pct:'62.0% joué',
    note:'Ouverture 15bb basée sur la solution publiée; détails cellule par cellule simplifiés.',
    actions:[['fold','Fold','38.0%'],['limp','Limp','16.0%'],['raise','Raise 2.2bb','26.5%'],['allin','All-in','19.5%']],
    table:['FOLD','','OPEN'], pot:'Pot : 1.5bb'
  };
  return {
    hero:'BB', title:'BB vs BTN RAISE 2BB · 15BB', scenario:'BTN raise 2bb → SB fold → BB ?', pct:'Défense très large',
    note:'Spot Spin & Go 15bb. PokerStars Learn indique: tous les suited défendus, shove 22–JJ, A8o+, quelques petits Axs et connecteurs; QQ+, AKs surtout en 3-bet.',
    actions:[['fold','Fold','bordure offsuit'],['call','Call','très large'],['raise','3-bet','QQ+ / AKs'],['allin','All-in','22–JJ + bluffs/value']],
    table:['RAISE 2bb','?','FOLD'], pot:'Pot : 3.5bb'
  };
}

function render(){
  const m=meta();
  document.querySelector('#hero').textContent=m.hero;
  document.querySelector('#scenario').textContent=m.scenario;
  document.querySelector('#spotTitle').textContent=m.title;
  document.querySelector('#actionTitle').textContent=m.title;
  document.querySelector('#rangePct').textContent=m.pct;
  document.querySelector('#sourceNote').textContent=m.note;
  document.querySelector('#btnAct').textContent=m.table[0];
  document.querySelector('#bbAct').textContent=m.table[1];
  document.querySelector('#sbAct').textContent=m.table[2];
  document.querySelector('#pot').textContent=m.pot;

  document.querySelectorAll('.seat').forEach(x=>x.classList.remove('active'));
  document.querySelector('.'+m.hero.toLowerCase()).classList.add('active');

  grid.innerHTML='';
  ranks.forEach((_,r)=>ranks.forEach((_,c)=>{
    const h=handName(r,c), a=currentAction(h);
    const b=document.createElement('button');
    b.className='hand '+a+(h===selected?' selected':'');
    b.textContent=h;b.onclick=()=>{selected=h;render()};
    grid.appendChild(b);
  }));
  document.querySelector('#legend').innerHTML=m.actions.map(x=>
    `<div class="legend-row"><i class="swatch ${x[0]}"></i><strong>${x[1]}</strong><span>${x[2]}</span></div>`
  ).join('');
  const a=currentAction(selected);
  const sh=document.querySelector('#selectedHand');
  sh.textContent=selected;sh.className='selected-hand '+a;
  document.querySelector('#detail').innerHTML=`Main : <b>${selected}</b><br>Action affichée : <b>${a}</b><br><small>${spot.value==='BB_VS_BTN'?'Range pédagogique simplifiée; fréquences exactes à importer depuis un solveur/chart exportable.':'Pourcentages agrégés issus de la source publiée.'}</small>`;
}
spot.onchange=render;
spot.value='BB_VS_BTN';
render();
