function zfunc() {

    // $(".start").addClass('animate__animated', 'animate__fadeOut');
    const element = document.querySelector('.PAGEONE');
    element.classList.add('animate__animated', 'animate__fadeOut');
    let t2 = setTimeout(function () {
        element.style.display = "none";
        const element2 = document.querySelector('.PAGETWO');
        element2.style.display = "inline";
        var content = element2.innerHTML;
        element2.innerHTML = content;

        // element2.classList.add('animate__animated', 'animate__fadeInUp');
    }, 1000);

    this.insertQ();

}


$(async function () {

    firebase.database().ref("Data/Q").on('value', async function (snapshot) {
        if (snapshot.val() == null) {
            document.getElementById('wait').innerHTML = 0;
        } else {
            document.getElementById('wait').innerHTML = await Object.keys(snapshot.val()).length;

        }

    });
    setCookie(null);
    firebase.database().ref("Data/Q/").limitToFirst(1).on('value', function (snapshot) {

        if (snapshot.val() == null) {
            firebase.database().ref("Data/PresenQ/").limitToFirst(1).once('value', function (snapshot) {

                document.getElementById('presenQ').innerHTML = snapshot.val().Q;
            });
        } else {
            document.getElementById('presenQ').innerHTML = Object.keys(snapshot.val())[0];
            document.getElementById('presenQ1').innerHTML = Object.keys(snapshot.val())[0];
            let checkQ = getCookie("Q");
            if (checkQ != "") {

                document.getElementById('wait1').innerHTML = checkQ - Object.keys(snapshot.val())[0];
                let remain_q = document.getElementById('wait1').innerHTML;
                if (remain_q == '0') {
                    Qzero();
                }
                // document.getElementById('wait1').innerHTML = checkQ -Object.keys(snapshot.val())[0];
            } else {

            }

        }
        let checkQ = getCookie("Q");

        if (snapshot.val() != null) {
            if (checkQ == Object.keys(snapshot.val())[0]) {
                timeOut(checkQ);
            }


        }

    })

    let checkQ = getCookie("Q");
    if (checkQ != "") {
        // $(".start").addClass('animate__animated', 'animate__fadeOut');
        const element = document.querySelector('.PAGEONE');
        element.classList.add('animate__animated', 'animate__fadeOut');

        element.style.display = "none";
        const element2 = document.querySelector('.PAGETWO');
        element2.style.display = "inline";
        var content = element2.innerHTML;
        element2.innerHTML = content;

        let rest_q = document.getElementById('wait1').innerHTML;


        // element2.classList.add('animate__animated', 'animate__fadeInUp');

        firebase.database().ref("Data/Q/" + checkQ).on('value', function (params) {

            if (params.val() === null) {
                var mydate = new Date();
                mydate.setTime(mydate.getTime() - 1);
                document.cookie = "Q=null; expires=" + mydate.toGMTString();
                document.cookie = "Time=null; expires=" + mydate.toGMTString();
                location.reload();
            }
        })

    }

    firebase.database().ref("Data/Q/").limitToFirst(1).on('value', async function (snapshot) {
        document.getElementById('wait').innerHTML = 0;

        if (snapshot.val() != undefined || snapshot.val() != null) {
            var x = await Object.keys(snapshot.val())[0];
            firebase.database().ref("Data/Q/").once('value', async function (snapshot) {

                // document.getElementById('wait').innerHTML =await snapshot.numChildren();
                // document.getElementById('wait1').innerHTML = Object.keys(snapshot.val())[0]-x+1;
            });
            if (snapshot.val() == null) {
                // document.getElementById('allQ').innerHTML = '<p> คิวทั้งหมด : '+0+'</p>';
            } else {
                // document.getElementById('allQ').innerHTML = '<p> คิวทั้งหมด : '+snapshot.val()+'</p>';
            }
        }

    })
    firebase.database().ref("Data/Q/").limitToLast(1).on('value', function (snapshot) {

    });

});


