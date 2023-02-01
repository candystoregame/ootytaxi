/*Customize Plan Start*/
let formIndex = 0;
const currentd = new Date().toISOString().split('T')[0];
let contenttable = '';
let customplanregister = [];

function erroralert(message) {
  swal({
    title: "Oops...!",
    text: message,
    icon: "error",
  });
}

function initMap() {
  return;
}

function convertDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', options);
}

function custommessage() {
  const formFields = [
    { id: 'customfname', label: 'First Name' },
    { id: 'customlname', label: 'Last Name' },
    { id: 'customemail', label: 'Email Address' },
    { id: 'customphone', label: 'Phone Number' },
    { id: 'customadults', label: 'Adults' },
    { id: 'customchild', label: 'Children' },
    { id: 'custumplantable', label: 'Message' },
    { id: 'accomrequired', label: 'Accommodation Required' },
    { id: 'custom-address', label: 'Address' },
    { id: 'vehicleid', label: 'Vehicle' },
    { id: 'customplanprice', label: 'Approximate Total Price' },
  ];

  let dot;
  let markedCheckbox = document.querySelectorAll('[cuname]');
  for (let checkbox of markedCheckbox) {
    if (checkbox.checked) {
      dot = checkbox.value;
    }
  }

  let message = formFields.reduce((acc, field) => {
    acc += `${field.label}: ${document.getElementById(field.id).value}\n`;
    return acc;
  }, "");
  
  message += `Preferred Channel To Contact Me: ${dot}\n\n`;
  message += `Plan Details:\n`;
  for (let i = 0; i < customplanregister.length; i++) {
    message += `${(i + 1)}) Date: ${convertDate(customplanregister[i].date)}, Pickup Location: ${customplanregister[i].pickup}, Drop Location: ${customplanregister[i].drop}, Distance: ${customplanregister[i].distance}\n`;
  }

  sendMail("Custom Plan", message);
  success();
  customizeplan();
}


/* Function to Calculate Distance using Google Maps */
function GoogleDistace(source, destination, ID) {
  if (source.length === 0 || destination.length === 0 || ID.length === 0) {
    return false;
  }

  let directionsService = new google.maps.DirectionsService();
  const logdistance = document.getElementById(ID);
  let request = {
    origin: source,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC
  }

  directionsService.route(request, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const output = result.routes[0].legs[0].distance.text;
      logdistance.value = output;
      const demo = Number(document.getElementById('customtotalkms').value.split(" ")[0]);
      document.getElementById('customtotalkms').innerHTML = '';
      document.getElementById('customtotalkms').value = Number(demo) + Number(output.split(" ")[0]);
      document.getElementById('customplanprice').value = Number(parseFloat(document.getElementById('customtotalkms').value) * 12).toFixed(2);
    } else {
      logdistance.value = "Unable to fetch distance";
    }
  });
}

function validatecustomdate(ID) {
  if (!ID) return false;
  const dateField = document.getElementById(ID);
  if (!dateField) return false;
  const dateValue = dateField.value;
  if (!dateValue) {
    erroralert("Please select a pickup date.");
    return false;
  }
  const prevIndex = ID.substring(12) - 1;
  if (prevIndex >= 0) {
    const prevDateField = document.getElementById(`${ID.substring(0, 12)}${prevIndex}`);
    if (prevDateField) {
      const prevDateValue = prevDateField.value;
      if (prevDateValue && new Date(dateValue) < new Date(prevDateValue)) {
        erroralert("Please select a later date than the previous one.");
        dateField.value = '';
        return false;
      }
    }
  }
  const dateRegex = /^((19|20)\d{2}[\-]0?[1-9]|1[0-2])[\-](0?[1-9]|[12]\d|3[01])$/;
  if (!dateValue.match(dateRegex)) {
    erroralert("Please choose a valid date format MM/DD/YYYY.");
    dateField.value = '';
    return false;
  }
  return true;
}



function assigntosource(ID, tvalue) {
  if(ID != null && tvalue != null) {
    document.getElementById(ID).value = document.getElementById(tvalue).value;
  }
}

