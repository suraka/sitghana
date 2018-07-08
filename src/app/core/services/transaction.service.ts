import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './auth.service';
import { Transaction, File } from './../models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public transactions: Observable<Transaction[]>;
  private TransactionsCollection: AngularFirestoreCollection<Transaction>;
  private TransactionsDoc: AngularFirestoreDocument<Transaction>;
  private uid: string;
  private bid: string;

  constructor(
    private authService: AuthService,
    private angularFireStore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
      this.route.queryParams.subscribe(
        (params) => {
        // Defaults to 0 if no query param provided.
        this.uid = decodeURI(params['id']);
        this.bid = decodeURI(params['bid']);
      });

      this.TransactionsCollection = this.angularFireStore.collection(
        'transactions', (ref) => ref
        .orderBy('date', 'asc'),
      );
  }

  public getTransactions(): Observable<Transaction[]> {
    return this.TransactionsCollection.valueChanges();
  }

  public getTransaction(id: string) {
    return this.angularFireStore.doc<Transaction>(`transactions/${id}`);
  }

  public getByNature(nature: string): Observable<Transaction[]> {
    return this.angularFireStore.collection(
      'transactions', (ref) => ref
      .orderBy('date', 'asc'),
    ).valueChanges();
  }

  public deleteTransaction(id: string) {
    return this.getTransaction(id).delete();
  }

  public addTransaction(entries: Transaction) {
    const transactionRef = this.angularFireStore.collection(`subscriptions`);
    return transactionRef.add(entries).then((ref) => {
      this.router.navigate(['./../profile']);
      this.toastr.success(
        'Transaction added successfully.!',
        'Transaction!',
        { timeOut: 7000 }
      );
    }).catch((error) => {
      console.log('Error adding transaction: ', error);
    });
  }

  updateTransaction(entries: Transaction) {
    this.TransactionsDoc = this.angularFireStore.doc(`transactions/${entries.id}`);
    this.TransactionsDoc.update(entries);
  }

  /* getAllAds() {
    let adsCollection: AngularFirestoreCollection<Ad>;
    adsCollection = this.afs.collection(
      'ads', (ref) => ref
      .orderBy('time', 'desc').limit(25),
    );
    return adsCollection.valueChanges();
  }

  getData(): Observable<Ad[]> {
    return this.userAdCollection.valueChanges();
  }

  getChartSnapshot() {
    return this.adsCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Ad;
        return {
          time: data.time,
        };
      });
    });
  }

  getSnapshot(): Observable<Ad[]> {
    return this.adsCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Ad;
        return {
          id: a.payload.doc.id,
          aid: a.payload.doc.id,
          title: data.title,
          content: data.content,
          type: data.type,
          price: data.price,
          category: data.category,
          filenames: data.filenames,
          url: data.url,
          views: data.views,
          region: data.region,
          town: data.town,
          escrow: data.escrow,
          phone: data.phone,
          uid: data.uid,
          time: data.time,
          expire: data.expire,
          updated: data.updated,
          public: data.public,
        };
      });
    });
  }
 */
  /* getUserAds() {
    let userAdCollection: AngularFirestoreCollection<Ad>;

    if (this.auth.uid) {
      userAdCollection = this.afs.collection(
        'ads', (ref) => ref
        .where('uid', '==', this.auth.uid)
        .orderBy('time', 'desc'),
      );
    }

    return userAdCollection.valueChanges();
  }

  getAd(id: string) {
    return this.afs.doc<Ad>(`ads/${id}`);
  } */

  /* create(
    title: string, content: string, type: string,
    price: number, category: string, region: string, town: string, escrow: boolean, phone: string) {
    if (escrow === undefined) {
      escrow = false;
    }
    const ad = {
      aid: '',
      title,
      content,
      type,
      price,
      category,
      region,
      town,
      escrow,
      phone,
      filenames: this.uploadsNames,
      url: this.uploadsURL,
      views: 0,
      uid: this.auth.uid || this.auth.getLoginUserId(),
      time: new Date().getTime(), //  this.timestamp
      expire: new Date().getTime() + 5.256e+9, // Add 2 months to current server time
      updated: new Date().getTime(), //  this.timestamp
      public: false,
    };
    this.adsCollection.add(ad).then(
      (postedAd) => {
        this.updatePost(postedAd.id);
        this.uploadsNames = new Array();
        this.uploadsURL = new Array();
        this.router.navigate(['/profile']);
      },
    ).catch((error) => {
      console.log('Error posting ad: ', error);
    });
  }

  updatePost(aid: string) {
    this.afs.collection('ads').doc(aid).update({
      aid: aid
    });
  }

  updateAd(id: string, data: Partial<Ad>) {
    this.getAd(id).update(data);
    // this._flashMessagesService.show('Ad updated successfully. Thank you', { cssClass: 'alert-success', timeout: 10000 });
    this.router.navigate(['/profile']);
    return;
  } */

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  /* pushUpload(upload: File) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
        // upload in progress
        const snap = snapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        if (uploadTask.snapshot.downloadURL) {
          // upload.url = uploadTask.snapshot.downloadURL;
          // upload.name = upload.file.name;
          // this.saveFileData(upload);
          this.uploadsNames.push(upload.file.name);
          this.uploadsURL.push(uploadTask.snapshot.downloadURL);
          return;
        } else {
          console.error('No download URL!');
        }
      },
    );
  } */

  /* get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  } */

  /* deleteAd(id: string) {
    const ad = this.getAd(id).valueChanges();
    let filenames = new Array();
    ad.subscribe((file) => { filenames = file.filenames; });

    this.delete(id)
    .then( () => {
      Array.from(filenames).forEach((filename) => {
        this.deleteFileStorage(filename);
      });
      // this._flashMessagesService.show('Your ad has been deleted successfully.', { cssClass: 'alert-danger', timeout: 3000 });
      return;
    })
    .catch((error) => console.log(error));
  }

  delete(id: string) {
    return this.getAd(id).delete();
  } */

  /* Delete Ad Picture */
  /* deleteAdPicture(id: string, filename: string, filenames: string[], url: string[]) {
    const fileRef: AngularFirestoreDocument<Ad>  = this.afs.doc(`ads/${id}`);

    return fileRef.update({
      'filenames': filenames,
      'url': url,
    }).then(() => {
      this.deleteFileStorage(filename);
      // this._flashMessagesService.show('Picture deleted successfully.', { cssClass: 'alert-danger', timeout: 5000 });
    });
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  } */
}
