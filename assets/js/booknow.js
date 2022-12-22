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
const sourceerror = document.getElementById('source-error');
const desterror = document.getElementById('destination-error');

function reseterrortags() {
    fnameerror.innerHTML="";
    lnameerror.innerHTML="";
    phoneerror.innerHTML="";
    emailerror.innerHTML="";
    messageerror.innerHTML="";
    submiterror.innerHTML="";
    channelerror.innerHTML="";
    sourceerror.innerHTML="";
    desterror.innerHTML="";
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

const pfnameerror = document.getElementById('plan-fname-error');
const plnameerror = document.getElementById('plan-lname-error');
const pemailerror = document.getElementById('plan-email-error');
const pphoneerror = document.getElementById('plan-phone-error');
const padulterror = document.getElementById('plan-padult-error');
const pchilderror = document.getElementById('plan-pchild-error');
const pdateerror = document.getElementById('pickup-date-error');
const pmessageerror = document.getElementById('plan-message-error');
const pchannelerror = document.getElementById('plan-contact-channel-error');
const psubmiterror = document.getElementById('plan-submit-error');

function resetplanerrortags() {
    pfnameerror.innerHTML="";
    plnameerror.innerHTML="";
    pemailerror.innerHTML="";
    pphoneerror.innerHTML="";
    padulterror.innerHTML="";
    pchilderror.innerHTML="";
    pdateerror.innerHTML="";
    pmessageerror.innerHTML="";
    pchannelerror.innerHTML="";
    psubmiterror.innerHTML="";
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

function validatepdate() {
    let pdate = document.getElementById('plandate').value;
    if ( pdate.length == 0) {
        pdateerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        return false;
    }
    if(!pdate.match(/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/)) {
        pdateerror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Phone number should be all 10 digits';
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

function pvalidate() {
    let fname = document.getElementById("pfname");
    let lname = document.getElementById("plname");
    let email = document.getElementById("pemail");
    let message = document.getElementById("message-plan");
    let pphone = document.getElementById("pphone");
    let padults = document.getElementById("padults");
    let pchild = document.getElementById("pchild");
    let submit = document.getElementById("plan_submit");
    let plandate = document.getElementById("plandate");
    let dot;
    var markedCheckbox = document.querySelectorAll('[dname]');
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        for (let checkbox of markedCheckbox){
            if(checkbox.checked) {
                dot = checkbox.value;
            }
        }
        if (!validatepchannel() || !validatepmessage() || !validatepdate() || !validatepchild() || !validatepadults() || !validatepphone() || !validatepemail() || !validateplname() || !validatepfname()) {
            psubmiterror.style.display = 'block';
            //psubmiterror.innerHTML = 'Please fix error to Submit';
            inputEmpty();
            setTimeout(function() { psubmiterror.style.display = 'none'; }, 3000);
            return false;
        }
        else {
            sendMailsendMailBookNow(dot, fname.value, lname.value, email.value, message.value, pphone.value, padults.value, pchild.value, plandate.value);
            success();
            document.getElementById('plan-form-id').reset();
        }
    });
} pvalidate();

function sendMailBookNow(dot, fname, lname, email, address, phone, adults, children, plandate) {
    emailjs.send('service_4xhn7mk', 'template_wj7bd4f', {
        date : plandate,
        fname: fname,
        lname: lname,
        email : email,
        phone: phone,
        address: address,
        adults: adults,
        children: children,
        dot : dot,
    });
}