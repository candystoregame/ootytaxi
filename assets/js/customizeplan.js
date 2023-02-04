/*Customize Plan Start*/
let formIndex = 0;
const currentd = new Date().toISOString().split('T')[0];
let contenttable = '';
let customplanregister = [];
let carMenu = [];
let pricemap = new Map();

async function justFetchTable() {
  const fileName = "./assets/dataFiles/Dropping Duty (KM Basis).xlsx";
  const response = await fetch(fileName);
  const buffer = await response.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheet_data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]], { header: 1 });
  for (let i = 0, len = sheet_data.length - 3; i < len; i++) {
    carMenu[i] = {
      carType: sheet_data[3 + i][0],
      kmPrice: parseFloat(sheet_data[3 + i][1].match(/\d+(?:\.\d{2})?/)[0])
    };
    pricemap.set(carMenu[i].carType, carMenu[i].kmPrice);
  }
}
justFetchTable();


function erroralert(message) {
  Swal.fire({
    width: 500,
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
    { id: 'customadults', label: 'Adults' },
    { id: 'customchild', label: 'Children' },
    { id: 'accomrequired', label: 'Accommodation Required' },
    { id: 'customemail', label: 'Email Address', validate: validateEmail },
    { id: 'customphone', label: 'Phone Number', validate: validatePhoneNumber },
    { id: 'custom-address', label: 'Address', validate: validateTextArea },
    { id: 'vehicleid', label: 'Vehicle' },
    { id: 'customtotalkms', label: 'Approximate Total Kilometres\'' },
    { id: 'customplanprice', label: 'Approximate Total Price' },
  ];

  for (const field of formFields) {
    if (!field.id) continue;
    if (field.validate) {
      if (!field.validate(field.id, `${field.id}-error`)) {
        inputEmpty();
        return;
      }
    } else {
      if (!validateBlank(field.id, `${field.id}-error`)) {
        inputEmpty();
        return;
      }
    }
  }

  let dot;
  const markedCheckbox = document.querySelectorAll('[cuname]');
  for (const checkbox of markedCheckbox) {
    if (checkbox.checked) {
      dot = checkbox.value;
      break;
    }
  }

  let message = "";
  for (const field of formFields) {
    message += `${field.label}: ${document.getElementById(field.id).value}\n`;
  }

  message += `Preferred Channel To Contact Me: ${dot}\n\n`;
  message += `Plan Details:\n`;
  for (let i = 0; i < customplanregister.length; i++) {
    const plan = customplanregister[i];
    message += `${(i + 1)}) Date: ${convertDate(plan.date)}, Pickup Location: ${plan.pickup}, Drop Location: ${plan.drop}, Distance: ${plan.distance}\n`;
  }

  sendMail("Custom Plan", message);
  success();
  customizeplan();
}

/* Function to Calculate Distance using Google Maps */
function GoogleDistance(source, destination, ID) {
  if (!source.length || !destination.length || !ID.length) {
    return false;
  }
  const totalKmsInput = document.getElementById('customtotalkms');
  const totalPriceInput = document.getElementById('customplanprice');
  const vehicleIdInput = document.getElementById('vehicleid');
  if (!vehicleIdInput.value.length) {
    document.getElementById(`droplocation${ID.substring(10)}`).value = "";
    erroralert("Please select Vehicle...");
    return;
  }

  if (ID.substring(10) == 0) {
    totalPriceInput.value="";
    totalKmsInput.value="";

  }

  const directionsService = new google.maps.DirectionsService();
  const logDistance = document.getElementById(ID);
  const request = {
    origin: source,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC
  };

  directionsService.route(request, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const output = result.routes[0].legs[0].distance.text;
      logDistance.value = output;
      const demo = Number(totalKmsInput.value.split(" ")[0]);
      totalKmsInput.innerHTML = '';
      totalKmsInput.value = demo + Number(output.split(" ")[0]);
      totalPriceInput.value = Number(
        (totalKmsInput.value * pricemap.get(vehicleIdInput.value)).toFixed(2)
      );
    } else {
      logDistance.value = "Unable to fetch distance";
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

function validateCustomFields(row) {
  const date = document.getElementById(`datecustomid${row}`).value;
  const dest = document.getElementById(`droplocation${row}`).value;
  const vehicle = document.getElementById('vehicleid').value;
  const pickupCity = document.getElementById('pickupcity0').value;

  const dateRegex = /^(19|20)\d{2}[-](0?[1-9]|1[0-2])[-](0?[1-9]|[12]\d|3[01])$/;

  if (!pickupCity) {
    erroralert("Please select Pickup City");
    return false;
  }
  if (!vehicle) {
    erroralert("Please select Vehicle");
    return false;
  }
  if (!date) {
    erroralert("Please select Pickup Date");
    return false;
  }
  if (!dateRegex.test(date)) {
    erroralert("Invalid date format. Use YYYY-MM-DD");
    document.getElementById(`datecustomid${row}`).value = "";
    return false;
  }
  if (!dest) {
    erroralert("Please select Drop Location");
    return false;
  }
  return true;
}


function validatecustomrow(row) {
  const date = document.getElementById(`datecustomid${row}`).value;
  const dest = document.getElementById(`droplocation${row}`).value;
  if(!validateCustomFields(row)) return;
  addnewliner(row);
}

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

function cusplanform() {
  const formdiv = document.createElement("div");
  const trc = document.getElementById('custumplantable');
  const trclength = trc.rows.length;
  (trclength-2);
  if (!validateCustomFields(trclength-2)) { return };
  const cpickup = document.getElementById(`droplocation${(trclength-2)}`);
  const cdate = document.getElementById(`datecustomid${(trclength-2)}`);
  const cdrop = document.getElementById(`droplocation${(trclength-2)}`);
  const distance = document.getElementById(`distanceid${(trclength-2)}`).value.split(" ");
  document.getElementById('pickupcity0').disabled = true;
  document.getElementById('vehicleid').disabled = true;
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
          <input id="customfname" type="text" placeholder="Enter your First Name" required onkeypress="validateBlank('customfname', 'customfname-error')">
          <span id="customfname-error"></span>
    	  </div>
    	  <div class="custom-pop-forms-group">
    	    <span class="details">Last Name</span>
          <input id="customlname" type="text" placeholder="Enter your Last Name" required onkeypress="validateBlank('customlname', 'customlname-error')">
          <span id="customlname-error"></span>
        </div>
    	  <div class="custom-pop-forms-group">
    	    <span class="details">Email</span>
          <input id="customemail" type="email" placeholder="Enter your email" required onkeypress="validateEmail('customemail', 'customemail-error')">
          <span id="customemail-error"></span>
    	  </div>
    	  <div class="custom-pop-forms-group">
    	    <span class="details">Phone Number</span>
          <input id="customphone" type="text" placeholder="10-Digit Number" required onkeypress="validatePhoneNumber('customphone', 'customphone-error')">
          <span id="customphone-error"></span>
    	  </div>
    	  <div class="custom-pop-forms-group">
    	   	<label for="Adults">Adults:</label>
    	    <select title="Total Adults" id="customadults" name="Adults" required onchange="validateBlank('customadults', 'customadults-error')">
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
    	    <span id="customadults-error"></span>
    	  </div>
    	  <div class="custom-pop-forms-group">
    	    <label for="child">Children:</label>
    	    <select title="Total Child" id="customchild" name="child" required onchange="validateBlank('customchild', 'customchild-error')">
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
    	    <span id="customchild-error"></span>
    	  </div>
    	</div>
      <div id="customdatelabel" class="custom-pop-forms-group">
        <label for="Pickup">Accommodation Required</label>
        <select title="Total Child" id="accomrequired" name="child" required onchange="validateBlank('accomrequired', 'accomrequired-error')">
    	    <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
    	  </select>
        <span id="accomrequired-error"></span>
      </div>
      <div class="custom-pop-forms-group">
        <label for="message">Pickup Address</label>
        <textarea id="custom-address" rows="5" placeholder="Enter Your Pickup Address" required onkeypress="validateTextArea('custom-address', 'custom-address-error')"></textarea>
        <span id="custom-address-error"></span>
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
        <span id="custom_submit-error"></span>
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
  document.getElementById('vehicleid').disabled = true;
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
    <select name="droplocation" style="text-align: center;" id="droplocation${stubrev}" required aria-required="true" onchange='GoogleDistance(document.getElementById("customsource${stubrev}").value, document.getElementById("droplocation${stubrev}").value, "distanceid${stubrev}");'>
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
  const tableRowLength = table.rows.length;
  const lastRow = table.rows[tableRowLength - 2];
  const dataLength = customplanregister.length;
  const addCellHTML = `
    <td>
      <a id="addnewline${tableRowLength - 3}" onclick="validatecustomrow(${tableRowLength - 3});">
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </a>
    </td>
  `;

  if (tableRowLength === 3) {
    document.getElementById(`droplocation${tableRowLength - 3}`).disabled = false;
    document.getElementById(`datecustomid${tableRowLength - 3}`).disabled = false;
    document.getElementById('pickupcity0').disabled = false;
    document.getElementById('vehicleid').disabled = false;

    lastRow.insertCell(4).innerHTML = addCellHTML;
  }
  else if (tableRowLength > 3) {
    document.getElementById(`droplocation${tableRowLength - 3}`).disabled = false;
    document.getElementById(`datecustomid${tableRowLength - 3}`).disabled = false;

    lastRow.insertCell(4).innerHTML = addCellHTML;
    lastRow.insertCell(5).innerHTML = `
      <td>
        <a id="removelastline${tableRowLength - 3}" onclick="neglastline(${tableRowLength - 3});">
          <i class="fa fa-minus-circle" aria-hidden="true"></i>
        </a>
      </td>
    `;
  }

  table.deleteRow(-1);
  if (tableRowLength - 2 < dataLength) {
    customplanregister.pop();
  }
  const tdistance = customplanregister.reduce((acc, curr) => acc + curr.distance, 0);
  const customTotalKms = document.getElementById('customtotalkms');
  if (tdistance !== parseInt(customTotalKms.value, 10)) {
    customTotalKms.value = tdistance;
    document.getElementById('customplanprice').value = (tdistance * pricemap.get(document.getElementById('vehicleid').value)).toFixed(2);
  }
}

function customizeplan() {
  noterma('Customize Plan');
  let newlinecounter = 0;
  let visittablecontant;
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
  visittablecontant =
  `<div class="customplanpickup">
    <a>Select Pickup City<sup style="color: red;">*</sup></a>
    <select style="text-align: center;" name="pickupcity" id="pickupcity0" onchange="assigntosource('customsource0', 'pickupcity0'); GoogleDistance(document.getElementById('customsource0').value, document.getElementById('droplocation0').value, 'distanceid0');" required aria-required="true">
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
    <a>Select Vehicle<sup style="color: red;">*</sup></a>
    <select style="text-align: center; text-transform: capitalize;" name="Vehicle" id="vehicleid" onchange="GoogleDistance(document.getElementById('customsource0').value, document.getElementById('droplocation0').value, 'distanceid0');" required>
      <option value="">Select Vehicle</option>`;
      for (let j = 0; j < carMenu.length; j++) {
        visittablecontant += `<option style="text-transform: capitalize;" value="${carMenu[j].carType}">${carMenu[j].carType}</option>`;
      }
    visittablecontant +=
    `</select>
    <span id="vehicleid-error"></span>
  </div>`;
  visitContent.innerHTML = visittablecontant;
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
        <select style="text-align: center;" name="droplocation" id="droplocation0" required aria-required="true" onchange='GoogleDistance(document.getElementById("customsource0").value, document.getElementById("droplocation0").value, "distanceid0");'>
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
  <label font-weight: 600; for="Distance In Kilometers">Approximate Distance In km(s)</label>
  <input style="text-align: center;" id="customtotalkms" type="text" name="Distance In Kilometers" placeholder="Approximate Kilometers" readonly>
  <span id='customtotalkms-error'></span>
  <label style="font-weight: 600;" for="Rupees">Approximate Total Price</label>
  <input style="text-align: center;" id="customplanprice" type="text" name="Rupees" placeholder="Approximate Price" readonly>
  <span id='customplanprice-error'></span>
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