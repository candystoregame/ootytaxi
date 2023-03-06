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
    console.log(ErrorId);
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


const fnameerror = document.getElementById('fname-error');
const lnameerror = document.getElementById('lname-error');
const phoneerror = document.getElementById('phone-error');
const emailerror = document.getElementById('mail-error');
const messageerror = document.getElementById('message-error');
const submiterror = document.getElementById('submit-error');
const channelerror = document.getElementById('contact-channel-error');
const sourceerror = document.getElementById('source-error');
const desterror = document.getElementById('destination-error');
  
  function reseterrortags() {
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
    for (let i = 0; i < errorTags.length; i++) {
      errorTags[i].innerHTML = "";
    }
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

function validatesource() {
    const bsource = document.getElementById('source');
    const optionsindex = bsource.options[bsource.selectedIndex].value;
    if (optionsindex == "") {
        sourceerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    else {
        sourceerror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
        return true;
    }
}

function validatedestination() {
    const bdestination = document.getElementById('destination');
    const optionsindex = bdestination.options[bdestination.selectedIndex].value;
    if (optionsindex == "") {
        desterror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    else {
        desterror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
        return true;
    }
}

const pfnameerror = document.getElementById('pfname-error');
const plnameerror = document.getElementById('plname-error');
const pemailerror = document.getElementById('pemail-error');
const pphoneerror = document.getElementById('pphone-error');
const padulterror = document.getElementById('padults-error');
const pchilderror = document.getElementById('pchild-error');
const pdateerror = document.getElementById('plandate-error');
const pmessageerror = document.getElementById('message-plan-error');
const pchannelerror = document.getElementById('plan-contact-channel-error');
const psubmiterror = document.getElementById('plan-submit-error');

function resetplanerrortags() {
    const errorElements = document.querySelectorAll('#pfname-error, #plname-error, #pemail-error, #pphone-error, #padults-error, #pchild-error, #plandate-error, #message-plan-error, #plan-contact-channel-error, #plan-submit-error');
    errorElements.forEach(element => {
        element.innerHTML = '';
    });
}


function validatepfname() {
    let name = document.getElementById('pfname').value;
    if ( name.length == 0) {
        pfnameerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    pfnameerror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validateplname() {
    let name = document.getElementById('plname').value;
    if ( name.length == 0) {
        plnameerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    plnameerror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validatepemail() {
    const email = document.getElementById('pemail').value;
    if(email.length == 0) {
        pemailerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    if(!email.match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        pemailerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Invalid Email';
        return false;
    }
    pemailerror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validatepphone() {
    const phone = document.getElementById('pphone').value;
    if(phone.length == 0) {
        pphoneerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    if(phone.length != 10) {
        pphoneerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Phone number should be 10 digits';
        return false;
    }
    if(!phone.match(/^[0-9]{10}$/)) {
        pphoneerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Phone number should be all 10 digits';
        return false;
    }
    pphoneerror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validatepdate() {
    let pdate = document.getElementById('plandate').value;
    if ( pdate.length == 0) {
        pdateerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    if(!pdate.match(/^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/)) {
        pdateerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Date Format MM/DD/YYYY';
        return false;
    }
    pdateerror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validatepadults() {
    let padults = document.getElementById('padults').value;
    if ( padults.length == 0) {
        padulterror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    padulterror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validatepchild() {
    let pchild = document.getElementById('pchild').value;
    if ( pchild.length == 0) {
        pchilderror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    pchilderror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validatepaccom() {
    let pdate = document.getElementById('plandate').value;
    if ( pdate.length == 0) {
        pdateerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    pdateerror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validatepmessage() {
    const message = document.getElementById('message-plan').value;
    let required = 20;
    let left = required - message.length;
    if(left > 0) {
        pmessageerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> '+ left + ' more charecters required';
        return false;
    }
    pmessageerror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}


function validatepchannel() {
    const bchannel = document.querySelectorAll('[dname]');
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
        pchannelerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Choose preferred channel to contact you';
        return false;
    }
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

function validatehpdate() {
    let pdate = document.getElementById('home_start').value;
    if ( pdate.length == 0) {
        starterror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    if(!pdate.match(/^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/)) {
        starterror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Date Format MM/DD/YYYY';
        return false;
    }
    starterror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validatehddate() {
    let hpdate = document.getElementById('home_start').value;
    let hddate = document.getElementById('home_end').value;
    let x = new Date(hpdate);
    let y = new Date(hddate);
    if ( hddate.length == 0) {
        enderror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    if(!hddate.match(/^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/)) {
        enderror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Date Format MM/DD/YYYY';
        return false;
    }
    if (y < x) {
        enderror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> End Date is less than Start Date';
        return false;
    }
    enderror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validatehpickup() {
    let startloc = document.getElementById('home_pickup').value;
    if ( startloc.length == 0) {
        hserror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    hserror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
}

function validatehdesti() {
    let destloc = document.getElementById('home_destination').value;
    if ( destloc.length == 0) {
        hderror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    hderror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    return true;
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