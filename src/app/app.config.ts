import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync('noop'), provideAnimationsAsync('noop'), provideFirebaseApp(() => initializeApp({"projectId":"soundnimbus-bed58","appId":"1:607418004506:web:6520bed8e7e6204fb2cda3","storageBucket":"soundnimbus-bed58.firebasestorage.app","apiKey":"AIzaSyD5McwGAFQIEng_c-b4D6yC_qVuZ6D6vLg","authDomain":"soundnimbus-bed58.firebaseapp.com","messagingSenderId":"607418004506"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
