// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_BASE: 'http://localhost:9000',
  FONTYS_AUTH: 'http://localhost:5000',
  REVIEW_BASE: 'https://europe-west1-pts6-bijbaan.cloudfunctions.net',
  NOTIFICATION_BASE: 'https://europe-west1-pts6-bijbaan.cloudfunctions.net',
  API_PAYMENT: 'https://localhost:44360/api',
  firebase: {
    apiKey: "AIzaSyCuBLMv5DOg5iLfyKigAFMCD4N8iT8Evdo",
    authDomain: "pts6-bijbaan.firebaseapp.com",
    databaseURL: "https://pts6-bijbaan.firebaseio.com",
    projectId: "pts6-bijbaan",
    storageBucket: "pts6-bijbaan.appspot.com",
    messagingSenderId: "39087493499"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
