
const ctx = document.getElementById('myChart');
const tempdata = document.getElementById('Status');
const fulldata = document.getElementById('printData');
var received = null;
var hoursData = null;
var floorsData = null;
var weeksData = null;

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

      var jsonData = JSON.parse(received);
      tempdata.innerHTML = "Received Data";

      //console.log(jsonData);


      //Data Received:
      hoursData = jsonData.hour;
      floorsData = jsonData.floor;
      weeksData = jsonData.week;


      var hourCnt = count(hoursData);
      console.log(hourCnt);
      


      chartDraw(hourCnt);
    }
  };
  xmlhttpShow.send();
}

function count(data)
{
  //var maxvalue = maxValue(data);

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

function chartDraw(dataX) {

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      datasets: [{
        label: '# Times Accessed',
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