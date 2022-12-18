var myIndex = 0;
function myslider() {
    var i;
    var x = document.getElementsByClassName("home1-testm");
    for (i=0; i < x.length; i++) {
      x[i].style.display;/* = "none";*/
    }
myIndex++;
if (myIndex > x.length) { myIndex = 1}
x[myIndex-1].style.display = "block";
setTimeout(myslider, 0);
}

window.addEventListener('load', (event) => { myslider(); });

function heist(value) {
  localStorage.setItem('thelolname', value);
  location.assign("tourplanner.html");
}