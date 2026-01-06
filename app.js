/* Flow Medical Solutions – UI + Animations + 3D Logo Control */

(function(){
  const qs = (s, el=document) => el.querySelector(s);
  const qsa = (s, el=document) => [...el.querySelectorAll(s)];

  // Dropdown (Solutions)
  qsa('[data-drop]').forEach(drop => {
    const btn = qs('button', drop);
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      qsa('[data-drop]').forEach(d => d !== drop && d.classList.remove('open'));
      drop.classList.toggle('open');
    });
  });
  document.addEventListener('click', () => qsa('[data-drop]').forEach(d => d.classList.remove('open')));

  // Scroll reveal
  const revealEls = qsa('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting){
        ent.target.classList.add('is-in');
        io.unobserve(ent.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // 3D Logo – mouse parallax
  const cube = qs('[data-logo3d]');
  const wrap = qs('[data-logo3d-wrap]');
  if(cube && wrap){
    let raf = null;

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) - 0.5;
      const y = ((e.clientY - r.top) / r.height) - 0.5;

      if(raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(()=>{
        // keep subtle (HQ, not jittery)
        cube.style.transform = `rotateX(${(-18 + (-y*10)).toFixed(2)}deg) rotateY(${(28 + (x*16)).toFixed(2)}deg)`;
      });
    };

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', () => {
      cube.style.transform = 'rotateX(-18deg) rotateY(28deg)';
    });
  }

  // News filters (news.html)
  const chips = qsa('[data-filter]');
  const newsCards = qsa('[data-news]');
  if(chips.length && newsCards.length){
    chips.forEach(chip=>{
      chip.addEventListener('click', ()=>{
        chips.forEach(c=>c.classList.remove('active'));
        chip.classList.add('active');
        const val = chip.getAttribute('data-filter');

        newsCards.forEach(card=>{
          const cat = card.getAttribute('data-cat');
          const show = (val === 'all' || val === cat);
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }
})();
