const keynotemap = new Map([
  ["Local Sightseeing (Hour Basis).xlsx", "tariffnote1"],
  ["Dropping Duty (Fixed).xlsx", "tariffnote2"],
  ["Out Station Duty (KM Basis).xlsx", "tariffnote3"],
  ["Dropping Duty (KM Basis).xlsx", "tariffnote4"],
  ["Tour Packages.xlsx", "tariffnote1"],
  ["Minimum Charges Day Rent(KM Basis).xlsx", "tariffnote1"],
  ["One Day Tour Packages.xlsx", "tariffnote1"],
  ["Two Days Tour Packages.xlsx", "tariffnote1"],
  ["Three Days Tour Packages.xlsx", "tariffnote1"],
  ["Four Days Tour Packages.xlsx", "tariffnote1"],
  ["Five Days Tour Packages.xlsx", "tariffnote1"],
  ["Six Days Tour Packages.xlsx", "tariffnote1"],
  ["Seven Days Tour Packages.xlsx", "tariffnote1"],
  ["Honeymoon Tour Packages.xlsx", "tariffnote5"]
]);

var globalfilepath;
var globaltableflag = 0;

function noterma(value) {
  const nplanner= document.querySelectorAll('.plan-note');
  nplanner.forEach(item => item.classList.remove('active'));
  document.getElementById(keynotemap.get(value)).className += ' active';
}

function sprma(divID) {
  let sheetsubname = divID;
  const oplanner= document.querySelectorAll('.options-button');
  oplanner.forEach(item => item.classList.remove('active'));
  document.getElementById(divID).className += ' active';
  fetchTable(globalfilepath, sheetsubname);
}

function rma() {
  const cplanner= document.querySelectorAll('.btn-plan-style');
  cplanner.forEach(item => item.classList.remove('active'));
}

function rsma() {
  const subplanner = document.querySelectorAll('.btn-plan-submenu');
  subplanner.forEach((item) => item.classList.remove('active'));
}

function fetchElement(value) {
  noterma(value);
  fetchMidMenu(value);
}

function fetchTable (fetchMidMenu, sheetName) {
  const tableContent = document.querySelector('.table-right-content');
  const TableHeading = document.querySelector('.heading-right-content');
  const VisitContent = document.querySelector('.placevisit-right-content');
  const rightMainDiv = document.getElementById('planner-right-container');
  const fName = fetchMidMenu;
  let plname, veh, freekm, freehrs, xhr, xkm, pamount;
  //console.log(sprma(value));
  if (globaltableflag != 1) {
    rightMainDiv.innerHTML='';
  }
  tableContent.innerHTML='';
  (
    async() => {
      const workbook = XLSX.read(await (await fetch(fName)).arrayBuffer(), {type: 'array'});
      const worksheet = workbook.SheetNames;
      const sheet_data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
      if(sheet_data.length == 0) {
        let j=0;
        const multisheet = [];
        globaltableflag = 1;
        for (let i =0 ; i < workbook.SheetNames.length; i++){
          if (worksheet[i].match(sheetName+'-')) {
            multisheet[j] = worksheet[i];
            j++;
          }
        }
        var PlanContent = '<div class="options-right-box"><div class="options-right-content">';
        for(i = 0; i<multisheet.length; i++) {
          const SplitVar = multisheet[i].split('-');
          if(i==0){PlanContent += '<button type="button" id="'+multisheet[i]+'" class="options-button active" value="'+multisheet[i]+'" onclick="sprma(value);">';}
          else {PlanContent += '<button type="button" id="'+multisheet[i]+'" class="options-button" value="'+multisheet[i]+'" onclick="sprma(value);">';}
          PlanContent += '<span class="button__content">'+SplitVar[1]+' Hours</span>';
          PlanContent += '<span class="button__icon"><ion-icon name="car-sport-outline"></ion-icon></span></button>';
        }
        PlanContent += '</div></div>';
        rightMainDiv.innerHTML = PlanContent;
        fetchTable(fetchMidMenu, multisheet[0]);
      }
      else if(sheet_data.length > 0) {
        var table_output = '<table class="pln-tbl-content">';
        for(var row = 0; row < sheet_data.length; row++)
        {
          if (row > 2 ) {table_output += '<tr>';}
          if (row == 2) {table_output += '<thead><tr>';}
          for(var cell = 0; cell < sheet_data[row].length; cell++)
          {
            if(row == 0) {
                //table_output += '<th colspan="7">'+sheet_data[row][cell]+'</th>';
                let hEader = document.createElement("h3");
                TableHeading.innerHTML='';
                hEader.innerHTML=sheet_data[row][cell];
                TableHeading.appendChild(hEader);
            }
            else if(row == 1) {
                //table_output += '<td colspan="7">'+sheet_data[row][cell]+'</td>';
                let hEader = document.createElement("p");
                VisitContent.innerHTML='';
                hEader.innerHTML=sheet_data[row][cell];
                VisitContent.appendChild(hEader);
            }
            else if(row == 2) {
              table_output += '<th>'+sheet_data[row][cell]+'</th>';
              if (sheet_data[row][cell].search("VEHICLES") == 0) {
                veh=cell;
                console.log(veh);
              }
              if (sheet_data[row][cell].search("HRS") == 0) {
                freehrs=cell;
                console.log(freehrs);
              }
              if (sheet_data[row][cell].search("FREE KMS") == 0) {
                freekm=cell;
                console.log(freekm);
              }
              if (sheet_data[row][cell].search("Extra Hrs.") == 14) {
                xhr=cell;
                console.log(xhr);
              }
              if (sheet_data[row][cell].search("After Free KMs") == 14) {
                xkm=cell;
                console.log(xkm);
              }
              if (sheet_data[row][cell].search("AMOUNT") == 0) {
                pamount=cell;
                console.log(pamount);
              }
            }
            else if(row == 2 && cell == sheet_data[row].length-1) {
              table_output += '<th>'+sheet_data[row][cell]+'&nbsp;&nbsp;<a class = "pln-shake">&darr;</a></th>';
            }
            else if (row > 2 && cell == sheet_data[row].length-1) {
              table_output += '<td table-data-label="#"><button id="planbutton'+(row-2)+'" onclick = "bookdetails(this.id);" title = "Click Book Now" type="button" class = "pln-tablebook" vehicle="'+sheet_data[row][veh]+'" amount="'+sheet_data[row][pamount]+'" freehrs="'+sheet_data[row][freehrs]+'" freekm="'+sheet_data[row][freekm]+'" extrahours="'+sheet_data[row][xhr]+'" extrakm="'+sheet_data[row][xkm]+'" pplan="'+sheet_data[0][0]+'">'+sheet_data[row][cell]+'</button></td>';
            }
            else {
                table_output += '<td table-data-label="'+sheet_data[2][cell]+'">'+sheet_data[row][cell]+'</td>';
                /*if(row == 2) { 
                  if (sheet_data[row][cell].search("VEHICLES") == 0) {
                    veh=cell;
                    console.log(veh);
                  }
                  if (sheet_data[row][cell].search("HRS") == 0) {
                    freehrs=cell;
                    console.log(freehrs);
                  }
                  if (sheet_data[row][cell].search("FREE KMS") == 0) {
                    freekm=cell;
                    console.log(freekm);
                  }
                  if (sheet_data[row][cell].search("Extra Hrs.") == 14) {
                    xhr=cell;
                    console.log(xhr);
                  }
                  if (sheet_data[row][cell].search("After Free KMs") == 14) {
                    xkm=cell;
                    console.log(xkm);
                  }
                  if (sheet_data[row][cell].search("AMOUNT") == 0) {
                    pamount=cell;
                    console.log(pamount);
                  }
                }*/
            }
          }
          if (row > 2) {table_output += '</tr>';}
          if (row == 2) {table_output += '</tr></thead>';}
        }
        table_output += '</table>';
        tableContent.innerHTML = table_output;
      }
    }
  )()
}


