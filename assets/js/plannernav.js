const keynotemap = new Map([
  ["Local Sightseeing (Hour Basis).xlsx", "tariffnote1"],
  ["Dropping Duty (Fixed).xlsx", "tariffnote2"],
  ["Out Station Duty (KM Basis).xlsx", "tariffnote3"],
  ["Dropping Duty (KM Basis).xlsx", "tariffnote4"],
  ["Tour Packages.xlsx", "tariffnote1"],
  ["Minimum Charges Day Rent (KM Basis).xlsx", "tariffnote1"],
  ["One Day Tour Packages.xlsx", "tariffnote1"],
  ["Two Days Tour Packages.xlsx", "tariffnote1"],
  ["Three Days Tour Packages.xlsx", "tariffnote1"],
  ["Four Days Tour Packages.xlsx", "tariffnote1"],
  ["Five Days Tour Packages.xlsx", "tariffnote1"],
  ["Six Days Tour Packages.xlsx", "tariffnote1"],
  ["Seven Days Tour Packages.xlsx", "tariffnote1"],
  ["Honeymoon Tour Packages.xlsx", "tariffnote5"]
]);

let planner_booknow_map = [];

let defaultmenu = 'tariff-planner1';

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

function fetchTable(fetchMidMenu, sheetName) {
  const tableContent = document.querySelector('.table-right-content');
  const TableHeading = document.querySelector('.heading-right-content');
  const VisitContent = document.querySelector('.placevisit-right-content');
  const rightMainDiv = document.getElementById('planner-right-container');
  const fName = fetchMidMenu;
  planner_booknow_map = [];
  let buttonmap,indext =0;
  let plname, veh, freekm, freehrs, xhr, xkm, pamount;
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
          buttonmap = 'planbutton'+(row-2);
          for(var cell = 0; cell < sheet_data[row].length; cell++)
          {
            if(row == 0) {
                let hEader = document.createElement("h3");
                TableHeading.innerHTML='';
                hEader.innerHTML=sheet_data[row][cell];
                TableHeading.appendChild(hEader);
            }
            else if(row == 1) {
                let hEader = document.createElement("p");
                VisitContent.innerHTML='';
                hEader.innerHTML=sheet_data[row][cell];
                VisitContent.appendChild(hEader);
            }
            else if(row == 2) {
              table_output += '<th>'+sheet_data[row][cell]+'</th>';
            }
            else if(row == 2 && cell == sheet_data[row].length-1) {
              table_output += '<th>'+sheet_data[row][cell]+'&nbsp;&nbsp;<a class="pln-shake">&darr;</a></th>';
            }
            else if (row > 2 && cell == sheet_data[row].length-1) {
              table_output += '<td table-data-label="#"><button id="planbutton'+(row-2)+'" onclick = "bookdetails(this.id);" title = "Click Book Now" type="button" class="pln-tablebook">'+sheet_data[row][cell]+'</button></td>';
            }
            else {
                table_output += '<td table-data-label="'+sheet_data[2][cell]+'">'+sheet_data[row][cell]+'</td>';
                let neyabba = {planmap: buttonmap, key: sheet_data[2][cell], value: sheet_data[row][cell]};
                planner_booknow_map[indext++]=neyabba;
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
      listplanvars = document.querySelector('.listofitems-selected'),
      closepoppln = document.querySelector('.close-pln-pop');
  let listplanvarsdata, tabcount, divcount;
  tabcount = planner_booknow_map[planner_booknow_map.length-1].planmap;
  lavi = Number(lavi.substring(10));
  tabcount = Number(tabcount.substring(10));
  divcount = planner_booknow_map.length;
  const itercount = divcount/tabcount;
  let selectmapdata = (lavi * itercount) - itercount;
  listplanvarsdata = '<ul>';
  for (let i=0; i<itercount; i++) {
    let mapdata = Number(i+selectmapdata);
    listplanvarsdata += '<li>'+(i+1)+'. '+planner_booknow_map[mapdata].key+': <b>'+planner_booknow_map[mapdata].value+'</b></li>';
  }
  listplanvarsdata += '</ul>';
  listplanvars.innerHTML = listplanvarsdata;
  poppln.style.display = 'block';
  closepoppln.addEventListener('click', function() {
    poppln.style.display = 'none';
  })

  window.addEventListener('click',function(e) {
    if(e.target == poppln) {
        poppln.style.display = 'none';
    }
  })
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
  else if (defaultmenu !== null) {localmenu(defaultmenu);}
  defaultmenu = null;
})

function localmenu(lval) {
    rma();
    fetchElement(document.getElementById(lval).value);
    document.getElementById(lval).className += ' active';
}

/* Mouse Tracker Function Start */

var cursor = {
  delay: 8,
  _x: 0,
  _y: 0,
  endX: (window.innerWidth / 2),
  endY: (window.innerHeight / 2),
  cursorVisible: true,
  cursorEnlarged: false,
  $dot: document.querySelector('.cursor-dot'),
  $outline: document.querySelector('.cursor-dot-outline'),
  
  init: function() {
      // Set up element sizes
      this.dotSize = this.$dot.offsetWidth;
      this.outlineSize = this.$outline.offsetWidth;
      
      this.setupEventListeners();
      this.animateDotOutline();
  },
  
//     updateCursor: function(e) {
//         var self = this;
      
//         console.log(e)
      
//         // Show the cursor
//         self.cursorVisible = true;
//         self.toggleCursorVisibility();

//         // Position the dot
//         self.endX = e.pageX;
//         self.endY = e.pageY;
//         self.$dot.style.top = self.endY + 'px';
//         self.$dot.style.left = self.endX + 'px';
//     },
  
  setupEventListeners: function() {
      var self = this;
      
      // Anchor hovering
      document.querySelectorAll('a').forEach(function(el) {
          el.addEventListener('mouseover', function() {
              self.cursorEnlarged = true;
              self.toggleCursorSize();
          });
          el.addEventListener('mouseout', function() {
              self.cursorEnlarged = false;
              self.toggleCursorSize();
          });
      });
      document.querySelectorAll('button').forEach(function(el) {
        el.addEventListener('mouseover', function() {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });
        el.addEventListener('mouseout', function() {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });
    });
      // Click events
      document.addEventListener('mousedown', function() {
          self.cursorEnlarged = true;
          self.toggleCursorSize();
      });
      document.addEventListener('mouseup', function() {
          self.cursorEnlarged = false;
          self.toggleCursorSize();
      });


      document.addEventListener('mousemove', function(e) {
          // Show the cursor
          self.cursorVisible = true;
          self.toggleCursorVisibility();

          // Position the dot
          self.endX = e.pageX;
          self.endY = e.pageY;
          self.$dot.style.top = self.endY + 'px';
          self.$dot.style.left = self.endX + 'px';
      });
      
      // Hide/show cursor
      document.addEventListener('mouseenter', function(e) {
          self.cursorVisible = true;
          self.toggleCursorVisibility();
          self.$dot.style.opacity = 1;
          self.$outline.style.opacity = 1;
      });
      
      document.addEventListener('mouseleave', function(e) {
          self.cursorVisible = true;
          self.toggleCursorVisibility();
          self.$dot.style.opacity = 0;
          self.$outline.style.opacity = 0;
      });
  },
  
  animateDotOutline: function() {
      var self = this;
      
      self._x += (self.endX - self._x) / self.delay;
      self._y += (self.endY - self._y) / self.delay;
      self.$outline.style.top = self._y + 'px';
      self.$outline.style.left = self._x + 'px';
      
      requestAnimationFrame(this.animateDotOutline.bind(self));
  },

  /*startAnimation: function() {
    var self = this;
    self.animationElements = document.querySelectorAll('.cursor-dot');

    for (let i = 0; i < this.animationElements.length+2; i++) {
        //scale
        gsap.fromTo(this.animationElements[i], { scale: 1 }, { scale: 5, repeat: -1, duration: 1.5, delay: i * 1.5 / 2, ease: Linear.easeNone });

        //opacity
        gsap.fromTo(this.animationElements[i], { opacity: .175 }, { opacity: 0, repeat: -1, duration: 1.5, delay: i * 1.5 / 2, ease: Power4.easeIn });
    }
},*/
  
  toggleCursorSize: function() {
      var self = this;
      
      if (self.cursorEnlarged) {
          self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
          self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
      } else {
          self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
          //self.startAnimation();
          self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
      }
  },
  
  toggleCursorVisibility: function() {
      var self = this;
      
      if (self.cursorVisible) {
          self.$dot.style.opacity = 1;
          self.$outline.style.opacity = 1;
      } else {
          self.$dot.style.opacity = 0;
          self.$outline.style.opacity = 0;
      }
  }
}

cursor.init();
 

/* Mouse Tracker Function End */

/*Slider Fetch Table Start*/

function fetchslidecontent(sheetName) {
  const slideContent = document.getElementById('slider_image_switch');
  const newDiv = document.createElement("div");
  const fName = './assets/dataFiles/sliderref.xlsx';
  let slidepath, slideheading, slidefilename, slidecomments, sliedeliteralpath;
  let slide_output="";
  let slide_btn_output="";
  (
    async() => {
      const workbook = XLSX.read(await (await fetch(fName)).arrayBuffer(), {type: 'array'});
      const sheet_data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
      if(sheet_data.length > 0) {
        slideContent.innerHTML='';
        for(var row = 0; row < sheet_data.length; row++)
        {
          for(var cell = 0; cell < sheet_data[row].length; cell++)
          {
            if (row > 0 && cell == 0) {
              slidepath = sheet_data[row][cell];
            }
            if (row > 0 && cell == 1) {
              slideheading = sheet_data[row][cell];
            }
            if (row > 0 && cell == 2) {
              slidefilename = sheet_data[row][cell];
            }
            if (row > 0 && cell == 3) {
              slidecomments = sheet_data[row][cell];
            }
          }
          if (row == 1) {
            sliedeliteralpath = slidepath+slidefilename;
            slide_output = '<div class="ooty-slide active"><img src="'+sliedeliteralpath+'" loading="eager" alt="Slides"><div class="info"><h2>'+slideheading+'</h2><p>'+slidecomments+'</p></div></div>';
            slide_btn_output = '<div class="slider-btn active"></div>';
          }
          if (row > 1) {
            sliedeliteralpath = slidepath+slidefilename;
            slide_output += '<div class="ooty-slide"><img src="'+sliedeliteralpath+'" loading="eager" alt="Slides"><div class="info"><h2>'+slideheading+'</h2><p>'+slidecomments+'</p></div></div>';
            slide_btn_output += '<div class="slider-btn"></div>';
          }
        }
        slideContent.innerHTML = slide_output;
        newDiv.id = "slider_btn_navigation";
        newDiv.classList.add("slider-navigation");
        slideContent.appendChild(newDiv);
        newDiv.innerHTML = slide_btn_output;
      }
    }
  )()
}

/*Slider Fetch Table End*/