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

// Display gif based on AQI value
function getGiphy(aqi) {
    // Create object of gif options for each AQI value
    const gifsByAqi = {
        1: [
            'iGA603zv8GB2SSm1Nv',
            '33F5USzk3gJdZTinpS',
            'jI77q8Mc5yOs5wncJe',
            'gKm89M79WdYIpAu1p4',
            'SXNYHKbbOeFHSGPpWk'
        ],
        2: [
            'Oso0tmquige1G',
            'xnip8rDyfZrY4',
            '3o85xLDTbwIu9RAm4w',
            '6tqjFDQK0aaTm',
            'xUPGcrueSdWkLoKfU4',
            'mBdpsmfbx3SxuMPyCF'
        ],
        3: [
            '3ov9kaSYVI7fPC47Ac',
            'gNqPZGiwsZs9a',
            'U51F2HUQWODxwsav2J',
            '2lzhUOZsRY86Y',
            'UtxwEhibdd5ss',
            'Q7jvImsNUcdzuGRtLd',
            '4qe2XbmQ5aZTW'
        ],
        4: [
            'dyjUtt00BiVYEXfyZ2',
            '4qe2XbmQ5aZTW',
            'xUA7b6sGSBjVd6GgaA',
            'G6Gl9Wef6yHOBe7j4y',
            'fA1R80Jx8JUZk7YpoV',
            'aohvgsGTzqqYg'
        ],
        5: [
            'ParB9cchTcLyQDEhb2',
            'l3q2sptbpeDn3LMQg',
            'xTk9ZP6AM0EKyQwqNW',
            'l3vRcvZfaZhqR4XPa',
            'l2JehsPxGvhrsRuBq'
        ]
    }

    const pollutionData = {
        data:   {
            aqi: { name: 'Air Quality Index (AQI)', value: null },
            co: { name: 'Concentration of CO (carbon monoxide)', value: null },
            no: { name: 'Concentration of NO (nitrogen monoxide)', value: null },
            no2: { name: 'Concentration of NO2 (nitrogen dioxide)', value: null },
            o3: { name: 'Concentration of O3 (ozone)', value: null },
            so2: { name: 'Concentration of SO2 (sulphur dioxide)', value: null },
            pm2_5: { name: 'Concentration of PM2.5 (fine particles matter)', value: null },
            pm10: { name: 'Concentration of PM10 (coarse particulate matter)', value: null },
            nh3: { name: 'Concentration of NH3 (ammonia)', value: null },
        },
        update: function(aqiData) {
            console.log("update")
            for (const key in pollutionData.data) {
                if (pollutionData.data.hasOwnProperty(key) && aqiData.hasOwnProperty(key)) {
                    pollutionData.data[key].value = aqiData[key];
                }
            }
        }    
    };

    // Randomly select gif from array for AQI
    const gifIndex = Math.floor(Math.random() * gifsByAqi[aqi].length);
    const gifUrl = gifsByAqi[aqi][gifIndex];

    // Create and append img element to display gif
    const gifEl = document.createElement('img');
    gifEl.setAttribute('src', `https://media.giphy.com/media/${gifUrl}/giphy.gif`);
    gifEl.setAttribute('alt', 'Giphy');
    gifEl.setAttribute('class', 'giphy');
    pollutionEl.prepend(gifEl);
}