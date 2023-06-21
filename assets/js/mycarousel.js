let slidertoken = null;
let quitslider;
let timer;
let isSliderActive = false;
let isSliderInitialized = false;
let sliderpivot = 1; // Declare sliderpivot as a global variable
const MIN_SWIPE_DISTANCE = 100; // Define the minimum swipe distance
let touchStartX;
let touchEndX; // Declare touchEndX in the global scope

function clickslider(value) {
  // Check if slider is already active
  if (isSliderActive) {
    return;
  }

  // Set the flag to indicate slider is active
  isSliderActive = true;

  // Check if the slider is already initialized
  if (isSliderInitialized) {
    // Reset the slider with the new value
    resetSlider(value);
    return;
  }

  // Initialize the slider
  slidertoken = value;
  fetchslidecontent(slidertoken);

  let popslider = document.getElementById('ootyslider-popup');
  let closepopslider = document.querySelector('.close-ootyslider-pop');

  popslider.style.display = 'block';

  quitslider = setTimeout(function() {
    const slidetrack = document.querySelector('.img-slider');
    const navtrack = document.querySelector('.slider-navigation');
    const cslidedots = Array.from(document.querySelectorAll('.slider-btn'));

    timer = setInterval(autoSlide, 10000);

    navtrack.addEventListener('click', function(e) {
      const targetdot = e.target.closest("div.slider-btn");
      if (!targetdot) return;

      const cslides = Array.from(document.querySelectorAll('.ooty-slide'));
      const targetIndex = cslidedots.findIndex(dot => dot === targetdot);
      slidetrack.querySelector(".active").classList.remove('active');
      navtrack.querySelector(".active").classList.remove('active');
      cslides[targetIndex].classList.add("active");
      cslidedots[targetIndex].classList.add("active");
      sliderpivot = targetIndex;
      resetTimer();
    });

    slidetrack.addEventListener('touchstart', handleTouchStart);
    slidetrack.addEventListener('touchmove', handleTouchMove);
    slidetrack.addEventListener('touchend', handleTouchEnd);

    // Set the flag to indicate the slider is initialized
    isSliderInitialized = true;
  }, 2000);

  closepopslider.addEventListener('click', function() {
    let popslider = document.getElementById('ootyslider-popup');
    popslider.style.display = 'none';
    resetSlider(null);
  });

  window.addEventListener('click', function(e) {
    let popslider = document.getElementById('ootyslider-popup');
    if (e.target == popslider) {
      popslider.style.display = 'none';
      resetSlider(null);
    }
  });
}

function autoSlide() {
  if (slidertoken === null) {
    clearInterval(timer);
    clearInterval(quitslider);
    isSliderActive = false;
  }
  sliderpivot += 1;
  slidefun(sliderpivot);
}

function slidefun(n) {
  if (slidertoken === null) {
    clearInterval(timer);
    clearInterval(quitslider);
    isSliderActive = false;
  }
  const cslides = Array.from(document.querySelectorAll('.ooty-slide'));
  const slidetrack = document.querySelector('.img-slider');
  const navtrack = document.querySelector('.slider-navigation');
  const cslidedots = Array.from(document.querySelectorAll('.slider-btn'));
  slidetrack.querySelector(".active").classList.remove('active');
  navtrack.querySelector(".active").classList.remove('active');
  if (n > cslides.length) {
    sliderpivot = 1;
  }
  if (n < 1) {
    sliderpivot = cslides.length;
  }
  cslides[sliderpivot - 1].classList.add("active");
  cslidedots[sliderpivot - 1].classList.add("active");
}

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  touchEndX = event.touches[0].clientX;
}

function handleTouchEnd() {
  const touchDistance = touchEndX - touchStartX;

  if (touchDistance > MIN_SWIPE_DISTANCE) {
    // Swipe right
    sliderpivot -= 1;
    slidefun(sliderpivot);
    resetTimer();
  } else if (touchDistance < -MIN_SWIPE_DISTANCE) {
    // Swipe left
    sliderpivot += 1;
    slidefun(sliderpivot);
    resetTimer();
  }
}

function resetSlider(value) {
  // Clear the timer
  clearInterval(timer);
  clearInterval(quitslider);

  // Remove event listeners
  const navtrack = document.querySelector('.slider-navigation');
  navtrack.removeEventListener('click', function(e) {
    const targetdot = e.target.closest("div.slider-btn");
    if (!targetdot) return;

    const cslides = Array.from(document.querySelectorAll('.ooty-slide'));
    const cslidedots = Array.from(document.querySelectorAll('.slider-btn'));
    const targetIndex = cslidedots.findIndex(dot => dot === targetdot);
    const slidetrack = document.querySelector('.img-slider');
    slidetrack.querySelector(".active").classList.remove('active');
    navtrack.querySelector(".active").classList.remove('active');
    cslides[targetIndex].classList.add("active");
    cslidedots[targetIndex].classList.add("active");
    sliderpivot = targetIndex;
    resetTimer();
  });

  // Remove touch event listeners
  const slidetrack = document.querySelector('.img-slider');
  slidetrack.removeEventListener('touchstart', handleTouchStart);
  slidetrack.removeEventListener('touchmove', handleTouchMove);
  slidetrack.removeEventListener('touchend', handleTouchEnd);

  // Reset flags
  isSliderActive = false;
  isSliderInitialized = false;

  // Reset token if a new value is provided
  if (value !== null) {
    slidertoken = value;
    fetchslidecontent(slidertoken);
  }
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(autoSlide, 10000);
}