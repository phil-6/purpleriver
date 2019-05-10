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

var days_in_month = 30;

/* Last Updated Date */
document.getElementById('last_updated').innerHTML = json_data.last_update_date + " at " + json_data.last_update_time;

/* Key Info Cards */
document.getElementById('key_totalCalls').innerHTML = json_data.global_calls.total_calls;
document.getElementById('key_callsThisMonth').innerHTML = json_data.global_calls.monthly_calls_current;
document.getElementById('key_collectionsBooked').innerHTML = json_data.calls_by_type.total_this_month.call_collection_booked;
document.getElementById('key_droppedCalls').innerHTML = json_data.calls_by_type.total_this_month.call_failure;

var key_change_callsThisMonth = Math.round(json_data.global_calls.monthly_calls_current - ((json_data.global_calls.monthly_calls_last/days_in_month)*(json_data.last_update_date.substring(0, 2))));
var key_change_collectionsBooked = Math.round(json_data.calls_by_type.total_this_month.call_collection_booked - ((json_data.calls_by_type.total_last_month.call_collection_booked/days_in_month)*(json_data.last_update_date.substring(0, 2))));
var key_change_droppedCalls = Math.round(json_data.calls_by_type.total_this_month.call_failure - ((json_data.calls_by_type.total_last_month.call_failure/days_in_month)*(json_data.last_update_date.substring(0, 2))));
document.getElementById('key_change_callsThisMonth').innerHTML = key_change_callsThisMonth;
document.getElementById('key_change_collectionsBooked').innerHTML = key_change_collectionsBooked;
document.getElementById('key_change_droppedCalls').innerHTML = key_change_droppedCalls;

if (key_change_callsThisMonth > 0) {
    document.getElementById('key_symbol_callsThisMonth').innerHTML = '<i class="fas fa-2x fa-sort-up"></i>';
} else if (key_change_callsThisMonth < 0) {
    document.getElementById('key_symbol_callsThisMonth').innerHTML = '<i class="fas fa-2x fa-sort-down"></i>';
} else {
    document.getElementById('key_symbol_callsThisMonth').innerHTML = '<i class="fas fa-1x fa-equals"></i>';
}
if (key_change_collectionsBooked > 0) {
    document.getElementById('key_symbol_collectionsBooked').innerHTML = '<i class="fas fa-2x fa-sort-up"></i>';
} else if (key_change_collectionsBooked < 0) {
    document.getElementById('key_symbol_collectionsBooked').innerHTML = '<i class="fas fa-2x fa-sort-down"></i>';
} else {
    document.getElementById('key_symbol_collectionsBooked').innerHTML = '<i class="fas fa-1x fa-equals"></i>';
}
if (key_change_droppedCalls > 0) {
    document.getElementById('key_symbol_droppedCalls').innerHTML = '<i class="fas fa-2x fa-sort-up"></i>';
} else if (key_change_droppedCalls < 0) {
    document.getElementById('key_symbol_droppedCalls').innerHTML = '<i class="fas fa-2x fa-sort-down"></i>';
} else {
    document.getElementById('key_symbol_droppedCalls').innerHTML = '<i class="fas fa-1x fa-equals"></i>';
}

/* Extra Info Cards */
var extra_matchedCalls = (json_data.calls_by_type.total_to_date.call_match_home + json_data.calls_by_type.total_to_date.call_match_mob + json_data.calls_by_type.total_to_date.call_match_alt);
var extra_notMatchedCalls = (json_data.calls_by_type.total_to_date.call_no_match);
var extra_bookings = (json_data.calls_by_type.total_to_date.call_collection_booked);
var extra_notBooked = (json_data.calls_by_type.total_to_date.call_collection_not_booked);
var extra_dropped = (json_data.calls_by_type.total_to_date.call_failure);
document.getElementById('extra_matchedCalls').innerHTML = extra_matchedCalls;
document.getElementById('extra_notMatchedCalls').innerHTML = extra_notMatchedCalls;
document.getElementById('extra_bookings').innerHTML = extra_bookings;
document.getElementById('extra_notBooked').innerHTML = extra_notBooked;
document.getElementById('extra_dropped').innerHTML = extra_dropped;



