import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp({
            apiKey: 'AIzaSyBrTclP7wWa2HT8Zx_Q-hV53ooqodHS8cM',
            authDomain: 'covid-demo-476e3.firebaseapp.com',
            databaseURL: 'https://covid-demo-476e3.firebaseio.com',
            projectId: 'covid-demo-476e3',
            storageBucket: 'covid-demo-476e3.appspot.com',
            messagingSenderId: '598897864425',
            appId: '1:598897864425:web:add32bd8299da467864a78',
            measurementId: 'G-XMHVH8H0WK'
        }),
        AngularFirestoreModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
