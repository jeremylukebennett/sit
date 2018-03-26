"use strict";

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
                data: [0, 10, 5, 2, 20, 30, 15],
            }]
        },
    
        // Configuration options go here
        options: {}
    });
}

module.exports = {graphTest};