async function insertQ() {


    let conf = await confirm("คุณต้องการจองคิวหรือไม่ ? ");
    if (conf == await true) {
        var result = await this.validateQ().then(function (params) {
            return params
        });

         // var result = await validateQ().then(function (params) {
            //     return params
            // });

        var adaRef = firebase.database().ref('Data/AllQ/Q/');
        let transaction =await adaRef.transaction(function(currentData) {
            // var result =  validateQ().then(function (params) {
            //         return params
            //     });
            console.log(currentData);
            if(currentData == null){
                console.log("NULLLLLL :",currentData);
                countQ =currentData;
                return   currentData;
            }else{
                console.log("NOT NULL :",currentData+1);
                countQ =currentData+1;
                return   currentData+1;
                // return   currentData+2;
            }
            countQ = currentData+2;
                console.log(currentData+2);
            
           
          });


        var result = await this.validateQ().then(function (params) {
            return params
        });
        let count = parseInt(result) + 1;
        this.setCookie(countQ);
        // this.setCookie(count);

        await firebase.database().ref("Data/Q/"+countQ).set({
            "TimeStart": "X",
            "TimeEnd": "A"

        });
        // await firebase.database().ref("Data/AllQ/Q/").set(
        //     parseInt(count)
        // );
        await firebase.database().ref("Data/PresenQ/Q/").set(
            parseInt(countQ)
        );
        firebase.database().ref("Data/Q/" + countQ).on('value', function (params) {
           
            if (params.val() == null) {
                var mydate = new Date();
                mydate.setTime(mydate.getTime() - 1);
                document.cookie = "Q=null; expires=" + mydate.toGMTString();
                document.cookie = "Time=null; expires=" + mydate.toGMTString();
                 location.reload();
            }
        })
    }

    firebase.database().ref("Data/Q/").limitToFirst(1).once('value', function (snapshot) {
        let checkQ = getCookie("Q");
        if (checkQ != "") {
            document.getElementById('wait1').innerHTML = checkQ - Object.keys(snapshot.val())[0];
            // document.getElementById('wait1').innerHTML = checkQ -Object.keys(snapshot.val())[0];


        } else {

        }
    });
}

async function validateQ() {
    return new Promise(async (resolve, reject) => {

        await firebase.database().ref("Data/AllQ/Q").once('value', async function (snapshot) {
            if (snapshot.val() == null) {
                resolve(0);
                return
            }
            Q = await snapshot.val();
            resolve(Q);
            return
        });

    });
}

