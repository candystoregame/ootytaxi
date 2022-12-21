let bmodal = document.getElementById('contact-modal'),
    bopenModal = document.getElementById('modal-open'),
    bcloseModal = document.querySelector('.close-button');

bopenModal.addEventListener('click', function() {
    reseterrortags();
    bmodal.style.display = 'block';
})

bcloseModal.addEventListener('click', function() {
    bmodal.style.display = 'none';
    document.getElementById('myform').reset();

})

window.addEventListener('click',function(e) {
    if(e.target == bmodal) {
        bmodal.style.display = 'none';
        document.getElementById('myform').reset();
    }
})

const fnameerror = document.getElementById('fname-error');
const lnameerror = document.getElementById('lname-error');
const phoneerror = document.getElementById('phone-error');
const emailerror = document.getElementById('email-error');
const messageerror = document.getElementById('message-error');
const submiterror = document.getElementById('submit-error');
const channelerror = document.getElementById('contact-channel-error');

function reseterrortags() {
    fnameerror.innerHTML="";
    lnameerror.innerHTML="";
    phoneerror.innerHTML="";
    emailerror.innerHTML="";
    messageerror.innerHTML="";
    submiterror.innerHTML="";
    channelerror.innerHTML="";
}

function validatefname() {
    let name = document.getElementById('fname').value;
    if ( name.length == 0) {
        fnameerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    fnameerror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validatelname() {
    let name = document.getElementById('lname').value;
    if ( name.length == 0) {
        lnameerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    lnameerror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validatephone() {
    const phone = document.getElementById('phone').value;
    if(phone.length == 0) {
        phoneerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    if(phone.length != 10) {
        phoneerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Phone number should be 10 digits';
        return false;
    }
    if(!phone.match(/^[0-9]{10}$/)) {
        phoneerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Phone number should be all 10 digits';
        return false;
    }
    phoneerror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validateemail() {
    const email = document.getElementById('mail').value;
    if(email.length == 0) {
        emailerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    if(!email.match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        emailerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Invalid Email';
        return false;
    }
    emailerror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validatemessage() {
    const message = document.getElementById('message').value;
    let required = 20;
    let left = required - message.length;
    if(left > 0) {
        messageerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> '+ left + ' more charecters required';
        return false;
    }
    messageerror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validatechannel() {
    const bchannel = document.getElementsByName('channel');
    let j=0, flagger = false;
    for (let i = 0; i < bchannel.length; i++) {
        if(bchannel[i].checked) {
            j=i;
            flagger = true;
            break;
        }
    }
    if (flagger) {
        return true;
    }
    else { 
        channelerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Choose preferred channel to contact you';
        return false;
    }
}