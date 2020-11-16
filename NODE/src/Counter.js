const firebase = require('firebase');

class Counter{
    constructor(){

    }

    removeQ = ()=>{
        firebase.database().ref("Data/Q/").limitToFirst(1).on('value', function(snapshot){
            console.log("testFIREBASE");
            console.log(snapshot.val());
            if(snapshot.val()===null){
                    console.log("isNUll");
            }else{
                console.log("notNUll");
                let myVar = setTimeout(function(){ 
                    // console.log("Hello"+Object.keys(snapshot.val()))
                    firebase.database().ref("Data/Q/"+Object.keys(snapshot.val())).remove(); 
                    console.log("DELETE Q");
                }, 120000);
                
            }
        });
    }
}

module.exports = Counter;