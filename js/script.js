// Personalization
const TO = 'Rajoshree / Babee';
const FROM = 'Lov / Hubby';
const lines = [
  `Hey ${TO},`,
  `Aaj humara pehla saal poora hua — har pal tumhare saath ek nayi kahani ban gaya. `,
  `Tumhari hasi mere din ka sabse pyara hissa hai, aur tumhara saath mere liye sabse bada comfort.`,
  `Chhoti chhoti baatein tumse hi khubsurat lagti hain. Tum ho to sab theek lagta hai.`,
  `Aane wale saalon me bhi main har din tumhe zyada pyaar dunga aur roz tumhe hansane ki koshish karunga.`,
  `Tum meri strength, meri peace aur meri favourite adventure ho.`,
  `Aaj ke din sirf itna kehna hai — thank you for being mine.`,
  `Happy 1st Anniversary, my Babee.`, 
  ``,
  `With all my love.`,
  `${FROM}`
];

// typing
const messageBox = document.getElementById('messageBox');
const revealBtn = document.getElementById('revealBtn');
let typing=false;
function typeWriter(textLines, container){
  if(typing) return;
  typing=true; container.classList.remove('empty'); container.innerText='';
  let i=0,j=0,cur='';
  function step(){
    if(i>=textLines.length){ typing=false; return; }
    const line = textLines[i];
    if(j<line.length){
      cur += line[j++];
      container.innerText = cur + (j%2? '|' : '');
      setTimeout(step, 24 + Math.random()*36);
    } else {
      cur += '\n'; j=0; i++; setTimeout(step, 220);
    }
  }
  step();
}

revealBtn.addEventListener('click', ()=> typeWriter(lines, messageBox));

// hearts spawn helper
function spawnHearts(containerId, count=12){
  const wrap = document.getElementById(containerId);
  if(!wrap) return;
  for(let i=0;i<count;i++){
    const h = document.createElement('div');
    h.className='heart';
    h.innerText = '❤️';
    const left = 10 + Math.random()*80;
    const top = 40 + Math.random()*40;
    h.style.left = left + '%';
    h.style.top = top + '%';
    h.style.fontSize = (14 + Math.random()*26) + 'px';
    h.style.animationDelay = (i * 120) + 'ms';
    wrap.appendChild(h);
    setTimeout(()=>{ try{ h.remove(); }catch(e){} }, 2600 + i*120);
  }
}

// celebrate button
document.getElementById('celebrateBtn').addEventListener('click', ()=>{
  spawnHearts('hearts1', 20);
  spawnHearts('hearts2', 20);
  playTone();
});

// tiny tone
function playTone(){
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type='sine'; o.frequency.value = 660; g.gain.value = 0.02; o.connect(g); g.connect(ctx.destination); o.start();
    setTimeout(()=>{ o.frequency.value = 900; }, 160);
    setTimeout(()=>{ g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8); }, 600);
    setTimeout(()=>{ o.stop(); ctx.close(); }, 1000);
  }catch(e){}
}

// navigation
const p1 = document.getElementById('page1');
const p2 = document.getElementById('page2');
document.getElementById('goto2').addEventListener('click', ()=>{ p1.style.display='none'; p2.style.display='flex'; });
document.getElementById('backBtn').addEventListener('click', ()=>{ p2.style.display='none'; p1.style.display='flex'; });

// download full standalone HTML
document.getElementById('downloadBtn').addEventListener('click', ()=>{
  const content = generateStandalone();
  const blob = new Blob([content], {type:'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'happy_anniversary_rajoshree_lov.html'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});

// download card image as HTML
document.getElementById('downloadCard').addEventListener('click', ()=>{
  const cardHtml = generateCardHTML();
  const blob = new Blob([cardHtml], {type:'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'anniversary_card.html'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});

function escapeHtml(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

function generateStandalone(){
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Happy 1st Anniversary — ${escapeHtml(TO)}</title><style>body{margin:0;font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,Arial;background:linear-gradient(180deg,#fff6fb,#fff0f6);color:#3a1a2b;padding:28px}.card{max-width:720px;margin:40px auto;background:linear-gradient(180deg,#ffffff,#fff6fb);padding:28px;border-radius:12px;box-shadow:0 30px 60px rgba(2,6,23,0.08)}h1{margin:0 0 12px}pre{white-space:pre-wrap;font-family:inherit;font-size:16px;line-height:1.6}.photo{width:200px;height:200px;border-radius:50%;margin:20px auto;overflow:hidden;border:8px solid rgba(255,255,255,0.6);display:grid;place-items:center;background:linear-gradient(180deg,#ffe6ef,#ffd9e6)}</style></head><body><div class="card"><h1>To ${escapeHtml(TO)}</h1><div class="photo">❤️</div><pre>${escapeHtml(lines.join('\n'))}</pre><p style="text-align:right;margin-top:20px"><strong>${escapeHtml(FROM)}</strong></p></div></body></html>`;
  return html;
}

function generateCardHTML(){
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Anniversary Card — ${escapeHtml(TO)}</title><style>body{margin:0;font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,Arial;background:linear-gradient(180deg,#fff6fb,#fff0f6);color:#3a1a2b;padding:28px}.card{max-width:520px;margin:40px auto;background:linear-gradient(180deg,#ffffff,#fff6fb);padding:28px;border-radius:12px;box-shadow:0 20px 40px rgba(2,6,23,0.08);text-align:center}.photo{width:200px;height:200px;border-radius:50%;margin:20px auto;overflow:hidden;border:8px solid rgba(255,255,255,0.6);display:grid;place-items:center;background:linear-gradient(180deg,#ffe6ef,#ffd9e6)}</style></head><body><div class="card"><h1>To ${escapeHtml(TO)}</h1><div class="photo">❤️</div><p style="white-space:pre-wrap">${escapeHtml(lines.join('\n'))}</p><p style="text-align:right;margin-top:20px"><strong>${escapeHtml(FROM)}</strong></p></div></body></html>`;
  return html;
}