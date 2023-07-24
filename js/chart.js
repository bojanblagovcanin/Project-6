
const ctx = document.getElementById('hourlyFrequencyChartDescription');
const sun = document.getElementById('sundayChart');
const mon = document.getElementById('mondayChart');
const chew = document.getElementById('chewsdayChart');
const wed = document.getElementById('wednesdayChart');
const thur = document.getElementById('thursdayChart');
const fry = document.getElementById('fridayChart');
const sat = document.getElementById('saturdayChart');

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

      var sunCnt = count()
      


      chartDraw(hourCnt, ctx);
      chartDraw(hourCnt, sun);
      chartDraw(hourCnt, mon);
      chartDraw(hourCnt, chew);
      chartDraw(hourCnt, wed);
      chartDraw(hourCnt, thur);
      chartDraw(hourCnt, fry);
      chartDraw(hourCnt, sat);

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


//Draw selmans stupid little graphs
function chartDraw(dataX, chartWhich) {

  new Chart(chartWhich, {
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

