# What To Wear!

This is a node.js clothes application powered by Express that suggests clothing items created by the user!
![ScreenshotOfSignedInMainPage](/src/images/WTWR-signedInMainPage.png)

### Domain

- Front end: [https://sweaterweather.umhl.com/](https://sweaterweather.umhl.com/)
- Back end: [https://api.sweaterweather.umhl.com/](https://api.sweaterweather.umhl.com/)

## General info

This project allows for users to create clothing items categorized by the weather that the clothing item is best worn in. Thereafter, based on read weather data from [a Weather API](https://openweathermap.org/api), the application will recommend suitable clothing to the user. 

## Technologies

Project is created with:

- React: 18.2.0
- Node.js: 18.15.0
- Express: 4.18.2

### Features

- Create, like, and retrieve clothing items
- Create an account that can later be modified 
- Toggle the scale of temperature from celsius to fahrenheit
- Weather card background updates based on weather conditions

## Usage

After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run `npm start` to start the application. You will then be able to access it at localhost:3000.

### Screenshots

The application offers a user-friendly, aesthetically-pleasing user interface that makes it easy for anyone to "pick up" my app and maneuver their way throughout the application.

#### Not Signed In

![ScreenshotOfNotSignedIn](/utils/images/WTWR-fullScreen.png) 

When the user is logged off, the user will not see any cards. Rather, the user will only be able to see the current temperature of the specified city, the "log in" button, and the "sign up" button.

#### Invalid Inputs in Form

![ScreenshotOfIncorrectlyFilledOutForm](/utils/images/WTWR-invalidFormInput.png)

When the user incorrectly fills out an input, the user will see the incorrectly filled out input turn red. Additionally, if the whole form is not completed correctly, the button to submit the form will be didabled and appear gray.

#### Correctly Completed Inputs and Form

![ScreenshotOfCorrectlyFilledOutForm](/utils/images/WTWR-validFormInput.png) 

When the user correctly fills out the complete form, the submit button will be enabled and all inputs as well as the submit button will appear black.

#### Signed In - Main Page

![ScreenshotOfSignedInMainPage](/utils/images/WTWR-signedInMainPage.png)

When the user is logged in and on the main page, the user will see all of the cards created, the name of the current user, and the specified avatar of the user. The option to add a new card will be made available to the user. The current user may also like any cards the user wishes to like.

#### Signed In - Profile Page

![ScreenshotOfSignedInProfilePage](/utils/images/WTWR-signedInProfilePage.png) 

When the user is logged in and on the profile page, the user will see all the cards created by the current user as well as the option to change the current user's profile data and log the current user off.

#### Item Modal Open

![ScreenshotOfItemModalOpen](/utils/images/WTWR-itemModalOpen.png) 

When the user clicks on any card, a modal will appear that will expand the clothing item and present the user with the name of the clothing item, the weather the clothing item's respective creator specified, and the delete button. Although everyone is presented with the "delete item" card, only the clothing item's respective creator is able to delete the card.

### Frontend

The GitHub repo for the backend is available [here](https://github.com/propitive/news-explorer-application).