/*Customize Plan Start*/
const currentd = new Date().toISOString().split('T')[0];
let contenttable = '';
let customplanregister = [];
/* Function to Calculate Distance using Google Maps */

function GoogleDistace(source, destination) {
    let directionsService = new google.maps.DirectionsService();
    const logdistance = document.getElementById('distanceid');
    let request = {
      origin: source,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    }
    directionsService.route(request, (result, status) => {
      if ( status == google.maps.DirectionsStatus.OK) {
        const output = result.routes[0].legs[0].distance.text;
        logdistance.value = output;
      }
      else {
        logdistance.value = "Unable fetch distance";
      }
    });
  }

  function validatecustomdate(ID) {
    const valdate = document.getElementById(ID).value;
    if ( valdate.length == 0) {
      //starterror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
      return false;
    }
    if(!valdate.match(/^((19|20)\d{2}[\-]0?[1-9]|1[0-2])[\-](0?[1-9]|[12]\d|3[01])$/)) {
        //starterror.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i> Date Format MM/DD/YYYY';
        console.log(valdate);
        return false;
    }
    //starterror.innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    console.log("Date correct, please proceed");
    return true;
  }
  
  function assigntosource(ID, tvalue) {
    document.getElementById(ID).value = document.getElementById(tvalue).value;
  }

  function addnewliner(stub) {
    const cpickup = document.getElementById('pickupcity'+stub);
    const cdrop = document.getElementById('droplocation'+stub);
    const cdate = document.getElementById('datecustomid'+stub);
    const ptable = document.getElementById('custumplantable'+stub);
    const distance = (document.getElementById('distanceid'+stub).value).split(" ");
    customplanregister[stub] = {date: cdate.value, pickup: cpickup.value, drop: cdrop.value, distance: Number(distance[0])};
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
    cell.innerHTML = `<td><input type="date" id="datecustomid${stub}" placeholder="mm/dd/yyyy" min="${currentd}" class="localdate" required onchange="validatecustomdate('datecustomid${newlinecounter}')"></td>`;
    cell1.innerHTML = `<td><input type="text" id="customsource${stub}" placeholder="Select Location Above" name="Source" disabled required aria-required="true"></td>`;
    cell2str = `<td>
      <select name="droplocation" id="droplocation${stub}" required aria-required="true" onchange='GoogleDistace(document.getElementById("customsource").value, document.getElementById("droplocation").value);'>
        <option value="">Drop Location</option>`;
          for (let i = 0; i <= citymap.size; i++) {
            cell2str += '<option value="'+citymap.get(i)+'">'+citymap.get(i)+'</option>';
          }
          cell2str += `
      </select>
    </td>`;
    cell2.innerHTML = cell2str;
    cell3.innerHTML = `<td><input type="text" id="distanceid${stub}" name="Distance" disabled required aria-required="true"></td>`;
    cell4.innerHTML = `<td><a id="addnewline${stub}"><i class="fa fa-plus-circle" aria-hidden="true"></i><a></td>`;
    cell5.innerHTML = `<td><a id="removelastline${stub}"><i class="fa fa-minus-circle" aria-hidden="true"></i><a></td>`;
    console.log(stub);
    ptable.rows[stub].deleteCell(4);
  }
  
  
  function customizeplan() {
    let newlinecounter = 0;
    const tablediv = document.createElement("div");
    const tableContent = document.querySelector('.table-right-content');
    const visitContent = document.querySelector('.placevisit-right-content');
    document.querySelector('.plan-midmenu').innerHTML = "";
    const addEvent = (id, event = 'click') => {
      document.getElementById(id).addEventListener(event, addnewliner(newlinecounter));
    }
    document.getElementById('planner-right-container').innerHTML = "";
    document.querySelector('.heading-right-content').innerHTML = `<h3>Customize your plan</h3>`;
    tableContent.innerHTML = "";
    visitContent.innerHTML = "";
    visitContent.innerHTML = 
    `<div class="customplanpickup">
      <a>Please select the pickup city</a>
      <select name="pickupcity" id="pickupcity" onchange="assigntosource('customsource', 'pickupcity')" required aria-required="true">
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
      </select><span id="customplanpickupid"></span></div>`;
    contenttable = `<table id='custumplantable'>
      <tr>
        <th>Pickup Date</th>
        <th>From</th>
        <th>To</th>
        <th>Distance</th>
      </tr>
      <tr>
        <td><input type="date" id="datecustomid0" placeholder="mm/dd/yyyy" min="${currentd}" class="localdate" required onchange="validatecustomdate('datecustomid')"></td>
        <td><input type="text" id="customsource0" placeholder="Select Location Above" name="Source" disabled required aria-required="true"></td>
        <td>
          <select name="droplocation" id="droplocation0" required aria-required="true" onchange='GoogleDistace(document.getElementById("customsource").value, document.getElementById("droplocation").value);'>
            <option value="">Drop Location</option>`;
              for (let i = 0; i <= citymap.size; i++) {
                contenttable += '<option value="'+citymap.get(i)+'">'+citymap.get(i)+'</option>';
              }
              contenttable += `
          </select>
        </td>
        <td><input type="text" id="distanceid0" name="Distance" disabled required aria-required="true"></td>
        <td><a id="addnewline0"><i class="fa fa-plus-circle" aria-hidden="true"></i><a></td>
      </tr>
    </table>`;
    tablediv.id = 'dynamictableID';
    tablediv.classList.add('dynamictabclass');
    tableContent.appendChild(tablediv);
    tablediv.innerHTML = contenttable;
    const addnewline = document.getElementById("addnewline0");
    addnewline.addEventListener('click', addnewliner(newlinecounter))
  }
  
  /*Customize Plan End*/