function validatecustomrow(row) {
  const date = document.getElementById(`datecustomid${row}`).value;
  const dest = document.getElementById(`droplocation${row}`).value;
  if (!date) {
    erroralert("Please select Pickup Date...");
    return;
  }
  if (!/^(19|20)\d{2}[-](0?[1-9]|1[0-2])[-](0?[1-9]|[12]\d|3[01])$/.test(date)) {
    erroralert("Please choose valid date format YYYY-MM-DD");
    document.getElementById(`datecustomid${row}`).value = "";
    return;
  }
  if (!dest) {
    erroralert("Please select Drop Location...");
    return;
  }
  addnewliner(row);
}

function validatecustomro(row) {
  //if (!row) return;
  const date = document.getElementById(`datecustomid${row}`).value;
  const dest = document.getElementById(`droplocation${row}`).value;
  if (!date) {
    erroralert("Please select Pickup Date...");
    return false;
  }
  if (!/^(19|20)\d{2}[-](0?[1-9]|1[0-2])[-](0?[1-9]|[12]\d|3[01])$/.test(date)) {
    erroralert("Please choose valid date format YYYY-MM-DD");
    document.getElementById(`datecustomid${row}`).value = "";
    return false;
  }
  if (!dest) {
    erroralert("Please select Drop Location...");
    return false;
  }
  else {
    return true;
  }
}

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
  const phoneRegex = /^\d{10}$/;
  if (!phone) {
    PhoneError.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Required';
    return false;
  }
  if (!phone.match(phoneRegex)) {
    PhoneError.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Invalid Phone Number';
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

function cusplanform() {
  const formdiv = document.createElement("div");
  const trc = document.getElementById('custumplantable');
  const trclength = trc.rows.length;
  (trclength-2);
  if (!validatecustomro(trclength-2)) { return };
  const cpickup = document.getElementById(`droplocation${(trclength-2)}`);
  const cdate = document.getElementById(`datecustomid${(trclength-2)}`);
  const cdrop = document.getElementById(`droplocation${(trclength-2)}`);
  const distance = document.getElementById(`distanceid${(trclength-2)}`).value.split(" ");
  document.getElementById('pickupcity0').disabled = true;
  cpickup.disabled = true;
  cdate.disabled = true;
  if (trclength == 2) document.getElementById('custumplantable').rows[trclength-1].deleteCell(4);
  if (trclength > 2) {
    document.getElementById('custumplantable').rows[trclength-1].deleteCell(5);
    document.getElementById('custumplantable').rows[trclength-1].deleteCell(4);
  }
  customplanregister[trclength-2] = {date: cdate.value, pickup: cpickup.value, drop: cdrop.value, distance: Number(distance[0])};
  const tableContent = document.querySelector('.table-right-content');
  let formcontent;
  if (formIndex === 1) return;
  formIndex = 1;
  formdiv.id = 'customplanformid';
  formdiv.classList.add('customplanform');
  tableContent.appendChild(formdiv);
  formcontent = `
  <div class="mainform" id="mainformsection">
    <form id="custom-form-id" action="#">
      <span class="custom-details-title">Please Fill Your Details</span>
    	<div class="custom-pop-user-details">
    		<div class="custom-pop-forms-group">
          <span class="details">First Name</span>
          <input id="customfname" type="text" placeholder="Enter your First Name" required onchange="validateBlank('customfname', 'custom-fname-error')">
          <span id="custom-fname-error"></span>
    	  </div>
    	  <div class="custom-pop-forms-group">
    	    <span class="details">Last Name</span>
          <input id="customlname" type="text" placeholder="Enter your Last Name" required onchange="validateBlank('customlname', 'custom-lname-error')">
          <span id="custom-lname-error"></span>
        </div>
    	  <div class="custom-pop-forms-group">
    	    <span class="details">Email</span>
          <input id="customemail" type="email" placeholder="Enter your email" required onchange="validateEmail('customemail', 'custom-email-error')">
          <span id="custom-email-error"></span>
    	  </div>
    	  <div class="custom-pop-forms-group">
    	    <span class="details">Phone Number</span>
          <input id="customphone" type="text" placeholder="10-Digit Number" required onchange="validatePhoneNumber('customphone', 'custom-phone-error')">
          <span id="custom-phone-error"></span>
    	  </div>
    	  <div class="custom-pop-forms-group">
    	   	<label for="Adults">Adults:</label>
    	    <select title="Total Adults" id="customadults" name="Adults" required onchange="validateBlank('customadults', 'custom-padult-error')">
    	      <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
    	    </select>
    	    <span id="custom-padult-error"></span>
    	  </div>
    	  <div class="custom-pop-forms-group">
    	    <label for="child">Children:</label>
    	    <select title="Total Child" id="customchild" name="child" required onchange="validateBlank('customchild', 'custom-pchild-error')">
    	    	<option value="">Select</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
    	    </select>
    	    <span id="custom-pchild-error"></span>
    	  </div>
    	</div>
      <div id="customdatelabel" class="custom-pop-forms-group">
        <label for="Pickup">Accommodation Required</label>
        <select title="Total Child" id="accomrequired" name="child" required onchange="validateBlank('accomrequired', 'accom-error')">
    	    <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
    	  </select>
        <span id="accom-error"></span>
      </div>
      <div class="custom-pop-forms-group">
        <label for="message">Pickup Address</label>
        <textarea id="custom-address" rows="5" placeholder="Enter Your Pickup Address" required onchange="validateTextArea('custom-address', 'custom-message-error')"></textarea>
        <span id="custom-message-error"></span>
      </div>
      <div class="custom-contact-channel">
        <input cuname="channel" type="radio" value="Phone" name="channel" id="customz-dot-1" required>
        <input cuname="channel" type="radio" value="Email" name="channel" id="customz-dot-2">
        <input cuname="channel" type="radio" value="WhatsApp" name="channel" id="customz-dot-3">
        <span class="channel-title">Preferred channel to reach you:</span>
        <div class="custom-category">
        	<label for="customz-dot-1">
        		<span class="dotz one"></span>
        		<span class="channel"><i class="fa-solid fa-phone"></i>&nbsp Phone</span>
        	</label>
        	<label for="customz-dot-2">
        		<span class="dotz two"></span>
        		<span class="channel"><i class="fa-solid fa-envelope"></i>&nbsp Email</span>
        	</label>
        	<label for="customz-dot-3">
        		<span class="dotz three"></span>
        		<span class="channel"><i class="fa-brands fa-whatsapp"></i>&nbsp WhatsApp</span>
        	</label>
        </div>
        <span id="custom-contact-channel-error"></span>
      </div>
      <div id="custom_submit" class="custom-book-button">
        <input type="button" value="Submit" onclick="custommessage()">
        <span id="custom-submit-error"></span>
      </div>
    </form>
  </div>`;
  formdiv.innerHTML = formcontent;
}

function addnewliner(stub) {
  let stubrev = stub + 1;
  const cpickup = document.getElementById(`customsource${stub}`);
  const cdrop = document.getElementById(`droplocation${stub}`);
  const cdate = document.getElementById(`datecustomid${stub}`);
  const ptable = document.getElementById('custumplantable');
  const distance = document.getElementById(`distanceid${stub}`).value.split(" ")[0];
  if (!cpickup.value || !cdrop.value || !cdate.value || !distance) return;
  customplanregister[stub] = {
    date: cdate.value,
    pickup: cpickup.value,
    drop: cdrop.value,
    distance: Number(distance)
  };
  document.getElementById('pickupcity0').disabled = true;
  cdate.disabled = true;
  cpickup.disabled = true;
  cdrop.disabled = true;
  let row = ptable.insertRow(-1);
  let cell = row.insertCell(0);
  let cell1 = row.insertCell(1);
  let cell2 = row.insertCell(2);
  let cell3 = row.insertCell(3);
  let cell4 = row.insertCell(4);
  let cell5 = row.insertCell(5);
  cell.innerHTML = `<input type="date" style="text-align: center;" id="datecustomid${stubrev}" placeholder="mm/dd/yyyy" min="${currentd}" class="localdate" required onchange="validatecustomdate('datecustomid${stubrev}');">`;
  cell1.innerHTML = `<input type="text" style="text-align: center;" id="customsource${stubrev}" placeholder="Select Location Above" name="Source" disabled required aria-required="true">`;
  cell2.innerHTML = `
    <select name="droplocation" style="text-align: center;" id="droplocation${stubrev}" required aria-required="true" onchange='GoogleDistace(document.getElementById("customsource${stubrev}").value, document.getElementById("droplocation${stubrev}").value, "distanceid${stubrev}");'>
      <option value="">Drop Location</option>
      ${Array.from(citymap).map(([i, city]) => `<option value="${city}">${city}</option>`).join('')}
    </select>`;
  cell3.innerHTML = `<input type="text" style="text-align: center;" id="distanceid${stubrev}" name="Distance" disabled required aria-required="true">`;
  cell4.innerHTML = `<a id="addnewline${stubrev}" onclick="validatecustomrow(${stubrev});"><i class="fa fa-plus-circle" aria-hidden="true"></i><a>`;
  cell5.innerHTML = `<a id="removelastline${stubrev}" onclick="neglastline(${stubrev});"><i class="fa fa-minus-circle" aria-hidden="true"></i><a>`;
  assigntosource(`customsource${stubrev}`, `droplocation${stub}`);
  if (stub == 0) {
    ptable.rows[stub+1].deleteCell(4);
  }
  else {
    ptable.rows[stub+1].deleteCell(5);
    ptable.rows[stub+1].deleteCell(4);
  }
}

function neglastline(row) {
  const table = document.getElementById('custumplantable');
  const lastRow = table.rows[table.rows.length - 2];
  const dataLength = customplanregister.length;
  if (table.rows.length === 3) {
    document.getElementById(`droplocation${table.rows.length - 3}`).disabled = false;
    document.getElementById(`datecustomid${table.rows.length - 3}`).disabled = false;
    document.getElementById('pickupcity0').disabled = false;

    lastRow.insertCell(4).innerHTML = `
      <td>
        <a id="addnewline${table.rows.length - 3}" onclick="validatecustomrow(${table.rows.length - 3});">
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </a>
      </td>
    `;

    table.deleteRow(-1);
  }
  else if (table.rows.length > 3) {
    document.getElementById(`droplocation${table.rows.length - 3}`).disabled = false;
    document.getElementById(`datecustomid${table.rows.length - 3}`).disabled = false;

    lastRow.insertCell(4).innerHTML = `
      <td>
        <a id="addnewline${table.rows.length - 3}" onclick="validatecustomrow(${table.rows.length - 3});">
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </a>
      </td>
    `;
    lastRow.insertCell(5).innerHTML = `
      <td>
        <a id="removelastline${table.rows.length - 3}" onclick="neglastline(${table.rows.length - 3});">
          <i class="fa fa-minus-circle" aria-hidden="true"></i>
        </a>
      </td>
    `;

    table.deleteRow(-1);
  }
  if (table.rows.length - 2 < dataLength) {
    customplanregister.pop();
  }
}
 

function customizeplan() {
  noterma('Customize Plan');
  let newlinecounter = 0;
  formIndex = 0;
  const tablediv = document.createElement("div");
  const tableoptionsdiv = document.createElement("div");
  const tableContent = document.querySelector('.table-right-content');
  const visitContent = document.querySelector('.placevisit-right-content');
  document.querySelector('.plan-midmenu').innerHTML = "";
  document.getElementById('planner-right-container').innerHTML = "";
  document.querySelector('.heading-right-content').innerHTML = `<h3>Customize your plan</h3>`;
  tableContent.innerHTML = "";
  visitContent.innerHTML = "";
  visitContent.innerHTML = 
  `<div class="customplanpickup">
    <a>Select Pickup City<sup style="color: red;">*</sup></a>
    <select style="text-align: center;" name="pickupcity" id="pickupcity0" onchange="assigntosource('customsource0', 'pickupcity0'); GoogleDistace(document.getElementById('customsource0').value, document.getElementById('droplocation0').value, 'distanceid0');" required aria-required="true">
      <option value="">Select Pickup Location</option>
      <option value="Bengaluru">Bengaluru</option>
      <option value="Cochin">Cochin</option>
      <option value="Coimbatore">Coimbatore</option>
      <option value="Kodaikanal">Kodaikanal</option>
      <option value="Madurai">Madurai</option>
      <option value="Mettupalayam">Mettupalayam</option>
      <option value="Munnar">Munnar</option>
      <option value="Mysore">Mysore</option>
      <option value="Ooty">Ooty</option>
      <option value="Thanjavur">Thanjavur</option>
      <option value="Tirunelveli">Tirunelveli</option>
      <option value="Tirupur">Tirupur</option>
    </select>
    <span id="customplanpickupid"></span>
    <a>Select Vehicle</a>
    <select style="text-align: center;" name="Vehicle" id="vehicleid" required>
      <option value="">Select Vehicle</option>
      <option value="Innova AC">Innova A/C</option>
			<option value="Tavera">Tavera</option>
			<option value="Traveller">Traveller</option>
			<option value="Logan AC">Logan A/C</option>
			<option value="Swift dZire AC">Swift dZire A/C</option>
			<option value="Toyota ETIOS AC">Toyota ETIOS A/C</option>
			<option value="Mahindra XYLO AC">Mahindra XYLO A/C</option>
			<option value="Tavera AC">Tavera A/C</option>
			<option value="Traveller AC">Traveller A/C</option>
    </select>
    <span id="vehicleidError"></span>
  </div>`;
  contenttable = `<table id='custumplantable'>
    <tr>
      <th style="text-align: center;">Pickup Date</th>
      <th style="text-align: center;">From</th>
      <th style="text-align: center;">To</th>
      <th style="text-align: center;">Distance</th>
    </tr>
    <tr>
      <td><input style="text-align: center;" type="date" id="datecustomid0" placeholder="mm/dd/yyyy" min="${currentd}" class="localdate" required onchange="validatecustomdate('datecustomid0')"></td>
      <td><input style="text-align: center;" type="text" id="customsource0" placeholder="Select Location Above" name="Source" disabled required aria-required="true"></td>
      <td>
        <select style="text-align: center;" name="droplocation" id="droplocation0" required aria-required="true" onchange='GoogleDistace(document.getElementById("customsource0").value, document.getElementById("droplocation0").value, "distanceid0");'>
          <option value="">Drop Location</option>`;
            for (let i = 0; i <= citymap.size; i++) {
              contenttable += '<option value="'+citymap.get(i)+'">'+citymap.get(i)+'</option>';
            }
            contenttable += `
        </select>
      </td>
      <td><input style="text-align: center;" id="distanceid0" name="Distance" disabled required aria-required="true"></td>
      <td><a id="addnewline0" onclick="validatecustomrow(${newlinecounter});"><i class="fa fa-plus-circle" aria-hidden="true"></i><a></td>
    </tr>
  </table>`;
  tablediv.id = 'dynamictableID';
  tablediv.classList.add('dynamictabclass');
  tableContent.appendChild(tablediv);
  tablediv.innerHTML = contenttable;
  tableoptionsdiv.id = 'tableoptionsdivID';
  tableoptionsdiv.classList.add('tableoptions_section');
  tableContent.appendChild(tableoptionsdiv);
  let contenttableoptions = `
  <div class="tablecustomoptions>
  <label font-weight: 600; for="Distance In Kilometers">Total Distance In km(s)</label>
  <input style="text-align: center;" id="customtotalkms" type="text" name="Distance In Kilometers" placeholder="Approximate Kilometers" readonly>
  <label style="font-weight: 600;" for="Rupees">Approximate Total Price</label>
  <input style="text-align: center;" id="customplanprice" type="text" name="Rupees" placeholder="Approximate Price" readonly>
  <input type="submit" value="Submit" onclick="cusplanform()">
  </div>`;
  tableoptionsdiv.innerHTML = contenttableoptions;
}
  
/**Customize Plan End*/

const owl=$('#carslidermaincontent');
        owl.owlCarousel({
            items:3,
            animateOut: 'animate__slideOutDown',
            animateIn: 'animate__flipInX',
            margin:0,
            loop:true,
            autoplay:true,
            smartSpeed:100,
            //nav:true,
            //navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            dots:true,
            autoplayHoverPause:true,
        
            responsiveClass:true,
            responsive:{
                0:{
                    items:1
                },
                360: {
                    items:1
                },
                375: {
                    items:1
                },
                393: {
                    items:1
                },
                412: {
                    items:1
                },
                640:{
                    items:1
                },
                767:{
                    items:2
                },
                992:{
                    items:3
                }
            }
        });