async function setCookie(count) {
    
    if (count == null) {
        var qcookie = this.getCookie("Q");
        document.getElementById('yourQ').innerHTML = qcookie;
        console.log("XXXXXX :"+count);
        return
    }
    
    var mydate = new Date();
    mydate.setTime(mydate.getTime() + 4800 * 1000);
    document.cookie = `Q=${count}; expires= ${mydate} `
    var qcookie = this.getCookie("Q");
    document.getElementById('yourQ').innerHTML = qcookie;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

async function timeOut(Q) {
    var count = 120;
    //   alert(getCookie('Time'))

    if (getCookie('Time') <= count && getCookie('Time') != "") {
        count = getCookie('Time');
    }

    var x = setInterval(async function () {
        count--;
        console.log(count);
        document.cookie = `Time=${count}`;
        console.log("cookie = " + getCookie('Time'));
        document.querySelector('.navbar').innerHTML = `<h2>คุณมีเวลาเหลือ ${getCookie('Time')} วินาที</h2>`;
        // document.getElementById('time').innerHTML = '<p> เหลือเวลา : '+ count+'</p>';
        if (count == 0) {


            clearInterval(x);
            var mydate = new Date();
            mydate.setTime(mydate.getTime() - 1);
            document.cookie = "Q=null; expires=" + mydate.toGMTString();
            document.cookie = "Time=null; expires=" + mydate.toGMTString();
            firebase.database().ref("Data/Q/" + Q).remove();


            setSpeed2Firebase(0);
            firebase.database().ref("Data/Movement").set({
                "Status": 11,
            });

            for (let indexz = 0; indexz < 24; indexz++) {
                firebase.database().ref("Data/Color/Room" + (indexz + 1)).set({
                    "red": 0,
                    "green": 0,
                    "blue": 0
                });
            }


            var z = setTimeout(function () {
                location.reload();
            }, 1000);






        }
    }, 1000);

}











//----------------Start initController function----------------
const initController = () => {
    //----------------initial variable----------------
    // Create new link Element 
    var link = document.createElement('link');

    // set the attributes for link element 
    link.rel = 'stylesheet';

    link.type = 'text/css';

    link.href = 'controller.css';

    // Get HTML head element to append  
    // link element to it  
    document.getElementsByTagName('HEAD')[0].appendChild(link);


    let cellElement = document.querySelectorAll('.cell');
    let presetElement = document.querySelectorAll('.presetinput');
    let toggleState = 1;
    let hexpick = '#FFFFFF';
    let presetstatus = 1;
    let presetnowcolor = ['#383838', '#383838', '#383838', '#383838', '#383838'];
    let buillding_arr = [
        [{ 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }],
        [{ 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }],
        [{ 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }],
        [{ 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }, { 'r': 0, 'g': 0, 'b': 0 }]
    ];

    let colorPicker = new iro.ColorPicker('#picker', {
        layoutDirection: 'horizontal',
        width: 240,
        margin: 50
    });


    let stylename = [
        {
            'name': 'Prehistoric',
            'fullname': 'Prehistoric Art',
            'color': ['#321512', '#80491E', '#B76C31', '#4F1012', '#892C1C'],
        },
        {
            'name': 'Ancient',
            'fullname': 'Ancient Art',
            'color': ['#528693', '#A08F54', '#FDE26B', '#D28639', '#4C9AC1'],
        },
        {
            'name': 'Medieval',
            'fullname': 'Medieval Art',
            'color': ['#8F4139', '#00627D', '#AB987A', '#3D4F53', '#ECC65F'],
        },
        {
            'name': 'Renaissance',
            'fullname': 'Renaissance Art',
            'color': ['#935342', '#CD9B5A', '#6D8566', '#C5907B', '#5C9EA5'],
        },
        {
            'name': 'Baroque',
            'fullname': 'Baroque',
            'color': ['#EED09D', '#297770', '#D09A3E', '#BB5327', '#C2C76C'],
        },
        {
            'name': 'Rococo',
            'fullname': 'Rococo',
            'color': ['#236353', '#598A80', '#F9E7B3', '#ED997E', '#FDD2C3'],
        },
        {
            'name': 'Nouveau',
            'fullname': 'Art Nouveau',
            'color': ['#A72933', '#FCD595', '#F7C353', '#CBC481', '#869D7C'],
        },
        {
            'name': 'Impression',
            'fullname': 'Impressionism',
            'color': ['#E18256', '#F0BA7D', '#73A353', '#7E82AD', '#478EB0'],
        },
        {
            'name': 'Pop Art',
            'fullname': 'Pop Art',
            'color': ['#FCE600', '#008BCE', '#E5018C', '#D069A9', '#ED1C24'],
        },
        {
            'name': 'Pastel',
            'fullname': 'Pastel',
            'color': ['#C9FFE5', '#ADE9FF', '#BFB7FF', '#FFCEEA', '#FEFFBB'],
        },
        {
            'name': 'Fluorescent',
            'fullname': 'Fluorescent',
            'color': ['#41EEEB', '#6FF000', '#FFE900', '#F200FF', '#0000FF'],
        },
        {
            'name': 'UbonArt',
            'fullname': 'UbonArtFest',
            'color': ['#124A79', '#15B9A9', '#DEB685', '#E84352', '#000000'],
        },
        {
            'name': 'H-Lab',
            'fullname': 'H-Lab selected',
            'color': ['#124A79', '#FF1680', '#B866FF', '#73EBFF', '#10E5CB'],
        },
        {
            'name': 'Russian',
            'fullname': 'Russian Poster Art',
            'color': ['#FFCF5B', '#85AB8F', '#ED1C24', '#F58337', '#008EB0'],
        }
    ];
    let parentstyleDiv = document.querySelector('.groupstyle');
    let headerstylename = document.querySelector('.stylename');



    //----------------hex to rgb---------------- 
    const hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }





    //----------------function for set css in each element----------------
    const css = (element, style) => {
        for (const property in style)
            element.style[property] = style[property];
    }



    //----------------function about color picker----------------
    colorPicker.on('color:change', function (color) {
        // log the current color as a HEX string
        let colornow = document.querySelector('.colornow');

        hexpick = color.hexString;

        css(colornow, {
            'background-color': hexpick,
        });

    })

    colorPicker.on('input:end', function (color) {
        // log the current color as a HEX string
        let preset = document.querySelector('.preset' + presetstatus);

        hexpick = color.hexString;
        css(preset, {
            'background-color': hexpick,
            // 'border-color': hexpick,
            // 'border-width': '1px'
        });
        presetnowcolor[presetstatus - 1] = hexpick;
        presetstatus++;
        if (presetstatus > 5) {
            presetstatus = 1;
        }
    });



    //----------------init color on each window and add function to each input windows----------------
    for (let index = 0; index < cellElement.length; index++) {
        let idstr = cellElement[index].classList[1];
        let cellBG = document.querySelector('.' + idstr);
        let cellInput = document.querySelector('#' + idstr);
        let row_i = Math.floor(index / 6);
        let col_j = index % 6;

        css(cellBG, {
            'background-color': '#BCBEC0',
        });
        //reset to black
        setRoomcolor2Firebase(buillding_arr, index, row_i, col_j);

        cellInput.onchange = () => {
            // console.log("FillColor Id  = "+hexpick);
            //    buillding_arr[row_i][col_j] = hexpick;
            buillding_arr[row_i][col_j] = hexToRgb(hexpick);
            setRoomcolor2Firebase(buillding_arr, index, row_i, col_j);
            // console.log("FillColor RGB = "+JSON.stringify(hexToRgb(hexpick)));
            css(cellBG, {
                'background-color': hexpick,
            });
        }

    }


    //----------------init color on preset and add function in each input----------------
    for (let index = 0; index < presetElement.length; index++) {
        let idstr = presetElement[index].id;
        let cellInput = document.querySelector('#' + idstr);

        cellInput.onchange = () => {
            hexpick = presetnowcolor[index];
            let colornow = document.querySelector('.colornow');
            css(colornow, {
                'background-color': hexpick,
            });

            for (let index2 = 0; index2 < presetElement.length; index2++) {
                let idstr2 = presetElement[index2].id;
                let cellBG = document.querySelector('.' + idstr2);
                if (index != index2) {
                    css(cellBG, {
                        // 'border-color': presetnowcolor[index2],
                        // 'border-width': '1px'
                        'border-color': 'black',
                        'border-width': '1px'
                    });
                } else {
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
        divbtn.type = "button";
        divbtn.className = "stylebtn";
        divbtn.id = "stylebtn" + index;
        divbtn.value = stylename[index].name;
        parentstyleDiv.appendChild(divbtn);

        divbtn.onclick = () => {
            let rndcrit = 5;
            if (index == 11) {
                rndcrit = 4;
            }

            headerstylename.innerHTML = stylename[index].fullname;
            for (let index2 = 1; index2 <= 5; index2++) {
                let preset = document.querySelector('.preset' + index2);
                let hexpick = stylename[index].color[index2 - 1];
                css(preset, {
                    'background-color': hexpick,
                    // 'border-color': hexpick,
                    // 'border-width': '1px'
                });
                presetnowcolor[index2 - 1] = hexpick;
            }
            presetstatus = 1;
            //random style color ineach block
            for (let index3 = 0; index3 < cellElement.length; index3++) {
                let idstr = cellElement[index3].classList[1];
                let cellBG = document.querySelector('.' + idstr);
                let randstyle = Math.floor(Math.random() * rndcrit);
                let row_i = Math.floor(index3 / 6);
                let col_j = index3 % 6;
                let randColorstyle = stylename[index].color[randstyle];
                // buillding_arr[row_i][col_j] = randColorstyle;
                buillding_arr[row_i][col_j] = hexToRgb(randColorstyle);
                setRoomcolor2Firebase(buillding_arr, index3, row_i, col_j);
                css(cellBG, {
                    'background-color': randColorstyle,
                });
            }
            // console.log(buillding_arr);
        }
    }







    //-------------direction control section-------------
    let directioncontrolDiv = document.querySelector('.directioncontrol');
    let resetbtn = document.querySelector('.resetbtn');
    let directionValue = 0;//reset direction

    for (let index = 0; index < 9; index++) {
        let divbtn = document.createElement('input');
        // divbtn.type = "button"
        divbtn.type = "image";
        divbtn.src = "img/Button/deactive/de" + (index + 1) + ".png"
        divbtn.className = "directionbtn";
        divbtn.id = "directionbtn" + index;
        divbtn.value = index;

        directioncontrolDiv.appendChild(divbtn);


        divbtn.onclick = () => {
            for (let index2 = 0; index2 < 9; index2++) {
                let divbtn2 = document.querySelector('#directionbtn' + index2);
                if (index != index2) {
                    divbtn2.src = "img/Button/deactive/de" + (index2 + 1) + ".png";
                } else {
                    divbtn.src = "img/Button/active/act" + (index + 1) + ".png";
                }
            }
            directionValue = index + 1;
            setMovement2Firebase(directionValue);
            let speedcontrolDiv = document.querySelector('#speedcontrol');
            let suff = parseFloat((Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(4));
            let speedcontrolString = parseFloat(speedcontrolDiv.value);
            let speed_value = speedcontrolString + suff;
            // console.log(`string = ${speedcontrolString} ,type = ${typeof(speedcontrolString)}, suff = ${suff}, sum=${speed_value}`);
            // let speed_value =  parseInt(speedcontrolDiv.value)+(Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(4);

            setSpeed2Firebase(speed_value);
        }
    }


    //-------------speed control section-------------
    let speedcontrolDiv = document.querySelector('#speedcontrol');
    setSpeed2Firebase(0);

    speedcontrolDiv.value = 5;
    speedcontrolDiv.onchange = () => {
        setSpeed2Firebase(speedcontrolDiv.value);
    }

    resetbtn.onclick = () => {
        setSpeed2Firebase(5);
        speedcontrolDiv.value = 5;
        directionValue = 0;
        for (let index2 = 0; index2 < 9; index2++) {
            let divbtn2 = document.querySelector('#directionbtn' + index2);
            divbtn2.src = "img/Button/deactive/de" + (index2 + 1) + ".png";
        }
        // let divbtnMovementdefault = document.querySelector('#directionbtn'+0);
        // divbtnMovementdefault.src = "img/Button/active/act1.png";
        setMovement2Firebase(10);
    }
}

//----------------END initController function----------------



// --------------------------------FIRE BASE func---------------------------

// firebase.database().ref("Data/Color/").limitToFirst(1).on('value', function(snapshot){
//     console.log("testFIREBASE");
//     console.log(snapshot.val());
// });


const setRoomcolor2Firebase = (buillding_arr, roomindex, row_index, col_index) => {
    firebase.database().ref("Data/Color/Room" + (roomindex + 1)).set({
        "red": buillding_arr[row_index][col_index].r,
        "green": buillding_arr[row_index][col_index].g,
        "blue": buillding_arr[row_index][col_index].b
    });
}


// firebase.database().ref("Data/Q/kkk").set({
//              "TimeStart" : "1",
//              "TimeEnd":"ss"

// });

// firebase.database().ref("Data/Q/kkk").remove();


const setMovement2Firebase = (movement_state) => {


    firebase.database().ref("Data/Movement").set({
        "Status": movement_state,
    });
}


const setSpeed2Firebase = (speed_state) => {
    firebase.database().ref("Data/Speed").set({
        "Status": speed_state,
    });
}

//-------------footer btn section-------------

let navbar = document.querySelector('.navbar');
let firstpage = document.querySelector('.firstpage');
let splashpage = document.querySelector('.splash');
let aboutUSsection = document.querySelector('.aboutUSsection');
// let aboutUSdiv = document.querySelector('.aboutUSdiv');
const css = (element, style) => {
    for (const property in style)
        element.style[property] = style[property];
}

let togglecontrolSection = document.querySelector('.togglecontrol');
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

css(togglecontrolSection, { 'display': 'none', });
css(directionspeedSection, { 'display': 'none', });
css(colorpickSection, { 'display': 'none', });
css(aboutUSsection, { 'display': 'none', });


//-------------------------Qzero ->this finction worl when rest of Q is Zero-------------------------
const Qzero = () => {
    css(splashpage, { 'display': 'none', });
    css(firstpage, { 'display': 'none', });
    initController(); //init light,movement,speed controller
    let t1 = setTimeout(() => {
        css(togglecontrolSection, { 'display': 'flex', });
        css(colorpickSection, { 'display': 'flex', });
        colorpickSection.classList.add('animate__animated', 'animate__fadeInUp');
        // footerparent1.classList.remove('BACTIVE');
        // footerparent2.classList.add('BACTIVE');
        // footerparent3.classList.remove('BACTIVE');
        // footerparent4.classList.remove('BACTIVE');
        // let divbtnMovementdefault = document.querySelector('#directionbtn'+0);
        // divbtnMovementdefault.src = "img/Button/active/act1.png";
        setMovement2Firebase(10);
    }, 1000);
    //---------------- mode color pick toggle----------------
    const toggleSwitch = () => {
        let toggleDivCustom = document.querySelector('#custombtn');
        let toggleDivStyle = document.querySelector('#stylebtn');
        let toggleDivEffect = document.querySelector('#effectbtn');
        let pickerManualDivStyle = document.querySelector('.pickermanual');
        let pickerStyleDivStyle = document.querySelector('.pickerstyle');

        let colorpickSection = document.querySelector('.colorpicksection');
        let directionspeedSection = document.querySelector('.directionspeedcontrol');
        switch (toggleState) {
            case 1:
                css(colorpickSection, { 'display': 'flex', });
                css(directionspeedSection, { 'display': 'none', });
                css(toggleDivStyle, { 'background-color': 'white', 'color': 'black', 'border-color': 'yellow' });
                css(toggleDivCustom, { 'background-color': '#383838', 'color': '#afafaf', 'border-color': 'yellow' });
                css(toggleDivEffect, { 'background-color': '#383838', 'color': '#afafaf', 'border-color': 'yellow' });
                css(pickerStyleDivStyle, { 'display': 'block', });
                css(pickerManualDivStyle, { 'display': 'none', });
                setMovement2Firebase(10);
                break;
            case 2:
                css(colorpickSection, { 'display': 'flex', });
                css(directionspeedSection, { 'display': 'none', });
                css(toggleDivStyle, { 'background-color': '#383838', 'color': '#afafaf', 'border-color': 'yellow' });
                css(toggleDivCustom, { 'background-color': 'white', 'color': 'black', 'border-color': 'yellow' });
                css(toggleDivEffect, { 'background-color': '#383838', 'color': '#afafaf', 'border-color': 'yellow' });
                css(pickerStyleDivStyle, { 'display': 'none', });
                css(pickerManualDivStyle, { 'display': 'block', });
                setMovement2Firebase(10);
                break;
            case 3:
                css(colorpickSection, { 'display': 'none', });
                css(directionspeedSection, { 'display': 'flex', });
                css(toggleDivStyle, { 'background-color': '#383838', 'color': '#afafaf', 'border-color': 'yellow' });
                css(toggleDivCustom, { 'background-color': '#383838', 'color': '#afafaf', 'border-color': 'yellow' });
                css(toggleDivEffect, { 'background-color': 'white', 'color': 'black', 'border-color': 'yellow' });
                css(pickerStyleDivStyle, { 'display': 'none', });
                css(pickerManualDivStyle, { 'display': 'none', });
                directionspeedSection.classList.add('animate__animated', 'animate__fadeInUp');
                // setMovement2Firebase(10);
                setMovement2Firebase(10);
                setSpeed2Firebase(5);
                break;

            default:
                break;
        }

    }

    let toggleElement = document.querySelectorAll('.togglebtn');
    for (let index = 0; index < toggleElement.length; index++) {
        let html_id = toggleElement[index].id;
        let toggleDiv = document.querySelector('#' + html_id);
        switch (index) {
            case 0:
                css(toggleDiv, { 'background-color': 'white', 'color': 'black' });
                toggleDiv.onclick = () => {
                    toggleState = 1;
                    toggleSwitch();
                }
                break;
            case 1:
                css(toggleDiv, { 'background-color': '#383838', 'color': '#afafaf' });
                toggleDiv.onclick = () => {
                    toggleState = 2;
                    toggleSwitch();
                }
                break;
            case 2:
                css(toggleDiv, { 'background-color': '#383838', 'color': '#afafaf' });
                toggleDiv.onclick = () => {
                    toggleState = 3;
                    toggleSwitch();
                }
                break;

            default:
                break;
        }
    }
    //--- light palette control button ---//
    // footerbtn2.onclick=()=>{
    //     css(firstpage,{'display':'none',}); 
    //     css(colorpickSection,{'display':'flex',});
    //     css(directionspeedSection,{'display':'none',});
    //     css(aboutUSsection,{'display':'none',});
    //     colorpickSection.classList.add('animate__animated', 'animate__fadeInUp');
    //     footerparent1.classList.remove('BACTIVE');
    //     footerparent2.classList.add('BACTIVE');
    //     footerparent3.classList.remove('BACTIVE');
    //     footerparent4.classList.remove('BACTIVE');
    //     setMovement2Firebase(10);
    //     setSpeed2Firebase(0);
    // }

    // //--- movement and speed control button ---//
    // footerbtn3.onclick=()=>{
    //     css(firstpage,{'display':'none',}); 
    //     css(aboutUSsection,{'display':'none',});
    //     css(colorpickSection,{'display':'none',});
    //     css(directionspeedSection,{'display':'flex',});
    //     directionspeedSection.classList.add('animate__animated', 'animate__fadeInUp');
    //     setMovement2Firebase(1);
    //     for (let index2 = 0; index2 < 9; index2++) {
    //             let divbtn2 = document.querySelector('#directionbtn'+index2);
    //             divbtn2.src = "img/Button/deactive/de"+(index2+1)+".png";
    //     }
    //     let divbtnMovementdefault = document.querySelector('#directionbtn'+0);
    //     divbtnMovementdefault.src = "img/Button/active/act1.png";
    //     let speedcontrolDiv = document.querySelector('#speedcontrol');
    //     speedcontrolDiv.value =5;
    //     setSpeed2Firebase(5);
    //     footerparent1.classList.remove('BACTIVE');
    //     footerparent2.classList.remove('BACTIVE');
    //     footerparent3.classList.add('BACTIVE');
    //     footerparent4.classList.remove('BACTIVE');
    // }

    // //--- aboutUS button ---//
    // footerbtn4.onclick=()=>{
    //     css(directionspeedSection,{'display':'none',});
    //     css(colorpickSection,{'display':'none',});
    //     css(firstpage,{'display':'none',});
    //     css(aboutUSsection,{'display':'flex',});
    //     aboutUSsection.classList.add('animate__animated', 'animate__fadeInUp');
    //     footerparent1.classList.remove('BACTIVE');
    //     footerparent2.classList.remove('BACTIVE');
    //     footerparent3.classList.remove('BACTIVE');
    //     footerparent4.classList.add('BACTIVE');
    // }
}