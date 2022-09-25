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
    messagingSenderId: '19289947337',
    appId: '1:19289947337:web:c9c3862d0ec5436bd3e118',
    measurementId: 'G-8W7NJGYFEP',
  },
  marvel: {
    publicKey: '5227aa2518375785b9d1179a789368c4',
    baseUrl: 'https://gateway.marvel.com/v1/public/',
  },
}
