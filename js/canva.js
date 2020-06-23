google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Month', 'USDT', 'BTC','ETH'],
        [new Date(2018, 3), 15.21, 14.91, 15.92],
        [new Date(2018, 4), 17.26, 13.71, 14.11],
        [new Date(2018, 5), 6.26, 5.95, 6.94],
        [new Date(2018, 6), 7.36, 7.58, 6.13],
        [new Date(2018, 7), 6.4, 5.2, 4.72],
        [new Date(2018, 8), 10.82, 7.86, 9.9],
        [new Date(2018, 9), 4.81, 3.07, 3.58],
        [new Date(2018, 10), 13.49, 13.35, 15.5],
        [new Date(2018,11), 7.9, 7.54, 14.49],
        [new Date(2019, 0), 3.65, 2.86,5.17],
        [new Date(2019, 1), 3.01, 1.99,4.2],
        [new Date(2019, 2),3.9, 2.36,4.3],
        [new Date(2019, 3),10.89,6.58,7.69],
        [new Date(2019, 4),29.22,8.37,11.44],
        [new Date(2019, 5),5.69,4.65,4.48],
        [new Date(2019, 6),2.31,2.67,2.56],
        [new Date(2019, 7),6.78,5.25,6.2],
        [new Date(2019, 8),7.0, 5.15, 9.05],
        [new Date(2019, 9),7.13,5.73,6.48],
        [new Date(2019, 10),3.78,4.74,5.48],
        [new Date(2019,11),3.41,3,2.75],
        [new Date(2020, 0),7.26, 4.25,5.17],
        [new Date(2020, 1),7.27, 2.6, 6.13],
        [new Date(2020, 2),5.11, 5.52, 7.88],
        [new Date(2020, 3),3.51, 5.19, 4.47],
        [new Date(2020, 4),3.3, 2.96, 7.81],

    ]);

    var options = {
        title: '2018 - 2019 - 2020',
        titleTextStyle: {
            color: '#542AC8',
        },
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}
google.charts.setOnLoadCallback(drawChart_2018);
function drawChart_2018() {
    var data = google.visualization.arrayToDataTable([
        ['Month', 'USDT', 'BTC','ETH'],
        [new Date(2018, 3), 15.21, 14.91, 15.92],
        [new Date(2018, 4), 17.26, 13.71, 14.11],
        [new Date(2018, 5), 6.26, 5.95, 6.94],
        [new Date(2018, 6), 7.36, 7.58, 6.13],
        [new Date(2018, 7), 6.4, 5.2, 4.72],
        [new Date(2018, 8), 10.82, 7.86, 9.9],
        [new Date(2018, 9), 4.81, 3.07, 3.58],
        [new Date(2018, 10), 13.49, 13.35, 15.5],
        [new Date(2018,11), 7.9, 7.54, 14.49]

    ]);

    var options = {
        title: '2018',
        titleTextStyle: {
            color: '#542AC8'
        },
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('chart_mob_2018'));
    chart.draw(data, options);
}
google.charts.setOnLoadCallback(drawChart_2019);
function drawChart_2019() {
    var data = google.visualization.arrayToDataTable([
        ['Month', 'USDT', 'BTC','ETH'],
        [new Date(2019, 0), 3.65, 2.86,5.17],
        [new Date(2019, 1), 3.01, 1.99,4.2],
        [new Date(2019, 2),3.9, 2.36,4.3],
        [new Date(2019, 3),10.89,6.58,7.69],
        [new Date(2019, 4),29.22,8.37,11.44],
        [new Date(2019, 5),5.69,4.65,4.48],
        [new Date(2019, 6),2.31,2.67,2.56],
        [new Date(2019, 7),6.78,5.25,6.2],
        [new Date(2019, 8),7.0, 5.15, 9.05],
        [new Date(2019, 9),7.13,5.73,6.48],
        [new Date(2019, 10),3.78,4.74,5.48],
        [new Date(2019,11),3.41,3,2.75]
    ]);
    var options = {
        title: '2019',
        titleTextStyle: {
            color: '#542AC8'
        },
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('chart_mob_2019'));
    chart.draw(data, options);
}
google.charts.setOnLoadCallback(drawChart_2020);
function drawChart_2020() {
    var data = google.visualization.arrayToDataTable([
        ['Month', 'USDT', 'BTC','ETH'],
        [new Date(2019, 0), 3.65, 2.86,5.17],
        [new Date(2019, 1), 3.01, 1.99,4.2],
        [new Date(2019, 2),3.9, 2.36,4.3],
        [new Date(2019, 3),10.89,6.58,7.69],
        [new Date(2019, 4),29.22,8.37,11.44],
        [new Date(2019, 5),5.69,4.65,4.48],
        [new Date(2019, 6),2.31,2.67,2.56],
        [new Date(2019, 7),6.78,5.25,6.2],
        [new Date(2019, 8),7.0, 5.15, 9.05],
        [new Date(2019, 9),7.13,5.73,6.48],
        [new Date(2019, 10),3.78,4.74,5.48],
        [new Date(2019,11),3.41,3,2.75]
    ]);
    var options = {
        title: '2020',
        titleTextStyle: {
            color: '#542AC8'
        },
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('chart_mob_2020'));
    chart.draw(data, options);
}