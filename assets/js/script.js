// reference to the "search" button element
const searchBtn = document.getElementById('search-btn');
// container to put pollution data into
const pollutionEl = document.getElementById('pollution-container');

var aqiData = {};

// when the "search" button is clicked, call the function to obtain the latitude and longitude values for the selected city.
searchBtn.addEventListener('click', function(event) {
    // retrieve the input value that has been entered into the search field
    let searchInputVal = document.getElementById('search-input').value;

    event.preventDefault();

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInputVal}&limit=1&appid=64df37f68b0627d21253529450289fdb`)
        .then(response => response.json())
        .then(data => {
            const lat = data[0].lat;
            const lon = data[0].lon;

            getPollution(lat, lon);
        });
});

// Call API to get pollution data and display it on the page
function getPollution(lat, lon) {
    const requestUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=64df37f68b0627d21253529450289fdb`;

    fetch(requestUrl)
        .then(response => response.json())
        //create then to create an object to hold the data
        .then(data => aqiData = {
            aqi: data.list[0].main.aqi,
            co: data.list[0].components.co,
            no: data.list[0].components.no,
            no2: data.list[0].components.no2,
            o3: data.list[0].components.o3,
            so2: data.list[0].components.so2,
            pm2_5: data.list[0].components.pm2_5,
            pm10: data.list[0].components.pm10,
            nh3: data.list[0].components.nh3,
        })
        .then(() => {
            // call the function to display the pollution data
            displayPollution(aqiData);
        }
        );
        
}

// Aqi color function
function aqiColor(aqiData) {
    if (aqiData.aqi <= .50) {
        return 'green';
    } else if (aqi <= 1.00) {
        return 'yellow';
    } else if (aqi <= 1.50) {
        return 'orange';
    } else if (aqi <= 2.00) {
        return 'red';
    } else if (aqi <= 3.00) {
        return 'purple';
    } else if (aqi <= 4.00) {
        return 'maroon';
    } else if (aqi <= 5.00) {
        return 'brown';
    }
}
// display the pollution data on the page

function displayPollution(aqiData) {
    pollutionEl.innerHTML = `
    <p>Air Quality Index (AQI): ${aqiData.aqi}</p>
    <p>Concentration of CO (carbon monoxide): ${aqiData.co} &#181;g/m<sup>3</sup></p>
    <p>Concentration of NO (nitrogen monoxide): ${aqiData.no} &#181;g/m<sup>3</sup></p>
    <p>Concentration of NO<sub>2</sub> (nitrogen dioxide): ${aqiData.no2} &#181;g/m<sup>3</sup></p>
    <p>Concentration of O<sub>3</sub> (ozone): ${aqiData.o3} &#181;g/m<sup>3</sup></p>
    <p>Concentration of SO<sub>2</sub> (sulphur dioxide): ${aqiData.so2} &#181;g/m<sup>3</sup></p>
    <p>Concentration of PM<sub>2.5</sub> (fine particles matter): ${aqiData.pm2_5} &#181;g/m<sup>3</sup></p>
    <p>Concentration of PM<sub>10</sub> (coarse particulate matter): ${aqiData.pm10} &#181;g/m<sup>3</sup></p>
    <p>Concentration of NH<sub>3</sub> (ammonia): ${aqiData.nh3} &#181;g/m<sup>3</sup></p>
    `;
}

