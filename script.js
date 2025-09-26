// Smooth reveal using IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.15 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  // Mobile nav toggle
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  const panel = document.getElementById('menuPanel');
  const backdrop = document.getElementById('menuBackdrop');
  if (menuBtn && menu && panel && backdrop) {
    const setOpen = (open) => {
      menuBtn.setAttribute('aria-expanded', String(open));
      panel.classList.toggle('open', open);
      backdrop.classList.toggle('open', open);
      
      if (open) {
        // Show links one by one with chain effect
        const links = panel.querySelectorAll('.mobile-link');
        links.forEach((link, index) => {
          setTimeout(() => {
            link.classList.add('visible');
          }, index * 100); // 100ms delay between each link
        });
      } else {
        // Hide all links immediately
        const links = panel.querySelectorAll('.mobile-link');
        links.forEach(link => {
          link.classList.remove('visible');
        });
      }
    };
    let open = false;
    menuBtn.addEventListener('click', () => {
      open = !open;
      setOpen(open);
      menuBtn.textContent = open ? 'Close' : 'Menu';
    });
    // Close panel when clicking a link
    panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      open = false;
      setOpen(false);
      menuBtn.textContent = 'Menu';
    }));
    // Close on backdrop click
    backdrop.addEventListener('click', () => {
      open = false;
      setOpen(false);
      menuBtn.textContent = 'Menu';
    });
  }
  // Progress bar functionality
  const progressBar = document.getElementById('progressBar');
  const toTopBtn = document.getElementById('toTopBtn');
  
  window.onscroll = () => {
    // Calculate scroll progress
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    
    // Update progress bar
    if (progressBar) {
      progressBar.style.width = scrollProgress + '%';
    }
    
    // Show/hide to top button
    if (toTopBtn) {
      if (scrollTop > 300) {
        toTopBtn.classList.add('visible');
      } else {
        toTopBtn.classList.remove('visible');
      }
    }
  };
  
  // To top button functionality
  if (toTopBtn) {
    toTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Skills bars animation
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBar = entry.target;
        const progress = skillBar.getAttribute('data-progress');
        const span = skillBar.querySelector('span');
        if (span) {
          span.style.width = progress + '%';
        }
        skillObserver.unobserve(skillBar);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });
});
// Form 
let input_name = document.querySelector(".input_Name")
let input_Email = document.querySelector(".input_Email")
let input_message = document.querySelector(".input_Message")
let form = document.querySelector("form")

form.onsubmit = (e)=> {
  e.preventDefault()
  let name = input_name.value.trim()
  let email = input_Email.value.trim()
  let message = input_message.value.trim()
  let phoneNumber = "201145856114"
  msg = `Name:${name}\nEmail:${email}\nMessage:${message}`
  let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
  input_name.value = ""
  input_Email.value = ""
  input_message.value = ""
  
  open(url , "_blank")
}

