# LEAD Points - Kent Institute &middot; [![Build Status](https://travis-ci.org/KentDevelopment/lead-app.svg?branch=master)](https://travis-ci.org/KentDevelopment/lead-app)

The LEAD Points app has been develop to foment the student engagement with Kent's events, workshops and social activities.

## Development server

- Run `npm start` for a dev server. The app will automatically reload if you change any of the source files.

- Run `npm run serve` to access the app over the network and test it on mobile.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `npm run build-prod` flag for a production build.

## Contributing

### Developing

1. Create a new feature branch `feature_{{ NameOfTheFeature }}` from the `development`

1. Make changes

1. Update the [CHANGELOG](CHANGELOG.md) file

1. Commit those changes

1. Run `npm test`

1. Open a [Pull request](https://github.com/KentDevelopment/lead-app/compare) to merge your changes to the `development` branch

1. Make sure Travis turns green

1. Wait for an admin approval

### Deploying to production

To release a new version do the following steps:

1. `Merge` the `development` branch to the `master` branch

1. Checkout to the `master` branch

1. On the `master` branch run one of the following commands

```
npm version patch
npm version minor
npm version major
```

Which will...

- Build a production version of the app
- Bump the version
- Create a tag with the new version
- Push the code with the tags to the repo
- Start the CI script
- Checkout, merge and push the new Bump to the development branch

The code it's automatically uploaded to production when committed to the master branch if passed the tests.

Alternatively, you can run `firebase deploy` to update the host [Firebase CLI](https://firebase.google.com/docs/cli/)

## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli)

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Built With

- [Angular](https://angular.io/) - The framework used
- [Angular Material](https://material.angular.io/) - Material Design components for Angular
- [Angular Flex Layout](https://github.com/angular/flex-layout#readme) - Material Design components for Angular
- [Firebase](https://firebase.google.com/) - Used as host, storage and fireStore as a DB

## Plugins

- [ng2-img-max](https://github.com/bergben/ng2-img-max) - Angular 2 module to resize images down to a certain width and height or to reduce the quality to fit a certain maximal filesize - all in the browser.

## Dev tools

- [Prettier](https://prettier.io/) - Prettier is an opinionated code formatter.
- [Husky](https://github.com/typicode/husky.git) - Git hooks made easy.
- [Travis CI](https://travis-ci.org/) - Easily sync your GitHub projects with Travis CI and you'll be testing your code in minutes.
- [NPM](https://www.npmjs.com/) - Build amazing things.
- [Cypress](https://www.cypress.io/) - Fast, easy and reliable testing for anything that runs in a browser.

## Authors

- [Renan Sigolo](https://github.com/renansigolo)

## License

This project is licensed under the APACHE 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Thanks to everyone at Kent Institute
- Inspiring the world to be more collaborative
