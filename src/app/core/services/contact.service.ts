import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Contact, Notification } from './../models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactCollection: AngularFirestoreCollection<Contact>;
  contact: Observable<Contact[]>;
  contactDocument: AngularFirestoreDocument<Contact>;

  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.contactCollection = this.afs.collection(
      'contact_messages', (ref) => ref
      .where('public', '==', true)
      .orderBy('time', 'desc'),
    );

    this.contact = this.contactCollection.valueChanges();
  }

  getContacts() {
    return this.contact;
  }

  addContact(entries: Contact) {
    this.contactCollection.add(entries).then(() => {
      this.router.navigate(['/contact']);
      }
    ).catch((error) => {
      console.log('Error adding contact message: ', error);
    });
  }

  deleteContact(entries: Contact) {
    this.contactDocument = this.afs.doc(`contact_messages/${entries.id}`);
    this.contactDocument.delete();
  }

  updateContact(entries: Contact) {
    this.contactDocument = this.afs.doc(`contact_messages/${entries.id}`);
    this.contactDocument.update(entries);
  }

}
