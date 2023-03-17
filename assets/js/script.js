// reference to the "search" button element
const searchBtn = document.getElementById('search-btn');
// retrieve the input value that has been entered into the search field
const searchInputVal = document.getElementById('search-input').value;

// when the "search" button is clicked, call the function to obtain the latitude and longitude values for the selected city.
searchBtn.getEventListener('click', function(event) {
    event.preventDefault()

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInputVal}&limit=1&appid=64df37f68b0627d21253529450289fdb`)
        .then(response => response.json())
        .then(data => {
            const lat = data[0].lat;
            const lon = data[0].lon;

            getPollution(lat, lon);
        })
})