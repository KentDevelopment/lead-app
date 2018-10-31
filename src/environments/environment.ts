// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const Environment = {
  production: false,
  version: require('../../package.json').version,
  firebaseEmailAPI:
    'https://us-central1-kent-ac75b.cloudfunctions.net/sendEmail',
  firebase: {
    apiKey: 'AIzaSyCUJMRYmjbzCCFKfm--Go7rX00_h9qWwfk',
    authDomain: 'kent-ac75b.firebaseapp.com',
    databaseURL: 'https://kent-ac75b.firebaseio.com',
    projectId: 'kent-ac75b',
    storageBucket: 'kent-ac75b.appspot.com',
    messagingSenderId: '19289947337'
  },
  marvel: {
    publicKey: '5227aa2518375785b9d1179a789368c4',
    baseUrl: 'https://gateway.marvel.com/v1/public/'
  }
}
