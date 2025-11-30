// script.js — mobile-first interactions: nav toggle, LOD loader, scroll reveal

document.addEventListener('DOMContentLoaded', function(){
  // nav toggle for mobile
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });

  // reveal on scroll (simple, performant)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    const revealEls = document.querySelectorAll('.card, .project, .hero-copy, .hero-visual, .site-footer');
    const ro = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          // once revealed, unobserve for perf
          ro.unobserve(e.target);
        }
      });
    }, {threshold:0.12});
    revealEls.forEach(el => ro.observe(el));
  } else {
    document.querySelectorAll('.card, .project, .hero-copy, .hero-visual, .site-footer').forEach(el => el.classList.add('revealed'));
  }

  // Progressive LOD for images with class 'lod'
  function enhanceLOD(lod){
    const low = lod.querySelector('img.low');
    const mid = lod.querySelector('img.mid');
    const high = lod.querySelector('img.high');
    const midSrc = lod.dataset.mid;
    const highSrc = lod.dataset.high;
    if(mid && midSrc) mid.src = midSrc;
    if(high && highSrc) high.src = highSrc;

    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(en => {
        if(en.isIntersecting){
          if(mid && !mid.complete){
            const img = new Image(); img.src = mid.src; img.onload = () => {
              lod.classList.add('loaded');
            }
          } else {
            lod.classList.add('loaded');
          }
          o.unobserve(en.target);
        }
      });
    }, {rootMargin: '200px'});
    obs.observe(lod);

    let highLoaded = false;
    function loadHigh(){
      if(highLoaded || !high) return;
      const img = new Image(); img.src = high.src; img.onload = ()=>{ highLoaded = true; lod.classList.add('highvisible'); }
    }
    lod.addEventListener('pointerenter', loadHigh);
    lod.addEventListener('touchstart', loadHigh, {passive:true});

    // click to open overlay
    lod.addEventListener('click', ()=> {
      const overlay = document.createElement('div');
      overlay.style.position='fixed'; overlay.style.inset=0; overlay.style.background='rgba(2,6,12,0.75)'; overlay.style.display='flex';
      overlay.style.alignItems='center'; overlay.style.justifyContent='center'; overlay.style.zIndex=9999;
      const img = document.createElement('img'); img.style.maxWidth='92%'; img.style.maxHeight='92%'; img.style.borderRadius='12px';
      img.src = highLoaded ? high.src : mid.src;
      overlay.appendChild(img);
      overlay.addEventListener('click', ()=> document.body.removeChild(overlay));
      document.body.appendChild(overlay);
    });
  }

  document.querySelectorAll('.lod').forEach(enhanceLOD);
});

//button to insta dm for help ---------------------------------------------------------------




//video................

