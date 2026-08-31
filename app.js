const ranks=['A','K','Q','J','T','9','8','7','6','5','4','3','2'];
const grid=document.querySelector('#grid'), depth=document.querySelector('#depth');
let position='SB', selected='AA', simplified=false;

function handName(r,c){ if(r===c)return ranks[r]+ranks[c]; return r<c?ranks[r]+ranks[c]+'s':ranks[c]+ranks[r]+'o'; }
function score(h){
  if(h.length===2){const i=ranks.indexOf(h[0]); return 100-i*6;}
  const a=ranks.indexOf(h[0]),b=ranks.indexOf(h[1]), suited=h.endsWith('s');
  return 92-a*5-b*2+(suited?8:0);
}
function actionFor(h){
  const s=score(h), bb=+depth.value;
  let shift=position==='BTN'?4:position==='SB'?0:-12;
  let v=s+shift+(15-bb)*2.2;
  if(position==='BB') return v>70?'allin':v>48?'raise':v>35?'limp':'fold';
  if(v>76)return 'allin'; if(v>62)return simplified?'allin':'mix'; if(v>48)return 'raise'; if(v>39)return 'limp'; return 'fold';
}
function render(){
 grid.innerHTML='';
 let counts={fold:0,limp:0,raise:0,allin:0,mix:0};
 ranks.forEach((_,r)=>ranks.forEach((_,c)=>{
   const h=handName(r,c), a=actionFor(h); counts[a]++;
   const b=document.createElement('button'); b.className='hand '+a+(h===selected?' selected':''); b.textContent=h;
   b.onclick=()=>{selected=h;render()}; grid.appendChild(b);
 }));
 const total=169; const pct=k=>((counts[k]+(k==='raise'||k==='allin'?counts.mix*.5:0))/total*100).toFixed(1);
 document.querySelector('#position').textContent=position;
 document.querySelector('#infoDepth').textContent=depth.value+'bb deep';
 document.querySelector('#spotTitle').textContent=position==='BB'?'BB DEFEND':position+' OPEN';
 document.querySelector('#actionTitle').textContent=position==='BB'?'BB DEFENDS':position+' OPENS';
 document.querySelector('#rangePct').textContent=(100-counts.fold/total*100).toFixed(1)+'% joué';
 document.querySelector('#selectedHand').textContent=selected;
 const rows=[['fold','Fold',pct('fold')],['limp','Limp',pct('limp')],['raise','Raise',pct('raise')],['allin','All-in',pct('allin')]];
 document.querySelector('#legend').innerHTML=rows.map(x=>`<div class="legend-row"><i class="swatch ${x[0]}"></i><strong>${x[1]}</strong><span>${x[2]}%</span></div>`).join('');
 const a=actionFor(selected); document.querySelector('#selectedHand').className='selected-hand '+a;
 document.querySelector('#detail').innerHTML=`Action principale : <b>${a==='mix'?'Raise / All-in':a}</b><br>Profondeur : ${depth.value}bb<br>Position : ${position}`;
}
document.querySelectorAll('.seat').forEach(b=>b.onclick=()=>{document.querySelectorAll('.seat').forEach(x=>x.classList.remove('active'));b.classList.add('active');position=b.dataset.pos;render()});
depth.onchange=render;
document.querySelector('#simplify').onclick=()=>{simplified=!simplified;document.querySelector('#simplify').textContent=simplified?'Afficher la stratégie mixée':'Simplifier la range';render()};
render();
