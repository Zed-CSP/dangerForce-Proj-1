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

    // Randomly select gif from array for AQI
    const gifIndex = Math.floor(Math.random() * gifsByAqi[aqi].length);
    const gifUrl = gifsByAqi[aqi][gifIndex];

    // Create and append img element to display gif
    const gifEl = document.createElement('img');
    gifEl.setAttribute('src', `https://media.giphy.com/media/${gifUrl}/giphy.gif`);
    pollutionEl.appendChild(gifEl);
}