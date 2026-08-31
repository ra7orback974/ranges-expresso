
const ranks=['A','K','Q','J','T','9','8','7','6','5','4','3','2'];
const grid=document.querySelector('#grid'), depth=document.querySelector('#depth');
let position='BTN', selected='AA', simplified=false;

// 15bb solved-summary source:
// BTN: 32.1% played = 24.4% raise 2bb + 7.7% shove, 67.9% fold.
// SB: 62.0% played = 26.5% raise 2.2bb + 19.5% shove + 16.0% limp, 38.0% fold.
// Exact per-hand frequencies are not publicly exposed in the indexed source, so this UI
// marks the clearly published pure/50%+ regions and labels the chart as an approximation
// where exact cell frequencies are unavailable.

const ranges15 = {
  BTN: {
    summary:{fold:67.9, limp:0, raise:24.4, allin:7.7, size:'2bb'},
    pure:[
      '22+','A3s+','K5s+','Q7s+','J8s+','T7s+','97s+','87s+',
      'A6o+','K9o+','QTo+','JTo+'
    ],
    fifty:[
      '22+','A2s+','K5s+','Q7s+','J8s+','T7s+','97s+','86s+','76s+',
      'A5o+','K9o+','QTo+','JTo+','T9o+'
    ]
  },
  SB: {
    summary:{fold:38.0, limp:16.0, raise:26.5, allin:19.5, size:'2.2bb'},
    pure:[
      '44-22','TT+','AQs+','K9s+','QTs','JTs+','T9s+','T7s','T4s','97s+','86s+','76s+',
      'AJo-A2o','KJo','K7o'
    ],
    fifty:[
      '55-22','77+','AQs+','A8s-A4s','A2s','K8s+','K6s-K3s','QTs+','Q7s-Q3s',
      'J3s+','T6s+','T4s','95s+','85s+','74s+','63s+','53s+','43s+',
      'A2o+','K5o+','Q8o+','J8o+','T8o+','97o+','87o+'
    ]
  }
};

function handName(r,c){
  if(r===c)return ranks[r]+ranks[c];
  return r<c?ranks[r]+ranks[c]+'s':ranks[c]+ranks[r]+'o';
}
function rankIndex(x){ return ranks.indexOf(x); }

function expandToken(tok){
  const all=[];
  if(tok.includes('-')){
    const [a,b]=tok.split('-');
    const suffix=a.endsWith('s')?'s':a.endsWith('o')?'o':'';
    const ra=a[0], rb=b[0];
    if(a.length===2 && b.length===2 && a[0]===a[1] && b[0]===b[1]){
      let i=rankIndex(a[0]), j=rankIndex(b[0]);
      for(let k=Math.min(i,j);k<=Math.max(i,j);k++) all.push(ranks[k]+ranks[k]);
      return all;
    }
    if(a[0]===b[0]){
      const hi=a[0], i=rankIndex(a[1]), j=rankIndex(b[1]);
      for(let k=Math.min(i,j);k<=Math.max(i,j);k++) all.push(hi+ranks[k]+suffix);
      return all;
    }
  }
  if(tok.endsWith('+')){
    const base=tok.slice(0,-1);
    const suffix=base.endsWith('s')?'s':base.endsWith('o')?'o':'';
    const core=suffix?base.slice(0,-1):base;
    if(core.length===2 && core[0]===core[1]){
      const idx=rankIndex(core[0]);
      for(let k=idx;k>=0;k--) all.push(ranks[k]+ranks[k]);
      return all;
    }
    const high=core[0], low=core[1];
    const h=rankIndex(high), l=rankIndex(low);
    for(let k=l;k>h;k--) all.push(high+ranks[k]+suffix);
    return all;
  }
  return [tok];
}
function expandList(list){
  const s=new Set();
  list.forEach(t=>expandToken(t).forEach(h=>s.add(h)));
  return s;
}
Object.values(ranges15).forEach(x=>{
  x.pureSet=expandList(x.pure);
  x.fiftySet=expandList(x.fifty);
});

