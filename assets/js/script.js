// reference to the "search" button element
const searchBtn = document.getElementById('search-btn');
// container to put pollution data into
const pollutionEl = document.getElementById('pollution-container');
// container to put search history
const searchHistoryEl = document.getElementById('history');
//  form element
const formEl = document.getElementById('search-form');
// section dom element
const aboutEl = document.getElementById('about-sneeze');
// reference to the 'clear local storage" button in the DOM
const clearBtn = document.getElementById('clear-local-storage');
// variable contains an array from local storage
let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');

// when the "search" button is clicked, call the function to obtain the latitude and longitude values for the selected city.
searchBtn.addEventListener('click', function(event) {
    // retrieve the input value that has been entered into the search field
    let searchInputVal = document.getElementById('search-input').value;

    if (!searchInputVal) {
        event.preventDefault();
        modalMessage('empty input value')
    } else {
        event.preventDefault();

        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInputVal}&limit=5&appid=64df37f68b0627d21253529450289fdb`)
        .then(response => response.json())
        .then(data => {
            if (data.length < 1) {
                console.log('data is undefined')
                modalMessage('wrong city name');
            } else if (data.length > 1) {
                modalMessage('multiple cities returned', data);
            } else {
                const lat = data[0].lat;
                const lon = data[0].lon;
                const name = data[0].name;
    
                getPollution(name, lat, lon);
            }
        });
    }   
});

// Call API to get pollution data and display it on the page
function getPollution(cityName, lat, lon) {
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
            // call the function to create and display history buttons
            saveSearchHistory(cityName, lat, lon);
        });
}

// function verifies whether the current search city already exists in the localStorage and moving it to the 0 index in the local storage.
const saveSearchHistory = (cityName, lat, lon) => {
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
                searchHistory.splice(i, 1);
            }
        }
    };

    // The new city is added to the beginning of the array using the unshift() method below, becoming the most recent item.
    searchHistory.unshift(newSearchItem);

    // To limit the array of objects to a maximum of 10 items, an if-statement has been added to remove the last items until there are only 10 remaining. 
    while (searchHistory.length > 10) {
        searchHistory.pop();
    }   
    
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    
    // to remove previously generated history buttons
    removeHistoryButtons();
    
    showHistory();
    
}

// The function clears all previously generated history buttons upon initiating a new city search in order to avoid the duplication of buttons.
function removeHistoryButtons() {
    let historyButtons = searchHistoryEl.getElementsByClassName('location-btn');

    while (historyButtons[0]) {
        historyButtons[0].parentNode.removeChild(historyButtons[0]);
    }
}

// display the pollution data on the page
function displayPollution(colors) {
    pollutionEl.innerHTML = `
    <p class="${colors.aqi}"><b>Air Quality Index (AQI):</b> ${aqiData.aqi}</p>
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
    cityButton.setAttribute('class', 'location-btn');
    cityButton.textContent = cityName;
    searchHistoryEl.insertBefore(cityButton, clearBtn);
}

// Display search history
function showHistory() {
    document.getElementById('search-input').value = ''; // erases the input field's contents.
    aboutEl.classList.add('hide');
    searchHistoryEl.classList.remove('hide');
    formEl.classList.remove('col-start-5', 'col-span-4', 'row-start-3');
    formEl.classList.add('col-start-2', 'col-span-3', 'row-start-2');
    pollutionEl.classList.remove('hide');
    searchHistory.forEach((element) => createCityButton(element.cityName));
    clearBtn.classList.remove('hide');
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
function modalMessage(problemType, returnedData) {
    
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
    } else if (problemType === 'multiple cities returned') {
        let htmlString = '';

        // Create button elements for each returned result
        for (let i = 0; i < returnedData.length; i++) {
            let currentResult = returnedData[i];
            if (currentResult.state) {
                htmlString += `<button id="${i}" class="location-btn">${currentResult.state}, ${currentResult.country}</button>`;
            } else {
                htmlString += `<button id="${i}" class="location-btn">${currentResult.country}</button>`;
            }
        }

        // Add explanatory text and button elements to modal message
        modalMessage.innerHTML = `
            <p>Your search returned multiple results. Please choose your desired city:</p>
            <form class="form" method="dialog" id="mult-results">
                ${htmlString}
            </form>
        `
    }
    
    const modalCloseBtn = document.createElement('button');
    modalCloseBtn.setAttribute('id', 'modal-close-btn');
    modalCloseBtn.textContent = 'dismiss';

    modalContainer.append(emoji, modalMessage, modalCloseBtn);
    document.querySelector('body').appendChild(modalContainer);
    
    modalContainer.showModal();

    // Hides modal alert on click "dismiss" button
    modalCloseBtn.addEventListener('click', function() {      
        modalContainer.remove();
    })

    // When multiple cities returned, run search based on city selected in modal message
    if (problemType === 'multiple cities returned') {
        const resultsForm = document.getElementById('mult-results');
        resultsForm.addEventListener('click', function (event) {
            const clickedEl = event.target;
            if (clickedEl.matches('button')) {
                const index = clickedEl.getAttribute('id');
                const clarifiedResult = returnedData[index];
                getPollution(clarifiedResult.name, clarifiedResult.lat, clarifiedResult.lon);
                modalContainer.remove();
            }
        })
    }
}

// The event listener captures the selected button and its city name text content, 
// and subsequently passes latitude and longitude values corresponding to the chosen city name to the getPollution().
searchHistoryEl.addEventListener('click', function (event) {

    const searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    
    let chosenButtonTextContent = event.target.textContent;

    if (event.target.getAttribute('class') !== 'location-btn') {
        return
    } else {
        console.log(chosenButtonTextContent);
    
        // the function determines the index of an object in the local storage 
        // by using the selected button and the text content of its associated city name.
        let cityIndex = searchHistory.findIndex(element => element.cityName === chosenButtonTextContent);

        let cityLat = searchHistory[cityIndex].lat;
        let cityLon = searchHistory[cityIndex].lon;
    
        getPollution(chosenButtonTextContent, cityLat, cityLon);
    }
})

clearBtn.addEventListener('click', function() {
    removeHistoryButtons();
    clearBtn.classList.add('hide');
    localStorage.clear();
    searchHistory = [];
})