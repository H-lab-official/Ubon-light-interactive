const firebase = require('firebase');
const osc = require("osc"),
    http = require("http"),
    WebSocket = require("ws");
    const fs = require('fs');
class Controller{
    constructor(){
        this.movement = 0;
        this.speed = 0;
    }



    getDataMovement(osc){
        firebase.database().ref(`Data/Movement/`).on('value',(dataSnapshot)=> {
            
            this.movement = dataSnapshot.val().Status;
            this.sendDataMovmentToResulume(osc, dataSnapshot.val().Status);
            console.log("nowMovement = "+dataSnapshot.val().Status);
            
            const getmovement=()=>{
                return this.movement;
            }

            // change state from still to blink if no user in 10 sec
            if(getmovement()==11){
                console.log("movement1 ="+ getmovement());
                let dfdgdf = setInterval(function(){
                   if(getmovement()==11){
                    console.log("movement2 ="+ getmovement());
                        // console.log("interval in 10");
                        firebase.database().ref(`Data/Movement/`).set({
                            "Status" : 12
                        })
                        clearInterval(dfdgdf);
                   }
                }, 20000);
            }
                




        })
    }

    getDataSpeed(osc){
        firebase.database().ref(`Data/Speed/`).on('value',(dataSnapshot)=> {
            const valuespeed = dataSnapshot.val().Status/10;
            firebase.database().ref(`Data/Movement/`).once('value',(dataSnapshot)=> {
                let rawdata = fs.readFileSync("./src/controller.json");
                let pathspeed = JSON.parse(rawdata);
                // console.log("valuespeed = "+valuespeed);
                    this.sendDataSpeedToResulume(osc, valuespeed, pathspeed[dataSnapshot.val().Status]);       
            })
        })
    }

    sendDataMovmentToResulume(osc, value)
    {
        osc.send({
            address: `/composition/layers/25/clips/${value}/connect`,
            args: [
                {
                    type: "i",
                    value: 1,
                   
                }
            ],
        }, "localhost", 8000);
      
    }

    sendDataSpeedToResulume(osc, value, path)
    {
        osc.send({
            address: `${path}`,
            args: [
                {
                    type: "f",
                    value: value,
                   
                }
            ],
        }, "localhost", 8000);
    }
}

module.exports = Controller;