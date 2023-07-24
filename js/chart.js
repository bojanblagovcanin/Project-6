
const ctx = document.getElementById('myChart');
const tempdata = document.getElementById('Status');
const fulldata = document.getElementById('printData');
var received = null;
var hoursData = null;
var floorsData = null;
var weeksData = null;

var sortedhours =  null;

document.addEventListener('DOMContentLoaded', function () {
  getData();
  
});





function getData() {
  // Use AJAX to fetch data from PHP endpoint
  const xmlhttpShow = new XMLHttpRequest();
  xmlhttpShow.open("GET", "../php/chartConnect.php?q=", true);
  xmlhttpShow.onreadystatechange = function () {
    if (xmlhttpShow.readyState === 4 && xmlhttpShow.status === 200) {
      tempdata.innerHTML = "Receiving Data";
      received = xmlhttpShow.responseText;
      //console.log(received);

      var jsonData = JSON.parse(received);
      tempdata.innerHTML = "Received Data";

      //console.log(jsonData);

      hoursData = jsonData.hour;
      floorsData = jsonData.floor;
      weeksData = jsonData.week;
      console.log(count(floorsData));
      


      //chartDraw(weeksData, hoursData);
    }
  };
  xmlhttpShow.send();
}

function count(data)
{
  var maxvalue = 0;
  for(var i = 0; i<data.length; i++)
  {
      if(maxvalue < data[i])
      {
        maxvalue = data[i];
      }
  }

  var newArray = Array(maxvalue + 1).fill(0);
  for(var i = 0; i<data.length; i++)
  {
      newArray[data[i]]++;
  }
  return newArray;
}

/*
function chartWeekDraw(data)
{
    //tempdata.innerHTML = "Replaced";
    
    var html = '';
    console.log(data.length);
    for(var i = 1; i<data.length; i++)
    {
        html += '\n<p>' + data[i] + '<p><br>';
    }

    tempdata.innerHTML = "Data Encoded";
    fulldata.innerHTML = html;
}
*/

function chartDraw(dataX, dataY) {

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dataX,
      datasets: [{
        label: 'Hour Accessed',
        data: dataX,
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
/*
function chartDraw2()
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
}*/