function fetchMidMenu(fileName)
{
  const newDiv = document.createElement("div");
  const fName = './assets/dataFiles/' + fileName;
  const midMenu = document.querySelector('.plan-midmenu');
  globaltableflag = 0;
  midMenu.innerHTML='';
    (
      async() => {
        let text, _button, counter = 0, token;
        const workbook = XLSX.read(await (await fetch(fName)).arrayBuffer(), {type: 'array'});
        const worksheet = workbook.SheetNames;
        const html = XLSX.utils.sheet_to_json(workbook.Sheets[worksheet[0]]);
        console.log(worksheet.length);
        if(worksheet.length > 2) {
          for (let key in html) {
            for (let header in html[key]) {
              text = html[key][header];
              token = header;
              _button = document.createElement("button");
              _button.type = 'button';
              _button.id = 'btn-plan-submenu-id' + (counter + 1);
              if (counter == 0) {_button.classList.add("btn-plan-submenu"); _button.className += ' active';}
              else {_button.classList.add("btn-plan-submenu");}
              _button.value = 'Sheet' + (2+counter)
              _button.onclick = function() { rsma(); fetchTable (fName, this.value); this.classList.toggle('active');};
              _button.innerHTML = text;
            }
            newDiv.classList.add("plan-btn-pane");
            if (counter == 0) { let hEader = document.createElement("h3"); hEader.innerHTML=token; newDiv.appendChild(hEader); }
            newDiv.appendChild(_button);
            midMenu.appendChild(newDiv);
            counter = counter+1;
          }
        }
      }
    )()
    fetchTable(fName, 'Sheet2');
    globalfilepath = fName;
    return fName;
}

function bookdetails(lavi) {
  let poppln = document.getElementById('contact-pln-pop'),
  closepoppln = document.querySelector('.close-pln-pop');
  poppln.style.display = 'block';
  closepoppln.addEventListener('click', function() {
    poppln.style.display = 'none';
  })

  window.addEventListener('click',function(e) {
    if(e.target == poppln) {
        poppln.style.display = 'none';
    }
  })

  let bclass = document.getElementById(lavi);
  let pplan = bclass.getAttribute("pplan");
  let vehicle = bclass.getAttribute("vehicle");
  //alert(pplan+vehicle)
}

window.addEventListener("load", () => {
  let lolelement = localStorage.getItem('thelolname');
  if (lolelement !== null) {
    localStorage.removeItem('thelolname');
    rma();
    document.getElementById(lolelement).className += " active";
    fetchElement(document.getElementById(lolelement).value);
    lolelement = null;
  }
})

function localmenu(lval) {
  rma();
  fetchElement(document.getElementById(lval).value);
  document.getElementById(lval).className += ' active';
}