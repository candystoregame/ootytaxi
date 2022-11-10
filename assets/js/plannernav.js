function fetchElement(value) {
  fetchMidMenu(value);
}

function fetchMidMenu(fileName)
{
  let newDiv = document.createElement("div");
  fName = './assets/dataFiles/' + fileName;
  //console.log(fileName);
  let tablecon = document.querySelector('.plan-midmenu');
  tablecon.innerHTML='';
    (
      async() => {
        let text, _button, counter = 0, token;
        let workbook = XLSX.read(await (await fetch(fName)).arrayBuffer(), {type: 'array'});
        let worksheet = workbook.SheetNames;
        let html = XLSX.utils.sheet_to_json(workbook.Sheets[worksheet[0]]);
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
            _button.onclick = function() { alert(this.value); };
            _button.innerHTML = text;
          }
          newDiv.classList.add("plan-btn-pane");
          if (counter == 0) { let hEader = document.createElement("h3"); hEader.innerHTML=token; newDiv.appendChild(hEader); }
          newDiv.appendChild(_button);
          tablecon.appendChild(newDiv);
          counter = counter+1;
        }
      }
    )()
}