/* Bar Chart - Call Matches */
var ctx_bc0 = document.getElementById('barChartCallMatches').getContext('2d');
var lastMonthGradient_bc0 = ctx_bc0.createLinearGradient(150.000, 0.000, 150.000, 300.000);
lastMonthGradient_bc0.addColorStop(0.000, '#ffdb6fe6');
lastMonthGradient_bc0.addColorStop(1.000, '#f69259e6');
var thisMonthGradient_bc0 = ctx_bc0.createLinearGradient(150.000, 0.000, 150.000, 300.000);
thisMonthGradient_bc0.addColorStop(0.000, '#8176b5e6');
thisMonthGradient_bc0.addColorStop(1.000, '#76c4e2e6');
var barChartCallMatches = new Chart(ctx_bc0, {
    type: 'bar',
    data: {
        labels: [
            'No Match',
            'Match Home',
            'Match Mob',
            'Match Alt'
        ],
        datasets: [
            {
                label: 'Last Month',
                borderWidth: 1,
                backgroundColor: lastMonthGradient_bc0,
                borderColor: lastMonthGradient_bc0,
                data: [
                    json_data.calls_by_type.total_last_month.call_no_match,
                    json_data.calls_by_type.total_last_month.call_match_home,
                    json_data.calls_by_type.total_last_month.call_match_mob,
                    json_data.calls_by_type.total_last_month.call_match_alt
                ]
            },
            {
                label: 'This Month',
                borderWidth: 1,
                backgroundColor: thisMonthGradient_bc0,
                borderColor: thisMonthGradient_bc0,
                data: [
                    json_data.calls_by_type.total_this_month.call_no_match,
                    json_data.calls_by_type.total_this_month.call_match_home,
                    json_data.calls_by_type.total_this_month.call_match_mob,
                    json_data.calls_by_type.total_this_month.call_match_alt
                ]
            }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true,
            text: 'Call Matches'
        }
    }
});

/* Bar Chart - Call Outcomes */
var ctx_bc1 = document.getElementById('barChartCallOutcomes').getContext('2d');
var lastMonthGradient_bc1 = ctx_bc1.createLinearGradient(150.000, 0.000, 150.000, 300.000);
lastMonthGradient_bc1.addColorStop(0.000, '#ffdb6fe6');
lastMonthGradient_bc1.addColorStop(1.000, '#f69259e6');
var thisMonthGradient_bc1 = ctx_bc1.createLinearGradient(150.000, 0.000, 150.000, 300.000);
thisMonthGradient_bc1.addColorStop(0.000, '#8176b5e6');
thisMonthGradient_bc1.addColorStop(1.000, '#76c4e2e6');
var barChartCallOutcomes = new Chart(ctx_bc1, {
    type: 'bar',
    data: {
        labels: [
            'Collection Booked',
            'Collection Not Booked',
            'Dropped Calls'
        ],
        datasets: [
            {
                label: 'Last Month',
                borderWidth: 1,
                backgroundColor: lastMonthGradient_bc1,
                borderColor: lastMonthGradient_bc1,
                data: [
                    json_data.calls_by_type.total_last_month.call_collection_booked,
                    json_data.calls_by_type.total_last_month.call_collection_not_booked,
                    json_data.calls_by_type.total_last_month.call_failure
                ]
            },
            {
                label: 'This Month',
                borderWidth: 1,
                backgroundColor: thisMonthGradient_bc1,
                borderColor: thisMonthGradient_bc1,
                data: [
                    json_data.calls_by_type.total_this_month.call_collection_booked,
                    json_data.calls_by_type.total_this_month.call_collection_not_booked,
                    json_data.calls_by_type.total_this_month.call_failure
                ]
            }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true,
            text: 'Call Outcomes'
        }
    }
});

