let bmodal = document.getElementById('contact-modal'),
    bopenModal = document.getElementById('modal-open'),
    bcloseModal = document.querySelector('.close-button');

bopenModal.addEventListener('click', function() {
    bmodal.style.display = 'block';
})

bcloseModal.addEventListener('click', function() {
    bmodal.style.display = 'none';

})

window.addEventListener('click',function(e) {
    if(e.target == bmodal) {
        bmodal.style.display = 'none';
    }
})