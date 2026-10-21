(function(){
  /* theme toggle: dark by default, light on request or by system setting */
  var root=document.documentElement, btn=document.getElementById('theme-toggle');
  function current(){return root.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}
  function label(){btn.textContent=current()==='dark'?'Light':'Dark'}
  label();
  btn.addEventListener('click',function(){var next=current()==='dark'?'light':'dark';root.setAttribute('data-theme',next);try{localStorage.setItem('iw-mock-theme',next)}catch(e){}label()});

  /* mobile menu */
  var mb=document.getElementById('menu-btn'), mn=document.getElementById('mnav');
  if(mb&&mn)mb.addEventListener('click',function(){var open=mn.classList.toggle('open');mb.setAttribute('aria-expanded',open);mb.textContent=open?'Close':'Menu'});

  /* forms are a mockup */
  document.querySelectorAll('form[data-mock]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var s=f.querySelector('.status');if(s)s.textContent='Mockup: this form does not send anything.'})});

  /* falling snow, same behaviour as the live hero */
  var c=document.getElementById('snow');
  if(!c||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var ctx=c.getContext('2d'),W,H,parts=[],dpr=window.devicePixelRatio||1;
  function size(){W=c.width=c.offsetWidth*dpr;H=c.height=c.offsetHeight*dpr}
  size();addEventListener('resize',size);
  function spawn(anywhere){var d=Math.random();return{x:Math.random()*W,y:anywhere?Math.random()*H:-10*dpr,r:(d*1.8+.6)*dpr,vy:(d*.9+.35)*dpr,sway:Math.random()*Math.PI*2,ss:Math.random()*.015+.004,amp:(Math.random()*.5+.2)*dpr,o:d*.55+.15}}
  var N=Math.min(160,Math.floor(innerWidth/9));for(var i=0;i<N;i++)parts.push(spawn(true));
  (function tick(){
    var rgb=getComputedStyle(root).getPropertyValue('--snow').trim()||'224,242,254';
    ctx.clearRect(0,0,W,H);
    for(var k=0;k<parts.length;k++){var p=parts[k];p.sway+=p.ss;p.y+=p.vy;p.x+=Math.sin(p.sway)*p.amp;
      if(p.y>H+10)Object.assign(p,spawn(false));if(p.x>W+10)p.x=-10;if(p.x<-10)p.x=W+10;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba('+rgb+','+p.o+')';ctx.fill()}
    requestAnimationFrame(tick);
  })();
})();
