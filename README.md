# Pokedex

Pokedex by Craig Black

![Pokedex image](https://github.com/hiddenhelper/symmetry/blob/master/image.png?raw=true)

## Description

* SPA React application.
* Minimal extra dependencies - only 3
* Typescript
* Jest unit testing
* `graphql-request` as minimal GraphQL library
* `chart.js` as simple data visualization library
* `react-pagination` to implement list pagination
* GitHub action to run tests

Filtering done on frontend. Whole data size is ~55kb and will not increase in near future, so priority is user experience - no data reloading. 

## Installation

```
cd pokedex
npm install
```

## Running

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
