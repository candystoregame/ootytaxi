function clickslider(value) {
  slidertoken = value;
  fetchslidecontent(slidertoken);
  let popslider = document.getElementById('ootyslider-popup'),
      closepopslider = document.querySelector('.close-ootyslider-pop');
  popslider.style.display = 'block';
  quitslider = setTimeout(function() {
    const slidetrack = document.querySelector('.img-slider');
    const cslides = Array.from(document.querySelectorAll('.ooty-slide'));
    const navtrack = document.querySelector('.slider-navigation');
    let sliderpivot = 1;
    const cslidedots = Array.from(document.querySelectorAll('.slider-btn'));
    let timer = setInterval(autoSlide, 3000);
    navtrack.addEventListener('click', e => {
      const targetdot = e.target.closest("div.slider-btn");
      if (!targetdot) return;
      const targetIndex  = cslidedots.findIndex (dot => dot === targetdot);
      slidetrack.querySelector(".active").classList.remove('active');
      navtrack.querySelector(".active").classList.remove('active');
      cslides[targetIndex].classList.add("active");
      cslidedots[targetIndex].classList.add("active");
      sliderpivot = targetIndex;
      resetTimer();
    })

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(autoSlide, 5000);
    }
  
    function autoSlide() {
      if (slidertoken === null) { clearInterval(timer); clearInterval(quitslider); }
      sliderpivot += 1;
      slidefun(sliderpivot);
    }
  
    function slidefun(n) {
      if (slidertoken === null) { clearInterval(timer); clearInterval(quitslider); }
      slidetrack.querySelector(".active").classList.remove('active');
      navtrack.querySelector(".active").classList.remove('active');
      if(n > cslides.length){
        sliderpivot = 1;
         }
      if(n < 1){
        sliderpivot = myslide.length;
         }
      cslides[sliderpivot - 1].classList.add("active");
      cslidedots[sliderpivot - 1].classList.add("active");
    }
  }, 3000);

  closepopslider.addEventListener('click', function() {
      popslider.style.display = 'none';
      slidertoken = null;      
  })

  window.addEventListener('click',function(e) {
      if(e.target == popslider) {
          popslider.style.display = 'none';
          slidertoken = null;
      }
    })
  }

  /*function clickslider(value) {
    let slidertoken = value;
    let quitslider;
    let timer;
    let sliderpivot = 1;
  
    fetchslidecontent(slidertoken);
    const popslider = document.getElementById('ootyslider-popup');
    const closepopslider = document.querySelector('.close-ootyslider-pop');
    popslider.style.display = 'block';
  
    const slidetrack = document.querySelector('.img-slider');
    const cslides = Array.from(document.querySelectorAll('.ooty-slide'));
    const navtrack = document.querySelector('.slider-navigation');
    const cslidedots = Array.from(document.querySelectorAll('.slider-btn'));
  
    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(autoSlide, 5000);
    }
  
    function autoSlide() {
      if (slidertoken === null) {
        clearInterval(timer);
        clearInterval(quitslider);
      }
      sliderpivot += 1;
      slidefun(sliderpivot);
    }
  
    function slidefun(n) {
      if (slidertoken === null) {
        clearInterval(timer);
        clearInterval(quitslider);
      }
      slidetrack.querySelector('.active').classList.remove('active');
      navtrack.querySelector('.active').classList.remove('active');
      if (n > cslides.length) {
        sliderpivot = 1;
      }
      if (n < 1) {
        sliderpivot = myslide.length;
      }
      cslides[sliderpivot - 1].classList.add('active');
      cslidedots[sliderpivot - 1].classList.add('active');
    }
  
    navtrack.addEventListener('click', (e) => {
      const targetdot = e.target.closest('div.slider-btn');
      if (!targetdot) return;
      const targetIndex = cslidedots.findIndex((dot) => dot === targetdot);
      slidetrack.querySelector('.active').classList.remove('active');
      navtrack.querySelector('.active').classList.remove('active');
      cslides[targetIndex].classList.add('active');
      cslidedots[targetIndex].classList.add('active');
      sliderpivot = targetIndex;
      resetTimer();
    });
  
    quitslider = setTimeout(() => {
      timer = setInterval(autoSlide, 3000);
    }, 3000);

    closepopslider.addEventListener('click', () => {
      popslider.style.display = 'none';
      slidertoken = null;
    })
    window.addEventListener('click', e => {
      if (e.target === popslider) {
        popslider.style.display = 'none';
        slidertoken = null;
      }
    })
  } */