import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingController} from '@ionic/angular';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import {ApiserviceService} from '../services/apiservice.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Geocoder, GeocoderRequest, GeocoderResult, LatLng} from '@ionic-native/google-maps';
import {FirebaseService} from '../services/firebase.service';
import * as moment from 'moment';
import {interval} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    tiposSexo = [{id: 1, descripcion: 'Femenino'}, {id: 1, descripcion: 'Masculino'}];
    estadosPaciente = ['Infectado', 'Seguimiento', 'No Infectado'];
    selectedEstado: string = '';
    numberMask = createNumberMask({
        prefix: '',
        allowDecimal: false,
        includeThousandsSeparator: false,
        allowLeadingZeroes: true
        // This will put the dollar sign at the end, with a space.
    });
    formGroupRep: FormGroup;

    constructor(public fb: FormBuilder,
                private apiService: ApiserviceService,
                private loadingController: LoadingController,
                private geolocation: Geolocation,
                private geocoder: Geocoder,
                private firebaseService: FirebaseService,) {
        this.formGroupRep = this.fb.group({
            cedula: ['', Validators.required],
            nombres: ['', Validators.required],
            direccion: ['', Validators.required],
            direccionPruebas: ['', Validators.required],
            telefono: ['', Validators.required],
            edad: ['', Validators.required],
            sexo: ['', Validators.required],
            email: ['', Validators.required],
            longitud: ['',],
            latitud: ['',],
            estadadoPaciente: ['', Validators.required]
        });

        this.getGeoLocation();
    }

    getGeoLocation() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.formGroupRep.get('longitud').setValue(resp.coords.longitude);
            this.formGroupRep.get('latitud').setValue(resp.coords.latitude);
            let request: GeocoderRequest = {
                position: new LatLng(resp.coords.latitude, resp.coords.longitude),
            };
            this.geocoder.geocode(request).then
            ((results: GeocoderResult[]) => {
                // alert(JSON.stringify(results[1].extra.lines[0]));
                this.formGroupRep.get('direccionPruebas').setValue(results[1].extra.lines[0]);

            });

            this.firebaseService.setItem({
                lat: resp.coords.latitude,
                long: resp.coords.longitude,
                time: moment().toDate()
            });
        }).catch((error) => {
            //  alert('Error getting location'+ JSON.stringify( error));
        });

        // Rastreo
        const intervalGeoPosition$ = interval(10000)
            .pipe(switchMap(() => this.geolocation.getCurrentPosition()));

        const firebasePosition$ = intervalGeoPosition$
            .pipe(
                tap(console.log),
                switchMap(position =>
                    this.firebaseService.setItem({
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                        time: moment().toDate()
                    }, 'Rastereo')
                )
            );

        // Escuchar y Subir Position
        //firebasePosition$.subscribe(() => console.log(`${moment().format('LLL')}: Se Realizo un rastreo`));

    }

    async consultarCedula() {
        const loading = await this.loadingController.create({
            message: 'Consultando Cédula',
        });

        await loading.present();
        if (this.formGroupRep.value.cedula.trim() != '') {

            this.apiService.httpGetRegistroCivil('api/cliente/05/' + this.formGroupRep.value.cedula).subscribe(async (returnData: any) => {
                if (returnData.razonSocial) {
                    this.formGroupRep.get('nombres').setValue(returnData.razonSocial);
                    this.formGroupRep.get('direccion').setValue(returnData.direccion);
                } else {
                    alert('Número ingresado no corresponde a una cédula válida.');
                    this.formGroupRep.get('nombres').setValue('');
                    this.formGroupRep.get('direccion').setValue('');
                }
                loading.dismiss();
            }, error => {
                alert('Número ingresado no corresponde a una cédula válida.');
                loading.dismiss();
            });
        }
    }

    radioChecked(estado) {
        // console.log(estado);
        this.formGroupRep.get('estadadoPaciente').setValue(estado);
    }

    guardar() {
        console.log(JSON.stringify(this.formGroupRep.getRawValue()));
        this.firebaseService.setItem(this.formGroupRep.getRawValue(), 'Register')
            .then(results => {
                alert('Registro Exitoso');
                console.log('Results:', results);
            });
    }
}
