export const Environment = {
  production: true,
  version: require('../../package.json').version,
  firebaseEmailAPI:
    'https://us-central1-lead-app-514e3.cloudfunctions.net/sendEmail',
  firebase: {
    apiKey: 'AIzaSyDh6FBRemygTT5Qy-yZD6A0B07gDgjrlG0',
    authDomain: 'lead-app-514e3.firebaseapp.com',
    databaseURL: 'https://lead-app-514e3.firebaseio.com',
    projectId: 'lead-app-514e3',
    storageBucket: 'lead-app-514e3.appspot.com',
    messagingSenderId: '500998961888',
    appId: '1:500998961888:web:872a1c5d4322ac25276e85',
    measurementId: 'G-M312ZTR3BB',
  },
  marvel: {
    publicKey: '5227aa2518375785b9d1179a789368c4',
    baseUrl: 'https://gateway.marvel.com/v1/public/',
  },
}
