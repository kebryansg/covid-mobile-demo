import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { HomePage } from './home.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps,Geocoder } from '@ionic-native/google-maps';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,TextMaskModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage],providers:[Geolocation,Geocoder,GoogleMaps]
})
export class HomePageModule {}
