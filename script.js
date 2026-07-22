/* Header and Footer */
  fetch('header.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('header').innerHTML = html;
    });

  fetch('footer.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('footer').innerHTML = html;
    });

/* Sound Effects */
  const clickSound = new Audio('files/audio/click.wav');
  clickSound.volume = 0.1;

  document.addEventListener('click', (e) => {
    const target = e.target.closest('.click, .button, .cert-logo, .headerlink, .plain-link');
    if (target && target.tagName === 'A' && target.href) {
      e.preventDefault(); // Stop normal click to allow the sound to play first
      clickSound.currentTime = 0;
      clickSound.play();
      
      setTimeout(() => {
        // Check if the link has target="_blank"
        if (target.target === '_blank') {
          window.open(target.href, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = target.href; // Regular navigation
        }
      }, 120); 
    } else if (target) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  });

// Carousel logic — add to script.js
  document.querySelectorAll('.project-carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const images = track.querySelectorAll('img');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    let index = 0;
    let autoplay;

    // build dots dynamically based on how many images exist
    images.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('span');

    function goTo(i) {
      index = (i + images.length) % images.length;
      images.forEach(img => img.classList.remove('active'));
      images[index].classList.add('active');
      dots.forEach(d => d.classList.remove('active'));
      dots[index].classList.add('active');
    }

    prevBtn.addEventListener('click', () => { goTo(index - 1); resetAutoplay(); });
    nextBtn.addEventListener('click', () => { goTo(index + 1); resetAutoplay(); });

    function startAutoplay() {
      autoplay = setInterval(() => goTo(index + 1), 4000); // 4s per slide
    }
    function resetAutoplay() {
      clearInterval(autoplay);
      startAutoplay();
    }
    images[0].classList.add('active');

    startAutoplay();
  });

/* Lazy Loading for CAD */
  const modelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const viewer = entry.target;
        if (viewer.dataset.src && !viewer.src) {
          viewer.src = viewer.dataset.src;
        }
        modelObserver.unobserve(viewer);
      }
    });
  });

  document.querySelectorAll('model-viewer[data-src]').forEach(v => modelObserver.observe(v));