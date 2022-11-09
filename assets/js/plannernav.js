function fetchElement(value) {
  fetchMidMenu(value);
}

function fetchMidMenu(fileName)
{
  let newDiv = document.createElement("div");
  fName = './assets/dataFiles/' + fileName;
  console.log(fileName);
  let tablecon = document.querySelector('.plan-midmenu');
  tablecon.innerHTML='';
    (
      async() => {
        var text;
        let workbook = XLSX.read(await (await fetch(fName)).arrayBuffer(), {type: 'array'});
        //let worksheet = workbook.SheetNames;
        let html = XLSX.utils.sheet_to_json(workbook.Sheets['Sheet1']);
        console.log(html);
        for (var key in html) {
            for (var header in html[key]) {
                text = html[key][header];
                //console.log(text);
                var _button = document.createElement("button");
                _button.classList.add("btn-plan-submenu");
                _button.value = text;
                _button.type = 'button';
                _button.onclick = function() { alert(this.value); };
                _button.innerHTML = text;
            }
            newDiv.classList.add("plan-btn-pane")
            newDiv.appendChild(_button);
            tablecon.appendChild(newDiv);


        }
      }
    )()
}