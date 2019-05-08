
var json_data = (function () {
    var json_data = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'data/dashboard-data.json',
        'dataType': "json",
        'success': function (data) {
            json_data = data;
        }
    });
    return json_data;
})();


/* Last Updated Date */
document.getElementById('last_updated').innerHTML = json_data.last_update_date + " at " + json_data.last_update_time ;

/* Key Info Cards */
document.getElementById('key_totalCalls').innerHTML =  json_data.global_calls.total_calls;
document.getElementById('key_callsThisMonth').innerHTML =  (json_data.global_calls.total_calls - json_data.global_calls.monthly_calls_last);
document.getElementById('key_collectionsBooked').innerHTML = json_data.calls_by_type.total_this_month.call_collection_booked;
document.getElementById('key_failedCalls').innerHTML =  json_data.calls_by_type.total_this_month.call_failure;


/* Bar Chart showing calls this month by type */
var ctx = document.getElementById('myBarChart');
var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [
            'No Match',
            'Match Home',
            'Match Mob',
            'Match Alt',
            'Coll Booked',
            'Coll Not Booked',
            'Call Failure'
        ],
        datasets: [{
            label: 'Calls this Month',
            data: [
                json_data.calls_by_type.total_this_month.call_no_match,
                json_data.calls_by_type.total_this_month.call_match_home,
                json_data.calls_by_type.total_this_month.call_match_mob,
                json_data.calls_by_type.total_this_month.call_match_alt,
                json_data.calls_by_type.total_this_month.call_collection_booked,
                json_data.calls_by_type.total_this_month.call_collection_not_booked,
                json_data.calls_by_type.total_this_month.call_failure
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(45, 142, 42, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(45, 142, 42, 1)'
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


/* Doughnut Chart showing calls this month and last month by type */

var dc0 = document.getElementById('callsLastMonth_Doughnut');
var callsLastMonth_Doughnut = new Chart(dc0, {
    type: 'doughnut',
    data: {

        datasets: [{
            data: [
                json_data.calls_by_type.total_last_month.call_no_match,
                json_data.calls_by_type.total_last_month.call_match_home,
                json_data.calls_by_type.total_last_month.call_match_mob,
                json_data.calls_by_type.total_last_month.call_match_alt,
                json_data.calls_by_type.total_last_month.call_collection_booked,
                json_data.calls_by_type.total_last_month.call_collection_not_booked,
                json_data.calls_by_type.total_last_month.call_failure
            ],
            backgroundColor: [
                'red',
                'orange',
                'yellow',
                'green',
                'blue',
                'purple',
                'pink'

            ],
            label: 'Last Month'
        }
        ],
        labels: [
            'No Match',
            'Match - Home',
            'Match - Mob',
            'Match - Alt',
            'Coll Booked',
            'Coll Not Booked',
            'Failure'
        ]
    },
    options: {
        responsive: true,
        legend: {
            display: true,
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Doughnut Chart'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        },
        aspectRatio: 1
    }
});
var dc1 = document.getElementById('callsThisMonth_Doughnut');
var callsThisMonth_Doughnut = new Chart(dc1, {
    type: 'doughnut',
    data: {

        datasets: [{
            data: [
                json_data.calls_by_type.total_this_month.call_no_match,
                json_data.calls_by_type.total_this_month.call_match_home,
                json_data.calls_by_type.total_this_month.call_match_mob,
                json_data.calls_by_type.total_this_month.call_match_alt,
                json_data.calls_by_type.total_this_month.call_collection_booked,
                json_data.calls_by_type.total_this_month.call_collection_not_booked,
                json_data.calls_by_type.total_this_month.call_failure
            ],
            backgroundColor: [
                'red',
                'orange',
                'yellow',
                'green',
                'blue',
                'purple',
                'pink'

            ],
            label: 'This Month'
        }
        ],
        labels: [
            'No Match',
            'Match - Home',
            'Match - Mob',
            'Match - Alt',
            'Coll Booked',
            'Coll Not Booked',
            'Failure'
        ]
    },
    options: {
        responsive: true,
        legend: {
            display: true,
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Doughnut Chart'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        },
        aspectRatio: 1
    }
});

/* Line Chart showing overall calls last year */

var ctx2 = document.getElementById('myLineChart');
var myLineChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        datasets: [{
            label: 'This Year',
            backgroundColor: '#663399',
            borderColor: '#663399',
            data: [
                json_data.global_calls.calls_by_month.this_year.jan,
                json_data.global_calls.calls_by_month.this_year.feb,
                json_data.global_calls.calls_by_month.this_year.mar,
                json_data.global_calls.calls_by_month.this_year.apr,
                json_data.global_calls.calls_by_month.this_year.may,
                json_data.global_calls.calls_by_month.this_year.jun,
                json_data.global_calls.calls_by_month.this_year.jul,
                json_data.global_calls.calls_by_month.this_year.aug,
                json_data.global_calls.calls_by_month.this_year.sep,
                json_data.global_calls.calls_by_month.this_year.oct,
                json_data.global_calls.calls_by_month.this_year.nov,
                json_data.global_calls.calls_by_month.this_year.dec
            ],
            fill: false
        }, {
            label: 'Last Year',
            fill: false,
            backgroundColor: '#996633',
            borderColor: '#996633',
            data: [
                json_data.global_calls.calls_by_month.last_year.jan,
                json_data.global_calls.calls_by_month.last_year.feb,
                json_data.global_calls.calls_by_month.last_year.mar,
                json_data.global_calls.calls_by_month.last_year.apr,
                json_data.global_calls.calls_by_month.last_year.may,
                json_data.global_calls.calls_by_month.last_year.jun,
                json_data.global_calls.calls_by_month.last_year.jul,
                json_data.global_calls.calls_by_month.last_year.aug,
                json_data.global_calls.calls_by_month.last_year.sep,
                json_data.global_calls.calls_by_month.last_year.oct,
                json_data.global_calls.calls_by_month.last_year.nov,
                json_data.global_calls.calls_by_month.last_year.dec
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
            intersect: false
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
        },
        aspectRatio: 3
    }
});
