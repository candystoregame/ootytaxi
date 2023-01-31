/*Customize Plan Start*/
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
    } else {
      logdistance.value = "Unable to fetch distance";
    }
  });
}


/*function validatecustomdate(ID) {
  if(ID != null) {
    const valdate = document.getElementById(ID).value;
    if(ID.substring(12) > 0) {
      const prevID = (Number(ID.substring(12)))-1;
      let x = document.getElementById(ID.substring(0, 12) + prevID).value;
      x = new Date(x);
      let y = new Date(valdate);
      if (y < x) {
        erroralert("Please select later date than the previous one...");
        document.getElementById(ID).value = '';
        return false;
      }
    }
    if(valdate.length == 0) {
      erroralert("Please select Pickup Date...");
      return false;
    }
    if(!valdate.match(/^((19|20)\d{2}[\-]0?[1-9]|1[0-2])[\-](0?[1-9]|[12]\d|3[01])$/)) {
      erroralert("Please choose valid date format MM/DD/YYYY");
      document.getElementById(ID).value = '';
      return false;
    }
    return true;
  }
}*/

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
  const dateRegex = /^((19|20)\d{2}[\-]0?[1-9]|1[0-2])[\-](0?[1-9]|[12]\d|3[01])$/;//^((19|20)\d{2}[-]0?[1-9]|1[0-2])-$/;
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

/*function validatecustomrow(row) {
  if (row != null) {
    if(validatecustomdate('datecustomid' + row)) {
      const desti = document.getElementById('droplocation' + row).value;
      if (desti.length != 0) {
        addnewliner(row);
      }
      else {
        erroralert("Please select Drop Location...")
      }
    }
  }
}*/

