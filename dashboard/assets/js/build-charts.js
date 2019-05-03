
var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'data/dashboard-data.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

document.getElementById('testdata').innerHTML = json.monthly_calls_last ;

var ctx = document.getElementById('chartOne');
var chartOne = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Calls this Month',
            data: [
                json.call_no_match_this_month,
                json.call_match_home_this_month,
                json.call_match_mobile_this_month,
                json.call_match_alt_this_month,
                json.call_collection_booked_this_month,
                json.call_collection_not_booked_this_month
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

var ctx1 = document.getElementById('myDoughnutChart');

var myDoughnutChart = new Chart(ctx1, {
    type: 'doughnut',
    data: {

        datasets: [{
            data: [
                json.call_no_match_this_month,
                json.call_match_home_this_month,
                json.call_match_mobile_this_month,
                json.call_match_alt_this_month,
                json.call_collection_booked_this_month,
                json.call_collection_not_booked_this_month
            ],
            backgroundColor: [
                'red',
                'orange',
                'yellow',
                'green',
                'blue'
            ],
            label: [
                'No Match',
                'Match - Home',
                'Match - Mob',
                'Match - Alt',
                'Collection Booked',
                'Collection Not Booked'
            ]
        }]
    },
    options: {
        responsive: true,
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: ' Doughnut Chart'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
});

var ctx2 = document.getElementById('myLineChart');

var myLineChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: [
            'No Match',
            'Match - Home',
            'Match - Mob',
            'Match - Alt',
            'Collection Booked',
            'Collection Not Booked'
        ],
        datasets: [{
            label: 'This Month',
            backgroundColor: '#663399',
            borderColor: '#663399',
            data: [
                json.call_no_match_this_month,
                json.call_match_home_this_month,
                json.call_match_mobile_this_month,
                json.call_match_alt_this_month,
                json.call_collection_booked_this_month,
                json.call_collection_not_booked_this_month
            ],
            fill: false
        }, {
            label: 'Last Month',
            fill: false,
            backgroundColor: '#996633',
            borderColor: '#996633',
            data: [
                json.call_no_match_last_month,
                json.call_match_home_last_month,
                json.call_match_mobile_last_month,
                json.call_match_alt_last_month,
                json.call_collection_booked_last_month,
                json.call_collection_not_booked_last_month
            ]
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart Title'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    }
});
