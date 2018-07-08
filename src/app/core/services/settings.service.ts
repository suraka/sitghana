import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { Setting } from './../models';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settingCollection: AngularFirestoreCollection<Setting>;
  setting: Observable<Setting[]>;
  settingDocument: AngularFirestoreDocument<Setting>;
  id = 'aP3xg07PXKuno8gU2YD5';

  constructor(
    private afs: AngularFirestore,
  ) {}

  getSetting() {
    this.settingDocument = this.afs.doc(`setting/${this.id}`);
     return this.settingDocument.valueChanges();
  }

  updateSettings(entries: Setting) {
    this.settingDocument = this.afs.doc(`setting/${this.id}`);
    this.settingDocument.update(entries);
  }
}
