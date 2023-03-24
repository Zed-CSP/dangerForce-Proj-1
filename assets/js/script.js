// reference to the "search" button element
const searchBtn = document.getElementById('search-btn');
// container to put pollution data into
const pollutionEl = document.getElementById('pollution-container');
// container to put search history
const searchHistoryEl = document.getElementById('history');

const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
// Object to show at what value each component should map to each color
const aqiAttributes = {
    aqi: {
        green: 1,
        orange: 2,
        red: 3,
        purple: 4,
        brown: 5
    },
    co: {
        green: 4400,
        yellow: 9400,
        orange: 12400,
        red: 15400,
        purple: 30400,
        maroon: 40400,
        brown: 50400
    },
    no: {
        green: 53,
        yellow: 100,
        orange: 360,
        red: 649,
        purple: 1249,
        maroon: 1649,
        brown: 2049
    },
    no2: {
        green: 40,
        yellow: 80,
        orange: 180,
        red: 280,
        purple: 400,
        maroon: 800,
        brown: 1200
    },
    o3: {
        green: 54,
        yellow: 70,
        orange: 85,
        red: 105,
        purple: 200,
        maroon: 700,
        brown: 1200
    },
    so2: {
        green: 35,
        yellow: 75,
        orange: 185,
        red: 304,
        purple: 604,
        maroon: 1004,
        brown: 1404
    },
    pm2_5: {
        green: 12,
        yellow: 35.4,
        orange: 55.4,
        red: 150.4,
        purple: 250.4,
        maroon: 350.4,
        brown: 500.4
    },
    pm10: {
        green: 50,
        yellow: 150,
        orange: 250,
        red: 350,
        purple: 420,
        maroon: 500,
        brown: 600
    },
    nh3: {
        green: 200,
        yellow: 400,
        orange: 800,
        red: 1200,
        purple: 1800,
        maroon: 2400,
        brown: 3000
    }
};