function actionFor15(h,pos){
  const data=ranges15[pos];
  const pure=data.pureSet.has(h), fifty=data.fiftySet.has(h);
  if(pos==='BTN'){
    if(pure){
      // heuristic split only for visualization; aggregate percentages stay exact
      const pair=h.length===2;
      const hi=rankIndex(h[0]), lo=rankIndex(h[1]||h[0]);
      if(pair && rankIndex(h[0])>=7) return 'allin';
      if(h.endsWith('o') && hi<=1 && lo>=8) return 'allin';
      return 'raise';
    }
    if(fifty) return 'mix';
    return 'fold';
  }
  if(pos==='SB'){
    if(pure){
      if(h.length===2 && ['22','33','44'].includes(h)) return 'allin';
      if(h.endsWith('o') && h[0]==='A') return 'allin';
      if(['T7s','T4s','97s','86s','76s'].includes(h)) return 'limp';
      return 'raise';
    }
    if(fifty){
      const n=rankIndex(h[0])+rankIndex(h[1]);
      return n%3===0?'limp':n%3===1?'mix':'allin';
    }
    return 'fold';
  }
  return 'fold';
}

function render(){
  // 15bb is the validated dataset for this V2
  depth.value='15';
  depth.disabled=true;
  document.querySelector('#infoDepth').textContent='15bb deep';

  if(position==='BB') position='BTN';
  grid.innerHTML='';
  ranks.forEach((_,r)=>ranks.forEach((_,c)=>{
    const h=handName(r,c), a=actionFor15(h,position);
    const b=document.createElement('button');
    b.className='hand '+a+(h===selected?' selected':'');
    b.textContent=h;
    b.title = ranges15[position].pureSet.has(h) ? 'Ouvert à 100% dans la source publiée' :
              ranges15[position].fiftySet.has(h) ? 'Ouvert à 50%+ dans la source publiée' :
              'En dehors de la zone 50%+ publiée';
    b.onclick=()=>{selected=h;render()};
    grid.appendChild(b);
  }));

  const s=ranges15[position].summary;
  document.querySelector('#position').textContent=position;
  document.querySelector('#spotTitle').textContent=position+' OPEN · 15BB';
  document.querySelector('#actionTitle').textContent=position+' OPEN 15BB';
  document.querySelector('#rangePct').textContent=(100-s.fold).toFixed(1)+'% joué';
  document.querySelector('#selectedHand').textContent=selected;

  const rows=[
    ['fold','Fold',s.fold.toFixed(1)],
    ['limp','Limp',s.limp.toFixed(1)],
    ['raise','Raise '+s.size,s.raise.toFixed(1)],
    ['allin','All-in',s.allin.toFixed(1)]
  ].filter(x=>+x[2]>0);

  document.querySelector('#legend').innerHTML=rows.map(x=>
    `<div class="legend-row"><i class="swatch ${x[0]}"></i><strong>${x[1]}</strong><span>${x[2]}%</span></div>`
  ).join('');

  const a=actionFor15(selected,position);
  document.querySelector('#selectedHand').className='selected-hand '+a;
  const published = ranges15[position].pureSet.has(selected) ? '100% open publié' :
                    ranges15[position].fiftySet.has(selected) ? '50%+ open publié' : 'hors zone 50%+ publiée';
  document.querySelector('#detail').innerHTML=
    `Main : <b>${selected}</b><br>`+
    `Lecture : <b>${published}</b><br>`+
    `Affichage cellule : <b>${a==='mix'?'stratégie mixée':a}</b><br>`+
    `<small>Les pourcentages globaux sont issus de la solution 15bb. Les répartitions exactes par cellule restent à importer.</small>`;
}

document.querySelectorAll('.seat').forEach(b=>{
  if(b.dataset.pos==='BB'){
    b.style.opacity='.45'; b.title='Les ranges de défense BB seront ajoutées ensuite';
  }
  b.onclick=()=>{
    if(b.dataset.pos==='BB') return;
    document.querySelectorAll('.seat').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    position=b.dataset.pos;
    render();
  };
});
document.querySelector('.btn').classList.add('active');
document.querySelector('.sb').classList.remove('active');
document.querySelector('#simplify').style.display='none';
render();
