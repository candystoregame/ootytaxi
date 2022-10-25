var myIndex = 0;
function myslider() {
    var i;
    var x = document.getElementsByClassName("home1-testm item");
    for (i=0; i < x.length; i++) {
      x[i].style.display;/* = "none";*/
    }
myIndex++;
if (myIndex > x.length) { myIndex = 1}
x[myIndex-1].style.display = "block";
x[myIndex].style.display = "block";
x[myIndex+1].style.display = "block";
setTimeout(myslider, 5);
}myslider();