// when the "search" button is clicked, call the function to obtain the latitude and longitude values for the selected city.
searchBtn.addEventListener('click', function(event) {
    // retrieve the input value that has been entered into the search field
    let searchInputVal = document.getElementById('search-input').value;

    if (!searchInputVal) {
        event.preventDefault();
        modalMessage('empty input value')
    } else {
        event.preventDefault();

        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInputVal}&limit=1&appid=64df37f68b0627d21253529450289fdb`)
        .then(response => response.json())
        .then(data => {
            if (data.length < 1) {
                console.log('data is undefined')
                modalMessage('wrong city name');
            } else {
                const lat = data[0].lat;
                const lon = data[0].lon;
    
                getPollution(lat, lon);
                saveSearchHistory(data[0].name, lat, lon);
            }
        });
    }    
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
            // call the function to set the colors
            const colors = setColors(aqiData)
            // call the function to display the pollution data
            displayPollution(colors);
            // call the function to display the gif
            getGiphy(aqiData.aqi);
        });
}

// function that stores search history in the local storage.
const saveSearchHistory = (cityName, lat, lon) => {
    // an object containing the current city search.
    let newSearchItem = {
        cityName: `${cityName}`,
        lat: lat,
        lon: lon,
    };

    // To limit the array of objects to a maximum of 10 items, an if-statement has been added to remove the last items until there are only 9 remaining. 
    // The new city is added to the beginning of the array using the unshift() method below, becoming the 10th and most recent item.
    if (searchHistory.length >= 10) {
        while (searchHistory.length > 9) {
            searchHistory.pop();
            console.log(searchHistory.length)
        }   
    }

    // an if-statement that verifies whether the current search city already exists in the localStorage and prevents it from being duplicated.
    if (searchHistory.length > 0) {
        for (let i = 0; i < searchHistory.length; i++) {
            if (searchHistory[i].lat == newSearchItem.lat) {
                return;
            }
        }
    };

    searchHistory.unshift(newSearchItem);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    createCityButton(newSearchItem.cityName);
    document.getElementById('search-input').value = ''; // erases the input field's contents.
<<<<<<< HEAD
}
=======
};
>>>>>>> ecfe00a15bcdec5a9148c09d10496361d44e55ce

// display the pollution data on the page
function displayPollution(colors) {
    pollutionEl.innerHTML = `
    <p class="${colors.aqi}">Air Quality Index (AQI): ${aqiData.aqi}</p>
    <p class="${colors.co}">Concentration of CO (carbon monoxide): ${aqiData.co} &#181;g/m<sup>3</sup></p>
    <p class="${colors.no}">Concentration of NO (nitrogen monoxide): ${aqiData.no} &#181;g/m<sup>3</sup></p>
    <p class="${colors.no2}">Concentration of NO<sub>2</sub> (nitrogen dioxide): ${aqiData.no2} &#181;g/m<sup>3</sup></p>
    <p class="${colors.o3}">Concentration of O<sub>3</sub> (ozone): ${aqiData.o3} &#181;g/m<sup>3</sup></p>
    <p class="${colors.so2}">Concentration of SO<sub>2</sub> (sulphur dioxide): ${aqiData.so2} &#181;g/m<sup>3</sup></p>
    <p class="${colors.pm2_5}">Concentration of PM<sub>2.5</sub> (fine particles matter): ${aqiData.pm2_5} &#181;g/m<sup>3</sup></p>
    <p class="${colors.pm10}">Concentration of PM<sub>10</sub> (coarse particulate matter): ${aqiData.pm10} &#181;g/m<sup>3</sup></p>
    <p class="${colors.nh3}">Concentration of NH<sub>3</sub> (ammonia): ${aqiData.nh3} &#181;g/m<sup>3</sup></p>
    `;
}

// Create a button for a city
function createCityButton(cityName) {
    const cityButton = document.createElement('button');
    cityButton.setAttribute('type', 'button');
    cityButton.setAttribute('class', 'history-btn');
    cityButton.textContent = cityName;
    searchHistoryEl.appendChild(cityButton);
}

// Display search history
function showHistory() {
    searchHistory.forEach((element) => createCityButton(element.cityName));
}

// Set the color of each component
function setColors() {
    const colors = {};

    // For each property in the aqiData object
    for (const property in aqiData) {
        const attributeObj = aqiAttributes[property];
        let color = '';

        // Compare the value for the component to the threshold values in attributeObj
        // Set color accordingly
        if (aqiData[property] <= attributeObj['green']) {
            color = 'green';
        } else if (aqiData[property] <= attributeObj['yellow']) {
            color = 'yellow';
        } else if (aqiData[property] <= attributeObj['orange']) {
            color = 'orange';
        } else if (aqiData[property] <= attributeObj['red']) {
            color = 'red';
        } else if (aqiData[property] <= attributeObj['purple']) {
            color = 'purple';
        } else if (aqiData[property] <= attributeObj['maroon']) {
            color = 'maroon';
        } else {
            color = 'brown';
        }
        // Add component and corresponding color to colors object
        colors[property] = color;
    }

    return colors;
}


// Display modal alert message
function modalMessage(problemType) {
    
    const modalContainer = document.createElement('dialog');
    modalContainer.setAttribute('id', 'modal-box');
    
    const emoji = document.createElement('img');
    emoji.setAttribute('id', 'modal-emoji');
    emoji.setAttribute('src', './assets/images/emoji-idk.png');
    emoji.setAttribute('alt', "I don't know emoji");
    
    const modalMessage = document.createElement('h3');

    if (problemType === 'wrong city name') {
        modalMessage.textContent = 'Sorry, we could not locate the requested city. Please ensure that you have entered the correct city name.'; 
    } else if (problemType === 'empty input value') {
        modalMessage.textContent = 'The input field must not be left empty. Please enter a city name.';    
    }
    
    const modalCloseBtn = document.createElement('button');
    modalCloseBtn.setAttribute('id', 'modal-close-btn');
    modalCloseBtn.textContent = 'dismiss';
    
    modalContainer.append(emoji, modalMessage, modalCloseBtn);
    document.querySelector('body').appendChild(modalContainer);
    
    modalContainer.showModal();

    // Hides modal alert on click "dismiss" button
    modalCloseBtn.addEventListener('click', function() {
      
        modalContainer.close()
    })
}

// The event listener captures the selected button and its city name text content, 
// and subsequently passes latitude and longitude values corresponding to the chosen city name to the getPollution().
searchHistoryEl.addEventListener('click', function (event) {

    const searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    
    let chosenButtonTextContent = event.target.textContent;

    if (event.target.getAttribute('class') !== 'history-btn') {
        return
    } else {
        console.log(chosenButtonTextContent);
    
        // the function determines the index of an object in the local storage 
        // by using the selected button and the text content of its associated city name.
        let cityIndex = searchHistory.findIndex(element => element.cityName === chosenButtonTextContent);

        let cityLat = searchHistory[cityIndex].lat;
        let cityLon = searchHistory[cityIndex].lon;
    
        getPollution(cityLat, cityLon);
    }
})

// On page load, show search history
showHistory();

// no changes. pull main