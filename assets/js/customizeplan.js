/*Customize Plan Start*/

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
  
  function assigntosource(ID, tvalue) {
    document.getElementById(ID).value = document.getElementById(tvalue).value;
  }
  
  function customizeplan() {
    const currentd = new Date().toISOString().split('T')[0];
    const tablediv = document.createElement("div");
    const tableContent = document.querySelector('.table-right-content');
    const visitContent = document.querySelector('.placevisit-right-content');
    document.querySelector('.plan-midmenu').innerHTML = "";
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
    let contenttable = `<table>
      <tr>
        <th>Pickup Date</th>
        <th>From</th>
        <th>To</th>
        <th>Distance</th>
      </tr>
      <tr>
        <td><input type="date" placeholder="mm/dd/yyyy" min="${currentd}" class="localdate" required></td>
        <td><input type="text" id="customsource" name="Source" disabled required aria-required="true"></td>
        <td>
          <select name="droplocation" id="droplocation" required aria-required="true" onchange='GoogleDistace(document.getElementById("customsource").value, document.getElementById("droplocation").value);'>
            <option value="">Drop Location</option>`;
              for (let i = 0; i <= citymap.size; i++) {
                contenttable += '<option value="'+citymap.get(i)+'">'+citymap.get(i)+'</option>';
              }
              contenttable += `
          </select>
        </td>
        <td><input type="text" id="distanceid" name="Distance" disabled required aria-required="true"></td>
        <td><a><i class="fa fa-plus-circle" aria-hidden="true"></i><a></td>
      </tr>
    </table>`;
    tablediv.id = 'dynamictableID';
    tablediv.classList.add('dynamictabclass');
    tableContent.appendChild(tablediv);
    tablediv.innerHTML = contenttable;
  }
  
  /*Customize Plan End*/