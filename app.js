
const ranks = ["A","K","Q","J","T","9","8","7","6","5","4","3","2"];
const stackEl = document.getElementById("stack");
const positionEl = document.getElementById("position");
const spotEl = document.getElementById("spot");
const matrixEl = document.getElementById("matrix");

for (let bb=15; bb>=5; bb--) {
  const o=document.createElement("option");
  o.value=bb; o.textContent=`${bb} BB`; stackEl.appendChild(o);
}

function setSpotOptions(){
  const pos=positionEl.value;
  spotEl.innerHTML="";
  const opts = pos==="BB"
    ? [["vs_btn_open","Vs open BTN"],["vs_sb_limp","Vs limp SB"],["vs_sb_raise","Vs raise SB"]]
    : [["firstin","First in / unopened"],["vs_limp","Vs limp"],["vs_raise","Vs raise"]];
  opts.forEach(([v,l],i)=>{
    const o=document.createElement("option"); o.value=v; o.textContent=l;
    if(pos!=="BB" && i>0)o.disabled=true;
    spotEl.appendChild(o);
  });
}

function ri(r){ return ranks.indexOf(r); }
function handAt(r,c){
  if(r===c)return ranks[r]+ranks[c];
  return r<c ? ranks[r]+ranks[c]+"s" : ranks[c]+ranks[r]+"o";
}
function pairRange(a,b){
  const ia=ri(a), ib=ri(b), out=[];
  const step=ia<ib?1:-1;
  for(let i=ia;;i+=step){out.push(ranks[i]+ranks[i]); if(i===ib)break;}
  return out;
}
function expandToken(t){
  let m=t.match(/^([AKQJT98765432])\1\+$/);
  if(m){ const out=[]; for(let i=ri(m[1]);i>=0;i--)out.push(ranks[i]+ranks[i]); return out; }

  m=t.match(/^([AKQJT98765432])([AKQJT98765432])([so])\+$/);
  if(m){ const out=[]; const hi=ri(m[1]), lo=ri(m[2]); for(let j=lo;j>hi;j--)out.push(m[1]+ranks[j]+m[3]); return out; }

  m=t.match(/^([AKQJT98765432])\1-([AKQJT98765432])\2$/);
  if(m)return pairRange(m[1],m[2]);

  m=t.match(/^([AKQJT98765432])([AKQJT98765432])([so])-([AKQJT98765432])([AKQJT98765432])\3$/);
  if(m && m[1]===m[4]){
    const out=[]; const i1=ri(m[2]), i2=ri(m[5]), step=i1<i2?1:-1;
    for(let i=i1;;i+=step){out.push(m[1]+ranks[i]+m[3]); if(i===i2)break;}
    return out;
  }
  return [t];
}
function parseNotation(s){
  const set=new Set();
  (s||"").split(",").map(x=>x.trim()).filter(Boolean).forEach(t=>expandToken(t).forEach(h=>set.add(h)));
  return set;
}

function currentKey(){return `${stackEl.value}|${positionEl.value}|${spotEl.value}`;}
function actionLabel(a){return ({fold:"Fold",limp:"Limp",raise:"Raise",shove:"All-in"})[a]||a;}

function renderBreakdown(data){
  const box=document.getElementById("breakdown");
  const v=data?.breakdown||{fold:100,limp:0,raise:0,shove:0};
  box.innerHTML="";
  ["fold","limp","raise","shove"].forEach(a=>{
    const pct=v[a]||0, row=document.createElement("div");
    row.className="action-row";
    row.innerHTML=`<div style="width:100%">
      <div style="display:flex;justify-content:space-between">
        <div class="action-left"><i class="swatch ${a}"></i><span>${actionLabel(a)}</span></div>
        <strong>${pct.toFixed(1).replace(".0","")} %</strong>
      </div>
      <div class="bar"><div class="fill ${a}" style="width:${pct}%"></div></div>
    </div>`;
    box.appendChild(row);
  });
}
function dominantAction(data){
  if(!data?.breakdown)return "—";
  return actionLabel(Object.entries(data.breakdown).sort((a,b)=>b[1]-a[1])[0][0]);
}
function renderDetail(hand,state){
  const box=document.getElementById("handDetail");
  if(state==="play100"){
    box.innerHTML=`<div class="big-hand">${hand}</div><p><strong>Joué 100 %</strong></p><p>La main appartient à la range pure publiée. Le split exact entre les actions n'est pas déduit.</p>`;
  } else if(state==="play50"){
    box.innerHTML=`<div class="big-hand">${hand}</div><p><strong>Joué ≥ 50 %</strong></p><p>La main est marginale/mixée dans la solution publique. Fréquence exacte non exposée dans le résumé texte.</p>`;
  } else {
    box.innerHTML=`<div class="big-hand">${hand}</div><p><strong>Fold / non publié</strong></p><p>La main n'apparaît pas dans les catégories publiques ≥50 % pour ce spot.</p>`;
  }
}
function render(){
  const data=RANGE_DATA[currentKey()];
  const pure=parseNotation(data?.pure), fifty=parseNotation(data?.fifty);

  document.getElementById("spotTitle").textContent=data?.label||`${positionEl.value} • ${stackEl.value} BB`;
  document.getElementById("playedPct").textContent=data?.playedPct||"—";
  document.getElementById("dominantAction").textContent=dominantAction(data);
  document.getElementById("dataStatus").textContent=data?.status||"À compléter";
  document.getElementById("sourceText").textContent=data?.source||"Aucune donnée publique validée intégrée pour ce spot.";
  document.getElementById("warningBox").textContent=data?.warning||"Spot prêt dans l'interface, données à rechercher et valider.";
  renderBreakdown(data);

  matrixEl.innerHTML="";
  for(let r=0;r<13;r++)for(let c=0;c<13;c++){
    const h=handAt(r,c);
    let state="unknown";
    if(pure.has(h))state="play100";
    else if(fifty.has(h))state="play50";
    const el=document.createElement("button");
    el.type="button"; el.className=`cell ${state}`; el.textContent=h;
    el.title=`${h} — ${state==="play100"?"Joué 100%":state==="play50"?"Joué ≥50%":"Non publié ≥50%"}`;
    el.onclick=()=>renderDetail(h,state);
    matrixEl.appendChild(el);
  }
  document.getElementById("handDetail").innerHTML=`<div class="big-hand">—</div><p>Clique sur une case de la matrice.</p>`;
}

positionEl.addEventListener("change",()=>{setSpotOptions();render();});
stackEl.addEventListener("change",render);
spotEl.addEventListener("change",render);
setSpotOptions(); render();