function validatecustomrow(row) {
  //if (!row) return;
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


function cusplanform() {
  const formdiv = document.createElement("div");
  const tableContent = document.querySelector('.table-right-content');
  let formcontent;
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
          <input id="customfname" type="text" placeholder="Enter your First Name" required onkeyup="validatecustomfname()">
          <span id="custom-fname-error"></span>
    	  </div>
    	  <div class="custom-pop-forms-group">
    	    <span class="details">Last Name</span>
          <input id="customlname" type="text" placeholder="Enter your Last Name" required onkeyup="validatecustomlname()">
          <span id="custom-lname-error"></span>
        </div>
    	  <div class="custom-pop-forms-group">
    	    <span class="details">Email</span>
          <input id="customemail" type="email" placeholder="Enter your email" required onkeyup="validatecustomemail()">
          <span id="custom-email-error"></span>
    	  </div>
    	  <div class="custom-pop-forms-group">
    	    <span class="details">Phone Number</span>
          <input id="customphone" type="text" placeholder="Enter your number" required onkeyup="validatecustomphone()">
          <span id="custom-phone-error"></span>
    	  </div>
    	  <div class="custom-pop-forms-group">
    	   	<label for="Adults">Adults:</label>
    	    <select title="Total Adults" id="customadults" name="Adults" required onkeyup="validatecustomadults()">
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
    	    <select title="Total Child" id="customchild" name="child" required onkeyup="validatecustomchild()">
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
        <select title="Total Child" id="pchild" name="child" required onkeyup="validatepchild()">
    	    <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
    	  </select>
        <span id="pickup-date-error"></span>
      </div>
      <div class="custom-pop-forms-group">
        <label for="message">Pickup Address</label>
        <textarea id="custom-address" rows="5" placeholder="Enter Your Pickup Address" required onchange="validatepmessage()"></textarea>
        <span id="custom-message-error"></span>
      </div>
      <div class="custom-contact-channel">
        <input cuname="channel" type="radio" value="Phone" name="channel_custom" id="customz-dot-1" required>
        <input cuname="channel" type="radio" value="Email" name="channel_custom" id="customz-dot-2">
        <input cuname="channel" type="radio" value="WhatsApp" name="channel_custom" id="customz-dot-3">
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
        <input type="submit" value="Submit" onmouseover="mouseOver()">
        <span id="custom-submit-error"></span>
      </div>
    </form>
  </div>`;
  formdiv.innerHTML = formcontent;
}

function addnewliner(stub) {
  let stubrev = Number(stub + 1);
  const cpickup = document.getElementById('customsource'+stub);
  const cdrop = document.getElementById('droplocation'+stub);
  const cdate = document.getElementById('datecustomid'+stub);
  const ptable = document.getElementById('custumplantable');
  const distance = document.getElementById('distanceid'+stub).value.split(" ");
  if (cpickup.value != null && cdrop.value != null && cdate.value != null && distance != null) { 
    customplanregister[stub] = {date: cdate.value, pickup: cpickup.value, drop: cdrop.value, distance: Number(distance[0])};
    console.log(customplanregister);
    document.getElementById('pickupcity0').disabled = true;
    cdate.disabled = true;
    cpickup.disabled = true;
    cdrop.disabled = true;
    let row = ptable.insertRow(-1);
    let cell = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell2str;
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);
    let cell5 = row.insertCell(5);
    cell.innerHTML = `<td><input style="text-align: center;" type="date" id="datecustomid${stubrev}" placeholder="mm/dd/yyyy" min="${currentd}" class="localdate" required onchange="validatecustomdate('datecustomid${stubrev}');"></td>`;
    cell1.innerHTML = `<td><input style="text-align: center;" type="text" id="customsource${stubrev}" placeholder="Select Location Above" name="Source" disabled required aria-required="true"></td>`;
    cell2str = `<td>
      <select style="text-align: center;" name="droplocation" id="droplocation${stubrev}" required aria-required="true" onchange='GoogleDistace(document.getElementById("customsource${stubrev}").value, document.getElementById("droplocation${stubrev}").value, "distanceid${stubrev}");'>
        <option value="">Drop Location</option>`;
          for (let i = 0; i <= citymap.size; i++) {
            cell2str += '<option value="'+citymap.get(i)+'">'+citymap.get(i)+'</option>';
          }
          cell2str += `
      </select>
    </td>`;
    cell2.innerHTML = cell2str;
    cell3.innerHTML = `<td><input style="text-align: center;" type="text" id="distanceid${stubrev}" name="Distance" disabled required aria-required="true"></td>`;
    cell4.innerHTML = `<td><a id="addnewline${stubrev}" onclick="validatecustomrow(${stubrev});"><i class="fa fa-plus-circle" aria-hidden="true"></i><a></td>`;
    cell5.innerHTML = `<td><a id="removelastline${stubrev}" onclick="neglastline(${stubrev});"><i class="fa fa-minus-circle" aria-hidden="true"></i><a></td>`;
    assigntosource('customsource'+stubrev, 'droplocation'+stub);
    if (customplanregister.length != 1) {
      document.getElementById('customtotalkms').value = Number(document.getElementById('customtotalkms').value) + Number(customplanregister[customplanregister.length-1].distance);
      document.getElementById('customplanprice').value = Number(document.getElementById('customtotalkms').value) * 12;
    }
    if (customplanregister.length == 1) {
      document.getElementById('customtotalkms').value = Number(customplanregister[customplanregister.length-1].distance);
      document.getElementById('customplanprice').value = Number(document.getElementById('customtotalkms').value) * 12;
    }
    if (stub == 0) {
      ptable.rows[stub+1].deleteCell(4);
    }
    else {
      ptable.rows[stub+1].deleteCell(4);
      ptable.rows[stub+1].deleteCell(4);
    }
  }
}
  
function neglastline(row) {
  const trc = document.getElementById('custumplantable');
  const trclength = trc.rows.length;
  const datalength = customplanregister.length;
  const lrlc = trc.rows[trclength-2];
  console.log("Array Length: " + customplanregister.length);
  console.log("Table Length: " + trclength);
  if (trclength == 3) {
    document.getElementById('droplocation'+ (trclength-3)).disabled = false;
    document.getElementById('datecustomid'+ (trclength-3)).disabled = false;
    document.getElementById('pickupcity0').disabled = false;
    let lrlcdata = lrlc.insertCell(4);
    lrlcdata.innerHTML = `<td><a id="addnewline${trclength-3}" onclick="validatecustomrow(${trclength-3});"><i class="fa fa-plus-circle" aria-hidden="true"></i><a></td>`;
    trc.deleteRow(-1);
  }
  if (trclength > 3) {
    document.getElementById('droplocation'+ (trclength-3)).disabled = false;
    document.getElementById('datecustomid'+ (trclength-3)).disabled = false;
    let lrlcdata = lrlc.insertCell(4);
    let lrlcdata2 = lrlc.insertCell(5);
    lrlcdata.innerHTML = `<td><a id="addnewline${trclength-3}" onclick="validatecustomrow(${trclength-3});"><i class="fa fa-plus-circle" aria-hidden="true"></i><a></td>`;
    lrlcdata2.innerHTML = `<td><a id="removelastline${trclength-3}" onclick="neglastline(${trclength-3});"><i class="fa fa-minus-circle" aria-hidden="true"></i><a></td>`;
    trc.deleteRow(-1);
  }
  if ((trclength-2) < datalength) {
    document.getElementById('customtotalkms').value = Number(document.getElementById('customtotalkms').value) - Number(customplanregister[customplanregister.length-1].distance);
    document.getElementById('customplanprice').value = Number(document.getElementById('customtotalkms').value) * 12;
    customplanregister.pop();
    console.log("Array Length: " + customplanregister.length);
  }
} 

function customizeplan() {
  noterma('Customize Plan');
  let newlinecounter = 0;
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
    <span id="customplanvehicleid"></span>
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
  <input type="submit" value="Validate" onclick="cusplanform()">
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