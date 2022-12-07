fetchslidecontent("Ooty");
let turnoffslider = "true";

function clickslider(value) {
  slidertoken = value;
  fetchslidecontent(slidertoken);
  console.log(slidertoken);
  let popslider = document.getElementById('ootyslider-popup'),
    //openpopslider = document.getElementById('ootyslider-pop-open'),
    closepopslider = document.querySelector('.close-ootyslider-pop');

//openpopslider.addEventListener('click', function() {
  popslider.style.display = 'block';
  turnoffslider = "false";
  const slidetrack = document.querySelector('.img-slider');
  const cslides = Array.from(document.querySelectorAll('.ooty-slide'));
  const navtrack = document.querySelector('.slider-navigation');
  console.log(navtrack);
  const cslidedots = Array.from(document.querySelectorAll('.slider-btn'));
  let sliderpivot = 1;
  navtrack.addEventListener('click', e => {
    const targetdot = e.target.closest("div.slider-btn");
    if (!targetdot) return;
    const targetIndex  = cslidedots.findIndex (dot => dot === targetdot);
    slidetrack.querySelector(".active").classList.remove('active');
    navtrack.querySelector(".active").classList.remove('active');
    cslides[targetIndex].classList.add("active");
    cslidedots[targetIndex].classList.add("active");
    sliderpivot = targetIndex;
  })
  
  // Javascript for image slider autoplay navigation
  const repeat = function(){
    const repeater = () => {
      console.log(sliderpivot);
      setTimeout(function() {
        slidetrack.querySelector(".active").classList.remove('active');
        navtrack.querySelector(".active").classList.remove('active');
        cslides[sliderpivot].classList.add('active');
        cslidedots[sliderpivot].classList.add('active');
        sliderpivot++;
        if(cslides.length == sliderpivot) {
          sliderpivot = 0;
        }
        if(sliderpivot >= cslides.length) {
          return;
        }
        repeater();
      }, 10000);
    }
    repeater();
  }
  repeat();
//})

closepopslider.addEventListener('click', function() {
    popslider.style.display = 'none';
    turnoffslider = "true";
})

window.addEventListener('click',function(e) {
    if(e.target == popslider) {
        popslider.style.display = 'none';
        turnoffslider = "true";
    }
})
}