import React,{useEffect,useRef,useState}from'react';
import{createRoot}from'react-dom/client';
import gsap from'gsap';
import{ScrollTrigger}from'gsap/ScrollTrigger';
import'./styles.css';
gsap.registerPlugin(ScrollTrigger);

const photos=[
'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=82',
'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=82',
'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1800&q=82',
'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1800&q=82',
'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=82',
'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1800&q=82',
'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1800&q=82',
'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=82',
'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1800&q=82',
'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1800&q=82',
'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1800&q=82',
'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1800&q=82',
'https://images.unsplash.com/photo-1537907510278-a8e2ed8f3f7f?auto=format&fit=crop&w=1800&q=82',
'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1800&q=82'
];
const fallback='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#123f6b"/><stop offset=".55" stop-color="#071624"/><stop offset="1" stop-color="#7c5840"/></linearGradient></defs><rect width="1200" height="1500" fill="url(#g)"/><circle cx="800" cy="420" r="240" fill="none" stroke="#d8b870" stroke-opacity=".35" stroke-width="3"/><path d="M120 1330 Q600 780 1080 1330" fill="none" stroke="#f5eddc" stroke-opacity=".2" stroke-width="3"/></svg>`);
function Photo({src,alt,className='',eager=false}){return <img className={className} src={src} alt={alt} loading={eager?'eager':'lazy'} fetchPriority={eager?'high':'auto'} onError={e=>{if(e.currentTarget.src!==fallback)e.currentTarget.src=fallback}}/>}
function App(){const root=useRef(null);const[entered,setEntered]=useState(false);
useEffect(()=>{if(!entered)return;const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduce)return;const ctx=gsap.context(()=>{
gsap.from('.hero-copy>*',{y:44,opacity:0,stagger:.09,duration:1,ease:'power3.out'});
gsap.to('.hero-media img',{scale:1.05,yPercent:4,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
gsap.utils.toArray('.reveal').forEach(el=>gsap.from(el,{y:38,opacity:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 84%'}}));
const camera=gsap.timeline({scrollTrigger:{trigger:'.camera',start:'top top',end:'+=240%',pin:true,scrub:1}});camera.to('.camera-a',{clipPath:'inset(0 0 0 0)',scale:1.03},0).to('.camera-b',{clipPath:'inset(0 0 0 0)'},.7).to('.camera-copy',{yPercent:-110,opacity:0},.95).to('.camera-c',{clipPath:'inset(0 0 0 0)'},1.4);
const tunnel=gsap.timeline({scrollTrigger:{trigger:'.tunnel',start:'top top',end:'+=220%',pin:true,scrub:1}});tunnel.fromTo('.tunnel-card:nth-child(1)',{scale:.36,z:-500},{scale:1.18,z:80},0).fromTo('.tunnel-card:nth-child(2)',{scale:.2,z:-700},{scale:1.02,z:40},.35).fromTo('.tunnel-card:nth-child(3)',{scale:.12,z:-900},{scale:.9,z:0},.7).to('.tunnel-title',{letterSpacing:'.22em',opacity:.08},0);
gsap.to('.rail',{x:()=>-(document.querySelector('.rail').scrollWidth-innerWidth+innerWidth*.12),ease:'none',scrollTrigger:{trigger:'.rail-wrap',start:'top top',end:'+=180%',pin:true,scrub:1,invalidateOnRefresh:true}});
gsap.from('.finale-word span',{yPercent:110,rotate:5,stagger:.05,duration:1.1,ease:'power4.out',scrollTrigger:{trigger:'.finale',start:'top 60%'}});
},root);return()=>ctx.revert()},[entered]);
const enter=()=>{setEntered(true);requestAnimationFrame(()=>document.querySelector('.hero')?.scrollIntoView({behavior:'instant'}))};
return <main ref={root} className={entered?'entered':''}>
{!entered&&<section className="arrival" aria-label="Cobalt Courtyard entrance"><div className="gate gate-l"/><div className="gate gate-r"/><div className="arrival-mark"><p>PROJECT 023 · AFTER DARK</p><h1>Cobalt<br/>Courtyard</h1><button onClick={enter}>Open the courtyard</button><span>an intimate evening wedding story</span></div></section>}
<section className="hero scene" aria-label="Arrival"><div className="hero-media"><Photo src={photos[0]} alt="Wedding couple in an evening courtyard" eager/><div className="hero-wash"/></div><div className="hero-copy"><p className="kicker">01 · Arrival / 19:08</p><h2>Cobalt<br/><i>Courtyard</i></h2><p>Stone cools. Brass catches the last light. The celebration begins between one breath and the next.</p><div className="scroll-note">Scroll as camera ↓</div></div></section>
<section className="camera scene"><div className="camera-layer camera-base"><Photo src={photos[1]} alt="Couple portrait in soft evening light"/></div><div className="camera-layer camera-a"><Photo src={photos[2]} alt="Close wedding portrait"/></div><div className="camera-layer camera-b"><Photo src={photos[3]} alt="Wedding table detail"/></div><div className="camera-layer camera-c"><Photo src={photos[4]} alt="Wedding ceremony moment"/></div><div className="camera-copy"><p className="kicker">02 · Before the music</p><h3>Four frames.<br/>One moving memory.</h3></div></section>
<section className="portrait scene"><div className="portrait-type reveal"><p className="kicker">03 · Portrait Room</p><h3>The quiet<br/>inside the night.</h3><p>No pose held too long. No moment asked to become more than it was.</p></div><div className="portrait-stack"><Photo src={photos[5]} alt="Editorial wedding portrait" className="portrait-main"/><Photo src={photos[6]} alt="Wedding detail portrait" className="portrait-float"/></div></section>
<section className="rail-wrap scene"><div className="rail-head"><p className="kicker">04 · Family Orbit</p><span>dragged by scroll / held by memory</span></div><div className="rail"><figure><Photo src={photos[7]} alt="Wedding celebration crowd"/><figcaption>the loud frame</figcaption></figure><figure className="tall"><Photo src={photos[8]} alt="Intimate celebration portrait"/><figcaption>the close frame</figcaption></figure><figure><Photo src={photos[9]} alt="Wedding friends and family"/><figcaption>the soft frame</figcaption></figure><figure className="wide"><Photo src={photos[10]} alt="Wedding gathering"/><figcaption>the frame that stayed</figcaption></figure></div></section>
<section className="breath scene"><p className="kicker">05 · Ceremony</p><blockquote className="reveal">“When the room went quiet,<br/><em>the photographs got louder.</em>”</blockquote><div className="breath-rule"/></section>
<section className="split scene"><div className="split-photo"><Photo src={photos[4]} alt="Ceremony hands and details"/></div><div className="split-copy reveal"><p className="kicker">06 · Interlude</p><h3>Ivory paper.<br/>Jasmine air.<br/>A brass note.</h3><p>A minute of visual silence before the courtyard lifts again.</p></div></section>
<section className="tunnel scene"><div className="tunnel-title">07 · DINNER LIGHT</div><div className="tunnel-stage"><div className="tunnel-card"><Photo src={photos[3]} alt="Candlelit wedding dinner"/></div><div className="tunnel-card"><Photo src={photos[10]} alt="Guests at an evening celebration"/></div><div className="tunnel-card"><Photo src={photos[11]} alt="Night portrait"/></div></div><p className="tunnel-caption">scroll through the arch</p></section>
<section className="mosaic scene"><div className="mosaic-copy reveal"><p className="kicker">08 · Courtyard Dance</p><h3>Flash / blur / brass / blue.</h3></div><Photo src={photos[7]} alt="Dancing at a wedding" className="m1"/><Photo src={photos[12]} alt="Night celebration detail" className="m2"/><Photo src={photos[1]} alt="Couple portrait" className="m3"/><Photo src={photos[9]} alt="Candid wedding moment" className="m4"/></section>
<section className="letters scene"><div className="letter-paper reveal"><p className="kicker">09 · Letters</p><h3>Keep this one.</h3><p>Not because it was perfect. Because everyone in it forgot the camera existed.</p><span className="signature">C + C · 23</span></div><div className="letter-photo"><Photo src={photos[8]} alt="Candid wedding portrait"/></div></section>
<section className="midnight scene"><Photo src={photos[11]} alt="Midnight wedding portrait"/><div className="midnight-copy reveal"><p className="kicker">10 · 00:07</p><h3>Midnight<br/>turns cobalt.</h3></div></section>
<section className="last scene"><div className="last-frame"><Photo src={photos[0]} alt="Final courtyard wedding portrait"/></div><div className="last-copy reveal"><p className="kicker">11 · Last Frame</p><h3>One photograph<br/>after everyone<br/>stops performing.</h3></div></section>
<section className="finale scene"><p className="kicker">12 · Archive</p><div className="finale-word" aria-label="Forever">{'FOREVER'.split('').map((c,i)=><span key={i}>{c}</span>)}</div><p>Filed in cobalt. Kept in warm light.</p><button onClick={()=>scrollTo({top:0,behavior:'smooth'})}>Return to the gate ↑</button></section>
</main>}
createRoot(document.getElementById('root')).render(<App/>);