/* Line Chart showing overall calls last year */
var ctx_lc0 = document.getElementById('lineChartAnnualCalls').getContext('2d');
var matchedCallsGradient_lc0 = ctx_lc0.createLinearGradient(0.000, 50.000, 300.000, 250.000);
matchedCallsGradient_lc0.addColorStop(0.000, '#92fe9de6');
matchedCallsGradient_lc0.addColorStop(1.000, '#00c9ffe6');
var notMatchedGradient_lc0 = ctx_lc0.createLinearGradient(150.000, 0.000, 150.000, 300.000);
notMatchedGradient_lc0.addColorStop(0.000, '#fc6076e6');
notMatchedGradient_lc0.addColorStop(1.000, '#ff9a44e6');
var lineChartAnnualCalls = new Chart(ctx_lc0, {
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
            label: 'Matched Calls',
            fill: 'start',
            backgroundColor: matchedCallsGradient_lc0,
            borderColor: '#00c9ff',
            data: [
                json_data.global_calls.calls_by_month.call_match.jan,
                json_data.global_calls.calls_by_month.call_match.feb,
                json_data.global_calls.calls_by_month.call_match.mar,
                json_data.global_calls.calls_by_month.call_match.apr,
                json_data.global_calls.calls_by_month.call_match.may,
                json_data.global_calls.calls_by_month.call_match.jun,
                json_data.global_calls.calls_by_month.call_match.jul,
                json_data.global_calls.calls_by_month.call_match.aug,
                json_data.global_calls.calls_by_month.call_match.sep,
                json_data.global_calls.calls_by_month.call_match.oct,
                json_data.global_calls.calls_by_month.call_match.nov,
                json_data.global_calls.calls_by_month.call_match.dec
            ]
        }, {
            label: 'Not Matched Calls',
            fill: '-1',
            backgroundColor: notMatchedGradient_lc0,
            borderColor: '#ff9a44',
            data: [
                json_data.global_calls.calls_by_month.total_calls.jan,
                json_data.global_calls.calls_by_month.total_calls.feb,
                json_data.global_calls.calls_by_month.total_calls.mar,
                json_data.global_calls.calls_by_month.total_calls.apr,
                json_data.global_calls.calls_by_month.total_calls.may,
                json_data.global_calls.calls_by_month.total_calls.jun,
                json_data.global_calls.calls_by_month.total_calls.jul,
                json_data.global_calls.calls_by_month.total_calls.aug,
                json_data.global_calls.calls_by_month.total_calls.sep,
                json_data.global_calls.calls_by_month.total_calls.oct,
                json_data.global_calls.calls_by_month.total_calls.nov,
                json_data.global_calls.calls_by_month.total_calls.dec
            ]
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Calls Per Month'
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


/* Doughnut Chart split of call matches */

var ctx_dc0 = document.getElementById('callMatches_Doughnut').getContext('2d');
var callMatchesGradient_dc0 = ctx_dc0.createLinearGradient(0.000, 50.000, 300.000, 250.000);
callMatchesGradient_dc0.addColorStop(0.000, '#92fe9de6');
callMatchesGradient_dc0.addColorStop(1.000, '#00c9ffe6');
var notMatchedGradient_dc0 = ctx_dc0.createLinearGradient(150.000, 0.000, 150.000, 300.000);
notMatchedGradient_dc0.addColorStop(0.000, '#fc6076e6');
notMatchedGradient_dc0.addColorStop(1.000, '#ff9a44e6');
var callMatches_Doughnut = new Chart(ctx_dc0, {
    type: 'doughnut',
    data: {

        datasets: [{
            data: [
                extra_matchedCalls,
                extra_notMatchedCalls
            ],
            backgroundColor: [
                callMatchesGradient_dc0,
                notMatchedGradient_dc0
            ]
        }
        ],
        labels: [
            'Match',
            'No Match'
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
            text: 'Call Matches'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        },
        aspectRatio: 1
    }
});

/* Doughnut Chart split of bookings*/

var ctx_dc1 = document.getElementById('callBookings_Doughnut').getContext('2d');
var bookingsGradient_dc1 = ctx_dc1.createLinearGradient(0.000, 50.000, 300.000, 250.000);
bookingsGradient_dc1.addColorStop(0.000, '#92fe9de6');
bookingsGradient_dc1.addColorStop(1.000, '#00c9ffe6');
var notBookedGradient_dc1 = ctx_dc1.createLinearGradient(150.000, 0.000, 150.000, 300.000);
notBookedGradient_dc1.addColorStop(0.000, '#76c4e2e6');
notBookedGradient_dc1.addColorStop(1.000, '#8176b5e6');
var droppedGradient_dc1 = ctx_dc1.createLinearGradient(150.000, 0.000, 150.000, 300.000);
droppedGradient_dc1.addColorStop(0.000, '#ff9a44e6');
droppedGradient_dc1.addColorStop(1.000, '#fc6076e6');
var callBookings_Doughnut = new Chart(ctx_dc1, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [
                extra_bookings,
                extra_notBooked,
                extra_dropped
            ],
            backgroundColor: [
                bookingsGradient_dc1,
                notBookedGradient_dc1,
                droppedGradient_dc1
            ]
        }
        ],
        labels: [
            'Coll Booked',
            'Coll Not Booked',
            'Dropped Calls'
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
            text: 'Bookings'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        },
        aspectRatio: 1
    }
});



