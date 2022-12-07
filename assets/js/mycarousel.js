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
var currentSlide = 1;
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
    console.log(i);
  });
});
// Javascript for image slider autoplay navigation
let repeat = function() {
    const specifcactive = document.getElementById("ootyslider-popup");
    const active = specifcactive.getElementsByClassName('active');
    let i = currentSlide;
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


function fetchslidecontent (sheetName) {
  const tableContent = document.querySelector('.img-slider');
  const fName = './assets/dataFiles/sliderref.xlsx';
  (
    async() => {
      const workbook = XLSX.read(await (await fetch(fName)).arrayBuffer(), {type: 'array'});
      const sheet_data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
      if(sheet_data.length > 0) {
//        tableContent.innerHTML='';
        let table_output="";
        for(var row = 0; row < sheet_data.length; row++)
        {
          for(var cell = 0; cell < sheet_data[row].length; cell++)
          {
            if(row == 1) {
              console.log(sheet_data[row][cell]);
            }
          }
        }
        //tableContent.innerHTML = table_output;
      }
    }
  )()
}