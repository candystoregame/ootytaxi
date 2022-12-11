fetchslidecontent('Ooty');
function clickslider(value) {
  slidertoken = value;
  fetchslidecontent(slidertoken);
  console.log(slidertoken);
  let popslider = document.getElementById('ootyslider-popup'),
      closepopslider = document.querySelector('.close-ootyslider-pop');
  popslider.style.display = 'block';
  quitslider = setTimeout(function() {
    const slidetrack = document.querySelector('.img-slider');
    const cslides = Array.from(document.querySelectorAll('.ooty-slide'));
    const navtrack = document.querySelector('.slider-navigation');
    let sliderpivot = 1;
    const cslidedots = Array.from(document.querySelectorAll('.slider-btn'));
    let timer = setInterval(autoSlide, 6000);
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
      timer = setInterval(autoSlide, 6000);
    }
  
    function autoSlide() {
      sliderpivot += 1;
      slidefun(sliderpivot);
    }
  
    function slidefun(n) {
      slidetrack.querySelector(".active").classList.remove('active');
      navtrack.querySelector(".active").classList.remove('active');
      if(n > cslides.length){
        sliderpivot = 1;
         }
      if(n < 1){
        sliderpivot = myslide.length;
         }
         console.log(sliderpivot);
      cslides[sliderpivot - 1].classList.add("active");
      cslidedots[sliderpivot - 1].classList.add("active");
    }
  }, 1000);

  closepopslider.addEventListener('click', function() {
      popslider.style.display = 'none';
      clearInterval(timer);
      clearInterval(quitslider);
  })

  window.addEventListener('click',function(e) {
      if(e.target == popslider) {
          popslider.style.display = 'none';
          clearInterval(timer);
          clearInterval(quitslider);
      }
    })
  }