// reference to the "search" button element
const searchBtn = document.getElementById('search-btn');
// container to put pollution data into
const pollutionEl = document.getElementById('pollution-container');

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
            saveSearchHistory(searchInputVal, lat, lon);
        });
});

// Call API to get pollution data and display it on the page
function getPollution(lat, lon) {
    const requestUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=64df37f68b0627d21253529450289fdb`;

    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            pollutionEl.innerHTML = `
                <p>Air Quality Index (AQI): ${data.list[0].main.aqi}</p>
                <p>Concentration of CO (carbon monoxide): ${data.list[0].components.co} &#181;g/m<sup>3</sup></p>
                <p>Concentration of NO (nitrogen monoxide): ${data.list[0].components.no} &#181;g/m<sup>3</sup></p>
                <p>Concentration of NO<sub>2</sub> (nitrogen dioxide): ${data.list[0].components.no2} &#181;g/m<sup>3</sup></p>
                <p>Concentration of O<sub>3</sub> (ozone): ${data.list[0].components.o3} &#181;g/m<sup>3</sup></p>
                <p>Concentration of SO<sub>2</sub> (sulphur dioxide): ${data.list[0].components.so2} &#181;g/m<sup>3</sup></p>
                <p>Concentration of PM<sub>2.5</sub> (fine particles matter): ${data.list[0].components.pm2_5} &#181;g/m<sup>3</sup></p>
                <p>Concentration of PM<sub>10</sub> (coarse particulate matter): ${data.list[0].components.pm10} &#181;g/m<sup>3</sup></p>
                <p>Concentration of NH<sub>3</sub> (ammonia): ${data.list[0].components.nh3} &#181;g/m<sup>3</sup></p>
                `;
        });
}

// function that stores search history in the local storage.
const saveSearchHistory = (cityName, lat, lon) => {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');

    // an object containing the current city search.
    let newSearchItem = {
        cityName: cityName,
        lat: lat,
        lon: lon,
    };

    // an if-statement that verifies whether the current search city already exists in the localStorage and prevents it from being duplicated.
    if (searchHistory.length > 0) {
        for (let i = 0; i < searchHistory.length; i++) {
            if (searchHistory[i].lat == newSearchItem.lat) {
                return;
            }
        }
    };

    searchHistory.push(newSearchItem);

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}