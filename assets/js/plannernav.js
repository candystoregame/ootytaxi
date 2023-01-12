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
  ["Honeymoon Tour Packages.xlsx", "tariffnote5"],
  ["Customize Plan", "tariffnote6"]
]);

const keyanimationmap = new Map ([
  /*[1, "bounce"],
  [2, "flash"],
  [3, "pulse"],
  [4, "rubberBand"],
  [5, "shakeX"],
  [6, "shakeY"],
  [7, "headShake"],
  [8, "swing"],
  [9, "tada"],
  [10, "wobble"],
  [11, "jello"],
  [12, "heartBeat"],
  [13, "bounceIn"],
  [14, "bounceInDown"],
  [15, "bounceInLeft"],
  [16, "bounceInRight"],
  [17, "bounceInUp"],
  [18, "flip"],
  [19, "flipInX"],
  [20, "flipInY"],
  [21, "flipOutX"],
  [22, "flipOutY"],
  [23, "rotateIn"],*/
  [1, "rotateInDownLeft"],
  [2, "rotateInDownRight"]
]);

const citymap = new Map ([
  [0, "Alleppey, Kerala"],
  [1, "Amrita University"],
  [2, "Ettimadai, Tamil Nadu"],
  [3, "Anaikatti, Sterling Resorts, Kerala"],
  [4, "Anaikatti, Tamil Nadu"],
  [5, "Anaimalai Hills, Tamil Nadu"],
  [6, "Aruppukkottai, Tamil Nadu"],
  [7, "Ashtamudi - Kerala"],
  [8, "Athirappilly Water Falls, Kerala"],
  [9, "Avalanche - Ooty, Tamil Nadu"],
  [10, "Avinashi, Tamil Nadu"],
  [11, "Bandipur, Karnataka"],
  [12, "Bangalore International Airport (BIAL), Karnataka"],
  [13, "Bangalore, Karnataka"],
  [14, "Bannari Amman Temple, Bannari, Tamil Nadu"],
  [15, "Bekal, Kerala"],
  [16, "Bylakuppe, Karnataka"],
  [17, "Calicut, Kerala"],
  [18, "Chengalpattu, Tamil Nadu"],
  [19, "Chennai, Tamil Nadu"],
  [20, "Chidambaram, Tamil Nadu"],
  [21, "Chikmagalur, Karnataka"],
  [22, "Chottanikkara Temple, Kerala"],
  [23, "Cochin International Airport, Kerala"],
  [24, "Cochin, Kerala"],
  [25, "Coimbatore Airport, Tamil Nadu"],
  [26, "Coimbatore Railway station, Tamil Nadu"],
  [27, "Coimbatore, Tamil Nadu"],
  [28, "Coonoor, Tamil Nadu"],
  [29, "Coorg, Karnataka"],
  [30, "Courtallam, Tamil Nadu"],
  [31, "Damalcheruvu, Andhra Pradesh"],
  [32, "Devala, Tamil Nadu"],
  [33, "Dharmasthala, Karnataka"],
  [34, "Dindigul, Tamil Nadu"],
  [35, "Erode, Tamil Nadu"],
  [36, "Gokarna,Karnataka"],
  [37, "Guruvayur, Kerala"],
  [38, "Hampi,Karnataka"],
  [39, "Hassan, Karnataka"],
  [40, "Hogenakkal, Tamil Nadu"],
  [41, "Hosur, Tamil Nadu"],
  [42, "Hubli,Karnataka"],
  [43, "Hyderabad, Telangana"],
  [44, "Isha Yoga Center, Coimbatore, Tamil Nadu"],
  [45, "Kabini, Karnataka"],
  [46, "Kalady, Kerala"],
  [47, "Kallakurichi, Tamil Nadu"],
  [48, "Kalpetta, Kerala"],
  [49, "Kanchipuram, Tamil Nadu"],
  [50, "Kannur, Kerala"],
  [51, "Kanyakumari, Tamil Nadu"],
  [52, "Karaikal,Puducherry"],
  [53, "Karaikudi, Tamil nadu"],
  [54, "Karur, Tamil Nadu"],
  [55, "Kodai road Railway station, Tamil Nadu"],
  [56, "Kodaikanal, Tamil Nadu"],
  [57, "Kodungallur, Kerala"],
  [58, "Kollam, Kerala"],
  [59, "Kollur,Karnataka"],
  [60, "Kotagiri ,Tamil Nadu"],
  [61, "Kovalam, Kerala1"],
  [62, "Krishnagiri, Tamil Nadu"],
  [63, "Kumarakom, Kerala"],
  [64, "Kumbakonam, Tamil Nadu"],
  [65, "Lakkidi, Kerala"],
  [66, "Local Sightseeing"],
  [67, "Madurai Airport, Tamil Nadu"],
  [68, "Madurai, Tamil Nadu"],
  [69, "Mahabalipuram, Tamil Nadu"],
  [70, "Mangalore, Karnataka"],
  [71, "Manipal, Karnataka"],
  [72, "Mannargudi, Tamil Nadu"],
  [73, "Marthandam, Tamil Nadu"],
  [74, "Masinagudi, Tamil Nadu"],
  [75, "Mayiladuthurai, Tamil Nadu"],
  [76, "Mettupalayam, Tamil Nadu"],
  [77, "Mettur, Tamil Nadu"],
  [78, "Mudumalai Wildlife Sanctuary, Tamil Nadu"],
  [79, "Mukkali, Kerala"],
  [80, "Munnar Sterling Resorts, Kerala"],
  [81, "Munnar, Kerala"],
  [82, "Murudeshwara, Karnataka"],
  [83, "Musiri, Tamil Nadu"],
  [84, "Mysore, Karnataka"],
  [85, "Nagarhole National Park, Karnataka"],
  [86, "Nagercoil, Tamil Nadu"],
  [87, "Namakkal, Tamil Nadu"],
  [88, "Navagraha Temples, Tamil Nadu"],
  [89, "Nelliyampathy, Kerala146Neyveli, Tamil Nadu"],
  [90, "Oddanchatram, Tamil Nadu"],
  [91, "Ooty, Tamil Nadu"],
  [92, "Palakkad, Kerala"],
  [93, "Palani, Tamil Nadu"],
  [94, "Panaji, Goa"],
  [95, "Parambikulam, Kerala"],
  [96, "Pattukkottai, Tamil Nadu"],
  [97, "Pillayarpatti, Tamil Nadu"],
  [98, "Pollachi, Tamil Nadu"],
  [99, "Pondicherry, Pondicherry"],
  [100, "Poovar, Kerala"],
  [101, "Puttaparthi, Andhra Pradesh"],
  [102, "Pyramid Valley, Bangalore"],
  [103, "Rameshwaram, Tamil Nadu"],
  [104, "Rasipuram, Tamil Nadu"],
  [105, "Sabarimalai, Kerala"],
  [106, "Salem, Tamil Nadu"],
  [107, "Sathyamangalam, Tamil Nadu"],
  [108, "Shoranur, Kerala"],
  [109, "Shravanabelagola, Karnataka"],
  [110, "Sivakasi, Tamil Nadu"],
  [111, "Sringeri,Karnataka"],
  [112, "Sriperumbudur, Tamil Nadu"],
  [113, "Suchindram, Tamil Nadu"],
  [114, "Tenkasi, Tamil Nadu"],
  [115, "Thanjavur, Tamil Nadu"],
  [116, "Thekkady, Kerala"],
  [117, "Theni, Tamil Nadu"],
  [118, "Thiruchirapalli, Tamil Nadu"],
  [119, "Thirunallar, Puducherry"],
  [120, "Thiruvarur, Tamil Nadu"],
  [121, "Thoothukudi, Tamil Nadu"],
  [122, "Thrissur, Kerala"],
  [123, "Tiruchendur, Tamil Nadu"],
  [124, "Tiruchengode, Tamil Nadu"],
  [125, "Tirunelveli, Tamil Nadu"],
  [126, "Tirupati, Andhra Pradesh"],
  [127, "Tirupur, Tamil Nadu"],
  [128, "Tiruvannamalai, Tamil Nadu"],
  [129, "Topslip, Tamil Nadu"],
  [130, "Trivandrum, Kerala"],
  [131, "Udumalaipettai, Tamil Nadu"],
  [132, "Udupi, Karnataka"],
  [133, "Ulundurpet, Tamil Nadu"],
  [134, "Vadavalli, Coimbatore, Tamil Nadu"],
  [135, "Valparai, Tamil Nadu"],
  [136, "Varkala,Kerala"],
  [137, "Vathalagundu, Tamil Nadu"],
  [138, "Velankanni, Tamil Nadu"],
  [139, "Vellore, Tamil Nadu"],
  [140, "Vythiri, Kerala"],
  [141, "Wayanad, Kerala"],
  [142, "Yercaud, Tamil Nadu"]
]);

