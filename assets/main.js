const cur = document.getElementById("cursor"),
ring = document.getElementById("cursor-ring");
if (cur) {
let mx = 0,
my = 0,
rx = 0,
ry = 0;
document.addEventListener("mousemove", (e) => {
mx = e.clientX;
my = e.clientY;
cur.style.left = mx + "px";
cur.style.top = my + "px";
});
(function animR() {
rx += (mx - rx) * 0.12;
ry += (my - ry) * 0.12;
ring.style.left = rx + "px";
ring.style.top = ry + "px";
requestAnimationFrame(animR);
})();
document
.querySelectorAll("a,button,.proj-card,.acc-header,.testi-card")
.forEach((el) => {
el.addEventListener("mouseenter", () => {
cur.style.width = "16px";
cur.style.height = "16px";
ring.style.width = "54px";
ring.style.height = "54px";
});
el.addEventListener("mouseleave", () => {
cur.style.width = "10px";
cur.style.height = "10px";
ring.style.width = "38px";
ring.style.height = "38px";
});
});
}
const nav = document.getElementById("nav");
const scrollBtn = document.getElementById("scrolltop");
let lastY=0,ticking=false;
window.addEventListener("scroll",()=>{
  if(!ticking){
    requestAnimationFrame(()=>{
      const y=window.scrollY;
      nav.classList.toggle("scrolled",y>60);
      if(y>120){
        if(y>lastY+8) nav.classList.add("hidden");
        else if(y<lastY-8) nav.classList.remove("hidden");
      } else {
        nav.classList.remove("hidden");
      }
      scrollBtn.classList.toggle("visible",y>500);
      lastY=y;
      ticking=false;
    });
    ticking=true;
  }
},{passive:true});
const revObs = new IntersectionObserver(
(entries) => {
entries.forEach((e) => {
if (e.isIntersecting) e.target.classList.add("visible");
});
},
{ threshold: 0.07, rootMargin: "0px 0px -40px 0px" },
);
document.querySelectorAll(".reveal").forEach((el) => revObs.observe(el));
document.querySelectorAll(".acc-header").forEach((h) => {
h.addEventListener("click", () => {
const item = h.parentElement;
const wasOpen = item.classList.contains("open");
document
.querySelectorAll(".acc-item")
.forEach((i) => i.classList.remove("open"));
if (!wasOpen) item.classList.add("open");
});
});
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
function closeMenu() {
hamburger.classList.remove("open");
mobileMenu.classList.remove("open");
document.body.style.overflow = "";
}
hamburger.addEventListener("click", () => {
const open = mobileMenu.classList.toggle("open");
hamburger.classList.toggle("open", open);
document.body.style.overflow = open ? "hidden" : "";
});
mobileMenu.addEventListener("click", (e) => {
if (e.target === mobileMenu) closeMenu();
});
document.querySelectorAll('a[href^="#"]').forEach((a) => {
a.addEventListener("click", (e) => {
const href = a.getAttribute("href");
if (href === "#") return;
const target = document.querySelector(href);
if (target) {
e.preventDefault();
target.scrollIntoView({ behavior: "smooth" });
}
});
});
// Auto-duplicate testi cards for seamless loop
(function(){
var t=document.querySelector('.testi-track');
if(t){var c=t.innerHTML;t.innerHTML=c+c;}
})();

// Loading screen
window.addEventListener('load', function(){
  var loader = document.getElementById('loader');
  setTimeout(function(){
    loader.classList.add('hidden');
    setTimeout(function(){
      loader.style.display = 'none';
    }, 600);
  }, 2000);
});

// Connect button -> open modal
document.addEventListener('DOMContentLoaded', function(){
  var connectBtn = document.getElementById('connectBtn');
  if(connectBtn){
    connectBtn.addEventListener('click', function(){
      document.getElementById('contactModal').classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
});
// Close modal
function closeModal(){
  document.getElementById('contactModal').classList.remove('open');
  document.body.style.overflow = '';
}
var modalCloseBtn = document.getElementById('modalClose');
if(modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
var modalOverlay = document.getElementById('contactModal');
if(modalOverlay) modalOverlay.addEventListener('click', function(e){
  if(e.target === this) closeModal();
});
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape') closeModal();
});
// Contact form submit -> mailto
var contactForm = document.getElementById('contactForm'); if(contactForm) contactForm.addEventListener('submit', function(e){
  e.preventDefault();
  var btn = this.querySelector('.form-submit');
  var status = document.getElementById('formStatus');
  var data = new FormData(this);
  var name = data.get('name');
  var email = data.get('email');
  var company = data.get('company') || '-';
  var project = data.get('project') || '-';
  var message = data.get('message');
  var subject = encodeURIComponent('Portfolio Inquiry from ' + name);
  var body = encodeURIComponent(
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n' +
    'Company: ' + company + '\n' +
    'Project: ' + project + '\n\n' +
    'Message:\n' + message
  );
  var mailtoLink = 'mailto:fadhliardiansyah@gmail.com?subject=' + subject + '&body=' + body;
  btn.classList.add('loading');
  btn.querySelector('.submit-text').textContent = 'Opening...';
  setTimeout(function(){
    window.location.href = mailtoLink;
    btn.classList.remove('loading');
    btn.querySelector('.submit-text').textContent = 'Send Message';
    status.className = 'form-status success';
    status.textContent = '✓ Your email client has been opened. Please send the email to complete.';
  }, 800);
});