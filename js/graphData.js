"use strict";

let fbInteraction = require("./interaction");


let userProgressObj = fbInteraction.retrieveUserProgress();
console.log('userProgressObj',userProgressObj);
console.log('userProgressObj.responseJSON',userProgressObj.responseText);

function graphTest() {

    document.getElementById("myChart").classList.remove('hide');
    console.log("should remove hide?");
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: ["", "", "", "", "", "", ""],
            datasets: [{
                label: "",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'black',
                data: [20, 30, 15],
            }]
        },
    
        // Configuration options go here
        options: {}
    });



    new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
          labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
          datasets: [{ 
              data: [86,114,106,106,107,111,133,221,783,2478],
              label: "Africa",
              borderColor: "black",
              fill: false
            }, { 
              data: [282,350,411,502,635,809,947,1402,3700,5267],
              label: "Asia",
              borderColor: "#8e5ea2",
              fill: false
            }, { 
              data: [168,170,178,190,203,276,408,547,675,734],
              label: "Europe",
              borderColor: "#3cba9f",
              fill: false
            }, { 
              data: [40,20,10,16,24,38,74,167,508,784],
              label: "Latin America",
              borderColor: "#e8c3b9",
              fill: false
            }, { 
              data: [6,3,2,2,7,26,82,172,312,433],
              label: "North America",
              borderColor: "#c45850",
              fill: false
            }
          ]
        },
        options: {
          title: {
            display: false,
            text: 'World population per region (in millions)'
          }
        }
      });







}

module.exports = {graphTest};