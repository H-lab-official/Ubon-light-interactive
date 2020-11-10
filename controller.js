//----------------initial variable----------------
let cellElement = document.querySelectorAll('.cell');
let presetElement = document.querySelectorAll('.presetinput');
let toggleElement = document.querySelectorAll('.togglebtn');
let toggleState = true;
let hexpick = '#FFFFFF';
let presetstatus = 1;
let presetnowcolor = ['#383838','#383838','#383838','#383838','#383838'];
let buillding_arr = [
                     [{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0}],
                     [{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0}],
                     [{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0}],
                     [{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0},{'r':0,'g':0,'b':0}]
                    ];
console.log(buillding_arr);
let colorPicker = new iro.ColorPicker('#picker',{
      layoutDirection: 'horizontal',
      width: 240,
      margin: 50
});


let stylename =[
        {
            'name': 'Prehistoric',
            'fullname': 'Prehistoric Art',
            'color': ['#321512', '#80491E','#B76C31','#4F1012','#892C1C'],
        },
        {
            'name': 'Ancient',
            'fullname': 'Ancient Art',
            'color': ['#528693', '#A08F54','#FDE26B','#D28639','#4C9AC1'],
        },
        {
            'name': 'Medieval',
            'fullname': 'Medieval Art',
            'color': ['#8F4139', '#00627D','#AB987A','#3D4F53','#ECC65F'],
        },
        {
            'name': 'Renaissance',
            'fullname': 'Renaissance Art',
            'color': ['#935342', '#CD9B5A','#6D8566','#C5907B','#5C9EA5'],
        },
        {
            'name': 'Baroque',
            'fullname': 'Baroque',
            'color': ['#EED09D', '#297770','#D09A3E','#BB5327','#C2C76C'],
        },
        {
            'name': 'Rococo',
            'fullname': 'Rococo',
            'color': ['#236353', '#598A80','#F9E7B3','#ED997E','#FDD2C3'],
        },
        {
            'name': 'Nouveau',
            'fullname': 'Art Nouveau',
            'color': ['#A72933', '#FCD595','#F7C353','#CBC481','#869D7C'],
        },
        {
            'name': 'Impressionism',
            'fullname': 'Impressionism',
            'color': ['#E18256', '#F0BA7D','#73A353','#7E82AD','#478EB0'],
        },
        {
            'name': 'Pop Art',
            'fullname': 'Pop Art',
            'color': ['#FCE600', '#008BCE','#E5018C','#D069A9','#ED1C24'],
        },
        {
            'name': 'Pastel',
            'fullname': 'Pastel',
            'color': ['#C9FFE5', '#ADE9FF','#BFB7FF','#FFCEEA','#FEFFBB'],
        },
        {
            'name': 'Fluorescent',
            'fullname': 'Fluorescent',
            'color': ['#41EEEB', '#6FF000','#FFE900','#F200FF','#0000FF'],
        },
        {
            'name': 'UbonArt',
            'fullname': 'UbonArtFest',
            'color': ['#124A79', '#15B9A9','#DEB685','#E84352','#000000'],
        },
        {
            'name': 'H-Lab',
            'fullname': 'H-Lab selected',
            'color': ['#124A79', '#FF1680','#B866FF','#73EBFF','#10E5CB'],
        },
        {
            'name': 'Russian',
            'fullname': 'Russian Poster Art',
            'color': ['#FFCF5B', '#85AB8F','#ED1C24','#F58337','#008EB0'],
        }
    ];
let parentstyleDiv = document.querySelector('.groupstyle');
let headerstylename = document.querySelector('.stylename');
// --------------------------------FIRE BASE---------------------------

// firebase.database().ref("Data/Color/").limitToFirst(1).on('value', function(snapshot){
//     console.log("testFIREBASE");
//     console.log(snapshot.val());
// });


const setRoomcolor2Firebase=(roomindex,row_index,col_index)=>{
    firebase.database().ref("Data/Color/Room"+(roomindex+1)).set({
             "R" :buillding_arr[row_index][col_index].r,
             "G" :buillding_arr[row_index][col_index].g,
             "B" :buillding_arr[row_index][col_index].b
    });
}


// firebase.database().ref("Data/Q/kkk").set({
//              "TimeStart" : "1",
//              "TimeEnd":"ss"
             
// });

// firebase.database().ref("Data/Q/kkk").remove();


const setMovement2Firebase=(movement_state)=>{
    firebase.database().ref("Data/Movement").set({
             "Status" : movement_state,
    });
}


const setSpeed2Firebase=(speed_state)=>{
    firebase.database().ref("Data/Speed").set({
             "Status" : speed_state,
    });
}


