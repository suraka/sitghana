import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Feedback } from './../models';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  feedbackCollection: AngularFirestoreCollection<Feedback>;
  feedbackDocument:   AngularFirestoreDocument<Feedback>;

  constructor(
    private afs: AngularFirestore,
    private router: Router) {
      this.feedbackCollection = this.afs.collection(
        'feedback', (ref) => ref
        .where('public', '==', true)
        .orderBy('time', 'desc'),
      );
    }

  createFeedback(
    aid: string,
    contact: string, // email, phone
    content: string) {
    const feedback = {
      aid,
      contact,
      content,
      time: new Date().getTime(), //  this.timestamp
      updated: new Date().getTime(), //  this.timestamp
      public: false,
    };
    this.feedbackCollection.add(feedback).then(
      () => {
        this.router.navigate(['/view'], { queryParams: { id: aid } });
        /* this._flashMessagesService.show(
          'Feedback sent successfully. Thank you for your time.',
          { cssClass: 'alert-success', timeout: 15000 }); */
      },
    ).catch((error) => {
      console.log('Error sending feedback: ', error);
    });
  }
}
