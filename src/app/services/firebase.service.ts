import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

const CollectGeolocalizacion = '';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {


    constructor(private afDB: AngularFirestore,) {
    }


    setItem(data: any, collection?: string) {
        const collect = collection ? collection : CollectGeolocalizacion;
        return this.afDB.collection(collect)
            .add(data);
    }
}
