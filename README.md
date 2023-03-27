# Sneeze The Day!

## Description
We built this application to enable people to look up the pollution data for cities. Our initial motivation was to help those who were preparing to travel (or just to leave the house in their current city), but it's also for anybody who is just curious about air quality around the world. We hope to help people to be more prepared for the conditions when they go outside.

## Table of Contents
* [General Information](#general-information)
* [Preview](#preview)
* [Setup](#setup)
* [Usage](#usage)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [User Story](#user-story)
* [Acceptance Criteria](#acceptance-criteria)
* [Credits](#credits)
* [License](#license)

## General Information
- The primary objective of Sneeze the Day! is to provide current air quality data for cities.
- Users have the ability to type in a city to view its current air quality conditions, as well as to view and search from their search history.

## Preview
<!-- Screenshot to come -->

## Setup
<!-- URL to come -->
There is no setup required as the web application is readily available for use here.

## Usage
- To view the air pollution data for a particular city, type the city name in the search bar.
    - If your search returns multiple results, choose the desired result from the pop-up dialog.
    - If you run an empty search or your search returns no results, a pop-up dialog will appear with an instructional message. Dismiss the dialog and run your search again.
- Color-coded air quality details for your city, as well as a gif that corresponds with the air quality index (higher index = bigger sneeze), will appear once your search returns a single result.
- Your search history will be stored in the "Tissue Box." Click on a city to search that city again.

## Features
- The air quality data is color-coded from green (best) to brown (worst).
- The application displays a gif that corresponds to the air quality index.
    - 1 = fresh air
    - 2 = small sneeze
    - 3 = medium sneeze
    - 4 = medium+ sneeze
    - 5 = large sneeze
- The user's search history is stored in the "Tissue Box" and searches can be run from the history.
- The application alerts the user when their search is invalid, along with the reason why, or when their search returns multiple results.

## Technologies Used
- JavaScript
- HTML5
- CSS
- Tailwind CSS
- Local storage
- APIs

## User Story
```md
AS A person getting ready to travel somewhere
I WANT to check the air quality at my destination
SO THAT I can be prepared for the air quality while I am there
```

## Acceptance Criteria
```md
GIVEN I am interested in viewing the air quality data for a city
WHEN I open the air quality application
THEN I am presented with a search bar to enter the city name
WHEN there are multiple results that match my search
THEN I am presented with those results and prompted to select the appropriate one
WHEN I submit an empty search or a search with no results
THEN I am presented with a message describing the reason my search was unsuccessful
WHEN I submit a valid search
THEN I am presented with the air quality data and a gif that represents the air quality
WHEN I search for a city I have not searched for before
THEN the city is saved to the search history
WHEN I click on a city in the search history
THEN I am presented with the current air quality data for that city
```

## Credits
The individuals who collaborated on this project are:
- Christopher Peret ([Zed-CSP](https://github.com/Zed-CSP))
- Sarah Jensen ([sarah-jensen](https://github.com/sarah-jensen))
- Phuong To ([phuongtoVN](https://github.com/phuongtoVN))
- Olena Pashchenko ([UserOlena](https://github.com/UserOlena))
- Rebecca Roos ([sendusyourbones](https://github.com/sendusyourbones) / [rebeccaroos](https://github.com/rebeccaroos))

We used the following APIs to get data:
- OpenWeather [Geocoding API](https://openweathermap.org/api/geocoding-api)
- OpenWeather [Air Pollution API](https://openweathermap.org/api/air-pollution)

We got our logo from [ClipArt ETC](https://etc.usf.edu/clipart/).

We used [Tailwind CSS](https://tailwindcss.com/) as our CSS framework.

We got our gifs from [GIPHY](https://giphy.com/).

We referenced Kevin Powell's YouTube [tutorial on popup modals](https://www.youtube.com/watch?v=TAB_v6yBXIE) when setting up our popup modal.

## License
MIT License