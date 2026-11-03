/* WordUp Playful Progress Layer — V1 */
(function () {
  "use strict";
  const LEVELS = ["foundation","a1","a2","b1","b2","c1","c2","academic"];
  const LEVEL_LABELS = ["Foundation","A1 Beginner","A2 Elementary","B1 Intermediate","B2 Upper-Intermediate","C1 Advanced","C2 Proficiency","Academic"];
  const SKILLS = ["vocabulary","grammar","reading","listening","writing","speaking"];
  const ICONS = {vocabulary:"📚",grammar:"🧩",reading:"📖",listening:"🎧",writing:"✍️",speaking:"🎙️"};
  const LABELS = {vocabulary:"Vocabulary",grammar:"Grammar",reading:"Reading",listening:"Listening",writing:"Writing",speaking:"Speaking"};
  const $ = (s, root=document) => root.querySelector(s);
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function content(){ try{return typeof window.wordUpGetAllContent==="function" ? window.wordUpGetAllContent() : [];}catch(e){return [];} }
  function progress(){ try{return typeof window.wordUpGetProgress==="function" ? window.wordUpGetProgress() : {lessons:{},tests:{},scores:{},xp:0,streak:0,mistakes:[]};}catch(e){return {lessons:{},tests:{},scores:{},xp:0,streak:0,mistakes:[]};} }
  function completed(p,id){return !!(p.lessons && p.lessons[id] && p.lessons[id].completed);}
  function getStats(){
    const c=content(), p=progress(), done=c.filter(x=>completed(p,x.id)).length;
    const total=c.length, pct=total?Math.round(done/total*100):0;
    const passed=Object.values(p.tests||{}).filter(x=>x && x.passed).length;
    return {c,p,done,total,pct,xp:Number(p.xp)||0,streak:Number(p.streak)||0,passed};
  }
  function levelFor(p,c){
    for(let i=0;i<LEVELS.length;i++){
      const lessons=c.filter(x=>x.level===LEVELS[i]);
      if(lessons.some(x=>!completed(p,x.id))) return i;
    }
    return LEVELS.length-1;
  }
  function nextLesson(p,c){
    return c.find(x=>!completed(p,x.id)) || null;
  }
  function insertHome(){
    const home=$("#home");
    if(!home || $("#wuGameHero")) return;
    const header=$(".wu-home-header",home);
    if(!header) return;
    const panel=document.createElement("section");
    panel.id="wuGameHero";
    panel.className="wu-game-hero";
    panel.innerHTML='<div class="wu-game-orb" aria-hidden="true">✦</div><div class="wu-game-copy"><span class="wu-game-kicker">YOUR ENGLISH ADVENTURE</span><h2>Every lesson is a new level.</h2><p>Collect XP, build your streak and unlock the next stage of your English journey.</p><div class="wu-game-meta"><span id="wuGameLevel">🏁 Your journey</span><span id="wuGameStreak">🔥 0-day streak</span></div></div><div class="wu-game-cta"><div class="wu-game-xp"><strong id="wuGameXP">0</strong><span>XP</span></div><button type="button" id="wuGamePlay">Play next lesson <span>→</span></button></div>';
    header.insertAdjacentElement("afterend",panel);
    $("#wuGamePlay",panel).addEventListener("click",()=>{
      if(typeof window.continueLearning==="function") window.continueLearning();
      else if(typeof window.showScreen==="function") window.showScreen("curriculum");
    });
  }
  function renderHome(){
    insertHome();
    const s=getStats(), p=s.p, c=s.c, idx=levelFor(p,c), next=nextLesson(p,c);
    const xp=$("#wuGameXP"), streak=$("#wuGameStreak"), level=$("#wuGameLevel"), btn=$("#wuGamePlay");
    if(xp) xp.textContent=s.xp.toLocaleString();
    if(streak) streak.textContent="🔥 "+s.streak+"-day streak";
    if(level) level.textContent="🏁 "+LEVEL_LABELS[idx]+" · "+s.pct+"% journey";
    if(btn) btn.innerHTML=next?'Play: '+esc(next.topic||next.title)+' <span>→</span>':'Replay your favourite lesson <span>↻</span>';
    const welcome=$("#wuWelcomeName");
    if(welcome){const n=$("#wuProfileName"); if(n && n.textContent.trim() && n.textContent.trim()!=="Learner") welcome.textContent=n.textContent.trim();}
    const ids={wuXP:s.xp,wuStreak:s.streak,wuMastery:s.pct+"%",wuTests:s.passed};
    Object.keys(ids).forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=ids[id];});
    const cont=$("#wuContinueProgress"),pct=$("#wuContinuePercent");
    if(cont)cont.style.width=s.pct+"%";
    if(pct)pct.textContent=s.pct+"%";
    const title=$("#wuContinueTitle"),sub=$("#wuContinueSubtitle");
    if(title)title.textContent=next?(next.topic||next.title||"Your next lesson"):"All lessons completed!";
    if(sub)sub.textContent=next?LEVEL_LABELS[LEVELS.indexOf(next.level)]+" · "+(LABELS[next.skill]||next.skill):"Amazing work. Keep your skills sharp with review.";
    const bars={vocabulary:"wuVocabulary",grammar:"wuGrammar",reading:"wuReading",listening:"wuListening",writing:"wuWriting"};
    Object.keys(bars).forEach(skill=>{
      const arr=c.filter(x=>x.skill===skill), n=arr.filter(x=>completed(p,x.id)).length, value=arr.length?Math.round(n/arr.length*100):0;
      const label=$("#"+bars[skill]),bar=$("#"+bars[skill]+"Bar");
      if(label)label.textContent=value+"%";
      if(bar)bar.style.width=value+"%";
    });
  }
  function renderDashboard(){
    const box=$("#dashboardContent"); if(!box)return;
    const s=getStats(), p=s.p, c=s.c, idx=levelFor(p,c), next=nextLesson(p,c);
    const skillCards=SKILLS.map(skill=>{
      const arr=c.filter(x=>x.skill===skill), done=arr.filter(x=>completed(p,x.id)).length, pct=arr.length?Math.round(done/arr.length*100):0;
      return '<article class="wu-game-skill"><div class="wu-game-skill-icon">'+ICONS[skill]+'</div><div class="wu-game-skill-main"><div class="wu-game-skill-head"><strong>'+LABELS[skill]+'</strong><b>'+pct+'%</b></div><div class="wu-game-meter"><span style="width:'+pct+'%"></span></div><small>'+done+' of '+arr.length+' lessons cleared</small></div></article>';
    }).join("");
    const levelCards=LEVELS.map((level,i)=>{
      const arr=c.filter(x=>x.level===level); if(!arr.length)return "";
      const done=arr.filter(x=>completed(p,x.id)).length, pct=Math.round(done/arr.length*100);
      return '<div class="wu-game-level '+(i===idx?"is-current":"")+'"><span class="wu-game-level-num">'+(i+1)+'</span><div><strong>'+LEVEL_LABELS[i]+'</strong><small>'+done+'/'+arr.length+' missions completed</small><div class="wu-game-meter"><span style="width:'+pct+'%"></span></div></div><b>'+pct+'%</b></div>';
    }).join("");
    const badges=[
      {icon:"🌱",name:"First Steps",desc:"Complete your first lesson",ok:s.done>=1},
      {icon:"🔥",name:"On Fire",desc:"Build a 3-day streak",ok:s.streak>=3},
      {icon:"⭐",name:"XP Collector",desc:"Earn 100 XP",ok:s.xp>=100},
      {icon:"🏆",name:"Test Champion",desc:"Pass your first test",ok:s.passed>=1},
      {icon:"💎",name:"Dedicated Learner",desc:"Complete 25 lessons",ok:s.done>=25},
      {icon:"👑",name:"English Explorer",desc:"Complete 100 lessons",ok:s.done>=100}
    ].map(b=>'<div class="wu-game-badge '+(b.ok?"earned":"locked")+'"><span>'+b.icon+'</span><strong>'+b.name+'</strong><small>'+b.desc+'</small><em>'+(b.ok?"UNLOCKED":"LOCKED")+'</em></div>').join("");
    box.innerHTML='<div class="wu-game-dashboard"><section class="wu-game-dashboard-hero"><div><span class="wu-game-kicker">PLAYER DASHBOARD</span><h2>Your progress is your power.</h2><p>Small wins become big skills. Keep moving and watch your English level up.</p></div><div class="wu-game-level-ring"><strong>'+s.pct+'%</strong><span>journey</span></div></section><div class="wu-game-stat-row"><article><span>✨</span><strong>'+s.xp.toLocaleString()+'</strong><small>Total XP</small></article><article><span>🔥</span><strong>'+s.streak+'</strong><small>Day streak</small></article><article><span>🎯</span><strong>'+s.done+'</strong><small>Lessons cleared</small></article><article><span>🏆</span><strong>'+s.passed+'</strong><small>Tests passed</small></article></div><section class="wu-game-section"><div class="wu-game-section-title"><div><span class="wu-game-kicker">SKILL POWER</span><h3>Build your six skills</h3></div><span class="wu-game-chip">6 skill zones</span></div><div class="wu-game-skill-grid">'+skillCards+'</div></section><section class="wu-game-section"><div class="wu-game-section-title"><div><span class="wu-game-kicker">WORLD MAP</span><h3>Levels you can conquer</h3></div><span class="wu-game-chip">8 stages</span></div><div class="wu-game-level-list">'+levelCards+'</div></section><section class="wu-game-section"><div class="wu-game-section-title"><div><span class="wu-game-kicker">ACHIEVEMENTS</span><h3>Your trophy shelf</h3></div><span class="wu-game-chip">'+((badges.match(/UNLOCKED/g)||[]).length)+' unlocked</span></div><div class="wu-game-badge-grid">'+badges+'</div></section>'+(next?'<button type="button" class="wu-game-next" id="wuDashboardNext">Continue your next mission: '+esc(next.topic||next.title)+' <span>→</span></button>':'<div class="wu-game-next">🎉 You have cleared every lesson. You are a WordUp legend!</div>')+'</div>';
    const b=$("#wuDashboardNext");if(b)b.addEventListener("click",()=>{if(typeof window.continueLearning==="function")window.continueLearning();});
  }
  function renderProfile(){
    const s=getStats(), p=s.p;
    const values={wuProfileXP:s.xp.toLocaleString(),wuProfileStreak:s.streak,wuProfileMastery:s.pct+"%",wuProfileTests:s.passed};
    Object.keys(values).forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=values[id];});
    const avatar=$("#wuProfileAvatar"); if(avatar){const name=($("#wuProfileName")?.textContent||"Learner").trim();avatar.textContent=(name[0]||"L").toUpperCase();}
    const layout=$(".wu-profile-layout");
    if(layout && !$("#wuProfileTrophy")){const trophy=document.createElement("section");trophy.id="wuProfileTrophy";trophy.className="wu-profile-trophy";trophy.innerHTML='<span class="wu-game-kicker">PLAYER ACHIEVEMENTS</span><h3>Your trophy shelf</h3><div class="wu-game-profile-achievements"></div>';layout.insertAdjacentElement("afterend",trophy);}
    const target=$(".wu-game-profile-achievements");
    if(target){const defs=[["🌱","First Steps",s.done>=1],["🔥","On Fire",s.streak>=3],["⭐","XP Collector",s.xp>=100],["🏆","Test Champion",s.passed>=1],["💎","Dedicated Learner",s.done>=25],["👑","English Explorer",s.done>=100]];target.innerHTML=defs.map(x=>'<span class="wu-profile-achievement '+(x[2]?"earned":"")+'"><b>'+x[0]+'</b>'+x[1]+'</span>').join("");}
  }
  function refresh(){
    renderHome();
    if($("#dashboard")?.classList.contains("active"))renderDashboard();
    if($("#profile")?.classList.contains("active"))renderProfile();
  }
  const originalShow=window.showScreen;
  if(typeof originalShow==="function"){
    window.showScreen=function(id){const result=originalShow.apply(this,arguments);if(id==="profile")renderProfile();if(id==="home")renderHome();if(id==="dashboard")renderDashboard();return result;};
  }
  window.renderDashboard=renderDashboard;
  window.wordUpRefreshGamification=refresh;
  document.addEventListener("DOMContentLoaded",refresh);
  window.addEventListener("storage",refresh);
  window.addEventListener("wordup:progress",refresh);
  if(document.readyState!=="loading")refresh();
  else document.addEventListener("DOMContentLoaded",refresh,{once:true});
})();
