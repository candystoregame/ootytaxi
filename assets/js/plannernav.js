function fetchElement(value) {
  //alert(value);
  fetchMidMenu(value);
}

function fetchMidMenu(fileName)
{
  const newDiv = document.createElement("div");
  const fName = './assets/dataFiles/' + fileName;
  //console.log(fName);
  const midMenu = document.querySelector('.plan-midmenu');
  midMenu.innerHTML='';
    (
      async() => {
        let text, _button, counter = 0, token;
        const workbook = XLSX.read(await (await fetch(fName)).arrayBuffer(), {type: 'array'});
        const worksheet = workbook.SheetNames;
        const html = XLSX.utils.sheet_to_json(workbook.Sheets[worksheet[0]]);
        //console.log(html);
        for (let key in html) {
          for (let header in html[key]) {
            text = html[key][header];
            //console.log(header);
            token = header;
            _button = document.createElement("button");
            _button.type = 'button';
            _button.classList.add("btn-plan-submenu");
            //_button.value = text;
            _button.value = 'Sheet' + (2+counter)
            _button.onclick = function() { fetchTable (fName, this.value); };
            _button.innerHTML = text;
          }
          newDiv.classList.add("plan-btn-pane");
          if (counter == 0) { let hEader = document.createElement("h3"); hEader.innerHTML=token; newDiv.appendChild(hEader); }
          newDiv.appendChild(_button);
          midMenu.appendChild(newDiv);
          counter = counter+1;
        }
      }
    )()
    return fName;
}

function fetchTable (fetchMidMenu, sheetName) {
  const tableContent = document.querySelector('.plan-rightcontent');
  const fName = fetchMidMenu;
  tableContent.innerHTML='';
  (
    async() => {
      const workbook = XLSX.read(await (await fetch(fName)).arrayBuffer(), {type: 'array'});
      const sheet_data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
      if(sheet_data.length > 0) {
        var table_output = '<table class="pln-tbl-content">';
        for(var row = 0; row < sheet_data.length; row++)
        {
            table_output += '<tr>';
            for(var cell = 0; cell < sheet_data[row].length; cell++)
            {
                if(row == 0) {
                    table_output += '<th colspan="7">'+sheet_data[row][cell]+'</th>';
                }
                else if(row == 1) {
                    table_output += '<td colspan="7">'+sheet_data[row][cell]+'</td>';
                }
                else if(row == 2 && cell == sheet_data[row].length-1) {
                  table_output += '<td colspan="7">'+sheet_data[row][cell]+'<a class = "pln-shake">&darr;</a></td>';
              }
                else if (row > 2 && cell == sheet_data[row].length-1) {
                    table_output += '<td><button title = "Click Book Now" type="button" class = "pln-tablebook">'+sheet_data[row][cell]+'</button></td>';
                }
                else {
                    table_output += '<td>'+sheet_data[row][cell]+'</td>';
                }
            }
            table_output += '</tr>';
        }
        table_output += '</table>';
        tableContent.innerHTML = table_output;
      }
    }
  )()
}