//----------------hex to rgb---------------- 
const hexToRgb=(hex)=>{
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}





//----------------function for set css in each element----------------
const css=(element, style)=> {
    for (const property in style)
        element.style[property] = style[property];
}


//---------------- mode color pick toggle----------------
const toggleSwitch = ()=>{
    let toggleDivCustom = document.querySelector('#custombtn');
    let toggleDivStyle = document.querySelector('#stylebtn');
    let pickerManualDivStyle = document.querySelector('.pickermanual');
    let pickerStyleDivStyle = document.querySelector('.pickerstyle');
    if(toggleState){
        css(toggleDivCustom, {
        'background-color': 'white',
        'color': 'black',
        'border-color': 'yellow'
        });
        css(toggleDivStyle, {
        'background-color': '#383838',
        'color': '#afafaf',
        'border-color': 'yellow'
        });
        css(pickerManualDivStyle,{
        'display':'block',
        });
        css(pickerStyleDivStyle,{
        'display':'none',
        });
    }else{
        css(toggleDivCustom, {
        'background-color': '#383838',
        'color': '#afafaf',
        'border-color': 'yellow'
        });
        css(toggleDivStyle, {
        'background-color': 'white',
        'color': 'black',
        'border-color': 'yellow'
        });
        css(pickerManualDivStyle,{
        'display':'none',
        });
        css(pickerStyleDivStyle,{
        'display':'block',
        });
    }
    
}

for (let index = 0; index < toggleElement.length; index++) {
    let html_id = toggleElement[index].id;
    let toggleDiv = document.querySelector('#'+html_id);
    let pickerManualDivStyle = document.querySelector('.pickermanual');
    let pickerStyleDivStyle = document.querySelector('.pickerstyle');
    if(index==0){
        css(toggleDiv, {
        'background-color': 'white',
        'color': 'black'
         });
         
        toggleDiv.onclick=()=>{
            toggleState = true;
            toggleSwitch();
        }
    }else{
        css(toggleDiv, {
        'background-color': '#383838',
        'color': '#afafaf'
        });
        
        toggleDiv.onclick=()=>{
            toggleState = false;
            toggleSwitch();
        }
    }
    css(pickerManualDivStyle,{
        'display':'block',
        });
        css(pickerStyleDivStyle,{
        'display':'none',
        });
    
}


//----------------function about color picker----------------
colorPicker.on('color:change', function(color) {
  // log the current color as a HEX string
  let colornow = document.querySelector('.colornow');
  
  hexpick = color.hexString;
  
  css(colornow, {
        'background-color': hexpick,
    });
  console.log("colorHEX = "+hexpick);
})

colorPicker.on('input:end', function(color) {
  // log the current color as a HEX string
  let preset = document.querySelector('.preset'+presetstatus);
  
  hexpick = color.hexString;
  css(preset, {
        'background-color': hexpick,
        // 'border-color': hexpick,
        // 'border-width': '1px'
    });
  presetnowcolor[presetstatus-1]=hexpick;
  console.log("colorHEX = "+hexpick);
  console.log("presetnowcolor = "+presetnowcolor);
  presetstatus++;
  if(presetstatus>5){
      presetstatus=1;
  }
});



//----------------init color on each window and add function to each input windows----------------
for (let index = 0; index < cellElement.length; index++) {
    let idstr = cellElement[index].classList[1];
    let cellBG = document.querySelector('.'+idstr);
    let cellInput = document.querySelector('#'+idstr);
    let row_i = Math.floor(index/6);
    let col_j = index%6;
    console.log("row_i = "+row_i+", col_j = "+col_j+", all = "+index);
    css(cellBG, {
        'background-color': '#BCBEC0',
    });

    cellInput.onchange=()=> {
       console.log("FillColor Id  = "+hexpick);
    //    buillding_arr[row_i][col_j] = hexpick;
       buillding_arr[row_i][col_j] = hexToRgb(hexpick);
       setRoomcolor2Firebase(index,row_i,col_j);
       console.log("FillColor RGB = "+JSON.stringify(hexToRgb(hexpick)));
       css(cellBG, {
            'background-color': hexpick,
        });
     }
     
}


//----------------init color on preset and add function in each input----------------
for (let index = 0; index < presetElement.length; index++) {
    let idstr = presetElement[index].id;
    let cellInput = document.querySelector('#'+idstr);
    console.log(presetElement[index]);
    cellInput.onchange=()=> {
        hexpick = presetnowcolor[index];
        let colornow = document.querySelector('.colornow');
        css(colornow, {
            'background-color': hexpick,
        });

        for (let index2 = 0; index2 < presetElement.length; index2++) {
            let idstr2 = presetElement[index2].id;
            let cellBG = document.querySelector('.'+idstr2);
            if(index!=index2){
                css(cellBG, {
                    // 'border-color': presetnowcolor[index2],
                    // 'border-width': '1px'
                    'border-color': 'black',
                    'border-width': '1px'
                });
            }else{
                css(cellBG, {
                    'border-color': 'white',
                    'border-width': '1px'
                });
            }
        }
     }
}


