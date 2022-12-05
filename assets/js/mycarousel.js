let poppln = document.getElementById('ootyslider-popup'),
    openpoppln = document.getElementById('ootyslider-pop-open'),
    closepoppln = document.querySelector('.close-ootyslider-pop');

openpoppln.addEventListener('click', function() {
    poppln.style.display = 'block';
})

closepoppln.addEventListener('click', function() {
    poppln.style.display = 'none';

})

window.addEventListener('click',function(e) {
    if(e.target == poppln) {
        poppln.style.display = 'none';
    }
})


const slides = document.querySelectorAll('.ooty-slide');
const btns = document.querySelectorAll('.slider-btn');
let currentSlide = 1;
// Javascript for image slider manual navigation
let manualNav = function(manual){
  slides.forEach((slide) => {
    slide.classList.remove('active');
    btns.forEach((btn) => {
      btn.classList.remove('active');
    });
  });
  slides[manual].classList.add('active');
  btns[manual].classList.add('active');
}
btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualNav(i);
    currentSlide = i;
  });
});
// Javascript for image slider autoplay navigation
let repeat = function(activeClass) {
    const specifcactive = document.getElementById("ootyslider-popup");
    const active = specifcactive.getElementsByClassName('active');
    let i = 1;
    let repeater = () => {
      setTimeout(function(){
        [...active].forEach((activeSlide) => {
          activeSlide.classList.remove('active');
        });
      slides[i].classList.add('active');
      btns[i].classList.add('active');
      i++;
      if(slides.length == i){
        i = 0;
      }
      if(i >= slides.length){
        return;
      }
      repeater();
    }, 10000);
    }
    repeater();
}  
repeat();