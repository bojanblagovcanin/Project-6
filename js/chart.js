
const ctx = document.getElementById('myChart');
const tempdata = document.getElementById('Status');
const fulldata = document.getElementById('printData');
var received = null;
//const jsonData = null;
var hoursData = [0, 1, 2, 3, 4, 5];

document.addEventListener('DOMContentLoaded', function() {
    
    //chartDraw();
    getData();
    //chartWeekDraw(hoursData);
});

function getData()
{
    // Use AJAX to fetch data from PHP endpoint
    const xmlhttpShow = new XMLHttpRequest();
    xmlhttpShow.open("GET", "../php/chartConnect.php?q=", true);
    xmlhttpShow.onreadystatechange = function () {
    if (xmlhttpShow.readyState === 4 && xmlhttpShow.status === 200) {
        tempdata.innerHTML = "Receiving Data";
        received = xmlhttpShow.responseText;
        console.log(received);
        
        var jsonData = JSON.parse(received);
        tempdata.innerHTML = "Received Data";

        console.log(jsonData);

        hoursData = jsonData.hour;
        floorsData = jsonData.floor;
        weeksData = jsonData.week;

        chartWeekDraw(hoursData);
        //console.log(jsondata);
    }
  };
  xmlhttpShow.send();
}

function chartWeekDraw(data)
{
    tempdata.innerHTML = "Replaced";
    //fulldata.innerHTML = "<p>first paragraph<p>";
    //var html = data[1];
    
    var html = '';
    console.log(data.length);
    for(var i = 1; i<data.length; i++)
    {
        html += '\n<p>' + data[i] + '<p><br>';
    }

    tempdata.innerHTML = "Data Encoded";
    fulldata.innerHTML = html;
}


function chartDraw()
{
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
}