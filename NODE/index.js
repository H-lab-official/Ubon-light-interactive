const firebase = require('firebase');
const controller = require('./src/Controller')
const room = require('./src/Room');
const validate = require('./src/Controller');
const osc = require("osc"),
    http = require("http"),
    WebSocket = require("ws");
class Index{

    constructor(){
        this.app = firebase.initializeApp({     
            apiKey: "AIzaSyDFSl2QDM96BReRFGR4MwrpbFXwao7NuP0",
        authDomain: "ubon-88459.firebaseapp.com",
        databaseURL: "https://ubon-88459.firebaseio.com",
        projectId: "ubon-88459",
        storageBucket: "ubon-88459.appspot.com",
        messagingSenderId: "835364456620",
        appId: "1:835364456620:web:337d85f78f0f4f75da7709",
        measurementId: "G-J3YXEF9H0V"});
        
        // this.udpPort = new osc.UDPPort({
        //     localAddress: "0.0.0.0",
        //     localPort: 1235,
        //     metadata: true
        // });
                this.udpPort = new osc.UDPPort({
            localAddress: "0.0.0.0",
            localPort: 1235,
            metadata: true
        });
        this.udpPort.open();
        for(let i=1; i<=24; i++){
            new room().getDataRoom(this.udpPort, i);
        }
        
        new controller().getDataMovement(this.udpPort);
        new controller().getDataSpeed(this.udpPort);
        // new room().getDataRoom(this.udpPort, 2);
        // new room().getDataRoom(this.udpPort, 3);
        // new room().getDataRoom(this.udpPort, 4);
        // new room().getDataRoom(this.udpPort, 5);
        // new room().getDataRoom(this.udpPort, 6);
        // new room().getDataRoom(this.udpPort, 7);
        // new room().getDataRoom(this.udpPort, 8);
        // new room().getDataRoom(this.udpPort, 9);
        // new room().getDataRoom(this.udpPort, 10);
        // new room().getDataRoom(this.udpPort, 11);
        // new room().getDataRoom(this.udpPort, 12);
        // new room().getDataRoom(this.udpPort, 13);
        // new room().getDataRoom(this.udpPort, 14);
        // new room().getDataRoom(this.udpPort, 15);
        // new room().getDataRoom(this.udpPort, 16);
        // new room().getDataRoom(this.udpPort, 17);
        // new room().getDataRoom(this.udpPort, 18);
        // new room().getDataRoom(this.udpPort, 19);
        // new room().getDataRoom(this.udpPort, 20);
        // new room().getDataRoom(this.udpPort, 21);
        // new room().getDataRoom(this.udpPort, 22);
        // new room().getDataRoom(this.udpPort, 23);
        // new room().getDataRoom(this.udpPort, 24);
        // for (let index = 1; index <=1; index++) {
        //     this.getData(this.udpPort,index);
        // }
        
  
            // this.getData(this.udpPort,1);
            //  this.getData(this.udpPort,2);

        

        // this.getData(this.udpPort,1);

        // this.getData(this.udpPort,1);
        // this.getData(this.udpPort,1);
        // this.getData(this.udpPort,1);
    }

   async getData(xxx,numberroom){
       //address:`/composition/layers/${numberroom}/clips/8/video/source/solidcolor/color/`,
        var ref = firebase.database().ref(`Data/Color/Room${numberroom}/`).on('value',async function(dataSnapshot) {
            // console.log(dataSnapshot.val());

                       xxx.send({
                address: `/composition/layers/${numberroom}/clips/8/video/source/solidcolor/color/`,
                args: [
                    {
                        type: "r",
                        value: {
                            r: dataSnapshot.val().R,
                            g: dataSnapshot.val().G,
                            b: dataSnapshot.val().B,
                        }
                    }
                ],
            }, "127.0.0.1", 1235);
          
   
          }
          );
          
    }

    async xxx(data){

        // var udpPort = new osc.UDPPort({
        //     localAddress: "0.0.0.0",
        //     localPort: 1234,
        //     metadata: true
        // });
        // udpPort.open();
        // udpPort.on("ready",async function () {
        //     console.log("s");
        //     udpPort.send({
        //         address: "/s_new",
        //         args: [
        //             {
        //                 type: "s",
        //                 value: "default"
        //             },
        //             {
        //                 type: "i",
        //                 value: 200
        //             }
        //         ]
        //     }, "192.168.1.160", 1234);
        // });
    }
}

var x = new Index();










