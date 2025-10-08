
const nav = document.querySelector('.nav');
document.querySelector('.menu-btn').addEventListener('click', () => {
  nav.classList.toggle('open');
});


document.querySelectorAll('.menu a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});
    nav.classList.remove('open');
  });
});


const targetDate = new Date("2025-10-25T10:00:00+07:00").getTime();
const countdownEl = document.getElementById('countdown');

function renderCountdown(distance){
  if(distance <= 0){
    countdownEl.innerHTML = <div class="box"><div class="value">💖</div><div class="label">Selamat menempuh hidup baru!</div></div>;
    return;
  }
  const d = Math.floor(distance / (1000*60*60*24));
  const h = Math.floor((distance / (1000*60*60)) % 24);
  const m = Math.floor((distance / (1000*60)) % 60);
  const s = Math.floor((distance / 1000) % 60);
  countdownEl.innerHTML = `
    <div class="box"><div class="value">${d}</div><div class="label">Hari</div></div>
    <div class="box"><div class="value">${h}</div><div class="label">Jam</div></div>
    <div class="box"><div class="value">${m}</div><div class="label">Menit</div></div>
    <div class="box"><div class="value">${s}</div><div class="label">Detik</div></div>
  `;
}
function updateCountdown(){ renderCountdown(targetDate - Date.now()); }
setInterval(updateCountdown, 1000); updateCountdown();

const audio = document.getElementById('bgMusic');
const playBtn = document.getElementById('playMusic');
let isPlaying = false;

playBtn.addEventListener('click', () => {
  if (!isPlaying) {
    audio.play();
    playBtn.textContent = '⏸ Pause Musik';
    isPlaying = true;
  } else {
    audio.pause();
    playBtn.textContent = '🎵 Putar Musik';
    isPlaying = false;
  }
});


audio.addEventListener('ended', () => {
  playBtn.textContent = '🎵 Putar Musik';
  isPlaying = false;
});





const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
document.querySelectorAll('.glight').forEach(img=>{
  img.addEventListener('click', ()=>{
    lightboxImg.src = img.src;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden','false');
  });
});
lightboxClose.addEventListener('click', ()=>{
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden','true');
});
lightbox.addEventListener('click', (e)=>{
  if(e.target === lightbox) lightboxClose.click();
});


const doaForm = document.getElementById('doaForm');
const ucapanList = document.getElementById('ucapanList');
const STORAGE_DOA = 'doa_ucapan_v2';

function renderUcapan(){
  ucapanList.innerHTML = '';
  const items = JSON.parse(localStorage.getItem(STORAGE_DOA) || '[]');
  items.slice().reverse().forEach(({nama,pesan,ts})=>{
    const div = document.createElement('div');
    div.className = 'ucapan-item';
    const date = new Date(ts).toLocaleString('id-ID',{dateStyle:'medium', timeStyle:'short'});
    div.innerHTML = <strong>${nama}</strong>
    ucapanList.appendChild(div);
  });
}
doaForm.addEventListener('submit', e=>{
  e.preventDefault();
  const nama = document.getElementById('namaDoa').value.trim();
  const pesan = document.getElementById('pesanDoa').value.trim();
  if(nama.length < 2 || pesan.length < 2) return;
  const items = JSON.parse(localStorage.getItem(STORAGE_DOA) || '[]');
  items.push({nama,pesan,ts: Date.now()});
  localStorage.setItem(STORAGE_DOA, JSON.stringify(items));
  doaForm.reset();
  renderUcapan();
});
renderUcapan();


const rsvpForm = document.getElementById('rsvpForm');
const rsvpList = document.getElementById('rsvpList');
const STORAGE_RSVP = 'rsvp_list_v2';

function renderRsvp(){
  rsvpList.innerHTML = '';
  const items = JSON.parse(localStorage.getItem(STORAGE_RSVP) || '[]');
  items.slice().reverse().forEach(({nama,status,jumlah,ts})=>{
    const div = document.createElement('div');
    div.className = 'rsvp-item';
    const date = new Date(ts).toLocaleString('id-ID',{dateStyle:'medium', timeStyle:'short'});
    div.innerHTML = 
    rsvpList.appendChild(div);
  });
}
rsvpForm.addEventListener('submit', e=>{
  e.preventDefault();
  const nama = document.getElementById('namaRsvp').value.trim();
  const status = document.getElementById('statusRsvp').value;
  const jumlah = document.getElementById('jumlahRsvp').value;
  if(!nama || !status) return;
  const items = JSON.parse(localStorage.getItem(STORAGE_RSVP) || '[]');
  items.push({nama,status,jumlah,ts: Date.now()});
  localStorage.setItem(STORAGE_RSVP, JSON.stringify(items));
  rsvpForm.reset();
  renderRsvp();
});
renderRsvp();


const shareBtn = document.getElementById('shareBtn');
const shareStatus = document.getElementById('shareStatus');
shareBtn.addEventListener('click', async ()=>{
  const shareData = {
    title: 'Undangan Nabil & Cinta',
    text: 'Hai, kamu diundang ke pernikahan kami 💖',
    url: location.href
  };
  try{
    if(navigator.share){ await navigator.share(shareData); shareStatus.textContent = 'Terkirim!'; }
    else { await navigator.clipboard.writeText(shareData.url); shareStatus.textContent = 'Link disalin.'; }
    setTimeout(()=> shareStatus.textContent='', 2000);
  }catch{ shareStatus.textContent = 'Gagal membagikan.'; }
});