//-------------Style section---------0---
for (let index = 0; index < stylename.length; index++) {
    // const element = array[index];
    let divbtn = document.createElement('input');
    divbtn.type = "button"
    divbtn.className = "stylebtn";
    divbtn.id = "stylebtn"+index;
    divbtn.value = stylename[index].name;
    parentstyleDiv.appendChild(divbtn);

    divbtn.onclick=()=>{
        // alert("kuy");
        let rndcrit =5;
        if(index==11){
            rndcrit = 4;
        }
        
        headerstylename.innerHTML = stylename[index].fullname;
        for (let index2 = 1; index2 <=5; index2++) {
          let preset = document.querySelector('.preset'+index2); 
          let hexpick = stylename[index].color[index2-1];
             css(preset, {
                'background-color': hexpick,
                // 'border-color': hexpick,
                // 'border-width': '1px'
            });
            presetnowcolor[index2-1]=hexpick;
        }
        presetstatus =1;
        //random style color ineach block
            for (let index3 = 0; index3 < cellElement.length; index3++) {
                let idstr = cellElement[index3].classList[1];
                let cellBG = document.querySelector('.'+idstr);
                let randstyle = Math.floor(Math.random() * rndcrit);
                let row_i = Math.floor(index3/6);
                let col_j = index3%6; 
                let randColorstyle = stylename[index].color[randstyle];
                // buillding_arr[row_i][col_j] = randColorstyle;
                buillding_arr[row_i][col_j] = hexToRgb(randColorstyle);
                setRoomcolor2Firebase(index3,row_i,col_j);
                css(cellBG, {
                    'background-color': randColorstyle,
                });
            }
            console.log(buillding_arr);
    }
}







//-------------direction control section-------------
let directioncontrolDiv = document.querySelector('.directioncontrol');
let resetbtn = document.querySelector('.resetbtn');

for (let index = 0; index < 9; index++) {
    let divbtn = document.createElement('input');
    divbtn.type = "button"
    divbtn.className = "directionbtn";
    divbtn.id = "directionbtn"+index;
    divbtn.value = index;

    directioncontrolDiv.appendChild(divbtn);

    divbtn.onclick=()=>{
        setMovement2Firebase(index);
    }
}


//-------------speed control section-------------

let speedcontrolDiv = document.querySelector('#speedcontrol');
setSpeed2Firebase(0);

speedcontrolDiv.value = 50;
speedcontrolDiv.onchange=()=>{
    setSpeed2Firebase(speedcontrolDiv.value);
}

resetbtn.onclick=()=>{
    setSpeed2Firebase(50);
    speedcontrolDiv.value =50;
}




//-------------footer btn-------------

let colorpickSection = document.querySelector('.colorpicksection');
let directionspeedSection = document.querySelector('.directionspeedcontrol');

let footerparent1 = document.querySelector('#footerlink1');
let footerbtn1 = document.querySelector('#footerbtn1');
let footerparent2 = document.querySelector('#footerlink2');
let footerbtn2 = document.querySelector('#footerbtn2');
let footerparent3 = document.querySelector('#footerlink3');
let footerbtn3 = document.querySelector('#footerbtn3');
let footerparent4 = document.querySelector('#footerlink4');
let footerbtn4 = document.querySelector('#footerbtn4');

css(colorpickSection,{
'display':'flex',
});
css(directionspeedSection,{
'display':'none',
});

footerbtn2.onclick=()=>{
    css(colorpickSection,{
    'display':'flex',
    });
    css(directionspeedSection,{
    'display':'none',
    });
    // setSpeed2Firebase(0);
    footerparent1.classList.remove('BACTIVE');
    footerparent2.classList.add('BACTIVE');
    footerparent3.classList.remove('BACTIVE');
    footerparent4.classList.remove('BACTIVE');
}

footerbtn3.onclick=()=>{
    css(directionspeedSection,{
    'display':'flex',
    });
    css(colorpickSection,{
    'display':'none',
    });
    setSpeed2Firebase(50);

    footerparent1.classList.remove('BACTIVE');
    footerparent2.classList.remove('BACTIVE');
    footerparent3.classList.add('BACTIVE');
    footerparent4.classList.remove('BACTIVE');
}