const firebase = require('firebase');
const osc = require("osc"),
    http = require("http"),
    WebSocket = require("ws");
class Room{
    constructor(){

    }

   async getDataRoom(osc ,numberroom){
        var ref = firebase.database().ref(`Data/Color/Room${numberroom}/`).on('value',(dataSnapshot)=> {
           
            for (var key in dataSnapshot.val()) {
               let value =dataSnapshot.val()[key]/255;
               this.sendDataToResulume(osc, numberroom, value, key)
             }
            // this.sendDataToResulume(osc, numberroom, dataSnapshot.val());

        })
    }

    sendDataToResulume(osc, numberroom, RGB, color){

        osc.send({
            address: `/composition/layers/${numberroom}/clips/8/video/source/solidcolor/color/${color}`,
            args: [
                {
                    type: "f",
                    value: RGB,
                   
                }
            ],
        }, "localhost", 8000);
      
    }
}

module.exports = Room;