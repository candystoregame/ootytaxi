let turnoffslider = "false";
let poppln = document.getElementById('ootyslider-popup'),
    openpoppln = document.getElementById('ootyslider-pop-open'),
    closepoppln = document.querySelector('.close-ootyslider-pop');

openpoppln.addEventListener('click', function() {
    poppln.style.display = 'block';
    turnoffslider = "false";
    fetchslidecontent("Sheet1");
})

closepoppln.addEventListener('click', function() {
    poppln.style.display = 'none';
    turnoffslider = "true";

})

window.addEventListener('click',function(e) {
    if(e.target == poppln) {
        poppln.style.display = 'none';
        turnoffslider = "true";
    }
})

const slides = document.querySelectorAll('.ooty-slide');
const btns = document.querySelectorAll('.slider-btn');
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
  });
});
// Javascript for image slider autoplay navigation
let repeat = function() {
    const specifcactive = document.getElementById("ootyslider-popup");
    const active = specifcactive.getElementsByClassName('active');
    let i = 0;
    let repeater = () => {
      setTimeout(function(){
        [...active].forEach((activeSlide) => {
          activeSlide.classList.remove('active');
        });
      slides[i].classList.add('active');
      btns[i].classList.add('active');
      console.log('running');
      i++;
      if(slides.length == i){
        i = 0;
      }
      if(i >= slides.length || turnoffslider === "true"){
        console.log('stopped');
        return;
      }
      repeater();
    }, 10000);
    }
    repeater();
}  
repeat();


function fetchslidecontent(sheetName) {
  const slideContent = document.getElementById('slider_image_switch');
  const slidebtnContent = document.getElementById('slider_btn_navigation');
  const fName = './assets/dataFiles/sliderref.xlsx';
  let slidepath, slideheading, slidefilename, slidecomments;
  (
    async() => {
      const workbook = XLSX.read(await (await fetch(fName)).arrayBuffer(), {type: 'array'});
      const sheet_data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
      if(sheet_data.length > 0) {
//        tableContent.innerHTML='';
        let slide_output="";
        let slide_btn_output="";
        for(var row = 0; row < sheet_data.length; row++)
        {
          for(var cell = 0; cell < sheet_data[row].length; cell++)
          {
            if (row > 0 && cell == 0) {
              slidepath = sheet_data[row][cell];
            }
            if (row > 0 && cell == 1) {
              slideheading = sheet_data[row][cell];
            }
            if (row > 0 && cell == 2) {
              slidefilename = sheet_data[row][cell];
            }
            if (row > 0 && cell == 3) {
              slidecomments = sheet_data[row][cell];
            }
          }
          if (row == 1) {
            slide_output = '<div class="ooty-slide active"><img src="'+slidepath+slidefilename+'" loading="lazy" alt="Slides"><div class="info"><h2>'+slideheading+'</h2><p>'+slidecomments+'</p></div>';
            slide_btn_output = '<div class="slider-btn active"></div>';
          }
          if (row > 1) {
            slide_output += '<div class="ooty-slide"><img src="'+slidepath+slidefilename+'" loading="lazy" alt="Slides"><div class="info"><h2>'+slideheading+'</h2><p>'+slidecomments+'</p></div>';
            slide_btn_output += '<div class="slider-btn"></div>';
          }
        }
        slideContent.innerHTML = slide_output;
        slidebtnContent.innerHTML = slide_btn_output;
      }
    }
  )()
}