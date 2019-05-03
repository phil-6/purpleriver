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