let animationcount = 1;

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

let planner_booknow_map = [];
let defaultmenu = 'tariff-planner1';
let globalfilepath;
let globaltableflag = 0;

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
        let PlanContent = '<div class="options-right-box"><div class="options-right-content">';
        for(i = 0; i<multisheet.length; i++) {
          const SplitVar = multisheet[i].split('-');
          if(i==0){PlanContent += '<button type="button" id="'+multisheet[i]+'" class="options-button active" value="'+multisheet[i]+'" onclick="sprma(value);">';}
          else {PlanContent += '<button type="button" id="'+multisheet[i]+'" class="options-button" value="'+multisheet[i]+'" onclick="sprma(value);">';}
          PlanContent += '<span class="button__content">'+SplitVar[1]+' Hours</span>';
          PlanContent += '<span class="button__icon"><i class="fa-solid fa-car"></i></span></button>';
        }
        PlanContent += '</div></div>';
        rightMainDiv.innerHTML = PlanContent;
        fetchTable(fetchMidMenu, multisheet[0]);
      }
      else if(sheet_data.length > 0) {
        animationcount++;
        if (animationcount > 2 || animationcount < 1) animationcount = 1;
        animateCSS('.table-right-content', keyanimationmap.get(animationcount));
        let table_output = '<table class="pln-tbl-content">';
        for(let row = 0; row < sheet_data.length; row++)
        {
          if (row > 2 ) {table_output += '<tr>';}
          if (row == 2) {table_output += '<thead><tr>';}
          buttonmap = 'planbutton'+(row-2);
          for(let cell = 0; cell < sheet_data[row].length; cell++)
          {
            if(row == 0) {
              planheader = sheet_data[row][cell];
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
              table_output += '<td table-data-label="#"><button id="planbutton'+(row-2)+'" onclick="bookdetails(this.id);" title = "Click Book Now" type="button" class="pln-tablebook">'+sheet_data[row][cell]+'</button></td>';
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
      document.getElementById('plan-form-id').reset();
  let listplanvarsdata, tabcount, divcount;
  tabcount = planner_booknow_map[planner_booknow_map.length-1].planmap;
  lavi = Number(lavi.substring(10));
  tabcount = Number(tabcount.substring(10));
  divcount = planner_booknow_map.length;
  const itercount = divcount/tabcount;
  let selectmapdata = (lavi * itercount) - itercount;
  listplanvarsdata = '<img src="assets/images/blog/cargif.gif" alt="Car Load" style="width:100%;height:40%;"><br><ul><li> Plan: <b>'+planheader+'</b></li>';
  for (let i=0; i<itercount; i++) {
    let mapdata = Number(i+selectmapdata);
    listplanvarsdata += '<li>'+(i+1)+'. '+planner_booknow_map[mapdata].key+': <b>'+planner_booknow_map[mapdata].value+'</b></li>';
    let heep = planner_booknow_map[mapdata].key;
    let heepvalue = planner_booknow_map[mapdata].value;
    planner_blob[i] = {key: heep, value: heepvalue};
  }
  listplanvarsdata += '</ul>';
  listplanvars.innerHTML = listplanvarsdata;
  console.log(planner_blob);
  poppln.style.display = 'block';
  closepoppln.addEventListener('click', function() {
    poppln.style.display = 'none';
    resetplanerrortags();
  })

  window.addEventListener('click',function(e) {
    if(e.target == poppln) {
        poppln.style.display = 'none';
        resetplanerrortags();
    }
  })
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
  let slidepath, slideheading, slidefilename, slidecomments, slideliteralpath;
  let slide_output="";
  let slide_btn_output="";
  (
    async() => {
      const workbook = XLSX.read(await (await fetch(fName)).arrayBuffer(), {type: 'array'});
      const sheet_data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
      if(sheet_data.length > 0) {
        slideContent.innerHTML='';
        for(let row = 0; row < sheet_data.length; row++)
        {
          for(let cell = 0; cell < sheet_data[row].length; cell++)
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
            slideliteralpath = slidepath+slidefilename;
            slide_output = '<div class="ooty-slide active"><img src="'+slideliteralpath+'" loading="eager" alt="Slides"><div class="info"><h2>'+slideheading+'</h2><p>'+slidecomments+'</p></div></div>';
            slide_btn_output = '<div class="slider-btn active"></div>';
          }
          if (row > 1) {
            slideliteralpath = slidepath+slidefilename;
            slide_output += '<div class="ooty-slide"><img src="'+slideliteralpath+'" loading="eager" alt="Slides"><div class="info"><h2>'+slideheading+'</h2><p>'+slidecomments+'</p></div></div>';
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