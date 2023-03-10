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

function validateBlank(StringElement, ErrorId) {
    let loc = document.getElementById(StringElement).value;
    let error = document.getElementById(ErrorId);
    if (loc.length === 0) {
      error.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
      return false;
    }
    error.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
  }
  
  function validateTextArea(TextArea, ErrorId) {
    const message = document.getElementById(TextArea).value;
    const pmessageerror = document.getElementById(ErrorId);
    const required = 20;
    const left = required - message.length;
    pmessageerror.innerHTML =
      left > 0
        ? `<i class="fa fa-times-circle" aria-hidden="true"></i> ${left} more characters required`
        : `<i class="fa fa-check-circle" aria-hidden="true"></i>`;
    return left <= 0;
  }
  
  function validatePhoneNumber(PhoneNumberId, ErrorId) {
    const phone = document.getElementById(PhoneNumberId).value;
    const PhoneError = document.getElementById(ErrorId);
    if (!phone.match(/^\d{10}$/)) {
        PhoneError.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Phone number should be 10 digits and all numeric';
        return false;
    }
    PhoneError.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
  }
  
  function validateEmail(Email, ErrorId) {
    const email = document.getElementById(Email).value;
    const EmailError = document.getElementById(ErrorId);
    if(email.length == 0) {
        EmailError.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    if(!email.match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        EmailError.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Invalid Email';
        return false;
    }
    EmailError.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
  }

  function validatePreDate(Date, ErrorId) {
    const date = document.getElementById(Date).value;
    const PreDateError = document.getElementById(ErrorId);
    if (date.length === 0) {
        PreDateError.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    if(!date.match(/^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/)) {
        PreDateError.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Date Format MM/DD/YYYY';
        return false;
    }
    PreDateError.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validatePostDate(PreDate, PostDate, ErrorId) {
    const predateInput = document.getElementById(PreDate);
    const postdateInput = document.getElementById(PostDate);
    const errorIdElement = document.getElementById(ErrorId);
    const predate = predateInput.value;
    const postdate = postdateInput.value;
    const startDate = new Date(predate);
    const endDate = new Date(postdate);
    if (postdate.length == 0) {
        errorIdElement.innerHTML = `<i class="fa fa-times-circle" aria-hidden="true"></i>`;
        return false;
    }
    if (isNaN(startDate) || isNaN(endDate) || startDate > endDate) {
        errorIdElement.innerHTML = `<i class="fa fa-times-circle" aria-hidden="true"></i>`;
        return false;
    }
    errorIdElement.innerHTML = `<i class="fa fa-check-circle" aria-hidden="true"></i>`;
    return true;
}

const errorTags = [
    document.getElementById('fname-error'),
    document.getElementById('lname-error'),
    document.getElementById('phone-error'),
    document.getElementById('mail-error'),
    document.getElementById('message-error'),
    document.getElementById('submit-error'),
    document.getElementById('contact-channel-error'),
    document.getElementById('source-error'),
    document.getElementById('destination-error')
  ];
  const errorElements = document.querySelectorAll('#pfname-error, #plname-error, #pemail-error, #pphone-error, #padults-error, #pchild-error, #message-plan-error, #plan-contact-channel-error, #plan-submit-error');


function reseterrortags() {
  for (let i = 0; i < errorTags.length; i++) {
    errorTags[i].textContent = "";
  }
}

function resetplanerrortags(da) {
    const dateaccom = document.getElementById(da);
    dateaccom.innerHTML = '';
    errorElements.forEach(element => {
        element.innerHTML = '';
    });
}

const hserror = document.getElementById('home_pickup-error');
const hderror = document.getElementById('home_destination-error');
const starterror = document.getElementById('home_start-error');
const enderror = document.getElementById('home_end-error');

function resethomeerrortags() {
    hserror.innerHTML="";
    hderror.innerHTML="";
    starterror.innerHTML="";
    enderror.innerHTML="";
}

/*const mainmenu_idicon = document.getElementById('main-menu-idicon');
const mainmenu_id = document.getElementById('main-menu-id');
document.onclick = function(e) {
    if(e.target.id === 'main-menu-idicon') {
        mainmenu_id.classList.remove('active');
    }
    else {
        mainmenu_id.classList.toggle('active');
    }
}*/

//mainmenu_id.onclick = function() {
  //  mainmenu_id.classList.toggle('active');
//}